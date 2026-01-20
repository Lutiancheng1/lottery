
import time
import os
import json
import sys
import requests
from datetime import datetime, timedelta
from data_manager import CanadaDataManager
from db_manager import DBManager

def get_color(r_sum):
    if r_sum in [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]: return '红波'
    if r_sum in [1, 4, 7, 10, 13, 16, 19, 22, 25]: return '绿波'
    if r_sum in [2, 5, 8, 11, 14, 17, 20, 23, 26]: return '蓝波'
    return '波色'

def get_extreme(r_sum):
    if r_sum <= 5: return '极小'
    if r_sum >= 22: return '极大'
    return '---'

def get_lhh(n1, n3):
    if n1 > n3: return '龙'
    if n1 < n3: return '虎'
    return '和'

def get_fanshu(r_sum):
    """
    根据用户原始记录推导的番数逻辑: sum % 4 (余数为0时记为4)
    """
    val = r_sum % 4
    return 4 if val == 0 else val

def format_standard_line(tm, p_no, n1, n2, n3, r_sum):
    big_small = '大' if r_sum >= 14 else '小'
    odd_even = '单' if r_sum % 2 != 0 else '双'
    lhh = get_lhh(n1, n3)
    f_val = get_fanshu(r_sum)
    
    # 严格匹配用户原始 12 列格式:
    # 1.时间 2.期号 3.佰 4.拾 5.个 6.开奖号码(n1n2n3) 7.总和 8.大小 9.单双 10.龙虎和 11.番 12.番数值
    return f"{tm}\t{p_no}\t{n1}\t{n2}\t{n3}\t{n1}{n2}{n3}\t{r_sum}\t{big_small}\t{odd_even}\t{lhh}\t{f_val}番\t{f_val}\n"

def get_config_path(filename):
    """获取配置文件路径 (适配打包环境)"""
    if getattr(sys, 'frozen', False):
        script_dir = os.path.dirname(sys.executable)
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, filename)

def get_auth_from_local():
    """从本地 token.json 加载缓存的 Token"""
    token_path = get_config_path("token.json")
    if os.path.exists(token_path):
        try:
            with open(token_path, "r") as f:
                data = json.load(f)
                return data.get("token", ""), data.get("cookie", "")
        except Exception as e:
            print(f"❌ 加载本地 Token 失败: {e}")
    return "", ""

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

def fetch_with_retry(dm, page, limit=20, max_retries=3):
    """带重试机制的抓取函数"""
    for i in range(max_retries):
        try:
            data = dm.fetch_remote_history(page=page, limit=limit)
            if data and data.get('code') == 0:
                return data
            print(f"  ⚠️ 第 {page} 页请求返回异常 (重试 {i+1}/{max_retries}): {data.get('msg') if data else 'No Response'}")
        except Exception as e:
            print(f"  ⚠️ 第 {page} 页请求出错 (重试 {i+1}/{max_retries}): {e}")
        time.sleep(1.5)
    return None

