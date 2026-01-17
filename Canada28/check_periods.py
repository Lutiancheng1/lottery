
import os
import sys

# Ensure imports work
sys.path.append(os.getcwd())

from data_manager import CanadaDataManager

def check():
    try:
        dm = CanadaDataManager()
        data = dm.read_all_local_data()
        
        print(f"Total records: {len(data)}")
        
        from collections import defaultdict
        date_counts = defaultdict(int)
        
        for item in data:
            date_str = item.get('overt_at', '').split(' ')[0]
            if date_str:
                date_counts[date_str] += 1
                
        sorted_dates = sorted(date_counts.keys())
        # Filter mostly complete days (ignore first/last day if incomplete or outliers)
        # Assuming most recent days are complete
        
        print("Last 10 days counts:")
        for d in sorted_dates[-10:]:
             print(f"{d}: {date_counts[d]}")
             
        # Calculate averge of last 30 days excluding today (which might be incomplete)
        if len(sorted_dates) > 30:
            relevant_dates = sorted_dates[-31:-1] # Last 30 complete days
            counts = [date_counts[d] for d in relevant_dates]
            avg = sum(counts) / len(counts)
            print(f"Average of last 30 days: {avg:.2f}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check()
