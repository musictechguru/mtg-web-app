
import json
import re
import glob
import os
import random
from collections import defaultdict

# --- Configuration ---
QUIZ_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
IMAGES_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'
LOG_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/image_fix_log.txt'

# --- Load Data ---
try:
    with open(QUIZ_FILE, 'r') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit()

# --- Build Image Library ---
print("Building Image Library...")
image_files = glob.glob(os.path.join(IMAGES_DIR, "**", "*.*"), recursive=True)
image_library = []

# Keywords to ignore in filenames (too generic)
IGNORE_KEYWORDS = {'diagram', 'explanation', 'v2', 'png', 'svg', 'jpg', 'jpeg', 'image', 'chart', 'graph'}

for img_path in image_files:
    # Get relative path for JSON (e.g., "/images/svg/foo.svg")
    rel_path = img_path.replace('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public', '')
    
    filename = os.path.basename(img_path)
    name_parts = re.split(r'[_\-\.\s]', filename)
    keywords = {p.lower() for p in name_parts if len(p) > 2 and p.lower() not in IGNORE_KEYWORDS}
    
    image_library.append({
        'src': rel_path,
        'filename': filename,
        'keywords': keywords,
        'usage_count': 0
    })

print(f"Found {len(image_library)} images.")

# --- Mismatch Rules (from Audit) ---
# (image_keyword, [required_question_keywords])
MISMATCH_RULES = [
    ('ground', ['ground', 'earth', 'hum', 'loop', 'noise', 'connect']),
    ('fletcher', ['fletcher', 'munson', 'hearing', 'loudness', 'sensitivity', 'contour', 'perception']),
    ('nyquist', ['nyquist', 'sample', 'rate', 'aliasing', 'frequency']),
    ('spdif', ['spdif', 'digital', 'coaxial', 'optical', 'interface', 'connect']),
    ('midi', ['midi', 'data', 'note', 'velocity', 'control', 'protocol']),
    ('compressor', ['compress', 'dynamic', 'reduction', 'threshold', 'ratio', 'attack']),
    ('equalizer', ['equaliz', 'eq', 'frequency', 'boost', 'cut', 'filter']),
    ('microphone', ['mic', 'pickup', 'pattern', 'transducer', 'diaphragm', 'phantom']),
    ('cable', ['cable', 'lr', 'trs', 'xlr', 'balanc', 'connect', 'lead', 'wire']),
    ('connector', ['connector', 'xlr', 'trs', 'ts', 'rca', 'jack', 'plug']),
    ('aliasing', ['alias', 'sample', 'rate', 'nyquist', 'frequency']),
    ('jitter', ['jitter', 'clock', 'time', 'digital', 'error']),
    ('dither', ['dither', 'quantiz', 'noise', 'bit', 'depth']),
    ('latency', ['latency', 'delay', 'buffer', 'monitor']),
    ('phase', ['phase', 'cancel', 'coherent', 'polarity', 'shift']),
]

# --- Processing ---
fixed_count = 0
log_entries = []

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    # 1. Identify current image
                    current_image_src = None
                    if 'explanation_image' in q and isinstance(q['explanation_image'], dict):
                        current_image_src = q['explanation_image'].get('src')
                    elif 'img' in q:
                        current_image_src = q['img']
                    elif 'image' in q:
                        current_image_src = q['image']
                    
                    if not current_image_src: continue

                    current_filename = os.path.basename(current_image_src)
                    
                    # 2. Check for Mismatch based on Rules
                    is_mismatched = False
                    mismatch_reason = ""
                    
                    q_text = (q['content'] + " " + q.get('explanation', "") + " " + q.get('expert_explanation', "")).lower()
                    img_lower = current_filename.lower()
                    
                    for img_kw, req_kws in MISMATCH_RULES:
                        if img_kw in img_lower:
                            if not any(rk in q_text for rk in req_kws):
                                is_mismatched = True
                                mismatch_reason = f"Image '{img_kw}' but text lacks {req_kws}"
                                break
                    
                    if not is_mismatched:
                        continue

                    # 3. Find Better Image
                    # Check text for keywords that match available images
                    best_match = None
                    max_matches = 0
                    
                    potential_candidates = []
                    
                    for img_entry in image_library:
                        # Count how many of this image's keywords appear in the Question text
                        matches = sum(1 for kw in img_entry['keywords'] if kw in q_text)
                        
                        if matches > 0:
                            potential_candidates.append((img_entry, matches))
                            
                    # Sort by matches (desc) and then by usage_count (asc) to promote diversity
                    potential_candidates.sort(key=lambda x: (-x[1], x[0]['usage_count']))
                    
                    if potential_candidates:
                        # Pick the best one
                        best_match = potential_candidates[0][0]
                        
                        # Apply Fix
                        new_src = best_match['src']
                        new_alt = best_match['filename'].replace('_', ' ').replace('-', ' ').split('.')[0].title()
                        
                        # Update Usage
                        best_match['usage_count'] += 1
                        
                        # Update Question
                        if 'explanation_image' in q and isinstance(q['explanation_image'], dict):
                            q['explanation_image']['src'] = new_src
                            q['explanation_image']['alt'] = new_alt
                        elif 'img' in q:
                            q['img'] = new_src
                        elif 'image' in q:
                            q['image'] = new_src
                        
                        log_entries.append(f"FIXED|{q['id']}|Old: {current_filename}|New: {best_match['filename']}|Reason: {mismatch_reason}")
                        fixed_count += 1
                    else:
                        log_entries.append(f"SKIPPED|{q['id']}|Old: {current_filename}|No better match found.")

# --- Save Results ---
print(f"Fixing {fixed_count} mismatches...")

with open(QUIZ_FILE, 'w') as f:
    json.dump(data, f, indent=4)

with open(LOG_FILE, 'w') as f:
    f.write("\n".join(log_entries))

print("Done.")
