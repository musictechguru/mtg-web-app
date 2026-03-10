import os
import json
import re

# 1. Build a pool of all existing images
base_dir = "public/images"
image_pool = {}

def clean_filename(fname):
    # Remove extension
    name = os.path.splitext(fname)[0]
    # Remove common prefixes/suffixes like 'v1_t1_', 'hq', '177', etc.
    name = re.sub(r'v\d+_t\d+_[a-z]_\d+_?', '', name)
    name = re.sub(r'_\d{10,}', '', name) # remove timestamps
    name = name.replace('_hq', '').replace('-hq', '')
    # Replace separators with space
    name = name.replace('_', ' ').replace('-', ' ').lower()
    return name

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.svg')):
            rel_path = "/" + os.path.relpath(os.path.join(root, file), 'public')
            clean_name = clean_filename(file)
            image_pool[rel_path] = clean_name


# 2. Extract keywords from strings
def extract_keywords(text):
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    # Stop words
    stop = {"the", "and", "for", "with", "what", "how", "why", "this", "that", "are", "you", "quiz", "practical", "question", "expert", "explanation"}
    return set([w for w in words if w not in stop])

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# 3. Process Stage 3
mapped_count = 0
fallback_count = 0

# Need a generic fallback list if mapping fails
generic_fallbacks = [path for path in image_pool.keys() if "studio" in image_pool[path] or "gear" in image_pool[path] or "mixing" in image_pool[path]]
if not generic_fallbacks:
    generic_fallbacks = list(image_pool.keys())

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            quiz_title = item.get('title', 'Unknown')
            quiz_keywords = extract_keywords(quiz_title)
            
            for q in item.get('questions', []):
                img = q.get('img')
                if not img or str(img).strip() == "":
                    q_text = q.get('content', '')
                    q_keywords = extract_keywords(q_text)
                    
                    combined_keywords = quiz_keywords.union(q_keywords)
                    
                    # Find the best match
                    best_match_path = None
                    max_score = 0
                    
                    for path, clean_name in image_pool.items():
                        path_keywords = set(clean_name.split())
                        score = len(combined_keywords.intersection(path_keywords))
                        
                        # Bonus if the exact quiz topic word is in the image name (e.g. eq, midi, reverb)
                        for imp_word in ["eq", "midi", "reverb", "compressor", "delay", "synth", "mic", "acoustic"]:
                            if imp_word in quiz_keywords and imp_word in path_keywords:
                                score += 5
                                
                        if score > max_score:
                            max_score = score
                            best_match_path = path

                    if best_match_path and max_score > 0:
                        q['img'] = best_match_path
                        mapped_count += 1
                        print(f"Mapped: {q.get('id', 'Q')} -> {os.path.basename(best_match_path)} (Score: {max_score})")
                    else:
                        import random
                        fallback = random.choice(generic_fallbacks)
                        q['img'] = fallback
                        fallback_count += 1
                        print(f"Fallback: {q.get('id', 'Q')} -> {os.path.basename(fallback)}")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"\nSuccessfully mapped {mapped_count} images based on context!")
print(f"Applied {fallback_count} generic fallback images.")
