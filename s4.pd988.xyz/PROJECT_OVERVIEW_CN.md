# Canada28 模拟器 - 技术架构与开发指南

> **AI 上下文提示**: 本文档是 Canada28 模拟器项目的 **唯一真理来源**。请阅读此文档以快速理解代码库、逻辑和架构。

## 1. 项目身份
- **名称**: Canada28 Simulator (PC28)
- **框架**: Python 3.12 + PyQt5
- **目的**: 彩票数据分析、实时模拟、投注策略验证（特别是负追/D'Alembert策略）以及冷热号码预测。
- **目标系统**: Windows (x64/x86)

## 2. 目录结构与关键文件

| 文件名 | 职责 |
| :--- | :--- |
| **`canada28_simulator_qt.py`** | **主程序入口**。包含 `Canada28Simulator` 类、UI 初始化、事件循环、实时模拟逻辑 (`process_new_draw`) 和回测工作线程。 |
| **`db_manager.py`** | SQLite 数据库抽象层。管理 `canada28.db`。处理历史彩票数据的插入和查询。 |
| **`license_manager.py`** | **安全核心**。处理机器码生成、激活码验证、网络时间检查（反作弊）以及授权文件存储（在 `%APPDATA%` 中）。 |
| **`activate_dialog.py`** | 启动时显示的激活弹窗 (`QDialog`)，用于处理未授权或授权过期的情况。 |
| **`keygen.py`** | **管理员工具 (注册机)**。独立的 PyQt5 程序，用于生成激活码。**单独分发**。 |
| **`build_exe.py`** | **打包脚本**。使用 PyInstaller。构建 `Canada28Simulator.exe` (客户端) 和 `KeyGen_Admin.exe` (管理员端)，并处理 ZIP 分包。 |
| **`generate_top_combinations.py`**| 辅助脚本，用于计算出现频率最高的号码组合。 |
| **`config.json`** | 存储用户偏好设置（窗口大小、上次输入值、投注参数）。 |

## 3. 核心逻辑解析

### 3.1 数据管理 (`db_manager.py`, `CanadaDataManager`)
- **数据库**: SQLite `canada28.db` (表名: `canada28_history`).
- **数据源**: 通过 HTTP API 获取 (逻辑在 `DataWorker` 中)。
- **同步逻辑**: 
    - `DataWorker` 线程在后台运行。
    - **频率限制**: 请求之间强制间隔约 1.5秒，防止被封 IP。
    - **去重**: 比较本地 DB 的最大期号与远程数据。
    - **容量**: 历史数据支持 1,000,000+ 条记录。
- **日均量**: 经验证每天约 **402 期**。
- **强制联网**: 启动时会 ping 百度/Cloudflare，离线状态无法运行。

### 3.2 投注策略引擎 ("负追 / D'Alembert")
*模拟器的核心脏器。*
- **位置**: 
    - 实时: `Canada28Simulator.process_new_draw`
    - 回测: `BacktestWorker.run`
- **状态变量**:
    - `current_debt`: 当前累计负债 (亏损额)。
    - `current_unit_bet`: 当前单注金额。
- **算法流程**:
    1.  **选号**: 用户下注一组号码（例如：最冷的10个数）。
    2.  **胜负判定**: 如果开奖号码在选号中 -> **赢 (WIN)**，否则 -> **输 (LOSS)**。
    3.  **输 (Loss) 逻辑**:
        - `debt += bet_amount` (累计负债)
        - **加注**: `unit_bet += spin_increase_fixed` (D'Alembert 升阶)。
    4.  **赢 (Win) 逻辑**:
        - `debt -= profit` (减少负债)
        - **减注**: `unit_bet -= spin_decrease_rate` (D'Alembert 降阶)。
        - *约束*: `unit_bet` 不能低于 `base_bet` (基础注)。
    5.  **重置**: 如果 `debt <= 0` (已回本)，重置 `unit_bet` 为 `base_bet`，且 `debt` 归零。

### 3.3 授权与安全系统 (`license_manager.py`)
*绑定机器码的激活系统。*
- **密钥格式**: `Base64( 过期日期_YYYYMMDD | MD5(机器码 + 过期日期 + SALT) )`。
- **存储**: `%APPDATA%/Canada28Simulator/license.key` (已设置隐藏属性)。
- **网络强制校验**:
    - **启动检查**: 调用 `LicenseManager.check_network()`。尝试连接 `www.baidu.com`。**无网直接退出**。
    - **时间校验**: 从百度 HTTP 响应头获取 `Date`，计算权威的 **网络时间 (北京时间)**。
    - **反作弊**: **完全忽略** 本地系统时间。如果获取不到网络时间，验证失败。

### 3.4 导出系统
- **标准化**: 所有导出操作（热门表、冷门表、自定义冷门、热门组合）使用统一流程。
- **弹窗提示**: "选择导出格式: [完整表格] 或 [纯数字]"。
    - **完整表格**: 包含头部信息 (`# 注释`)、统计数据、制表符或 CSV 格式。
    - **纯数字**: 仅导出逗号分隔的号码字符串 (`05, 12, 18`)。专为方便复制/导入设计。

## 4. UI 架构
- **主窗口**: `Canada28Simulator` (QMainWindow).
- **标签页 (Tabs)**:
    1.  **模拟与挂机 (`tab_simulation`)**: 实时监控、日志控制台、ECharts/Matplotlib 图表、手动投注区。
    2.  **历史回测 (`tab_history`)**: 日期范围选择、"开始回测" 按钮。
    3.  **设置与号码 (`tab_combined`)**: 
        - **冷热号码统计表**。
        - **号码搜索**: 全局历史搜索。
        - **自定义冷门导出**: 可配置周期 + 频率百分比。
- **线程**:
    - `DataWorker`: 后台数据同步。
    - `BacktestWorker`: 跑历史数据验证策略。

## 5. 构建与部署 (`build_exe.py`)
- **工具**: PyInstaller。
- **隐式导入 (Hidden Imports)**: 必须包含 `license_manager`, `activate_dialog`, `generate_top_combinations`。
- **GPU 处理**:
    - **代码层**: `if getattr(sys, 'frozen', False):` -> 自动添加 `--disable-gpu` 参数。
    - **原因**: 兼容性优先，防止旧电脑出现黑屏或崩溃。
- **产物生成**:
    1.  **`Canada28Simulator_Client.zip`**: 仅包含 `Canada28Simulator.exe` + `Data/` 数据包。（**不含注册机**）。
    2.  **`KeyGen_Admin_Tool.zip`**: 仅包含 `KeyGen_Admin.exe`。（**单独打包**）。

## 6. 如何修改
1.  **修改策略**: 改 `process_new_draw` 和 `BacktestWorker`.
2.  **修改授权逻辑**: 改 `license_manager.py` (注意保密 `SALT` 盐值).
3.  **调整 UI**: 改 `canada28_simulator_qt.py` -> `init_ui` 或 `create_control_tabs`.
4.  **打包**: 运行 `python build_exe.py`.

---
*最后更新: 2026-01-18*
