import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        if quiz.get('title') == 'Initial Diagnostic Assessment':
            for i, q in enumerate(quiz.get('questions', [])):
                print(f"[{i+1}] {q.get('content')}")
            break
