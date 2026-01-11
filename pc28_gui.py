import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime, timedelta
import threading
import requests
import json
import time
import pandas as pd
from queue import Queue


class PC28CrawlerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("PC28 彩票历史数据爬虫")
        self.root.geometry("1100x950")
        
        # 数据存储
        self.all_data = []
        self.is_running = False
        self.is_paused = False
        self.stop_flag = False
        self.crawler_thread = None
        
        # API 配置
        self.base_url = "https://www.1680536.com/api/LuckTwenty/getPcLucky28List.do"
        
        # 创建 GUI 组件
        self.create_widgets()
        
    def create_widgets(self):
        # 标题
        title_label = tk.Label(self.root, text="PC28 彩票历史数据爬虫", 
                              font=("Arial", 16, "bold"))
        title_label.pack(pady=10)
        
        # 配置区域
        config_frame = ttk.LabelFrame(self.root, text="爬取配置", padding=10)
        config_frame.pack(fill="x", padx=10, pady=5)
        
        # 彩票代码
        tk.Label(config_frame, text="彩票代码:").grid(row=0, column=0, sticky="w", pady=5)
        self.lot_code_var = tk.StringVar(value="10074")
        lot_code_entry = ttk.Entry(config_frame, textvariable=self.lot_code_var, width=20)
        lot_code_entry.grid(row=0, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="(默认: 10074)", fg="gray").grid(row=0, column=2, sticky="w")
        
        # 开始日期
        tk.Label(config_frame, text="开始日期:").grid(row=1, column=0, sticky="w", pady=5)
        self.start_date_var = tk.StringVar(value="2025-01-09")
        start_date_entry = ttk.Entry(config_frame, textvariable=self.start_date_var, width=20)
        start_date_entry.grid(row=1, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="格式: YYYY-MM-DD", fg="gray").grid(row=1, column=2, sticky="w")
        
        # 结束日期
        tk.Label(config_frame, text="结束日期:").grid(row=2, column=0, sticky="w", pady=5)
        self.end_date_var = tk.StringVar(value=datetime.now().strftime("%Y-%m-%d"))
        end_date_entry = ttk.Entry(config_frame, textvariable=self.end_date_var, width=20)
        end_date_entry.grid(row=2, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="格式: YYYY-MM-DD", fg="gray").grid(row=2, column=2, sticky="w")
        
        # 请求间隔
        tk.Label(config_frame, text="请求间隔(秒):").grid(row=3, column=0, sticky="w", pady=5)
        self.interval_var = tk.StringVar(value="5")
        interval_entry = ttk.Entry(config_frame, textvariable=self.interval_var, width=20)
        interval_entry.grid(row=3, column=1, sticky="w", padx=5)
        tk.Label(config_frame, text="建议: 3-10 秒", fg="gray").grid(row=3, column=2, sticky="w")
        
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
                                     font=("Arial", 10), fg="blue")
        self.status_label.pack(pady=5)
        
        # 详细信息显示
        info_frame = ttk.Frame(progress_frame)
        info_frame.pack(fill="both", expand=True, pady=5)
        
        # 左侧信息
        left_info = ttk.Frame(info_frame)
        left_info.pack(side="left", fill="both", expand=True)
        
        self.current_date_label = tk.Label(left_info, text="当前日期: --", anchor="w")
        self.current_date_label.pack(fill="x", pady=2)
        
        self.records_label = tk.Label(left_info, text="当前记录: 0 条", anchor="w")
        self.records_label.pack(fill="x", pady=2)
        
        self.total_label = tk.Label(left_info, text="总记录数: 0 条", anchor="w")
        self.total_label.pack(fill="x", pady=2)
        
        # 右侧信息
        right_info = ttk.Frame(info_frame)
        right_info.pack(side="right", fill="both", expand=True)
        
        self.days_label = tk.Label(right_info, text="总天数: 0", anchor="w")
        self.days_label.pack(fill="x", pady=2)
        
        self.completed_label = tk.Label(right_info, text="已完成: 0 天", anchor="w")
        self.completed_label.pack(fill="x", pady=2)
        
        self.time_label = tk.Label(right_info, text="耗时: 00:00:00", anchor="w")
        self.time_label.pack(fill="x", pady=2)
        
        # 数据预览区域
        preview_frame = ttk.LabelFrame(progress_frame, text="数据预览 (最新50条)", padding=5)
        preview_frame.pack(fill="both", expand=True, pady=5)
        
        # 创建表格
        columns = ("时间", "期数", "号码1", "号码2", "号码3", "总和", "大小", "单双")
        self.data_tree = ttk.Treeview(preview_frame, columns=columns, show="headings", height=6)
        
        # 设置列标题和宽度
        self.data_tree.heading("时间", text="时间")
        self.data_tree.heading("期数", text="期数")
        self.data_tree.heading("号码1", text="号码1")
        self.data_tree.heading("号码2", text="号码2")
        self.data_tree.heading("号码3", text="号码3")
        self.data_tree.heading("总和", text="总和")
        self.data_tree.heading("大小", text="大小")
        self.data_tree.heading("单双", text="单双")
        
        self.data_tree.column("时间", width=140)
        self.data_tree.column("期数", width=100)
        self.data_tree.column("号码1", width=60)
        self.data_tree.column("号码2", width=60)
        self.data_tree.column("号码3", width=60)
        self.data_tree.column("总和", width=60)
        self.data_tree.column("大小", width=60)
        self.data_tree.column("单双", width=60)
        
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
        
        self.log_text = tk.Text(log_frame, height=5, yscrollcommand=scrollbar.set, 
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
            
    def start_crawling(self):
        """开始爬取"""
        # 验证输入
        try:
            start_date = datetime.strptime(self.start_date_var.get(), "%Y-%m-%d")
            end_date = datetime.strptime(self.end_date_var.get(), "%Y-%m-%d")
            interval = float(self.interval_var.get())
            
            if start_date > end_date:
                messagebox.showerror("错误", "开始日期不能晚于结束日期！")
                return
                
            if interval < 1 or interval > 60:
                messagebox.showerror("错误", "请求间隔应在 1-60 秒之间！")
                return
                
        except ValueError as e:
            messagebox.showerror("错误", f"日期格式错误或间隔无效！\n{e}")
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
        
        # 清空日志
        self.log_text.delete("1.0", "end")
        
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
            start_date = datetime.strptime(self.start_date_var.get(), "%Y-%m-%d")
            end_date = datetime.strptime(self.end_date_var.get(), "%Y-%m-%d")
            interval = float(self.interval_var.get())
            lot_code = self.lot_code_var.get()
            
            total_days = (end_date - start_date).days + 1
            current_date = start_date
            day_count = 0
            
            self.root.after(0, lambda: self.days_label.config(text=f"总天数: {total_days}"))
            
            while current_date <= end_date and not self.stop_flag:
                # 处理暂停
                while self.is_paused and not self.stop_flag:
                    time.sleep(0.1)
                    
                if self.stop_flag:
                    break
                    
                day_count += 1
                date_str = current_date.strftime("%Y-%m-%d")
                
                # 更新当前日期显示
                self.root.after(0, lambda d=date_str: 
                              self.current_date_label.config(text=f"当前日期: {d}"))
                
                # 获取数据
                records = self.fetch_data(date_str, lot_code)
                
                if records:
                    self.all_data.extend(records)
                    self.root.after(0, lambda r=len(records): 
                                  self.records_label.config(text=f"当前记录: {r} 条"))
                    self.root.after(0, lambda t=len(self.all_data): 
                                  self.total_label.config(text=f"总记录数: {t} 条"))
                    
                    # 更新数据预览表格
                    self.root.after(0, self.update_data_preview)
                    
                # 更新进度
                progress = (day_count / total_days) * 100
                self.root.after(0, lambda p=progress: self.progress_var.set(p))
                self.root.after(0, lambda c=day_count: 
                              self.completed_label.config(text=f"已完成: {c} 天"))
                
                # 更新耗时
                elapsed = time.time() - start_time
                time_str = time.strftime("%H:%M:%S", time.gmtime(elapsed))
                self.root.after(0, lambda t=time_str: 
                              self.time_label.config(text=f"耗时: {t}"))
                
                # 移动到下一天
                current_date += timedelta(days=1)
                
                # 延迟
                if current_date <= end_date and not self.stop_flag:
                    time.sleep(interval)
            
            # 完成
            if not self.stop_flag:
                self.root.after(0, lambda: self.status_label.config(
                    text=f"完成！共获取 {len(self.all_data)} 条记录", fg="green"))
                self.root.after(0, lambda: self.log(
                    f"爬取完成！总共获取 {len(self.all_data)} 条记录", "SUCCESS"))
                self.root.after(0, lambda: messagebox.showinfo(
                    "完成", f"爬取完成！\n总共获取 {len(self.all_data)} 条记录"))
            
        except Exception as e:
            self.root.after(0, lambda: self.log(f"发生错误: {e}", "ERROR"))
            self.root.after(0, lambda: messagebox.showerror("错误", f"爬取过程中发生错误:\n{e}"))
        
        finally:
            self.is_running = False
            self.root.after(0, lambda: self.start_btn.config(state="normal"))
            self.root.after(0, lambda: self.pause_btn.config(state="disabled"))
            self.root.after(0, lambda: self.resume_btn.config(state="disabled"))
            self.root.after(0, lambda: self.stop_btn.config(state="disabled"))
            
    def fetch_data(self, date_str, lot_code):
        """获取指定日期的数据"""
        date_parts = date_str.split('-')
        formatted_date = f"{date_parts[0]}-{int(date_parts[1])}-{int(date_parts[2])}"
        
        params = {
            'date': formatted_date,
            'lotCode': lot_code
        }
        
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = requests.get(self.base_url, params=params, timeout=10)
                response.raise_for_status()
                
                data = response.json()
                
                if data and 'result' in data and isinstance(data['result'], dict):
                    if 'data' in data['result'] and data['result']['data']:
                        records = data['result']['data']
                        self.root.after(0, lambda d=date_str, c=len(records): 
                                      self.log(f"{d}: 成功获取 {c} 条记录"))
                        return records
                    else:
                        self.root.after(0, lambda d=date_str: 
                                      self.log(f"{d}: 无数据"))
                        return []
                else:
                    # Invalid format, retry
                    if attempt < max_retries - 1:
                        self.root.after(0, lambda d=date_str, i=attempt+1:
                                      self.log(f"{d}: 格式错误, 重试 {i}/{max_retries}", "WARNING"))
                        time.sleep(2)
                        continue
                    else:
                        self.root.after(0, lambda d=date_str: 
                                      self.log(f"{d}: 响应格式错误", "ERROR"))
            
            except Exception as e:
                if attempt < max_retries - 1:
                    self.root.after(0, lambda d=date_str, err=str(e), i=attempt+1: # Fixed lambda capture
                                  self.log(f"{d}: 请求失败 {err}, 重试 {i}/{max_retries}", "WARNING"))
                    time.sleep(2)
                    continue
                else:
                    self.root.after(0, lambda d=date_str, err=str(e): 
                                  self.log(f"{d}: 请求失败 - {err}", "ERROR"))

        # If reached here, means failed after retries
        try:
            with open("failed_dates.log", "a", encoding="utf-8") as f:
                f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ERROR: {date_str}\n")
        except Exception:
            pass
            
        return []
            
    def update_data_preview(self):
        """更新数据预览表格"""
        # 清空现有数据
        for item in self.data_tree.get_children():
            self.data_tree.delete(item)
        
        # 只显示最新的50条数据
        display_data = self.all_data[-50:] if len(self.all_data) > 50 else self.all_data
        
        # 倒序显示，最新的在最上面
        for record in reversed(display_data):
            time_str = record.get('preDrawTime', '')
            issue = record.get('preDrawIssue', '')
            
            # 解析号码
            draw_code = record.get('preDrawCode', '')
            if draw_code:
                nums = draw_code.split(',')
                num1, num2, num3 = (nums[0] if len(nums) > 0 else '', 
                                   nums[1] if len(nums) > 1 else '', 
                                   nums[2] if len(nums) > 2 else '')
            else:
                num1, num2, num3 = '', '', ''
            
            total = record.get('sumNum', '')
            
            # 大小
            size_val = record.get('sumBigSmall', '')
            size = '大' if size_val == 1 else '小' if size_val == -1 else ''
            
            # 单双
            parity_val = record.get('sumSingleDouble', '')
            parity = '单' if parity_val == 1 else '双' if parity_val == -1 else ''
            
            # 插入到表格
            self.data_tree.insert('', 'end', values=(time_str, issue, num1, num2, num3, total, size, parity))
            
    def export_data(self):
        """导出数据"""
        if not self.all_data:
            messagebox.showwarning("警告", "没有可导出的数据！请先爬取数据。")
            return
            
        if not self.export_excel_var.get() and not self.export_txt_var.get():
            messagebox.showwarning("警告", "请至少选择一种导出格式！")
            return
            
        # 选择保存位置
        folder = filedialog.askdirectory(title="选择保存文件夹")
        if not folder:
            return
            
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            
            # 导出 Excel
            if self.export_excel_var.get():
                excel_file = f"{folder}/pc28_data_{timestamp}.xlsx"
                self.export_to_excel(excel_file)
                self.log(f"Excel文件已导出: {excel_file}", "SUCCESS")
                
            # 导出 TXT
            if self.export_txt_var.get():
                txt_file = f"{folder}/pc28_data_{timestamp}.txt"
                self.export_to_txt(txt_file)
                self.log(f"TXT文件已导出: {txt_file}", "SUCCESS")
                
            messagebox.showinfo("成功", "数据导出完成！")
            
        except Exception as e:
            self.log(f"导出失败: {e}", "ERROR")
            messagebox.showerror("错误", f"导出失败:\n{e}")
            
    def export_to_txt(self, filename):
        """导出为TXT文件"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("=" * 100 + "\n")
            f.write(f"{'时间':<20} {'期数':<15} {'开奖号':<20} {'总和':<10} {'大小':<10} {'单双':<10}\n")
            f.write("=" * 100 + "\n")
            
            for record in self.all_data:
                time_str = record.get('preDrawTime', '')
                issue = record.get('preDrawIssue', '')
                
                draw_code = record.get('preDrawCode', '')
                if draw_code:
                    nums = draw_code.split(',')
                    numbers = ' + '.join(nums)
                else:
                    numbers = ''
                
                total = record.get('sumNum', '')
                
                size_val = record.get('sumBigSmall', '')
                size = '大' if size_val == 1 else '小' if size_val == -1 else ''
                
                parity_val = record.get('sumSingleDouble', '')
                parity = '单' if parity_val == 1 else '双' if parity_val == -1 else ''
                
                f.write(f"{time_str:<20} {issue:<15} {numbers:<20} {total:<10} {size:<10} {parity:<10}\n")
            
            f.write("=" * 100 + "\n")
            f.write(f"总记录数: {len(self.all_data)}\n")
            
    def export_to_excel(self, filename):
        """导出为Excel文件"""
        data_for_df = []
        for record in self.all_data:
            time_str = record.get('preDrawTime', '')
            issue = record.get('preDrawIssue', '')
            
            draw_code = record.get('preDrawCode', '')
            if draw_code:
                nums = draw_code.split(',')
                num1, num2, num3 = nums[0] if len(nums) > 0 else '', nums[1] if len(nums) > 1 else '', nums[2] if len(nums) > 2 else ''
            else:
                num1, num2, num3 = '', '', ''
            
            total = record.get('sumNum', '')
            
            size_val = record.get('sumBigSmall', '')
            size = '大' if size_val == 1 else '小' if size_val == -1 else ''
            
            parity_val = record.get('sumSingleDouble', '')
            parity = '单' if parity_val == 1 else '双' if parity_val == -1 else ''
            
            data_for_df.append({
                '时间': time_str,
                '期数': issue,
                '号码1': num1,
                '号码2': num2,
                '号码3': num3,
                '总和': total,
                '大小': size,
                '单双': parity
            })
        
        df = pd.DataFrame(data_for_df)
        df.to_excel(filename, index=False, engine='openpyxl')


def main():
    root = tk.Tk()
    app = PC28CrawlerGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
