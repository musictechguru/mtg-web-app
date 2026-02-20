import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

updates = [
    ("happens when a compressor is \"working\"", '/images/Dictiionary_Quiz_image_Pool/compressor_active_hq.png'), # Q5
    ("why is it important to use \"makeup gain\"", '/images/Dictiionary_Quiz_image_Pool/makeup_gain_hq.png'), # Q10
    ("vocals to sound \"glued together\"", '/images/Dictiionary_Quiz_image_Pool/vocal_glue_hq.png') # Q6
]

updated = False
vol5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
if vol5:
    for part in vol5['parts']:
        for topic in part['topics']:
            for level_key, questions in topic['levels'].items():
                for q in questions:
                    content_lower = q.get('content', '').lower()
                    for search_text, img_path in updates:
                        if search_text in content_lower:
                            q['img'] = img_path
                            if 'explanation_image' in q:
                                if isinstance(q['explanation_image'], str):
                                    q['explanation_image'] = img_path
                                elif isinstance(q['explanation_image'], dict) and 'src' in q['explanation_image']:
                                    q['explanation_image']['src'] = img_path
                            else:
                                q['explanation_image'] = img_path
                            updated = True
                            print(f"Updated JSON with {img_path} for question containing: {search_text}")

if updated:
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
        print("Saved dictionary_quizzes.json")
else:
    print("No changes made.")
