import sys
import os
import json
from data_manager import CanadaDataManager

# Load token
with open("token.json", "r", encoding="utf-8") as f:
    token_data = json.load(f)

token = token_data.get("token", "")
cookie = token_data.get("cookie", "")

print(f"Token: {token}")
print(f"Cookie: {cookie[:20]}...")

dm = CanadaDataManager()
dm.set_auth(token, cookie)

# ... setup
print(f"\n--- Testing API with Date Parameter ---")
url = f"{dm.base_url}/member/settingStage/page"
# Try fetching data for a few days ago (using user's local date context if needed, but 20260124 is likely available)
# User logs showed 3386xxx. 
# 3386208 is 20260119.
# So 3386695 is ~500 periods later -> 500 * 5 min = 2500 min = 40 hours -> 2 days later -> 20260121.
target_date = "20260122" 
payload = {"current": 1, "size": 100, "stage": target_date}

headers = dm.headers

try:
    print(f"POST {url} with stage={target_date}")
    resp = dm.session.post(url, json=payload, headers=headers, timeout=10)
    data = resp.json()
    if data.get('code') == 200:
        rows = data.get('data', {}).get('row', [])
        total = data.get('data', {}).get('total', -1)
        print(f"Returned {len(rows)} rows. Total: {total}")
        if rows:
             print(f"First: {rows[0].get('stageNo')} Time: {rows[0].get('openTime')}")
             print(f"Last: {rows[-1].get('stageNo')} Time: {rows[-1].get('openTime')}")
    else:
        print(f"Error: {data}")
except Exception as e:
    print(f"Exception: {e}")
