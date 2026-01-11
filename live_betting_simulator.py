import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime, timedelta
import threading
import requests
import pandas as pd
import time
import json
import os
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
from dynamic_hot_pool import DynamicHotPool

# 设置matplotlib中文字体
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']  # 微软雅黑、黑体、宋体
plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题


class LiveBettingSimulator:
    """实时投注模拟系统"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("PC28 实时投注模拟系统")
        
        # 🖥️ 屏幕自适应：获取屏幕尺寸
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()
        
        # 设置窗口大小为屏幕的80%，但不小于800x600，不大于1400x1050
        window_width = min(max(int(screen_width * 0.8), 800), 1400)
        window_height = min(max(int(screen_height * 0.8), 600), 1050)
        
        # 居中显示
        x = (screen_width - window_width) // 2
        y = (screen_height - window_height) // 2
        
        self.root.geometry(f"{window_width}x{window_height}+{x}+{y}")
        self.root.resizable(True, True)  # 允许调整窗口大小
        
        # 配置参数
        self.base_bet = 1750  # 基础投入
        self.num_codes = 875  # 号码数量
        self.payout_rate = 995  # 赔率（默认995倍，买1元中奖拿回995元）
        self.max_per_code = 10  # 单码最高金额
        self.increase_rate = 0.02  # 输了递增比例（2%）
        self.increase_fixed = 20  # 输了固定增加（20元）
        self.decrease_rate = 0.02  # 赢了递减比例（2%）
        
        # API配置
        self.api_url = "https://www.1680536.com/api/LuckTwenty/getPcLucky28List.do"
        self.lot_code = "10074"
        
        # 配置文件
        self.config_file = "simulator_config.json"
        
        # 数据存储
        self.my_numbers = set()  # 我的875个号码
        self.current_bet = self.base_bet
        self.total_profit = 0
        self.total_turnover = 0  # 总流水（累计投注额）
        self.history = []
        self.is_running = False
        self.auto_refresh_thread = None
        self.recovery_mode = False  # 追平模式
        self.consecutive_losses = 0  # 连续亏损期数（用于逐期对冲）
        self.consecutive_losses = 0  # 连续亏损期数（用于逐期对冲）
        self.last_numbers_file = None  # 最后导入的号码文件
        
        # 止盈止损配置
        self.enable_take_profit = False
        self.take_profit_amount = 2000
        self.enable_stop_loss = False
        self.stop_loss_amount = -5000
        
        # 极值统计
        self.max_bet = 0  # 最高投注额
        self.max_bet_issue = ""  # 最高投注额对应期号
        self.max_profit = 0  # 最高盈利点
        self.max_profit_issue = ""  # 最高盈利点对应期号
        self.min_profit = 0  # 最低点（最大亏损）
        self.min_profit_issue = ""  # 最低点对应期号
        
        # 动态热门号码池配置
        self.enable_hot_pool = False  # 是否启用热门池过滤
        self.hot_pool_generator = None  # 热门池生成器
        self.hot_pool_top_n = 875  # Top热门数量
        
        # 尝试初始化动态号码池
        try:
            data_file = r"数据\pc28_data_repaired.txt"
            if os.path.exists(data_file):
                self.hot_pool_generator = DynamicHotPool(data_file)
                print("✅ 动态号码池已加载")
            else:
                print("⚠️ 未找到数据文件，动态号码池功能不可用")
        except Exception as e:
            print(f"⚠️ 动态号码池加载失败: {e}")
        
        # 创建GUI
        self.create_widgets()
        
        # 加载配置
        self.load_config()
        
    def create_widgets(self):
        """创建界面组件 - 优化版（左右可拖动分隔）"""
        # 标题
        title_label = tk.Label(self.root, text="PC28 实时投注模拟系统", 
                              font=("Arial", 16, "bold"))
        title_label.pack(pady=10)
        
        # 🎨 主容器 - 使用PanedWindow实现可拖动的左右分栏
        # 注意：不使用expand=True，给底部按钮留空间
        main_paned = tk.PanedWindow(self.root, orient=tk.HORIZONTAL, 
                                    sashwidth=8, sashrelief=tk.RAISED,
                                    bg='#cccccc')
        main_paned.pack(fill="both", expand=True, padx=10, pady=(5, 0))
        
        # === 左侧面板（带滚动条） ===
        left_container = ttk.Frame(main_paned)
        main_paned.add(left_container, minsize=400)  # 最小宽度400像素
        
        # 左侧内容区域（带智能滚动条 - 仅在需要时显示）
        left_canvas = tk.Canvas(left_container, highlightthickness=0)
        left_scrollbar = ttk.Scrollbar(left_container, orient="vertical", command=left_canvas.yview)
        self.left_scrollable = ttk.Frame(left_canvas)
        
        left_canvas.configure(yscrollcommand=left_scrollbar.set)
        left_canvas.pack(side="left", fill="both", expand=True)
        
        left_canvas_window = left_canvas.create_window((0, 0), window=self.left_scrollable, anchor="nw")
        
        # 智能滚动条：只在需要时显示
        def update_scrollbar():
            left_canvas.update_idletasks()
            # 获取Canvas的高度和内容的实际高度
            canvas_height = left_canvas.winfo_height()
            content_height = self.left_scrollable.winfo_reqheight()
            
            # 只有当内容高度大于Canvas高度时才显示滚动条
            if content_height > canvas_height:
                left_scrollbar.pack(side="right", fill="y", before=left_canvas)
            else:
                left_scrollbar.pack_forget()
        
        def on_left_configure(event=None):
            left_canvas.configure(scrollregion=left_canvas.bbox("all"))
            update_scrollbar()
        
        self.left_scrollable.bind("<Configure>", on_left_configure)
        
        def on_left_canvas_configure(event):
            left_canvas.itemconfig(left_canvas_window, width=event.width)
            # 也在Canvas大小变化时更新滚动条
            update_scrollbar()
        
        left_canvas.bind("<Configure>", on_left_canvas_configure)
        
        # 鼠标滚轮支持（左侧）- 使用 Enter/Leave 事件动态绑定
        def _on_left_mousewheel(event):
            left_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        
        def bind_left_wheel(event):
            self.root.bind_all("<MouseWheel>", _on_left_mousewheel)
        
        def unbind_left_wheel(event):
            self.root.unbind_all("<MouseWheel>")
        
        left_canvas.bind("<Enter>", bind_left_wheel)
        left_canvas.bind("<Leave>", unbind_left_wheel)
        
        # 1. 顶部：当前状态 (含极值统计)
        self.create_status_panel(self.left_scrollable)
        
        # 2. 中部选项卡：分离操作与设置
        notebook = ttk.Notebook(self.left_scrollable)
        notebook.pack(fill="both", expand=True, pady=5, padx=5)
        
        # [Tab 1] 运行控制
        tab_run = ttk.Frame(notebook)
        notebook.add(tab_run, text=" 运行控制 ")
        
        self.create_live_draw_panel(tab_run)
        self.create_backtest_panel(tab_run)
        
        # [Tab 2] 系统设置
        tab_settings = ttk.Frame(notebook)
        notebook.add(tab_settings, text=" 系统设置 ")
        
        self.create_settings_panel(tab_settings)
        self.create_import_panel(tab_settings)
        
        # === 右侧面板（无滚动条，自适应布局） ===
        right_container = ttk.Frame(main_paned)
        main_paned.add(right_container, minsize=500)  # 最小宽度500像素
        
        # 5. 盈亏图表区域（占50%高度）
        self.create_chart_panel(right_container)
        
        # 6. 历史记录区域（占50%高度）
        self.create_history_panel(right_container)
        
        # 底部控制按钮
        self.create_control_buttons()
        
    def create_settings_panel(self, parent):
        """参数设置面板"""
        frame = ttk.LabelFrame(parent, text="参数设置", padding=10)
        frame.pack(fill="x", padx=5, pady=5)
        
        # 赔率设置
        ttk.Label(frame, text="中奖赔率:").grid(row=0, column=0, sticky="w", pady=3)
        self.payout_var = tk.StringVar(value="995")
        ttk.Entry(frame, textvariable=self.payout_var, width=10).grid(row=0, column=1, sticky="w", padx=5)
        tk.Label(frame, text="倍（投入×赔率=中奖金额）", fg="gray").grid(row=0, column=2, sticky="w")
        
        # 单码上限
        ttk.Label(frame, text="单码上限:").grid(row=1, column=0, sticky="w", pady=3)
        self.max_code_var = tk.StringVar(value="10")
        ttk.Entry(frame, textvariable=self.max_code_var, width=10).grid(row=1, column=1, sticky="w", padx=5)
        tk.Label(frame, text="元/号", fg="gray").grid(row=1, column=2, sticky="w")
        
        # 基础投入
        ttk.Label(frame, text="基础投入:").grid(row=2, column=0, sticky="w", pady=3)
        self.base_bet_var = tk.StringVar(value="1750")
        ttk.Entry(frame, textvariable=self.base_bet_var, width=10).grid(row=2, column=1, sticky="w", padx=5)
        tk.Label(frame, text="元", fg="gray").grid(row=2, column=2, sticky="w")
        
        # 分隔线
        ttk.Separator(frame, orient='horizontal').grid(row=3, column=0, columnspan=3, sticky="ew", pady=8)
        
        # 策略标题
        tk.Label(frame, text="动态调整策略:", font=("Arial", 9, "bold")).grid(row=4, column=0, columnspan=3, sticky="w")
        
        # 输了递增比例
        ttk.Label(frame, text="输递增比例:").grid(row=5, column=0, sticky="w", pady=3)
        self.increase_rate_var = tk.StringVar(value="2")
        ttk.Entry(frame, textvariable=self.increase_rate_var, width=10).grid(row=5, column=1, sticky="w", padx=5)
        tk.Label(frame, text="%", fg="gray").grid(row=5, column=2, sticky="w")
        
        # 输了固定增加
        ttk.Label(frame, text="输固定增加:").grid(row=6, column=0, sticky="w", pady=3)
        self.increase_fixed_var = tk.StringVar(value="20")
        ttk.Entry(frame, textvariable=self.increase_fixed_var, width=10).grid(row=6, column=1, sticky="w", padx=5)
        tk.Label(frame, text="元", fg="gray").grid(row=6, column=2, sticky="w")
        
        # 赢了递减比例
        ttk.Label(frame, text="赢递减比例:").grid(row=7, column=0, sticky="w", pady=3)
        self.decrease_rate_var = tk.StringVar(value="2")
        ttk.Entry(frame, textvariable=self.decrease_rate_var, width=10).grid(row=7, column=1, sticky="w", padx=5)
        tk.Label(frame, text="%", fg="gray").grid(row=7, column=2, sticky="w")
        
        # 分隔线
        ttk.Separator(frame, orient='horizontal').grid(row=8, column=0, columnspan=3, sticky="ew", pady=8)
        
        # 止盈止损标题
        tk.Label(frame, text="止盈止损控制:", font=("Arial", 9, "bold")).grid(row=9, column=0, columnspan=3, sticky="w")
        
        # 止盈设置
        self.take_profit_check_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(frame, text="启用止盈", variable=self.take_profit_check_var).grid(row=10, column=0, sticky="w")
        
        self.take_profit_var = tk.StringVar(value="2000")
        tp_entry = ttk.Entry(frame, textvariable=self.take_profit_var, width=8)
        tp_entry.grid(row=10, column=1, sticky="w", padx=5)
        tk.Label(frame, text="元", fg="gray").grid(row=10, column=2, sticky="w")
        
        # 止损设置
        self.stop_loss_check_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(frame, text="启用止损", variable=self.stop_loss_check_var).grid(row=11, column=0, sticky="w")
        
        self.stop_loss_var = tk.StringVar(value="-5000")
        sl_entry = ttk.Entry(frame, textvariable=self.stop_loss_var, width=8)
        sl_entry.grid(row=11, column=1, sticky="w", padx=5)
        tk.Label(frame, text="元", fg="gray").grid(row=11, column=2, sticky="w")
        
        # 分隔线
        ttk.Separator(frame, orient='horizontal').grid(row=12, column=0, columnspan=3, sticky="ew", pady=8)
        
        # 动态号码池设置
        tk.Label(frame, text="动态号码池:", font=("Arial", 9, "bold")).grid(row=13, column=0, columnspan=3, sticky="w")
        
        self.hot_pool_check_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(frame, text="启用热门池过滤", variable=self.hot_pool_check_var).grid(row=14, column=0, sticky="w")
        
        self.hot_pool_top_var = tk.StringVar(value="875")
        hp_entry = ttk.Entry(frame, textvariable=self.hot_pool_top_var, width=8)
        hp_entry.grid(row=14, column=1, sticky="w", padx=5)
        tk.Label(frame, text="种（Top热门数）", fg="gray").grid(row=14, column=2, sticky="w")
        
        tk.Label(frame, text="说明: 基于三年滚动窗口统计\n的热门号码进行过滤", 
                fg="blue", font=("Arial", 7)).grid(row=15, column=0, columnspan=3, sticky="w", pady=2)
        
        # 应用按钮
        ttk.Button(frame, text="应用设置", command=self.apply_settings).grid(row=16, column=0, columnspan=3, pady=10)
        
    def create_import_panel(self, parent):
        """号码导入面板"""
        frame = ttk.LabelFrame(parent, text="号码导入", padding=10)
        frame.pack(fill="x", padx=5, pady=5)
        
        ttk.Button(frame, text="📁 从TXT导入", command=self.import_from_txt, width=15).pack(side="left", padx=5)
        ttk.Button(frame, text="📊 从Excel导入", command=self.import_from_excel, width=15).pack(side="left", padx=5)
        ttk.Button(frame, text="🔍 查看号码", command=self.view_numbers, width=15).pack(side="left", padx=5)
        
        self.numbers_label = ttk.Label(frame, text="未导入", foreground="red")
        self.numbers_label.pack(side="left", padx=10)
        
    def create_live_draw_panel(self, parent):
        """实时开奖面板"""
        frame = ttk.LabelFrame(parent, text="实时开奖", padding=10)
        frame.pack(fill="x", padx=5, pady=5)
        
        # 最新开奖
        ttk.Label(frame, text="最新开奖:", font=("Arial", 10, "bold")).grid(row=0, column=0, sticky="w")
        self.draw_result_label = ttk.Label(frame, text="--", font=("Arial", 14, "bold"), foreground="blue")
        self.draw_result_label.grid(row=0, column=1, sticky="w", padx=10)
        
        # 开奖时间
        ttk.Label(frame, text="开奖时间:").grid(row=1, column=0, sticky="w")
        self.draw_time_label = ttk.Label(frame, text="--")
        self.draw_time_label.grid(row=1, column=1, sticky="w", padx=10)
        
        # 期号
        ttk.Label(frame, text="期号:").grid(row=2, column=0, sticky="w")
        self.draw_issue_label = ttk.Label(frame, text="--")
        self.draw_issue_label.grid(row=2, column=1, sticky="w", padx=10)
        
        # 下期倒计时
        ttk.Label(frame, text="下期倒计时:").grid(row=3, column=0, sticky="w")
        self.countdown_label = ttk.Label(frame, text="--", foreground="orange", font=("Arial", 10, "bold"))
        self.countdown_label.grid(row=3, column=1, sticky="w", padx=10)
        
        # 刷新按钮
        ttk.Button(frame, text="🔄 手动刷新", command=self.manual_refresh).grid(row=4, column=0, columnspan=2, pady=5)
        
    def create_backtest_panel(self, parent):
        """历史回测面板"""
        frame = ttk.LabelFrame(parent, text="历史回测", padding=10)
        frame.pack(fill="x", padx=5, pady=5)
        
        # 说明文字
        tk.Label(frame, text="选择日期回测历史开奖（1=最新一期）", 
                fg="blue", font=("Arial", 8)).grid(row=0, column=0, columnspan=3, sticky="w", pady=2)
        
        # 日期选择
        ttk.Label(frame, text="回测日期:").grid(row=1, column=0, sticky="w", pady=3)
        
        # 创建日期选择框架
        date_frame = ttk.Frame(frame)
        date_frame.grid(row=1, column=1, columnspan=2, sticky="w", padx=5)
        
        # 获取今天的日期
        from datetime import datetime
        today = datetime.now()
        
        # 年份选择（最近3年）
        current_year = today.year
        years = [str(y) for y in range(current_year - 2, current_year + 1)]
        self.backtest_year_var = tk.StringVar(value=str(today.year))
        year_combo = ttk.Combobox(date_frame, textvariable=self.backtest_year_var, 
                                  values=years, width=6, state="readonly")
        year_combo.pack(side="left", padx=2)
        tk.Label(date_frame, text="年").pack(side="left")
        
        # 月份选择
        months = [f"{m:02d}" for m in range(1, 13)]
        self.backtest_month_var = tk.StringVar(value=f"{today.month:02d}")
        month_combo = ttk.Combobox(date_frame, textvariable=self.backtest_month_var, 
                                   values=months, width=4, state="readonly")
        month_combo.pack(side="left", padx=2)
        tk.Label(date_frame, text="月").pack(side="left")
        
        # 日期选择
        days = [f"{d:02d}" for d in range(1, 32)]
        self.backtest_day_var = tk.StringVar(value=f"{today.day:02d}")
        day_combo = ttk.Combobox(date_frame, textvariable=self.backtest_day_var, 
                                values=days, width=4, state="readonly")
        day_combo.pack(side="left", padx=2)
        tk.Label(date_frame, text="日").pack(side="left")
        
        # 回测天数
        ttk.Label(frame, text="连续天数:").grid(row=2, column=0, sticky="w", pady=3)
        self.backtest_days_var = tk.StringVar(value="1")
        ttk.Entry(frame, textvariable=self.backtest_days_var, width=10).grid(row=2, column=1, sticky="w", padx=5)
        tk.Label(frame, text="天 (跨天盈亏延续)", fg="gray").grid(row=2, column=2, sticky="w")
        
        # 开始期数
        ttk.Label(frame, text="开始期数:").grid(row=3, column=0, sticky="w", pady=3)
        self.backtest_start_var = tk.StringVar(value="1")
        ttk.Entry(frame, textvariable=self.backtest_start_var, width=10).grid(row=3, column=1, sticky="w", padx=5)
        tk.Label(frame, text="(单日生效, 1=最新)", fg="gray").grid(row=3, column=2, sticky="w")
        
        # 结束期数
        ttk.Label(frame, text="结束期数:").grid(row=4, column=0, sticky="w", pady=3)
        self.backtest_end_var = tk.StringVar(value="288")
        ttk.Entry(frame, textvariable=self.backtest_end_var, width=10).grid(row=4, column=1, sticky="w", padx=5)
        tk.Label(frame, text="(回测多少期)", fg="gray").grid(row=4, column=2, sticky="w")
        
        # 回测按钮
        ttk.Button(frame, text="📊 开始回测", command=self.start_backtest).grid(row=5, column=0, columnspan=3, pady=5)
        
    def create_status_panel(self, parent):
        """当前状态面板"""
        frame = ttk.LabelFrame(parent, text="当前状态", padding=10)
        frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        # 当前投入
        info_frame = ttk.Frame(frame)
        info_frame.pack(fill="x", pady=2)
        ttk.Label(info_frame, text="当前投入:", font=("Arial", 10, "bold")).pack(side="left")
        self.current_bet_label = ttk.Label(info_frame, text="1750元", font=("Arial", 10, "bold"), foreground="blue")
        self.current_bet_label.pack(side="left", padx=5)
        
        # 单码价格
        info_frame2 = ttk.Frame(frame)
        info_frame2.pack(fill="x", pady=2)
        ttk.Label(info_frame2, text="单码价格:").pack(side="left")
        self.per_code_label = ttk.Label(info_frame2, text="2.00元")
        self.per_code_label.pack(side="left", padx=5)
        
        # 累计盈亏
        info_frame3 = ttk.Frame(frame)
        info_frame3.pack(fill="x", pady=2)
        ttk.Label(info_frame3, text="累计盈亏:", font=("Arial", 10, "bold")).pack(side="left")
        self.profit_label = ttk.Label(info_frame3, text="0元", font=("Arial", 12, "bold"), foreground="green")
        self.profit_label.pack(side="left", padx=5)
        
        # 总流水
        info_frame5 = ttk.Frame(frame)
        info_frame5.pack(fill="x", pady=2)
        ttk.Label(info_frame5, text="总 流 水 :").pack(side="left")
        self.turnover_label = ttk.Label(info_frame5, text="0元", font=("Arial", 10))
        self.turnover_label.pack(side="left", padx=5)
        
        # 待对冲期数
        info_frame4 = ttk.Frame(frame)
        info_frame4.pack(fill="x", pady=2)
        ttk.Label(info_frame4, text="待对冲期数:", font=("Arial", 9)).pack(side="left")
        self.pending_offset_label = ttk.Label(info_frame4, text="0期", font=("Arial", 10, "bold"), foreground="orange")
        self.pending_offset_label.pack(side="left", padx=5)
        tk.Label(info_frame4, text="(需连续赢此数量才能开始递减)", fg="gray", font=("Arial", 7)).pack(side="left")
        
        # 统计信息
        stats_frame = ttk.Frame(frame)
        stats_frame.pack(fill="x", pady=5)
        
        self.total_rounds_label = ttk.Label(stats_frame, text="总期数: 0")
        self.total_rounds_label.grid(row=0, column=0, sticky="w", pady=2)
        
        self.win_count_label = ttk.Label(stats_frame, text="中奖: 0", foreground="green")
        self.win_count_label.grid(row=0, column=1, sticky="w", padx=10)
        
        self.loss_count_label = ttk.Label(stats_frame, text="未中: 0", foreground="red")
        self.loss_count_label.grid(row=1, column=0, sticky="w", pady=2)
        
        self.win_rate_label = ttk.Label(stats_frame, text="胜率: 0%")
        self.win_rate_label.grid(row=1, column=1, sticky="w", padx=10)
        
        # 分隔线
        ttk.Separator(frame, orient='horizontal').pack(fill="x", pady=8)
        
        # 极值统计
        extreme_frame = ttk.LabelFrame(frame, text="📊 极值统计", padding=5)
        extreme_frame.pack(fill="x", pady=5)
        
        # 最高投注
        ttk.Label(extreme_frame, text="最高投注:", font=("Arial", 8)).grid(row=0, column=0, sticky="w", pady=2)
        self.max_bet_label = ttk.Label(extreme_frame, text="0元", foreground="purple", font=("Arial", 8, "bold"))
        self.max_bet_label.grid(row=0, column=1, sticky="w", padx=3)
        self.max_bet_issue_label = ttk.Label(extreme_frame, text="", foreground="gray", font=("Arial", 7))
        self.max_bet_issue_label.grid(row=0, column=2, sticky="w", padx=3)
        
        # 最高盈利
        ttk.Label(extreme_frame, text="最高盈利:", font=("Arial", 8)).grid(row=1, column=0, sticky="w", pady=2)
        self.max_profit_label = ttk.Label(extreme_frame, text="0元", foreground="green", font=("Arial", 8, "bold"))
        self.max_profit_label.grid(row=1, column=1, sticky="w", padx=3)
        self.max_profit_issue_label = ttk.Label(extreme_frame, text="", foreground="gray", font=("Arial", 7))
        self.max_profit_issue_label.grid(row=1, column=2, sticky="w", padx=3)
        
        # 最大亏损
        ttk.Label(extreme_frame, text="最大亏损:", font=("Arial", 8)).grid(row=2, column=0, sticky="w", pady=2)
        self.min_profit_label = ttk.Label(extreme_frame, text="0元", foreground="red", font=("Arial", 8, "bold"))
        self.min_profit_label.grid(row=2, column=1, sticky="w", padx=3)
        self.min_profit_issue_label = ttk.Label(extreme_frame, text="", foreground="gray", font=("Arial", 7))
        self.min_profit_issue_label.grid(row=2, column=2, sticky="w", padx=3)
        
    def create_chart_panel(self, parent):
        """盈亏图表面板"""
        # 配置父容器的grid权重
        parent.grid_rowconfigure(0, weight=3)  # 图表占60%
        parent.grid_rowconfigure(1, weight=2)  # 历史记录占40%
        parent.grid_columnconfigure(0, weight=1)
        
        frame = ttk.LabelFrame(parent, text="盈亏曲线", padding=5)
        frame.grid(row=0, column=0, sticky="nsew", padx=5, pady=5)
        
        # 创建matplotlib图表（自适应大小）
        self.figure = Figure(dpi=100)
        self.ax = self.figure.add_subplot(111)
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("累计盈亏（元）")
        self.ax.set_title("累计盈亏走势")
        self.ax.grid(True, alpha=0.3)
        self.ax.axhline(y=0, color='r', linestyle='--', alpha=0.5)
        
        self.canvas = FigureCanvasTkAgg(self.figure, frame)
        self.canvas.get_tk_widget().pack(fill="both", expand=True)
        
    def create_history_panel(self, parent):
        """历史记录面板"""
        frame = ttk.LabelFrame(parent, text="历史记录", padding=5)
        frame.grid(row=1, column=0, sticky="nsew", padx=5, pady=5)
        
        # 创建表格（自适应高度）
        columns = ("期数", "开奖", "投入", "单码", "结果", "本期盈亏", "累计盈亏")
        self.history_tree = ttk.Treeview(frame, columns=columns, show="headings")
        
        for col in columns:
            self.history_tree.heading(col, text=col)
        
        self.history_tree.column("期数", width=80)
        self.history_tree.column("开奖", width=80)
        self.history_tree.column("投入", width=80)
        self.history_tree.column("单码", width=60)
        self.history_tree.column("结果", width=60)
        self.history_tree.column("本期盈亏", width=100)
        self.history_tree.column("累计盈亏", width=100)
        
        # 滚动条
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
        
        self.stop_btn = ttk.Button(frame, text="⏹ 停止模拟", command=self.stop_simulation, width=15, state="disabled")
        self.stop_btn.pack(side="left", padx=5)
        
        ttk.Button(frame, text="🔄 重置数据", command=self.reset_data, width=15).pack(side="left", padx=5)
        ttk.Button(frame, text="📥 导出记录", command=self.export_history, width=15).pack(side="left", padx=5)
        
    # ========== 功能实现 ==========
    
    def apply_settings(self):
        """应用设置"""
        try:
            self.payout_rate = float(self.payout_var.get())
            self.max_per_code = float(self.max_code_var.get())
            self.base_bet = float(self.base_bet_var.get())
            self.increase_rate = float(self.increase_rate_var.get()) / 100  # 转换为小数
            self.increase_fixed = float(self.increase_fixed_var.get())
            self.decrease_rate = float(self.decrease_rate_var.get()) / 100  # 转换为小数
            
            # 止盈止损设置
            self.enable_take_profit = self.take_profit_check_var.get()
            self.take_profit_amount = float(self.take_profit_var.get())
            self.enable_stop_loss = self.stop_loss_check_var.get()
            self.stop_loss_amount = float(self.stop_loss_var.get())
            
            # 验证止损金额应该是负数
            if self.enable_stop_loss and self.stop_loss_amount > 0:
                self.stop_loss_amount = -self.stop_loss_amount
                self.stop_loss_var.set(str(self.stop_loss_amount))
            
            # 动态号码池设置
            self.enable_hot_pool = self.hot_pool_check_var.get()
            self.hot_pool_top_n = int(self.hot_pool_top_var.get())
            
            msg = f"设置已应用！\n\n策略:\n• 输增: {self.increase_rate*100}%+{self.increase_fixed}\n• 赢减: {self.decrease_rate*100}%"
            
            if self.enable_take_profit:
                msg += f"\n\n止盈: +{self.take_profit_amount}元"
            if self.enable_stop_loss:
                msg += f"\n止损: {self.stop_loss_amount}元"
            if self.enable_hot_pool:
                msg += f"\n\n✅ 热门池过滤: Top {self.hot_pool_top_n}"
                
            messagebox.showinfo("成功", msg)
        except ValueError:
            messagebox.showerror("错误", "请输入有效的数字！")
    
    def import_from_txt(self):
        """从TXT导入号码"""
        filepath = filedialog.askopenfilename(
            title="选择TXT文件",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")]
        )
        if not filepath:
            return
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                numbers = []
                for line in f:
                    line = line.strip()
                    if line and len(line) == 3 and line.isdigit():
                        # 验证是否都是0-9的数字
                        if all(c in '0123456789' for c in line):
                            numbers.append(line)
            
            self.my_numbers = set(numbers)
            self.numbers_label.config(
                text=f"已导入 {len(self.my_numbers)} 个号码",
                foreground="green"
            )
            self.last_numbers_file = filepath
            self.save_config()
            messagebox.showinfo("成功", f"成功导入 {len(self.my_numbers)} 个号码！")
        except Exception as e:
            messagebox.showerror("错误", f"导入失败:\n{e}")
    
    def import_from_excel(self):
        """从Excel导入号码"""
        filepath = filedialog.askopenfilename(
            title="选择Excel文件",
            filetypes=[("Excel files", "*.xlsx *.xls"), ("All files", "*.*")]
        )
        if not filepath:
            return
        
        try:
            df = pd.read_excel(filepath)
            numbers = []
            
            # 尝试从第一列读取
            for val in df.iloc[:, 0]:
                val_str = str(val).strip()
                if len(val_str) == 3 and val_str.isdigit():
                    if all(c in '0123456789' for c in val_str):
                        numbers.append(val_str)
            
            self.my_numbers = set(numbers)
            self.numbers_label.config(
                text=f"已导入 {len(self.my_numbers)} 个号码",
                foreground="green"
            )
            messagebox.showinfo("成功", f"成功导入 {len(self.my_numbers)} 个号码！")
        except Exception as e:
            messagebox.showerror("错误", f"导入失败:\n{e}")
    
    def view_numbers(self):
        """查看已导入的号码"""
        if not self.my_numbers:
            messagebox.showwarning("警告", "还没有导入号码！")
            return
        
        # 创建新窗口显示号码
        view_window = tk.Toplevel(self.root)
        view_window.title(f"已导入号码（共{len(self.my_numbers)}个）")
        view_window.geometry("400x500")
        
        text = tk.Text(view_window, wrap="word")
        text.pack(fill="both", expand=True, padx=10, pady=10)
        
        sorted_numbers = sorted(self.my_numbers)
        for i, num in enumerate(sorted_numbers, 1):
            text.insert("end", f"{i}. {num}\n")
        
        text.config(state="disabled")
    
    def fetch_latest_draw(self):
        """获取最新开奖"""
        try:
            today = datetime.now().strftime("%Y-%m-%d")
            params = {
                'date': today,
                'lotCode': self.lot_code
            }
            
            response = requests.get(self.api_url, params=params, timeout=10)
            data = response.json()
            
            if data and 'result' in data and isinstance(data['result'], dict):
                if 'data' in data['result'] and data['result']['data']:
                    # 获取最新一期（第一条）
                    latest = data['result']['data'][0]
                    return latest
            
            return None
        except Exception as e:
            print(f"获取开奖失败: {e}")
            return None
    
    def manual_refresh(self):
        """手动刷新开奖"""
        draw = self.fetch_latest_draw()
        if draw:
            self.update_draw_display(draw)
        else:
            messagebox.showwarning("警告", "无法获取最新开奖数据！")
    
    def update_draw_display(self, draw):
        """更新开奖显示"""
        # 解析号码
        draw_code = draw.get('preDrawCode', '')
        if draw_code:
            nums = draw_code.split(',')
            draw_str = '-'.join(nums)
        else:
           draw_str = "未知"
        
        self.draw_result_label.config(text=draw_str)
        self.draw_time_label.config(text=draw.get('preDrawTime', '--'))
        self.draw_issue_label.config(text=draw.get('preDrawIssue', '--'))
        
        # 计算下期时间（5分钟后）
        try:
            draw_time = datetime.strptime(draw.get('preDrawTime', ''), "%Y-%m-%d %H:%M:%S")
            next_time = draw_time + timedelta(minutes=5)
            self.start_countdown(next_time)
        except:
            pass
    
    def start_countdown(self, target_time):
        """开始倒计时"""
        def update():
            if not self.is_running:
                return
            
            now = datetime.now()
            remaining = target_time - now
            
            if remaining.total_seconds() > 0:
                minutes = int(remaining.total_seconds() // 60)
                seconds = int(remaining.total_seconds() % 60)
                self.countdown_label.config(text=f"{minutes:02d}:{seconds:02d}")
                self.root.after(1000, update)
            else:
                self.countdown_label.config(text="开奖中...")
                # 5秒后刷新获取新开奖
                self.root.after(5000, self.check_and_process)
        
        update()
    
    def check_and_process(self):
        """检查新开奖并处理"""
        if not self.is_running:
            return
        
        draw = self.fetch_latest_draw()
        if draw:
            # 检查是否是新的一期
            issue = draw.get('preDrawIssue', '')
            if not self.history or issue != self.history[-1].get('issue', ''):
                self.process_new_draw(draw)
            
            self.update_draw_display(draw)
    
    def process_new_draw(self, draw):
        """处理新开奖"""
        if not self.my_numbers:
            return
        
        # 🔥 动态热门池过滤
        working_numbers = self.my_numbers.copy()  # 复制一份用于本期投注
        
        if self.enable_hot_pool and self.hot_pool_generator:
            try:
                # 获取当前时刻的热门号码池
                current_time = datetime.now()
                hot_pool, _ = self.hot_pool_generator.get_hot_pool(current_time, top_n=self.hot_pool_top_n)
                
                # 将hot_pool从"N1,N2,N3"格式转换为"N1N2N3"格式
                hot_pool_formatted = {num.replace(',', '') for num in hot_pool}
                
                # 过滤：只保留在热门池中的号码
                working_numbers = working_numbers.intersection(hot_pool_formatted)
                
                print(f"✅ 热门池过滤: {len(self.my_numbers)} -> {len(working_numbers)}")
            except Exception as e:
                print(f"⚠️ 热门池过滤失败: {e}")
                # 失败时使用原号码池
                working_numbers = self.my_numbers
        
        # 如果过滤后没有号码了，使用原号码池
        if not working_numbers:
            print("⚠️ 热门池过滤后无号码，使用原号码池")
            working_numbers = self.my_numbers
        
        # 解析开奖号码
        draw_code = draw.get('preDrawCode', '')
        if not draw_code:
            return
        
        # 转换格式：将"4,0,6"转换为"406"进行匹配
        draw_code_formatted = draw_code.replace(',', '')
        
        # 判断是否中奖（使用过滤后的号码池）
        won = draw_code_formatted in working_numbers
        
        # 计算盈亏
        if won:
            # 单注价格
            per_code_price = self.current_bet / len(working_numbers)
            # 中奖返还（单注投入 × 赔率）
            win_amount = per_code_price * self.payout_rate
            # 净盈利 = 中奖返还 - 总投入
            profit = win_amount - self.current_bet
        else:
            profit = -self.current_bet
        
        self.total_profit += profit
        self.total_turnover += self.current_bet
        
        # 记录历史
        # 保存原始格式用于显示，保存转换后格式用于判断
        record = {
            'issue': draw.get('preDrawIssue', ''),
            'draw_code': draw_code,
            'bet': self.current_bet,
            'per_code': round(self.current_bet / len(self.my_numbers), 2),
            'won': won,
            'profit': profit,
            'total_profit': self.total_profit
        }
        self.history.append(record)
        
        # 更新极值统计
        issue = draw.get('preDrawIssue', '')
        
        # 更新最高投注额
        if self.current_bet > self.max_bet:
            self.max_bet = self.current_bet
            self.max_bet_issue = issue
        
        # 更新最高盈利点
        if self.total_profit > self.max_profit:
            self.max_profit = self.total_profit
            self.max_profit_issue = issue
        
        # 更新最大亏损点（最低点）
        if self.total_profit < self.min_profit:
            self.min_profit = self.total_profit
            self.min_profit_issue = issue
        
        # 更新表格
        self.update_history_table(record)
        
        # 更新图表
        self.update_chart()
        
        # 更新统计
        self.update_statistics()
        
        # 计算下期投入
        self.current_bet = self.calculate_next_bet(won)
        self.update_current_status()

        # 检查止盈止损
        self.check_profit_loss_limits()
    
    def check_profit_loss_limits(self):
        """检查是否触发止盈止损"""
        if not self.is_running:
            return

        stop_reason = ""
        
        # 检查止盈
        if self.enable_take_profit and self.total_profit >= self.take_profit_amount:
            stop_reason = f"🎉 已达到止盈目标！\n\n当前盈利: +{self.total_profit:.2f}元\n目标金额: {self.take_profit_amount:.2f}元"
        
        # 检查止损
        elif self.enable_stop_loss and self.total_profit <= self.stop_loss_amount:
            stop_reason = f"⚠️ 已触发止损保护！\n\n当前亏损: {self.total_profit:.2f}元\n止损红线: {self.stop_loss_amount:.2f}元"
            
        if stop_reason:
            self.is_running = False
            self.start_btn.config(state="normal")
            self.stop_btn.config(state="disabled")
            
            # 使用after在主线程显示消息，避免在回测线程中直接弹出阻塞
            self.root.after(100, lambda: messagebox.showinfo("模拟停止", stop_reason))
    
    def calculate_next_bet(self, won):
        """计算下期投入 - 逐期对冲策略
        
        策略逻辑：
        1. 输了：增加投注额（比例+固定金额），并记录连续亏损期数+1
        2. 赢了：连续亏损期数-1，只有当连续亏损期数归零时才递减投注额
        3. 逐期对冲：如果连续亏了N期，需要连续赢N期才能完全对冲
        
        举例：
        - 第1期输了10元，consecutive_losses=1
        - 第2期输了10元，consecutive_losses=2  
        - 第3期输了10元，consecutive_losses=3
        - 第4期赢了，consecutive_losses=2（对冲第3期）
        - 第5期赢了，consecutive_losses=1（对冲第2期）
        - 第6期赢了，consecutive_losses=0（对冲第1期）
        - 第7期赢了，开始递减投注额
        """
        max_bet = len(self.my_numbers) * self.max_per_code
        
        if won:
            # 赢了，减少连续亏损计数
            if self.consecutive_losses > 0:
                # 还有未对冲的亏损期，保持当前投注额不变
                self.consecutive_losses -= 1
                next_bet = self.current_bet
            else:
                # 所有亏损期都已对冲，可以递减投注额
                next_bet = self.current_bet * (1 - self.decrease_rate)
                self.recovery_mode = False
        else:
            # 输了，增加连续亏损计数和投注额
            self.consecutive_losses += 1
            next_bet = self.current_bet + (self.current_bet * self.increase_rate + self.increase_fixed)
            if next_bet >= max_bet:
                next_bet = max_bet
                self.recovery_mode = True
        
        next_bet = min(next_bet, max_bet)
        next_bet = max(next_bet, self.base_bet)
        return round(next_bet, 2)
    
    def update_history_table(self, record):
        """更新历史表格"""
        values = (
            record['issue'],
            record['draw_code'],
            f"{record['bet']:.2f}",
            f"{record['per_code']:.2f}",
            "✅中" if record['won'] else "❌未中",
            f"{record['profit']:+.2f}",
            f"{record['total_profit']:+.2f}"
        )
        self.history_tree.insert('', 0, values=values)
    
    def update_chart(self):
        """更新图表"""
        if not self.history:
            return
        
        rounds = list(range(1, len(self.history) + 1))
        profits = [h['total_profit'] for h in self.history]
        
        self.ax.clear()
        self.ax.plot(rounds, profits, 'b-', linewidth=2)
        self.ax.fill_between(rounds, profits, 0, alpha=0.3)
        self.ax.axhline(y=0, color='r', linestyle='--', alpha=0.5)
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("累计盈亏（元）")
        self.ax.set_title("累计盈亏走势")
        self.ax.grid(True, alpha=0.3)
        
        self.canvas.draw()
    
    def update_statistics(self):
        """更新统计信息"""
        if not self.history:
            return
        
        total = len(self.history)
        wins = sum(1 for h in self.history if h['won'])
        losses = total - wins
        win_rate = (wins / total * 100) if total > 0 else 0
        
        self.total_rounds_label.config(text=f"总期数: {total}")
        self.win_count_label.config(text=f"中奖: {wins}")
        self.loss_count_label.config(text=f"未中: {losses}")
        self.win_rate_label.config(text=f"胜率: {win_rate:.1f}%")
    
    def update_current_status(self):
        """更新当前状态"""
        self.current_bet_label.config(text=f"{self.current_bet:.2f}元")
        per_code = self.current_bet / len(self.my_numbers) if self.my_numbers else 0
        self.per_code_label.config(text=f"{per_code:.2f}元")
        
        if self.total_profit > 0:
            self.profit_label.config(text=f"+{self.total_profit:.2f}元", foreground="green")
        elif self.total_profit < 0:
            self.profit_label.config(text=f"{self.total_profit:.2f}元", foreground="red")
        else:
            self.profit_label.config(text="0元", foreground="black")
            
        # 更新总流水
        self.turnover_label.config(text=f"{self.total_turnover:.2f}元")
        
        # 更新待对冲期数
        if self.consecutive_losses > 0:
            self.pending_offset_label.config(
                text=f"{self.consecutive_losses}期",
                foreground="orange"
            )
        else:
            self.pending_offset_label.config(
                text="0期",
                foreground="green"
            )
        
        # 更新极值统计
        # 最高投注
        if self.max_bet > 0:
            per_code = self.max_bet / len(self.my_numbers) if self.my_numbers else 0
            self.max_bet_label.config(text=f"{self.max_bet:.2f}元 (单码{per_code:.2f})")
            self.max_bet_issue_label.config(text=f"期号:{self.max_bet_issue}" if self.max_bet_issue else "")
        else:
            self.max_bet_label.config(text="0元")
            self.max_bet_issue_label.config(text="")
        
        # 最高盈利
        if self.max_profit > 0:
            self.max_profit_label.config(text=f"+{self.max_profit:.2f}元")
            self.max_profit_issue_label.config(text=f"期号:{self.max_profit_issue}" if self.max_profit_issue else "")
        else:
            self.max_profit_label.config(text="0元")
            self.max_profit_issue_label.config(text="")
        
        # 最大亏损
        if self.min_profit < 0:
            self.min_profit_label.config(text=f"{self.min_profit:.2f}元")
            self.min_profit_issue_label.config(text=f"期号:{self.min_profit_issue}" if self.min_profit_issue else "")
        else:
            self.min_profit_label.config(text="0元")
            self.min_profit_issue_label.config(text="")
    
    def start_simulation(self):
        """开始模拟"""
        if not self.my_numbers:
            messagebox.showwarning("警告", "请先导入号码！")
            return
        
        self.is_running = True
        self.start_btn.config(state="disabled")
        self.stop_btn.config(state="normal")
        
        # 立即获取一次
        self.manual_refresh()
        
        messagebox.showinfo("提示", "模拟已开始！系统将每5分钟自动检查新开奖。")
    
    def start_backtest(self):
        """开始历史回测"""
        if not self.my_numbers:
            messagebox.showwarning("警告", "请先导入号码！")
            return
        
        try:
            start_period = int(self.backtest_start_var.get())
            end_period = int(self.backtest_end_var.get())
            num_days = int(self.backtest_days_var.get())
            
            if start_period < 1 or end_period < 1 or num_days < 1:
                messagebox.showerror("错误", "参数必须大于0！")
                return
            
            # 获取选择的日期
            selected_date = f"{self.backtest_year_var.get()}-{self.backtest_month_var.get()}-{self.backtest_day_var.get()}"
            
            # 重置数据
            self.current_bet = self.base_bet
            self.total_profit = 0
            self.total_turnover = 0
            self.history = []
            self.consecutive_losses = 0  # 重置连续亏损计数
            
            # 重置极值统计
            self.max_bet = 0
            self.max_bet_issue = ""
            self.max_profit = 0
            self.max_profit_issue = ""
            self.min_profit = 0
            self.min_profit_issue = ""
            
            # 清空表格
            for item in self.history_tree.get_children():
                self.history_tree.delete(item)
            
            msg = f"开始回测 {selected_date} "
            if num_days > 1:
                msg += f"起连续 {num_days} 天的数据..."
            else:
                msg += f"的历史数据（{end_period}期）..."
            messagebox.showinfo("提示", msg)
            
            # 设置运行状态
            self.is_running = True
            self.start_btn.config(state="disabled")
            self.stop_btn.config(state="normal")
            
            # 在新线程中运行回测
            thread = threading.Thread(target=self.backtest_worker, 
                                     args=(start_period, end_period, selected_date, num_days), 
                                     daemon=True)
            thread.start()
            
        except ValueError:
            messagebox.showerror("错误", "请输入有效的数字！")
    
    def backtest_worker(self, start_period, end_period, start_date_str, num_days):
        """回测工作线程 - 支持多日"""
        try:
            total_processed = 0
            current_date = datetime.strptime(start_date_str, "%Y-%m-%d")
            
            for day_offset in range(num_days):
                if not self.is_running:
                    break
                    
                target_date = current_date + timedelta(days=day_offset)
                target_date_str = target_date.strftime("%Y-%m-%d")
                
                # 获取数据
                params = {'date': target_date_str, 'lotCode': self.lot_code}
                try:
                    response = requests.get(self.api_url, params=params, timeout=10)
                    data = response.json()
                except:
                    print(f"获取 {target_date_str} 数据失败，跳过...")
                    continue
                
                if not (data and 'result' in data and isinstance(data['result'], dict)):
                    continue
                
                all_draws = data['result'].get('data', [])
                if not all_draws:
                    continue
                
                # PC28接口返回的是倒序（最新在最前）
                # 为了模拟真实过程，如果是单日且指定了范围，我们需要截取
                # 如果是多日，或者是单日跑全天，我们通常需要正序（从早到晚）处理
                
                selected_draws = []
                if num_days == 1:
                    # 单日模式：支持指定范围
                    total_available = len(all_draws)
                    actual_end = min(end_period, total_available)
                    # 截取
                    selected_draws = all_draws[start_period-1:actual_end]
                    # 反转为正序（从旧到新）
                    selected_draws = list(reversed(selected_draws))
                else:
                    # 多日模式：跑全天数据（从早到晚）
                    selected_draws = list(reversed(all_draws))
                
                # 逐期处理
                for draw in selected_draws:
                    if not self.is_running:
                        break
                    
                    self.process_new_draw(draw)
                    total_processed += 1
                    time.sleep(0.01)  # 稍微快一点
                
                # 防止请求过快
                time.sleep(0.5)
            
            if self.is_running:
                # 只有正常完成才显示提示
                self.is_running = False
                self.root.after(0, lambda: self.start_btn.config(state="normal"))
                self.root.after(0, lambda: self.stop_btn.config(state="disabled"))
                self.root.after(0, lambda d=total_processed: 
                              messagebox.showinfo("完成", f"跨天回测完成！共处理 {d} 期数据"))
            
        except Exception as e:
            self.is_running = False
            self.root.after(0, lambda: self.start_btn.config(state="normal"))
            self.root.after(0, lambda: self.stop_btn.config(state="disabled"))
            self.root.after(0, lambda err=str(e): 
                          messagebox.showerror("错误", f"回测失败:\n{err}"))
    
    def stop_simulation(self):
        """停止模拟"""
        self.is_running = False
        self.start_btn.config(state="normal")
        self.stop_btn.config(state="disabled")
        messagebox.showinfo("提示", "模拟已停止！")
    
    def reset_data(self):
        """重置数据"""
        if messagebox.askyesno("确认", "确定要重置所有数据吗？"):
            self.current_bet = self.base_bet
            self.total_profit = 0
            self.total_turnover = 0
            self.history = []
            self.consecutive_losses = 0  # 重置连续亏损计数
            
            # 重置极值统计
            self.max_bet = 0
            self.max_bet_issue = ""
            self.max_profit = 0
            self.max_profit_issue = ""
            self.min_profit = 0
            self.min_profit_issue = ""
            
            # 清空表格
            for item in self.history_tree.get_children():
                self.history_tree.delete(item)
            
            # 重置图表
            self.ax.clear()
            self.ax.set_xlabel("期数")
            self.ax.set_ylabel("累计盈亏（元）")
            self.ax.grid(True, alpha=0.3)
            self.canvas.draw()
            
            # 重置统计
            self.update_current_status()
            self.total_rounds_label.config(text="总期数: 0")
            self.win_count_label.config(text="中奖: 0")
            self.loss_count_label.config(text="未中: 0")
            self.win_rate_label.config(text="胜率: 0%")
    
    def export_history(self):
        """导出历史记录"""
        if not self.history:
            messagebox.showwarning("警告", "没有历史记录可导出！")
            return
        
        filepath = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if not filepath:
            return
        
        try:
            df = pd.DataFrame(self.history)
            df.columns = ['期号', '开奖号码', '投入', '单码', '中奖', '本期盈亏', '累计盈亏']
            df['中奖'] = df['中奖'].map({True: '是', False: '否'})
            df.to_excel(filepath, index=False, engine='openpyxl')
            messagebox.showinfo("成功", f"历史记录已导出到:\n{filepath}")
        except Exception as e:
            messagebox.showerror("错误", f"导出失败:\n{e}")


    def save_config(self):
        """保存配置"""
        config = {'last_numbers_file': self.last_numbers_file}
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(config, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"保存配置失败: {e}")
    
    def load_config(self):
        """加载配置并自动导入号码"""
        if not os.path.exists(self.config_file):
            return
        
        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            last_file = config.get('last_numbers_file')
            if last_file and os.path.exists(last_file):
                try:
                    with open(last_file, 'r', encoding='utf-8') as f:
                        numbers = []
                        for line in f:
                            line = line.strip()
                            if line and len(line) == 3 and line.isdigit():
                                if all(c in '0123456789' for c in line):
                                    numbers.append(line)
                    
                    self.my_numbers = set(numbers)
                    self.last_numbers_file = last_file
                    self.numbers_label.config(
                        text=f"已自动导入 {len(self.my_numbers)} 个号码",
                        foreground="green"
                    )
                except Exception as e:
                    print(f"自动导入失败: {e}")
        except Exception as e:
            print(f"加载配置失败: {e}")


def main():
    root = tk.Tk()
    app = LiveBettingSimulator(root)
    root.mainloop()


if __name__ == "__main__":
    main()
