
import time
import os
import json
from datetime import datetime, timedelta
from data_manager import CanadaDataManager
from db_manager import DBManager

def get_auth_from_config():
    # Attempt to load cookie/token from config.json
    paths = ['config.json', '../config.json']
    for p in paths:
        if os.path.exists(p):
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                    return config.get('token', 'DUMMY'), config.get('cookie', '')
            except:
                pass
    return "DUMMY", ""

def audit_gaps():
    print("\n🔍 --- 数据库断层审计 ---")
    db = DBManager()
    rows = db.get_all_records()
    if not rows:
        print("❌ 数据库为空")
        return []
    
    periods = [r[0] for r in rows]
    p_min, p_max = periods[0], periods[-1]
    expected = p_max - p_min + 1
    missing = expected - len(periods)
    
    print(f"统计概览: {p_min} -> {p_max}")
    print(f"总记录: {len(periods)} | 理论应有: {expected} | 缺失: {missing}")
    
    gaps = []
    curr = p_min
    for p in periods:
        if p > curr:
            gaps.append((curr, p-1, p-curr))
        curr = p + 1
    
    if gaps:
        print(f"发现 {len(gaps)} 处断层:")
        for s, e, l in gaps[:10]:
            print(f"  ❌ {s} -> {e} (缺 {l} 期)")
        if len(gaps) > 10:
            print("  ...")
    else:
        print("✅ 数据完美连续，无任何断层！")
    return gaps

def sync_data_range(start_date_str, end_date_str):
    print(f"\n🚀 开始同步区间: {start_date_str} 至 {end_date_str} ...")
    
    dm = CanadaDataManager()
    token, cookie = get_auth_from_config()
    if not cookie:
        print("⚠️ 未发现本地登录状态(Cookie)，请先运行模拟器登录。")
        # Ask for manual entry?
        cookie = input("请输入最新的 Cookie (BMW=...): ").strip()
        if not cookie: return
        
    dm.set_auth(token, cookie)
    
    try:
        start_date = datetime.strptime(start_date_str, "%Y%m%d")
        end_date = datetime.strptime(end_date_str, "%Y%m%d")
    except:
        print("❌ 日期格式错误，请使用 YYYYMMDD (例如 20260101)")
        return

    # Iterate day by day from end to start (latest first is usually better for API)
    curr_date = end_date
    total_added = 0
    
    while curr_date >= start_date:
        stage_str = curr_date.strftime("%Y%m%d")
        print(f"📅 正在同步日期: {stage_str} ...")
        
        for page in range(1, 15): # Max 15 pages per day
            url = f"{dm.base_url}/member/settingStage/page"
            payload = {"current": page, "size": 100, "stage": stage_str}
            
            try:
                res = dm.session.post(url, json=payload, headers=dm.headers, timeout=10)
                data = res.json()
                if data.get('code') != 200: break
                rows = data.get('data', {}).get('row', [])
                if not rows: break
                    
                added = 0
                for item in rows:
                    p_no = int(item['stageNo'])
                    tm = item['openTime']
                    nums = item.get('openNumber', '')
                    if not nums or len(nums) < 3: continue
                    try:
                        n1, n2, n3 = int(nums[0]), int(nums[1]), int(nums[2])
                        r_sum = n1 + n2 + n3
                    except: continue
                    
                    # Construct raw line for text file sync
                    big = "大" if r_sum >= 14 else "小"
                    odd = "单" if r_sum % 2 != 0 else "双"
                    d = {'overt_at': tm, 'period_no': str(p_no), 'b': str(n1), 's': str(n2), 'g': str(n3),
                         'number_overt': nums, 'result_sum': str(r_sum), 'is_big_msg': big, 'is_odd_msg': odd,
                         'lhh': '', 'fan': '', 'fan_sum': ''}
                    raw = dm.format_data_line(d)
                    
                    if dm.db.insert_record(p_no, tm, n1, n2, n3, r_sum, raw):
                        added += 1
                
                total_added += added
                if len(rows) < 100: break
            except Exception as e:
                print(f"  ❌ 请求错误: {e}")
                break
            time.sleep(0.2)
            
        curr_date -= timedelta(days=1)
        
    print(f"\n🎉 同步完成! 本次共补全 {total_added} 条新记录。")
    
def export_to_txt():
    path = r"Data/canada28.txt"
    if not os.path.exists("Data"): os.makedirs("Data")
    
    print(f"\n💾 正在同步到本地文本文件: {path} ...")
    db = DBManager()
    rows = db.get_all_records()
    if not rows: return
    
    header1 = "开奖时间	期号	佰	拾	个	开奖号码	总和	大小	单双	龙虎和	番	番数值\n"
    header2 = "============================================================================================================================================\n"
    
    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header1); f.write(header2)
            for r in rows:
                if r[-1]: f.write(r[-1])
        print(f"✅ 同步成功，共写入 {len(rows)} 条唯一记录。")
    except Exception as e:
        print(f"❌ 写入失败: {e}")

def main():
    print("========================================")
    print("   🇨🇦 Canada28 数据维护工具 (专业版)   ")
    print("========================================")
    
    while True:
        print("\n[1] 扫描数据库断层 (Audit)")
        print("[2] 按日期区间同步 (Sync Range)")
        print("[3] 强制刷新本地文本 (Sync DB to TXT)")
        print("[0] 退出")
        
        choice = input("\n请选择功能: ").strip()
        if choice == '1':
            audit_gaps()
        elif choice == '2':
            start = input("请输入起始日期 (如 20260101): ").strip()
            end = input("请输入结束日期 (如 20260120): ").strip()
            if start and end:
                sync_data_range(start, end)
                # Auto-sync to txt after repair
                export_to_txt()
        elif choice == '3':
            export_to_txt()
        elif choice == '0':
            break
        else:
            print("❌ 无效选择")

if __name__ == "__main__":
    main()
