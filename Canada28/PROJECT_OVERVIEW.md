# Canada28 Simulator Project Overview

## 1. Project Description
This project is a **Canada28 Lottery Simulator** built with **Python (PyQt5)**. It integrates a web browser for authentication, fetches real-time game data from a remote API, manages historical data using a hybrid **SQLite + Text File** storage system, and provides a GUI for simulation and analysis.

## 2. Directory Structure
The project is contained within the `Canada28/` directory.

```text
Canada28/
├── canada28_simulator_qt.py  # [ENTRY POINT] Main GUI Application (PyQt5)
├── data_manager.py           # Core logic for API fetching, syncing, and storage
├── db_manager.py             # SQLite database wrapper
├── migrate_db.py             # Script to migrate TXT data to DB and generate analysis
├── analyze_data.py           # Script for statistical analysis of historical data
├── token.json                # Cached authentication token (Auto-generated)
├── 加拿大28api.txt           # API documentation reference
├── Data/                     # Data Storage Directory
│   ├── canada28.db           # SQLite Database (Primary Storage)
│   ├── canada28.txt          # Text File Backup (Synced with DB)
│   ├── top_combinations.txt  # Top 875 frequent 3-digit combinations
│   └── number_frequency.txt  # Statistical report of numbers
```

## 3. Key Components & Logic

### A. Main Application (`canada28_simulator_qt.py`)
- **Framework**: PyQt5.
- **Layout**: `QSplitter` dividing the window into:
    - **Left**: `QWebEngineView` (Browser) for login and token extraction.
    - **Right**: Simulator Control Panel (Status, Settings, History).
- **Authentication**:
    - Auto-detects login via `check_login_timer`.
    - Extracts `token` and `cookie` from browser cookies/local storage.
    - Caches token to `token.json` for fast startup.
    - **Auto-Hide**: Browser panel hides automatically upon successful login.
- **Real-time Updates**:
    - `on_timer_tick`: Runs every 1s. Updates local countdown.
    - `refresh_data`: Runs every 5s. Fetches `/index.php/Games/LData` for latest result and balance.

### B. Data Management (`data_manager.py`)
- **Dual Storage**: Writes data to **BOTH** `Data/canada28.db` and `Data/canada28.txt` to ensure data safety and user accessibility.
- **Synchronization**:
    - `sync_historical_data()`: Compares local latest period with remote latest.
    - Calculates `gap`. If `gap > 0`, fetches missing data pages.
    - **Smart Fetch**: Uses `fetch_missing_data(gap)` to get exactly what's missing.
- **API Endpoints**:
    - Real-time: `http://s1.pk999p.xyz/index.php/Games/LData` (Countdown, Balance, Last Result).
    - History: `http://s1.pk999p.xyz/index.php/GamePeriods/LHistory` (Batch historical data).

### C. Database (`db_manager.py`)
- **Engine**: SQLite3.
- **Table**: `history`
    - `period_no` (PK), `draw_time`, `num1`, `num2`, `num3`, `result_sum`, `raw_line`.
- **Function**: Provides fast read access (`get_latest_record`, `get_all_records`) for the simulator.

### D. Analysis Tools
- **`migrate_db.py`**:
    - Migrates legacy TXT data to SQLite.
    - Generates `Data/top_combinations.txt`: A raw list of the top 875 most frequent 3-digit combinations (e.g., "1,4,9").
- **`analyze_data.py`**:
    - Cleans and deduplicates data.
    - Generates `Data/number_frequency.txt`: Detailed statistics on Sum (0-27) and Combinations.

## 4. Current Implementation Status
- [x] **UI**: Fully migrated to PyQt5 with collapsible Browser/Simulator panels.
- [x] **Login**: Auto-login with token caching and validation.
- [x] **Data**: Robust sync logic, infinite loop fixed, dual storage (DB+TXT) implemented.
- [x] **Real-time**: Accurate 1s countdown and auto-refresh.
- [x] **Analysis**: High-frequency combination export implemented.
- [x] **Structure**: Clean project organization in `Canada28/` folder.
- [x] **New Features**:
    - **Real Account Sync**: Auto-syncs real account history after login and each draw.
    - **Profit Display**: Real-time account profit/loss in header (Green/Red color coding).
    - **Betting Control**: "First bet confirmation only" option for streamlined real betting.
    - **Statistics**: Historical extremes (Max Bet, Max Profit, Max Loss) calculated from single bets.
- [x] **Packaging**:
    - Added `build_exe.py` for one-click Windows EXE generation.
    - Added GitHub Actions workflow for automated Windows builds.
- [x] **Bug Fixes**:
    - Fixed period number displaying as float.
    - Fixed countdown timer accuracy using server time sync.
    - Fixed `config.json` and `token.json` path issues (now uses absolute paths).
    - Fixed button state update after cancelling confirmation.

## 5. How to Run
1. Navigate to the directory: `cd Canada28`
2. Run the main app: `python canada28_simulator_qt.py`
3. (Optional) Re-run analysis: `python migrate_db.py`
