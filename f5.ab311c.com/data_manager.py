import os
import sys
import time
import json
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import pandas as pd
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from db_manager import DBManager

class CanadaDataManager:
    """加拿大28 数据管理器 (数据库 + 文本文件双重存储)"""
    
    def __init__(self, data_dir="Data"):
        # 确保 data_dir 是相对于当前脚本的路径 (Canada28/Data)
        if getattr(sys, 'frozen', False):
            base_dir = os.path.dirname(sys.executable)
        else:
            base_dir = os.path.dirname(os.path.abspath(__file__))
        self.data_dir = os.path.join(base_dir, data_dir)
        
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
            
        self.base_url = "http://f5.ab311c.com"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
        self.token = ""
        self.cookie = ""
        self.game_id = 2
        self.update_threshold = 100
        self.session = requests.Session()
        
        # 配置重试策略
        retry_strategy = Retry(
            total=3,  # 最大重试次数
            backoff_factor=1,  # 重试间隔指数退避
            status_forcelist=[429, 500, 502, 503, 504],  # 哪些状态码触发重试
            allowed_methods=["HEAD", "GET", "POST", "OPTIONS"]  # 哪些方法触发重试
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)
        
        # 初始化数据库管理器
        self.db = DBManager()
        
        # 确保有一个本地txt文件存在 (用于用户查看)
        self.current_txt_file = os.path.join(self.data_dir, "canada28.txt")
        self._ensure_txt_file_exists()

    def _ensure_txt_file_exists(self):
        """确保本地txt文件存在"""
        if not os.path.exists(self.current_txt_file):
            with open(self.current_txt_file, 'w', encoding='utf-8') as f:
                f.write("加拿大28 历史数据\n")
                f.write("时间\t期号\t值1\t值2\t值3\t组合\t和值\t大小\t单双\t极值\t番数\t波色\n")

    def set_auth(self, token: str, cookie: str):
        """设置认证信息"""
        self.token = token # 这里的token可能不再是Bearer Token，但保留作为登录状态标记
        self.cookie = cookie
        # 清除旧的会话Cookie，确保使用最新的
        self.session.cookies.clear()
        self.headers["Cookie"] = cookie
        # 新站不需要 Authorization header
        # self.headers["Authorization"] = f"Bearer {token}"

    def get_local_latest(self) -> Optional[Dict]:
        """获取本地最新的期号和时间 (从数据库读取)"""
        record = self.db.get_latest_record()
        if record:
            # record: (period_no, draw_time, num1, num2, num3, result_sum, raw_line)
            # 为了保证字段齐全，我们解析 raw_line
            return self.parse_data_line(record[-1])
        return None

    def append_to_local_file(self, data_list: List[Dict]):
        """追加数据到本地 (同时写入数据库和TXT文件)"""
        if not data_list:
            return

        # 1. 写入数据库
        for data in data_list:
            line = self.format_data_line(data)
            try:
                # 解析数据用于DB插入 (使用制表符分割，与 parse_data_line 保持一致)
                parts = line.strip().split('\t')
                if len(parts) >= 8:
                    draw_time = parts[0]
                    period_no = int(parts[1])
                    num1 = int(parts[2])
                    num2 = int(parts[3])
                    num3 = int(parts[4])
                    # parts[5] 是 number_overt
                    result_sum = int(parts[6])
                    
                    # 只有当有开奖号码时才存入数据库
                    if parts[5]:
                        self.db.insert_record(period_no, draw_time, num1, num2, num3, result_sum, line)
            except Exception as e:
                print(f"❌ DB写入错误: {e}")

        # 2. 追加到TXT文件 (保持用户查看习惯)
        try:
            with open(self.current_txt_file, 'a', encoding='utf-8') as f:
                for data in data_list:
                    line = self.format_data_line(data)
                    f.write(line)
                f.flush()
                os.fsync(f.fileno())
            print(f"✅ 已更新本地数据文件: {len(data_list)} 条记录")
        except Exception as e:
            print(f"❌ TXT写入错误: {e}")
            
    def read_all_local_data(self) -> List[Dict]:
        """读取所有本地数据 (从数据库读取并转换为字典列表)"""
        rows = self.db.get_all_records()
        # row[-1] 是 raw_line
        data_list = []
        for row in rows:
            parsed = self.parse_data_line(row[-1])
            if parsed:
                data_list.append(parsed)
        return data_list

    def get_lhh(self, n1, n3):
        if n1 > n3: return '龙'
        if n1 < n3: return '虎'
        return '和'

    def get_fanshu(self, r_sum):
        """
        根据用户原始记录推导的番数逻辑: sum % 4 (余数为0时记为4)
        """
        val = r_sum % 4
        return 4 if val == 0 else val

    def format_data_line(self, data: Dict) -> str:
        """将远程数据格式化为本地文件格式 (严格匹配 12 列原始格式)"""
        overt_at = data.get('overt_at', '')
        period_no = data.get('period_no', '')
        b = data.get('b', 0)
        s = data.get('s', 0)
        g = data.get('g', 0)
        result_sum = data.get('result_sum', 0)
        
        # 移除开奖号码中的逗号
        num_str = str(data.get('number_overt', '')).replace(',', '')
        
        big_small = '大' if int(result_sum) >= 14 else '小'
        odd_even = '单' if int(result_sum) % 2 != 0 else '双'
        lhh = self.get_lhh(int(b), int(g))
        f_val = self.get_fanshu(int(result_sum))
        
        # 格式: 1.时间 2.期号 3.佰 4.拾 5.个 6.开奖号码 7.总和 8.大小 9.单双 10.龙虎和 11.番 12.番数值
        line = f"{overt_at}\t{period_no}\t{b}\t{s}\t{g}\t{num_str}\t{result_sum}\t{big_small}\t{odd_even}\t{lhh}\t{f_val}番\t{f_val}\n"
        return line

    def get_realtime_data(self) -> Optional[Dict]:
        """获取实时游戏数据 (合并 init, new/open 和 userInfo 接口)"""
        if not self.cookie:
            return None
        try:
            # 1. 获取倒计时和期号 (Next Period)
            init_url = f"{self.base_url}/member/index/init"
            init_res = self.session.post(init_url, json={}, headers=self.headers, timeout=10)
            init_data = init_res.json()
            
            # 2. 获取最新开奖结果 (Previous Period)
            open_url = f"{self.base_url}/member/index/new/open"
            open_res = self.session.post(open_url, json={}, headers=self.headers, timeout=10)
            open_data = open_res.json()
            
            # 3. 获取余额
            user_url = f"{self.base_url}/member/index/userInfo"
            user_res = self.session.post(user_url, json={}, headers=self.headers, timeout=10)
            user_data = user_res.json()

            if init_data.get('code') == 200 and user_data.get('code') == 200:
                # print("✅ API 数据获取成功")
                pass
            else:
                print(f"⚠️ API 返回错误: init={init_data.get('code')}, user={user_data.get('code')}, open={open_data.get('code')}")
                if init_data.get('code') == 602 or user_data.get('code') == 602:
                    print("🚫 登录已过期 (Code 602)")
                return None
            
            if init_data.get('code') == 200 and user_data.get('code') == 200:
                setting_stage = init_data.get('data', {}).get('settingStage', {})
                user_info = user_data.get('data', {}).get('ml', {})
                last_open = open_data.get('data', {}) if open_data.get('code') == 200 else {}
                
                now = time.time()
                # 修正：remainingTime 单位是毫秒，需要转换为秒
                try:
                    remaining = float(setting_stage.get('remainingTime', 0)) / 1000.0
                except (ValueError, TypeError):
                    remaining = 0
                if remaining < 0: remaining = 0
                # 构造兼容旧版的数据结构
                return {
                    'server_at': now,
                    'user': {
                        'CM_surplus': user_info.get('remainingLimit', 0)
                    },
                    'n_period': {
                        'period_no': setting_stage.get('stageNo'),
                        'finish_at': now + remaining,
                        'period_status': 1 # 默认设为投注中
                    },
                    'p_period': {
                        'period_no': last_open.get('stageNo'),
                        'number_overt': last_open.get('openNumber')
                    }
                }
            return None
        except Exception as e:
            print(f"❌ 获取实时数据失败: {e}")
            return None

    def get_user_balance(self) -> Optional[float]:
        """获取用户余额"""
        data = self.get_realtime_data()
        if data:
            user_data = data.get('user', {})
            balance = user_data.get('CM_surplus')
            if balance:
                return float(balance)
        return None

    def fetch_remote_history(self, page=1, limit=100) -> Optional[Dict]:
        """获取远程历史记录 (适配新接口)"""
        if not self.cookie:
            return None
        try:
            url = f"{self.base_url}/member/settingStage/page"
            payload = {
                "current": page,
                "size": limit,
                "stage": ""
            }
            response = self.session.post(url, json=payload, headers=self.headers, timeout=10)
            res_json = response.json()
            
            if res_json.get('code') == 200:
                new_rows = res_json.get('data', {}).get('row', [])
                converted_data = []
                for row in new_rows:
                    open_num = row.get('openNumber', '')
                    # 如果没有开奖号码，我们仍然保留它（用于验证），但在同步时可能需要过滤
                    
                    b, s, g, result_sum = 0, 0, 0, 0
                    if open_num and len(open_num) >= 3:
                        try:
                            b = int(open_num[0])
                            s = int(open_num[1])
                            g = int(open_num[2])
                            result_sum = b + s + g
                        except:
                            pass
                    
                    converted_data.append({
                        'overt_at': row.get('openTime'),
                        'period_no': row.get('stageNo'),
                        'b': b,
                        's': s,
                        'g': g,
                        'number_overt': open_num,
                        'result_sum': result_sum,
                        'is_big_msg': '大' if result_sum >= 14 else '小',
                        'is_odd_msg': '单' if result_sum % 2 != 0 else '双',
                        'lhh': '', 
                        'fan': '',
                        'fan_sum': ''
                    })
                        
                # 过滤掉尚未开奖的期号 (没有 openNumber 的)
                filtered_data = [d for d in converted_data if d.get('number_overt')]
                return {'code': 0, 'data': filtered_data}
            return None
        except Exception as e:
            print(f"❌ 获取远程数据失败: {e}")
            return None

    def get_remote_latest(self) -> Optional[Dict]:
        """获取远程最新一期数据"""
        data = self.fetch_remote_history(page=1, limit=20) # 多取几条，确保能找到已开奖的
        if data and 'data' in data and data['data']:
            # fetch_remote_history 已经过滤了未开奖的，所以取第一个就是最新的已开奖期号
            return data['data'][0]
        return None

    def calculate_period_gap(self, local_data: Dict, remote_data: Dict) -> int:
        """计算期数差异"""
        if not local_data or not remote_data:
            return 0
        try:
            local_period = int(local_data.get('period_no', 0))
            remote_period = int(remote_data.get('period_no', 0))
            return remote_period - local_period
        except:
            return 0

    def fetch_missing_data(self, gap: int) -> List[Dict]:
        """获取缺失的历史数据"""
        missing_data = []
        pages_needed = (gap + 99) // 100
        print(f"📥 需要获取 {pages_needed} 页数据（共约{gap}期）...")
        for page in range(1, pages_needed + 1):
            print(f"📡 正在获取第 {page}/{pages_needed} 页...")
            data = self.fetch_remote_history(page=page, limit=100)
            if data and 'data' in data:
                missing_data.extend(data['data'])
            if page < pages_needed:
                time.sleep(1.0)  # 优化: 改为1秒延迟，避免频繁请求导致卡顿和服务器压力
        missing_data.reverse()
        return missing_data[-gap:]

    def sync_historical_data(self) -> bool:
        """同步历史数据"""
        print("🔄 检查历史数据更新...")
        local_latest = self.get_local_latest()
        if not local_latest:
            print("⚠️ 本地无数据，尝试从远程获取...")
            missing_data = self.fetch_missing_data(100)
            if missing_data:
                self.append_to_local_file(missing_data)
                return True
            return False
            
        remote_latest = self.get_remote_latest()
        if not remote_latest:
            print("⚠️ 无法获取远程数据（可能暂无开奖），跳过同步")
            return True
            
        gap = self.calculate_period_gap(local_latest, remote_latest)
        print(f"📊 本地最新期号: {local_latest.get('period_no')}")
        print(f"📊 远程最新期号: {remote_latest.get('period_no')}")
        print(f"📊 期数差异: {gap}")
        
        if gap > 0:
            print(f"📥 更新最新 {gap} 期数据...")
            missing_data = self.fetch_missing_data(gap)
            if missing_data:
                self.append_to_local_file(missing_data)
                return True
            return False
        else:
            print("✅ 本地数据已是最新")
            return True
