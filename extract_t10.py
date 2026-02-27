import json

with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
topic10 = next((t for t in stage2['items'] if "Topic 10" in t.get('title', '')), None)

print("Topic 10:", topic10.get('title'))
print("Number of questions:", len(topic10.get('questions', [])))

with open('t10_qs_backup.json', 'w') as f:
    json.dump(topic10.get('questions', []), f, indent=4)
