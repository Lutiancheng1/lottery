import requests
import json
import time

def test_api(cookie):
    base_url = "http://f5.ab311c.com"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie
    }
    
    session = requests.Session()
    
    endpoints = [
        ("/member/index/init", "初始化接口 (POST)", "POST", {}),
        ("/member/index/init", "初始化接口 (GET)", "GET", {}),
        ("/member/index/userInfo", "用户信息接口 (POST)", "POST", {}),
        ("/member/index/new/open", "最新开奖接口 (POST)", "POST", {}),
        ("/member/settingStage/page", "历史记录接口 (POST)", "POST", {"current": 1, "size": 10, "stage": ""}),
    ]
    
    print(f"🚀 开始测试 API: {base_url}")
    print(f"🍪 使用 Cookie: {cookie[:20]}...")
    print("-" * 50)
    
    for path, desc, method, payload in endpoints:
        url = f"{base_url}{path}"
        print(f"🔍 测试: {desc} ({path})")
        try:
            if method == "POST":
                res = session.post(url, json=payload, headers=headers, timeout=10)
            else:
                res = session.get(url, headers=headers, timeout=10)
                
            print(f"   状态码: {res.status_code}")
            if res.status_code == 200:
                try:
                    data = res.json()
                    print(f"   响应代码: {data.get('code')}")
                    print(f"   响应消息: {data.get('msg')}")
                    if 'data' in data:
                        data_str = json.dumps(data['data'], indent=4, ensure_ascii=False)
                        print(f"   数据预览: {data_str[:200]}...")
                except:
                    print(f"   响应内容 (非JSON): {res.text[:100]}...")
            else:
                print(f"   ❌ 请求失败: {res.text[:100]}")
        except Exception as e:
            print(f"   ❌ 发生异常: {e}")
        print("-" * 50)

if __name__ == "__main__":
    # 使用用户提供的新 Cookie
    cookie = "BMW=MTc2ODgxNjc2NXxEWDhFQVFMX2dBQUJFQUVRQUFCOF80QUFCQVp6ZEhKcGJtY01DQUFHZFd4bGRtVnNBMmx1ZEFRQ0FBNEdjM1J5YVc1bkRBd0FDbU52WkdWV1pYSnBabmtGYVc1ME5qUUVCZ0Q4MHR3QTVnWnpkSEpwYm1jTUNnQUliR3gxYzJWeVNXUUVkV2x1ZEFZRUFQNGRXd1p6ZEhKcGJtY01Cd0FGYzNOemFXUUZhVzUwTmpRRUJnRDgwdHdBLWc9PXzdtK3cwteVVHANCto_6HsmfNudl97PR1rBYhd1XPSNtQ=="
    test_api(cookie)
