import sys
import json
import os
import requests
import logging
import time
from datetime import datetime
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QSplitter, QFrame, QLabel, QPushButton, 
                             QLineEdit, QTextEdit, QMessageBox, QGroupBox, QTableWidget,
                             QTableWidgetItem, QHeaderView, QComboBox, QCheckBox, QSpinBox,
                             QDoubleSpinBox, QFileDialog, QTabWidget, QInputDialog, QRadioButton,
                             QSizePolicy, QGridLayout, QDateEdit)
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import Qt, QUrl, QTimer, pyqtSignal, QObject, QThread, qInstallMessageHandler, QtMsgType, QDate
from PyQt5.QtGui import QFont, QColor
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

# === 日志配置 ===
def setup_logging():
    """配置日志系统: 输出到文件和控制台"""
    log_file = "debug.log"
    
    # 配置 Python logging
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[
            logging.FileHandler(log_file, mode='w', encoding='utf-8'),
            logging.StreamHandler(sys.stdout)
        ]
    )
    # 屏蔽 matplotlib 的调试信息
    logging.getLogger('matplotlib').setLevel(logging.WARNING)
    
    # 重定向 stdout 和 stderr 到 logger
    class StreamToLogger(object):
        def __init__(self, logger, log_level=logging.INFO):
            self.logger = logger
            self.log_level = log_level
            self.linebuf = ''

        def write(self, buf):
            for line in buf.rstrip().splitlines():
                self.logger.log(self.log_level, line.rstrip())

        def flush(self):
            pass

    sys.stdout = StreamToLogger(logging.getLogger('STDOUT'), logging.INFO)
    sys.stderr = StreamToLogger(logging.getLogger('STDERR'), logging.ERROR)

    # Qt 消息拦截 (捕获 WebEngine 报错)
    def qt_message_handler(mode, context, message):
        if mode == QtMsgType.QtInfoMsg:
            logging.info(f"[Qt Info] {message}")
        elif mode == QtMsgType.QtWarningMsg:
            logging.warning(f"[Qt Warning] {message}")
        elif mode == QtMsgType.QtCriticalMsg:
            logging.error(f"[Qt Critical] {message}")
        elif mode == QtMsgType.QtFatalMsg:
            logging.critical(f"[Qt Fatal] {message}")
        else:
            logging.debug(f"[Qt Debug] {message}")

    qInstallMessageHandler(qt_message_handler)
    
    logging.info("🚀 系统启动 - 日志初始化完成")
    logging.info(f"Python版本: {sys.version}")
    logging.info(f"工作目录: {os.getcwd()}")

# 在顶层调用初始化
# setup_logging() # 调试完成，关闭日志

# 设置中文字体 (解决乱码问题)
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'PingFang SC', 'Heiti TC']
plt.rcParams['axes.unicode_minus'] = False

# 导入数据管理器
from data_manager import CanadaDataManager


class DataSyncWorker(QThread):
    """数据同步工作线程（后台执行，不阻塞UI）"""
    progress_signal = pyqtSignal(str)  # 进度提示信号
    finished_signal = pyqtSignal(bool)  # 完成信号(成功/失败)
    
    def __init__(self, data_manager):
        super().__init__()
        self.data_manager = data_manager
        
    def run(self):
        try:
            success = self.data_manager.sync_historical_data()
            self.finished_signal.emit(success)
        except Exception as e:
            self.progress_signal.emit(f"同步失败: {e}")
            self.finished_signal.emit(False)


class AccountSyncWorker(QThread):
    """账单同步工作线程（避免主线程阻塞）"""
    progress_signal = pyqtSignal(str)  # 进度提示信号
    finished_signal = pyqtSignal(float, dict)  # 完成信号(总盈亏, 账单数据)
    error_signal = pyqtSignal(str)  # 错误信号
    
    def __init__(self, token, cookie):
        super().__init__()
        self.token = token
        self.cookie = cookie
        
    def run(self):
        try:
            import requests
            import datetime
            
            total_profit = 0.0
            page = 1
            limit = 50
            real_bet_results = {}
            
            # 第一阶段：获取所有期号的盈亏统计
            while True:
                url = f"http://s1.pk999p.xyz/index.php/Reports/LPeriod?game_id=2&page={page}&limit={limit}"
                headers = {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                    "X-Requested-With": "XMLHttpRequest",
                    "token": self.token,
                    "Cookie": self.cookie
                }
                
                self.progress_signal.emit(f"📡 请求第 {page} 页数据...")
                
                response = requests.get(url, headers=headers, timeout=10)
                if response.status_code != 200:
                    self.error_signal.emit(f"请求失败: HTTP {response.status_code}")
                    break
                    
                res_json = response.json()
                if res_json.get("code") != 0:
                    self.error_signal.emit(f"API错误: {res_json.get('msg')}")
                    break
                    
                data_list = res_json.get("data", [])
                last_page = res_json.get("last_page", 1)
                
                # 累加盈亏并存储记录
                for item in data_list:
                    p_no = str(item.get("period_no"))
                    if p_no not in real_bet_results:
                        real_bet_results[p_no] = {
                            'total_bet': float(item.get("bet", 0)),
                            'unit_bet': 0.0,
                            'win_amount': float(item.get("win_money", 0)),
                            'profit': float(item.get("profit_loss", 0)),
                            'total_profit': 0.0,
                            'is_real': True
                        }
                    
                    pl = float(item.get("profit_loss", 0))
                    total_profit += pl
                
                if page >= last_page:
                    break
                    
                page += 1
                
            # 第二阶段：获取最近20期的详细明细
            self.progress_signal.emit("🔍 正在获取近期下单明细...")
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            
            recent_periods = sorted(real_bet_results.keys(), reverse=True)[:20]
            for idx, p_no in enumerate(recent_periods):
                try:
                    self.progress_signal.emit(f"🔍 获取第{p_no}期明细 ({idx+1}/{len(recent_periods)})")
                    detail_url = f"http://s1.pk999p.xyz/index.php/Orders/LOrder?game_id=2&date={today}&period_no={p_no}&status=0&order_no=&page=1&limit=50"
                    detail_res = requests.get(detail_url, headers=headers, timeout=5)
                    if detail_res.status_code == 200:
                        detail_json = detail_res.json()
                        if detail_json.get("code") == 0:
                            orders = detail_json.get("data", [])
                            if orders:
                                t_bet = 0.0
                                t_prize = 0.0
                                u_bet = 0.0
                                for o in orders:
                                    t_bet += float(o.get("CM", 0))
                                    t_prize += float(o.get("CM_prize", 0))
                                    if u_bet == 0: 
                                        u_bet = float(o.get("CM", 0))
                                
                                if p_no in real_bet_results:
                                    real_bet_results[p_no]['total_bet'] = t_bet
                                    real_bet_results[p_no]['unit_bet'] = u_bet
                                    real_bet_results[p_no]['win_amount'] = t_prize
                                    real_bet_results[p_no]['profit'] = t_prize - t_bet
                except:
                    continue
            
            self.finished_signal.emit(total_profit, real_bet_results)
            
        except Exception as e:
            self.error_signal.emit(f"同步异常: {str(e)}")



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
        self.is_paused = False

    def stop(self):
        """停止回测"""
        self.is_running = False
        
    def pause(self):
        """暂停回测"""
        self.is_paused = True
        
    def resume(self):
        """恢复回测"""
        self.is_paused = False

    def run(self):
        try:
            # 初始参数
            current_unit_bet = self.params['unit_bet']
            base_unit_bet = current_unit_bet
            payout_rate = self.params['payout_rate']
            
            # 策略参数
            
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
            
            # 资金策略状态 (Debt Mode)
            current_debt = 0.0
            
            stop_reason = ""
            
            report = f"=== 回测报告 (最近 {len(self.data_list)} 期) ===\n"
            report += f"号码数量: {len(self.my_numbers)}\n"
            report += f"初始单注: {base_unit_bet:.2f}\n"
            report += f"策略: 输增{increase_rate*100:.0f}%+{increase_fixed}, 赢减{decrease_rate*100:.0f}%\n\n"
            
            for i, data in enumerate(self.data_list):
                # 检查暂停
                while self.is_paused:
                    if not self.is_running:
                        break
                    self.msleep(100)
                
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
                # 动态调整注码 (Debt Mode)
                if is_win:
                    # 赢了：先还债
                    if current_debt > 0:
                        current_debt -= profit # profit是正数
                        if current_debt < 0: current_debt = 0
                        
                        if current_debt > 0:
                            # 债还没还完
                            # 新逻辑: 赢了也要递减 (D'Alembert策略 / 用户要求的阶梯回落)
                            
                            # 1. 扣除固定加注部分
                            fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
                            if fixed_per_code > 0:
                                current_unit_bet -= fixed_per_code
                                
                            # 2. 扣除比例递减 (如果设置了赢-递减)
                            if decrease_rate > 0:
                                current_unit_bet = current_unit_bet * (1 - decrease_rate)
                                
                            # 3. 兜底: 不能低于底注
                            if current_unit_bet < base_unit_bet:
                                current_unit_bet = base_unit_bet
                            pass 
                        else:
                            # 债还清了，重置回底注
                            current_unit_bet = base_unit_bet
                    else:
                        # 无债状态：递减 (且不能低于底注)
                        current_unit_bet = current_unit_bet * (1 - decrease_rate)
                        if current_unit_bet < base_unit_bet: current_unit_bet = base_unit_bet
                        if current_unit_bet < 0.1: current_unit_bet = 0.1
                else:
                    # 输了：记账并递增
                    loss_amount = abs(profit)
                    current_debt += loss_amount
                    
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


class TokenValidateWorker(QThread):
    """Token验证工作线程（避免启动时阻塞UI）"""
    success_signal = pyqtSignal(dict)  # 验证成功信号，传递remote_latest数据
    failed_signal = pyqtSignal()       # 验证失败信号
    
    def __init__(self, data_manager):
        super().__init__()
        self.data_manager = data_manager
        
    def run(self):
        try:
            print("🔍 正在通过请求历史数据验证Token...")
            remote_latest = self.data_manager.get_remote_latest()
            
            if remote_latest:
                print("✅ Token验证成功 (历史数据请求成功)")
                self.success_signal.emit(remote_latest)
            else:
                print("⚠️ Token已过期或无效 (历史数据请求失败)")
                self.failed_signal.emit()
        except Exception as e:
            print(f"❌ Token验证异常: {e}")
            self.failed_signal.emit()


