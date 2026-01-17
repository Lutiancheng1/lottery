# Canada28 Simulator - Technical Architecture & Developer Guide

> **AI Context Trigger**: This document is the **SINGLE SOURCE OF TRUTH** for the Canada28 Simulator project. Read this to understand the codebase, logic, and architecture immediately.

## 1. Project Identity
- **Name**: Canada28 Simulator (PC28)
- **Framework**: Python 3.12 + PyQt5
- **Purpose**: Lottery data analysis, real-time simulation, backtesting of betting strategies (specifically Debt Recovery/D'Alembert), and cold/hot number prediction.
- **OS Target**: Windows (x64/x86)

## 2. Directory Structure & Key Files

| File | Responsibility |
| :--- | :--- |
| **`canada28_simulator_qt.py`** | **Main Entry Point**. Contains the `Canada28Simulator` class, UI initialization, Event Loop, Real-time Simulation logic (`process_new_draw`), and Backtesting Worker. |
| **`db_manager.py`** | SQLite Database abstraction. Manages `canada28.db`. Handles inserting/querying historical lottery data. |
| **`license_manager.py`** | **Security Core**. Handles Machine Code generation, License Key verification, Network Time checks (Anti-Cheat), and License storage (in `%APPDATA%`). |
| **`activate_dialog.py`** | The UI dialog (`QDialog`) shown on startup if license is missing or expired. |
| **`keygen.py`** | **Admin Tool**. Separate Qt App to generate license keys. Contains `KeyGenApp`. Distributed separately. |
| **`build_exe.py`** | **Build Script**. Uses PyInstaller. Builds `Canada28Simulator.exe` (Client) and `KeyGen_Admin.exe` (Admin). Handles ZIP packaging separation. |
| **`generate_top_combinations.py`**| Helper entry point for calculating top occurring number combinations. |
| **`config.json`** | Stores user preferences (window size, last input values, betting parameters). |

## 3. Core Logic Analyzers

### 3.1 Data Management (`db_manager.py`, `CanadaDataManager`)
- **Database**: SQLite `canada28.db` (Table: `canada28_history`).
- **Data Source**: Fetched via HTTP API (logic in `DataWorker`).
- **Sync Logic**: 
    - `DataWorker` thread runs in background.
    - **Rate Limit**: Enforce ~1.5s delay between requests to avoid bans.
    - **Deduplication**: Checks local DB max period vs remote.
    - **Capacity**: Historical data supports up to 1,000,000+ records.
- **Daily Volume**: Verified approx **402 periods/day**.

### 3.2 Betting Strategy Engine ("Debt Recovery / D'Alembert")
*The heart of the simulation.*
- **Location**: 
    - Realtime: `Canada28Simulator.process_new_draw`
    - Backtest: `BacktestWorker.run`
- **State Variables**:
    - `current_debt`: Accumulated losses.
    - `current_unit_bet`: Current wager amount (per number).
- **Algorithm**:
    1.  **Selection**: User bets on a set of numbers (e.g., Coldest 10).
    2.  **Outcome Check**: If Drawn Number in Selection -> **WIN**, else **LOSS**.
    3.  **Loss Logic**:
        - `debt += bet_amount`
        - **Increase Bet**: `unit_bet += spin_increase_fixed` (D'Alembert Step Up).
    4.  **Win Logic**:
        - `debt -= profit`
        - **Decrease Bet**: `unit_bet -= spin_decrease_rate` (D'Alembert Step Down).
        - *Constraint*: `unit_bet` cannot go below `base_bet`.
    5.  **Reset**: If `debt <= 0` (Recovered), reset `unit_bet` to `base_bet` and `debt` to 0.

### 3.3 License & Security System (`license_manager.py`)
*Machine-bound activation system.*
- **Key Format**: `Base64( ExpireDate_YYYYMMDD | MD5(MachineCode + ExpireDate + SALT) )`.
- **Storage**: `%APPDATA%/Canada28Simulator/license.key` (Hidden file attributes applied).
- **Network Enforcement**:
    - **Startup Check**: App calls `LicenseManager.check_network()`. Pings `www.baidu.com` or `1.1.1.1`. **Exits if offline**.
    - **Time Verification**: Fetches HTTP `Date` header from Baidu to get authoritative **Network Time**.
    - **Anti-Cheat**: Local system time is IGNORED. If network time fails, validation fails.

### 3.4 Export System
- **Standardization**: All export actions (Hot Table, Cold Table, Custom Cold, Hot Combinations) use a unified flow.
- **Prompt**: "Select Format: [Full Table] or [Pure Numbers]".
    - **Full Table**: Includes Headers (`# Comments`), Statistics, Tab-separated or CSV.
    - **Pure Numbers**: Comma-separated string of numbers ONLY (`05, 12, 18`). Designed for easy copy-paste/import.

## 4. UI Architecture
- **Main Window**: `Canada28Simulator` (QMainWindow).
- **Tabs**:
    1.  **Simulation Tab (`tab_simulation`)**: Real-time monitor. Contains `ConsoleLog`, `Matplotlib Chart`, Manual Bet Inputs.
    2.  **History/Backtest Tab (`tab_history`)**: Date range selectors, 'Start Backtest' button.
    3.  **Settings/Numbers Tab (`tab_combined`)**: 
        - **Hot/Cold AnalysisTables**.
        - **Search Number**: Global history search.
        - **Custom Cold Export**: Configurable Period + Frequency % export.
- **Threading**:
    - `DataWorker`: Background sync.
    - `BacktestWorker`: Heavy calculation for verifying strategies on past data.

## 5. Build & Deployment (`build_exe.py`)
- **Tool**: PyInstaller.
- **Hidden Imports**: Critical to include `license_manager`, `activate_dialog`, `generate_top_combinations`.
- **GPU Handling**:
    - **In Code**: `if getattr(sys, 'frozen', False):` -> Adds `--disable-gpu` flag.
    - **Reason**: Prevents black screen/crash on older hardware content.
- **Artifact Generation**:
    1.  **`Canada28Simulator_Client.zip`**: Contains `Canada28Simulator.exe` + `Data/`. (NO Keygen).
    2.  **`KeyGen_Admin_Tool.zip`**: Contains `KeyGen_Admin.exe` only.

## 6. How to Modify
1.  **Add Strategy**: Modify `process_new_draw` and `BacktestWorker`.
2.  **Change License Logic**: Edit `license_manager.py` (check `SALT` and verification logic).
3.  **UI Tweak**: `canada28_simulator_qt.py` -> `init_ui` or `create_control_tabs`.
4.  **Build**: Run `python build_exe.py`.

---
*Last Updated: 2026-01-18*
