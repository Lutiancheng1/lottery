import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime, timedelta
import threading
import requests
import json
import time
import pandas as pd
import urllib3

# 禁用SSL警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class GamePeriodsCrawlerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("加拿大28历史数据爬虫")
        self.root.geometry("1200x1000")
        
        # 数据存储
        self.all_data = []
        self.is_running = False
        self.is_paused = False
        self.stop_flag = False
        self.crawler_thread = None
        
        # API 配置
        self.base_url = "https://s1.pk999p.xyz/index.php/GamePeriods/LHistory"
        
        # 创建 GUI 组件
        self.create_widgets()
        
    def create_widgets(self):
        # 标题
        title_label = tk.Label(self.root, text="加拿大28历史数据爬虫（按页码爬取）", 
                              font=("微软雅黑", 16, "bold"))
        title_label.pack(pady=10)
        
        # 配置区域
        config_frame = ttk.LabelFrame(self.root, text="爬取配置", padding=10)
        config_frame.pack(fill="x", padx=10, pady=5)
        
        # Token输入
        tk.Label(config_frame, text="Token:").grid(row=0, column=0, sticky="w", pady=5)
        self.token_var = tk.StringVar(value="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tZW1iZXIud2Vic2l0ZS5jb20iLCJhdWQiOiJodHRwOlwvXC9tZW1iZXIud2Vic2l0ZS5jb20iLCJqdGkiOiIiLCJpYXQiOjE3NjgxNDIzOTIsIm5iZiI6MTc2ODE0MjM5MiwiZXhwIjoxNzY4NDAxNTkyLCJfdXNlciI6eyJpZCI6MzQ2MywiY29tcGFueV9pZCI6MzI0NCwicm9sZSI6NiwiYWNjb3VudCI6ImZhZmE4OCIsInRvcF9wYXRoIjoiMzI0NCwzNDE1LDM0NjEifX0.-bNWFjKhNJAK-Cm_OWQd4pjRnaS4W0JjE9dF5YrJ_ZU")
        token_entry = ttk.Entry(config_frame, textvariable=self.token_var, width=80)
        token_entry.grid(row=0, column=1, columnspan=2, sticky="w", padx=5)
        
        # Cookie
        tk.Label(config_frame, text="Cookie:").grid(row=1, column=0, sticky="w", pady=5)
        self.cookie_var = tk.StringVar(value="PHPSESSID=04cd9379f004d679644c582a5daa24a7")
        cookie_entry = ttk.Entry(config_frame, textvariable=self.cookie_var, width=80)
        cookie_entry.grid(row=1, column=1, columnspan=2, sticky="w", padx=5)
        
        # Game ID
        tk.Label(config_frame, text="Game ID:").grid(row=2, column=0, sticky="w", pady=5)
        self.game_id_var = tk.StringVar(value="2")
        game_id_entry = ttk.Entry(config_frame, textvariable=self.game_id_var, width=20)
        game_id_entry.grid(row=2, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="(默认: 2)", fg="gray").grid(row=2, column=2, sticky="w")
        
        # 起始页码
        tk.Label(config_frame, text="起始页码:").grid(row=3, column=0, sticky="w", pady=5)
        self.start_page_var = tk.StringVar(value="29")
        start_page_entry = ttk.Entry(config_frame, textvariable=self.start_page_var, width=20)
        start_page_entry.grid(row=3, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="第1页=最新，往后越早", fg="gray").grid(row=3, column=2, sticky="w")
        
        # 结束页码
        tk.Label(config_frame, text="结束页码:").grid(row=4, column=0, sticky="w", pady=5)
        self.end_page_var = tk.StringVar(value="800")
        end_page_entry = ttk.Entry(config_frame, textvariable=self.end_page_var, width=20)
        end_page_entry.grid(row=4, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="留空=爬到最后", fg="gray").grid(row=4, column=2, sticky="w")
        
        # 日期过滤（可选）
        tk.Label(config_frame, text="开始日期过滤:").grid(row=5, column=0, sticky="w", pady=5)
        self.filter_start_var = tk.StringVar(value="2025-12-12")
        filter_start_entry = ttk.Entry(config_frame, textvariable=self.filter_start_var, width=20)
        filter_start_entry.grid(row=5, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="留空=不过滤", fg="gray").grid(row=5, column=2, sticky="w")
        
        tk.Label(config_frame, text="结束日期过滤:").grid(row=6, column=0, sticky="w", pady=5)
        self.filter_end_var = tk.StringVar(value="2026-01-10")
        filter_end_entry = ttk.Entry(config_frame, textvariable=self.filter_end_var, width=20)
        filter_end_entry.grid(row=6, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="留空=不过滤", fg="gray").grid(row=6, column=2, sticky="w")
        
        # 请求间隔
        tk.Label(config_frame, text="请求间隔(秒):").grid(row=7, column=0, sticky="w", pady=5)
        self.interval_var = tk.StringVar(value="0.3")
        interval_entry = ttk.Entry(config_frame, textvariable=self.interval_var, width=20)
        interval_entry.grid(row=7, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="建议: 0.2-0.5 秒", fg="gray").grid(row=7, column=2, sticky="w")
        
        # 控制按钮区域
        control_frame = ttk.Frame(self.root)
        control_frame.pack(fill="x", padx=10, pady=10)
        
        self.start_btn = ttk.Button(control_frame, text="▶ 开始爬取", 
                                    command=self.start_crawling, width=15)
        self.start_btn.pack(side="left", padx=5)
        
        self.pause_btn = ttk.Button(control_frame, text="⏸ 暂停", 
                                    command=self.pause_crawling, width=15, state="disabled")
        self.pause_btn.pack(side="left", padx=5)
        
        self.resume_btn = ttk.Button(control_frame, text="▶ 继续", 
                                     command=self.resume_crawling, width=15, state="disabled")
        self.resume_btn.pack(side="left", padx=5)
        
        self.stop_btn = ttk.Button(control_frame, text="⏹ 停止", 
                                   command=self.stop_crawling, width=15, state="disabled")
        self.stop_btn.pack(side="left", padx=5)
        
        # 进度显示区域
        progress_frame = ttk.LabelFrame(self.root, text="爬取进度", padding=10)
        progress_frame.pack(fill="both", expand=True, padx=10, pady=5)
        
        # 进度条
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(progress_frame, variable=self.progress_var, 
                                           maximum=100, length=400)
        self.progress_bar.pack(fill="x", pady=5)
        
        # 状态标签
        self.status_label = tk.Label(progress_frame, text="就绪", 
                                     font=("微软雅黑", 10), fg="blue")
        self.status_label.pack(pady=5)
        
        # 详细信息显示
        info_frame = ttk.Frame(progress_frame)
        info_frame.pack(fill="both", expand=True, pady=5)
        
        # 左侧信息
        left_info = ttk.Frame(info_frame)
        left_info.pack(side="left", fill="both", expand=True)
        
        self.current_page_label = tk.Label(left_info, text="当前页: --", anchor="w", font=("微软雅黑", 9))
        self.current_page_label.pack(fill="x", pady=2)
        
        self.records_label = tk.Label(left_info, text="本页记录: 0 条", anchor="w", font=("微软雅黑", 9))
        self.records_label.pack(fill="x", pady=2)
        
        self.total_label = tk.Label(left_info, text="总记录数: 0 条", anchor="w", font=("微软雅黑", 9))
        self.total_label.pack(fill="x", pady=2)
        
        self.filtered_label = tk.Label(left_info, text="过滤后: 0 条", anchor="w", font=("微软雅黑", 9))
        self.filtered_label.pack(fill="x", pady=2)
        
        # 右侧信息
        right_info = ttk.Frame(info_frame)
        right_info.pack(side="right", fill="both", expand=True)
        
        self.pages_label = tk.Label(right_info, text="总页数: 0", anchor="w", font=("微软雅黑", 9))
        self.pages_label.pack(fill="x", pady=2)
        
        self.completed_label = tk.Label(right_info, text="已完成: 0 页", anchor="w", font=("微软雅黑", 9))
        self.completed_label.pack(fill="x", pady=2)
        
        self.time_label = tk.Label(right_info, text="耗时: 00:00:00", anchor="w", font=("微软雅黑", 9))
        self.time_label.pack(fill="x", pady=2)
        
        self.speed_label = tk.Label(right_info, text="速度: -- 条/秒", anchor="w", font=("微软雅黑", 9))
        self.speed_label.pack(fill="x", pady=2)
        
        # 数据预览区域
        preview_frame = ttk.LabelFrame(progress_frame, text="数据预览 (最新30条)", padding=5)
        preview_frame.pack(fill="both", expand=True, pady=5)
        
        # 创建表格
        columns = ("开奖时间", "期号", "佰", "拾", "个", "总和", "大小", "单双", "龙虎和", "番")
        self.data_tree = ttk.Treeview(preview_frame, columns=columns, show="headings", height=6)
        
        # 设置列标题和宽度
        column_widths = {"开奖时间": 150, "期号": 80, "佰": 40, "拾": 40, "个": 40, 
                        "总和": 50, "大小": 50, "单双": 50, "龙虎和": 60, "番": 50}
        
        for col in columns:
            self.data_tree.heading(col, text=col)
            self.data_tree.column(col, width=column_widths.get(col, 80))
        
        # 添加滚动条
        tree_scrollbar = ttk.Scrollbar(preview_frame, orient="vertical", command=self.data_tree.yview)
        self.data_tree.configure(yscrollcommand=tree_scrollbar.set)
        
        self.data_tree.pack(side="left", fill="both", expand=True)
        tree_scrollbar.pack(side="right", fill="y")
        
        # 日志显示区域
        log_frame = ttk.LabelFrame(progress_frame, text="爬取日志", padding=5)
        log_frame.pack(fill="both", expand=True, pady=5)
        
        # 创建滚动条
        scrollbar = ttk.Scrollbar(log_frame)
        scrollbar.pack(side="right", fill="y")
        
        self.log_text = tk.Text(log_frame, height=8, yscrollcommand=scrollbar.set, 
                               font=("Consolas", 9))
        self.log_text.pack(fill="both", expand=True)
        scrollbar.config(command=self.log_text.yview)
        
        # 导出区域
        export_frame = ttk.LabelFrame(self.root, text="数据导出", padding=10)
        export_frame.pack(fill="x", padx=10, pady=5)
        
        # 导出格式选择
        tk.Label(export_frame, text="导出格式:").pack(side="left", padx=5)
        
        self.export_excel_var = tk.BooleanVar(value=True)
        excel_cb = ttk.Checkbutton(export_frame, text="Excel (.xlsx)", 
                                   variable=self.export_excel_var)
        excel_cb.pack(side="left", padx=5)
        
        self.export_txt_var = tk.BooleanVar(value=True)
        txt_cb = ttk.Checkbutton(export_frame, text="文本 (.txt)", 
                                variable=self.export_txt_var)
        txt_cb.pack(side="left", padx=5)
        
        # 导出按钮
        self.export_btn = ttk.Button(export_frame, text="📥 导出数据", 
                                     command=self.export_data, width=15)
        self.export_btn.pack(side="right", padx=5)
        
    def log(self, message, level="INFO"):
        """添加日志"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] {level}: {message}\n"
        
        self.log_text.insert("end", log_entry)
        self.log_text.see("end")
        
        # 根据级别设置颜色
        if level == "ERROR":
            self.log_text.tag_add("error", "end-2l", "end-1l")
            self.log_text.tag_config("error", foreground="red")
        elif level == "SUCCESS":
            self.log_text.tag_add("success", "end-2l", "end-1l")
            self.log_text.tag_config("success", foreground="green")
        elif level == "WARNING":
            self.log_text.tag_add("warning", "end-2l", "end-1l")
            self.log_text.tag_config("warning", foreground="orange")
            
    def start_crawling(self):
        """开始爬取"""
        # 检查是否有正在运行的线程
        if self.is_running or (self.crawler_thread and self.crawler_thread.is_alive()):
            messagebox.showwarning("警告", "爬虫正在运行中，请先停止！")
            return
        
        # 验证输入
        try:
            start_page = int(self.start_page_var.get())
            end_page_str = self.end_page_var.get().strip()
            end_page = int(end_page_str) if end_page_str else 99999
            interval = float(self.interval_var.get())
            
            if start_page < 1:
                messagebox.showerror("错误", "起始页码必须大于0！")
                return
                
            if end_page < start_page:
                messagebox.showerror("错误", "结束页码不能小于起始页码！")
                return
                
            if interval < 0.05:
                messagebox.showerror("错误", "请求间隔不能小于0.05秒！")
                return
                
        except ValueError as e:
            messagebox.showerror("错误", f"配置错误！\n{e}")
            return
        
        # 重置数据
        self.all_data = []
        self.is_running = True
        self.is_paused = False
        self.stop_flag = False
        
        # 更新按钮状态
        self.start_btn.config(state="disabled")
        self.pause_btn.config(state="normal")
        self.stop_btn.config(state="normal")
        self.resume_btn.config(state="disabled")
        
        # 清空日志和预览
        self.log_text.delete("1.0", "end")
        for item in self.data_tree.get_children():
            self.data_tree.delete(item)
        
        # 启动爬取线程
        self.crawler_thread = threading.Thread(target=self.crawl_worker, daemon=True)
        self.crawler_thread.start()
        
        self.log("开始爬取任务...", "INFO")
        
    def pause_crawling(self):
        """暂停爬取"""
        if self.is_running:
            self.is_paused = True
            self.pause_btn.config(state="disabled")
            self.resume_btn.config(state="normal")
            self.status_label.config(text="已暂停", fg="orange")
            self.log("爬取已暂停", "INFO")
            
    def resume_crawling(self):
        """继续爬取"""
        if self.is_running and self.is_paused:
            self.is_paused = False
            self.pause_btn.config(state="normal")
            self.resume_btn.config(state="disabled")
            self.status_label.config(text="爬取中...", fg="blue")
            self.log("继续爬取", "INFO")
            
    def stop_crawling(self):
        """停止爬取"""
        if self.is_running:
            self.stop_flag = True
            self.is_running = False
            self.is_paused = False
            self.status_label.config(text="正在停止...", fg="orange")
            self.log("正在停止爬取...", "INFO")
            
            # 等待线程退出（最多等待2秒）
            if self.crawler_thread and self.crawler_thread.is_alive():
                self.crawler_thread.join(timeout=2)
            
            self.status_label.config(text="已停止", fg="red")
            self.log("爬取已停止", "INFO")
            
            # 重置按钮
            self.start_btn.config(state="normal")
            self.pause_btn.config(state="disabled")
            self.resume_btn.config(state="disabled")
            self.stop_btn.config(state="disabled")
            
    def crawl_worker(self):
        """爬取工作线程"""
        start_time = time.time()
        
        try:
            start_page = int(self.start_page_var.get())
            end_page_str = self.end_page_var.get().strip()
            end_page = int(end_page_str) if end_page_str else 99999
            interval = float(self.interval_var.get())
            
            # 日期过滤
            filter_start = self.filter_start_var.get().strip()
            filter_end = self.filter_end_var.get().strip()
            
            total_pages = end_page - start_page + 1
            current_page = start_page
            page_count = 0
            
            self.root.after(0, lambda: self.pages_label.config(text=f"总页数: {total_pages}"))
            self.root.after(0, lambda: self.log(f"开始爬取第 {start_page} 页到第 {end_page} 页", "INFO"))
            
            while current_page <= end_page and not self.stop_flag:
                # 处理暂停
                while self.is_paused and not self.stop_flag:
                    time.sleep(0.1)
                    
                if self.stop_flag:
                    break
                    
                page_count += 1
                
                # 爬取当前页
                page_data = self.fetch_page_data(current_page)
                
                if page_data:
                    self.all_data.extend(page_data)
                    
                    # 更新显示
                    self.root.after(0, lambda p=current_page, c=len(page_data): 
                                  self.current_page_label.config(text=f"当前页: {p}"))
                    self.root.after(0, lambda c=len(page_data): 
                                  self.records_label.config(text=f"本页记录: {c} 条"))
                    self.root.after(0, lambda t=len(self.all_data): 
                                  self.total_label.config(text=f"总记录数: {t} 条"))
                    
                    # 应用日期过滤
                    filtered_data = self.filter_by_date(self.all_data, filter_start, filter_end)
                    self.root.after(0, lambda f=len(filtered_data): 
                                  self.filtered_label.config(text=f"过滤后: {f} 条"))
                    
                    # 每5页更新一次预览
                    if page_count % 5 == 0 or page_count == 1:
                        preview_data = filtered_data[-30:] if len(filtered_data) > 30 else filtered_data
                        self.root.after(0, lambda pd=list(preview_data): self.update_preview(pd))
                else:
                    # 无数据,可能到达最后一页
                    self.root.after(0, lambda: self.log(f"第 {current_page} 页无数据，可能已到最后", "WARNING"))
                    if current_page > start_page:  # 如果不是第一页就无数据了,才停止
                        break
                
                # 更新进度
                progress = (page_count / total_pages) * 100
                self.root.after(0, lambda p=min(progress, 100): self.progress_var.set(p))
                self.root.after(0, lambda c=page_count: 
                              self.completed_label.config(text=f"已完成: {c} 页"))
                
                # 更新耗时和速度
                elapsed = time.time() - start_time
                time_str = time.strftime("%H:%M:%S", time.gmtime(elapsed))
                speed = len(self.all_data) / elapsed if elapsed > 0 else 0
                self.root.after(0, lambda t=time_str: 
                              self.time_label.config(text=f"耗时: {t}"))
                self.root.after(0, lambda s=speed: 
                              self.speed_label.config(text=f"速度: {s:.1f} 条/秒"))
                
                # 移动到下一页
                current_page += 1
                time.sleep(interval)
            
            # 完成
            if not self.stop_flag:
                filtered_data = self.filter_by_date(self.all_data, filter_start, filter_end)
                self.root.after(0, lambda: self.status_label.config(
                    text=f"完成！共{len(self.all_data)}条，过滤后{len(filtered_data)}条", fg="green"))
                self.root.after(0, lambda fd=len(filtered_data), td=len(self.all_data): self.log(
                    f"爬取完成！总共{td}条记录，过滤后{fd}条", "SUCCESS"))
                self.root.after(0, lambda fd=len(filtered_data), td=len(self.all_data): messagebox.showinfo(
                    "完成", f"爬取完成！\n总共{td}条记录\n过滤后{fd}条记录"))
            
        except Exception as e:
            self.root.after(0, lambda err=str(e): self.log(f"发生错误: {err}", "ERROR"))
            self.root.after(0, lambda err=str(e): messagebox.showerror("错误", f"爬取过程中发生错误:\n{err}"))
            import traceback
            traceback.print_exc()
        
        finally:
            self.is_running = False
            self.root.after(0, lambda: self.start_btn.config(state="normal"))
            self.root.after(0, lambda: self.pause_btn.config(state="disabled"))
            self.root.after(0, lambda: self.resume_btn.config(state="disabled"))
            self.root.after(0, lambda: self.stop_btn.config(state="disabled"))
            
    def fetch_page_data(self, page):
        """获取指定页的数据"""
        headers = {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'zh-CN,zh;q=0.9',
            'connection': 'keep-alive',
            'cookie': self.cookie_var.get(),
            'host': 's1.pk999p.xyz',
            'referer': 'https://s1.pk999p.xyz/',
            'token': self.token_var.get(),
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'x-requested-with': 'XMLHttpRequest'
        }
        
        params = {
            'game_id': self.game_id_var.get(),
            'page': page,
            'limit': 14,  # 固定14条,服务器限制
            'date': '',  # date参数无效
            'period_no': '',
            'game_period': ''
        }
        
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = requests.get(self.base_url, headers=headers, params=params, 
                                       timeout=30, verify=False)
            
                if response.status_code == 200:
                    data = response.json()
                    
                    if 'data' in data and isinstance(data['data'], list):
                        records = data['data']
                        return records
                    else:
                        if attempt < max_retries - 1:
                            self.root.after(0, lambda p=page, a=attempt+1: self.log(
                                f"页{p}: 响应格式异常，重试 {a}/{max_retries}", "WARNING"))
                            time.sleep(2)
                            continue
                        else:
                            return []
                else:
                    if attempt < max_retries - 1:
                        self.root.after(0, lambda p=page, s=response.status_code, a=attempt+1: self.log(
                            f"页{p}: HTTP {s}，重试 {a}/{max_retries}", "WARNING"))
                        time.sleep(2)
                        continue
                    else:
                        return []
                    
            except Exception as e:
                if attempt < max_retries - 1:
                    self.root.after(0, lambda p=page, err=str(e)[:50], a=attempt+1: self.log(
                        f"页{p}: {err}，重试 {a}/{max_retries}", "WARNING"))
                    time.sleep(2)
                    continue
                else:
                    self.root.after(0, lambda p=page, err=str(e)[:50]: self.log(
                        f"页{p}: 错误 - {err}", "ERROR"))
                    return []
        
        return []
    
    def filter_by_date(self, data, start_date_str, end_date_str):
        """根据日期过滤数据"""
        if not start_date_str and not end_date_str:
            return data
        
        filtered = []
        for record in data:
            overt_at = record.get('overt_at', '')
            if not overt_at:
                continue
            
            try:
                record_date = overt_at.split(' ')[0]  # 提取日期部分
                
                # 检查是否在范围内
                if start_date_str and record_date < start_date_str:
                    continue
                if end_date_str and record_date > end_date_str:
                    continue
                
                filtered.append(record)
            except:
                continue
        
        return filtered
            
    def update_preview(self, data_to_show):
        """更新预览表格"""
        # 清空现有数据
        for item in self.data_tree.get_children():
            self.data_tree.delete(item)
        
        # 倒序显示，最新的在最上面
        for record in reversed(data_to_show):
            time_str = record.get('overt_at', '')
            period = record.get('period_no', '')
            b = record.get('b', '')
            s = record.get('s', '')
            g = record.get('g', '')
            total = record.get('result_sum', '')
            size = record.get('is_big_msg', '')
            parity = record.get('is_odd_msg', '')
            lhh = record.get('lhh', '')
            fan = record.get('fan', '')
            
            # 插入到表格
            self.data_tree.insert('', 'end', values=(time_str, period, b, s, g, 
                                                     total, size, parity, lhh, fan))
            
    def export_data(self):
        """导出数据"""
        if not self.all_data:
            messagebox.showwarning("警告", "没有可导出的数据！请先爬取数据。")
            return
        
        # 应用日期过滤
        filter_start = self.filter_start_var.get().strip()
        filter_end = self.filter_end_var.get().strip()
        export_data = self.filter_by_date(self.all_data, filter_start, filter_end)
        
        if not export_data:
            messagebox.showwarning("警告", "过滤后没有数据可导出！")
            return
            
        if not self.export_excel_var.get() and not self.export_txt_var.get():
            messagebox.showwarning("警告", "请至少选择一种导出格式！")
            return
            
        # 选择保存位置
        folder = filedialog.askdirectory(title="选择保存文件夹", 
                                        initialdir=r'c:\Users\tiancheng\Desktop\彩')
        if not folder:
            return
            
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            
            # 导出 Excel
            if self.export_excel_var.get():
                excel_file = f"{folder}/game_periods_data_{timestamp}.xlsx"
                self.export_to_excel(excel_file, export_data)
                self.log(f"Excel文件已导出: {excel_file}", "SUCCESS")
                
            # 导出 TXT
            if self.export_txt_var.get():
                txt_file = f"{folder}/game_periods_data_{timestamp}.txt"
                self.export_to_txt(txt_file, export_data)
                self.log(f"TXT文件已导出: {txt_file}", "SUCCESS")
                
            messagebox.showinfo("成功", f"数据导出完成！\n共导出 {len(export_data)} 条记录")
            
        except Exception as e:
            self.log(f"导出失败: {e}", "ERROR")
            messagebox.showerror("错误", f"导出失败:\n{e}")
            
    def export_to_txt(self, filename, data):
        """导出为TXT文件"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("开奖时间\t期号\t佰\t拾\t个\t开奖号码\t总和\t大小\t单双\t龙虎和\t番\n")
            f.write("=" * 120 + "\n")
            
            for record in data:
                line = f"{record.get('overt_at', '')}\t"
                line += f"{record.get('period_no', '')}\t"
                line += f"{record.get('b', '')}\t"
                line += f"{record.get('s', '')}\t"
                line += f"{record.get('g', '')}\t"
                line += f"{record.get('number_overt', '')}\t"
                line += f"{record.get('result_sum', '')}\t"
                line += f"{record.get('is_big_msg', '')}\t"
                line += f"{record.get('is_odd_msg', '')}\t"
                line += f"{record.get('lhh', '')}\t"
                line += f"{record.get('fan', '')}\n"
                f.write(line)
            
            f.write("=" * 120 + "\n")
            f.write(f"总记录数: {len(data)}\n")
            
    def export_to_excel(self, filename, data):
        """导出为Excel文件"""
        data_for_df = []
        for record in data:
            data_for_df.append({
                '开奖时间': record.get('overt_at', ''),
                '期号': record.get('period_no', ''),
                '佰': record.get('b', ''),
                '拾': record.get('s', ''),
                '个': record.get('g', ''),
                '开奖号码': record.get('number_overt', ''),
                '总和': record.get('result_sum', ''),
                '大小': record.get('is_big_msg', ''),
                '单双': record.get('is_odd_msg', ''),
                '龙虎和': record.get('lhh', ''),
                '番': record.get('fan', ''),
                '番数值': record.get('fan_sum', '')
            })
        
        df = pd.DataFrame(data_for_df)
        df.to_excel(filename, index=False, engine='openpyxl', sheet_name='游戏历史数据')


def main():
    root = tk.Tk()
    app = GamePeriodsCrawlerGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
