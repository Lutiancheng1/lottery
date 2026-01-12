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
    
    # PyInstaller命令
    cmd = [
        'pyinstaller',
        '--name=Canada28Simulator',
        '--onefile',  # 单文件模式
        '--noconsole',  # 无控制台窗口
        '--clean',    # 清理缓存
        '--hidden-import=generate_top_combinations', # 关键：包含动态导入的模块
        '--hidden-import=PyQt5',
        '--hidden-import=PyQt5.QtWebEngineWidgets',
        '--hidden-import=requests',
        '--hidden-import=openpyxl',
        '--hidden-import=matplotlib',
        '--hidden-import=numpy',
        '--collect-all=PyQt5',
        'canada28_simulator_qt.py'
    ]
    
    print("📦 执行打包命令...")
    print(f"命令: {' '.join(cmd)}\n")
    
    try:
        subprocess.check_call(cmd)
        print("\n" + "="*50)
        print("✅ 打包成功!")
        print("="*50)
        print("\n📁 可执行文件位置: dist/Canada28模拟器.exe")
        print("\n💡 提示:")
        print("   - 生成的EXE文件同时支持x64和x86系统")
        print("   - 首次运行可能需要较长时间")
        print("   - 请将Canada_data文件夹放在EXE同目录下")
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ 打包失败: {e}")
        sys.exit(1)

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
    print("\n📦 正在生成最终压缩包...")
    zip_name = "Canada28Simulator_Package"
    try:
        # 分发包名称
        dist_dir = "dist"
        if os.path.exists(dist_dir):
            shutil.make_archive(zip_name, 'zip', dist_dir)
            print(f"✅ 已生成分发包: {zip_name}.zip")
            print(f"👉 您可以直接把这个 {zip_name}.zip 发给别人")
        else:
            print("❌ 未找到 dist 目录，无法压缩")
    except Exception as e:
        print(f"❌ 压缩失败: {e}")
