import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == "Stage 2: Topic Mastery Quizzes":
        print(f"Found section: {section['title']}")
        for quiz in section.get('items', []):
            quiz_title = quiz.get('title')
            missing_count = 0
            for i, q in enumerate(quiz.get('questions', [])):
                if 'img' not in q or q['img'] == "" or q['img'] is None:
                    print(f"[{quiz_title}] Q{i+1}: Missing image. Content: {q.get('content')[:100]}")
                    missing_count += 1
            if missing_count == 0:
                print(f"[{quiz_title}] All questions have images.")
            else:
                print(f"[{quiz_title}] {missing_count} total missing images.")
