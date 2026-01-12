import sys
import json
import os
import requests
from datetime import datetime
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QSplitter, QFrame, QLabel, QPushButton, 
                             QLineEdit, QTextEdit, QMessageBox, QGroupBox, QTableWidget,
                             QTableWidgetItem, QHeaderView, QComboBox, QCheckBox, QSpinBox,
                             QDoubleSpinBox, QFileDialog, QTabWidget, QInputDialog)
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import Qt, QUrl, QTimer, pyqtSignal, QObject, QThread
from PyQt5.QtGui import QFont, QColor
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

# 设置中文字体 (解决乱码问题)
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'PingFang SC', 'Heiti TC']
plt.rcParams['axes.unicode_minus'] = False

# 导入数据管理器
from data_manager import CanadaDataManager


class BacktestWorker(QThread):
    """回测工作线程"""
    record_generated = pyqtSignal(dict)  # 每期结果信号
    finished_signal = pyqtSignal(str)    # 完成信号
    error_signal = pyqtSignal(str)       # 错误信号

    def __init__(self, params, data_list, my_numbers):
        super().__init__()
        self.params = params
        self.data_list = data_list
        self.my_numbers = my_numbers
        self.is_running = True

    def run(self):
        try:
            # 初始参数
            current_unit_bet = self.params['unit_bet']
            base_unit_bet = current_unit_bet
            payout_rate = self.params['payout_rate']
            
            # 策略参数
            increase_rate = self.params['increase_rate']
            increase_fixed = self.params['increase_fixed']
            decrease_rate = self.params['decrease_rate']
            
            # 止盈止损
            enable_take_profit = self.params['enable_take_profit']
            take_profit_val = self.params['take_profit_val']
            enable_stop_loss = self.params['enable_stop_loss']
            enable_stop_loss = self.params['enable_stop_loss']
            stop_loss_val = self.params['stop_loss_val']
            
            # 最高单注限制
            enable_max_bet_limit = self.params.get('enable_max_bet_limit', True)
            max_unit_bet_val = self.params.get('max_unit_bet_val', 10.0)
            
            total_profit = 0
            win_count = 0
            total_profit = 0
            win_count = 0
            
            # 极值统计
            max_bet = 0
            max_bet_issue = ""
            max_profit = 0
            max_profit_issue = ""
            min_profit = 0
            min_profit_issue = ""
            
            stop_reason = ""
            
            report = f"=== 回测报告 (最近 {len(self.data_list)} 期) ===\n"
            report += f"号码数量: {len(self.my_numbers)}\n"
            report += f"初始单注: {base_unit_bet:.2f}\n"
            report += f"策略: 输增{increase_rate*100:.0f}%+{increase_fixed}, 赢减{decrease_rate*100:.0f}%\n\n"
            
            for i, data in enumerate(self.data_list):
                if not self.is_running:
                    stop_reason = "用户停止"
                    break
                    
                draw_code = data.get('number_overt', '').replace(',', '')
                if not draw_code:
                    continue
                    
                # 计算本期投入
                total_bet_per_round = len(self.my_numbers) * current_unit_bet
                
                # 更新最高投注
                if total_bet_per_round > max_bet:
                    max_bet = total_bet_per_round
                    max_bet_issue = data.get('period_no', '')
                
                is_win = draw_code in self.my_numbers
                profit = -total_bet_per_round
                
                if is_win:
                    win_count += 1
                    profit += current_unit_bet * payout_rate
                    
                total_profit += profit
                
                # 更新极值 (单期)
                if profit > max_profit:
                    max_profit = profit
                    max_profit_issue = data.get('period_no', '')
                if profit < min_profit:
                    min_profit = profit
                    min_profit_issue = data.get('period_no', '')
                
                # 发送实时记录
                record = {
                    'period': data.get('period_no', ''),
                    'draw_time': data.get('overt_at', ''),
                    'draw_code': data.get('number_overt', ''),
                    'bet': total_bet_per_round,
                    'unit_bet': current_unit_bet,
                    'is_win': is_win,
                    'profit': profit,
                    'total_profit': total_profit,
                    'max_bet': max_bet,
                    'max_bet_issue': max_bet_issue,
                    'max_profit': max_profit,
                    'max_profit_issue': max_profit_issue,
                    'min_profit': min_profit,
                    'min_profit_issue': min_profit_issue
                }
                self.record_generated.emit(record)
                
                # 稍微延时以便UI刷新
                self.msleep(50)
                
                # 检查止盈止损
                if enable_take_profit and total_profit >= take_profit_val:
                    stop_reason = f"止盈触发 (+{total_profit:.2f})"
                    break
                if enable_stop_loss and total_profit <= stop_loss_val:
                    stop_reason = f"止损触发 ({total_profit:.2f})"
                    break
                    
                # 动态调整注码
                if is_win:
                    # 赢了：递减
                    current_unit_bet = current_unit_bet * (1 - decrease_rate)
                    if current_unit_bet < 0.1: current_unit_bet = 0.1
                else:
                    # 输了：递增
                    fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
                    fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
                    current_unit_bet = current_unit_bet * (1 + increase_rate) + fixed_per_code
                    
                    # 检查最高单注限制
                    if enable_max_bet_limit and current_unit_bet > max_unit_bet_val:
                        current_unit_bet = max_unit_bet_val
            
            # 生成最终报告
            processed_count = i + 1 if 'i' in locals() else 0
            win_rate = (win_count / processed_count) * 100 if processed_count > 0 else 0
            
            report += f"总盈利: {total_profit:.2f}\n"
            report += f"中奖期数: {win_count}/{processed_count}\n"
            report += f"胜率: {win_rate:.2f}%\n"
            report += f"单期最高投入: {max_bet:.0f} (第{max_bet_issue}期)\n"
            report += f"单期最高盈利: {max_profit:.2f} (第{max_profit_issue}期)\n"
            report += f"单期最大亏损: {min_profit:.2f} (第{min_profit_issue}期)\n"
            
            if stop_reason:
                report += f"\n[停止原因] {stop_reason}\n"
                
            self.finished_signal.emit(report)
            
        except Exception as e:
            self.error_signal.emit(str(e))

    def stop(self):
        self.is_running = False

