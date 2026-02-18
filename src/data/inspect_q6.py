import json

path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(path, 'r') as f:
    data = json.load(f)

found = False
for volume in data['volumes']:
    for part in volume['parts']:
        for topic in part['topics']:
            if 'digital audio fundamentals' in topic['title'].lower():
                print(f"Found Topic: {topic['title']} (ID: {topic['id']})")
                found = True
                
                # Check Basic Level
                questions = topic['levels'].get('basic', [])
                print(f"Basic Level Question Count: {len(questions)}")
                
                if len(questions) > 5:
                    q6 = questions[5]
                    print(f"Question 6 (Index 5):")
                    print(f"  ID: {q6['id']}")
                    print(f"  Title: {q6['title']}")
                    print(f"  Type: {q6['type']}")
                    print(f"  Current Answers: {q6.get('answers')}")
                    print(f"  Current Correct Answer: {q6.get('correct_answer')}")
                else:
                    print("Error: Less than 6 questions in Basic level.")

if not found:
    print("Topic 'Digital Audio Fundamentals' not found.")
