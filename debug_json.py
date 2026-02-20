import json

with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json', 'r') as f:
    data = json.load(f)

for element in data:
    if 'items' in element:
        for item in element['items']:
            if item.get('id') == 'quiz-history-2':
                print("Found item quiz-history-2!")
                print(f"Number of questions: {len(item.get('questions', []))}")
                if item.get('questions'):
                    for q in item['questions']:
                        print(f"Title checking against: '{q.get('title')}'")
