import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Billie Jean'" in quiz.get('title', ''):
                print(f"--- {quiz['title']} ---")
                for i, q in enumerate(quiz.get('questions', [])):
                    print(f"Q{i+1}: {q.get('statement', '')}")
