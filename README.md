# PC28彩票项目

## 📊 项目简介

这是一个完整的PC28/加拿大28彩票数据分析和投注模拟系统，包含数据爬取、分析、实时模拟等功能。

## 🎯 主要功能

### 1. 数据爬取
- [game_periods_gui_v2.py](game_periods_gui_v2.py) - V2版GUI爬虫（推荐）
- 支持按页码范围爬取
- 自动去重和数据整理
- 完整的历史数据（2025-12-12至2026-01-11）

### 2. 实时投注模拟
- [canada28_simulator.py](canada28_simulator.py) - 简化版模拟器（推荐）⭐
- [live_betting_simulator_backup_3d.py](live_betting_simulator_backup_3d.py) - 原版模拟器（备份）
- Token认证登录
- 实时开奖数据获取
- 智能投注策略（逐期对冲）
- 盈亏曲线可视化

### 3. 辅助工具
- [token_extractor.py](token_extractor.py) - Token提取器
- [dynamic_hot_pool.py](dynamic_hot_pool.py) - 动态号码池
- [pc28_gui.py](pc28_gui.py) - PC28爬虫

## 📁 项目结构

```
.
├── Canada_data/                    # 数据文件夹
│   ├── final_complete_*.xlsx      # 完整历史数据
│   └── final_complete_*.txt
├── canada28_simulator.py          # ⭐ 简化版模拟器（推荐使用）
├── game_periods_gui_v2.py         # ⭐ V2爬虫（推荐使用）
├── token_extractor.py             # Token提取工具
├── dynamic_hot_pool.py            # 动态号码池模块
├── live_betting_simulator_backup_3d.py  # 原版模拟器
├── pc28_gui.py                    # PC28爬虫
├── 加拿大28模拟器使用说明.md     # 使用文档
└── 动态号码池使用指南.md         # 号码池文档
```

## 🚀 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

主要依赖：
- tkinter（GUI）
- requests（网络请求）
- pandas（数据处理）
- matplotlib（图表）
- openpyxl（Excel）
- urllib3（SSL处理）

### 2. 使用简化版模拟器

```bash
python canada28_simulator.py
```

**使用步骤：**
1. 点击"🔑 登录"输入Token
2. 导入号码文件
3. 点击"▶ 开始模拟"

### 3. 获取Token

```bash
python token_extractor.py
```

或手动获取：
1. 浏览器访问 http://s1.pk999p.xyz/
2. 登录账号
3. F12打开开发者工具
4. Network标签中找到请求
5. 在Request Headers中复制token

### 4. 爬取数据

```bash
python game_periods_gui_v2.py
```

设置页码范围和日期过滤后开始爬取。

## 📖 详细文档

- [加拿大28模拟器使用说明](加拿大28模拟器使用说明.md)
- [动态号码池使用指南](动态号码池使用指南.md)

## 🔑 核心技术

### API认证
使用Token进行身份验证，支持自动过期检测。

### 投注策略
采用逐期对冲策略：
- 输了：增加投注额（比例+固定）
- 赢了：达到对冲条件后递减

### 数据处理
- 自动去重（基于期号）
- 时间排序
- 支持Excel和TXT导出

## 📊 数据说明

**历史数据：**
- 时间范围：2025-12-12 至 2026-01-11
- 总记录数：11,552条
- 开奖间隔：约4分钟

## ⚠️ 注意事项

1. **Token有效期**：Token会过期，需定期更新
2. **网络连接**：需要稳定的网络连接
3. **风险提示**：投注模拟仅用于研究学习
4. **数据备份**：定期备份数据到Canada_data文件夹

## 🛠️ 开发信息

- **开发工具**：Python 3.x
- **GUI框架**：Tkinter
- **数据处理**：Pandas
- **可视化**：Matplotlib

## 📝 更新日志

### v2.0 (2026-01-12)
- ✅ 创建简化版模拟器
- ✅ 适配新API（Token认证）
- ✅ 优化代码结构（650行）
- ✅ 清理临时文件

### v1.0 (2026-01-11)
- ✅ 完成数据爬取
- ✅ 数据去重合并
- ✅ 创建GUI爬虫
- ✅ 完成原版模拟器

## 📧 联系方式

如有问题，请提交Issue。

---

**⭐ 推荐使用文件：**
- `canada28_simulator.py` - 实时模拟
- `game_periods_gui_v2.py` - 数据爬取
- `token_extractor.py` - Token获取
