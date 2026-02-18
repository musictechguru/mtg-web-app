
import os
import re

ROOT_DIR = "../../public/Quiz_questions"

def scan_topics():
    volumes = sorted([d for d in os.listdir(ROOT_DIR) if d.startswith("Volume") and os.path.isdir(os.path.join(ROOT_DIR, d))])
    
    for vol in volumes:
        print(f"=== {vol} ===")
        vol_path = os.path.join(ROOT_DIR, vol)
        files = [f for f in os.listdir(vol_path) if f.endswith("Basic_Level_120Q.md") or "Basic" in f]
        
        # files typically have names like *Basic*. Just pick one to get topics.
        if not files:
            print("No Basic file found.")
            continue
            
        target_file = files[0] # Pick the first one
        with open(os.path.join(vol_path, target_file), 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex for Topic or Subject
        # Vol 1 uses SUBJECT X: TITLE
        # Vol 2 uses TOPIC X: TITLE
        # Others might vary
        
        headers = re.findall(r'(?:#+\s*)(?:SUBJECT|TOPIC)\s*(\d+):\s*(.+)', content, flags=re.IGNORECASE)
        
        for num, title in headers:
            # Clean title
            title = re.sub(r'\(\d+\s*Questions\).*', '', title, flags=re.IGNORECASE).strip()
            print(f"  Topic {num}: {title}")
        print()

if __name__ == "__main__":
    scan_topics()
