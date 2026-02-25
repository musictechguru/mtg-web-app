import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        print(f"Question: {q['title']}")
                        for i in q.get('items', []):
                            print(f"  Item: {i['text']}, img: {i.get('img')}")
                break

