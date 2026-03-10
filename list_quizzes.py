import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    print(section.get('title'))
    for quiz in section.get('items', []):
        print(f"  - {quiz.get('title')}")
