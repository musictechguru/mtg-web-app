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

if tnk_quiz and len(tnk_quiz.get('questions', [])) >= 12:
    q12 = tnk_quiz['questions'][11]
    print("--- Q12 Details ---")
    print(f"Statement: {q12.get('statement')}")
    print(f"Explanation: {q12.get('explanation')}")
else:
    print("Could not find TNK Q12")
