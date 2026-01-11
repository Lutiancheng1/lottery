"""
文件清理脚本 - 清理测试和临时文件
保留重要的程序和数据文件
"""
import os
import shutil

# 当前目录
base_dir = r'c:\Users\tiancheng\Desktop\彩'

# === ✅ 保留的重要文件 ===
keep_files = {
    # 主程序
    'canada28_simulator.py',  # ⭐ 新的简化版模拟器（推荐使用）
    'live_betting_simulator_backup_3d.py',  # 原版模拟器（备份）
    'token_extractor.py',  # Token提取器
    
    # 爬虫程序
    'game_periods_gui_v2.py',  # ⭐ V2版爬虫（推荐使用）
    'pc28_gui.py',  # PC28爬虫
    
    # 核心功能模块
    'dynamic_hot_pool.py',  # 动态号码池
    
    # 配置和数据
    'simulator_config.json',  # 模拟器配置
    'requirements.txt',  # 依赖列表
    
    # 文档
    '加拿大28模拟器使用说明.md',  # ⭐ 使用说明
    '动态号码池使用指南.md',
    
    # 可执行文件
    'PC28模拟器_单玩法版.exe',
    'PC28模拟器_多玩法版.exe',
}

# === ❌ 需要删除的测试/临时文件 ===
delete_files = {
    # 测试脚本
    'test_api_response.py',
    'test_page_limit.py',
    'test_cache_performance.py',
    'test_date_param.py',  # 如果存在
    
    # 临时脚本
    'fetch_20260111.py',
    'final_merge.py',
    'merge_and_dedupe.py',
    'cleanup_canada_data.py',
    'verify_final.py',
    
    # 旧版本/未使用的程序
    'canada28_crawler_browser.py',  # 复杂版爬虫（已有简化版）
    'canada28_live_simulator.py',  # 部分改造版（已有新简化版）
    'live_betting_simulator.py',  # 旧版模拟器
    'game_periods_gui.py',  # V1版爬虫（已有V2）
    'scraper_game_periods.py',  # 命令行爬虫
    'pc28_crawler.py',  # 旧爬虫
    'repair_pc28.py',  # 修复脚本
    
    # 分析脚本
    'analyze_hot_pool.py',
    
    # 数据文件
    'api_response_sample.json',
    'analysis_output.txt',
    'missing_dates.txt',
    
    # 文档（已有新的）
    '改造步骤.md',
    '浏览器版本安装说明.md',
    
    # 构建文件
    'build_exe.bat',
}

# === 需要删除的文件夹 ===
delete_dirs = {
    '__pycache__',
    'build',
    'dist',
}

print("=" * 70)
print("文件清理脚本")
print("=" * 70)

# 统计
files_to_delete = []
dirs_to_delete = []

# 扫描文件
for file in delete_files:
    file_path = os.path.join(base_dir, file)
    if os.path.exists(file_path):
        files_to_delete.append(file)

# 扫描文件夹
for dir_name in delete_dirs:
    dir_path = os.path.join(base_dir, dir_name)
    if os.path.exists(dir_path):
        dirs_to_delete.append(dir_name)

# 显示清理列表
print(f"\n将要删除 {len(files_to_delete)} 个文件:")
for f in files_to_delete:
    file_path = os.path.join(base_dir, f)
    size_kb = os.path.getsize(file_path) / 1024
    print(f"  ❌ {f} ({size_kb:.1f} KB)")

print(f"\n将要删除 {len(dirs_to_delete)} 个文件夹:")
for d in dirs_to_delete:
    print(f"  📁 {d}/")

# 显示保留列表
print(f"\n将保留 {len(keep_files)} 个重要文件:")
for f in sorted(keep_files):
    if os.path.exists(os.path.join(base_dir, f)):
        print(f"  ✅ {f}")

print(f"\n将保留文件夹:")
print(f"  ✅ Canada_data/ (数据文件夹)")
print(f"  ✅ 数据/ (如果存在)")

# 确认删除
print("\n" + "=" * 70)
confirm = input("确认删除以上文件？(y/n): ")

if confirm.lower() == 'y':
    deleted_count = 0
    total_size = 0
    
    # 删除文件
    print("\n开始删除文件...")
    for f in files_to_delete:
        file_path = os.path.join(base_dir, f)
        try:
            size = os.path.getsize(file_path)
            os.remove(file_path)
            deleted_count += 1
            total_size += size
            print(f"  ✓ 已删除: {f}")
        except Exception as e:
            print(f"  ✗ 删除失败 {f}: {e}")
    
    # 删除文件夹
    print("\n删除文件夹...")
    for d in dirs_to_delete:
        dir_path = os.path.join(base_dir, d)
        try:
            shutil.rmtree(dir_path)
            print(f"  ✓ 已删除: {d}/")
        except Exception as e:
            print(f"  ✗ 删除失败 {d}: {e}")
    
    print("\n" + "=" * 70)
    print(f"✓ 清理完成！")
    print(f"  删除文件数: {deleted_count}")
    print(f"  释放空间: {total_size / 1024 / 1024:.2f} MB")
    print("=" * 70)
    
    print("\n📁 当前目录剩余重要文件:")
    print("  ⭐ canada28_simulator.py - 简化版模拟器（推荐）")
    print("  ⭐ game_periods_gui_v2.py - V2爬虫")
    print("  ⭐ token_extractor.py - Token提取器")
    print("  ⭐ Canada_data/ - 数据文件夹")
    print("  📖 加拿大28模拟器使用说明.md")
    
else:
    print("\n取消删除操作")