class Canada28Simulator(QMainWindow):
    """Canada28 模拟器主窗口 (PyQt5版)"""
    
    def __init__(self):
        super().__init__()
        
        self.setWindowTitle("加拿大28自动化控制程序")
        self.resize(1400, 900)
        
        # 初始化数据管理器
        self.data_manager = CanadaDataManager()
        
        # 核心数据
        self.token = ""
        self.cookie = ""
        self.my_numbers = set()
        self.is_running = False
        self.last_bet_period = None # 记录上次下单或尝试下单的期号，防止重复弹窗
        self.real_bet_results = {}  # 存储从API获取的真实账单记录 {period_no: {data}}
        self.token_expired_logged = False # 标记是否已记录Token过期日志，防止重复提示
        
        # 初始化UI
        self.init_ui()
        
        # 定时器
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.on_timer_tick)
        self.timer.start(1000)  # 每秒触发
        
        # 自动登录检测定时器
        self.check_login_timer = QTimer(self)
        self.check_login_timer.timeout.connect(self.auto_check_token)
        # 启动时不立即开始检测，避免与启动时的验证冲突
        # self.check_login_timer.start(2000) 
        
        # 尝试加载缓存的Token
        self.load_token()
        
        # 加载配置 (自动导入上次号码)
        self.load_config()
        
        # 确保启动时按钮文字正确
        self.update_start_button_text()
        
        # 启动时立即刷新一次表格 (显示本地数据)
        self.update_history_table()
        
        # 验证Token并同步数据 (包含网络请求)
        if self.token:
            self.validate_token()
            
        # 计算并显示历史极值
        self.calculate_historical_extremes()
            
        # 连接参数变更信号 (用于记录日志)
        self.connect_parameter_signals()
            
        # 启动完成后开启自动检测
        self.check_login_timer.start(2000)
            
    def init_ui(self):
        """初始化界面布局"""
        # 主分割器 (左右布局)
        self.main_splitter = QSplitter(Qt.Horizontal)
        self.setCentralWidget(self.main_splitter)
        
        # === 左侧：浏览器面板 ===
        self.browser_panel = QWidget()
        self.browser_layout = QVBoxLayout(self.browser_panel)
        self.browser_layout.setContentsMargins(0, 0, 0, 0)
        
        # 浏览器控制栏
        browser_toolbar = QHBoxLayout()
        self.url_input = QLineEdit("http://s1.pk999p.xyz/")
        btn_go = QPushButton("前往")
        btn_go.clicked.connect(self.load_url)
        
        btn_refresh_page = QPushButton("刷新页面")
        btn_refresh_page.clicked.connect(lambda: self.browser.reload())
        # btn_extract = QPushButton("🔑 提取Token")
        # btn_extract.clicked.connect(self.extract_token)
        self.btn_hide_browser = QPushButton("◀ 收起")
        self.btn_hide_browser.clicked.connect(self.toggle_browser)
        
        browser_toolbar.addWidget(QLabel("网址:"))
        browser_toolbar.addWidget(self.url_input)
        browser_toolbar.addWidget(btn_go)
        browser_toolbar.addWidget(btn_refresh_page)
        # browser_toolbar.addWidget(btn_extract)
        browser_toolbar.addWidget(self.btn_hide_browser)
        
        # 显示控制面板按钮 (默认隐藏)
        self.btn_show_simulator = QPushButton("▶ 显示控制面板")
        self.btn_show_simulator.clicked.connect(self.toggle_simulator)
        self.btn_show_simulator.setVisible(False)
        browser_toolbar.addWidget(self.btn_show_simulator)
        
        self.browser_layout.addLayout(browser_toolbar)
        
        # 浏览器控件
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("http://s1.pk999p.xyz/"))
        self.browser_layout.addWidget(self.browser)
        
        self.main_splitter.addWidget(self.browser_panel)
        
        # === 右侧：模拟器面板 ===
        self.simulator_panel = QWidget()
        self.simulator_layout = QVBoxLayout(self.simulator_panel)
        
        # 1. 顶部状态栏
        self.create_status_bar()
        
        # 2. 中间控制区 (Tab页)
        self.create_control_tabs()
        
        # 3. 底部历史记录
        self.create_history_table()
        
        self.main_splitter.addWidget(self.simulator_panel)
        
        # 设置初始比例 (浏览器:模拟器 = 1:1)
        self.main_splitter.setSizes([600, 800])
        
    def create_status_bar(self):
        """创建顶部状态栏"""
        status_group = QGroupBox("当前状态")
        layout = QHBoxLayout()
        
        # 登录状态
        self.lbl_login_status = QLabel("未登录")
        self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
        layout.addWidget(QLabel("登录状态:"))
        layout.addWidget(self.lbl_login_status)
        
        # 资金信息
        layout.addSpacing(20)
        layout.addWidget(QLabel("当前余额:"))
        self.lbl_balance = QLabel("0.00")
        self.lbl_balance.setStyleSheet("color: blue; font-weight: bold; font-size: 14px;")
        layout.addWidget(self.lbl_balance)
        
        layout.addSpacing(20)
        layout.addWidget(QLabel("账户盈亏:"))
        self.lbl_real_profit_header = QLabel("--")
        self.lbl_real_profit_header.setStyleSheet("color: green; font-weight: bold; font-size: 14px;")
        layout.addWidget(self.lbl_real_profit_header)
        
        layout.addStretch()
        
        # 展开浏览器按钮 (默认隐藏，当浏览器收起时显示)
        self.btn_show_browser = QPushButton("▶ 显示浏览器")
        self.btn_show_browser.clicked.connect(self.toggle_browser)
        self.btn_show_browser.setVisible(False)
        layout.addWidget(self.btn_show_browser)
        
        # 隐藏控制面板按钮
        self.btn_hide_simulator = QPushButton("◀ 隐藏控制面板")
        self.btn_hide_simulator.clicked.connect(self.toggle_simulator)
        layout.addWidget(self.btn_hide_simulator)
        
        status_group.setLayout(layout)
        self.simulator_layout.addWidget(status_group)
        
    def create_control_tabs(self):
        """创建控制选项卡"""
        tabs = QTabWidget()
        
        # Tab 1: 运行控制
        tab_run = QWidget()
        run_layout = QVBoxLayout(tab_run)
        
        # 开奖信息
        draw_group = QGroupBox("实时开奖")
        draw_layout = QHBoxLayout()
        
        self.lbl_current_issue = QLabel("--")
        self.lbl_draw_result = QLabel("--")
        self.lbl_draw_result.setStyleSheet("font-size: 18px; color: red; font-weight: bold;")
        self.lbl_countdown = QLabel("--")
        self.lbl_countdown.setStyleSheet("font-size: 16px; color: orange; font-weight: bold;")
        
        draw_layout.addWidget(QLabel("上期期号:"))
        draw_layout.addWidget(self.lbl_current_issue)
        draw_layout.addSpacing(20)
        draw_layout.addWidget(QLabel("开奖号码:"))
        draw_layout.addWidget(self.lbl_draw_result)
        draw_layout.addSpacing(20)
        self.lbl_timer_title = QLabel("倒计时:")
        draw_layout.addWidget(self.lbl_timer_title)
        draw_layout.addWidget(self.lbl_countdown)
        draw_layout.addStretch()
        
        btn_refresh = QPushButton("刷新数据")
        btn_refresh.clicked.connect(self.refresh_data)
        draw_layout.addWidget(btn_refresh)
        
        draw_group.setLayout(draw_layout)
        run_layout.addWidget(draw_group)
        
        # 投注控制
        bet_group = QGroupBox("投注控制")
        bet_layout = QHBoxLayout()
        
        self.btn_start = QPushButton("开始模拟")
        self.btn_start.setCheckable(True)
        self.btn_start.clicked.connect(self.toggle_simulation)
        self.btn_start.setStyleSheet("background-color: #4CAF50; color: white; font-weight: bold; padding: 10px;")
        
        bet_layout.addWidget(self.btn_start)
        
        bet_group.setLayout(bet_layout)
        run_layout.addWidget(bet_group)
        
        # 真实投注控制
        real_bet_group = QGroupBox("真实投注 (慎用)")
        real_bet_layout = QVBoxLayout()
        
        # 第一行: 开启真实投注
        h1 = QHBoxLayout()
        self.chk_real_bet = QCheckBox("开启真实投注")
        self.chk_real_bet.setStyleSheet("color: red; font-weight: bold;")
        self.chk_real_bet.stateChanged.connect(self.update_start_button_text)
        h1.addWidget(self.chk_real_bet)
        h1.addStretch()
        real_bet_layout.addLayout(h1)
        
        # 第二行: 确认选项
        h2 = QHBoxLayout()
        self.chk_bet_confirm = QCheckBox("下单二次确认")
        self.chk_bet_confirm.setChecked(True)
        h2.addWidget(self.chk_bet_confirm)
        
        self.chk_first_confirm_only = QCheckBox("仅首次确认")
        self.chk_first_confirm_only.setChecked(False)
        self.chk_first_confirm_only.setToolTip("勾选后只在第一次下单时弹出确认框,后续自动下单")
        h2.addWidget(self.chk_first_confirm_only)
        h2.addStretch()
        real_bet_layout.addLayout(h2)
        
        real_bet_group.setLayout(real_bet_layout)
        run_layout.addWidget(real_bet_group)

        # 真实账单同步
        sync_group = QGroupBox("账单同步")
        sync_layout = QHBoxLayout()
        
        self.btn_sync_profit = QPushButton("同步真实盈亏")
        self.btn_sync_profit.clicked.connect(self.fetch_real_account_history)
        sync_layout.addWidget(self.btn_sync_profit)
        
        self.lbl_real_profit = QLabel("真实账户盈亏: --")
        self.lbl_real_profit.setStyleSheet("font-weight: bold; color: blue;")
        sync_layout.addWidget(self.lbl_real_profit)
        
        sync_layout.addStretch()
        sync_group.setLayout(sync_layout)
        run_layout.addWidget(sync_group)
        
        # 运行日志
        run_layout.addWidget(QLabel("运行日志:"))
        self.txt_run_log = QTextEdit()
        self.txt_run_log.setReadOnly(True)
        run_layout.addWidget(self.txt_run_log)
        
        # run_layout.addStretch()
        tabs.addTab(tab_run, "运行控制")
        
        # Tab 2: 号码导入
        tab_import = QWidget()
        import_layout = QVBoxLayout(tab_import)
        
        btn_layout = QHBoxLayout()
        btn_import_txt = QPushButton("从TXT导入")
        btn_import_txt.clicked.connect(self.import_from_txt)
        btn_import_excel = QPushButton("从Excel导入")
        btn_import_excel.clicked.connect(self.import_from_excel)
        
        btn_layout.addWidget(btn_import_txt)
        btn_layout.addWidget(btn_import_excel)
        
        # 导出热门组合按钮
        btn_export_top = QPushButton("导出热门组合")
        btn_export_top.clicked.connect(self.export_top_combinations_ui)
        btn_layout.addWidget(btn_export_top)
        
        btn_layout.addStretch()
        
        import_layout.addLayout(btn_layout)
        
        self.lbl_numbers_count = QLabel("当前已导入号码: 0 个")
        import_layout.addWidget(self.lbl_numbers_count)
        
        self.txt_numbers_preview = QTextEdit()
        self.txt_numbers_preview.setReadOnly(False) # 允许编辑
        self.txt_numbers_preview.setPlaceholderText("在此处输入号码，支持逗号、空格或换行分隔。\n例如: 001, 002, 003")
        import_layout.addWidget(self.txt_numbers_preview)
        
        btn_update_numbers = QPushButton("更新/保存号码列表")
        btn_update_numbers.clicked.connect(self.parse_numbers_from_text)
        import_layout.addWidget(btn_update_numbers)
        
        tabs.addTab(tab_import, "号码管理")
        
        # Tab 3: 历史回测
        tab_backtest = QWidget()
        backtest_layout = QVBoxLayout(tab_backtest)
        
        # 回测控制
        bt_ctrl_layout = QHBoxLayout()
        bt_ctrl_layout.addWidget(QLabel("回测期数:"))
        self.spin_backtest_count = QSpinBox()
        self.spin_backtest_count.setRange(10, 1000)
        self.spin_backtest_count.setValue(100)
        bt_ctrl_layout.addWidget(self.spin_backtest_count)
        
        self.btn_backtest = QPushButton("开始回测")
        self.btn_backtest.clicked.connect(self.start_backtest)
        bt_ctrl_layout.addWidget(self.btn_backtest)
        
        self.btn_export_backtest = QPushButton("导出记录")
        self.btn_export_backtest.clicked.connect(self.export_backtest_data)
        self.btn_export_backtest.setEnabled(False)
        bt_ctrl_layout.addWidget(self.btn_export_backtest)
        
        self.btn_restore_view = QPushButton("返回实时视图")
        self.btn_restore_view.clicked.connect(self.restore_realtime_view)
        self.btn_restore_view.setEnabled(False)
        bt_ctrl_layout.addWidget(self.btn_restore_view)
        
        bt_ctrl_layout.addStretch()
        
        backtest_layout.addLayout(bt_ctrl_layout)
        
        # 回测结果
        self.txt_backtest_result = QTextEdit()
        self.txt_backtest_result.setReadOnly(True)
        backtest_layout.addWidget(self.txt_backtest_result)
        
        tabs.addTab(tab_backtest, "历史回测")
        
        # Tab 4: 参数设置
        tab_settings = QWidget()
        settings_layout = QVBoxLayout(tab_settings)
        
        # 基础设置
        grp_basic = QGroupBox("基础设置")
        layout_basic = QVBoxLayout()
        
        # 赔率
        h1 = QHBoxLayout()
        h1.addWidget(QLabel("中奖赔率:"))
        self.spin_payout = QDoubleSpinBox()
        self.spin_payout.setRange(0, 10000)
        self.spin_payout.setValue(995.0)
        h1.addWidget(self.spin_payout)
        layout_basic.addLayout(h1)
        
        # 单注金额
        h2 = QHBoxLayout()
        h2.addWidget(QLabel("初始单注:"))
        self.spin_unit_bet = QDoubleSpinBox()
        self.spin_unit_bet.setRange(0.1, 10000)
        self.spin_unit_bet.setSingleStep(0.1)
        self.spin_unit_bet.setValue(0.1)
        h2.addWidget(self.spin_unit_bet)
        layout_basic.addLayout(h2)
        
        # 最高单注限制
        h3 = QHBoxLayout()
        self.chk_max_unit_bet = QCheckBox("启用最高单注限制:")
        self.chk_max_unit_bet.setChecked(True)
        h3.addWidget(self.chk_max_unit_bet)
        
        self.spin_max_unit_bet = QDoubleSpinBox()
        self.spin_max_unit_bet.setRange(0.1, 100000)
        self.spin_max_unit_bet.setSingleStep(0.1)  # 支持0.1步进
        self.spin_max_unit_bet.setValue(10.0)
        h3.addWidget(self.spin_max_unit_bet)
        layout_basic.addLayout(h3)
        
        # 余额保护
        h4 = QHBoxLayout()
        self.chk_low_balance = QCheckBox("余额低于此值停止:")
        h4.addWidget(self.chk_low_balance)
        
        self.spin_low_balance = QDoubleSpinBox()
        self.spin_low_balance.setRange(0, 1000000)
        self.spin_low_balance.setValue(500.0)
        h4.addWidget(self.spin_low_balance)
        layout_basic.addLayout(h4)
        
        grp_basic.setLayout(layout_basic)
        settings_layout.addWidget(grp_basic)
        
        # 动态策略
        grp_strategy = QGroupBox("动态策略 (对冲)")
        layout_strategy = QVBoxLayout()
        
        # 输了递增
        h3 = QHBoxLayout()
        h3.addWidget(QLabel("输-递增比例(%):"))
        self.spin_increase_rate = QDoubleSpinBox()
        self.spin_increase_rate.setRange(0, 100)
        self.spin_increase_rate.setValue(2.0)
        h3.addWidget(self.spin_increase_rate)
        
        h3.addWidget(QLabel("输-固定增加:"))
        self.spin_increase_fixed = QDoubleSpinBox()
        self.spin_increase_fixed.setRange(0, 1000)
        self.spin_increase_fixed.setValue(20.0)
        h3.addWidget(self.spin_increase_fixed)
        layout_strategy.addLayout(h3)
        
        # 赢了递减
        h4 = QHBoxLayout()
        h4.addWidget(QLabel("赢-递减比例(%):"))
        self.spin_decrease_rate = QDoubleSpinBox()
        self.spin_decrease_rate.setRange(0, 100)
        self.spin_decrease_rate.setValue(2.0)
        h4.addWidget(self.spin_decrease_rate)
        layout_strategy.addLayout(h4)
        
        grp_strategy.setLayout(layout_strategy)
        settings_layout.addWidget(grp_strategy)
        
        # 止盈止损
        grp_stop = QGroupBox("止盈止损")
        layout_stop = QVBoxLayout()
        
        self.chk_take_profit = QCheckBox("启用止盈")
        layout_stop.addWidget(self.chk_take_profit)
        h5 = QHBoxLayout()
        h5.addWidget(QLabel("止盈金额:"))
        self.spin_take_profit = QDoubleSpinBox()
        self.spin_take_profit.setRange(0, 1000000)
        self.spin_take_profit.setValue(2000.0)
        h5.addWidget(self.spin_take_profit)
        layout_stop.addLayout(h5)
        
        self.chk_stop_loss = QCheckBox("启用止损")
        layout_stop.addWidget(self.chk_stop_loss)
        h6 = QHBoxLayout()
        h6.addWidget(QLabel("止损金额:"))
        self.spin_stop_loss = QDoubleSpinBox()
        self.spin_stop_loss.setRange(-1000000, 0)
        self.spin_stop_loss.setValue(-5000.0)
        h6.addWidget(self.spin_stop_loss)
        layout_stop.addLayout(h6)
        
        grp_stop.setLayout(layout_stop)
        settings_layout.addWidget(grp_stop)
        
        settings_layout.addStretch()
        tabs.addTab(tab_settings, "参数设置")
        
        # Tab 5: 盈亏图表
        tab_chart = QWidget()
        chart_layout = QVBoxLayout(tab_chart)
        
        self.figure = Figure(figsize=(5, 4), dpi=100)
        self.canvas = FigureCanvas(self.figure)
        self.ax = self.figure.add_subplot(111)
        self.ax.set_title("累计盈亏走势")
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("金额")
        self.ax.grid(True)
        
        chart_layout.addWidget(self.canvas)
        tabs.addTab(tab_chart, "盈亏图表")
        
        self.simulator_layout.addWidget(tabs)
        
        # 极值统计面板 (插入到Tab下方)
        self.create_stats_panel()

    def create_stats_panel(self):
        """创建极值统计面板"""
        group = QGroupBox("极值统计")
        layout = QHBoxLayout()
        
        # 最高投注
        layout.addWidget(QLabel("最高投注:"))
        self.lbl_max_bet = QLabel("0")
        self.lbl_max_bet.setStyleSheet("color: purple; font-weight: bold;")
        layout.addWidget(self.lbl_max_bet)
        
        layout.addSpacing(20)
        
        # 最高盈利
        layout.addWidget(QLabel("最高盈利:"))
        self.lbl_max_profit = QLabel("0")
        self.lbl_max_profit.setStyleSheet("color: green; font-weight: bold;")
        layout.addWidget(self.lbl_max_profit)
        
        layout.addSpacing(20)
        
        # 最大亏损
        layout.addWidget(QLabel("最大亏损:"))
        self.lbl_min_profit = QLabel("0")
        self.lbl_min_profit.setStyleSheet("color: red; font-weight: bold;")
        layout.addWidget(self.lbl_min_profit)
        
        layout.addStretch()
        group.setLayout(layout)
        self.simulator_layout.addWidget(group)
        
    def create_history_table(self):
        """创建历史记录表格"""
        group = QGroupBox("历史记录")
        layout = QVBoxLayout()
        
        # 添加说明标签
        info_label = QLabel("📊 表格显示最近50期投注记录 | 真实账户总盈亏请查看上方\"账单同步\"区域")
        info_label.setStyleSheet("color: #666; font-size: 11px; padding: 5px;")
        layout.addWidget(info_label)
        
        self.table = QTableWidget()
        self.table.setColumnCount(8)
        self.table.setHorizontalHeaderLabels(["期号", "时间", "开奖号码", "投入", "单注", "结果", "盈亏", "累计盈亏"])
        
        # 允许水平滚动和手动调整列宽
        self.table.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Interactive)
        self.table.horizontalHeader().setStretchLastSection(True)
        
        # 调整列宽：开奖号码列设小一点
        self.table.setColumnWidth(2, 80)
        
        self.table.cellClicked.connect(self.on_table_cell_clicked) # 连接点击事件
        
        layout.addWidget(self.table)
        group.setLayout(layout)
        self.simulator_layout.addWidget(group)
        
    # === 浏览器相关功能 ===
    
    def load_url(self):
        url = self.url_input.text()
        if not url.startswith('http'):
            url = 'https://' + url
        self.browser.setUrl(QUrl(url))

    def get_config_path(self, filename):
        """获取配置文件的绝对路径"""
        # 获取脚本所在目录
        script_dir = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(script_dir, filename)

    def load_token(self):
        """加载缓存的Token"""
        token_path = self.get_config_path("token.json")
        if os.path.exists(token_path):
            try:
                with open(token_path, "r") as f:
                    data = json.load(f)
                    self.token = data.get("token", "")
                    self.cookie = data.get("cookie", "")
                    
                    if self.token:
                        print("📦 发现缓存Token")
            except Exception as e:
                print(f"❌ 加载Token失败: {e}")

    def save_token(self):
        """保存Token到本地"""
        try:
            token_path = self.get_config_path("token.json")
            with open(token_path, "w") as f:
                json.dump({"token": self.token, "cookie": self.cookie}, f)
            print("💾 Token已保存")
        except Exception as e:
            print(f"❌ 保存Token失败: {e}")

    def load_config(self):
        """加载配置 (上次导入的文件)"""
        config_path = self.get_config_path("config.json")
        if os.path.exists(config_path):
            try:
                with open(config_path, "r") as f:
                    config = json.load(f)
                    self.last_numbers_file = config.get("last_numbers_file", "")
                    
                    if self.last_numbers_file and os.path.exists(self.last_numbers_file):
                        print(f"📂 发现上次导入文件: {self.last_numbers_file}")
                        if self.last_numbers_file.endswith('.xlsx') or self.last_numbers_file.endswith('.xls'):
                            self.import_from_excel(self.last_numbers_file, silent=True)
                        else:
                            self.import_from_txt(self.last_numbers_file, silent=True)
            except Exception as e:
                print(f"❌ 加载配置失败: {e}")

    def save_config(self):
        """保存配置"""
        try:
            config = {"last_numbers_file": self.last_numbers_file}
            config_path = self.get_config_path("config.json")
            with open(config_path, "w") as f:
                json.dump(config, f)
            print("💾 配置已保存")
        except Exception as e:
            print(f"❌ 保存配置失败: {e}")



    def validate_token(self):
        """验证Token有效性"""
        self.data_manager.set_auth(self.token, self.cookie)
        
        # 按照用户要求：尝试请求一次历史记录来验证
        print("🔍 正在通过请求历史数据验证Token...")
        # 注意：这里需要在非UI线程请求，或者简单的阻塞请求（启动时可以接受）
        # 为了简单，这里直接调用同步方法，因为是在启动时
        remote_latest = self.data_manager.get_remote_latest()
        
        if remote_latest:
            print("✅ Token验证成功 (历史数据请求成功)")
            self.lbl_login_status.setText("已登录 (缓存)")
            self.lbl_login_status.setStyleSheet("color: green; font-weight: bold;")
            
            # 自动收起浏览器 (因为已经登录了)
            if self.browser_panel.isVisible():
                self.toggle_browser()
                
                # 注入到浏览器 (回显) - 已移除
                # self.inject_token_to_browser()
            
            # 同步数据
            self.refresh_data()
            # 刷新表格 (显示同步后的最新数据)
            self.update_history_table()
            # 自动同步真实账户盈亏
            self.fetch_real_account_history()
        else:
            print("⚠️ Token已过期或无效 (历史数据请求失败)")
            self.lbl_login_status.setText("Token过期")
            self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
            # 确保浏览器显示以便用户重新登录
            if not self.browser_panel.isVisible():
                self.toggle_browser()


        
    def toggle_browser(self):
        """切换浏览器显示/隐藏"""
        if self.browser_panel.isVisible():
            # 准备隐藏浏览器：检查模拟器是否可见
            if not self.simulator_panel.isVisible():
                # 如果控制面板也是隐藏的，强制显示控制面板
                self.simulator_panel.setVisible(True)
                self.btn_show_simulator.setVisible(False)
                QMessageBox.warning(self, "提示", "不能同时隐藏两个面板，已自动显示控制面板。")

            self.browser_panel.setVisible(False)
            self.btn_show_browser.setVisible(True)
            self.check_login_timer.stop() # 停止检测
        else:
            self.browser_panel.setVisible(True)
            self.btn_show_browser.setVisible(False)
            # 恢复分割器比例
            self.main_splitter.setSizes([600, 800])
            self.check_login_timer.start(2000) # 每2秒检测一次

    def toggle_simulator(self):
        """切换控制面板显示/隐藏"""
        if self.simulator_panel.isVisible():
            # 准备隐藏模拟器：检查浏览器是否可见
            if not self.browser_panel.isVisible():
                # 如果浏览器也是隐藏的，强制显示浏览器
                self.browser_panel.setVisible(True)
                self.btn_show_browser.setVisible(False)
                self.check_login_timer.start(2000)
                QMessageBox.warning(self, "提示", "不能同时隐藏两个面板，已自动显示浏览器。")
            
            self.simulator_panel.setVisible(False)
            self.btn_show_simulator.setVisible(True)
        else:
            self.simulator_panel.setVisible(True)
            self.btn_show_simulator.setVisible(False)

    def auto_check_token(self):
        """自动检测Token (静默模式)"""
        # 如果已经登录，就不频繁检测了，或者可以继续检测以防Token过期/切换账号
        # 这里我们选择继续检测，但只有在Token变化时才提示
        self.extract_token(silent=True)

    def extract_token(self, silent=False):
        """提取Token逻辑 (复用token_extractor.py的JS代码)"""
        self._is_silent_extract = silent # 标记是否为静默提取
        js_code = """
        (function() {
            var result = {
                token: '',
                cookies: ''
            };
            try { result.cookies = document.cookie; } catch(e) {}
            try { result.token = localStorage.getItem('token') || ''; } catch(e) {}
            if (!result.token) {
                try { result.token = sessionStorage.getItem('token') || ''; } catch(e) {}
            }
            if (!result.token && typeof window.token !== 'undefined') {
                result.token = window.token;
            }
            return JSON.stringify(result);
        })();
        """
        self.browser.page().runJavaScript(js_code, self.on_token_extracted)
        
    def on_token_extracted(self, result_json):
        try:
            result = json.loads(result_json)
            token = result.get('token', '')
            cookie = result.get('cookies', '')
            
            if token:
                # 如果Token发生变化，或者之前未登录
                if token != self.token:
                    self.token = token
                    self.cookie = cookie
                    self.token_expired_logged = False # 重置过期日志标记
                    self.lbl_login_status.setText("已登录")
                    self.lbl_login_status.setStyleSheet("color: green; font-weight: bold;")
                    
                    # 设置给数据管理器
                    self.data_manager.set_auth(token, cookie)
                    
                    # 保存Token
                    self.save_token()
                    
                    if not getattr(self, '_is_silent_extract', False):
                        QMessageBox.information(self, "成功", "Token提取成功！")
                        # 登录成功后，自动同步真实账户历史 (延迟1秒等待状态稳定)
                        QTimer.singleShot(1000, self.fetch_real_account_history)
                    else:
                        # 自动登录成功，在状态栏显示提示
                        print("✅ 自动检测到Token，登录成功")
                        # 静默模式下也同步
                        self.fetch_real_account_history()
                    
                    # 开始同步数据
                    self.refresh_data()
            else:
                if not getattr(self, '_is_silent_extract', False):
                    QMessageBox.warning(self, "失败", "未找到Token，请先登录！")
                
        except Exception as e:
            if not getattr(self, '_is_silent_extract', False):
                QMessageBox.critical(self, "错误", f"解析Token失败: {str(e)}")

    # === 模拟器功能 ===
    
    def import_from_txt(self, filepath=None, silent=False):
        """从TXT导入号码
        
        Args:
            filepath: 文件路径,如果为None则弹出文件选择对话框
            silent: 是否静默导入(不显示弹窗提示)
        """
        if not filepath:
            filepath, _ = QFileDialog.getOpenFileName(self, "选择TXT文件", "", "Text Files (*.txt)")
            
        if filepath:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # 替换常见分隔符为逗号
                content = content.replace('\n', ',').replace(' ', ',').replace('，', ',')
                parts = content.split(',')
                
                numbers = []
                for p in parts:
                    p = p.strip()
                    if p.isdigit():
                        # 用户要求：必须是三位数，不支持自动补全
                        if len(p) == 3:
                            numbers.append(p)
                
                if not numbers:
                    if not silent:
                        QMessageBox.warning(self, "警告", "文件中没有找到有效的3位数字号码!")
                    return

                self.my_numbers = set(numbers)
                self.update_numbers_display()
                
                # 保存配置
                self.last_numbers_file = filepath
                self.save_config()
                
                if not silent:
                    QMessageBox.information(self, "成功", f"导入了 {len(numbers)} 个号码")
            except Exception as e:
                QMessageBox.critical(self, "错误", f"导入失败: {e}")

    def import_from_excel(self, filepath=None, silent=False):
        """从Excel导入号码
        
        Args:
            filepath: 文件路径,如果为None则弹出文件选择对话框
            silent: 是否静默导入(不显示弹窗提示)
        """
        if not filepath:
            filepath, _ = QFileDialog.getOpenFileName(self, "选择Excel文件", "", "Excel Files (*.xlsx *.xls)")
            
        if filepath:
            try:
                import pandas as pd
                df = pd.read_excel(filepath, header=None) # 假设无表头
                numbers = []
                
                # 尝试遍历所有单元格查找3位数字
                for col in df.columns:
                    for val in df[col]:
                        val_str = str(val).strip().replace(',', '').replace('.0', '')
                        if len(val_str) == 3 and val_str.isdigit():
                            numbers.append(val_str)
                
                if not numbers:
                    if not silent:
                        QMessageBox.warning(self, "警告", "文件中没有找到有效的3位数字号码!")
                    return

                self.my_numbers = set(numbers)
                self.update_numbers_display()
                
                # 保存配置
                self.last_numbers_file = filepath
                self.save_config()
                
                if not silent:
                    QMessageBox.information(self, "成功", f"导入了 {len(numbers)} 个号码")
            except Exception as e:
                if not silent:
                    QMessageBox.warning(self, "错误", f"导入失败: {e}")
        
    def parse_numbers_from_text(self):
        """从文本框解析号码"""
        text = self.txt_numbers_preview.toPlainText()
        # 替换常见分隔符为逗号
        text = text.replace('\n', ',').replace(' ', ',').replace('，', ',')
        parts = text.split(',')
        
        numbers = []
        for p in parts:
            p = p.strip()
            if p.isdigit() and len(p) == 3:
                numbers.append(p)
                
        if not numbers:
            QMessageBox.warning(self, "警告", "未找到有效的3位数字号码！")
            return
            
        self.my_numbers = set(numbers)
        self.update_numbers_display()
        QMessageBox.information(self, "成功", f"已更新号码列表，共 {len(numbers)} 个")

    def export_top_combinations_ui(self):
        """导出热门组合UI"""
        # 1. 输入导出数量
        count, ok = QInputDialog.getInt(self, "导出热门组合", 
                                      "请输入要导出的组合数量 (Top N):", 
                                      875, 1, 10000, 1)
        if not ok:
            return
            
        # 2. 选择保存路径
        filepath, _ = QFileDialog.getSaveFileName(self, "保存热门组合", 
                                                f"top_{count}_combinations.txt", 
                                                "Text Files (*.txt)")
        if not filepath:
            return
            
        # 3. 调用生成脚本
        try:
            # 动态导入以避免循环依赖或启动加载
            import generate_top_combinations
            
            success, msg = generate_top_combinations.export_top_combinations(filepath, count)
            
            if success:
                QMessageBox.information(self, "成功", msg)
                # 询问是否立即导入
                reply = QMessageBox.question(self, "导入", "是否立即导入这些号码到模拟器？",
                                           QMessageBox.Yes | QMessageBox.No)
                if reply == QMessageBox.Yes:
                    self.import_from_txt(filepath)
            else:
                QMessageBox.critical(self, "失败", msg)
                
        except Exception as e:
            QMessageBox.critical(self, "错误", f"执行失败: {e}")

    def place_real_bet(self, period, unit_bet):
        """执行真实投注"""
        if not self.my_numbers:
            return
            
        # 防止同一期重复下单/弹窗
        if self.last_bet_period == period:
            return
        self.last_bet_period = period
            
        # 构造 o_datas
        # 格式: 16:号码:金额,16:号码:金额
        o_datas_list = []
        for num in self.my_numbers:
            o_datas_list.append(f"16:{num}:{unit_bet}")
        o_datas = ",".join(o_datas_list)
        
        total_money = len(self.my_numbers) * unit_bet
        
        # 二次确认逻辑
        need_confirm = False
        
        if self.chk_bet_confirm.isChecked():
            # 如果开启了"仅首次确认"
            if self.chk_first_confirm_only.isChecked():
                # 检查是否是首次确认
                if not hasattr(self, 'first_bet_confirmed') or not self.first_bet_confirmed:
                    need_confirm = True
                    self.first_bet_confirmed = True  # 标记已确认
            else:
                # 每次都需要确认
                need_confirm = True
        
        # 如果需要确认,弹出对话框
        if need_confirm:
            reply = QMessageBox.question(self, "下单确认", 
                                       f"即将进行真实投注！\n\n"
                                       f"期号: {period}\n"
                                       f"号码数: {len(self.my_numbers)}\n"
                                       f"单注金额: {unit_bet}\n"
                                       f"总金额: {total_money:.2f}\n\n"
                                       f"确定要下单吗？",
                                       QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
            if reply == QMessageBox.No:
                self.log_run("🚫 用户取消下单，自动停止模拟")
                # 先更新按钮状态为未选中
                self.btn_start.setChecked(False)
                # 然后停止任务 (toggle_simulation会根据isChecked()更新按钮文字)
                if self.is_running:
                    self.is_running = False
                    self.update_start_button_text()
                return

        # 发送请求
        try:
            url = "http://s1.pk999p.xyz/index.php/Orders/COrders"
            data = {
                "type": "import",
                "game_id": "2",
                "period_no": period,
                "t_datas": "16",
                "o_datas": o_datas,
                "position": "txt导入"
            }
            
            # 使用 data_manager 的 session 发送请求 (带 cookie/token)
            # 这里我们直接用 requests，因为 data_manager 主要负责数据获取
            # 但我们需要 headers
            headers = {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "token": self.token,
                "Cookie": self.cookie
            }
            
            self.log_run(f"🚀 发送下单请求: 期号={period}, 总额={total_money}")
            response = requests.post(url, data=data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                res_json = response.json()
                code = res_json.get("code")
                
                if code == 0:
                    self.log_run(f"✅ 下单成功: {res_json.get('msg')}")
                    self.statusBar().showMessage(f"✅ 第{period}期下单成功! 总额: {total_money}", 5000)
                elif code == 9:
                    # 余额不足
                    self.log_run(f"❌ 信用余额不足，停止自动投注！")
                    QMessageBox.critical(self, "余额不足", "信用余额不足，自动投注已停止！")
                    self.toggle_simulation() # 停止
                else:
                    self.log_run(f"❌ 下单失败: {res_json.get('msg')}")
                    QMessageBox.warning(self, "下单失败", f"API返回错误: {res_json.get('msg')}")
            else:
                self.log_run(f"❌ 下单请求失败: HTTP {response.status_code}")
                QMessageBox.warning(self, "网络错误", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_run(f"❌ 下单异常: {e}")
            QMessageBox.critical(self, "下单异常", str(e))

            print(f"❌ 下单异常: {e}")
            QMessageBox.critical(self, "下单异常", str(e))

    def fetch_real_account_history(self):
        """同步真实账户历史盈亏"""
        self.log_run("🔄 开始同步真实账户历史账单...")
        self.btn_sync_profit.setEnabled(False)
        self.btn_sync_profit.setText("同步中...")
        
        # 使用 QThread 或简单的 processEvents 避免界面卡死
        # 这里简单起见，使用 processEvents
        from PyQt5.QtWidgets import QApplication
        
        total_profit = 0.0
        page = 1
        limit = 50 # 尝试每页多取一点
        
        try:
            while True:
                url = f"http://s1.pk999p.xyz/index.php/Reports/LPeriod?game_id=2&page={page}&limit={limit}"
                headers = {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                    "X-Requested-With": "XMLHttpRequest",
                    "token": self.token,
                    "Cookie": self.cookie
                }
                
                self.log_run(f"📡 请求第 {page} 页数据...")
                QApplication.processEvents() # 刷新界面
                
                response = requests.get(url, headers=headers, timeout=10)
                if response.status_code != 200:
                    self.log_run(f"❌ 请求失败: HTTP {response.status_code}")
                    break
                    
                res_json = response.json()
                if res_json.get("code") != 0:
                    self.log_run(f"❌ API错误: {res_json.get('msg')}")
                    break
                    
                data_list = res_json.get("data", [])
                last_page = res_json.get("last_page", 1)
                
                # 累加盈亏并存储记录
                page_profit = 0.0
                for item in data_list:
                    p_no = str(item.get("period_no"))
                    # 存储到真实账单字典，供表格显示
                    if p_no not in self.real_bet_results:
                        self.real_bet_results[p_no] = {
                            'total_bet': float(item.get("bet", 0)),
                            'unit_bet': 0.0, # API没给单注，设为0
                            'win_amount': float(item.get("win_money", 0)),
                            'profit': float(item.get("profit_loss", 0)),
                            'total_profit': 0.0, # 累计盈亏由表格逻辑动态计算或显示--
                            'is_real': True
                        }
                    
                    # profit_loss 字段
                    pl = float(item.get("profit_loss", 0))
                    page_profit += pl
                    
                total_profit += page_profit
                
                if page >= last_page:
                    break
                    
                page += 1
                # 稍微延时避免请求过快
                # time.sleep(0.1) 
                
            # --- 新增：针对最近的期号获取详细明细以补全单注和投入 ---
            self.log_run("🔍 正在获取近期下单明细以补全数据...")
            import datetime
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            
            # 只处理最近的 20 期
            recent_periods = sorted(self.real_bet_results.keys(), reverse=True)[:20]
            for p_no in recent_periods:
                try:
                    detail_url = f"http://s1.pk999p.xyz/index.php/Orders/LOrder?game_id=2&date={today}&period_no={p_no}&status=0&order_no=&page=1&limit=50"
                    detail_res = requests.get(detail_url, headers=headers, timeout=5)
                    if detail_res.status_code == 200:
                        detail_json = detail_res.json()
                        if detail_json.get("code") == 0:
                            orders = detail_json.get("data", [])
                            if orders:
                                # 计算该期的总投入和平均单注（或者取第一个单注）
                                t_bet = 0.0
                                t_prize = 0.0
                                u_bet = 0.0
                                for o in orders:
                                    t_bet += float(o.get("CM", 0))
                                    t_prize += float(o.get("CM_prize", 0))
                                    if u_bet == 0: u_bet = float(o.get("CM", 0))
                                
                                # 更新到 real_bet_results
                                if p_no in self.real_bet_results:
                                    self.real_bet_results[p_no]['total_bet'] = t_bet
                                    self.real_bet_results[p_no]['unit_bet'] = u_bet
                                    self.real_bet_results[p_no]['win_amount'] = t_prize
                                    # 盈亏重新计算以防万一
                                    self.real_bet_results[p_no]['profit'] = t_prize - t_bet
                except:
                    continue
            # -------------------------------------------------------
            
            self.log_run(f"✅ 同步完成! 历史总盈亏: {total_profit:.2f}")
            self.lbl_real_profit.setText(f"真实账户盈亏: {total_profit:.2f}")
            
            # 同时更新头部显示
            self.lbl_real_profit_header.setText(f"{total_profit:.2f}")
            
            # 同步完成后刷新表格和图表
            self.update_history_table()
            self.update_chart()
            
            # 重新计算历史极值
            self.calculate_historical_extremes()
            
            # 根据盈亏设置颜色
            if total_profit > 0:
                self.lbl_real_profit.setStyleSheet("font-weight: bold; color: green;")
                self.lbl_real_profit_header.setStyleSheet("color: green; font-weight: bold; font-size: 14px;")
            elif total_profit < 0:
                self.lbl_real_profit.setStyleSheet("font-weight: bold; color: red;")
                self.lbl_real_profit_header.setStyleSheet("color: red; font-weight: bold; font-size: 14px;")
            else:
                self.lbl_real_profit.setStyleSheet("font-weight: bold; color: black;")
                self.lbl_real_profit_header.setStyleSheet("color: black; font-weight: bold; font-size: 14px;")
                
        except Exception as e:
            self.log_run(f"❌ 同步异常: {e}")
        finally:
            self.btn_sync_profit.setEnabled(True)
            self.btn_sync_profit.setText("同步真实盈亏")

    def update_numbers_display(self):
        self.lbl_numbers_count.setText(f"当前已导入号码: {len(self.my_numbers)} 个")
        self.txt_numbers_preview.setText(", ".join(sorted(self.my_numbers)))
        
    def log_run(self, message):
        """记录运行日志"""
        try:
            timestamp = datetime.now().strftime("%H:%M:%S")
            log_msg = f"[{timestamp}] {message}"
            if hasattr(self, 'txt_run_log'):
                self.txt_run_log.append(log_msg)
                # 滚动到底部
                self.txt_run_log.verticalScrollBar().setValue(self.txt_run_log.verticalScrollBar().maximum())
            print(log_msg)
        except Exception as e:
            print(f"Log Error: {e}")
    
    def calculate_historical_extremes(self):
        """从历史记录计算极值统计(单次极值,非累计)"""
        # 初始化极值变量
        self.max_bet_value = 0
        self.max_bet_period = ""
        self.max_profit_value = 0  # 最高单次盈利
        self.max_profit_period = ""
        self.min_profit_value = 0  # 最大单次亏损
        self.min_profit_period = ""
        
        # 合并真实投注和模拟投注记录
        all_records = {}
        
        if hasattr(self, 'bet_results'):
            all_records.update(self.bet_results)
        
        if hasattr(self, 'real_bet_results'):
            all_records.update(self.real_bet_results)
        
        if not all_records:
            return
        
        # 遍历所有记录,找出单次极值
        for period, record in all_records.items():
            # 更新最高单次投注
            total_bet = record.get('total_bet', record.get('bet', 0))
            if total_bet > self.max_bet_value:
                self.max_bet_value = total_bet
                self.max_bet_period = period
            
            # 单次盈亏
            profit = record.get('profit', 0)
            
            # 更新最高单次盈利
            if profit > self.max_profit_value:
                self.max_profit_value = profit
                self.max_profit_period = period
            
            # 更新最大单次亏损
            if profit < self.min_profit_value:
                self.min_profit_value = profit
                self.min_profit_period = period
        
        # 更新显示
        if self.max_bet_value > 0:
            self.lbl_max_bet.setText(f"{self.max_bet_value:.2f} (第{self.max_bet_period}期)")
        else:
            self.lbl_max_bet.setText("0")
        
        if self.max_profit_value > 0:
            self.lbl_max_profit.setText(f"{self.max_profit_value:.2f} (第{self.max_profit_period}期)")
        else:
            self.lbl_max_profit.setText("0")
        
        if self.min_profit_value < 0:
            self.lbl_min_profit.setText(f"{self.min_profit_value:.2f} (第{self.min_profit_period}期)")
        else:
            self.lbl_min_profit.setText("0")

    
    def connect_parameter_signals(self):
        """连接参数变更信号"""
        # 标记是否是初始化阶段 (避免启动时记录日志)
        self.param_initialized = False
        
        # === 基础参数 ===
        # 赔率
        self.spin_payout.valueChanged.connect(lambda v: self.on_param_changed("中奖赔率", v))
        
        # 单注金额
        self.spin_unit_bet.valueChanged.connect(lambda v: self.on_param_changed("初始单注", v))
        
        # 最高单注限制
        self.chk_max_unit_bet.stateChanged.connect(
            lambda s: self.on_param_changed("启用最高单注限制", "开启" if s else "关闭"))
        self.spin_max_unit_bet.valueChanged.connect(lambda v: self.on_param_changed("最高单注限制", v))
        
        # 余额保护
        self.chk_low_balance.stateChanged.connect(
            lambda s: self.on_param_changed("余额保护", "开启" if s else "关闭"))
        self.spin_low_balance.valueChanged.connect(lambda v: self.on_param_changed("余额保护阈值", v))
        
        # === 策略参数 ===
        self.spin_increase_rate.valueChanged.connect(lambda v: self.on_param_changed("输-递增比例", f"{v}%"))
        self.spin_increase_fixed.valueChanged.connect(lambda v: self.on_param_changed("输-固定增加", v))
        self.spin_decrease_rate.valueChanged.connect(lambda v: self.on_param_changed("赢-递减比例", f"{v}%"))
        
        # === 止盈止损 ===
        self.chk_take_profit.stateChanged.connect(
            lambda s: self.on_param_changed("启用止盈", "开启" if s else "关闭"))
        self.spin_take_profit.valueChanged.connect(lambda v: self.on_param_changed("止盈金额", v))
        
        self.chk_stop_loss.stateChanged.connect(
            lambda s: self.on_param_changed("启用止损", "开启" if s else "关闭"))
        self.spin_stop_loss.valueChanged.connect(lambda v: self.on_param_changed("止损金额", v))
        
        # 标记初始化完成
        self.param_initialized = True
    
    def on_param_changed(self, param_name, value):
        """参数变更时记录日志"""
        # 忽略初始化阶段的变更
        if not hasattr(self, 'param_initialized') or not self.param_initialized:
            return
        
        # 记录参数变更 (无论是否在运行中)
        self.log_run(f"⚙️ 参数变更: {param_name} = {value}")


    def update_start_button_text(self):
        """根据状态更新开始按钮文字"""
        is_real = self.chk_real_bet.isChecked()
        if self.is_running:
            text = "停止自动投注" if is_real else "停止模拟"
            self.btn_start.setText(text)
            self.btn_start.setStyleSheet("background-color: #f44336; color: white; font-weight: bold; padding: 10px;")
        else:
            text = "开始自动投注" if is_real else "开始模拟"
            self.btn_start.setText(text)
            self.btn_start.setStyleSheet("background-color: #4CAF50; color: white; font-weight: bold; padding: 10px;")

    def toggle_simulation(self):
        if self.btn_start.isChecked():
            self.is_running = True
            # 重置首次确认标记
            self.first_bet_confirmed = False
            self.update_start_button_text()
            
            # === 立即检查是否需要下单 (针对当前期) ===
            if self.chk_real_bet.isChecked():
                if not self.my_numbers:
                    QMessageBox.warning(self, "警告", "开启了真实投注但未导入号码！\n请先导入号码再开始。")
                    self.toggle_simulation() # 停止
                    return

                # 获取当前数据
                realtime_data = self.data_manager.get_realtime_data()
                if realtime_data:
                    n_period = realtime_data.get('n_period', {})
                    period_status = n_period.get('period_status', -1)
                    current_period = n_period.get('period_no')
                    
                    # 根据JS逻辑: 1: 距离封盘 (即当前正在开盘，可以下单)
                    if period_status == 1 and current_period:
                        self.log_run(f"🚀 启动即时下单检查: 第 {current_period} 期")
                        # 立即尝试下单 (使用当前设定金额)
                        unit_bet = self.spin_unit_bet.value()
                        self.place_real_bet(str(current_period), unit_bet)
                    else:
                        status_desc = {0: "未开盘", 1: "开盘中", 2: "开奖中"}.get(period_status, str(period_status))
                        self.log_run(f"ℹ️ 未触发即时下单: 当前状态为【{status_desc}】，期号={current_period}")
                else:
                    self.log_run("⚠️ 未获取到实时数据，无法判断是否下单")
            else:
                # === 模拟模式启动逻辑 ===
                if not self.my_numbers:
                    QMessageBox.warning(self, "警告", "未导入号码！\n请先导入号码再开始模拟。")
                    self.toggle_simulation() # 停止
                    return
                
                # 获取当前数据
                realtime_data = self.data_manager.get_realtime_data()
                if realtime_data:
                    n_period = realtime_data.get('n_period', {})
                    period_status = n_period.get('period_status', -1)
                    current_period = n_period.get('period_no')
                    
                    if period_status == 1 and current_period:
                        # 模拟即时下单
                        unit_bet = self.spin_unit_bet.value()
                        total_money = len(self.my_numbers) * unit_bet
                        self.log_run(f"🎮 启动模拟: 第 {current_period} 期")
                        self.log_run(f"🎮 [模拟下单] 期号: {current_period} | 号码数: {len(self.my_numbers)} | 单注: {unit_bet:.2f} | 总额: {total_money:.2f}")
                    else:
                        status_desc = {0: "未开盘", 1: "开盘中", 2: "开奖中"}.get(period_status, str(period_status))
                        self.log_run(f"ℹ️ 启动模拟: 当前状态为【{status_desc}】，期号={current_period}，等待下期开奖")
                else:
                    self.log_run("⚠️ 未获取到实时数据，等待下期开奖")
        else:
            self.is_running = False
            self.update_start_button_text()
            
            # 记录停止日志
            if self.chk_real_bet.isChecked():
                self.log_run("🛑 已停止真实投注 (已下单的订单无法取消)")
            else:
                self.log_run("🛑 已停止模拟")
            
    def on_timer_tick(self):
        """定时器回调"""
        # 1. 本地倒计时更新 (每秒)
        # 1. 本地倒计时更新 (每秒)
        if hasattr(self, 'countdown_target_monotonic'):
            import time
            remaining = int(self.countdown_target_monotonic - time.monotonic())
            if remaining < 0: remaining = 0
            mins, secs = divmod(remaining, 60)
            self.lbl_countdown.setText(f"{mins:02d}:{secs:02d}")
            
        # 2. 定期同步数据 (每5秒)
        if datetime.now().second % 5 == 0:
            self.refresh_data()
            
    def refresh_data(self):
        """刷新数据"""
        if not self.token:
            return

        # 1. 获取实时数据 (包含倒计时、最新结果、余额)
        realtime_data = self.data_manager.get_realtime_data()
        
        if realtime_data:
            # 更新余额
            user_data = realtime_data.get('user', {})
            balance = user_data.get('CM_surplus')
            if balance:
                self.lbl_balance.setText(f"{float(balance):.2f}")
                
            # 更新倒计时目标时间
            n_period = realtime_data.get('n_period', {})
            current_period = n_period.get('period_no', '--')
            
            # 更新最新开奖结果 (上一期)
            p_period = realtime_data.get('p_period', {})
            last_period = p_period.get('period_no', '--')
            last_result = p_period.get('number_overt', '--')
            
            # 界面显示调整：
            # 1. 左侧显示 "上期期号"
            self.lbl_current_issue.setText(str(last_period))
            
            # 2. 中间显示 "上期结果"
            self.lbl_draw_result.setText(last_result)
            
            # 3. 右侧倒计时标题显示 "下期期号 + 状态"
            # 根据JS逻辑: 0: 距离开盘, 1: 距离封盘, 2: 距离开奖
            # 所以 1 才是正在开盘中，可以下单
            status_map = {0: "距离开盘:", 1: "距离封盘:", 2: "距离开奖:"}
            period_status = n_period.get('period_status', 0)
            
            # 检查停盘
            if n_period.get('period_week_stop') == 1:
                status_text = "停盘中"
            else:
                status_text = status_map.get(period_status, "距离截止:")
            
            self.lbl_timer_title.setText(f"第 {current_period} 期 {status_text}")
            
            # 根据用户提供的JS代码，倒计时使用的是 finish_at
            finish_at = n_period.get('finish_at')
            server_at = realtime_data.get('server_at')
            
            if finish_at:
                import time
                # 计算剩余秒数
                remaining_seconds = 0
                
                if server_at:
                    # 如果有服务器时间，使用服务器时间计算 (更准确)
                    remaining_seconds = int(float(finish_at) - float(server_at))
                else:
                    # 否则回退到本地时间计算
                    remaining_seconds = int(float(finish_at) - time.time())
                
                # 修正：用户反馈倒计时比服务器快约2秒，这里手动补偿 +2秒
                remaining_seconds += 2
                
                # 设置单调时钟目标 (避免本地修改时间影响)
                self.countdown_target_monotonic = time.monotonic() + remaining_seconds
                
                # 立即更新一次显示
                if remaining_seconds < 0: remaining_seconds = 0
                mins, secs = divmod(remaining_seconds, 60)
                self.lbl_countdown.setText(f"{mins:02d}:{secs:02d}")
            
            if last_period and last_result:
                # 检查是否是新的一期
                if not hasattr(self, 'last_processed_period'):
                    self.last_processed_period = None
                    
                if last_period != self.last_processed_period:
                    # 只有当这是新的一期时，才去同步完整历史数据并计算
                    print(f"🔔 检测到新开奖: {last_period} -> {last_result}")
                    self.data_manager.sync_historical_data()
                    
                    # 获取完整的本地数据来处理 (因为 p_period 信息不全，缺赔率等)
                    latest_local = self.data_manager.get_local_latest()
                    if latest_local and latest_local.get('period_no') == last_period:
                        if self.is_running:
                            self.process_new_draw(latest_local)
                        self.last_processed_period = last_period
                        self.update_history_table()
        else:
            # 获取实时数据失败，通常是 Token 过期
            self.lbl_login_status.setText("Token已过期")
            self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
            
            if not self.token_expired_logged:
                self.log_run("⚠️ Token已过期或无效，请在浏览器中重新登录")
                self.token_expired_logged = True
            
            # 自动弹出浏览器面板
            if not self.browser_panel.isVisible():
                self.toggle_browser()
            
            # 回退到旧逻辑尝试同步历史
            self.data_manager.sync_historical_data()
            self.update_history_table()
            
    def start_backtest(self):
        """开始回测"""
        if not self.my_numbers:
            QMessageBox.warning(self, "警告", "请先导入号码！")
            return
            
        count = self.spin_backtest_count.value()
        data_list = self.data_manager.read_all_local_data()
        
        if not data_list:
            QMessageBox.warning(self, "警告", "本地无历史数据，请先同步数据！")
            return
            
        # 取最近N期
        test_data = data_list[-count:]
        
        # 参数
        # 收集参数
        params = {
            'unit_bet': self.spin_unit_bet.value(),
            'payout_rate': self.spin_payout.value(),
            'increase_rate': self.spin_increase_rate.value() / 100.0,
            'increase_fixed': self.spin_increase_fixed.value(),
            'decrease_rate': self.spin_decrease_rate.value() / 100.0,
            'enable_take_profit': self.chk_take_profit.isChecked(),
            'take_profit_val': self.spin_take_profit.value(),
            'enable_stop_loss': self.chk_stop_loss.isChecked(),
            'enable_take_profit': self.chk_take_profit.isChecked(),
            'take_profit_val': self.spin_take_profit.value(),
            'enable_stop_loss': self.chk_stop_loss.isChecked(),
            'stop_loss_val': self.spin_stop_loss.value(),
            'enable_max_bet_limit': self.chk_max_unit_bet.isChecked(),
            'max_unit_bet_val': self.spin_max_unit_bet.value()
        }
        
        # 准备UI
        self.btn_backtest.setEnabled(False)
        self.btn_backtest.setText("回测中...")
        self.txt_backtest_result.setText("正在回测中，请稍候...\n(表格和图表将实时更新)")
        
        # 清空图表和表格
        self.table.setRowCount(0)
        self.ax.clear()
        self.canvas.draw()
        
        # 启动线程
        self.backtest_worker = BacktestWorker(params, test_data, self.my_numbers)
        self.backtest_worker.record_generated.connect(self.on_backtest_record)
        self.backtest_worker.finished_signal.connect(self.on_backtest_finished)
        self.backtest_worker.error_signal.connect(lambda err: QMessageBox.critical(self, "错误", f"回测出错: {err}"))
        self.backtest_worker.start()
        
        # 临时存储回测数据用于绘图
        # 临时存储回测数据用于绘图
        self.backtest_profits = []
        self.backtest_records = [] # 清空旧记录
        
        # 禁用导出和还原按钮
        self.btn_export_backtest.setEnabled(False)
        self.btn_restore_view.setEnabled(False)

    def on_backtest_record(self, record):
        """处理回测实时记录"""
        # 0. 存储记录
        self.backtest_records.append(record)
        
        # 1. 更新表格 (插入到第一行)
        self.table.insertRow(0)
        self.table.setItem(0, 0, QTableWidgetItem(record['period']))
        self.table.setItem(0, 1, QTableWidgetItem(f"{record['draw_code']}")) # 开奖号码
        self.table.setItem(0, 2, QTableWidgetItem(f"{record['bet']:.2f}"))   # 投入
        self.table.setItem(0, 3, QTableWidgetItem(f"{record['unit_bet']:.2f}")) # 单注
        
        item_result = QTableWidgetItem("中奖" if record['is_win'] else "未中")
        item_result.setForeground(QColor("green") if record['is_win'] else QColor("red"))
        self.table.setItem(0, 4, item_result)
        
        item_profit = QTableWidgetItem(f"{record['profit']:+.2f}")
        item_profit.setForeground(QColor("red") if record['profit'] < 0 else QColor("green"))
        self.table.setItem(0, 5, item_profit)
        
        item_total = QTableWidgetItem(f"{record['total_profit']:+.2f}")
        item_total.setForeground(QColor("red") if record['total_profit'] < 0 else QColor("green"))
        self.table.setItem(0, 6, item_total)
        
        # 更新显示 (不再更新头部盈亏,头部只显示真实账户盈亏)
        
        # 3. 更新极值统计
        self.lbl_max_bet.setText(f"{record['max_bet']:.0f}")
        self.lbl_max_profit.setText(f"{record['max_profit']:.2f}")
        self.lbl_min_profit.setText(f"{record['min_profit']:.2f}")
        
        # 4. 更新图表
        self.backtest_profits.append(record['total_profit'])
        self.ax.clear()
        self.ax.set_title("回测资金曲线")
        self.ax.plot(range(len(self.backtest_profits)), self.backtest_profits, 'b-')
        self.ax.grid(True)
        self.canvas.draw()
        
    def on_backtest_finished(self, report):
        """回测完成"""
        self.btn_backtest.setEnabled(True)
        self.btn_backtest.setText("开始回测")
        self.btn_export_backtest.setEnabled(True)
        self.btn_restore_view.setEnabled(True)
        
        self.txt_backtest_result.setText(report)
        QMessageBox.information(self, "完成", "回测已完成！")

    def export_backtest_data(self):
        """导出回测数据"""
        if not self.backtest_records:
            QMessageBox.warning(self, "警告", "没有可导出的回测记录")
            return
            
        filepath, filter_str = QFileDialog.getSaveFileName(
            self, "导出回测记录", "backtest_report.xlsx", 
            "Excel Files (*.xlsx);;Text Files (*.txt)"
        )
        
        if not filepath:
            return
            
        try:
            if filepath.endswith('.xlsx'):
                # 导出Excel
                import pandas as pd
                df = pd.DataFrame(self.backtest_records)
                # 重命名列以更友好
                df = df.rename(columns={
                    'period': '期号', 'draw_time': '时间', 'draw_code': '开奖',
                    'bet': '投入', 'unit_bet': '单注', 'is_win': '结果',
                    'profit': '盈亏', 'total_profit': '累计盈亏',
                    'max_bet': '最高投入', 'max_profit': '最高盈利', 'min_profit': '最大亏损'
                })
                # 转换结果列
                df['结果'] = df['结果'].apply(lambda x: "中奖" if x else "未中")
                
                # 选择需要的列并排序
                cols = ['期号', '时间', '开奖', '投入', '单注', '结果', '盈亏', '累计盈亏']
                df = df[cols]
                
                df.to_excel(filepath, index=False)
            else:
                # 导出TXT
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write("期号\t时间\t开奖\t投入\t单注\t结果\t盈亏\t累计盈亏\n")
                    for r in self.backtest_records:
                        res = "中奖" if r['is_win'] else "未中"
                        line = f"{r['period']}\t{r['draw_time']}\t{r['draw_code']}\t{r['bet']:.2f}\t{r['unit_bet']:.2f}\t{res}\t{r['profit']:.2f}\t{r['total_profit']:.2f}\n"
                        f.write(line)
                        
            QMessageBox.information(self, "成功", "导出成功！")
        except Exception as e:
            QMessageBox.critical(self, "错误", f"导出失败: {e}")

    def restore_realtime_view(self):
        """恢复实时视图"""
        # 1. 恢复表格
        self.update_history_table()
        
        # 2. 恢复图表
        self.update_chart()
        
        # 3. 恢复极值统计 (重新计算而不是重置)
        self.calculate_historical_extremes()
        
        # 4. 禁用按钮
        self.btn_export_backtest.setEnabled(False)
        self.btn_restore_view.setEnabled(False)
        
        # 5. 清理累计盈亏显示
        if hasattr(self, 'lbl_total_profit'):
            self.lbl_total_profit.setText("累计盈亏: --")
        if hasattr(self, 'lbl_today_profit'):
            self.lbl_today_profit.setText("今日盈亏: --")
        
        # 4. 禁用按钮
        self.btn_export_backtest.setEnabled(False)
        self.btn_restore_view.setEnabled(False)
        self.btn_backtest.setEnabled(True)
        
        self.txt_backtest_result.setText("已返回实时视图。")
            
    def reset_data(self):
        """重置数据"""
        reply = QMessageBox.question(self, "确认", "确定要重置所有数据吗？", 
                                     QMessageBox.Yes | QMessageBox.No)
        if reply == QMessageBox.Yes:
            self.bet_results = {}
            self.processed_periods = set()
            self.lbl_max_bet.setText("0")
            self.lbl_max_profit.setText("0")
            self.lbl_min_profit.setText("0")
            
            # 重置当前注码
            self.spin_unit_bet.setValue(2.0) # 恢复默认
            
            self.update_history_table()
            self.update_chart()
            
    def export_history(self):
        """导出历史记录"""
        if not hasattr(self, 'bet_results') or not self.bet_results:
            QMessageBox.warning(self, "警告", "暂无数据可导出")
            return
            
        filepath, _ = QFileDialog.getSaveFileName(self, "导出Excel", "history.xlsx", "Excel Files (*.xlsx)")
        if filepath:
            try:
                import pandas as pd
                data = []
                for period, res in self.bet_results.items():
                    data.append({
                        "期号": period,
                        "投入": res['bet'],
                        "盈亏": res['profit'],
                        "结果": "中奖" if res['is_win'] else "未中"
                    })
                df = pd.DataFrame(data)
                df.to_excel(filepath, index=False)
                QMessageBox.information(self, "成功", "导出成功！")
            except Exception as e:
                QMessageBox.critical(self, "错误", f"导出失败: {e}")

    def update_chart(self):
        """更新图表 (实时模式)"""
        if not self.canvas:
            return
            
        # 合并所有投注数据 (模拟 + 真实)
        all_results = {}
        
        # 添加模拟投注数据
        if hasattr(self, 'bet_results'):
            for period, data in self.bet_results.items():
                all_results[period] = data.copy()
        
        # 添加真实投注数据 (优先级更高,会覆盖同期的模拟数据)
        if hasattr(self, 'real_bet_results'):
            for period, data in self.real_bet_results.items():
                all_results[period] = data.copy()
                
        if not all_results:
            return
            
        # 按期号排序
        periods = sorted(all_results.keys())
        profits = []
        cumulative = 0
        
        for p in periods:
            profit = all_results[p].get('profit', 0)
            cumulative += profit
            profits.append(cumulative)
            
        # 绘制图表
        self.ax.clear()
        self.ax.set_title("累计盈亏走势")
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("金额")
        self.ax.grid(True)
        
        if profits:
            self.ax.plot(range(len(profits)), profits, 'b-', marker='o', markersize=3)
            
        self.canvas.draw()

    def process_new_draw(self, draw_data):
        """处理新开奖结果"""
        period = draw_data.get('period_no')
        if not period:
            return
            
        # 检查是否已经处理过该期
        if not hasattr(self, 'processed_periods'):
            self.processed_periods = set()
            
        if period in self.processed_periods:
            return
            
        self.processed_periods.add(period)
        
        # 如果没有导入号码，不计算
        if not self.my_numbers:
            return
            
        # 获取开奖号码 (格式: "1,2,3" -> "123")
        draw_code = draw_data.get('number_overt', '').replace(',', '')
        if not draw_code:
            return
            
        # === 核心投注逻辑 ===
        
        # 1. 获取当前设置参数
        unit_bet = self.spin_unit_bet.value()
        payout_rate = self.spin_payout.value()
        
        # 计算总投入
        total_bet = len(self.my_numbers) * unit_bet
        
        # 2. 判断输赢
        is_win = draw_code in self.my_numbers
        win_amount = 0
        
        if is_win:
            win_amount = unit_bet * payout_rate
            
        profit = win_amount - total_bet
        
        # 4. 记录结果
        if not hasattr(self, 'bet_results'):
            self.bet_results = {}
            
        self.bet_results[period] = {
            'bet': total_bet,
            'profit': profit,
            'is_win': is_win,
            'is_real': self.chk_real_bet.isChecked()
        }
        
        # 添加日志记录
        mode_str = "[实盘]" if self.chk_real_bet.isChecked() else "[模拟]"
        result_str = "赢" if is_win else "输"
        self.log_run(f"{mode_str} 第 {period} 期: {result_str} | 投入: {total_bet:.2f} | 单次盈亏: {profit:.2f}")
        
        # 5. 更新极值统计
        # 初始化极值变量(如果不存在)
        if not hasattr(self, 'max_bet_value'):
            self.max_bet_value = 0
            self.max_bet_period = ""
        if not hasattr(self, 'max_profit_value'):
            self.max_profit_value = 0
            self.max_profit_period = ""
        if not hasattr(self, 'min_profit_value'):
            self.min_profit_value = 0
            self.min_profit_period = ""
        
        # 最高投注
        if total_bet > self.max_bet_value:
            self.max_bet_value = total_bet
            self.max_bet_period = period
            self.lbl_max_bet.setText(f"{total_bet:.2f} (第{period}期)")
        
        # 最高/最低盈利
        if new_total_profit > self.max_profit_value:
            self.max_profit_value = new_total_profit
            self.max_profit_period = period
            self.lbl_max_profit.setText(f"{new_total_profit:.2f} (第{period}期)")
        
        if new_total_profit < self.min_profit_value:
            self.min_profit_value = new_total_profit
            self.min_profit_period = period
            self.lbl_min_profit.setText(f"{new_total_profit:.2f} (第{period}期)")
        
        # 6. 动态注码调整 (对冲逻辑)
        if is_win:
            # 赢了：递减
            decrease_rate = self.spin_decrease_rate.value() / 100.0
            new_unit_bet = unit_bet * (1 - decrease_rate)
            # 保持最小金额
            if new_unit_bet < 0.1: new_unit_bet = 0.1
            self.spin_unit_bet.setValue(new_unit_bet)
        else:
            # 输了：递增
            increase_rate = self.spin_increase_rate.value() / 100.0
            increase_fixed = self.spin_increase_fixed.value()
            
            # 计算新的总投入目标
            # 新单注 = (当前单注 * (1+Rate)) + (Fixed / 号码数)
            fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
            new_unit_bet = unit_bet * (1 + increase_rate) + fixed_per_code
            
            self.log_run(f"📉 输后调整: {unit_bet:.2f} -> {new_unit_bet:.2f} (Rate: {increase_rate*100}%, Fixed: {increase_fixed})")
            
            # 检查最高单注限制
            if self.chk_max_unit_bet.isChecked():
                max_val = self.spin_max_unit_bet.value()
                if new_unit_bet > max_val:
                    new_unit_bet = max_val
                    self.log_run(f"⚠️ 触发最高单注限制: {max_val}")
            
            self.spin_unit_bet.setValue(new_unit_bet)
            
        # === 真实投注逻辑 (无论输赢都执行) ===
        if self.chk_real_bet.isChecked():
            # 计算下期期号 (当前期号 + 1)
            try:
                next_period = str(int(period) + 1)
                # 调用下单 (使用更新后的金额)
                current_unit_bet = self.spin_unit_bet.value()
                self.place_real_bet(next_period, current_unit_bet)
            except:
                self.log_run("❌ 无法计算下期期号，跳过下单")
        else:
            # === 模拟投注逻辑 ===
            try:
                next_period = str(int(period) + 1)
                current_unit_bet = self.spin_unit_bet.value()
                total_money = len(self.my_numbers) * current_unit_bet
                self.log_run(f"🎮 [模拟下单] 期号: {next_period} | 号码数: {len(self.my_numbers)} | 单注: {current_unit_bet:.2f} | 总额: {total_money:.2f}")
            except:
                self.log_run("❌ 无法计算下期期号，跳过模拟下单")
            
        # 8. 更新图表
        self.update_chart()
        
        # 9. 如果是真实投注模式,同步账单更新真实盈亏
        if self.chk_real_bet.isChecked() and self.is_running:
            self.fetch_real_account_history()
        
    def update_history_table(self):
        """更新历史记录表格"""
        data_list = self.data_manager.read_all_local_data()
        # 只显示最近50期
        recent_data = data_list[-50:]
        recent_data.reverse() # 最新在最上面
        
        self.table.setRowCount(len(recent_data))
        for row, data in enumerate(recent_data):
            period = data.get('period_no', '')
            period_item = QTableWidgetItem(period)
            
            # 检查是否有真实投注记录，如果有则高亮
            is_real_bet = False
            if (hasattr(self, 'real_bet_results') and period in self.real_bet_results) or \
               (hasattr(self, 'bet_results') and period in self.bet_results and self.bet_results[period].get('is_real')):
                is_real_bet = True
                
            if is_real_bet:
                period_item.setForeground(QColor('blue'))
                font = period_item.font()
                font.setBold(True)
                period_item.setFont(font)
                period_item.setToolTip("点击查看下单详情")
                
            self.table.setItem(row, 0, period_item)
            
            # 优化时间显示：添加Tooltip并调整列宽
            time_str = data.get('overt_at', '')
            time_item = QTableWidgetItem(time_str)
            time_item.setToolTip(time_str) # 鼠标悬浮显示完整时间
            self.table.setItem(row, 1, time_item)
            
            # 开奖号码
            self.table.setItem(row, 2, QTableWidgetItem(data.get('number_overt', '')))
            
            # 盈亏数据显示逻辑
            # 优先显示真实账单 (从API同步回来的)
            res = None
            if hasattr(self, 'real_bet_results') and period in self.real_bet_results:
                res = self.real_bet_results[period].copy() # 复制一份避免修改原数据
                # 尝试从本地记录补全单注信息
                if hasattr(self, 'bet_results') and period in self.bet_results:
                    local_res = self.bet_results[period]
                    if res.get('unit_bet', 0) == 0:
                        res['unit_bet'] = local_res.get('unit_bet', 0)
            elif hasattr(self, 'bet_results') and period in self.bet_results:
                res = self.bet_results[period]
            
            if res:
                # 只有真实投注或同步回来的真实账单才显示在表格中
                if res.get('is_real', False):
                    # 投入 (总投注额)
                    self.table.setItem(row, 3, QTableWidgetItem(f"{res.get('total_bet', 0.0):.2f}"))
                    
                    # 单注
                    u_bet = res.get('unit_bet', 0.0)
                    u_bet_str = f"{u_bet:.2f}" if u_bet > 0 else "--"
                    self.table.setItem(row, 4, QTableWidgetItem(u_bet_str))
                    
                    # 结果 (中奖金额)
                    self.table.setItem(row, 5, QTableWidgetItem(f"{res.get('win_amount', 0.0):.2f}"))
                    
                    # 盈亏
                    pl = res.get('profit', 0.0)
                    pl_item = QTableWidgetItem(f"{pl:.2f}")
                    if pl > 0:
                        pl_item.setForeground(QColor('red'))
                    elif pl < 0:
                        pl_item.setForeground(QColor('green'))
                    self.table.setItem(row, 6, pl_item)
                    
                    # 累计盈亏 (动态计算：从当前行往后累加所有真实盈亏)
                    # 因为表格是倒序显示，所以需要累加当前行及之后所有行的盈亏
                    total_pl = 0.0
                    for i in range(row, len(recent_data)):
                        p_i = recent_data[i].get('period_no', '')
                        r_i = None
                        if hasattr(self, 'real_bet_results') and p_i in self.real_bet_results:
                            r_i = self.real_bet_results[p_i]
                        elif hasattr(self, 'bet_results') and p_i in self.bet_results:
                            r_i = self.bet_results[p_i]
                        
                        if r_i and r_i.get('is_real'):
                            total_pl += r_i.get('profit', 0.0)
                    
                    total_item = QTableWidgetItem(f"{total_pl:.2f}")
                    if total_pl > 0:
                        total_item.setForeground(QColor('red'))
                    elif total_pl < 0:
                        total_item.setForeground(QColor('green'))
                    self.table.setItem(row, 7, total_item)
                else:
                    # 模拟数据，清空或显示 --
                    for col in range(3, 8):
                        self.table.setItem(row, col, QTableWidgetItem("--"))
            else:
                # 无投注记录
                for c in range(3, 8):
                    self.table.setItem(row, c, QTableWidgetItem("--"))

    def on_table_cell_clicked(self, row, col):
        """表格点击事件"""
        if col == 0: # 点击期号列
            item = self.table.item(row, col)
            if item and item.foreground().color() == QColor('blue'):
                period_no = item.text()
                self.show_order_details(period_no)

    def show_order_details(self, period_no):
        """显示下单详情弹窗"""
        if not self.token:
            QMessageBox.warning(self, "提示", "请先登录")
            return
            
        self.log_run(f"🔍 正在查询第 {period_no} 期下单详情...")
        
        try:
            # 获取当前日期 (API 需要日期参数)
            # 简单起见，我们先尝试当前日期，如果数据管理器有日期信息则更好
            import datetime
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            
            url = f"http://s1.pk999p.xyz/index.php/Orders/LOrder?game_id=2&date={today}&period_no={period_no}&status=0&order_no=&page=1&limit=50"
            headers = {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "token": self.token,
                "Cookie": self.cookie
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                self.log_run(f"❌ 查询详情失败: HTTP {response.status_code}")
                return
                
            res_json = response.json()
            if res_json.get("code") != 0:
                # 如果当前日期没查到，可能是昨天的期号，这里可以尝试前一天，但为了简单先提示
                self.log_run(f"ℹ️ 未查询到详情: {res_json.get('msg')}")
                QMessageBox.information(self, f"第 {period_no} 期详情", "未查询到该期下单详情（可能跨天或已失效）")
                return
                
            orders = res_json.get("data", [])
            if not orders:
                QMessageBox.information(self, f"第 {period_no} 期详情", "该期无下单记录")
                return
                
            # 构造详情文本
            detail_text = f"<b>期号: {period_no}</b><br><br>"
            detail_text += "<table border='1' cellpadding='5' style='border-collapse: collapse;'>"
            detail_text += "<tr><th>号码</th><th>单注</th><th>赔率</th><th>投入</th><th>结果</th><th>时间</th></tr>"
            
            total_bet = 0.0
            total_prize = 0.0
            
            for o in orders:
                num = o.get("num", "")
                unit = o.get("CM", "0")
                odds = o.get("odds", "0")
                prize = o.get("CM_prize", "0")
                time_str = o.get("create_at", "").split(" ")[1] # 只取时间部分
                
                total_bet += float(unit)
                total_prize += float(prize)
                
                detail_text += f"<tr><td>{num}</td><td>{unit}</td><td>{odds}</td><td>{unit}</td><td>{prize}</td><td>{time_str}</td></tr>"
            
            detail_text += "</table>"
            detail_text += f"<br><b>总计投入: {total_bet:.2f}</b>"
            detail_text += f"<br><b>总计中奖: {total_prize:.2f}</b>"
            detail_text += f"<br><b>本期盈亏: <font color='{'red' if total_prize-total_bet > 0 else 'green'}'>{total_prize-total_bet:.2f}</font></b>"
            
            msg_box = QMessageBox(self)
            msg_box.setWindowTitle(f"第 {period_no} 期下单详情")
            msg_box.setTextFormat(Qt.RichText)
            msg_box.setText(detail_text)
            msg_box.exec_()
            
        except Exception as e:
            self.log_run(f"❌ 查询详情异常: {e}")
            QMessageBox.critical(self, "错误", f"查询详情时发生异常: {e}")

if __name__ == "__main__":
    # macOS WebEngine 崩溃修复
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--disable-gpu"
    QApplication.setAttribute(Qt.AA_ShareOpenGLContexts)
    
    app = QApplication(sys.argv)
    window = Canada28Simulator()
    window.show()
    sys.exit(app.exec_())
