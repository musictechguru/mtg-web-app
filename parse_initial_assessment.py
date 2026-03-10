import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        if quiz.get('title', '').lower() == 'initial assessment':
            print(f"Found Initial Assessment with {len(quiz.get('questions', []))} questions.")
            for i, q in enumerate(quiz.get('questions', [])):
                print(f"--- Q{i+1}: {q.get('content')}")
                print(f"Quote: {q.get('quote')}")
                print(f"Quote Author: {q.get('quote_author')}")
                print(f"Image: {q.get('img')}")
            break
