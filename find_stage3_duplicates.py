import json
from collections import defaultdict

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Track image usage: image_path -> list of question IDs
image_usage = defaultdict(list)
question_details = {}

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            quiz_title = item.get('title', 'Unknown')
            for q in item.get('questions', []):
                img = q.get('img')
                q_id = q.get('id', 'Unknown')
                q_text = q.get('content', '')[:50]
                if img:
                    image_usage[img].append(f"{quiz_title} - {q_id}: {q_text}")
                    question_details[q_id] = {
                        "quiz": quiz_title,
                        "text": q.get('content', ''),
                        "img": img
                    }

print("=== IMAGE USAGE REPORT FOR STAGE 3 ===")
duplicates = {img: uses for img, uses in image_usage.items() if len(uses) > 1}
sorted_dups = sorted(duplicates.items(), key=lambda x: len(x[1]), reverse=True)

total_repeats = 0
for img, uses in sorted_dups:
    print(f"\nImage: {img} (Used {len(uses)} times)")
    for use in uses:
        print(f"  - {use}")
    total_repeats += len(uses) - 1

print(f"\nTotal duplicate applications to fix: {total_repeats}")

# Dump detailed target list to JSON for processing
with open("stage3_duplicates.json", "w") as f:
    json.dump({img: uses for img, uses in sorted_dups}, f, indent=4)
