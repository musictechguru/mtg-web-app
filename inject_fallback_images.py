import json
import os
import random

# Gather available images
base_dir = "public/images"
all_images = []
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp')):
            rel_path = os.path.relpath(os.path.join(root, file), 'public')
            all_images.append("/" + rel_path)

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

fallback_count = 0
for vol in data.get('volumes', []):
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            for level_name, questions in topic.get('levels', {}).items():
                for q in questions:
                    img = q.get('img')
                    if not img or img.strip() == "":
                        # Pick a random image from the pool, preferably one that seems related to the volume
                        fallback_img = random.choice(all_images)
                        q['img'] = fallback_img
                        fallback_count += 1
                        print(f"Fallback added for: {q.get('id')}")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"\nApplied fallback images to {fallback_count} questions.")
