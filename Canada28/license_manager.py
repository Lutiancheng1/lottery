
import os
import sys
import hashlib
import base64
import datetime
import subprocess
import platform

# 混淆盐值 (请勿泄露给用户)
SALT = "CANADA28_VIP_SECRET_888"

class LicenseManager:
    @staticmethod
    def get_machine_code():
        """获取机器特征码 (跨平台支持)"""
        uuid = None
        system = platform.system()
        
        try:
            if system == "Windows":
                # Windows: 使用 WMIC 获取 UUID
                cmd = "wmic csproduct get uuid"
                uuid = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL).decode().split('\n')[1].strip()
            elif system == "Darwin":  # macOS
                # macOS: 使用 system_profiler 获取硬件 UUID
                cmd = "system_profiler SPHardwareDataType | grep 'Hardware UUID'"
                output = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL).decode()
                uuid = output.split(':')[1].strip()
            else:  # Linux 或其他系统
                # 尝试读取 /etc/machine-id
                try:
                    with open('/etc/machine-id', 'r') as f:
                        uuid = f.read().strip()
                except:
                    pass
                    
            # 如果 UUID 为空，使用 MAC 地址作为备用
            if not uuid:
                import uuid as py_uuid
                uuid = str(py_uuid.getnode())
        except:
            # 最终备用方案: MAC地址
            import uuid as py_uuid
            uuid = str(py_uuid.getnode())
            
        # 对原始UUID进行Hash简化，生成短码 (例如 E4F9-A2C1)
        hash_val = hashlib.md5((uuid + "SALT_1").encode()).hexdigest().upper()
        return f"{hash_val[:4]}-{hash_val[4:8]}-{hash_val[8:12]}-{hash_val[12:16]}"

    @staticmethod
    def generate_key(machine_code, days=365):
        """
        生成激活码 (管理员用)
        格式: Base64( "过期日期|签名" )
        签名 = MD5(机器码 + 过期日期 + SALT)
        """
        # 1. 计算过期日期
        today = datetime.date.today()
        expire_date = today + datetime.timedelta(days=days)
        expire_str = expire_date.strftime("%Y%m%d") # 20251231
        
        # 2. 生成签名
        sign_raw = f"{machine_code}{expire_str}{SALT}"
        signature = hashlib.md5(sign_raw.encode()).hexdigest().upper()[:8] # 取前8位作为签名
        
        # 3. 组合并编码
        # 原始串: 20251231|SIGNATURE
        plain_key = f"{expire_str}|{signature}"
        
        # Base64编码，避免直接看穿
        key_b64 = base64.b64encode(plain_key.encode()).decode()
        return key_b64

    @staticmethod
    def get_network_date():
        """获取网络时间 (北京时间)"""
        try:
            import urllib.request
            # 使用百度，访问速度快且稳定
            # 仅做 HEAD 请求，减少流量
            req = urllib.request.Request("http://www.baidu.com", method='HEAD')
            with urllib.request.urlopen(req, timeout=5) as response:
                date_str = response.headers['Date']
                # 解析 HTTP 日期格式 (e.g., "Fri, 17 Jan 2026 12:00:00 GMT")
                import email.utils
                parsed_ts = email.utils.parsedate(date_str)
                # 转为 datetime (UTC)
                dt_utc = datetime.datetime(*parsed_ts[:6])
                # +8 小时转北京时间
                dt_bj = dt_utc + datetime.timedelta(hours=8)
                return dt_bj.date()
        except:
            return None

    @staticmethod
    def verify_key(key):
        """
        验证激活码 (强制校对网络时间)
        Returns: (is_valid, message, expire_date_str)
        """
        if not key:
            return False, "请输入激活码", None
            
        try:
            # 1. 解码
            plain_key = base64.b64decode(key.encode()).decode()
            if "|" not in plain_key:
                return False, "激活码格式错误", None
                
            expire_str, signature = plain_key.split("|")
            
            # 2. 验证签名 (防篡改日期)
            machine_code = LicenseManager.get_machine_code()
            sign_raw = f"{machine_code}{expire_str}{SALT}"
            cal_signature = hashlib.md5(sign_raw.encode()).hexdigest().upper()[:8]
            
            if signature != cal_signature:
                # 签名不匹配 (可能是别的机器的码，或者是日期被改了)
                return False, "激活码无效 (机器码不匹配)", None
                
            # 3. 验证日期 (防过期) - 使用网络时间
            expire_date = datetime.datetime.strptime(expire_str, "%Y%m%d").date()
            
            # 获取网络时间
            today = LicenseManager.get_network_date()
            if not today:
                return False, "网络连接失败，无法验证时效", None
            
            days_left = (expire_date - today).days
            
            if days_left < 0:
                return False, f"激活码已过期 ({expire_str})", expire_str
                
            return True, f"验证成功 (有效期至 {expire_str})", expire_str
            
        except Exception as e:
            return False, "非法激活码", None

    @staticmethod
    def _get_license_path():
        """获取唯一的License路径 (存放在AppData, 避免误删, 跨平台支持)"""
        import os
        system = platform.system()
        
        if system == "Windows":
            # Windows: C:\Users\xxx\AppData\Roaming
            app_data = os.getenv('APPDATA')
        elif system == "Darwin":  # macOS
            # macOS: ~/Library/Application Support
            app_data = os.path.expanduser('~/Library/Application Support')
        else:  # Linux
            # Linux: ~/.config
            app_data = os.path.expanduser('~/.config')
        
        if not app_data:
            # 如果仍然获取失败，使用用户主目录
            app_data = os.path.expanduser('~')
            
        save_dir = os.path.join(app_data, "Canada28Simulator")
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        return os.path.join(save_dir, "license.key")

    @staticmethod
    def save_license(key):
        """保存激活码到本地"""
        try:
            path = LicenseManager._get_license_path()
            with open(path, "w") as f:
                f.write(key)
            # 尝试隐藏文件 (Windows)
            try:
                import ctypes
                ctypes.windll.kernel32.SetFileAttributesW(path, 2) # FILE_ATTRIBUTE_HIDDEN = 2
            except:
                pass
        except:
            pass
            
    @staticmethod
    def load_license():
        """读取本地激活码"""
        path = LicenseManager._get_license_path()
        if os.path.exists(path):
            with open(path, "r") as f:
                return f.read().strip()
        return None
        
    @staticmethod
    def check_network():
        """检查网络连接 (强制联网)"""
        try:
            # 尝试连接百度 (中国用户常用) 和 1.1.1.1 (国际)
            import socket
            sock = socket.create_connection(("www.baidu.com", 80), timeout=3)
            sock.close()
            return True
        except:
            try:
                import socket
                sock = socket.create_connection(("1.1.1.1", 53), timeout=3)
                sock.close()
                return True
            except:
                return False
