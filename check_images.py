import json
import os

with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

missing = []
for section in data.get('sections', []):
    if section.get('title') == "Stage 6: Historical Music Tech":
        for item in section.get('items', []):
            if item.get('id') == "quiz-timeline-1":
                for q in item.get('questions', []):
                    for sub_item in q.get('items', []):
                        img = sub_item.get('img')
                        if img and img.startswith('/images/'):
                            img_path = 'public' + img
                            if not os.path.exists(img_path):
                                missing.append(img)
                        elif img and not img.startswith('/images/'):
                            img_path = 'public/' + img
                            if not os.path.exists(img_path):
                                missing.append(img)

print("Missing images:")
for m in missing:
    print(m)
