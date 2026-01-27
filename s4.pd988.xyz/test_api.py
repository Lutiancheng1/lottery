import requests
import json
import time

def test_api(cookie):
    base_url = "https://s4.pd988.xyz"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie
    }
    
    session = requests.Session()
    ts = int(time.time() * 1000)
    
    endpoints = [
        ("/initHome?awaken=180", "首页初始化 (GET)", "GET", {}),
        ("/refresh", "刷新最新开奖 (POST)", "POST", {}),
        (f"/initUserInfo?_={ts}", "用户信息 (GET)", "GET", {}),
        ("/page/lottery/showHistoryLottery", "历史记录 (POST)", "POST", {"paramMap.pageNum": 1, "paramMap.pageSize": 5, "paramMap.lttnum": ""}),
        ("/queryOrderHistory", "账单记录 (POST)", "POST", {"paramMap.pageNum": 1, "paramMap.pageSize": 5}),
    ]
    
    print(f"START TESTING API: {base_url}")
    print(f"Cookie: {cookie[:20]}...")
    print("-" * 50)
    
    for path, desc, method, payload in endpoints:
        url = f"{base_url}{path}"
        print(f"Testing: {desc} ({path})")
        try:
            if method == "POST":
                # 新站 POST 大多使用 form-data
                res = session.post(url, data=payload, headers=headers, timeout=10)
            else:
                res = session.get(url, headers=headers, timeout=10)
                
            print(f"   Status: {res.status_code}")
            if res.status_code == 200:
                try:
                    data = res.json()
                    print(f"   Code: {data.get('code')}")
                    print(f"   Msg: {data.get('msg')}")
                    
                    # 打印关键数据预览
                    if 'lottry' in data:
                        print(f"   [Home] Period: {data['lottry'].get('lttnum')}, Remain: {data['lottry'].get('remainTime')}ms")
                    if 'credit' in data:
                        print(f"   [Balance] CURR: {data['credit'].get('CURR')} (before scale)")
                    if 'data' in data and isinstance(data['data'], dict):
                        print(f"   [Refresh] Period: {data['data'].get('LTTNUM')}, Numbers: {data['data'].get('NUMS')}")
                    if 'pageInfo' in data:
                        list_data = data['pageInfo'].get('list', [])
                        print(f"   [Page] Count: {len(list_data)}")
                        if list_data:
                             # 避免打印包含特殊字符的大段 JSON
                             sample = list_data[0]
                             print(f"   [Sample Info] {json.dumps(sample, ensure_ascii=False)}")
                except:
                    print(f"   Response (Not JSON): {res.text[:200]}...")
            else:
                print(f"   FAILED: {res.text[:100]}")
        except Exception as e:
            print(f"   EXCEPTION: {e}")
        print("-" * 50)

if __name__ == "__main__":
    # 使用捕捉到的有效 Cookie
    cookie = "BMW=31FD4249C45E4929A03242F7D4BE5667"
    test_api(cookie)
