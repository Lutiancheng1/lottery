# s4.pd988.xyz 接口迁移清单

为了实现一比一迁移，已根据抓包数据记录了新站 `s4.pd988.xyz` 的接口信息。

## 1. 基础信息接口

### 1.1 初始化/倒计时

- **老站接口**: `POST http://f5.ab311c.com/member/index/init`
- **用途**: 获取当前期号 (`stageNo`) 和剩余时间 (`remainingTime`)。
- **新站对应接口**: `GET https://s4.pd988.xyz/initHome?awaken=180`
- **返回值映射**: `lottry.lttnum` -> `stageNo`, `lottry.remainTime` -> `remainingTime` (单位: 毫秒)

### 1.2 最新开奖结果

- **老站接口**: `POST http://f5.ab311c.com/member/index/new/open`
- **用途**: 获取上一期的期号 (`stageNo`) 和开奖号码 (`openNumber`)。
- **新站对应接口**: `POST https://s4.pd988.xyz/refresh`
- **返回值映射**: `data.LTTNUM` -> `stageNo`, `data.NUMS` -> `openNumber` (格式: "3,1,1")

### 1.3 用户信息/余额

- **老站接口**: `POST http://f5.ab311c.com/member/index/userInfo`
- **用途**: 获取余额 (`remainingLimit`)。
- **新站对应接口**: `GET https://s4.pd988.xyz/initUserInfo`
- **返回值映射**: `credit.SURP` -> `remainingLimit`

---

## 2. 数据同步接口

### 2.1 历史开奖记录

- **老站接口**: `POST http://f5.ab311c.com/member/settingStage/page`
- **参数**: `{"current": 1, "size": 100, "stage": ""}`
- **用途**: 批量同步历史开奖数据。
- **新站对应接口**: `POST https://s4.pd988.xyz/page/lottery/showHistoryLottery`
- **参数映射**: `paramMap.pageNum` -> `current`, `paramMap.pageSize` -> `size`, `paramMap.lttnum` -> `stage` (日期格式 YYYYMMDD)

---

## 3. 交易与报表接口

### 3.1 下注接口

- **老站接口**: `POST http://f5.ab311c.com/member/bet/doOrder`
- **参数**: `{"betNoList": [{"bn": "001", "am": "0.1"}], "orderWays": 6, "stageNo": "3386210", "ock": "uuid"}`
- **用途**: 提交订单。
- **新站对应接口**: `POST https://s4.pd988.xyz/lot/beting`
- **参数映射**: `paramMap.nms` -> `betNoList`, `paramMap.ltm` -> `stageNo`, `paramMap.ock` -> `ock`, `paramMap.bw` -> `orderWays` (固定值4?)
- **注意**: Content-Type 为 `application/x-www-form-urlencoded`

### 3.2 报表历史 (盈亏)

- **老站接口**: `POST http://f5.ab311c.com/member/report/history`
- **参数**: `{"startTime": "2026-01-01", "endTime": "2026-01-27", "current": 1, "size": 100}`
- **用途**: 获取每日盈亏。
- **新站对应接口**: `POST https://s4.pd988.xyz/queryOrderHistory`
- **参数映射**: `paramMap.pageNum` -> `current`, `paramMap.pageSize` -> `size`

### 3.3 订单明细

- **老站接口**: `POST http://f5.ab311c.com/member/orders/ordersInfoList`
- **参数**: `{"stageNo": "3386210", "searchType": "amt", "current": 1, "size": 50}`
- **用途**: 校验具体期号的下注状态。
- **新站对应接口**: `POST https://s4.pd988.xyz/queryOrderDetail`
- **参数映射**: `paramMap.lttnum` -> `stageNo`

---

## 4. 认证信息

- **认证方式**: Cookie
- **关键 Cookie 名称**: `BMW` (经确认新站仍使用此名称)
