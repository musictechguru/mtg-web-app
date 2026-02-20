import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

img_path = '/images/Dictiionary_Quiz_image_Pool/eq_kick_hq.png'

updated = False
vol6 = next((v for v in data['volumes'] if v['id'] == 'vol6'), None)
if vol6:
    for part in vol6['parts']:
        for topic in part['topics']:
            for level_key, questions in topic['levels'].items():
                for q in questions:
                    if "kick drum and want to add weight and power" in q.get('content', '').lower():
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
                        updated = True

if updated:
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
        print("Updated JSON with new image: " + img_path)