class BettingWorker(QThread):
    """真实投注工作线程（避免下注时阻塞UI）"""
    success_signal = pyqtSignal(str, str)   # 成功信号(期号, 消息)
    error_signal = pyqtSignal(str)          # 错误信号(错误消息)
    balance_low_signal = pyqtSignal()       # 余额不足信号
    
    def __init__(self, token, cookie, period, my_numbers, unit_bet):
        super().__init__()
        self.token = token
        self.cookie = cookie
        self.period = period
        self.my_numbers = my_numbers
        self.unit_bet = unit_bet
        
    def run(self):
        try:
            import requests
            
            # 构造 o_datas
            o_datas_list = []
            for num in self.my_numbers:
                o_datas_list.append(f"16:{num}:{self.unit_bet}")
            o_datas = ",".join(o_datas_list)
            
            total_money = len(self.my_numbers) * self.unit_bet
            
            # 发送请求
            url = "http://s1.pk999p.xyz/index.php/Orders/COrders"
            data = {
                "type": "import",
                "game_id": "2",
                "period_no": self.period,
                "t_datas": "16",
                "o_datas": o_datas,
                "position": "txt导入"
            }
            
            headers = {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "token": self.token,
                "Cookie": self.cookie
            }
            
            print(f"🚀 发送下单请求: 期号={self.period}, 总额={total_money}")
            response = requests.post(url, data=data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                res_json = response.json()
                code = res_json.get("code")
                
                if code == 0:
                    msg = res_json.get('msg', '下单成功')
                    self.success_signal.emit(self.period, msg)
                elif code == 9:
                    # 余额不足
                    self.balance_low_signal.emit()
                else:
                    error_msg = res_json.get('msg', '未知错误')
                    self.error_signal.emit(f"API返回错误: {error_msg}")
            else:
                self.error_signal.emit(f"HTTP {response.status_code}")
                
        except Exception as e:
            self.error_signal.emit(f"下单异常: {str(e)}")


class RealtimeDataWorker(QThread):
    """实时数据获取工作线程（避免定时刷新时阻塞UI）"""
    success_signal = pyqtSignal(dict)  # 成功信号，传递realtime_data
    failed_signal = pyqtSignal(str)    # 失败信号，传递错误信息
    
    def __init__(self, data_manager):
        super().__init__()
        self.data_manager = data_manager
        
    def run(self):
        try:
            realtime_data = self.data_manager.get_realtime_data()
            if realtime_data:
                self.success_signal.emit(realtime_data)
            else:
                # 返回None可能是Token过期，也可能是网络问题
                self.failed_signal.emit("empty_response")
        except Exception as e:
            error_msg = str(e)
            print(f"❌ 获取实时数据失败: {error_msg}")
            # 传递具体错误信息，便于判断是否真的Token过期
            self.failed_signal.emit(error_msg)


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
        self.current_debt = 0.0  # 当前累计欠款 (逐期回本模式)
        self.base_bet_memory = 2.0 # 记忆初始底注
        
        # 性能优化：添加请求状态标志，防止并发请求导致UI卡顿
        self.is_refreshing_data = False  # 防止refresh_data并发调用
        
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
        
        # === 浏览器调试信号 ===
        self.browser.loadStarted.connect(lambda: logging.info("🔵 浏览器: 开始加载页面"))
        self.browser.loadProgress.connect(lambda p: logging.info(f"🔵 浏览器: 加载进度 {p}%"))
        self.browser.loadFinished.connect(lambda ok: logging.info(f"🔵 浏览器: 加载结束 - {'成功' if ok else '失败'}"))
        self.browser.renderProcessTerminated.connect(
            lambda t, e: logging.error(f"🔴 浏览器渲染进程崩溃! 类型:{t}, 代码:{e}")
        )
        
        # SSL 检查
        try:
            import ssl
            logging.info(f"🔐 OpenSSL版本: {ssl.OPENSSL_VERSION}")
        except Exception as e:
            logging.error(f"❌ 无法加载 SSL 模块: {e}")

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
        
        # 3. 底部历史记录 + 极值统计
        self.create_stats_panel()
        self.create_history_table()
        
        # === 使用 Splitter 上下布局 ===
        self.v_splitter = QSplitter(Qt.Vertical)
        self.v_splitter.setHandleWidth(8) # 增加分割条宽度，方便拖动
        self.v_splitter.setStyleSheet("QSplitter::handle { background-color: #e0e0e0; }") # 视觉提示
        
        # 上部：Tab页
        # 设置QSizePolicy确保它是可以伸缩的
        self.tabs.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.tabs.setMinimumHeight(100) # 允许压得比较扁
        self.v_splitter.addWidget(self.tabs)
        
        # 下部：统计+历史
        self.split_bottom_container = QWidget()
        bottom_layout = QVBoxLayout(self.split_bottom_container)
        bottom_layout.setContentsMargins(0, 0, 0, 0)
        bottom_layout.addWidget(self.stats_panel_group)
        bottom_layout.addWidget(self.history_panel_group)
        
        # 下半部分也允许伸缩
        self.split_bottom_container.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.v_splitter.addWidget(self.split_bottom_container)
        
        # 设置初始比例 (Tab 400px : History 剩余)
        # 注意: 使用 setSizes 比 setStretchFactor 更可靠
        self.v_splitter.setSizes([450, 400])
        # 禁止顶部 Tab 被完全折叠
        self.v_splitter.setCollapsible(0, False)
        
        self.simulator_layout.addWidget(self.v_splitter)
        
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
        self.lbl_login_status = QLabel("未登录")
        self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
        layout.addWidget(QLabel("登录状态:"))
        layout.addWidget(self.lbl_login_status)
        
        # 资金信息
        layout.addSpacing(10)
        layout.addWidget(QLabel("当前余额:"))
        self.lbl_balance = QLabel("0.00")
        self.lbl_balance.setStyleSheet("color: blue; font-weight: bold; font-size: 14px;")
        layout.addWidget(self.lbl_balance)
        
        layout.addSpacing(10)
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
        self.tabs = QTabWidget()
        self.tabs.currentChanged.connect(self.on_tab_changed)
        
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
        draw_layout.addSpacing(10)
        draw_layout.addWidget(QLabel("开奖号码:"))
        draw_layout.addWidget(self.lbl_draw_result)
        draw_layout.addSpacing(10)
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
        self.tabs.addTab(tab_run, "运行控制")
        
        # === 新增：合并"设置与号码" Tab ===
        # === 新增：合并"设置与号码" Tab ===
        tab_combined = QWidget()
        combined_layout = QVBoxLayout(tab_combined)
        
        # 使用Splitter上下分隔
        settings_splitter = QSplitter(Qt.Vertical)
        
        # --- 上半部分: 参数设置 ---
        settings_widget = QWidget()
        settings_layout = QVBoxLayout(settings_widget)
        settings_layout.setContentsMargins(0, 0, 0, 0)
        
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
        h3_basic = QHBoxLayout()
        self.chk_max_unit_bet = QCheckBox("启用最高单注限制:")
        self.chk_max_unit_bet.setChecked(True)
        h3_basic.addWidget(self.chk_max_unit_bet)
        
        self.spin_max_unit_bet = QDoubleSpinBox()
        self.spin_max_unit_bet.setRange(0.1, 100000)
        self.spin_max_unit_bet.setSingleStep(0.1)  # 支持0.1步进
        self.spin_max_unit_bet.setValue(10.0)
        h3_basic.addWidget(self.spin_max_unit_bet)
        layout_basic.addLayout(h3_basic)
        
        # 余额保护
        h4_basic = QHBoxLayout()
        self.chk_low_balance = QCheckBox("余额低于此值停止:")
        h4_basic.addWidget(self.chk_low_balance)
        
        self.spin_low_balance = QDoubleSpinBox()
        self.spin_low_balance.setRange(0, 1000000)
        self.spin_low_balance.setValue(500.0)
        h4_basic.addWidget(self.spin_low_balance)
        layout_basic.addLayout(h4_basic)
        
        grp_basic.setLayout(layout_basic)
        settings_layout.addWidget(grp_basic)
        
        # 动态策略
        grp_strategy = QGroupBox("动态策略 (对冲)")
        layout_strategy = QVBoxLayout()
        
        # 输了递增
        h3_strat = QHBoxLayout()
        h3_strat.addWidget(QLabel("输-递增比例(%):"))
        self.spin_increase_rate = QDoubleSpinBox()
        self.spin_increase_rate.setRange(0, 100)
        self.spin_increase_rate.setValue(2.0)
        h3_strat.addWidget(self.spin_increase_rate)
        
        h3_strat.addWidget(QLabel("输-固定增加:"))
        self.spin_increase_fixed = QDoubleSpinBox()
        self.spin_increase_fixed.setRange(0, 1000)
        self.spin_increase_fixed.setValue(20.0)
        h3_strat.addWidget(self.spin_increase_fixed)
        layout_strategy.addLayout(h3_strat)
        
        # 赢了递减
        h4_strat = QHBoxLayout()
        h4_strat.addWidget(QLabel("赢-递减比例(%):"))
        self.spin_decrease_rate = QDoubleSpinBox()
        self.spin_decrease_rate.setRange(0, 100)
        self.spin_decrease_rate.setValue(2.0)
        h4_strat.addWidget(self.spin_decrease_rate)
        layout_strategy.addLayout(h4_strat)
        
        grp_strategy.setLayout(layout_strategy)
        settings_layout.addWidget(grp_strategy)
        
        # 止盈止损
        grp_stop = QGroupBox("止盈止损")
        layout_stop = QVBoxLayout()
        
        self.chk_take_profit = QCheckBox("启用止盈")
        layout_stop.addWidget(self.chk_take_profit)
        h5_stop = QHBoxLayout()
        h5_stop.addWidget(QLabel("止盈金额:"))
        self.spin_take_profit = QDoubleSpinBox()
        self.spin_take_profit.setRange(0, 1000000)
        self.spin_take_profit.setValue(2000.0)
        h5_stop.addWidget(self.spin_take_profit)
        layout_stop.addLayout(h5_stop)
        
        self.chk_stop_loss = QCheckBox("启用止损")
        layout_stop.addWidget(self.chk_stop_loss)
        h6_stop = QHBoxLayout()
        h6_stop.addWidget(QLabel("止损金额:"))
        self.spin_stop_loss = QDoubleSpinBox()
        self.spin_stop_loss.setRange(-1000000, 0)
        self.spin_stop_loss.setValue(-5000.0)
        h6_stop.addWidget(self.spin_stop_loss)
        layout_stop.addLayout(h6_stop)
        
        grp_stop.setLayout(layout_stop)
        settings_layout.addWidget(grp_stop)
        
        settings_splitter.addWidget(settings_widget)
        
        # --- 下半部分: 号码管理 ---
        import_widget = QWidget()
        import_layout = QVBoxLayout(import_widget)
        import_layout.setContentsMargins(0, 0, 0, 0)
        
        grp_import = QGroupBox("号码管理")
        layout_import = QVBoxLayout()
        
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
        
        layout_import.addLayout(btn_layout)
        
        # === 自定义冷门导出 (新增需求) ===
        grp_export_cold = QGroupBox("冷门号码自选导出")
        layout_export_cold = QVBoxLayout()
        
        h_cold_1 = QHBoxLayout()
        h_cold_1.addWidget(QLabel("统计周期(期):"))
        self.spin_cold_period = QSpinBox()
        self.spin_cold_period.setRange(10, 1000000) # 设为足够大，支持数据库所有数据
        self.spin_cold_period.setValue(2000)
        h_cold_1.addWidget(self.spin_cold_period)
        
        # 添加动态提示 (显示总数据量)
        self.lbl_cold_hint = QLabel("(加载中...)")
        self.lbl_cold_hint.setStyleSheet("color: gray; font-size: 10px;")
        h_cold_1.addWidget(self.lbl_cold_hint)
        # 尝试立即更新一次
        QTimer.singleShot(500, self.update_history_table)
        
        h_cold_1.addWidget(QLabel("冷门判定(出现率< %):"))
        self.spin_cold_percent = QDoubleSpinBox()
        self.spin_cold_percent.setRange(0.01, 10.0)
        self.spin_cold_percent.setSingleStep(0.01)
        self.spin_cold_percent.setValue(0.10) # 0.1%
        h_cold_1.addWidget(self.spin_cold_percent)
        layout_export_cold.addLayout(h_cold_1)
        
        h_cold_2 = QHBoxLayout()
        h_cold_2.addWidget(QLabel("导出数量(个):"))
        self.spin_cold_quantity = QSpinBox()
        self.spin_cold_quantity.setRange(1, 1000)
        self.spin_cold_quantity.setValue(100)
        h_cold_2.addWidget(self.spin_cold_quantity)
        
        # 移除 CheckBox, 统一使用弹窗选择
        # self.chk_cold_pure = QCheckBox("纯数字(无说明)")
        # h_cold_2.addWidget(self.chk_cold_pure)
        
        btn_export_cold_custom = QPushButton("导出定义冷门号码")
        btn_export_cold_custom.clicked.connect(self.export_custom_cold_numbers)
        # 样式美化
        btn_export_cold_custom.setStyleSheet("background-color: #2196F3; color: white;")
        h_cold_2.addWidget(btn_export_cold_custom)
        layout_export_cold.addLayout(h_cold_2)
        
        grp_export_cold.setLayout(layout_export_cold)
        layout_import.addWidget(grp_export_cold)
        
        self.lbl_numbers_count = QLabel("当前已导入号码: 0 个")
        layout_import.addWidget(self.lbl_numbers_count)
        
        self.txt_numbers_preview = QTextEdit()
        self.txt_numbers_preview.setReadOnly(False) # 允许编辑
        self.txt_numbers_preview.setPlaceholderText("在此处输入号码，支持逗号、空格或换行分隔。\n例如: 001, 002, 003")
        layout_import.addWidget(self.txt_numbers_preview)
        
        btn_update_numbers = QPushButton("更新/保存号码列表")
        btn_update_numbers.clicked.connect(self.parse_numbers_from_text)
        layout_import.addWidget(btn_update_numbers)
        
        grp_import.setLayout(layout_import)
        import_layout.addWidget(grp_import)
        
        settings_splitter.addWidget(import_widget)
        
        # 设置初始比例
        settings_splitter.setSizes([400, 300])
        
        combined_layout.addWidget(settings_splitter)
        self.tabs.addTab(tab_combined, "设置与号码")
        
        # Tab 3: 历史回测 (保持不变)
        tab_backtest = QWidget()
        backtest_layout = QVBoxLayout(tab_backtest)
        
        # 回测控制
        bt_ctrl_layout = QHBoxLayout()
        bt_ctrl_layout.addWidget(QLabel("回测期数:"))
        self.spin_backtest_count = QSpinBox()
        self.spin_backtest_count.setRange(1, 1000000) # 支持大范围回测
        self.spin_backtest_count.setValue(100)
        bt_ctrl_layout.addWidget(self.spin_backtest_count)
        
        self.btn_backtest = QPushButton("开始回测")
        self.btn_backtest.clicked.connect(self.start_backtest)
        bt_ctrl_layout.addWidget(self.btn_backtest)
        
        # 新增暂停按钮
        self.btn_pause_backtest = QPushButton("暂停")
        self.btn_pause_backtest.setCheckable(True) # 可切换状态
        self.btn_pause_backtest.clicked.connect(self.toggle_backtest_pause)
        self.btn_pause_backtest.setEnabled(False) # 初始不可用
        bt_ctrl_layout.addWidget(self.btn_pause_backtest)
        
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
        
        self.tabs.addTab(tab_backtest, "历史回测")
        
        
        # Tab 5: 盈亏图表
        # Tab 5: 盈亏图表
        tab_chart = QWidget()
        chart_layout = QVBoxLayout(tab_chart)
        
        # 顶部控制条 (右上角)
        chart_top_layout = QHBoxLayout()
        chart_top_layout.addStretch()
        
        self.btn_chart_pause = QPushButton("⏸ 暂停")
        self.btn_chart_pause.setCheckable(True)
        self.btn_chart_pause.setFixedWidth(80)
        self.btn_chart_pause.clicked.connect(self.toggle_backtest_pause)
        self.btn_chart_pause.setEnabled(False)
        chart_top_layout.addWidget(self.btn_chart_pause)
        
        chart_top_layout.addSpacing(10)
        
        # 这里的按钮改为 "开始回测" (与Tab3同步)
        self.btn_chart_start = QPushButton("开始回测")
        self.btn_chart_start.setFixedWidth(100)
        self.btn_chart_start.setStyleSheet("background-color: #4CAF50; color: white;")
        self.btn_chart_start.clicked.connect(self.start_backtest)
        chart_top_layout.addWidget(self.btn_chart_start)
        
        chart_layout.addLayout(chart_top_layout)
        
        self.figure = Figure(figsize=(5, 4), dpi=100)
        self.canvas = FigureCanvas(self.figure)
        self.canvas.setMinimumSize(100, 150) # 允许缩小
        self.ax = self.figure.add_subplot(111)
        self.ax.set_title("累计盈亏走势")
        self.ax.set_xlabel("期数")
        self.ax.set_ylabel("金额")
        self.ax.grid(True)
        
        chart_layout.addWidget(self.canvas)
        self.tabs.addTab(tab_chart, "盈亏图表")
        
        # Tab 6: 号码统计
        tab_stats = QWidget()
        stats_layout = QVBoxLayout(tab_stats)
        
        # 筛选条件区
        filter_group = QGroupBox("筛选条件")
        filter_layout = QVBoxLayout()
        filter_layout.setContentsMargins(5, 5, 5, 5) # 减少边距
        filter_layout.setSpacing(5) # 减少间距
        
        # 第一行：筛选条件 (期数 + 日期)
        h1 = QHBoxLayout()
        h1.setContentsMargins(0, 0, 0, 0)
        
        # 期数筛选
        h1.addWidget(QLabel("<b>期数:</b>"))
        self.combo_period_presets = QComboBox()
        self.combo_period_presets.addItems(["自定义", "近100期", "近500期", "近1000期", "全部"])
        self.combo_period_presets.setCurrentText("近500期")
        h1.addWidget(self.combo_period_presets)
        
        self.spin_custom_period = QSpinBox()
        self.spin_custom_period.setRange(10, 100000)
        self.spin_custom_period.setValue(500)
        h1.addWidget(self.spin_custom_period)
        
        # 日期筛选
        h1.addWidget(QLabel("<b>日期:</b>"))
        self.combo_days_presets = QComboBox()
        self.combo_days_presets.addItems(["不限", "自定义", "近7天", "近30天", "近90天"])
        self.combo_days_presets.setCurrentText("不限")
        h1.addWidget(self.combo_days_presets)
        
        # 自定义日期范围
        self.date_edit_start = QDateEdit()
        self.date_edit_start.setDisplayFormat("yyyy-MM-dd")
        self.date_edit_start.setCalendarPopup(True)
        self.date_edit_start.setEnabled(False)
        self.date_edit_start.setFixedWidth(100)
        h1.addWidget(self.date_edit_start)
        
        h1.addWidget(QLabel("-"))
        
        self.date_edit_end = QDateEdit()
        self.date_edit_end.setDisplayFormat("yyyy-MM-dd")
        self.date_edit_end.setCalendarPopup(True)
        self.date_edit_end.setDate(QDate.currentDate())
        self.date_edit_end.setEnabled(False)
        self.date_edit_end.setFixedWidth(100)
        h1.addWidget(self.date_edit_end)
        
        # 数据范围提示
        self.lbl_valid_date_range = QLabel("") 
        self.lbl_valid_date_range.setStyleSheet("color: #666; font-size: 11px; margin-left: 5px; font-weight: bold;")
        h1.addWidget(self.lbl_valid_date_range)
        
        # 初始化读取并显示库内范围
        try:
            temp_list = self.data_manager.read_all_local_data()
            if temp_list and len(temp_list) > 0:
                d1_str = temp_list[0]['overt_at'].split()[0]
                d2_str = temp_list[-1]['overt_at'].split()[0]
                
                # 简单比较日期字符串
                if d1_str > d2_str:
                    d1_str, d2_str = d2_str, d1_str
                    
                self.lbl_valid_date_range.setText(f"库内: {d1_str} -> {d2_str}")
        except:
            pass

        # 关联逻辑
        self.combo_period_presets.currentTextChanged.connect(self.on_period_preset_changed)
        self.combo_days_presets.currentTextChanged.connect(self.on_days_preset_changed)
        
        h1.addStretch()
        filter_layout.addLayout(h1)

        # 第二行：显示数量 + 数据量提示 + 刷新按钮
        h2 = QHBoxLayout()
        h2.setContentsMargins(0, 0, 0, 0)
        
        h2.addWidget(QLabel("<b>显示数量:</b>"))
        self.combo_display_presets = QComboBox()
        self.combo_display_presets.addItems(["自定义", "前10位", "前20位", "前50位", "前100位", "全部"])
        self.combo_display_presets.setCurrentText("前20位")
        h2.addWidget(self.combo_display_presets)
        
        self.spin_display_count = QSpinBox()
        self.spin_display_count.setRange(1, 1000)
        self.spin_display_count.setValue(20)
        h2.addWidget(self.spin_display_count)
        
        # 关联逻辑
        self.combo_display_presets.currentTextChanged.connect(self.on_display_preset_changed)
        
        h2.addSpacing(20)
        self.lbl_data_range_hint = QLabel("(数据库共保存 ? 天数据)")
        self.lbl_data_range_hint.setStyleSheet("color: gray; font-size: 11px;")
        h2.addWidget(self.lbl_data_range_hint)
        
        h2.addStretch()
        
        btn_refresh_stats = QPushButton("查询统计")
        btn_refresh_stats.setCursor(Qt.PointingHandCursor)
        btn_refresh_stats.setMinimumHeight(32)
        btn_refresh_stats.setStyleSheet("""
            QPushButton {
                font-weight: bold; 
                font-size: 12px;
                padding: 5px 20px; 
                background-color: #2196F3; 
                color: white; 
                border-radius: 4px;
                border: 1px solid #1976D2;
            }
            QPushButton:hover {
                background-color: #42A5F5;
            }
            QPushButton:pressed {
                background-color: #1976D2;
            }
        """)
        btn_refresh_stats.clicked.connect(self.update_number_stats_display)
        h2.addWidget(btn_refresh_stats)
        
        filter_layout.addLayout(h2)

        # 第三行：高级工具 (查号)
        h_tools = QHBoxLayout()
        h_tools.setContentsMargins(0, 0, 0, 0)
        
        # --- 右侧：号码查询 ---
        search_group = QGroupBox()
        search_layout = QHBoxLayout(search_group)
        search_layout.setContentsMargins(5, 2, 5, 2)
        search_layout.setSpacing(5)
        
        search_layout.addWidget(QLabel("🔍 查号:"))
        self.txt_search_number = QLineEdit()
        self.txt_search_number.setPlaceholderText("号码")
        self.txt_search_number.setFixedWidth(60)
        search_layout.addWidget(self.txt_search_number)
        
        btn_search = QPushButton("查询")
        btn_search.clicked.connect(self.search_number_stats)
        search_layout.addWidget(btn_search)
        
        self.lbl_search_result = QLabel("")
        self.lbl_search_result.setStyleSheet("color: blue; font-weight: bold;")
        search_layout.addWidget(self.lbl_search_result)
        
        h_tools.addWidget(search_group)
        h_tools.addStretch()
        
        filter_layout.addLayout(h_tools)
        
        # Main Splitter: 上下分隔
        stats_main_splitter = QSplitter(Qt.Vertical)
        
        # --- 上半部分：筛选区 ---
        # (filter_group 已经创建好了)

        filter_group.setLayout(filter_layout)
        
        # 添加到 Splitter 上部分
        stats_main_splitter.addWidget(filter_group)
        
        # --- 下半部分：结果区（表格 + 图表） ---
        stats_bottom_widget = QWidget()
        stats_bottom_layout = QVBoxLayout(stats_bottom_widget)
        stats_bottom_layout.setContentsMargins(0, 0, 0, 0)
        
        # 统计结果区（左右分栏）
        results_splitter = QSplitter(Qt.Horizontal)
        
        # 左侧：热门号码
        hot_widget = QWidget()
        hot_layout = QVBoxLayout(hot_widget)
        hot_layout.setContentsMargins(0, 0, 4, 0) # 右边加点间距
        
        h_hot = QHBoxLayout()
        self.lbl_hot_count = QLabel("热门号码 (共显示 0/0)")
        self.lbl_hot_count.setStyleSheet("font-weight: bold; color: red;")
        h_hot.addWidget(self.lbl_hot_count)
        h_hot.addStretch()
        
        self.btn_export_hot = QPushButton("导出")
        self.btn_export_hot.setToolTip("导出当前表格内容到Excel或TXT")
        self.btn_export_hot.clicked.connect(lambda: self.export_stats_table("hot"))
        h_hot.addWidget(self.btn_export_hot)
        hot_layout.addLayout(h_hot)
        
        self.table_hot = QTableWidget()
        self.table_hot.setColumnCount(5)
        self.table_hot.setHorizontalHeaderLabels(["排名", "号码", "次数", "最后出现期号", "最后日期"])
        self.table_hot.horizontalHeader().setStretchLastSection(True)
        hot_layout.addWidget(self.table_hot)
        
        results_splitter.addWidget(hot_widget)
        
        # 右侧：冷门号码
        cold_widget = QWidget()
        cold_layout = QVBoxLayout(cold_widget)
        cold_layout.setContentsMargins(4, 0, 0, 0) # 左边加点间距
        
        h_cold = QHBoxLayout()
        self.lbl_cold_count = QLabel("冷门号码 (共显示 0/0)")
        self.lbl_cold_count.setStyleSheet("font-weight: bold; color: blue;")
        h_cold.addWidget(self.lbl_cold_count)
        h_cold.addStretch()
        
        self.btn_export_cold = QPushButton("导出")
        self.btn_export_cold.setToolTip("导出当前表格内容到Excel或TXT")
        self.btn_export_cold.clicked.connect(lambda: self.export_stats_table("cold"))
        h_cold.addWidget(self.btn_export_cold)
        cold_layout.addLayout(h_cold)
        
        self.table_cold = QTableWidget()
        self.table_cold.setColumnCount(5)
        self.table_cold.setHorizontalHeaderLabels(["排名", "号码", "次数", "最后期号", "最后日期"])
        self.table_cold.horizontalHeader().setStretchLastSection(True)
        cold_layout.addWidget(self.table_cold)
        
        results_splitter.addWidget(cold_widget)
        
        stats_bottom_layout.addWidget(results_splitter)
        
        # 底部图表
        self.stats_figure = Figure(figsize=(8, 3), dpi=100)
        # 调整图表边距，防止X轴标签被遮挡 (Wait until resize or use safe margin)
        self.stats_figure.subplots_adjust(bottom=0.25, top=0.9, left=0.08, right=0.95)
        
        self.stats_canvas = FigureCanvas(self.stats_figure)
        self.stats_canvas.setMinimumSize(100, 150) # 防止压缩过小导致的错误
        self.stats_ax = self.stats_figure.add_subplot(111)
        self.stats_ax.set_title("号码出现频率分布")
        self.stats_ax.set_xlabel("号码排名")
        self.stats_ax.set_ylabel("出现次数")
        self.stats_ax.grid(True, alpha=0.3)
        
        stats_bottom_layout.addWidget(self.stats_canvas)
        
        # 添加下半部分到 Splitter
        stats_main_splitter.addWidget(stats_bottom_widget)
        
        # 设置 Splitter 初始比例 (筛选区固定高度，剩下给结果区)
        stats_main_splitter.setStretchFactor(0, 0)
        stats_main_splitter.setStretchFactor(1, 1)

        stats_layout.addWidget(stats_main_splitter)
        
        self.tabs.addTab(tab_stats, "号码统计")
        # 注意: 不再此处添加到布局，改为在init_ui中统一管理
        # self.simulator_layout.addWidget(self.tabs)
        # self.create_stats_panel() 
    
    def on_tab_changed(self, index):
        """Tab切换回调"""
        tab_text = self.tabs.tabText(index)
        
        # 如果是"设置与号码"或"号码统计"Tab，隐藏整个底部区域(极值+历史)
        # 盈亏图表现在需要显示历史记录，所以从隐藏列表中移除
        should_hide = (tab_text == "设置与号码" or tab_text == "号码统计")
        
        if hasattr(self, 'split_bottom_container') and hasattr(self, 'v_splitter'):
            if should_hide:
                self.split_bottom_container.hide()
            else:
                self.split_bottom_container.show()
                # 检查底部面板高度，如果被压扁了，强制恢复高度
                sizes = self.v_splitter.sizes()
                if len(sizes) == 2:
                    current_bottom_h = sizes[1]
                    total_h = sum(sizes)
                    # 如果底部高度几乎为0 (小于50px)，强制恢复到约 40%-50% 的高度
                    if current_bottom_h < 50:
                        new_top = int(total_h * 0.55)
                        new_bottom = total_h - new_top
                        self.v_splitter.setSizes([new_top, new_bottom])

    # === 浏览器相关功能 ===
    def create_stats_panel(self):
        """创建统计面板 (紧凑版: 双列布局)"""
        """创建统计面板 (紧凑版: 垂直布局+行内水平布局，避免Grid导致过宽)"""
        self.stats_panel_group = QGroupBox("统计信息")
        # 改用 VBox，每行一个 HBox
        main_layout = QVBoxLayout()
        main_layout.setSpacing(4)
        main_layout.setContentsMargins(10, 10, 10, 10)
        
        # --- 第一行: 当前投入 | 单码价格 ---
        h1 = QHBoxLayout()
        h1.addWidget(QLabel("当前投入:"))
        self.lbl_current_input = QLabel("0.00元")
        self.lbl_current_input.setStyleSheet("color: blue; font-weight: bold;")
        h1.addWidget(self.lbl_current_input)
        
        line1 = QFrame()
        line1.setFrameShape(QFrame.VLine)
        line1.setFrameShadow(QFrame.Sunken)
        h1.addWidget(line1)
        
        h1.addWidget(QLabel("单码价格:"))
        self.lbl_unit_price = QLabel("0.00元")
        h1.addWidget(self.lbl_unit_price)
        h1.addStretch() # 靠左对齐，右侧留空
        main_layout.addLayout(h1)
        
        # --- 第二行: 总流水 | 累计盈亏 ---
        h2 = QHBoxLayout()
        h2.addWidget(QLabel("总流水:"))
        self.lbl_total_turnover = QLabel("0.00元")
        self.lbl_total_turnover.setStyleSheet("color: #666;")
        h2.addWidget(self.lbl_total_turnover)
        
        line2 = QFrame()
        line2.setFrameShape(QFrame.VLine)
        line2.setFrameShadow(QFrame.Sunken)
        h2.addWidget(line2)
        
        h2.addWidget(QLabel("累计盈亏:"))
        self.lbl_accumulated_profit = QLabel("+0.00元")
        self.lbl_accumulated_profit.setStyleSheet("color: green; font-size: 14px; font-weight: bold;")
        h2.addWidget(self.lbl_accumulated_profit)
        h2.addStretch()
        main_layout.addLayout(h2)
        
        # --- 第三行: 综合战绩 ---
        h_stats = QHBoxLayout()
        self.lbl_total_rounds = QLabel("总:0")
        h_stats.addWidget(self.lbl_total_rounds)
        h_stats.addSpacing(10)
        
        self.lbl_win_counts = QLabel("中:0")
        self.lbl_win_counts.setStyleSheet("color: green;")
        h_stats.addWidget(self.lbl_win_counts)
        h_stats.addSpacing(10)
        
        self.lbl_loss_counts = QLabel("未:0")
        self.lbl_loss_counts.setStyleSheet("color: red;")
        h_stats.addWidget(self.lbl_loss_counts)
        h_stats.addSpacing(10)
        
        self.lbl_win_rate_new = QLabel("胜率:0.0%")
        self.lbl_win_rate_new.setStyleSheet("font-weight: bold;")
        h_stats.addWidget(self.lbl_win_rate_new)
        h_stats.addStretch()
        main_layout.addLayout(h_stats)
        
        # --- 第四行: 实时胜率 (号码池) ---
        h_ref_rate = QHBoxLayout()
        h_ref_rate.addWidget(QLabel("号码池起始:"))
        self.spin_ref_start_period = QSpinBox()
        self.spin_ref_start_period.setRange(1, 99999999)
        self.spin_ref_start_period.setValue(3380000)
        self.spin_ref_start_period.setFixedWidth(85)
        self.spin_ref_start_period.editingFinished.connect(self.calculate_ref_win_rate_static)
        h_ref_rate.addWidget(self.spin_ref_start_period)
        
        h_ref_rate.addSpacing(5)
        self.lbl_ref_win_rate_dynamic = QLabel("区间胜率: 0.00%")
        self.lbl_ref_win_rate_dynamic.setStyleSheet("color: blue; font-weight: bold;")
        h_ref_rate.addWidget(self.lbl_ref_win_rate_dynamic)
        h_ref_rate.addStretch()
        main_layout.addLayout(h_ref_rate)
        
        # --- 第五行: 胜率止盈设置 ---
        h_ref_stop = QHBoxLayout()
        self.chk_ref_stop_enable = QCheckBox("胜率止盈:")
        self.chk_ref_stop_enable.setToolTip("当'号码池区间胜率'达到设定值时自动停止")
        h_ref_stop.addWidget(self.chk_ref_stop_enable)
        
        h_ref_stop.addWidget(QLabel(">="))
        self.spin_ref_stop_target = QDoubleSpinBox()
        self.spin_ref_stop_target.setRange(1.0, 100.0)
        self.spin_ref_stop_target.setValue(60.00)
        self.spin_ref_stop_target.setSingleStep(0.1)
        self.spin_ref_stop_target.setSuffix("%")
        h_ref_stop.addWidget(self.spin_ref_stop_target)
        h_ref_stop.addStretch()
        main_layout.addLayout(h_ref_stop)
        
        # --- 第六行: 待对冲 ---
        h_hedge = QHBoxLayout()
        h_hedge.addWidget(QLabel("待对冲期数:"))
        self.lbl_hedge_periods = QLabel("0期")
        self.lbl_hedge_periods.setStyleSheet("color: orange; font-weight: bold;")
        h_hedge.addWidget(self.lbl_hedge_periods)
        
        lbl_hint = QLabel("(需连赢此数量才开始递减)")
        lbl_hint.setStyleSheet("color: gray; font-size: 10px;")
        h_hedge.addWidget(lbl_hint)
        h_hedge.addStretch()
        main_layout.addLayout(h_hedge)
        
        group = self.stats_panel_group
        group.setLayout(main_layout)
        # self.simulator_layout.addWidget(group) # 移交init_ui管理

    def calculate_ref_win_rate_static(self):
        """静态计算参考区间胜率 (响应SpinBox修改)"""
        # 如果回测正在运行，这会导致冲突吗？应该不会，因为只是读取
        # 但为了UI流畅，如果正在Backtest，也许应该依赖 on_backtest_record 更新
        if hasattr(self, 'backtest_worker') and self.backtest_worker is not None and self.backtest_worker.isRunning():
             # 如果正在运行，SpinBox修改后可能需要重置 ref_history_xxx? 
             # 暂时不处理运行中的修改，或者简单提示
             return

        start_period = self.spin_ref_start_period.value()
        if not self.my_numbers:
            self.lbl_ref_win_rate_dynamic.setText("请先导入号码")
            return
            
        data_list = self.data_manager.read_all_local_data()
        if not data_list:
            self.lbl_ref_win_rate_dynamic.setText("暂无数据")
            return
            
        target_rounds = 0
        target_wins = 0
        
        try:
            for d in data_list:
                p = int(d['period_no'])
                if p >= start_period:
                    target_rounds += 1
                    code = d['number_overt'].replace(',', '')
                    if code in self.my_numbers:
                        target_wins += 1
            
            rate = (target_wins / target_rounds * 100) if target_rounds > 0 else 0.0
            self.lbl_ref_win_rate_dynamic.setText(f"区间胜率: {rate:.2f}% ({target_wins}/{target_rounds})")
            
        except Exception as e:
            print(f"Static ref calculation error: {e}")
        
    def update_stats_values(self):
        """更新统计面板数据 (对应新UI)"""
        if not hasattr(self, 'bet_results'):
            return
            
        total_rounds = 0
        win_rounds = 0
        total_turnover = 0.0 # 总流水
        current_balance = 0.0 # 累计盈亏
        
        last_bet_amount = 0.0
        
        # 遍历统计
        sorted_periods = sorted(self.bet_results.keys())
        for period in sorted_periods:
            res = self.bet_results[period]
            # 只统计已结算
            if res.get('finished', False) or res.get('profit') is not None:
                total_rounds += 1
                profit = res.get('profit', 0.0)
                bet_amt = res.get('total_bet', 0.0)
                
                total_turnover += bet_amt
                current_balance += profit
                last_bet_amount = bet_amt
                
                if profit > 0:
                    win_rounds += 1
        
        loss_rounds = total_rounds - win_rounds
        
        # 1. 当前投入 (取最后一期的下注额，如果没有则为0)
        # 如果正在运行且下一期已生成订单但未结算? 从bet_results可能拿不到
        # 暂时用"上一期投入"代替，或者读取 spin_unit_bet * num_count
        current_bet = 0.0
        if self.my_numbers:
             current_bet = len(self.my_numbers) * self.spin_unit_bet.value()
        self.lbl_current_input.setText(f"{current_bet:.2f}元")
        
        # 2. 单码价格
        unit_price = self.spin_unit_bet.value()
        self.lbl_unit_price.setText(f"{unit_price:.2f}元")
        
        # 3. 累计盈亏
        prefix = "+" if current_balance >= 0 else ""
        self.lbl_accumulated_profit.setText(f"{prefix}{current_balance:.2f}元")
        if current_balance >= 0:
            self.lbl_accumulated_profit.setStyleSheet("color: green; font-size: 16px; font-weight: bold;")
        else:
            self.lbl_accumulated_profit.setStyleSheet("color: red; font-size: 16px; font-weight: bold;")
            
        # 4. 总流水
        self.lbl_total_turnover.setText(f"{total_turnover:.2f}元")
        
        # 5. 待对冲期数 (估算)
        # 逻辑：如果亏损，需要多少期盈利才能回本？
        # 假设每期不仅回本底注，还能赢一点? 
        # 简单估算：欠款 / (单注 * (赔率/1000 * 995? - 1) * 号码数?) 
        # 假设是单点下注，中奖盈利 = 单注 * 赔率 - 总投入
        # 暂时用: 欠款 / (单注 * 赔率 - 单注) ? 加个大约值
        hedge_periods = 0
        if current_balance < 0:
            debt = abs(current_balance)
            # 估算单期获利能力: 假设中奖能赢多少?
            # 粗略: 假设每期投入 current_bet，若中奖，返还 current_bet * (赔率/号码数)? 不太准
            # 就用简单的: 欠款 / (单注 * 赔率 - 投入)
            payout = self.spin_payout.value()
            # 假设只中一注
            one_win_profit = (unit_price * payout) - current_bet
            if one_win_profit > 0:
                hedge_periods = int(debt / one_win_profit) + 1
            else:
                hedge_periods = 999 # 很难回本
        
        self.lbl_hedge_periods.setText(f"{hedge_periods}期")
        
        # 6. 计数 (带前缀)
        self.lbl_total_rounds.setText(f"总:{total_rounds}")
        self.lbl_win_counts.setText(f"中:{win_rounds}")
        self.lbl_loss_counts.setText(f"未:{loss_rounds}")
        
        # 7. 胜率
        if total_rounds > 0:
            rate = (win_rounds / total_rounds) * 100
            self.lbl_win_rate_new.setText(f"胜率:{rate:.1f}%")
        else:
            self.lbl_win_rate_new.setText("胜率:0.0%")

    def create_history_table(self):
        """创建历史记录表格"""
        self.history_panel_group = QGroupBox("历史记录")
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
        group = self.history_panel_group
        group.setLayout(layout)
        # self.simulator_layout.addWidget(group) # 移交init_ui管理
        
    # === 浏览器相关功能 ===
    
    def load_url(self):
        url = self.url_input.text()
        if not url.startswith('http'):
            url = 'https://' + url
        self.browser.setUrl(QUrl(url))

    def get_config_path(self, filename):
        """获取配置文件的绝对路径"""
        if getattr(sys, 'frozen', False):
            # 如果是打包后的exe，使用exe所在目录
            script_dir = os.path.dirname(sys.executable)
        else:
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
        """验证Token有效性（异步版本，避免启动时阻塞UI）"""
        self.data_manager.set_auth(self.token, self.cookie)
        
        # 启动异步验证Worker
        print("🔍 开始异步验证Token...")
        self.token_validate_worker = TokenValidateWorker(self.data_manager)
        self.token_validate_worker.success_signal.connect(self.on_token_validate_success)
        self.token_validate_worker.failed_signal.connect(self.on_token_validate_failed)
        self.token_validate_worker.start()
    
    def on_token_validate_success(self, remote_latest):
        """Token验证成功回调"""
        print("✅ Token验证成功")
        self.lbl_login_status.setText("已登录 (缓存)")
        self.lbl_login_status.setStyleSheet("color: green; font-weight: bold;")
        
        # 自动收起浏览器
        if self.browser_panel.isVisible():
            self.toggle_browser()
        
        # 同步数据和刷新表格
        self.refresh_data()
        self.update_history_table()
        
        # 自动同步真实账户盈亏
        self.fetch_real_account_history()
    
    def on_token_validate_failed(self):
        """Token验证失败回调"""
        print("⚠️ Token已过期或无效")
        self.lbl_login_status.setText("Token过期")
        self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
        
        # 确保浏览器显示以便用户重新登录
        if not self.browser_panel.isVisible():
            self.toggle_browser()

    def start_background_sync(self):
        """启动后台数据同步（避免UI阻塞）"""
        # 防止重复启动
        if hasattr(self, 'sync_worker') and self.sync_worker.isRunning():
            print("⚠️ 数据同步正在进行中...")
            return
        
        print("🔄 开始后台同步历史数据...")
        self.sync_worker = DataSyncWorker(self.data_manager)
        self.sync_worker.progress_signal.connect(lambda msg: print(msg))
        self.sync_worker.finished_signal.connect(self.on_sync_finished)
        self.sync_worker.start()
    
    def on_sync_finished(self, success):
        """数据同步完成回调"""
        if success:
            print("✅ 历史数据同步完成")
            # 刷新表格显示
            self.update_history_table()
        else:
            print("⚠️ 历史数据同步失败（可能网络问题）")
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
                # 逐行读取以支持过滤注释行和统计表
                numbers = []
                with open(filepath, 'r', encoding='utf-8') as f:
                    for line in f:
                        line = line.strip()
                        # 跳过注释行和空行
                        if not line or line.startswith('#'):
                            continue
                            
                        # 关键修复：检测到统计表头时停止解析，防止重复计数
                        # 匹配 "出现次数" 或 "出现的次数"
                        if "号码" in line and "次数" in line:
                            break
                            
                        # 跳过分隔线
                        if line.startswith('-'):
                            continue
                            
                        # 处理当前行 (替换分隔符)
                        content = line.replace('\n', ',').replace(' ', ',').replace('，', ',').replace('\t', ',')
                        parts = content.split(',')
                        
                        for p in parts:
                            p = p.strip()
                            if p.isdigit() and len(p) == 3:
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
            
        # 新增：询问导出格式 (统一体验)
        msg_box = QMessageBox(self)
        msg_box.setWindowTitle("导出格式")
        msg_box.setText("请选择您希望导出的格式:")
        btn_full = msg_box.addButton("完整表格(含统计)", QMessageBox.ActionRole)
        btn_pure = msg_box.addButton("仅号码(纯数字)", QMessageBox.ActionRole)
        btn_cancel = msg_box.addButton("取消", QMessageBox.RejectRole)
        msg_box.exec_()
        
        if msg_box.clickedButton() == btn_cancel:
            return
        
        is_pure = (msg_box.clickedButton() == btn_pure)
            
        # 2. 选择保存路径
        default_name = f"top_{count}_combinations.txt"
        filepath, _ = QFileDialog.getSaveFileName(self, "保存热门组合", 
                                                default_name, 
                                                "Text Files (*.txt)")
        if not filepath:
            return
            
        # 3. 调用生成脚本
        try:
            # 动态导入以避免循环依赖或启动加载
            import generate_top_combinations
            # 重新加载模块以确保获取最新代码 (如果修改了py文件)
            import importlib
            importlib.reload(generate_top_combinations)
            
            success, msg = generate_top_combinations.export_top_combinations(filepath, count, is_pure)
            
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

    def export_stats_table(self, type_str):
        """导出统计表格数据 (完整CSV报表)"""
        try:
            if type_str == "hot":
                table = self.table_hot
                default_name = f"hot_numbers_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
                title = "热门号码统计"
            else:
                table = self.table_cold
                default_name = f"cold_numbers_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
                title = "冷门号码统计"
            
            # 直接导出CSV，不询问纯数字
            filepath, _ = QFileDialog.getSaveFileName(self, f"导出{title}", default_name, "CSV Files (*.csv)")
            if not filepath:
                return
                
            rows = table.rowCount()
            cols = table.columnCount()
            
            with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
                import csv
                writer = csv.writer(f)
                
                # 写入表头
                headers = [table.horizontalHeaderItem(c).text() for c in range(cols)]
                writer.writerow(headers)
                
                # 写入数据
                for r in range(rows):
                    row_data = []
                    for c in range(cols):
                        item = table.item(r, c)
                        text = item.text() if item else ""
                        row_data.append(text)
                    writer.writerow(row_data)
                    
            QMessageBox.information(self, "成功", f"表格导出成功!\\n路径: {filepath}")
            
        except Exception as e:
            QMessageBox.critical(self, "导出失败", f"发生错误: {e}")

    def export_custom_cold_numbers(self):
        """根据定义导出冷门号码"""
        try:
            # 1. 获取参数
            period_limit = self.spin_cold_period.value()
            threshold_percent = self.spin_cold_percent.value()
            export_count = self.spin_cold_quantity.value()
            
            # 2. 获取数据
            data_list = self.data_manager.read_all_local_data()
            if not data_list:
                QMessageBox.warning(self, "警告", "暂无历史数据")
                return
                
            # 截取最近N期
            if len(data_list) > period_limit:
                target_data = data_list[-period_limit:] # 取最后N期 (最新)
            else:
                target_data = data_list
                
            actual_periods = len(target_data)
            
            # 3. 统计频率 (修正版：统计三位组合而非单个数字)
            counts = {}
            for d in target_data:
                num_str = d.get('number_overt', '').replace(',', '').replace(' ', '').strip()
                # 确保是3位数字 (例如 "1,2,3" -> "123")
                if len(num_str) == 3 and num_str.isdigit():
                     counts[num_str] = counts.get(num_str, 0) + 1
                elif len(num_str) > 3:
                     # 容错: 尝试取前3位? 或者忽略
                     pass
                
            # 补全0-999所有号码
            all_numbers = []
            for i in range(1000):
                num_str = f"{i:03d}"
                freq = counts.get(num_str, 0)
                freq_rate = (freq / actual_periods) * 100
                all_numbers.append({
                    "num": num_str,
                    "count": freq,
                    "rate": freq_rate
                })
                
            # 4. 筛选 (按照频率升序排列: 越冷越前)
            all_numbers.sort(key=lambda x: x["count"])
            
            # 过滤：仅保留出现率低于阈值的
            filtered_numbers = [x for x in all_numbers if x["rate"] < threshold_percent]
            
            # 如果筛选结果不足，可选提示或全部输出
            if not filtered_numbers:
                reply = QMessageBox.question(self, "提示", 
                    f"在最近 {actual_periods} 期中，没有号码出现率低于 {threshold_percent}%。\n是否直接导出最冷的 {export_count} 个?",
                    QMessageBox.Yes | QMessageBox.No)
                if reply == QMessageBox.Yes:
                    filtered_numbers = all_numbers # 用全部
                else:
                    return

            # 5. 截取数量
            final_list = filtered_numbers[:min(export_count, len(filtered_numbers))]
            
            # 6. 导出 (统一询问)
            msg_box = QMessageBox(self)
            msg_box.setWindowTitle("导出格式")
            msg_box.setText("请选择您希望导出的格式:")
            btn_full = msg_box.addButton("完整表格(含统计)", QMessageBox.ActionRole)
            btn_pure = msg_box.addButton("仅号码(纯数字)", QMessageBox.ActionRole)
            btn_cancel = msg_box.addButton("取消", QMessageBox.RejectRole)
            msg_box.exec_()
            
            if msg_box.clickedButton() == btn_cancel:
                return
            
            is_pure = (msg_box.clickedButton() == btn_pure)
            
            default_name = f"custom_cold_p{period_limit}_r{threshold_percent}_{datetime.now().strftime('%H%M%S')}.txt"
            filepath, _ = QFileDialog.getSaveFileName(self, "导出自定义冷门", default_name, "Text Files (*.txt)")
            
            if not filepath:
                return
                
            with open(filepath, 'w', encoding='utf-8') as f:
                # 写入号码 (逗号分隔)
                nums_only = [x['num'] for x in final_list]
                
                # 检查是否为纯数字模式
                if is_pure:
                    f.write(", ".join(nums_only))
                else:
                    # 写入头部信息
                    f.write(f"# 自定义冷门导出\n")
                    f.write(f"# 统计周期: 近 {actual_periods} 期\n")
                    f.write(f"# 筛选条件: 出现率 < {threshold_percent}%\n")
                    f.write(f"# 导出数量: {len(final_list)} 个\n")
                    f.write("-" * 30 + "\n")
                    
                    f.write(", ".join(nums_only))
                    f.write("\n\n")
                    f.write("-" * 30 + "\n")
                    
                    # 写入详细分析
                    f.write("号码\t\t出现次数\t出现率(%)\n")
                    for item in final_list:
                        f.write(f"{item['num']}\t\t{item['count']}\t\t{item['rate']:.2f}%\n")
                    
            QMessageBox.information(self, "成功", f"成功导出 {len(final_list)} 个冷门号码！")
            
            # 询问导入
            reply = QMessageBox.question(self, "导入", "是否立即将这些冷门号码导入到模拟器？", QMessageBox.Yes | QMessageBox.No)
            if reply == QMessageBox.Yes:
                self.import_from_txt(filepath)
                
        except Exception as e:
            QMessageBox.critical(self, "错误", f"导出失败: {e}")

    def place_real_bet(self, period, unit_bet):
        """执行真实投注（异步版本，避免下注时阻塞UI）"""
        if not self.my_numbers:
            return
            
        # 防止同一期重复下单/弹窗
        if self.last_bet_period == period:
            return
        self.last_bet_period = period
        
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

        # 使用异步Worker发送请求（避免阻塞UI）
        self.log_run(f"🚀 准备下单: 期号={period}, 总额={total_money}")
        
        self.betting_worker = BettingWorker(self.token, self.cookie, period, self.my_numbers, unit_bet)
        self.betting_worker.success_signal.connect(self.on_betting_success)
        self.betting_worker.error_signal.connect(self.on_betting_error)
        self.betting_worker.balance_low_signal.connect(self.on_betting_balance_low)
        self.betting_worker.start()
    
    def on_betting_success(self, period, msg):
        """下注成功回调"""
        total_money = len(self.my_numbers) * self.spin_unit_bet.value()
        self.log_run(f"✅ 下单成功: {msg}")
        self.statusBar().showMessage(f"✅ 第{period}期下单成功! 总额: {total_money}", 5000)
    
    def on_betting_error(self, error_msg):
        """下注错误回调"""
        self.log_run(f"❌ 下单失败: {error_msg}")
        QMessageBox.warning(self, "下单失败", error_msg)
    
    def on_betting_balance_low(self):
        """余额不足回调"""
        self.log_run(f"❌ 信用余额不足，停止自动投注！")
        QMessageBox.critical(self, "余额不足", "信用余额不足，自动投注已停止！")
        if self.is_running:
            self.toggle_simulation()  # 停止

    def fetch_real_account_history(self):
        """同步真实账户历史盈亏（异步版本）"""
        # 防止重复启动
        if hasattr(self, 'account_sync_worker') and self.account_sync_worker.isRunning():
            self.log_run("⚠️ 账单同步正在进行中...")
            return
        
        self.log_run("🔄 开始同步真实账户历史账单...")
        self.btn_sync_profit.setEnabled(False)
        self.btn_sync_profit.setText("同步中...")
        
        # 启动异步线程
        self.account_sync_worker = AccountSyncWorker(self.token, self.cookie)
        self.account_sync_worker.progress_signal.connect(self.log_run)
        self.account_sync_worker.finished_signal.connect(self.on_account_sync_finished)
        self.account_sync_worker.error_signal.connect(self.on_account_sync_error)
        self.account_sync_worker.start()
    
    def on_account_sync_finished(self, total_profit, real_bet_results):
        """账单同步完成回调"""
        # 更新数据
        self.real_bet_results = real_bet_results
        
        self.log_run(f"✅ 同步完成! 历史总盈亏: {total_profit:.2f}")
        self.lbl_real_profit.setText(f"真实账户盈亏: {total_profit:.2f}")
        self.lbl_real_profit_header.setText(f"{total_profit:.2f}")
        
        # 同步完成后刷新表格和图表
        self.update_history_table()
        self.update_chart()
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
        
        self.btn_sync_profit.setEnabled(True)
        self.btn_sync_profit.setText("同步真实盈亏")
    
    def on_account_sync_error(self, error_msg):
        """账单同步错误回调"""
        self.log_run(f"❌ {error_msg}")
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
            # 记忆当前注码作为底注
            self.base_bet_memory = self.spin_unit_bet.value()
            self.log_run(f"🏁 开始运行，设定回本底注为: {self.base_bet_memory}")
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
        if hasattr(self, 'countdown_target_monotonic'):
            remaining = int(self.countdown_target_monotonic - time.monotonic())
            if remaining < 0: remaining = 0
            mins, secs = divmod(remaining, 60)
            self.lbl_countdown.setText(f"{mins:02d}:{secs:02d}")
            
        # 2. 定期同步数据 (每5秒) - 添加防抖和Token检查
        if not hasattr(self, '_last_refresh_time'):
            self._last_refresh_time = 0
        
        current_time = time.time()
        # 防抖：确保至少间隔5秒 + Token有效才刷新
        if (current_time - self._last_refresh_time) >= 5.0 and self.token:
            self._last_refresh_time = current_time
            self.refresh_data()
            
    def refresh_data(self):
        """刷新数据（完全异步版本，避免阻塞UI）"""
        if not self.token:
            return
        
        # 性能优化：防止并发刷新导致请求堆积和UI卡顿
        if self.is_refreshing_data:
            return
        
        # 优化: 如果正在同步数据，跳过本次刷新避免重复触发
        if hasattr(self, 'sync_worker') and self.sync_worker.isRunning():
            return

        # 检查是否已有Worker在运行
        if hasattr(self, 'realtime_worker') and self.realtime_worker.isRunning():
            return

        # 标记开始刷新
        self.is_refreshing_data = True
        
        # 启动异步Worker获取实时数据
        self.realtime_worker = RealtimeDataWorker(self.data_manager)
        self.realtime_worker.success_signal.connect(self.on_realtime_data_success)
        self.realtime_worker.failed_signal.connect(self.on_realtime_data_failed)
        self.realtime_worker.start()
    
    def on_realtime_data_success(self, realtime_data):
        """实时数据获取成功回调"""
        try:
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
                    
                    # 使用后台线程同步（避免UI阻塞）
                    self.start_background_sync()
                    
                    # 获取完整的本地数据来处理 (因为 p_period 信息不全，缺赔率等)
                    latest_local = self.data_manager.get_local_latest()
                    if latest_local and latest_local.get('period_no') == last_period:
                        if self.is_running:
                            self.process_new_draw(latest_local)
                        self.last_processed_period = last_period
                        self.update_history_table()
        finally:
            # 重置刷新标志
            self.is_refreshing_data = False
    
    def on_realtime_data_failed(self, error_msg):
        """实时数据获取失败回调（优化：区分网络错误和Token过期）"""
        try:
            # 只有在明确是认证问题时才标记Token过期
            # 网络超时、JSON解析错误等不应该改变登录状态
            is_auth_error = False
            
            # 检查是否是认证相关的错误
            if "401" in error_msg or "403" in error_msg or "unauthorized" in error_msg.lower():
                is_auth_error = True
            
            # 只在确认是认证错误时才更新登录状态
            if is_auth_error:
                self.lbl_login_status.setText("Token已过期")
                self.lbl_login_status.setStyleSheet("color: red; font-weight: bold;")
                
                if not self.token_expired_logged:
                    self.log_run("⚠️ Token已过期或无效，请在浏览器中重新登录")
                    self.token_expired_logged = True
                
                # 自动弹出浏览器面板
                if not self.browser_panel.isVisible():
                    self.toggle_browser()
            else:
                # 临时网络问题，不改变登录状态，只记录日志
                # 不频繁记录，避免日志刷屏
                pass
        finally:
            # 重置刷新标志
            self.is_refreshing_data = False
            
    def toggle_backtest_pause(self):
        """暂停/恢复回测 (同步两个按钮状态)"""
        if not hasattr(self, 'backtest_worker') or self.backtest_worker is None:
            return
            
        sender = self.sender()
        is_paused = sender.isChecked()
        
        # 同步另一个按钮
        other_btn = None
        if sender == self.btn_pause_backtest and hasattr(self, 'btn_chart_pause'):
             other_btn = self.btn_chart_pause
        elif hasattr(self, 'btn_chart_pause') and sender == self.btn_chart_pause:
             other_btn = self.btn_pause_backtest
             
        if other_btn:
            other_btn.blockSignals(True)
            other_btn.setChecked(is_paused)
            other_btn.blockSignals(False)
        
        # 执行逻辑
        if is_paused:
            self.backtest_worker.pause()
            
            style = "background-color: orange; color: black;"
            text = "▶ 继续"
            
            self.btn_pause_backtest.setText(text)
            self.btn_pause_backtest.setStyleSheet(style)
            if hasattr(self, 'btn_chart_pause'):
                self.btn_chart_pause.setText(text)
                self.btn_chart_pause.setStyleSheet(style)
        else:
            self.backtest_worker.resume()
            
            style = ""
            text = "⏸ 暂停"
            
            self.btn_pause_backtest.setText(text)
            self.btn_pause_backtest.setStyleSheet(style)
            if hasattr(self, 'btn_chart_pause'):
                self.btn_chart_pause.setText(text)
                self.btn_chart_pause.setStyleSheet(style)

    def request_stop_backtest(self, force=False):
        """请求停止回测"""
        if hasattr(self, 'backtest_worker') and self.backtest_worker is not None and self.backtest_worker.isRunning():
            if not force:
                reply = QMessageBox.question(self, "停止回测", "确定要停止当前回测吗？", QMessageBox.Yes | QMessageBox.No)
                if reply != QMessageBox.Yes:
                    return

            # 执行停止
            self.backtest_worker.resume() # 假如暂停中，先恢复以便它能退出循环
            self.backtest_worker.stop()
            self.btn_backtest.setText("正在停止...")
            self.btn_backtest.setEnabled(False)
            # 同步图表页面的按钮
            if hasattr(self, 'btn_chart_start'):
                self.btn_chart_start.setText("正在停止...")
                self.btn_chart_start.setEnabled(False)

    def start_backtest(self):
        """开始/停止回测"""
        # 1. 检查是否正在运行，如果是则停止
        if hasattr(self, 'backtest_worker') and self.backtest_worker is not None and self.backtest_worker.isRunning():
            self.request_stop_backtest()
            return

        # --- 开始回测流程 ---
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
            'stop_loss_val': self.spin_stop_loss.value(),
        }
        
        # 准备UI
        # self.btn_backtest.setEnabled(False) -> 改为由Stop逻辑控制
        self.btn_backtest.setText("⏹ 停止回测")
        self.btn_backtest.setStyleSheet("background-color: #f44336; color: white;") # 红色 Stop 样式
        # 同步图表页面的按钮
        if hasattr(self, 'btn_chart_start'):
            self.btn_chart_start.setText("⏹ 停止回测")
            self.btn_chart_start.setStyleSheet("background-color: #f44336; color: white;")
            
        self.txt_backtest_result.setText("正在回测中，请稍候...\n(表格和图表将实时更新)")
        
        # 清空图表和表格
        self.table.setRowCount(0)
        self.ax.clear()
        self.canvas.draw()
        
        # === 计算参考区间的"历史"数据 (Backtest Start之前) ===
        self.ref_history_wins = 0
        self.ref_history_rounds = 0
        self.ref_current_wins = 0
        self.ref_current_rounds = 0
        
        ref_start = self.spin_ref_start_period.value()
        try:
            if data_list: # Use data_list for reference, not test_data
                # 确定本次回测的起始期号 (BacktestWorker是从 test_data[0] 开始跑吗? enumerate(self.data_list))
                # 是的。
                test_start_p = int(test_data[0]['period_no'])
                
                for d in data_list:
                    p = int(d['period_no'])
                    if p >= ref_start and p < test_start_p:
                         self.ref_history_rounds += 1
                         code = d['number_overt'].replace(',', '')
                         if code in self.my_numbers:
                             self.ref_history_wins += 1
        except Exception as e:
            print(f"Ref stats error: {e}")
        # ==================================================
        
        # 启动线程
        self.backtest_worker = BacktestWorker(params, test_data, self.my_numbers)
        self.backtest_worker.record_generated.connect(self.on_backtest_record)
        self.backtest_worker.finished_signal.connect(self.on_backtest_finished)
        self.backtest_worker.error_signal.connect(lambda err: QMessageBox.critical(self, "错误", f"回测出错: {err}"))
        self.backtest_worker.start()
        
        # === 修复：启用按钮 (重要) ===
        self.btn_pause_backtest.setEnabled(True)
        self.btn_pause_backtest.setChecked(False)
        self.btn_pause_backtest.setText("⏸ 暂停")
        self.btn_pause_backtest.setStyleSheet("")
        
        if hasattr(self, 'btn_chart_pause'):
             self.btn_chart_pause.setEnabled(True)
             self.btn_chart_pause.setChecked(False)
             self.btn_chart_pause.setText("⏸ 暂停")
             self.btn_chart_pause.setStyleSheet("")
             
        if hasattr(self, 'btn_chart_start'):
             self.btn_chart_start.setEnabled(True)
        # ===========================
        
        # 临时存储回测数据用于绘图
        self.backtest_profits = []
        self.backtest_records = [] # 清空旧记录
        self.backtest_running_turnover = 0.0 # 重置总流水
        
        # 禁用导出和还原按钮
        self.btn_export_backtest.setEnabled(False)
        self.btn_restore_view.setEnabled(False)
        
        # 禁用胜率止盈设置 (防止回测过程中修改)
        self.chk_ref_stop_enable.setEnabled(False)
        self.spin_ref_stop_target.setEnabled(False)

    def on_backtest_record(self, record):
        """处理回测实时记录"""
        # 0. 存储记录
        self.backtest_records.append(record)
        
        # 1. 更新表格 (插入到第一行)
        self.table.insertRow(0)
        self.table.setItem(0, 0, QTableWidgetItem(record['period']))
        self.table.setItem(0, 1, QTableWidgetItem(record.get('draw_time', '--'))) # 时间
        self.table.setItem(0, 2, QTableWidgetItem(f"{record['draw_code']}")) # 开奖号码
        self.table.setItem(0, 3, QTableWidgetItem(f"{record['bet']:.2f}"))   # 投入
        self.table.setItem(0, 4, QTableWidgetItem(f"{record['unit_bet']:.2f}")) # 单注
        
        item_result = QTableWidgetItem("中奖" if record['is_win'] else "未中")
        item_result.setForeground(QColor("green") if record['is_win'] else QColor("red"))
        self.table.setItem(0, 5, item_result)
        
        item_profit = QTableWidgetItem(f"{record['profit']:+.2f}")
        item_profit.setForeground(QColor("red") if record['profit'] < 0 else QColor("green"))
        self.table.setItem(0, 6, item_profit)
        
        item_total = QTableWidgetItem(f"{record['total_profit']:+.2f}")
        item_total.setForeground(QColor("red") if record['total_profit'] < 0 else QColor("green"))
        self.table.setItem(0, 7, item_total)
        
        # 更新显示 (不再更新头部盈亏,头部只显示真实账户盈亏)
        
        # 3. 更新统计面板 (新UI)
        self.lbl_current_input.setText(f"{record['bet']:.2f}元")
        self.lbl_unit_price.setText(f"{record['unit_bet']:.2f}元")
    
        # 3.1 更新参考区间胜率 (Real-Time Ref Stats)
        if hasattr(self, 'ref_history_rounds'):
            self.ref_current_rounds += 1
            if record['is_win']:
                self.ref_current_wins += 1
                
            total_ref_r = self.ref_history_rounds + self.ref_current_rounds
            total_ref_w = self.ref_history_wins + self.ref_current_wins
            
            ref_rate = (total_ref_w / total_ref_r * 100) if total_ref_r > 0 else 0.0
            self.lbl_ref_win_rate_dynamic.setText(f"区间胜率: {ref_rate:.2f}% ({total_ref_w}/{total_ref_r})")

            # 检查区间胜率止盈 (Move from Worker to UI Thread for accuracy with Ref Stats)
            if self.chk_ref_stop_enable.isChecked():
                 target_rate = self.spin_ref_stop_target.value()
                 if ref_rate >= target_rate:
                      # 只触发一次，避免重复弹窗
                      if hasattr(self, 'backtest_worker') and self.backtest_worker.isRunning():
                           # 使用 force=True 跳过确认弹窗
                           self.request_stop_backtest(force=True)
                           QMessageBox.information(self, "止盈触发", f"号码池区间胜率 ({ref_rate:.2f}%) 已达到目标 ({target_rate}%)，停止回测。")
                           self.txt_backtest_result.append(f"\n[提示] 胜率止盈触发: {ref_rate:.2f}% >= {target_rate}%")

        # 累计盈亏
        total_profit = record['total_profit']
        prefix = "+" if total_profit >= 0 else ""
        self.lbl_accumulated_profit.setText(f"{prefix}{total_profit:.2f}元")
        if total_profit >= 0:
            self.lbl_accumulated_profit.setStyleSheet("color: green; font-size: 16px; font-weight: bold;")
        else:
            self.lbl_accumulated_profit.setStyleSheet("color: red; font-size: 16px; font-weight: bold;")
            
        # 简单计算累计数据 (或者从worker传递更佳，但这里为了快速修复先自行累加)
        # 实际上 BacktestWorker 的 record 包含了一些统计? 
        # 暂时只更新关键的，其他可以通过 len(self.backtest_records) 计算
        total_rounds = len(self.backtest_records)
        win_rounds = sum(1 for r in self.backtest_records if r['is_win'])
        loss_rounds = total_rounds - win_rounds
        win_rate = (win_rounds / total_rounds * 100) if total_rounds > 0 else 0.0
        
        self.lbl_total_rounds.setText(f"总:{total_rounds}")
        self.lbl_win_counts.setText(f"中:{win_rounds}")
        self.lbl_loss_counts.setText(f"未:{loss_rounds}")
        self.lbl_win_rate_new.setText(f"胜率:{win_rate:.1f}%")
        
        # 总流水 (需累加)
        # 性能优化: 可以在类属性中维护一个 running_turnover，而不是每次 sum
        if not hasattr(self, 'backtest_running_turnover'):
            self.backtest_running_turnover = 0.0
        self.backtest_running_turnover += record['bet']
        self.lbl_total_turnover.setText(f"{self.backtest_running_turnover:.2f}元")
        
        # 待对冲 (估算)
        hedge_periods = 0
        if total_profit < 0:
            debt = abs(total_profit)
            current_bet = record['bet']
            unit_price = record['unit_bet']
            payout = self.spin_payout.value() # 使用当前赔率设定
            one_win_profit = (unit_price * payout) - current_bet
            if one_win_profit > 0:
                hedge_periods = int(debt / one_win_profit) + 1
            else:
                hedge_periods = 999
        self.lbl_hedge_periods.setText(f"{hedge_periods}期")
        
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
        # 恢复绿色样式
        self.btn_backtest.setStyleSheet("background-color: #4CAF50; color: white;")
        
        # 重置暂停按钮
        self.btn_pause_backtest.setEnabled(False)
        self.btn_pause_backtest.setChecked(False)
        self.btn_pause_backtest.setText("⏸ 暂停")
        self.btn_pause_backtest.setStyleSheet("")
        
        if hasattr(self, 'btn_chart_pause'):
            self.btn_chart_pause.setEnabled(False)
            self.btn_chart_pause.setChecked(False)
            self.btn_chart_pause.setText("⏸ 暂停")
            self.btn_chart_pause.setStyleSheet("")
            
        # 重置图表页开始按钮
        if hasattr(self, 'btn_chart_start'):
            self.btn_chart_start.setText("开始回测")
            self.btn_chart_start.setStyleSheet("background-color: #4CAF50; color: white;")
            self.btn_chart_start.setEnabled(True)
        
        self.btn_export_backtest.setEnabled(True)
        self.btn_restore_view.setEnabled(True)
        
        # 恢复胜率止盈设置
        self.chk_ref_stop_enable.setEnabled(True)
        self.spin_ref_stop_target.setEnabled(True)
        
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
        
        # 实时更新号码统计（新增功能）
        self.update_number_stats_display()
        
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
            self.lbl_debt.setText("0.00")
            self.current_debt = 0.0
            
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
    
    # === 号码冷热统计功能 ===
    
    def calculate_number_stats(self, start_period=None, end_period=None, days=None, start_date=None, end_date=None):
        """
        计算号码统计
        
        Args:
            start_period: 起始期号（可选）
            end_period: 结束期号（可选）
            days: 最近N天（可选，优先级高于期号，但低于具体日期）
            start_date: 开始日期 YYYY-MM-DD (可选)
            end_date: 结束日期 YYYY-MM-DD (可选)
        """
        # 获取所有历史数据
        data_list = self.data_manager.read_all_local_data()
        
        # 更新冷门导出界面的提示信息
        if hasattr(self, 'lbl_cold_hint') and data_list:
            count = len(data_list)
            self.lbl_cold_hint.setText(f"(库内共 {count} 期, 日均≈402)")
            
        if not data_list:
            return {}
        
        # 按日期筛选
        if start_date or end_date:
             filtered_data = []
             for d in data_list:
                 date_str = d['overt_at'].split()[0]
                 if start_date and date_str < start_date:
                     continue
                 if end_date and date_str > end_date:
                     continue
                 filtered_data.append(d)
             data_list = filtered_data
        elif days:
            from datetime import datetime, timedelta
            cutoff_date = datetime.now() - timedelta(days=days)
            data_list = [d for d in data_list 
                        if datetime.strptime(d['overt_at'].split()[0], '%Y-%m-%d') >= cutoff_date]
        # 按期号筛选
        else:
            if start_period:
                data_list = [d for d in data_list if int(d['period_no']) >= start_period]
            if end_period:
                data_list = [d for d in data_list if int(d['period_no']) <= end_period]
        
        # 统计号码出现次数
        stats = {}
        for data in data_list:
            number = data['number_overt'].replace(',', '')
            if number not in stats:
                stats[number] = {'count': 0, 'last_appear': None, 'last_date': None}
            
            stats[number]['count'] += 1
            stats[number]['last_appear'] = data['period_no']
            stats[number]['last_date'] = data['overt_at'].split()[0] if 'overt_at' in data else None
        
        return stats
    
    def get_hot_numbers(self, limit=20, **kwargs):
        """
        获取热门号码（出现频率高）
        
        Args:
            limit: 返回前N个，None表示全部
            **kwargs: 传递给calculate_number_stats的参数
        
        Returns:
            list: [(number, stats), ...] 按出现次数降序
        """
        stats = self.calculate_number_stats(**kwargs)
        if not stats:
            return []
        
        # 按出现次数降序排序
        sorted_stats = sorted(stats.items(), key=lambda x: x[1]['count'], reverse=True)
        
        if limit:
            return sorted_stats[:limit]
        return sorted_stats
    
    def get_cold_numbers(self, limit=20, **kwargs):
        """
        获取冷门号码（出现频率低）
        
        Args:
            limit: 返回前N个，None表示全部
            **kwargs: 传递给calculate_number_stats的参数
        
        Returns:
            list: [(number, stats), ...] 按出现次数升序
        """
        stats = self.calculate_number_stats(**kwargs)
        if not stats:
            return []
        
        # 按出现次数升序排序
        sorted_stats = sorted(stats.items(), key=lambda x: x[1]['count'])
        
        if limit:
            return sorted_stats[:limit]
        return sorted_stats
    
    def on_display_preset_changed(self, text):
        """显示数量下拉框变更回"""
        if text == "全部":
            self.spin_display_count.setValue(1000)
        elif text == "自定义":
            pass
        else:
            try:
                val = int(text.replace("前", "").replace("位", ""))
                self.spin_display_count.setValue(val)
            except:
                pass

    def on_period_preset_changed(self, text):
        """期数下拉框变更"""
        if text == "全部":
            self.spin_custom_period.setEnabled(False)
        elif text == "自定义":
            self.spin_custom_period.setEnabled(True)
        else:
            self.spin_custom_period.setEnabled(True)
            try:
                val = int(text.replace("近", "").replace("期", ""))
                self.spin_custom_period.setValue(val)
            except:
                pass
                
    def on_days_preset_changed(self, text):
        """日期下拉框变更"""
        today = QDate.currentDate()
        self.date_edit_end.setDate(today)
        
        if text == "不限":
            self.date_edit_start.setEnabled(False)
            self.date_edit_end.setEnabled(False)
        elif text == "自定义":
            self.date_edit_start.setEnabled(True)
            self.date_edit_end.setEnabled(True)
            # 自动填充库内范围
            data_list = self.data_manager.read_all_local_data()
            if data_list:
                try:
                    # 假设 [0] 是最新，[-1] 是最老
                    latest_str = data_list[0]['overt_at'].split()[0]
                    oldest_str = data_list[-1]['overt_at'].split()[0]
                    
                    # 简单验证日期格式
                    if "-" in latest_str and "-" in oldest_str:
                         # 确保 d1 < d2
                         d1 = QDate.fromString(oldest_str, "yyyy-MM-dd")
                         d2 = QDate.fromString(latest_str, "yyyy-MM-dd")
                         if d1 > d2: d1, d2 = d2, d1
                         
                         self.date_edit_start.setDate(d1)
                         self.date_edit_end.setDate(d2)
                except Exception as e:
                    print(f"Auto set date range error: {e}")
        else:
            self.date_edit_start.setEnabled(False) 
            self.date_edit_end.setEnabled(False) # 预设模式下禁用编辑，只显示
            try:
                days = int(text.replace("近", "").replace("天", ""))
                start_date = today.addDays(-(days - 1))
                self.date_edit_start.setDate(start_date)
            except:
                pass



    def search_number_stats(self):
        """查询指定号码出现次数"""
        target_num = self.txt_search_number.text().strip()
        if not target_num:
            return
            
        # 复用当前的统计结果（只是为了重用计算逻辑，其实可以单独计算）
        # 改为：无论当前筛选如何，查询都基于"全部历史数据"
        # kwargs = self.get_current_filter_kwargs()
        stats = self.calculate_number_stats() # 不传参即为全部数据
        
        if target_num in stats:
            count = stats[target_num]['count']
            last_appear = stats[target_num].get('last_appear', '--')
            self.lbl_search_result.setText(f"历史总计出现 {count} 次 (最近: {last_appear})")
        else:
            self.lbl_search_result.setText("历史数据中未出现")

    def get_current_filter_kwargs(self):
        """获取当前筛选参数"""
        data_list = self.data_manager.read_all_local_data()
        if not data_list:
            return {}
            
        kwargs = {}
        latest_period = int(data_list[0]['period_no'])
        
        # 1. 检查日期筛选 (优先级高)
        days_selection = self.combo_days_presets.currentText()
        if days_selection != "不限":
            kwargs['start_date'] = self.date_edit_start.date().toString("yyyy-MM-dd")
            kwargs['end_date'] = self.date_edit_end.date().toString("yyyy-MM-dd")
        else:
            # 2. 检查期数筛选 (只有日期不限时才生效)
            period_selection = self.combo_period_presets.currentText()
            if period_selection == "全部":
                 pass # 不传参即全部
            else:
                 count = self.spin_custom_period.value()
                 kwargs['start_period'] = latest_period - (count - 1)
                 
        return kwargs

    def update_number_stats_display(self):
        """更新号码统计显示"""
        # 获取所有数据用于计算范围
        data_list = self.data_manager.read_all_local_data()
        if not data_list or len(data_list) == 0:
            self.lbl_data_range_hint.setText("(暂无数据)")
            return

        # 更新数据范围提示
        try:
            # 假设 list[0] 是最新，list[-1] 是最老
            latest_date_str = data_list[0].get('overt_at', '').split()[0]
            oldest_date_str = data_list[-1].get('overt_at', '').split()[0]
            
            if latest_date_str and oldest_date_str:
                d1 = datetime.strptime(latest_date_str, "%Y-%m-%d")
                d2 = datetime.strptime(oldest_date_str, "%Y-%m-%d")
                
                # 确保大减小
                if d1 < d2:
                    d1, d2 = d2, d1
                    
                days_diff = (d1 - d2).days + 1
                self.lbl_data_range_hint.setText(f"(数据库共保存 {days_diff} 天数据)")
        except Exception as e:
            print(f"计算日期范围出错: {e}")

        # 确定筛选条件
        kwargs = self.get_current_filter_kwargs()
        
        # 获取显示数量
        # display_text = self.combo_display_count.currentText()
        # if display_text == "全部":
        #    limit = None
        # else:
        #    limit = int(display_text.replace("前", "").replace("位", ""))
        limit = self.spin_display_count.value()
        
        # 获取热门和冷门号码
        hot_numbers = self.get_hot_numbers(limit=limit, **kwargs)
        cold_numbers = self.get_cold_numbers(limit=limit, **kwargs)
        
        # 计算总号码数（用于显示计数）
        total_stats = self.calculate_number_stats(**kwargs)
        total_count = len(total_stats)
        
        # 更新热门号码表格
        self.table_hot.setRowCount(len(hot_numbers))
        for i, (number, stats) in enumerate(hot_numbers):
            self.table_hot.setItem(i, 0, QTableWidgetItem(str(i + 1)))
            self.table_hot.setItem(i, 1, QTableWidgetItem(number))
            self.table_hot.setItem(i, 2, QTableWidgetItem(str(stats['count'])))
            self.table_hot.setItem(i, 3, QTableWidgetItem(stats['last_appear'] or '--'))
            self.table_hot.setItem(i, 4, QTableWidgetItem(stats['last_date'] or '--'))
        
        # 更新冷门号码表格
        self.table_cold.setRowCount(len(cold_numbers))
        for i, (number, stats) in enumerate(cold_numbers):
            self.table_cold.setItem(i, 0, QTableWidgetItem(str(i + 1)))
            self.table_cold.setItem(i, 1, QTableWidgetItem(number))
            self.table_cold.setItem(i, 2, QTableWidgetItem(str(stats['count'])))
            self.table_cold.setItem(i, 3, QTableWidgetItem(stats['last_appear'] or '--'))
            self.table_cold.setItem(i, 4, QTableWidgetItem(stats['last_date'] or '--'))
        
        # 更新计数标签
        self.lbl_hot_count.setText(f"热门号码 (共显示 {len(hot_numbers)}/{total_count})")
        self.lbl_cold_count.setText(f"冷门号码 (共显示 {len(cold_numbers)}/{total_count})")
        
        # 绘制图表（显示前50个热门号码的分布）
        self.stats_ax.clear()
        if hot_numbers:
            display_hot = hot_numbers[:min(50, len(hot_numbers))]
            numbers = [n[0] for n in display_hot]
            counts = [n[1]['count'] for n in display_hot]
            
            x_pos = range(len(numbers))
            rects = self.stats_ax.bar(x_pos, counts, color='#FF6B6B', alpha=0.7)
            
            # 设置X轴标签为实际号码
            self.stats_ax.set_xticks(x_pos)
            self.stats_ax.set_xticklabels(numbers, rotation=90, fontsize=8)
            
            # 在柱状图上方显示数值
            for rect in rects:
                height = rect.get_height()
                self.stats_ax.text(rect.get_x() + rect.get_width()/2., height,
                        '%d' % int(height),
                        ha='center', va='bottom', fontsize=8)

            self.stats_ax.set_xlabel('号码')
            self.stats_ax.set_ylabel('出现次数')
            self.stats_ax.set_title(f'热门号码出现频率分布 (前{len(display_hot)}位)')
            self.stats_ax.grid(True, alpha=0.3)
            
        self.stats_canvas.draw()

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
        
        # 6. 动态注码调整 (金额回本策略)
        if is_win:
            # 赢了：先还债
            if self.current_debt > 0:
                self.current_debt -= profit # profit是正数
                if self.current_debt < 0: self.current_debt = 0
                
                if self.current_debt > 0:
                    self.log_run(f"🛡️ 赢且回血: 本期赢 {profit:.2f}, 剩余欠款 {self.current_debt:.2f}")
                    
                    # 赢了也要递减 (D'Alembert策略 / 用户要求的阶梯回落)
                    increase_fixed = self.spin_increase_fixed.value()
                    decrease_rate = self.spin_decrease_rate.value() / 100.0
                    
                    new_unit_bet = unit_bet
                    
                    # 1. 扣除固定加注部分
                    fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
                    if fixed_per_code > 0:
                        new_unit_bet -= fixed_per_code
                        
                    # 2. 扣除比例递减 (如果设置了赢-递减)
                    if decrease_rate > 0:
                        new_unit_bet = new_unit_bet * (1 - decrease_rate)
                        
                    # 3. 兜底: 不能低于底注
                    if new_unit_bet < self.base_bet_memory:
                        new_unit_bet = self.base_bet_memory
                    if new_unit_bet < 0.1: new_unit_bet = 0.1 # 硬底
                    
                    self.spin_unit_bet.setValue(new_unit_bet)
                    # self.log_run(f"   ↳ 注码回落至: {new_unit_bet:.2f}")
                else:
                    # 债还清了，重置回底注
                    self.log_run(f"🎉 欠款已还清! 注码重置回 {self.base_bet_memory:.2f}")
                    self.spin_unit_bet.setValue(self.base_bet_memory)
            else:
                # 本来就没债，正常递减或保持底注
                decrease_rate = self.spin_decrease_rate.value() / 100.0
                new_unit_bet = unit_bet * (1 - decrease_rate)
                # 不能低于底注
                if new_unit_bet < self.base_bet_memory: new_unit_bet = self.base_bet_memory
                if new_unit_bet < 0.1: new_unit_bet = 0.1
                
                self.spin_unit_bet.setValue(new_unit_bet)
                # self.log_run(f"📉 赢且递减: {unit_bet:.2f} -> {new_unit_bet:.2f}")
        else:
            # 输了：记账并递增
            # profit是负数, abs(profit)是亏损额
            loss_amount = abs(profit)
            self.current_debt += loss_amount
            
            increase_rate = self.spin_increase_rate.value() / 100.0
            increase_fixed = self.spin_increase_fixed.value()
            
            # 计算新的总投入目标
            fixed_per_code = increase_fixed / len(self.my_numbers) if self.my_numbers else 0
            new_unit_bet = unit_bet * (1 + increase_rate) + fixed_per_code
            
            self.log_run(f"📈 输且递增: {unit_bet:.2f} -> {new_unit_bet:.2f} (新增欠款 {loss_amount:.2f} -> 总欠 {self.current_debt:.2f})")
            
            # 检查最高单注限制
            if self.chk_max_unit_bet.isChecked():
                max_val = self.spin_max_unit_bet.value()
                if new_unit_bet > max_val:
                    new_unit_bet = max_val
                    self.log_run(f"⚠️ 触发最高单注限制: {max_val}")
            
            self.spin_unit_bet.setValue(new_unit_bet)
            
        # 更新欠款状态显示
        self.lbl_debt.setText(f"{self.current_debt:.2f}")
        if self.current_debt > 0:
            self.lbl_debt.setStyleSheet("color: red; font-weight: bold;")
        else:
            self.lbl_debt.setStyleSheet("color: green; font-weight: bold;")
            
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
        
        # 顺便更新冷门导出界面的提示信息
        if hasattr(self, 'lbl_cold_hint') and data_list:
            count = len(data_list)
            self.lbl_cold_hint.setText(f"(库内共 {count} 期, 日均≈402)")
            
        # 顺便更新极值和胜率
        self.update_stats_values()
        
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

