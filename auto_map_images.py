import json
import os
import glob
import re

# 1. Gather all existing images
base_dir = "public/images"
all_images = []
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp')):
            rel_path = os.path.relpath(os.path.join(root, file), 'public')
            all_images.append("/" + rel_path)

print(f"Total available images found in public/images: {len(all_images)}")

# Map keywords to image paths (simple scoring)
def get_best_image_match(content, available_images):
    content_lower = content.lower()
    # Remove punctuation
    content_words = set(re.findall(r'\b[a-z0-9]+\b', content_lower))
    
    best_match = None
    highest_score = 0
    
    for img in available_images:
        img_name = os.path.basename(img).lower()
        img_name = img_name.replace('.png', '').replace('.jpg', '').replace('.jpeg', '').replace('.svg', '').replace('.webp', '')
        img_words = set(re.findall(r'\b[a-z0-9]+\b', img_name))
        
        # Calculate intersection
        score = len(content_words.intersection(img_words))
        
        # Give bonus for exact phrase matches if the image name has multiple words
        img_name_spaces = img_name.replace('_', ' ').replace('-', ' ')
        if len(img_name_spaces) > 3 and img_name_spaces in content_lower:
            score += 5
            
        if score > highest_score and score >= 1: # Require at least 1 keyword match
            highest_score = score
            best_match = img
            
    return best_match

# 2. Process dictionary_quizzes.json
filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

mapped_count = 0
unmapped_questions = []

for vol in data.get('volumes', []):
    vol_title = vol.get('title', '')
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            topic_title = topic.get('title', '')
            for level_name, questions in topic.get('levels', {}).items():
                for q in questions:
                    img = q.get('img')
                    if not img or img.strip() == "":
                        content = q.get('content')
                        # Try to map
                        best_img = get_best_image_match(content, all_images)
                        if best_img:
                            q['img'] = best_img
                            mapped_count += 1
                        else:
                            path_key = f"{vol_title} -> {topic_title} ({level_name})"
                            unmapped_questions.append({
                                "id": q.get('id', 'Unknown'),
                                "content": content,
                                "path": path_key
                            })

# 3. Save the partially mapped file
with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Successfully mapped {mapped_count} images automatically.")
print(f"Remaining missing images: {len(unmapped_questions)}")

with open('remaining_missing_images.json', 'w') as f:
    json.dump(unmapped_questions, f, indent=4)
