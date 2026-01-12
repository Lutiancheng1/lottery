import os
import sys
import sqlite3
from collections import Counter
from db_manager import DBManager

def export_top_combinations(filepath, count=875):
    """
    导出出现频率最高的号码组合
    
    Args:
        filepath: 保存路径
        count: 导出数量 (Top N)
        
    Returns:
        (bool, str): (是否成功, 消息)
    """
    try:
        # 1. 获取所有历史数据
        db = DBManager()
        rows = db.get_all_records()
        
        if not rows:
            return False, "数据库无历史数据"
            
        # 2. 统计组合频率
        # row: (period_no, draw_time, num1, num2, num3, result_sum, raw_line)
        # 我们需要 num1, num2, num3 组成 3位数字字符串
        combinations = []
        for row in rows:
            try:
                # 确保是数字
                n1 = int(row[2])
                n2 = int(row[3])
                n3 = int(row[4])
                # 格式化为 3位字符串 (e.g. 1,0,5 -> "105")
                combo = f"{n1}{n2}{n3}"
                combinations.append(combo)
            except:
                continue
                
        if not combinations:
            return False, "无法解析历史号码"
            
        # 3. 计算频率
        counter = Counter(combinations)
        
        # 4. 获取 Top N
        # most_common 返回 List[Tuple[element, count]]
        top_items = counter.most_common(count)
        
        # 5. 提取号码
        result_numbers = [item[0] for item in top_items]
        
        # 6. 写入文件
        # 为了兼容导入格式，使用逗号分隔
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(", ".join(result_numbers))
            
        return True, f"成功导出 Top {len(result_numbers)} 热门号码 (基于 {len(rows)} 期历史)"
        
    except Exception as e:
        return False, f"导出过程中发生错误: {str(e)}"

if __name__ == "__main__":
    # 测试代码
    print(export_top_combinations("top_875.txt", 875))
