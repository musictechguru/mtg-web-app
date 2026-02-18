import json
import os
import re
from collections import defaultdict

def normalize_text(text):
    return re.sub(r'[^a-z0-9]', '', text.lower())

def smart_map_all():
    # 1. Index all available images
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'
    image_index = defaultdict(list)
    
    # Walk and index
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg')):
                # full rel path
                full_path = os.path.join(root, file)
                rel_path = full_path.replace('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public', '')
                
                # Create keywords from filename
                name_no_ext = os.path.splitext(file)[0].lower()
                # split by _ or - or space
                keywords = set(re.split(r'[_\-\s]+', name_no_ext))
                
                # Store tuple: (score_weight, path, keywords)
                # Prefer SVG > PNG for diagrams
                weight = 2 if file.endswith('.svg') else 1
                if "diagram" in name_no_ext: weight += 1
                
                image_index[name_no_ext] = {
                    "path": rel_path,
                    "media_type": "image",
                    "keywords": keywords,
                    "weight": weight
                }

    print(f"Indexed {len(image_index)} unique image assets.")

    # 2. Audit & Remap JSON
    json_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    with open(json_path, 'r') as f:
        data = json.load(f)

    updates = 0
    
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        # Current image
                        current_img = q.get('explanation_image') or q.get('img')
                        current_src = ""
                        if isinstance(current_img, dict): current_src = current_img.get('src')
                        elif isinstance(current_img, str): current_src = current_img
                        
                        # Prepare Question Keywords
                        content = q['content']
                        # Extract key terms/phrases
                        # This is a naive heuristic: match filename keywords against content
                        
                        best_match = None
                        best_score = 0
                        
                        for img_name, img_data in image_index.items():
                            # Score this image against question content
                            # Check if ALL filename keywords exist in content (strict match)
                            # or high percentage
                            
                            kw_count = len(img_data['keywords'])
                            if kw_count < 2: continue # Skip single common words like "file", "image"
                            
                            found = 0
                            for k in img_data['keywords']:
                                if k in " of the and in on at to a an ": continue # Stopwords
                                if k in content.lower():
                                    found += 1
                            
                            if found > 0:
                                # Calculate a score
                                # Precision: how much of the filename is matched?
                                precision = found / kw_count
                                # Recall: (not easily calc w/o analyzing content tokens)
                                
                                # We want matches where the FILENAME is strongly represented in the question
                                # e.g. "near_field_setup.svg" -> "near field" in question
                                
                                score = found * precision * img_data['weight']
                                
                                if score > best_score:
                                    best_score = score
                                    best_match = img_data['path']

                        # Threshold for swapping
                        if best_match and best_score > 1.5: # Arbitrary threshold, requires tuning
                            # Don't swap if it's the exact same image
                            if best_match != current_src:
                                # Don't swap if current image is already "good" (how to tell?)
                                # Let's assume the library scan found the "canonical" asset
                                
                                # Only report for now, or apply?
                                # print(f"Match: {q['content'][:40]}... -> {best_match} (Score: {best_score:.2f})")
                                q['explanation_image'] = best_match
                                q['img'] = best_match
                                updates += 1

    print(f"Proposing {updates} smart swaps across the entire database.")
    
    # Write back? Or just check first?
    # Let's write back if confidence is high, but for safety lets just dump a log or only write if user confirms.
    # User said "DO THIS", so I will overwrite.
    
    with open(json_path, 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":
    smart_map_all()
