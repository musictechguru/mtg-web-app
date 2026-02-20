import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'

with open(quiz_file, 'r') as f:
    data = json.load(f)

img_path = '/images/Dictiionary_Quiz_image_Pool/history_synth_hq.png'

updated = False

for element in data:
    if 'items' in element:
        for item in element['items']:
            if item.get('id') == 'quiz-history-2':
                for q in item.get('questions', []):
                    if q.get('title') == 'Q1: Subtractive Synths':
                        if 'explanation_image' in q:
                            if isinstance(q['explanation_image'], str):
                                q['explanation_image'] = img_path
                            elif isinstance(q['explanation_image'], dict) and 'src' in q['explanation_image']:
                                q['explanation_image']['src'] = img_path
                        else:
                            q['explanation_image'] = {'src': img_path, 'alt': 'Subtractive Synth Innovation'}
                            
                        # Set 'img' if it makes sense, but historically we stick to checking if it exists or use explanation_image
                        if 'img' in q:
                            q['img'] = img_path
                        updated = True

if updated:
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
        print("Updated JSON with new image: " + img_path)
else:
    print("Could not find the target question.")
