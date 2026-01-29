# s4.pd988.xyz 接口迁移清单

为了实现一比一迁移，已根据抓包数据记录了新站 `s4.pd988.xyz` 的接口信息，并与老站 `f5.ab311c.com` 进行了对比。

## 1. 基础信息接口

### 1.1 初始化/倒计时

- **老站接口**: `POST http://f5.ab311c.com/member/index/init`
- **用途**: 获取当前可投注期号 (`stageNo`) 和封盘剩余时间 (`remainingTime`)。
- **新站接口**: `GET https://s4.pd988.xyz/initHome?awaken=180`
- **解析映射**:
  - `lottry.lttnum` -> `stageNo`
  - `lottry.remainTime` -> `remainingTime` (单位: 毫秒，需除以 1000 转换为秒)
- **注意**: 新站返回的数据在 `lottry` 对象中。

### 1.2 最新开奖结果

- **老站接口**: `POST http://f5.ab311c.com/member/index/new/open`
- **用途**: 获取最近一期的开奖号码。
- **新站接口**: `POST https://s4.pd988.xyz/refresh`
- **解析映射**:
  - `data.LTTNUM` -> `stageNo`
  - `data.NUMS` -> `openNumber` (格式为 "3,1,1"，需移除逗号)

### 1.3 用户信息/余额

- **老站接口**: `POST http://f5.ab311c.com/member/index/userInfo`
- **新站接口**: `GET https://s4.pd988.xyz/initUserInfo`
- **金额缩放 (关键)**:
  - 老站: `remainingLimit` (如 `10000.0` 代表 1万)
  - 新站: `credit.CURR` (如 `100000000` 代表 1万，**即单位为 0.0001**)
  - **迁移策略**: 程序内部逻辑统一使用实际金额 (float)，在调用新站请求时 `* 10000`，解析响应时 `/ 10000`。

---

## 2. 数据同步接口

### 2.1 历史开奖记录 (批量)

- **老站接口**: `POST http://f5.ab311c.com/member/settingStage/page`
- **参数**: `{"current": 1, "size": 100, "stage": "YYYYMMDD"}`
- **新站接口**: `POST https://s4.pd988.xyz/page/lottery/showHistoryLottery`
- **参数映射**:
  - `paramMap.pageNum` = `current`
  - `paramMap.pageSize` = `size`
  - `paramMap.lttnum` = `stage` (日期字符串)
- **数据处理差异**:
  - 新站不直接返回 `openNumber`，需根据 `HUNDRED`, `TEN`, `ONE` 拼接。
  - `result_sum` 需手动计算: `HUNDRED + TEN + ONE`。

---

## 3. 交易与报表接口

### 3.1 下注接口

- **老站接口**: `POST http://f5.ab311c.com/member/bet/doOrder`
- **新站接口**: `POST https://s4.pd988.xyz/lot/beting` (Form-data)
- **参数构造**:
  - 老站 JSON: `{"betNoList": [{"bn": "001", "am": "0.1"}], "stageNo": "3386210", "ock": "uuid", "orderWays": 6}`
  - 新站 Form:
    - `paramMap.nms`: `[{"nm":"001","am":1000}]` (**注意: am 需乘以 10000**)
    - `paramMap.ltm`: `3389440` (期号)
    - `paramMap.ock`: `uuid`
    - `paramMap.bw`: `4` (对应老站开奖方式 6)

### 3.2 报表与历史盈亏

- **老站接口**: `/member/report/history` (按日期范围查汇总)
- **新站接口**: `/queryOrderHistory` (按期号分页查看)
- **适配建议**: 盈亏数据计算逻辑需更新。

### 3.3 期号注单明细

- **老站接口**: `/member/orders/ordersInfoList` (带 `stageNo`)
- **新站接口**: `/queryOrderDetail` (带 `paramMap.lttnum`)
- **适配细节 (关键修复)**:
  - **提交格式**: 必须使用 `application/x-www-form-urlencoded` (Form Data)，使用 JSON 提交会返回“无记录”。
  - **分页处理**: 详情接口单页上限通常为 300 条。若单期投注号码较多（如 500+），必须通过 `paramMap.pageNum` 循环翻页抓取，否则统计金额会缺失。
  - **金额缩放**: 返回的 `amount` 和 `bonus` 同样需要除以 `10000`。

---

## 4. 迁移可行性评估：**支持一比一复刻**

| 内容           | 结论     | 备注                                                                      |
| :------------- | :------- | :------------------------------------------------------------------------ |
| **功能完整性** | 完全支持 | 所有核心功能（数据同步、实时监控、自动投注、报表统计）均有对应接口。      |
| **逻辑复杂度** | 中等     | 主要工作量在于 `data_manager.py` 的解析逻辑更新和金额 1000 倍缩放的处理。 |
| **认证机制**   | 相同     | 均基于 Cookie (`BMW`)，只需替换域名即可。                                 |
| **性能影响**   | 无       | 接口响应结构相似，不会影响同步效率。                                      |
