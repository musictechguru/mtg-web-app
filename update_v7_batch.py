import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

components_img = '/images/Dictiionary_Quiz_image_Pool/reverb_components_hq.png'
purpose_img = '/images/Dictiionary_Quiz_image_Pool/reverb_purpose_hq.png'
rt60_img = '/images/Dictiionary_Quiz_image_Pool/reverb_rt60_hq.png'

updates = [
    ("three main components of reverb", components_img), # Q2
    ("difference between early reflections and late reflections", components_img), # Q4
    ("why do engineers use reverb", purpose_img), # Q5
    ("mix sounds \"dry\" and lifeless", purpose_img), # Q6
    ("what does rt60 stand for in reverb", rt60_img), # Q7
    ("direct sound is", components_img), # Q8
    ("want a lush, spacious feel", purpose_img), # Q9
    ("what happens to sound when you add reverb", purpose_img) # Q10
]

updated = False
vol7 = next((v for v in data['volumes'] if v['id'] == 'vol7'), None)
if vol7:
    for part in vol7['parts']:
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
