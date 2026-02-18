import json

with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
    data = json.load(f)

vol = next((v for v in data['volumes'] if v['id'] == 'vol9'), None)
if vol:
    for part in vol['parts']:
        for t in part['topics']:
            print(f"{t['id']}: {t['title']}")
