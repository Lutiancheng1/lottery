# PC28彩票项目 (GUI版)

## 📊 项目简介

这是一个基于 **PyQt5** 重构的 PC28/加拿大28 彩票数据分析和投注模拟系统。
相比旧版，新版拥有更现代的图形界面、内嵌浏览器、实时图表分析以及更强大的自动打包功能。

## 🎯 主要功能

### 1. 核心模拟器 (GUI)
- **启动文件**: `Canada28/canada28_simulator_qt.py`
- **功能**:
    - 现代化 Dark Mode 界面
    - 左侧集成 Web 浏览器 (兼容模式，防崩溃)
    - 右侧实时数据表格 + 盈亏曲线图
    - 支持 **“欠债还钱”** 资金策略 (回本优先)
    - 完整的历史数据回测功能

### 2. 自动化打包
- **脚本**: `Canada28/build_exe.py`
- **功能**:
    - 一键将 Python 代码打包成独立的 `.exe` 文件
    - 自动复制 `Data` 文件夹
    - 自动生成 `Canada28Simulator_Package.zip` 分发包
    - 支持 `--debug` 调试模式 (创建快捷方式加参数即可开启黑框日志)

### 3. 数据与工具
- **数据管理**: `Canada28/db_manager.py` (SQLite数据库)
- **号码生成**: `Canada28/generate_top_combinations.py` (热号导出)

## 📁 项目结构

```
.
├── Canada28/                      # 核心代码目录
│   ├── canada28_simulator_qt.py   # ⭐ 主程序 (运行这个)
│   ├── build_exe.py               # ⭐ 打包脚本 (双击打包)
│   ├── generate_top_combinations.py
│   ├── db_manager.py
│   ├── data_manager.py
│   ├── Canada28Simulator.spec     # PyInstaller配置
│   ├── Data/                      # 数据库和资源文件
│   └── dist/                      # 打包输出目录 (exe在这里)
├── .github/                       # GitHub Action 配置
│   └── workflows/build_windows_exe.yml
├── README.md                      # 项目说明
└── requirements.txt               #Python依赖
```

## 🚀 快速开始

### 1. 运行源码

```bash
# 安装依赖
pip install -r requirements.txt

# 进入目录
cd Canada28

# 启动模拟器
python canada28_simulator_qt.py
```

### 2. 打包为EXE

如果您想发给没有安装Python的朋友使用：

```bash
cd Canada28
python build_exe.py
```
运行结束后，把生成的 **`Canada28Simulator_Package.zip`** 发给对方即可。

## �️ 调试模式 (Debug)

如果打包后的程序在别人的电脑上打不开浏览器或白屏：
1. 给 `.exe` 创建快捷方式。
2. 属性 -> 目标 -> 末尾加空格和 `--debug`。
3. 运行快捷方式，此时会弹出黑框和生成 `debug.log`，方便排查。

## 📝 版本历史

### v3.0 (Qt重构版)
- ✅ 采用 PyQt5 + QWebEngine 重写界面
- ✅ 解决浏览器兼容性问题 (No Sandbox)
- ✅ 引入“欠债模式”资金策略
- ✅ 完善的自动化构建流程

### v2.0
- ✅ 命令行/Tkinter 版本 (已归档)
