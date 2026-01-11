"""
PC28 动态热门号码池生成器
每一期实时更新，基于三年滚动窗口统计Top 875热门号码
"""
import pandas as pd
from datetime import datetime, timedelta
from typing import Set, List, Tuple
import os


class DynamicHotPool:
    """动态号码池生成器"""
    
    def __init__(self, data_file: str):
        """
        初始化并加载历史数据
        
        Args:
            data_file: 数据文件路径（.txt或.xlsx）
        """
        self.data_file = data_file
        self.df = None
        self._cache = {}  # 缓存: {(date_str, top_n): (hot_pool, counts)}
        self._load_data()
    
    def _load_data(self):
        """加载数据文件"""
        if self.data_file.endswith('.txt'):
            self._load_txt_data()
        elif self.data_file.endswith('.xlsx'):
            self._load_excel_data()
        else:
            raise ValueError(f"不支持的文件格式: {self.data_file}")
        
        print(f"数据加载完成，共 {len(self.df)} 条记录")
    
    def _load_txt_data(self):
        """从txt文件加载数据"""
        data = []
        with open(self.data_file, 'r', encoding='utf-8') as f:
            # 跳过标题行
            next(f); next(f); next(f)
            
            for line in f:
                if not line.strip():
                    continue
                
                parsed = self._parse_line(line)
                if parsed:
                    data.append(parsed)
        
        self.df = pd.DataFrame(data)
        # 按时间排序（从旧到新）
        self.df = self.df.sort_values('datetime').reset_index(drop=True)
    
    def _load_excel_data(self):
        """从Excel文件加载数据"""
        # 读取Excel
        df = pd.read_excel(self.data_file)
        
        # 假设Excel有 '时间' 和 '开奖号' 列
        # 根据实际Excel结构调整
        data = []
        for _, row in df.iterrows():
            # 需要根据实际Excel格式解析
            # 这里提供一个示例框架
            pass
        
        self.df = pd.DataFrame(data)
        self.df = self.df.sort_values('datetime').reset_index(drop=True)
    
    def _parse_line(self, line: str) -> dict:
        """解析txt文件中的一行数据"""
        try:
            parts = line.split()
            if len(parts) < 8:
                return None
            
            # 解析日期和时间
            date_str = parts[0]
            time_str = parts[1]
            datetime_str = f"{date_str} {time_str}"
            dt = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
            
            # 解析号码
            n1 = parts[3]
            n2 = parts[5]
            n3 = parts[7]
            
            if not (n1.isdigit() and n2.isdigit() and n3.isdigit()):
                return None
            
            return {
                'datetime': dt,
                'numbers': f"{n1},{n2},{n3}"
            }
        except Exception as e:
            return None
    
    def get_hot_pool(self, current_time: datetime, top_n: int = 875) -> Tuple[Set[str], pd.Series]:
        """
        获取当前时刻的热门号码池（带缓存优化）
        
        Args:
            current_time: 当前时间点
            top_n: 取前N个热门号码，默认875
        
        Returns:
            (hot_pool, frequency_stats): 热门号码集合 和 频次统计
        """
        # 🔥 缓存优化：按日期缓存（同一天的不同时刻使用同一缓存）
        cache_key = (current_time.date().isoformat(), top_n)
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        # 计算三年前的时间点
        three_years_ago = current_time - timedelta(days=3*365)
        
        # 筛选数据窗口: [三年前, 当前时刻]
        mask = (self.df['datetime'] >= three_years_ago) & (self.df['datetime'] <= current_time)
        window_df = self.df[mask]
        
        if len(window_df) == 0:
            print(f"警告: 在时间窗口 [{three_years_ago}] 到 [{current_time}] 内没有找到数据")
            return set(), pd.Series()
        
        # 统计频次
        counts = window_df['numbers'].value_counts()
        
        # 取Top N
        top_numbers = counts.head(top_n).index.tolist()
        hot_pool = set(top_numbers)
        
        # 缓存结果
        self._cache[cache_key] = (hot_pool, counts)
        
        return hot_pool, counts
    
    def get_pool_stats(self, current_time: datetime, top_n: int = 875) -> dict:
        """
        获取号码池统计信息
        
        Args:
            current_time: 当前时间点
            top_n: 取前N个热门号码
        
        Returns:
            统计信息字典
        """
        hot_pool, counts = self.get_hot_pool(current_time, top_n)
        
        three_years_ago = current_time - timedelta(days=3*365)
        mask = (self.df['datetime'] >= three_years_ago) & (self.df['datetime'] <= current_time)
        window_df = self.df[mask]
        
        stats = {
            'current_time': current_time,
            'window_start': three_years_ago,
            'window_records': len(window_df),
            'unique_numbers': len(counts),
            'hot_pool_size': len(hot_pool),
            'cutoff_frequency': counts.iloc[top_n-1] if len(counts) >= top_n else None,
            'max_frequency': counts.iloc[0] if len(counts) > 0 else None,
            'min_frequency': counts.iloc[-1] if len(counts) > 0 else None
        }
        
        return stats
    
    def add_new_record(self, dt: datetime, numbers: str):
        """
        增量添加新记录（可选功能）
        
        Args:
            dt: 开奖时间
            numbers: 号码，格式 "2,3,3"
        """
        new_row = pd.DataFrame([{
            'datetime': dt,
            'numbers': numbers
        }])
        self.df = pd.concat([self.df, new_row], ignore_index=True)
        self.df = self.df.sort_values('datetime').reset_index(drop=True)
    
    def clear_cache(self):
        """清空缓存（当数据更新时调用）"""
        self._cache.clear()
        print("✅ 缓存已清空")
    
    def get_cache_info(self) -> dict:
        """获取缓存信息"""
        return {
            'cache_size': len(self._cache),
            'cached_dates': [key[0] for key in self._cache.keys()]
        }


# 使用示例
if __name__ == "__main__":
    # 创建动态号码池
    pool = DynamicHotPool(r"c:\Users\tiancheng\Desktop\彩\数据\pc28_data_repaired.txt")
    
    # 模拟不同时间点
    test_times = [
        datetime(2026, 1, 11, 0, 0, 0),    # 今天0点
        datetime(2026, 1, 11, 12, 0, 0),   # 今天中午
        datetime(2026, 1, 11, 19, 16, 0),  # 当前时刻
    ]
    
    for test_time in test_times:
        print(f"\n{'='*60}")
        print(f"模拟时间: {test_time}")
        print(f"{'='*60}")
        
        stats = pool.get_pool_stats(test_time, top_n=875)
        
        print(f"数据窗口: {stats['window_start']} 到 {stats['current_time']}")
        print(f"窗口内记录数: {stats['window_records']}")
        print(f"唯一号码种类: {stats['unique_numbers']}")
        print(f"热门池大小: {stats['hot_pool_size']}")
        print(f"第875名频次: {stats['cutoff_frequency']}")
        print(f"最高频次: {stats['max_frequency']}")
        print(f"最低频次: {stats['min_frequency']}")
        
        # 获取热门号码池
        hot_pool, counts = pool.get_hot_pool(test_time, top_n=875)
        print(f"\nTop 10 热门号码:")
        for i, (num, freq) in enumerate(counts.head(10).items(), 1):
            print(f"  {i}. {num}: {freq}次")
