import sqlite3
import sys
import os
from datetime import datetime

class DBManager:
    def __init__(self, db_name="Data/canada28.db"):
        # 确保 db_name 是相对于当前脚本的路径 (Canada28/Data/canada28.db)
        # 确保 db_name 是相对于当前脚本的路径 (Canada28/Data/canada28.db)
        if getattr(sys, 'frozen', False):
            base_dir = os.path.dirname(sys.executable)
        else:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            
        self.db_name = os.path.join(base_dir, db_name)
        
        # 确保目录存在
        db_dir = os.path.dirname(self.db_name)
        if not os.path.exists(db_dir):
            os.makedirs(db_dir)
            
        self.init_db()

    def init_db(self):
        """初始化数据库表"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # 创建历史记录表
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS history (
                period_no INTEGER PRIMARY KEY,
                draw_time TEXT,
                num1 INTEGER,
                num2 INTEGER,
                num3 INTEGER,
                result_sum INTEGER,
                raw_line TEXT
            )
        ''')
        
        conn.commit()
        conn.close()

    def get_connection(self):
        """获取数据库连接"""
        return sqlite3.connect(self.db_name)

    def insert_record(self, period_no, draw_time, num1, num2, num3, result_sum, raw_line):
        """插入一条记录 (如果存在则忽略)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO history (period_no, draw_time, num1, num2, num3, result_sum, raw_line)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (period_no, draw_time, num1, num2, num3, result_sum, raw_line))
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"❌ 插入数据库失败: {e}")
            return False
        finally:
            conn.close()

    def get_latest_record(self):
        """获取最新的一条记录"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM history ORDER BY period_no DESC LIMIT 1')
        row = cursor.fetchone()
        conn.close()
        return row

    def get_all_records(self):
        """获取所有记录 (按期号升序)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM history ORDER BY period_no ASC')
        rows = cursor.fetchall()
        conn.close()
        return rows

    def get_record_count(self):
        """获取记录总数"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM history')
        count = cursor.fetchone()[0]
        conn.close()
        return count
