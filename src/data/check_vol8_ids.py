import json

with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
    data = json.load(f)

v8 = next((v for v in data['volumes'] if v['id'] == 'vol8'), None)
if v8:
    for part in v8['parts']:
        for t in part['topics']:
            print(f"{t['id']}: {t['title']}")
