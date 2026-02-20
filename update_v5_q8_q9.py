import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

img_paths = [
    ("what's the difference between compression and limiting", '/images/Dictiionary_Quiz_image_Pool/compression_vs_limiting_hq.png'),
    ("can't hear any difference", '/images/Dictiionary_Quiz_image_Pool/compressor_threshold_hq.png')
]

updated = False
vol5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
if vol5:
    for part in vol5['parts']:
        for topic in part['topics']:
            for level_key, questions in topic['levels'].items():
                for q in questions:
                    content_lower = q.get('content', '').lower()
                    for search_text, img_path in img_paths:
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

if updated:
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
        print("Updated JSON for Vol 5 Q8 and Q9.")
