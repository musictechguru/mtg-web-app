
import json
import re

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit()

print("AUDIT START - IMAGE RELEVANCE - STRICTER")

flagged_count = 0
total_images = 0

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    # Check for different image keys
                    image_src = None
                    if 'explanation_image' in q and isinstance(q['explanation_image'], dict):
                        image_src = q['explanation_image'].get('src')
                    elif 'img' in q:
                        image_src = q['img']
                    elif 'image' in q:
                        image_src = q['image']
                        
                    if not image_src: continue
                    
                    total_images += 1
                    
                    # Extract filenames
                    filename = image_src.split('/')[-1]
                    
                    # If filename is generic like "image.png" or "q1.png", flag it
                    if re.match(r'^(image|img|q)\d*\.(png|jpg|jpeg|svg)$', filename, re.IGNORECASE):
                        print(f"FLAGGED|{q['id']}|Generic Filename: {filename}")
                        flagged_count += 1
                        continue

                    # Extract keywords
                    name_parts = re.split(r'[_\-\.]', filename)
                    keywords = [p.lower() for p in name_parts if len(p) > 2 and p not in ['png', 'jpg', 'svg', 'jpeg', 'image', 'diagram', 'chart']]
                    
                    if not keywords:
                        print(f"FLAGGED|{q['id']}|No keywords in filename: {filename}")
                        flagged_count += 1
                        continue

                    # Check against content
                    content_text = (q['content'] + " " + q.get('explanation', "") + " " + q.get('expert_explanation', "")).lower()
                    
                    match_found = False
                    matched_kw = []
                    for kw in keywords:
                        if kw in content_text:
                            match_found = True
                            matched_kw.append(kw)
                    
                    if not match_found:
                        # Double check correct answer text
                        correct_ans = next((a for a in q['answers'] if str(a.get('is_true')).lower() in ['yes', 'true', '1'] or a.get('is_true') is True), None)
                        if correct_ans and any(kw in correct_ans['text'].lower() for kw in keywords):
                            match_found = True
                        
                    if not match_found:
                        print(f"FLAGGED|{q['id']}|Image: {filename}")
                        print(f"  Q: {q['content'][:100]}...")
                        print(f"  Keywords: {keywords}")
                        print("-" * 20)
                        flagged_count += 1

print(f"AUDIT COMPLETE. Checked {total_images} images. Flagged {flagged_count} potential mismatches.")
