"""
加拿大28实时投注模拟器 - 简化版
适配新API，需要token认证
"""
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime, timedelta
import threading
import requests
import pandas as pd
import time
import json
import os
import urllib3
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt

# 禁用SSL警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 设置matplotlib中文字体
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
plt.rcParams['axes.unicode_minus'] = False


class Canada28Simulator:
    """加拿大28实时投注模拟系统"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("加拿大28 实时投注模拟系统")
        self.root.geometry("1200x900")
        
        # API配置
        self.history_api_url = "http://s1.pk999p.xyz/index.php/GamePeriods/LHistory"
        self.token = ""
        self.cookie = ""
        self.is_logged_in = False
        self.draw_interval_minutes = 4  # 开奖间隔
        
        # 投注参数
        self.base_bet = 1750
        self.payout_rate = 995
        self.max_per_code = 10
        self.increase_rate = 0.02
        self.increase_fixed = 20
        self.decrease_rate = 0.02
        
        # 数据存储
        self.my_numbers = set()
        self.current_bet = self.base_bet
        self.total_profit = 0
        self.total_turnover = 0
        self.history = []
        self.is_running = False
        self.consecutive_losses = 0
        
        # 止盈止损
        self.enable_take_profit = False
        self.take_profit_amount = 2000
        self.enable_stop_loss = False
        self.stop_loss_amount = -5000
        
        # 极值统计
        self.max_bet = 0
        self.max_bet_issue = ""
        self.max_profit = 0
        self.max_profit_issue = ""
        self.min_profit = 0
        self.min_profit_issue = ""
        
        # 创建UI
        self.create_widgets()
        
    def create_widgets(self):
        """创建界面"""
        # 顶部：标题和登录
        top_frame = ttk.Frame(self.root)
        top_frame.pack(fill="x", padx=10, pady=10)
        
        tk.Label(top_frame, text="加拿大28 实时投注模拟系统", 
                font=("Arial", 16, "bold")).pack(side="left")
        
        self.login_status = ttk.Label(top_frame, text="● 未登录", foreground="red")
        self.login_status.pack(side="right", padx=10)
        
        self.login_btn = ttk.Button(top_frame, text="🔑 登录", command=self.show_login)
        self.login_btn.pack(side="right")
        
        # 主容器
        main_container = ttk.Frame(self.root)
        main_container.pack(fill="both", expand=True, padx=10)
        
        # 左侧面板
        left_panel = ttk.Frame(main_container, width=400)
        left_panel.pack(side="left", fill="both", padx=(0, 5))
        
        # 右侧面板
        right_panel = ttk.Frame(main_container)
        right_panel.pack(side="right", fill="both", expand=True)
        
        # === 左侧内容 ===
        # 1. 当前状态
        self.create_status_panel(left_panel)
        
        # 2. 参数设置
        self.create_settings_panel(left_panel)
        
        # 3. 号码导入
        self.create_import_panel(left_panel)
        
        # 4. 实时开奖
        self.create_live_panel(left_panel)
        
        # === 右侧内容 ===
        # 5. 盈亏图表
        self.create_chart_panel(right_panel)
        
        # 6. 历史记录
        self.create_history_panel(right_panel)
        
        # 底部控制按钮
        self.create_control_buttons()
        
    def create_status_panel(self, parent):
        """当前状态面板"""
        frame = ttk.LabelFrame(parent, text="当前状态", padding=10)
        frame.pack(fill="x", pady=5)
        
        # 当前投入
        f1 = ttk.Frame(frame)
        f1.pack(fill="x", pady=2)
        ttk.Label(f1, text="当前投入:", font=("Arial", 9, "bold")).pack(side="left")
        self.current_bet_label = ttk.Label(f1, text="1750元", foreground="blue")
        self.current_bet_label.pack(side="left", padx=5)
        
        # 累计盈亏
        f2 = ttk.Frame(frame)
        f2.pack(fill="x", pady=2)
        ttk.Label(f2, text="累计盈亏:", font=("Arial", 9, "bold")).pack(side="left")
        self.profit_label = ttk.Label(f2, text="0元", font=("Arial", 10, "bold"), foreground="green")
        self.profit_label.pack(side="left", padx=5)
        
        # 总流水
        f3 = ttk.Frame(frame)
        f3.pack(fill="x", pady=2)
        ttk.Label(f3, text="总流水:").pack(side="left")
        self.turnover_label = ttk.Label(f3, text="0元")
        self.turnover_label.pack(side="left", padx=5)
        
        # 统计
        f4 = ttk.Frame(frame)
        f4.pack(fill="x", pady=5)
        self.rounds_label = ttk.Label(f4, text="总期数: 0")
        self.rounds_label.grid(row=0, column=0, sticky="w")
        self.win_label = ttk.Label(f4, text="中奖: 0", foreground="green")
        self.win_label.grid(row=0, column=1, sticky="w", padx=10)
        
        # 极值
        ttk.Separator(frame).pack(fill="x", pady=5)
        ttk.Label(frame, text="极值统计", font=("Arial", 8, "bold")).pack()
        
        self.max_bet_label = ttk.Label(frame, text="最高投注: 0元", font=("Arial", 7))
        self.max_bet_label.pack(anchor="w")
        self.max_profit_label = ttk.Label(frame, text="最高盈利: 0元", font=("Arial", 7), foreground="green")
        self.max_profit_label.pack(anchor="w")
        self.min_profit_label = ttk.Label(frame, text="最大亏损: 0元", font=("Arial", 7), foreground="red")
        self.min_profit_label.pack(anchor="w")
        
    def create_settings_panel(self, parent):
        """参数设置"""
        frame = ttk.LabelFrame(parent, text="参数设置", padding=10)
        frame.pack(fill="x", pady=5)
        
        # 赔率
        ttk.Label(frame, text="赔率:").grid(row=0, column=0, sticky="w", pady=2)
        self.payout_var = tk.StringVar(value="995")
        ttk.Entry(frame, textvariable=self.payout_var, width=10).grid(row=0, column=1, sticky="w")
        
        # 基础投入
        ttk.Label(frame, text="基础投入:").grid(row=1, column=0, sticky="w", pady=2)
        self.base_bet_var = tk.StringVar(value="1750")
        ttk.Entry(frame, textvariable=self.base_bet_var, width=10).grid(row=1, column=1, sticky="w")
        
        # 输递增
        ttk.Label(frame, text="输递增(%):").grid(row=2, column=0, sticky="w", pady=2)
        self.increase_var = tk.StringVar(value="2")
        ttk.Entry(frame, textvariable=self.increase_var, width=10).grid(row=2, column=1, sticky="w")
        
        # 赢递减
        ttk.Label(frame, text="赢递减(%):").grid(row=3, column=0, sticky="w", pady=2)
        self.decrease_var = tk.StringVar(value="2")
        ttk.Entry(frame, textvariable=self.decrease_var, width=10).grid(row=3, column=1, sticky="w")
        
        ttk.Button(frame, text="应用设置", command=self.apply_settings).grid(row=4, column=0, columnspan=2, pady=5)
        
    def create_import_panel(self, parent):
        """号码导入"""
        frame = ttk.LabelFrame(parent, text="号码导入", padding=10)
        frame.pack(fill="x", pady=5)
        
        ttk.Button(frame, text="从TXT导入", command=self.import_numbers, width=12).pack(side="left", padx=2)
        ttk.Button(frame, text="查看号码", command=self.view_numbers, width=12).pack(side="left", padx=2)
        
        self.numbers_label = ttk.Label(frame, text="未导入", foreground="red")
        self.numbers_label.pack(pady=5)
        
    def create_live_panel(self, parent):
        """实时开奖"""
        frame = ttk.LabelFrame(parent, text="实时开奖", padding=10)
        frame.pack(fill="x", pady=5)
        
        ttk.Label(frame, text="最新开奖:", font=("Arial", 9, "bold")).grid(row=0, column=0, sticky="w")
        self.draw_result = ttk.Label(frame, text="--", font=("Arial", 12, "bold"), foreground="blue")
        self.draw_result.grid(row=0, column=1, sticky="w", padx=10)
        
        ttk.Label(frame, text="期号:").grid(row=1, column=0, sticky="w")
        self.draw_issue = ttk.Label(frame, text="--")
        self.draw_issue.grid(row=1, column=1, sticky="w", padx=10)
        
        ttk.Label(frame, text="倒计时:").grid(row=2, column=0, sticky="w")
        self.countdown = ttk.Label(frame, text="--", foreground="orange", font=("Arial", 9, "bold"))
        self.countdown.grid(row=2, column=1, sticky="w", padx=10)
        
        ttk.Button(frame, text="🔄 手动刷新", command=self.manual_refresh).grid(row=3, column=0, columnspan=2, pady=5)
        
    def create_chart_panel(self, parent):
        """盈亏图表"""
        frame = ttk.LabelFrame(parent, text="盈亏曲线", padding=5)
        frame.pack(fill="both", expand=True, pady=5)
        
        self.figure = Figure(figsize=(8, 4), dpi=100)
        self.ax = self.figure.add_subplot(111)
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("累计盈亏（元）")
        self.ax.grid(True, alpha=0.3)
        self.ax.axhline(y=0, color='r', linestyle='--', alpha=0.5)
        
        self.canvas = FigureCanvasTkAgg(self.figure, frame)
        self.canvas.get_tk_widget().pack(fill="both", expand=True)
        
    def create_history_panel(self, parent):
        """历史记录"""
        frame = ttk.LabelFrame(parent, text="历史记录", padding=5)
        frame.pack(fill="both", expand=True, pady=5)
        
        columns = ("期号", "开奖", "投入", "结果", "本期盈亏", "累计盈亏")
        self.history_tree = ttk.Treeview(frame, columns=columns, show="headings", height=10)
        
        for col in columns:
            self.history_tree.heading(col, text=col)
            self.history_tree.column(col, width=100)
        
        scrollbar = ttk.Scrollbar(frame, orient="vertical", command=self.history_tree.yview)
        self.history_tree.configure(yscrollcommand=scrollbar.set)
        
        self.history_tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
    def create_control_buttons(self):
        """控制按钮"""
        frame = ttk.Frame(self.root)
        frame.pack(fill="x", padx=10, pady=10)
        
        self.start_btn = ttk.Button(frame, text="▶ 开始模拟", command=self.start_simulation, width=15)
        self.start_btn.pack(side="left", padx=5)
        
        self.stop_btn = ttk.Button(frame, text="⏹ 停止", command=self.stop_simulation, width=15, state="disabled")
        self.stop_btn.pack(side="left", padx=5)
        
        ttk.Button(frame, text="🔄 重置", command=self.reset_data, width=15).pack(side="left", padx=5)
        ttk.Button(frame, text="📥 导出", command=self.export_data, width=15).pack(side="left", padx=5)
        
    # ========== 功能实现 ==========
    
    def show_login(self):
        """显示登录窗口"""
        login_win = tk.Toplevel(self.root)
        login_win.title("登录")
        login_win.geometry("500x250")
        
        ttk.Label(login_win, text="请从浏览器复制Token:", font=("Arial", 10, "bold")).pack(pady=10)
        
        ttk.Label(login_win, text="Token:").pack(anchor="w", padx=20)
        token_entry = tk.Text(login_win, height=4, width=60)
        token_entry.pack(padx=20, pady=5)
        
        def do_login():
            token = token_entry.get("1.0", "end-1c").strip()
            if token:
                self.token = token
                self.is_logged_in = True
                self.login_status.config(text=f"● 已登录", foreground="green")
                self.login_btn.config(text="退出", command=self.logout)
                messagebox.showinfo("成功", "登录成功！")
                login_win.destroy()
            else:
                messagebox.showerror("错误", "Token不能为空！")
        
        ttk.Button(login_win, text="确认登录", command=do_login).pack(pady=10)
        
        help_text = "获取方法：\n1. 登录 http://s1.pk999p.xyz/\n2. F12打开开发者工具\n3. Network标签中复制token"
        ttk.Label(login_win, text=help_text, foreground="blue", font=("Arial", 8)).pack()
        
    def logout(self):
        """退出登录"""
        self.token = ""
        self.is_logged_in = False
        self.login_status.config(text="● 未登录", foreground="red")
        self.login_btn.config(text="🔑 登录", command=self.show_login)
        
    def apply_settings(self):
        """应用设置"""
        try:
            self.payout_rate = float(self.payout_var.get())
            self.base_bet = float(self.base_bet_var.get())
            self.increase_rate = float(self.increase_var.get()) / 100
            self.decrease_rate = float(self.decrease_var.get()) / 100
            messagebox.showinfo("成功", "设置已应用！")
        except ValueError:
            messagebox.showerror("错误", "请输入有效数字！")
            
    def import_numbers(self):
        """导入号码"""
        filepath = filedialog.askopenfilename(filetypes=[("Text files", "*.txt")])
        if not filepath:
            return
            
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                numbers = []
                for line in f:
                    line = line.strip()
                    if line and len(line) == 3 and line.isdigit():
                        numbers.append(line)
            
            self.my_numbers = set(numbers)
            self.numbers_label.config(text=f"已导入 {len(self.my_numbers)} 个", foreground="green")
            messagebox.showinfo("成功", f"导入 {len(self.my_numbers)} 个号码！")
        except Exception as e:
            messagebox.showerror("错误", f"导入失败:\n{e}")
            
    def view_numbers(self):
        """查看号码"""
        if not self.my_numbers:
            messagebox.showwarning("警告", "还没有导入号码！")
            return
            
        win = tk.Toplevel(self.root)
        win.title(f"已导入号码（{len(self.my_numbers)}个）")
        win.geometry("400x500")
        
        text = tk.Text(win, wrap="word")
        text.pack(fill="both", expand=True, padx=10, pady=10)
        
        for i, num in enumerate(sorted(self.my_numbers), 1):
            text.insert("end", f"{i}. {num}\n")
        text.config(state="disabled")
        
    def fetch_latest_draw(self):
        """获取最新开奖"""
        if not self.is_logged_in:
            return None
            
        try:
            headers = {
                'token': self.token,
                'user-agent': 'Mozilla/5.0'
            }
            params = {'game_id': 2, 'page': 1, 'limit': 1}
            
            response = requests.get(self.history_api_url, headers=headers, 
                                   params=params, timeout=10, verify=False)
            
            if response.status_code in [401, 403]:
                messagebox.showwarning("警告", "Token已过期，请重新登录！")
                self.logout()
                return None
            
            data = response.json()
            if data and 'data' in data and data['data']:
                latest = data['data'][0]
                return {
                    'draw_code': f"{latest.get('b')},{latest.get('s')},{latest.get('g')}",
                    'draw_time': latest.get('overt_at'),
                    'issue': latest.get('period_no')
                }
            return None
        except Exception as e:
            print(f"获取开奖失败: {e}")
            return None
            
    def manual_refresh(self):
        """手动刷新"""
        draw = self.fetch_latest_draw()
        if draw:
            self.update_draw_display(draw)
        else:
            messagebox.showwarning("警告", "无法获取数据！")
            
    def update_draw_display(self, draw):
        """更新显示"""
        nums = draw['draw_code'].split(',')
        self.draw_result.config(text='-'.join(nums))
        self.draw_issue.config(text=draw['issue'])
        
        try:
            draw_time = datetime.strptime(draw['draw_time'], "%Y-%m-%d %H:%M:%S")
            next_time = draw_time + timedelta(minutes=self.draw_interval_minutes)
            self.start_countdown(next_time)
        except:
            pass
            
    def start_countdown(self, target_time):
        """倒计时"""
        def update():
            if not self.is_running:
                return
            now = datetime.now()
            remaining = target_time - now
            
            if remaining.total_seconds() > 0:
                m = int(remaining.total_seconds() // 60)
                s = int(remaining.total_seconds() % 60)
                self.countdown.config(text=f"{m:02d}:{s:02d}")
                self.root.after(1000, update)
            else:
                self.countdown.config(text="开奖中...")
                self.root.after(5000, self.check_new_draw)
        update()
        
    def check_new_draw(self):
        """检查新开奖"""
        if not self.is_running:
            return
            
        draw = self.fetch_latest_draw()
        if draw:
            issue = draw['issue']
            if not self.history or issue != self.history[-1]['issue']:
                self.process_draw(draw)
            self.update_draw_display(draw)
            
    def process_draw(self, draw):
        """处理新开奖"""
        if not self.my_numbers:
            return
            
        draw_code = draw['draw_code'].replace(',', '')
        won = draw_code in self.my_numbers
        
        # 计算盈亏
        num_codes = len(self.my_numbers)
        per_code = min(self.current_bet / num_codes, self.max_per_code)
        actual_bet = per_code * num_codes
        
        if won:
            win_amount = per_code * self.payout_rate
            profit = win_amount - actual_bet
        else:
            profit = -actual_bet
            
        self.total_profit += profit
        self.total_turnover += actual_bet
        
        # 记录历史
        record = {
            'issue': draw['issue'],
            'draw_code': draw['draw_code'],
            'bet': actual_bet,
            'won': won,
            'profit': profit,
            'total_profit': self.total_profit
        }
        self.history.append(record)
        
        # 更新极值
        if actual_bet > self.max_bet:
            self.max_bet = actual_bet
            self.max_bet_issue = draw['issue']
        if self.total_profit > self.max_profit:
            self.max_profit = self.total_profit
            self.max_profit_issue = draw['issue']
        if self.total_profit < self.min_profit:
            self.min_profit = self.total_profit
            self.min_profit_issue = draw['issue']
            
        # 计算下期投入
        if won:
            self.consecutive_losses = max(0, self.consecutive_losses - 1)
            if self.consecutive_losses == 0:
                self.current_bet = max(self.base_bet, self.current_bet * (1 - self.decrease_rate))
        else:
            self.consecutive_losses += 1
            self.current_bet = self.current_bet * (1 + self.increase_rate) + self.increase_fixed
            
        # 更新UI
        self.update_ui()
        
        # 检查止盈止损
        self.check_limits()
        
    def check_limits(self):
        """检查止盈止损"""
        if self.enable_take_profit and self.total_profit >= self.take_profit_amount:
            messagebox.showinfo("止盈", f"已达到止盈点：{self.total_profit:.2f}元")
            self.stop_simulation()
        elif self.enable_stop_loss and self.total_profit <= self.stop_loss_amount:
            messagebox.showwarning("止损", f"已达到止损点：{self.total_profit:.2f}元")
            self.stop_simulation()
            
    def update_ui(self):
        """更新UI"""
        # 状态
        self.current_bet_label.config(text=f"{self.current_bet:.2f}元")
        profit_color = "green" if self.total_profit >= 0 else "red"
        self.profit_label.config(text=f"{self.total_profit:.2f}元", foreground=profit_color)
        self.turnover_label.config(text=f"{self.total_turnover:.2f}元")
        
        wins = sum(1 for h in self.history if h['won'])
        self.rounds_label.config(text=f"总期数: {len(self.history)}")
        self.win_label.config(text=f"中奖: {wins}")
        
        # 极值
        self.max_bet_label.config(text=f"最高投注: {self.max_bet:.2f}元 (期号{self.max_bet_issue})")
        self.max_profit_label.config(text=f"最高盈利: {self.max_profit:.2f}元 (期号{self.max_profit_issue})")
        self.min_profit_label.config(text=f"最大亏损: {self.min_profit:.2f}元 (期号{self.min_profit_issue})")
        
        # 图表
        self.ax.clear()
        if self.history:
            profits = [h['total_profit'] for h in self.history]
            self.ax.plot(range(1, len(profits) + 1), profits, 'b-', linewidth=2)
            self.ax.axhline(y=0, color='r', linestyle='--', alpha=0.5)
            self.ax.set_xlabel("期数")
            self.ax.set_ylabel("累计盈亏（元）")
            self.ax.grid(True, alpha=0.3)
        self.canvas.draw()
        
        # 历史记录
        self.history_tree.delete(*self.history_tree.get_children())
        for h in reversed(self.history[-30:]):  # 显示最近30条
            result = "中" if h['won'] else "未中"
            profit_str = f"{h['profit']:+.2f}"
            total_str = f"{h['total_profit']:.2f}"
            
            self.history_tree.insert('', 0, values=(
                h['issue'], h['draw_code'], f"{h['bet']:.2f}",
                result, profit_str, total_str
            ))
            
    def start_simulation(self):
        """开始模拟"""
        if not self.is_logged_in:
            messagebox.showwarning("警告", "请先登录！")
            return
        if not self.my_numbers:
            messagebox.showwarning("警告", "请先导入号码！")
            return
            
        self.is_running = True
        self.start_btn.config(state="disabled")
        self.stop_btn.config(state="normal")
        
        # 获取初始开奖
        draw = self.fetch_latest_draw()
        if draw:
            self.update_draw_display(draw)
            
    def stop_simulation(self):
        """停止模拟"""
        self.is_running = False
        self.start_btn.config(state="normal")
        self.stop_btn.config(state="disabled")
        
    def reset_data(self):
        """重置数据"""
        if messagebox.askyesno("确认", "确认重置所有数据？"):
            self.current_bet = self.base_bet
            self.total_profit = 0
            self.total_turnover = 0
            self.history = []
            self.consecutive_losses = 0
            self.max_bet = 0
            self.max_profit = 0
            self.min_profit = 0
            self.update_ui()
            
    def export_data(self):
        """导出数据"""
        if not self.history:
            messagebox.showwarning("警告", "没有数据可导出！")
            return
            
        filepath = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if not filepath:
            return
            
        try:
            df = pd.DataFrame(self.history)
            df.columns = ['期号', '开奖', '投入', '中奖', '本期盈亏', '累计盈亏']
            df['中奖'] = df['中奖'].map({True: '是', False: '否'})
            df.to_excel(filepath, index=False, engine='openpyxl')
            messagebox.showinfo("成功", f"已导出到:\n{filepath}")
        except Exception as e:
            messagebox.showerror("错误", f"导出失败:\n{e}")


if __name__ == "__main__":
    root = tk.Tk()
    app = Canada28Simulator(root)
    root.mainloop()
