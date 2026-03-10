import json
import re

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

money_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Money'" in quiz.get('title', ''):
                money_quiz = quiz
                break

if money_quiz:
    print(f"Quiz Title: {money_quiz.get('title')}")
    for i, q in enumerate(money_quiz.get('questions', [])):
        exp = q.get('explanation', '')
        # Remove SVGs
        exp = re.sub(r'<svg.*?</svg>', '', exp, flags=re.DOTALL)
        # Remove HTML tags
        exp = re.sub(r'<.*?>', '', exp)
        print(f"Q{i+1}: {exp.strip()}")
