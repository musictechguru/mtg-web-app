import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        if quiz.get('title') == "Topic 1: Fundamentals & Recording (Part 2)":
            print(f"Found quiz: {quiz['title']}")
            for i, q in enumerate(quiz.get('questions', [])):
                print(f"Q{i+1}: {q.get('img', 'NO IMAGE KEY')} - {q.get('content')[:100]}")
