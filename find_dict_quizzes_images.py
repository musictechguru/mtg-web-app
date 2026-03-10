import json

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

print("Scanning dictionary_quizzes.json for missing images...")
missing_images = {}
total_missing = 0

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        title = quiz.get('title', '')
        missing_count = 0
        for i, q in enumerate(quiz.get('questions', [])):
            if 'img' not in q or q['img'] == "" or q['img'] is None:
                if title not in missing_images:
                    missing_images[title] = []
                missing_images[title].append({"q_num": i+1, "content": q.get('content')})
                missing_count += 1
        
        if missing_count > 0:
            total_missing += missing_count

print(f"\nTotal missing images found: {total_missing}")
if total_missing > 0:
    for title, missing in missing_images.items():
        print(f"\n--- {title} ---")
        for m in missing:
            print(f"Q{m['q_num']}: {m['content'][:100]}...")
