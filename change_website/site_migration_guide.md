# 站点迁移适配指南 (Site Migration Guide)

本文档旨在为 AI 提供一份通用的站点迁移适配清单。当需要将 `Canada28` 模拟器适配到新的彩票站点时，请严格按照以下维度进行检查和修改。

## 1. 🔍 核心 API 采集清单 (必填)
在迁移前，请打开浏览器开发者工具 (F12) -> Network，进行相关操作并找到以下接口。

| 功能模块 | 接口作用 | 关键特征 (搜索关键词) | 需采集的信息 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **用户信息** | 获取当前余额、用户名 | `info`, `user`, `init` | 1. URL<br>2. 响应中的余额字段名 (如 `balance`, `surplus`, `SURP`, `money`) | 必须确认余额的单位（元/角/分/厘） |
| **开奖历史** | 获取最新开奖期号、号码 | `history`, `trend`, `lottery` | 1. URL<br>2. 期号字段 (`turnNum`, `period`)<br>3. 号码字段 (`openNum`) | 注意号码是字符串还是数组 |
| **自动投注** | 发送下注请求 | `bet`, `order`, `add` | 1. URL<br>2. 请求方式 (`POST/GET`)<br>3. **Payload 格式** (JSON 还是 Form-data)<br>4. 参数名 (`money`, `mode`, `num`) | **最关键**: 确认下注数据的 `key` 是什么 |
| **注单查询** | 验证下注结果、统计盈亏 | `order`, `record`, `query` | 1. URL<br>2. 响应中的盈亏字段 (`winMoney`, `profit`) | 用于统计胜率和自动止盈止损 |
| **首页初始化** | (可选) 获取特定 Token 或配置 | `home`, `config`, `init` | 1. URL<br>2. 响应头/Cookie | 有些站点需要先调此接口才能后续请求 |

## 2. 📝 代码适配检查点

### 2.1 基础配置 (data_manager.py)
*   [ ] **`base_url`**: 替换为新域名 (注意 `https/http`)。
*   [ ] **`SCALE` (金额系数)**:
    *   根据余额显示判断。如果网页显示 1000 元，接口返回 10000000，则 `SCALE = 10000`。
    *   **f5 站**: 1:1 (或 1:1000)。
    *   **s4 站**: 1:10000 (1元 = 10000厘)。
    *   **修改点**: 确保所有涉及金额的地方都统一乘/除以 `SCALE`。

### 2.2 认证鉴权 (Cookie/Token)
*   [ ] **关键 Cookie**: 确认用于维持会话的 Cookie 名称（通常是 `BMW` 或 `PHPSESSID`）。
*   [ ] **Token**: 检查是否需要 `Authorization` 头。如果是，需要在 `canada28_simulator_qt.py` 中注入 JS 提取 `localStorage`。

### 2.3 核心逻辑适配 (data_manager.py & Workers)
*   [ ] **`get_realtime_data` (用户信息)**:
    *   适配新的 JSON 响应路径 (例如 `data['surplus']` vs `data['info']['balance']`)。
*   [ ] **`fetch_remote_history` (历史数据)**:
    *   适配分页参数 (`page` vs `pageIndex`)。
    *   适配开奖号码解析 (如果是数组需 `",".join`)。
*   [ ] **`BettingWorker` (投注)**:
    *   **重中之重**: 确认 `Payload` 组装格式。
    *   **s4 特例**: 必须用 `data=...` 发送 Form-data，且金额需 `* SCALE`。
*   [ ] **`AccountSyncWorker` (账单)**:
    *   适配历史注单的解析逻辑，确保能正确算出当期盈亏。

### 2.4 UI 与 体验
*   [ ] **反爬虫/前置操作**:
    *   如果页面加载后需要点击“搜索”或输入验证码，需在 `on_browser_load_finished` 中编写自动化脚本。
*   [ ] **浮点数格式化**:
    *   确保所有日志输出使用 `:.2f`，避免出现 `9.999999` 这种丑陋的数字。

## 3. 🚀 打包与交付 (build_exe.py)
*   [ ] **进程清理**: 脚本是否包含了自动 kill 旧进程的逻辑？
*   [ ] **配置文件**: 确认使用相对路径 (`get_config_path`)，且 **不要打包配置好的 config.json** (或者提供一个纯净版)，避免泄露开发者路径。
*   [ ] **持久化**: 确认号码池不再依赖绝对路径文件，而是直接存入 `config.json`。

---
**使用说明**: 下次切换站点时，先让 AI 拿着这份表格去浏览器 Network 面板里填空，填完后再开始改代码，效率会提高 10 倍。
