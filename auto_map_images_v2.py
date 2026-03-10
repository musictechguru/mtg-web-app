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

def extract_words(text):
    return set(re.findall(r'\b[a-z0-9]+\b', text.lower()))

# Create an index of image words to speed up matching
image_index = {}
for img in all_images:
    img_name = os.path.basename(img).lower()
    img_name = img_name.replace('.png', '').replace('.jpg', '').replace('.jpeg', '').replace('.svg', '').replace('.webp', '')
    img_name = img_name.replace('_', ' ').replace('-', ' ')
    image_index[img] = {
        'words': extract_words(img_name),
        'name_spaced': img_name
    }

def get_best_image_match(content, topic_title, vol_title):
    content_words = extract_words(content)
    topic_words = extract_words(topic_title)
    vol_words = extract_words(vol_title)
    
    # Combined context for phrase matching
    context_lower = f"{vol_title} {topic_title} {content}".lower()
    
    best_match = None
    highest_score = 0
    
    for img, data in image_index.items():
        img_words = data['words']
        img_name_spaces = data['name_spaced']
        
        score = 0
        
        # 1. Score based on question content (most important)
        content_overlap = len(content_words.intersection(img_words))
        score += content_overlap * 2  # Weight content matches heavily
        
        # 2. Score based on topic/volume keywords (less important but helpful)
        topic_overlap = len(topic_words.intersection(img_words))
        score += topic_overlap * 1
        
        # 3. Exact phrase match bonus
        if len(img_name_spaces) > 4 and img_name_spaces in context_lower:
            score += 10
            
        # 4. Penalty for very generic "explanation_" names if they don't match well
        if "explanation" in img_name_spaces and score < 5:
            score -= 1
            
        if score > highest_score and score >= 2: # Require at least a decent match (1 content word or 2 topic words)
            highest_score = score
            best_match = img
            
    return best_match

# 2. Process dictionary_quizzes.json
filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

mapped_count = 0
previously_mapped = 0
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
                        # Try to map again with better algorithm
                        best_img = get_best_image_match(content, topic_title, vol_title)
                        if best_img:
                            q['img'] = best_img
                            mapped_count += 1
                        else:
                            path_key = f"{vol_title} -> {topic_title} ({level_name})"
                            unmapped_questions.append({
                                "id": q.get('id', 'Unknown'),
                                "content": content,
                                "topic": topic_title,
                                "path": path_key
                            })
                    else:
                        previously_mapped += 1

# 3. Save the partially mapped file
with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Images already mapped from previous run: {previously_mapped}")
print(f"Successfully mapped {mapped_count} NEW images automatically.")
print(f"Remaining missing images: {len(unmapped_questions)}")

with open('remaining_missing_images_v2.json', 'w') as f:
    json.dump(unmapped_questions, f, indent=4)
