import json
import os
import re

pool_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/Dictiionary_Quiz_image_Pool'
quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

pool_files = os.listdir(pool_dir)
from urllib.parse import unquote

# Create a clean list of pool file basenames
pool_basenames = {unquote(f) for f in pool_files}
pool_basenames.update(pool_files)  # add raw ones just in case

vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)

missing_images_data = []

for part in vol1['parts']:
    for topic in part['topics']:
        for level_key, questions in topic['levels'].items():
            for q in questions:
                images_to_check = []
                if 'img' in q and q['img']:
                    images_to_check.append(("img", q['img']))
                
                exp_img = q.get('explanation_image')
                if exp_img:
                    if isinstance(exp_img, str):
                        images_to_check.append(("explanation_image", exp_img))
                    elif isinstance(exp_img, dict) and 'src' in exp_img:
                        images_to_check.append(("explanation_image.src", exp_img['src']))

                q_missing = []
                for img_type, img_path in images_to_check:
                    basename = os.path.basename(img_path)
                    basename_decoded = unquote(basename)
                    if basename_decoded not in pool_basenames and basename not in pool_basenames:
                        q_missing.append({
                            'type': img_type,
                            'path': img_path,
                            'basename': basename_decoded
                        })
                
                if q_missing:
                    # Find correct answer
                    correct_answer = next((a['text'] for a in q.get('answers', []) if a.get('is_true') in ['yes', True]), "")
                    missing_images_data.append({
                        'id': q.get('id', q.get('title')),
                        'topic': topic['title'],
                        'content': q.get('content', ''),
                        'correct_answer': correct_answer,
                        'expert_explanation': q.get('expert_explanation', ''),
                        'missing': q_missing
                    })

with open('missing_vol1.json', 'w') as f:
    json.dump(missing_images_data, f, indent=2)

print(f"Generated missing_vol1.json with {len(missing_images_data)} questions to update.")
