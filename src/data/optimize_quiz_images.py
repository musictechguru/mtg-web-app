
import json
import re
import glob
import os
import random
from collections import defaultdict

# --- Configuration ---
QUIZ_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
IMAGES_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'
LOG_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/image_optimization_log.txt'

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
image_library = {} # Map filename -> entry

# Keywords to ignore in filenames (too generic for matching)
IGNORE_KEYWORDS = {'diagram', 'explanation', 'v2', 'png', 'svg', 'jpg', 'jpeg', 'image', 'chart', 'graph', 'concept'}

for img_path in image_files:
    rel_path = img_path.replace('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public', '')
    filename = os.path.basename(img_path)
    
    # Extract keywords from filename
    name_parts = re.split(r'[_\-\.\s]', filename)
    keywords = {p.lower() for p in name_parts if len(p) > 2 and p.lower() not in IGNORE_KEYWORDS}
    
    # Store entry
    image_library[filename] = {
        'src': rel_path,
        'filename': filename,
        'keywords': keywords,
        'usage_count': 0
    }

print(f"Found {len(image_library)} images in library.")

# --- Calculate Current Usage ---
print("Calculating current usage...")
all_questions = []

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    all_questions.append(q)
                    
                    # Identify current image
                    current_filename = None
                    if 'explanation_image' in q and isinstance(q['explanation_image'], dict):
                        current_filename = os.path.basename(q['explanation_image'].get('src', ''))
                    elif 'img' in q:
                        current_filename = os.path.basename(q['img'])
                    elif 'image' in q:
                        current_filename = os.path.basename(q['image'])
                    
                    if current_filename and current_filename in image_library:
                        image_library[current_filename]['usage_count'] += 1

# --- Optimization Loop ---
print("Optimizing images...")
changes_count = 0
log_entries = []

# Mismatch Rules acting as "Safety" (don't pick an image if it violates these)
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

def check_violation(img_filename, text):
    img_lower = img_filename.lower()
    text_lower = text.lower()
    for img_kw, req_kws in MISMATCH_RULES:
        if img_kw in img_lower:
            if not any(rk in text_lower for rk in req_kws):
                return True # Violation!
    return False

for q in all_questions:
    # 1. Get current image info
    current_image_key = None
    
    if 'explanation_image' in q and isinstance(q['explanation_image'], dict):
        current_image_key = 'explanation_image'
        current_src = q['explanation_image'].get('src')
    elif 'img' in q:
        current_image_key = 'img'
        current_src = q['img']
    elif 'image' in q:
        current_image_key = 'image'
        current_src = q['image']
    
    if not current_image_key or not current_src: continue

    current_filename = os.path.basename(current_src)
    
    # 2. Get Question Context
    q_text = (q['content'] + " " + q.get('explanation', "") + " " + q.get('expert_explanation', "")).lower()
    
    # 3. Score Current Image
    current_score = 0
    if current_filename in image_library:
        current_score = sum(1 for kw in image_library[current_filename]['keywords'] if kw in q_text)
    
    # 4. Find Candidates
    candidates = []
    
    for filename, entry in image_library.items():
        # Score candidate
        score = sum(1 for kw in entry['keywords'] if kw in q_text)
        
        # Must have at least one keyword match to be considered
        if score > 0:
            # Check for safety violation
            if check_violation(filename, q_text):
                continue
            
            candidates.append((entry, score))
    
    # Sort candidates:
    # 1. Higher Score is better
    # 2. Lower Usage is better (Diversity)
    # 3. Random shuffle for tie-breaking
    random.shuffle(candidates)
    candidates.sort(key=lambda x: (-x[1], x[0]['usage_count']))
    
    if not candidates: continue
    
    best_candidate, best_score = candidates[0]
    
    # 5. Decide if we should swap
    # Swap if:
    # - Best score is significantly better than current (e.g. +1 match)
    # - Scores are equal, but Best Usage is significantly lower than Current Usage (e.g., used 0 times vs 5 times)
    
    should_swap = False
    reason = ""
    
    current_usage = image_library.get(current_filename, {}).get('usage_count', 999)
    best_usage = best_candidate['usage_count']
    
    if best_score > current_score:
        should_swap = True
        reason = f"Better Match ({best_score} vs {current_score})"
    elif best_score == current_score and best_score > 0:
        if current_usage > 5 and best_usage < 2:
            should_swap = True
            reason = f"Diversity (Usage {best_usage} vs {current_usage})"
    
    if should_swap and best_candidate['filename'] != current_filename:
        # Perform Swap
        new_src = best_candidate['src']
        new_alt = best_candidate['filename'].replace('_', ' ').replace('-', ' ').split('.')[0].title()
        
        if current_image_key == 'explanation_image':
            q['explanation_image']['src'] = new_src
            q['explanation_image']['alt'] = new_alt
        else:
            q[current_image_key] = new_src
            
        # Update usage
        if current_filename in image_library:
            image_library[current_filename]['usage_count'] -= 1
        best_candidate['usage_count'] += 1
        
        changes_count += 1
        log_entries.append(f"SWAP|{q['id']}|Old: {current_filename}|New: {best_candidate['filename']}|Reason: {reason}|Score: {best_score}")

# --- Save Results ---
print(f"Optimized {changes_count} images.")

with open(QUIZ_FILE, 'w') as f:
    json.dump(data, f, indent=4)

with open(LOG_FILE, 'w') as f:
    f.write("\n".join(log_entries))

print("Done.")
