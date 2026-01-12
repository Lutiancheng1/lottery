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
        '--name=Canada28模拟器',
        '--onefile',  # 单文件模式
        '--windowed',  # 无控制台窗口
        '--icon=NONE',  # 如果有图标可以指定
        '--add-data=Canada_data:Canada_data',  # 包含数据文件
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
    print("Canada28模拟器 - EXE打包工具\n")
    
    # 检查依赖
    check_pyinstaller()
    
    # 清理旧文件
    print("\n🧹 清理旧构建文件...")
    clean_build_files()
    
    # 开始打包
    build_exe()
    
    print("\n✨ 全部完成!")
