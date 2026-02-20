import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'
with open(quiz_file, 'r') as f:
    data = json.load(f)

img_path = '/images/Dictiionary_Quiz_image_Pool/history_synth_hq.png'
found = False

for element in data:
    if 'items' in element:
        for item in element['items']:
            if item.get('id') == 'quiz-history-2':
                for q in item.get('questions', []):
                    if q.get('title') == 'Q1: Subtractive Synths':
                        print(f"Found Q1! current keys: {q.keys()}")
                        q['img'] = img_path
                        q['explanation_image'] = {'src': img_path, 'alt': 'Subtractive Synth Innovation'}
                        found = True
                        break

if found:
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
        print("Forced update applied to course_data.json")
else:
    print("STILL could not find the target question.")
