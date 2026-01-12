import os
import sys
import time
import json
import requests
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
            
        self.base_url = "http://s1.pk999p.xyz"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest"
        }
        self.token = ""
        self.cookie = ""
        self.game_id = 2
        self.update_threshold = 14
        self.session = requests.Session()
        
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
        self.token = token
        self.cookie = cookie
        self.headers["Cookie"] = cookie
        self.headers["Authorization"] = f"Bearer {token}"

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
                # 解析数据用于DB插入
                parts = line.strip().split()
                if len(parts) >= 8:
                    draw_time = f"{parts[0]} {parts[1]}"
                    period_no = int(parts[2])
                    num1 = int(parts[3])
                    num2 = int(parts[4])
                    num3 = int(parts[5])
                    result_sum = int(parts[7])
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

    def parse_data_line(self, line: str) -> Optional[Dict]:
        """解析一行数据为字典"""
        try:
            parts = line.strip().split('\t')
            if len(parts) < 7:
                return None
                
            return {
                'overt_at': parts[0],
                'period_no': parts[1],
                'b': parts[2],
                's': parts[3],
                'g': parts[4],
                'number_overt': parts[5],
                'result_sum': parts[6],
                # 后面的字段可选，防止旧数据报错
                'is_big_msg': parts[7] if len(parts) > 7 else '',
                'is_odd_msg': parts[8] if len(parts) > 8 else '',
                'lhh': parts[9] if len(parts) > 9 else '',
                'fan': parts[10] if len(parts) > 10 else '',
                'fan_sum': parts[11] if len(parts) > 11 else ''
            }
        except Exception:
            return None

    def format_data_line(self, data: Dict) -> str:
        """将远程数据格式化为本地文件格式"""
        overt_at = data.get('overt_at', '')
        period_no = data.get('period_no', '')
        b = data.get('b', '')
        s = data.get('s', '')
        g = data.get('g', '')
        number_overt = data.get('number_overt', '')
        result_sum = data.get('result_sum', '')
        is_big_msg = data.get('is_big_msg', '')
        is_odd_msg = data.get('is_odd_msg', '')
        lhh = data.get('lhh', '')
        fan = data.get('fan', '')
        fan_sum = data.get('fan_sum', '')
        
        line = f"{overt_at}\t{period_no}\t{b}\t{s}\t{g}\t{number_overt}\t{result_sum}\t{is_big_msg}\t{is_odd_msg}\t{lhh}\t{fan}\t{fan_sum}\n"
        return line

    def get_realtime_data(self) -> Optional[Dict]:
        """获取实时游戏数据"""
        if not self.token:
            return None
        try:
            url = f"{self.base_url}/index.php/Games/LData"
            headers = {
                'token': self.token,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
            cookies = {'PHPSESSID': self.cookie} if self.cookie else {}
            params = {'game_id': self.game_id}
            response = self.session.get(url, params=params, headers=headers, cookies=cookies, timeout=10)
            data = response.json()
            if data.get('code') == 0 and 'data' in data:
                return data['data']
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

    def fetch_remote_history(self, page=1, limit=14) -> Optional[Dict]:
        """获取远程历史记录"""
        if not self.token:
            return None
        try:
            url = f"{self.base_url}/index.php/GamePeriods/LHistory"
            headers = {
                'token': self.token,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
            cookies = {'PHPSESSID': self.cookie} if self.cookie else {}
            params = {
                'game_id': self.game_id,
                'page': page,
                'limit': limit
            }
            response = self.session.get(url, params=params, headers=headers, cookies=cookies, timeout=10)
            data = response.json()
            if data.get('code') == 0:
                return data
            return None
        except Exception as e:
            print(f"❌ 获取远程数据失败: {e}")
            return None

    def get_remote_latest(self) -> Optional[Dict]:
        """获取远程最新一期数据"""
        data = self.fetch_remote_history(page=1, limit=1)
        if data and 'data' in data and data['data']:
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
        pages_needed = (gap + 13) // 14
        print(f"📥 需要获取 {pages_needed} 页数据（共约{gap}期）...")
        for page in range(1, pages_needed + 1):
            data = self.fetch_remote_history(page=page, limit=14)
            if data and 'data' in data:
                missing_data.extend(data['data'])
            if page < pages_needed:
                time.sleep(0.3)
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
            print("⚠️ 无法获取远程数据，使用本地数据")
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
