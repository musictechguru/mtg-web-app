import json

with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
topic9 = next((t for t in stage2['items'] if "Topic 9" in t.get('title', '')), None)

print("Topic 9:", topic9.get('title'))
print("Number of questions:", len(topic9.get('questions', [])))

with open('t9_qs_backup.json', 'w') as f:
    json.dump(topic9.get('questions', []), f, indent=4)
