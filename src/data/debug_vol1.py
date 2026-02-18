import re
import os
import json

MD_FILE = "../../public/Quiz_questions/Volume 1/Volume1_Fundamentals_Basic_Level_120Q.md"
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"

def load_quotes():
    if os.path.exists(QUOTES_FILE):
        with open(QUOTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def debug_enrich():
    quotes_db = load_quotes().get("Volume 1", {})
    print(f"Loaded Quotes DB Keys: {list(quotes_db.keys())}")
    
    with open(MD_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    subjects = re.split(r'(# SUBJECT \d+:.*)', content)
    
    current_subject_num = 0
    
    for section in subjects:
        header_match = re.match(r'# SUBJECT (\d+):', section)
        if header_match:
            current_subject_num = header_match.group(1)
            print(f"Found Subject: '{current_subject_num}'")
            
            # Check lookup
            subject_quotes = quotes_db.get(str(current_subject_num), {}).get("quotes", [])
            print(f"Lookup for '{current_subject_num}' found {len(subject_quotes)} quotes.")
            continue

if __name__ == "__main__":
    debug_enrich()