def fill_gap_range(dm, start_p, end_p, latest_p):
    """
    强制填充一个断层区间 [start_p, end_p]
    """
    print(f"\n🛠️ 正在修复断层: {start_p} -> {end_p} (共 {end_p - start_p + 1} 期)")
    
    # 估算起始页码 (从断层结束位置开始往后翻)
    estimated_page = max(1, (latest_p - end_p) // 14)
    # 往前多看 5 页，确保能覆盖到 end_p
    current_page = max(1, estimated_page - 5)
    
    print(f"📍 估算目标在第 {estimated_page} 页附近，从第 {current_page} 页开始强制填充...")
    
    total_added = 0
    consecutive_no_new = 0
    
    while True:
        print(f"📄 正在同步第 {current_page} 页 ...")
        data = fetch_with_retry(dm, current_page)
        
        if not data:
            print(f"  ❌ 第 {current_page} 页多次重试失败，跳过。")
            current_page += 1
            continue
            
        rows = data.get('data', [])
        if not rows:
            print("  ℹ️ 没有更多远程数据。")
            break
            
        page_min = int(rows[-1]['period_no'])
        page_max = int(rows[0]['period_no'])
        
        added = 0
        for item in rows:
            p_no = int(item['period_no'])
            # 只有在断层区间内的才处理
            if start_p <= p_no <= end_p:
                tm = item['overt_at']
                n1, n2, n3 = int(item['b']), int(item['s']), int(item['g'])
                r_sum = int(item['result_sum'])
                raw = format_standard_line(tm, p_no, n1, n2, n3, r_sum)
                if dm.db.insert_record(p_no, tm, n1, n2, n3, r_sum, raw):
                    added += 1
        
        if added > 0:
            print(f"  ✅ 本页捕获 {added} 条断层记录。 (范围: {page_min} ~ {page_max})")
            total_added += added
            consecutive_no_new = 0
        else:
            print(f"  ℹ️ 本页无目标记录。 (范围: {page_min} ~ {page_max})")
            consecutive_no_new += 1
            
        # 停止条件：
        # 1. 当前页的最小期号已经小于等于我们要找的 start_p
        if page_min <= start_p:
            print(f"  🎯 已填满该断层区间 (到达 {page_min})。")
            break
            
        # 2. 如果连续 50 页都没有新记录，且我们已经越过了目标范围，安全退出
        if consecutive_no_new > 50 and page_min < start_p:
            print("  ⚠️ 连续多页无记录且已越过目标，停止。")
            break
            
        current_page += 1
        time.sleep(0.3)
        
    return total_added

def repair_all_gaps():
    print("\n🚀 开始自动修复所有断层 (区间强制填充模式) ...")
    gaps = audit_gaps()
    if not gaps:
        print("✅ 无需修复。")
        return

    dm = CanadaDataManager()
    token, cookie = get_auth_from_local()
    if not token:
        print("⚠️ 未发现本地登录状态(Token)，请先运行模拟器登录。")
        token = input("请输入 Token: ").strip()
        if not token: return
    
    dm.set_auth(token, cookie)
    
    # 获取远程最新期号用于初始估算
    remote_latest = dm.get_remote_latest()
    if not remote_latest:
        print("❌ 无法获取远程数据。")
        return
    latest_p = int(remote_latest['period_no'])

    total_added = 0
    # 针对每个断层进行强制填充
    for start_p, end_p, length in reversed(gaps):
        total_added += fill_gap_range(dm, start_p, end_p, latest_p)

    print(f"\n🎉 修复尝试完成! 本次共补全 {total_added} 条新记录。")
    export_to_txt()

def export_to_txt():
    path = r"Data/canada28.txt"
    if not os.path.exists("Data"): os.makedirs("Data")
    
    print(f"\n💾 正在同步到本地文本文件: {path} ...")
    db = DBManager()
    rows = db.get_all_records()
    if not rows: return
    
    header1 = "加拿大28 历史数据\n"
    header2 = "时间\t期号\t值1\t值2\t值3\t组合\t和值\t大小\t单双\t极值\t番数\t波色\n"
    
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
    print("   🇨🇦 Canada28 数据维护工具 (S1版)   ")
    print("========================================")
    
    while True:
        print("\n[1] 扫描数据库断层 (Audit)")
        print("[2] 批量同步最新数据 (Sync Latest)")
        print("[3] 自动修复所有断层 (Auto Repair Gaps)")
        print("[4] 强制刷新本地文本 (Sync DB to TXT)")
        print("[0] 退出")
        
        choice = input("\n请选择功能: ").strip()
        if choice == '1':
            audit_gaps()
        elif choice == '2':
            pages = input("请输入要同步的页数 (默认 50): ").strip()
            max_p = int(pages) if pages.isdigit() else 50
            dm = CanadaDataManager()
            token, cookie = get_auth_from_local()
            if not token:
                token = input("请输入 Token: ").strip()
            if token:
                dm.set_auth(token, cookie)
                # 简单同步逻辑
                for p in range(1, max_p + 1):
                    print(f"📄 正在同步第 {p} 页 ...")
                    data = fetch_with_retry(dm, p)
                    if not data or not data.get('data'): break
                    for item in data['data']:
                        p_no = int(item['period_no'])
                        tm = item['overt_at']
                        n1, n2, n3 = int(item['b']), int(item['s']), int(item['g'])
                        r_sum = int(item['result_sum'])
                        raw = format_standard_line(tm, p_no, n1, n2, n3, r_sum)
                        dm.db.insert_record(p_no, tm, n1, n2, n3, r_sum, raw)
                export_to_txt()
        elif choice == '3':
            repair_all_gaps()
        elif choice == '4':
            export_to_txt()
        elif choice == '0':
            break
        else:
            print("❌ 无效选择")

if __name__ == "__main__":
    main()
