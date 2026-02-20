import json
import os

pool_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/Dictiionary_Quiz_image_Pool'
quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

pool_files = os.listdir(pool_dir)

# Find relevant images for filter
relevant = [f for f in pool_files if 'filter' in f.lower() or 'eq' in f.lower() or 'synth' in f.lower()]
print("Relevant images found:")
for r in relevant:
    if 'filter' in r.lower():
        print(f" - {r}")

# Let's use explanation_filter_types.png or filter_types_chart.svg
chosen_image = 'explanation_filter_types.png'
img_path = f'/images/Dictiionary_Quiz_image_Pool/{chosen_image}'

# Update the JSON
with open(quiz_file, 'r') as f:
    data = json.load(f)

updated = False
for vol in data['volumes']:
    if vol['id'] == 'vol3':
        for part in vol['parts']:
            for topic in part['topics']:
                for level_key, questions in topic['levels'].items():
                    for q in questions:
                        if "main purpose of a filter" in q.get('content', '').lower():
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
        print("\nUpdated JSON with chosen image: " + chosen_image)
else:
    print("\nCould not find question.")

