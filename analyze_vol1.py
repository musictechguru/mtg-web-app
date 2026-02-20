import json
import os

pool_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/Dictiionary_Quiz_image_Pool'
quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

pool_files = set(os.listdir(pool_dir))
print(f"Total files in pool: {len(pool_files)}")

vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)

if not vol1:
    print("Volume 1 not found!")
    exit(1)

missing_images = []
in_pool_count = 0

for part in vol1['parts']:
    for topic in part['topics']:
        for level_key, questions in topic['levels'].items():
            for q in questions:
                # Find the image(s) associated with the question
                # Images might be in 'img' or 'explanation_image'
                images_to_check = []
                if 'img' in q and q['img']:
                    images_to_check.append(("img", q['img']))
                
                exp_img = q.get('explanation_image')
                if exp_img:
                    if isinstance(exp_img, str):
                        images_to_check.append(("explanation_image", exp_img))
                    elif isinstance(exp_img, dict) and 'src' in exp_img:
                        images_to_check.append(("explanation_image.src", exp_img['src']))

                for img_type, img_path in images_to_check:
                    basename = os.path.basename(img_path)
                    # Check if basename is exactly in pool or unquoted version
                    # Some paths might have URL encoded chars like %20, but Python's basename doesn't auto-decode
                    from urllib.parse import unquote
                    basename_decoded = unquote(basename)
                    
                    if basename_decoded not in pool_files and basename not in pool_files:
                        missing_images.append({
                            'question_id': q.get('id', q.get('title')),
                            'question_content': q.get('content', '')[:50],
                            'img_type': img_type,
                            'current_img_path': img_path,
                            'basename': basename_decoded
                        })
                    else:
                        in_pool_count += 1

print(f"Images already in pool: {in_pool_count}")
print(f"Images NOT in pool: {len(missing_images)}")
if missing_images:
    print("\nSample of missing images:")
    for m in missing_images[:20]:
        print(f" - {m['question_id']}: {m['current_img_path']} (Basename: {m['basename']})")
