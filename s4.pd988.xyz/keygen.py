
import sys
from PyQt5.QtWidgets import (QApplication, QWidget, QVBoxLayout, QLabel, 
                             QLineEdit, QPushButton, QComboBox, QMessageBox, QTextEdit)
from PyQt5.QtCore import Qt
from license_manager import LicenseManager

class KeyGenApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("加拿大大28 - 注册机 (管理员用)")
        self.resize(500, 400)
        self.init_ui()
        
    def init_ui(self):
        layout = QVBoxLayout()
        
        layout.addWidget(QLabel("1.这是给管理员用的工具，请勿发给客户"))
        layout.addWidget(QLabel("2.客户运行程序会看到【机器码】，复制给你填入下面"))
        
        layout.addWidget(QLabel("客户机器码:"))
        self.txt_machine = QLineEdit()
        self.txt_machine.setPlaceholderText("例如: A1B2-C3D4-E5F6-7890")
        layout.addWidget(self.txt_machine)
        
        layout.addWidget(QLabel("授权时长:"))
        self.combo_days = QComboBox()
        self.combo_days.addItem("1 天 (试用)", 1)
        self.combo_days.addItem("30 天 (月卡)", 30)
        self.combo_days.addItem("90 天 (季卡)", 90)
        self.combo_days.addItem("365 天 (年卡)", 365)
        self.combo_days.addItem("9999 天 (永久)", 9999)
        self.combo_days.setEditable(True) # 允许手填天数
        layout.addWidget(self.combo_days)
        
        btn_gen = QPushButton("生成激活码")
        btn_gen.setMinimumHeight(40)
        btn_gen.setStyleSheet("background-color: #4CAF50; color: white; font-weight: bold;")
        btn_gen.clicked.connect(self.generate)
        layout.addWidget(btn_gen)
        
        layout.addWidget(QLabel("生成的激活码 (发给客户):"))
        self.txt_key = QTextEdit()
        self.txt_key.setReadOnly(True)
        layout.addWidget(self.txt_key)
        
        # 快捷复制按钮
        btn_copy = QPushButton("📋 复制激活码到剪贴板")
        btn_copy.clicked.connect(self.copy_key)
        layout.addWidget(btn_copy)
        
        self.setLayout(layout)
        
    def generate(self):
        code = self.txt_machine.text().strip()
        if not code:
            QMessageBox.warning(self, "提示", "请输入客户的机器码")
            return
            
        try:
            days = int(self.combo_days.currentText().split()[0])
        except:
            # 如果是手填的
            try:
                days = int(self.combo_days.currentText())
            except:
                days = 365
                
        # 调用生成逻辑
        try:
            key = LicenseManager.generate_key(code, days)
            self.txt_key.setText(key)
            
            # copy to clipboard
            clipboard = QApplication.clipboard()
            clipboard.setText(key)
            QMessageBox.information(self, "成功", f"激活码生成成功！\n已复制到剪贴板。\n有效期: {days}天")
        except Exception as e:
            QMessageBox.critical(self, "错误", str(e))
            
    def copy_key(self):
        key = self.txt_key.toPlainText()
        if key:
            clipboard = QApplication.clipboard()
            clipboard.setText(key)
            QMessageBox.information(self, "成功", "已复制到剪贴板")
        else:
            QMessageBox.warning(self, "提示", "请先生成激活码")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = KeyGenApp()
    win.show()
    sys.exit(app.exec_())