# === 全局配置 (放在 import 之后, App 初始化之前) ===
# 根据运行环境智能配置浏览器引擎参数
import platform

system_platform = platform.system()

if getattr(sys, 'frozen', False):
    # 打包后的exe：禁用GPU以保证兼容性（解决部分笔记本黑屏问题）
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--no-sandbox --disable-gpu --disable-software-rasterizer"
    print("🔧 [打包模式] 已禁用GPU加速（兼容模式）")
elif system_platform == "Darwin":  # macOS
    # macOS系统：禁用GPU加速以避免段错误（PyQt5 WebEngine已知问题）
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--no-sandbox --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage"
    print("🍎 [macOS模式] 已禁用GPU加速（兼容模式，避免段错误）")
else:
    # Windows/Linux源码运行：仅禁用沙盒，保留GPU加速（性能模式）
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--no-sandbox"
    print("🚀 [开发模式] 已启用GPU加速（性能模式）")

if __name__ == "__main__":
    # 高分屏适配
    QApplication.setAttribute(Qt.AA_EnableHighDpiScaling)
    QApplication.setAttribute(Qt.AA_UseHighDpiPixmaps)
    
    # OpenGL上下文共享（仅Windows/Linux，macOS上可能导致段错误）
    if system_platform != "Darwin":
        QApplication.setAttribute(Qt.AA_ShareOpenGLContexts)
    
    # 动态调试模式:如果有 --debug 参数，则开启控制台和日志
    if "--debug" in sys.argv:
        try:
            import ctypes
            # 分配控制台窗口
            ctypes.windll.kernel32.AllocConsole()
            # 重定向标准输出到新控制台
            sys.stdout = open("CONOUT$", "w", encoding='utf-8')
            sys.stderr = open("CONOUT$", "w", encoding='utf-8')
            print("🐛 调试模式已启动 (Console Attached)")
            
            # 开启日志系统
            setup_logging()
            
            # 恢复 matplotlib 日志 (如果在 setup_logging 里被屏蔽了，这里可以根据需要放开)
            # logging.getLogger('matplotlib').setLevel(logging.DEBUG) 
            
        except Exception as e:
            pass # 即使失败也不影响主程序启动

    # --- 启动前进行授权验证 ---
    from license_manager import LicenseManager
    from activate_dialog import ActivateDialog
    
    # 0. 强制联网检查
    if not LicenseManager.check_network():
        # 这里需要创建一个临时的app来显示弹窗，或者直接用 ctypes 弹原生窗，或者print后退出
        # 为了用户体验，尝试弹窗
        app = QApplication(sys.argv)
        QMessageBox.critical(None, "错误", "本软件必须联网才能运行！\n请检查您的网络连接。")
        sys.exit(0)
    
    # 1. 尝试读取本地Key
    saved_key = LicenseManager.load_license()
    valid = False
    
    if saved_key:
        # 验证是否过期
        is_ok, msg, expire = LicenseManager.verify_key(saved_key)
        if is_ok:
            valid = True
            print(f"✅ 授权验证通过: {msg}")
        else:
            print(f"❌ 授权已失效: {msg}")
            
    # 2. 如果未验证通过，显示激活窗口
    if not valid:
        # 设置高分屏 (必须在QApplication创建之前)
        QApplication.setAttribute(Qt.AA_EnableHighDpiScaling)
        QApplication.setAttribute(Qt.AA_UseHighDpiPixmaps)
        
        app = QApplication(sys.argv) # 激活窗口需要app实例
        
        dialog = ActivateDialog()
        # 这里需要 QDialog，上面import加上或者直接用 dialog.Accepted (如果有的话)
        # 最好是在头部加上 from PyQt5.QtWidgets import QDialog
        # 或者直接比较 int 值 (Accepted=1)
        if dialog.exec_() != 1: # QDialog.Accepted == 1
            sys.exit(0) # 用户取消或者是关闭了窗口，直接退出
            
        # 如果激活成功，继续向下执行 (重新创建App实例可能需要注意，但通常可以直接复用或继续)
        # 注意: 上面已经创建了app，下面不要重复创建
    
    # --- 授权通过，启动主程序 ---
    
    # 如果上面没有创建app (即直接验证通过了)，这里创建
    # 如果上面创建了 (因为弹出了激活窗)，这里复用
    if not QApplication.instance():
        # 设置高分屏 (验证通过的路径也需要设置)
        QApplication.setAttribute(Qt.AA_EnableHighDpiScaling)
        QApplication.setAttribute(Qt.AA_UseHighDpiPixmaps)
        app = QApplication(sys.argv)
    else:
        app = QApplication.instance()
        
    window = Canada28Simulator()
    window.show()
    sys.exit(app.exec_())
