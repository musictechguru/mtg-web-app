import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
mappings_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/proposed_mappings.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

with open(mappings_file, 'r') as f:
    mappings = json.load(f)

vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)

updated_count = 0

for part in vol1['parts']:
    for topic in part['topics']:
        for level_key, questions in topic['levels'].items():
            for q in questions:
                q_id = q.get('id', q.get('title'))
                
                if q_id in mappings:
                    mapping = mappings[q_id]
                    suggested_image = mapping['suggested_image']
                    
                    # Update img
                    if 'img' in q and q['img']:
                        q['img'] = suggested_image
                        
                    # Update explanation_image
                    exp_img = q.get('explanation_image')
                    if exp_img:
                        if isinstance(exp_img, str):
                            q['explanation_image'] = suggested_image
                        elif isinstance(exp_img, dict) and 'src' in exp_img:
                            q['explanation_image']['src'] = suggested_image
                    
                    updated_count += 1

with open(quiz_file, 'w') as f:
    json.dump(data, f, indent=4) # Use indent 4 as original file uses 4 spaces

print(f"Successfully updated {updated_count} questions in Volume 1.")
