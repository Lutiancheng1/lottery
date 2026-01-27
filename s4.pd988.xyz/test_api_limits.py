import requests
import json
import time

def test_page_size(cookie, url, method="POST", params_template=None):
    if params_template is None:
        params_template = {}
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": cookie,
        "X-Requested-With": "XMLHttpRequest"
    }
    
    test_sizes = [100, 200, 300, 500, 1000]
    results = {}
    
    print(f"\n🚀 开始测试接口: {url}")
    
    for size in test_sizes:
        payload = params_template.copy()
        # 适配不同的参数名
        if "paramMap.pageSize" in payload:
            payload["paramMap.pageSize"] = size
        elif "pageSize" in payload:
            payload["pageSize"] = size
            
        try:
            start_time = time.time()
            if method == "POST":
                # 默认使用 form-urlencoded
                response = requests.post(url, data=payload, headers=headers, timeout=15)
            else:
                response = requests.get(url, params=payload, headers=headers, timeout=15)
            
            duration = time.time() - start_time
            
            if response.status_code == 200:
                res_json = response.json()
                # 检查返回的数据量
                count = 0
                if "pageInfo" in res_json:
                    count = len(res_json["pageInfo"].get("list", []))
                elif "data" in res_json and isinstance(res_json["data"], list):
                    count = len(res_json["data"])
                elif "list" in res_json:
                    count = len(res_json["list"])
                
                print(f"✅ pageSize={size:4} | 返回数量={count:4} | 耗时={duration:.2f}s")
                results[size] = count
                
                if count < size and size > 100:
                    print(f"💡 提示: 实际返回数量小于请求数量，可能存在服务端硬限制。")
            else:
                print(f"❌ pageSize={size:4} | HTTP {response.status_code}")
        except Exception as e:
            print(f"💥 pageSize={size:4} | 错误: {e}")
            
    return results

if __name__ == "__main__":
    # 这里需要一个有效的 Cookie 才能测试
    # 用户可以在运行前手动填入，或者我通过说明告知
    MY_COOKIE = "BMW=6A792C1ACBF28B448B0856081CF42833" # 示例
    
    print("⚠️ 注意: 测试需要有效的登录 Cookie。")
    
    # 1. 测试历史开奖记录
    test_page_size(
        MY_COOKIE, 
        "https://s4.pd988.xyz/page/lottery/showHistoryLottery",
        params_template={"paramMap.pageNum": 1, "paramMap.pageSize": 100, "paramMap.lttnum": "20260127"}
    )
    
    # 2. 测试历史账单
    test_page_size(
        MY_COOKIE,
        "https://s4.pd988.xyz/queryOrderHistory",
        params_template={"paramMap.pageNum": 1, "paramMap.pageSize": 100}
    )
