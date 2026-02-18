import json
import os
import re

# Load Ingested Data
with open('vol2_quizzes.json', 'r') as f:
    data = json.load(f)

print("--- INGESTED TOPICS ---")
for part in data['parts']:
    print(f"[{part['title']}]")
    for topic in part['topics']:
        print(f"  - {topic['title']}")

# Scan Source Files for Headers
print("\n--- SOURCE HEADERS (Expected) ---")
BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 2 - Microphones_Parts 1 - 5 Markdown'
FILES = [
    'Volume_2_Microphones_Part1.md',
    'Volume_2_Microphones_Part2.md',
    'Volume_2_Microphones_Part3_4_5.md'
]

for filename in FILES:
    path = os.path.join(BASE_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        print(f"\nFILE: {filename}")
        for line in f:
            if line.startswith('## '):
                # Skip volume title if present
                if "Volume 2" in line: continue
                print(f"  EXPECT: {line.strip()}")
