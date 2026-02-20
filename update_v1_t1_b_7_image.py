import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

img_path = '/images/Dictiionary_Quiz_image_Pool/decibel_spl_hq.png'

vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
for part in vol1['parts']:
    for topic in part['topics']:
        for level_key, questions in topic['levels'].items():
            for q in questions:
                if q.get('id') == 'v1_t1_b_7':
                    if 'img' in q:
                        q['img'] = img_path
                    else:
                        q['img'] = img_path
                        
                    if 'explanation_image' in q:
                        if isinstance(q['explanation_image'], str):
                            q['explanation_image'] = img_path
                        elif isinstance(q['explanation_image'], dict) and 'src' in q['explanation_image']:
                            q['explanation_image']['src'] = img_path
                    else:
                        q['explanation_image'] = img_path

with open(quiz_file, 'w') as f:
    json.dump(data, f, indent=4)
