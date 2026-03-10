import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

print("Scanning for Dictionary Quizzes (Volumes 1-10)...")
missing_images = {}
total_missing = 0

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        title = quiz.get('title', '')
        if 'Volume' in title and 'Dictionary' in title:
            # e.g., "Volume 1: Dictionary Quiz" or similar
            missing_count = 0
            for i, q in enumerate(quiz.get('questions', [])):
                if 'img' not in q or q['img'] == "" or q['img'] is None:
                    # found a missing image
                    if title not in missing_images:
                        missing_images[title] = []
                    missing_images[title].append({"q_num": i+1, "content": q.get('content')})
                    missing_count += 1
            if missing_count > 0:
                print(f"Found {missing_count} missing images in: {title}")
                total_missing += missing_count

print(f"\nTotal missing images found: {total_missing}")
if total_missing > 0:
    for title, missing in missing_images.items():
        print(f"\n--- {title} ---")
        for m in missing:
            print(f"Q{m['q_num']}: {m['content'][:100]}...")
