#!/usr/bin/env python3
"""
Canada28模拟器打包脚本
自动打包为Windows可执行文件 (支持x64和x86)
"""

import os
import sys
import shutil
import subprocess

def check_pyinstaller():
    """检查PyInstaller是否已安装"""
    try:
        import PyInstaller
        print("✅ PyInstaller已安装")
        return True
    except ImportError:
        print("❌ PyInstaller未安装")
        print("正在安装PyInstaller...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyinstaller"])
        print("✅ PyInstaller安装完成")
        return True

def clean_build_files():
    """清理之前的构建文件"""
    dirs_to_clean = ['build', 'dist', '__pycache__']
    files_to_clean = ['*.spec']
    
    for dir_name in dirs_to_clean:
        if os.path.exists(dir_name):
            shutil.rmtree(dir_name)
            print(f"🗑️  删除目录: {dir_name}")
    
    for pattern in files_to_clean:
        import glob
        for file in glob.glob(pattern):
            os.remove(file)
            print(f"🗑️  删除文件: {file}")

def build_exe():
    """打包为EXE"""
    print("\n" + "="*50)
    print("🚀 开始打包Canada28模拟器")
    print("="*50 + "\n")
    
    # --- 1. 打包主程序 (模拟器) ---
    print("\n" + "-"*30)
    print("📦 打包主程序 [Canada28Simulator]...")
    cmd_main = [
        'pyinstaller',
        '--name=Canada28Simulator',
        '--onefile',
        '--noconsole',
        '--clean',
        '--hidden-import=generate_top_combinations',
        '--hidden-import=license_manager',
        '--hidden-import=activate_dialog',
        '--hidden-import=PyQt5',
        '--hidden-import=PyQt5.QtWebEngineWidgets',
        '--hidden-import=requests',
        '--collect-all=PyQt5',
        'canada28_simulator_qt.py'
    ]
    subprocess.check_call(cmd_main)
    print("✅ 主程序打包成功")
    
    # --- 2. 打包注册机 (管理员工具) ---
    print("\n" + "-"*30)
    print("📦 打包注册机 [KeyGen_Admin]...")
    cmd_keygen = [
        'pyinstaller',
        '--name=KeyGen_Admin',
        '--onefile',
        '--noconsole',
        '--clean',
        '--hidden-import=license_manager',
        '--hidden-import=PyQt5',
        'keygen.py'
    ]
    subprocess.check_call(cmd_keygen)
    print("✅ 注册机打包成功")
    
    print("\n" + "="*50)
    print("🎉 所有打包任务完成!")
    print("="*50)
    print("\n📁 输出目录: dist/")
    print("   1. Canada28Simulator.exe (发给客户)")
    print("   2. KeyGen_Admin.exe (管理员自用)")

if __name__ == "__main__":
    # 切换工作目录到脚本所在目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("Canada28模拟器 - EXE打包工具\n")
    
    # 检查依赖
    check_pyinstaller()
    
    # 清理旧文件
    print("\n🧹 清理旧构建文件...")
    clean_build_files()
    
    # 开始打包
    build_exe()
    
    # 复制数据文件
    print("\n📦 正在复制最新的数据文件到 dist 目录...")
    src_data = "Data"
    dst_data = os.path.join("dist", "Data")
    if os.path.exists(src_data):
        if os.path.exists(dst_data):
            shutil.rmtree(dst_data)
        shutil.copytree(src_data, dst_data)
        print(f"✅ 已将 {src_data} (包含数据库) 复制到 {dst_data}")
    else:
        print(f"⚠️ 未找到 {src_data} 目录，跳过复制")
    
    print("\n✨ 全部完成!")
    
    # 自动压缩为ZIP方便分发
    print("\n📦 正在生成客户分发包 (不含注册机)...")
    zip_name = "Canada28Simulator_Client"
    try:
        dist_dir = "dist"
        if os.path.exists(dist_dir):
            # 创建一个临时目录用于打包
            package_dir = os.path.join(dist_dir, "Package_Temp")
            if os.path.exists(package_dir):
                shutil.rmtree(package_dir)
            os.makedirs(package_dir)
            
            # 1. 复制主程序
            shutil.copy2(os.path.join(dist_dir, "Canada28Simulator.exe"), package_dir)
            
            # 2. 复制数据文件夹
            src_data = os.path.join(dist_dir, "Data")
            dst_data = os.path.join(package_dir, "Data")
            if os.path.exists(src_data):
                shutil.copytree(src_data, dst_data)
                
            # 3. 压缩这个临时目录
            shutil.make_archive(zip_name, 'zip', package_dir)
            
            # 4. 清理临时目录
            shutil.rmtree(package_dir)
            
            print(f"✅ 已生成客户专用包: {zip_name}.zip (仅含模拟器和数据)")
            print(f"👉 注册机 KeyGen_Admin.exe 仍在 dist 目录下，请单独保存")
            
            # --- 额外：单独打包注册机 ---
            print("\n📦 正在生成注册机独立包...")
            keygen_zip = "KeyGen_Admin_Tool"
            keygen_temp = os.path.join(dist_dir, "KeyGen_Temp")
            if os.path.exists(keygen_temp):
                shutil.rmtree(keygen_temp)
            os.makedirs(keygen_temp)
            
            if os.path.exists(os.path.join(dist_dir, "KeyGen_Admin.exe")):
                shutil.copy2(os.path.join(dist_dir, "KeyGen_Admin.exe"), keygen_temp)
                shutil.make_archive(keygen_zip, 'zip', keygen_temp)
                shutil.rmtree(keygen_temp)
                print(f"✅ 已生成管理员包: {keygen_zip}.zip (仅含注册机)")
            
        else:
            print("❌ 未找到 dist 目录，无法压缩")
    except Exception as e:
        print(f"❌ 压缩失败: {e}")
