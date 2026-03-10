import json

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

print("Scanning dictionary_quizzes.json for missing images...")
missing_images = {}
total_missing = 0
total_questions = 0

for vol in data.get('volumes', []):
    vol_title = vol.get('title', '')
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            topic_title = topic.get('title', '')
            for level_name, questions in topic.get('levels', {}).items():
                for q in questions:
                    total_questions += 1
                    img = q.get('img')
                    if not img or img.strip() == "":
                        path_key = f"{vol_title} -> {topic_title} ({level_name})"
                        if path_key not in missing_images:
                            missing_images[path_key] = []
                        
                        missing_images[path_key].append({
                            "id": q.get('id', 'Unknown'),
                            "content": q.get('content')
                        })
                        total_missing += 1

print(f"\nTotal Dictionary Quiz Questions: {total_questions}")
print(f"Total missing images found: {total_missing}")

with open('missing_dict_images_report.txt', 'w') as out_f:
    out_f.write(f"Total Missing: {total_missing}\n\n")
    for path, missing in missing_images.items():
        out_f.write(f"--- {path} ---\n")
        for m in missing:
            out_f.write(f"[{m['id']}] {m['content']}\n")

print("Report saved to missing_dict_images_report.txt")
