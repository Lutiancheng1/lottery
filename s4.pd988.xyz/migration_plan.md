# s4.pd988.xyz 迁移工作计划

## 阶段一：准备工作 (已完成)

- [x] 创建 `s4.pd988.xyz` 文件夹。
- [x] 复制所有 `f5.ab311c.com` 的源文件。
- [x] 整理需要替换的接口清单。

## 阶段二：寻找新接口 (进行中)

- [ ] 在 `s4.pd988.xyz` 站点进行抓包。
- [ ] 填写 `api_migration_list.md` 中的空白部分。
- [ ] 确认新站的认证机制（是否仍为 Cookie，是否有额外的 Header）。

## 阶段三：代码替换与适配

- [ ] 修改 `data_manager.py` 中的 `base_url`。
- [ ] 批量替换 `canada28_simulator_qt.py` 中的域名。
- [ ] 根据 `api_migration_list.md` 调整 `data_manager.py` 中的解析逻辑。
- [ ] 调整 `canada28_simulator_qt.py` 中的 `AccountSyncWorker` 和 `BettingWorker`。

## 阶段四：验证与测试

- [ ] 运行 `test_api.py` 验证基础接口。
- [ ] 启动模拟器，验证登录和余额抓取。
- [ ] 验证历史数据同步功能。
- [ ] 进行小额真实下注测试。
- [ ] 检查日志输出，确保无报错。

## 阶段五：清理与交付

- [ ] 删除 `s4.pd988.xyz` 文件夹中与 `f5` 相关的冗余 TXT 文件。
- [ ] 最终打包测试。
