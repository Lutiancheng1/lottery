
import sys
from PyQt5.QtWidgets import (QDialog, QVBoxLayout, QLabel, QLineEdit, QPushButton, QMessageBox, QHBoxLayout)
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont, QIcon
from license_manager import LicenseManager

class ActivateDialog(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("软件激活 - 加拿大28模拟器")
        self.setFixedSize(450, 300)
        self.setWindowFlags(self.windowFlags() & ~Qt.WindowContextHelpButtonHint) # 去掉问号
        
        self.setup_ui()
        
    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setSpacing(15)
        layout.setContentsMargins(30, 30, 30, 30)
        
        # 标题
        title = QLabel("欢迎使用")
        title.setFont(QFont("Microsoft YaHei", 16, QFont.Bold))
        title.setAlignment(Qt.AlignCenter)
        layout.addWidget(title)
        
        # 机器码显示
        machine_code = LicenseManager.get_machine_code()
        
        lbl_code_title = QLabel("您的机器码 (请复制发给管理员):")
        layout.addWidget(lbl_code_title)
        
        h_code = QHBoxLayout()
        self.txt_code = QLineEdit(machine_code)
        self.txt_code.setReadOnly(True)
        self.txt_code.setFont(QFont("Consolas", 11))
        self.txt_code.setStyleSheet("background-color: #f0f0f0; padding: 5px;")
        h_code.addWidget(self.txt_code)
        
        btn_copy = QPushButton("复制")
        btn_copy.setFixedWidth(60)
        btn_copy.clicked.connect(self.copy_code)
        h_code.addWidget(btn_copy)
        layout.addLayout(h_code)
        
        # 激活码输入
        layout.addWidget(QLabel("请输入激活码:"))
        self.txt_key = QLineEdit()
        self.txt_key.setPlaceholderText("粘贴激活码到这里...")
        self.txt_key.setStyleSheet("padding: 5px;")
        layout.addWidget(self.txt_key)
        
        # 激活按钮
        self.btn_activate = QPushButton("立即激活")
        self.btn_activate.setMinimumHeight(40)
        self.btn_activate.setStyleSheet("""
            QPushButton {
                background-color: #2196F3; 
                color: white; 
                font-size: 14px; 
                font-weight: bold;
                border-radius: 4px;
            }
            QPushButton:hover { background-color: #1976D2; }
        """)
        self.btn_activate.clicked.connect(self.do_activate)
        layout.addWidget(self.btn_activate)
        
        self.setLayout(layout)
        
    def copy_code(self):
        self.txt_code.selectAll()
        self.txt_code.copy()
        QMessageBox.information(self, "提示", "机器码已复制！")
        
    def do_activate(self):
        key = self.txt_key.text().strip()
        if not key:
            QMessageBox.warning(self, "提示", "请输入激活码")
            return
            
        is_valid, msg, expire = LicenseManager.verify_key(key)
        
        if is_valid:
            LicenseManager.save_license(key)
            QMessageBox.information(self, "成功", f"激活成功！\n{msg}")
            self.accept() # 关闭弹窗，返回成功
        else:
            QMessageBox.critical(self, "错误", msg)
