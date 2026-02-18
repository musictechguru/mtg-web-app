
import json
import re

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit()

print("AUDIT START - IMAGE RELEVANCE")

flagged_count = 0

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    image = q.get('image')
                    if not image: continue
                    
                    # Extract keywords from filename
                    # e.g., "images/explanations/compressor_threshold.png" -> ["compressor", "threshold"]
                    filename = image.split('/')[-1]
                    name_parts = re.split(r'[_\-\.]', filename)
                    keywords = [p.lower() for p in name_parts if len(p) > 2 and p not in ['png', 'jpg', 'svg', 'jpeg']]
                    
                    # Check if keywords appear in question or correct answer
                    content_text = (q['content'] + " " + q.get('explanation', "")).lower()
                    
                    match_found = False
                    for kw in keywords:
                        if kw in content_text:
                            match_found = True
                            break
                    
                    # Also check manual mappings if filename is generic like "q1.png" (unlikely but possible)
                    
                    if not match_found:
                        print(f"FLAGGED|{q['id']}|Image: {filename}")
                        print(f"  Q: {q['content'][:100]}...")
                        print(f"  Keywords from file: {keywords}")
                        print("-" * 20)
                        flagged_count += 1

print(f"AUDIT COMPLETE. Flagged {flagged_count} potential mismatches.")
