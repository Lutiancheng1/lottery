"""
简单Token提取器 - 只包含浏览器和token提取
"""
import sys
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QPushButton, QLabel, QLineEdit, 
                             QTextEdit, QMessageBox, QGroupBox)
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEngineProfile
from PyQt5.QtWebEngineCore import QWebEngineUrlRequestInterceptor
from PyQt5.QtCore import QUrl, pyqtSlot
import json


class TokenInterceptor(QWebEngineUrlRequestInterceptor):
    """拦截网络请求，提取token"""
    def __init__(self, parent=None):
        super().__init__(parent)
        self.token = ""
        self.cookie = ""
        
    def interceptRequest(self, info):
        """拦截请求"""
        # 获取请求头
        headers = {}
        
        # 尝试获取token（从请求头中）
        # 注意：QWebEngineUrlRequestInterceptor不能直接读取headers
        # 我们需要用JavaScript从页面中提取
        pass


class TokenExtractorWindow(QMainWindow):
    """Token提取器主窗口"""
    
    def __init__(self):
        super().__init__()
        self.init_ui()
        
    def init_ui(self):
        self.setWindowTitle("Token提取器 - 登录后自动提取Token")
        self.setGeometry(100, 100, 1200, 800)
        
        # 中央widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # 顶部工具栏
        toolbar = QHBoxLayout()
        
        toolbar.addWidget(QLabel("网址:"))
        self.url_input = QLineEdit("http://s1.pk999p.xyz/")
        toolbar.addWidget(self.url_input)
        
        go_btn = QPushButton("访问")
        go_btn.clicked.connect(self.load_url)
        toolbar.addWidget(go_btn)
        
        refresh_btn = QPushButton("刷新")
        refresh_btn.clicked.connect(self.refresh_page)
        toolbar.addWidget(refresh_btn)
        
        extract_btn = QPushButton("🔑 提取Token")
        extract_btn.clicked.connect(self.extract_token)
        extract_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                font-weight: bold;
                font-size: 14px;
                padding: 8px 15px;
                border-radius: 5px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        toolbar.addWidget(extract_btn)
        
        layout.addLayout(toolbar)
        
        # 浏览器
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("http://s1.pk999p.xyz/"))
        layout.addWidget(self.browser)
        
        # 提取结果区域
        result_group = QGroupBox("提取结果")
        result_layout = QVBoxLayout()
        
        # Token
        token_layout = QHBoxLayout()
        token_layout.addWidget(QLabel("Token:"))
        self.token_display = QLineEdit()
        self.token_display.setReadOnly(True)
        self.token_display.setPlaceholderText("登录后点击'提取Token'按钮...")
        token_layout.addWidget(self.token_display)
        
        copy_token_btn = QPushButton("📋 复制Token")
        copy_token_btn.clicked.connect(self.copy_token)
        token_layout.addWidget(copy_token_btn)
        result_layout.addLayout(token_layout)
        
        # Cookie
        cookie_layout = QHBoxLayout()
        cookie_layout.addWidget(QLabel("Cookie:"))
        self.cookie_display = QLineEdit()
        self.cookie_display.setReadOnly(True)
        self.cookie_display.setPlaceholderText("登录后自动获取...")
        cookie_layout.addWidget(self.cookie_display)
        
        copy_cookie_btn = QPushButton("📋 复制Cookie")
        copy_cookie_btn.clicked.connect(self.copy_cookie)
        cookie_layout.addWidget(copy_cookie_btn)
        result_layout.addLayout(cookie_layout)
        
        result_group.setLayout(result_layout)
        layout.addWidget(result_group)
        
        # 状态和说明
        self.status_label = QLabel(
            "💡 使用说明：\n"
            "1. 在浏览器中登录网站\n"
            "2. 登录成功后，点击'提取Token'按钮\n"
            "3. Token和Cookie会显示在下方，可以点击复制按钮使用"
        )
        self.status_label.setStyleSheet("""
            QLabel {
                padding: 10px;
                background-color: #e3f2fd;
                border-radius: 5px;
                color: #1976d2;
            }
        """)
        layout.addWidget(self.status_label)
        
    def load_url(self):
        """加载URL"""
        url = self.url_input.text()
        if not url.startswith('http'):
            url = 'https://' + url
        self.browser.setUrl(QUrl(url))
        
    def refresh_page(self):
        """刷新页面"""
        self.browser.reload()
        
    def extract_token(self):
        """提取token和cookie"""
        self.status_label.setText("⏳ 正在提取token和cookie...")
        self.status_label.setStyleSheet("padding: 10px; background-color: #fff9c4; color: #f57f17; border-radius: 5px;")
        
        # 执行JavaScript提取token
        js_code = """
        (function() {
            var result = {
                token: '',
                cookies: document.cookie
            };
            
            // 方法1: 从localStorage获取
            try {
                result.token = localStorage.getItem('token') || '';
            } catch(e) {}
            
            // 方法2: 从sessionStorage获取
            if (!result.token) {
                try {
                    result.token = sessionStorage.getItem('token') || '';
                } catch(e) {}
            }
            
            // 方法3: 从全局变量获取
            if (!result.token && typeof window.token !== 'undefined') {
                result.token = window.token;
            }
            
            // 方法4: 尝试从页面元素中查找
            if (!result.token) {
                var scripts = document.getElementsByTagName('script');
                for (var i = 0; i < scripts.length; i++) {
                    var content = scripts[i].textContent || scripts[i].innerText;
                    var match = content.match(/token['"\\s]*[:=]['"\\s]*([^'",\\s]+)/i);
                    if (match && match[1]) {
                        result.token = match[1];
                        break;
                    }
                }
            }
            
            return JSON.stringify(result);
        })();
        """
        
        def handle_result(result_json):
            try:
                result = json.loads(result_json)
                token = result.get('token', '')
                cookies = result.get('cookies', '')
                
                if token:
                    self.token_display.setText(token)
                    self.cookie_display.setText(cookies)
                    self.status_label.setText(
                        f"✓ 成功提取！\n"
                        f"Token: {token[:30]}...\n"
                        f"Cookie: {len(cookies)} 字符"
                    )
                    self.status_label.setStyleSheet("padding: 10px; background-color: #c8e6c9; color: #2e7d32; border-radius: 5px;")
                    
                    # 显示成功消息
                    QMessageBox.information(self, "成功", 
                        f"✓ 成功提取Token!\n\n"
                        f"Token长度: {len(token)} 字符\n"
                        f"Cookie长度: {len(cookies)} 字符\n\n"
                        f"您可以点击'复制'按钮使用")
                else:
                    self.status_label.setText(
                        "⚠️ 未找到Token\n\n"
                        "可能的原因：\n"
                        "1. 还未登录\n"
                        "2. Token存储方式不同\n\n"
                        "请尝试：\n"
                        "- 先登录网站\n"
                        "- 按F12打开开发者工具查看Network请求\n"
                        "- 在Request Headers中找到token字段"
                    )
                    self.status_label.setStyleSheet("padding: 10px; background-color: #ffccbc; color: #d84315; border-radius: 5px;")
                    
                    # 显示帮助消息
                    QMessageBox.warning(self, "未找到Token", 
                        "自动提取失败！\n\n"
                        "手动获取方法：\n"
                        "1. 按F12打开开发者工具\n"
                        "2. 切换到Network（网络）标签\n"
                        "3. 刷新页面或进行任意操作\n"
                        "4. 点击任意请求（通常是API请求）\n"
                        "5. 在Request Headers中找到'token'字段\n"
                        "6. 复制token值使用")
                        
            except Exception as e:
                self.status_label.setText(f"❌ 处理结果时出错: {e}")
                self.status_label.setStyleSheet("padding: 10px; background-color: #ffccbc; color: #c62828; border-radius: 5px;")
        
        self.browser.page().runJavaScript(js_code, handle_result)
    
    def copy_token(self):
        """复制token到剪贴板"""
        token = self.token_display.text()
        if token:
            clipboard = QApplication.clipboard()
            clipboard.setText(token)
            QMessageBox.information(self, "成功", "✓ Token已复制到剪贴板！")
        else:
            QMessageBox.warning(self, "警告", "没有可复制的Token！")
    
    def copy_cookie(self):
        """复制cookie到剪贴板"""
        cookie = self.cookie_display.text()
        if cookie:
            clipboard = QApplication.clipboard()
            clipboard.setText(cookie)
            QMessageBox.information(self, "成功", "✓ Cookie已复制到剪贴板！")
        else:
            QMessageBox.warning(self, "警告", "没有可复制的Cookie！")


def main():
    app = QApplication(sys.argv)
    app.setStyle('Fusion')
    
    # 设置应用图标（可选）
    window = TokenExtractorWindow()
    window.show()
    
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()
