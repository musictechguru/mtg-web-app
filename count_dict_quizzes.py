import json

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

print("Counting questions in dictionary_quizzes.json per volume...")
total_questions = 0

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        title = quiz.get('title', '')
        q_count = len(quiz.get('questions', []))
        total_questions += q_count
        print(f"{title}: {q_count} questions")

print(f"\nTotal Dictionary Quiz Questions: {total_questions}")
