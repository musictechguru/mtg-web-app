import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

for vol in data['volumes']:
    if vol['id'] == 'vol2':
        for part in vol['parts']:
            for topic in part['topics']:
                for level_key, questions in topic['levels'].items():
                    for q in questions:
                        if 'gain' in q.get('content', '').lower() and 'mean' in q.get('content', '').lower():
                            print(f"Found: {q.get('id')} - {q.get('content')}")
