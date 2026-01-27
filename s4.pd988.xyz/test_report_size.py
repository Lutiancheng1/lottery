
import json
import requests
import datetime
import os

def load_cookie():
    # Try current directory first
    if os.path.exists("token.json"):
        with open("token.json", "r") as f:
            data = json.load(f)
            return data.get("cookie")
    # Try checking subdirectories if needed (simplified for now)
    return None

def test_size(size, cookie):
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=30)
    
    url = "https://s4.pd988.xyz/queryOrderHistory"
    payload = {
        "startTime": start_date.strftime("%Y-%m-%d"),
        "endTime": end_date.strftime("%Y-%m-%d"),
        "current": 1,
        "size": size
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Cookie": cookie
    }
    
    print(f"\nTesting size={size}...")
    try:
        start_time = datetime.datetime.now()
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        elapsed = (datetime.datetime.now() - start_time).total_seconds()
        
        if response.status_code == 200:
            res_json = response.json()
            if res_json.get("code") == 200:
                rows = res_json.get("data", {}).get("row", [])
                print(f"✅ Success! Size={size}, Got {len(rows)} items. Time={elapsed:.2f}s")
                return True
            else:
                print(f"❌ Failed (API Error): {res_json.get('msg')}")
        else:
            print(f"❌ Failed (HTTP {response.status_code})")
            
    except Exception as e:
        print(f"❌ Exception: {e}")
    return False

if __name__ == "__main__":
    cookie = load_cookie()
    if not cookie:
        print("❌ Could not find token.json or cookie inside it.")
        print("Please ensure you have run the main simulator and logged in successfully.")
    else:
        print(f"Loaded cookie: {cookie[:20]}...")
        
        # Test 100 first
        test_size(100, cookie)
        
        # Test 50
        test_size(50, cookie)
        
        # Test 20
        test_size(20, cookie)
