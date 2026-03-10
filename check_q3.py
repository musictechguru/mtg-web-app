import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

tnk_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if quiz.get('title') == "'Tomorrow Never Knows' - Music Technology Analysis":
                tnk_quiz = quiz
                break

if tnk_quiz and len(tnk_quiz.get('questions', [])) >= 3:
    q3 = tnk_quiz['questions'][2]
    print("--- Q3 Details ---")
    print(f"Statement: {q3.get('statement')}")
    print(f"Explanation: {q3.get('explanation')}")
else:
    print("Could not find TNK Q3")
