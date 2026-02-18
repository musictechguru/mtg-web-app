import json

MAIN_PATH = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
VOL2_PATH = 'vol2_complex_quizzes.json'

with open(MAIN_PATH, 'r') as f:
    main_data = json.load(f)

with open(VOL2_PATH, 'r') as f:
    vol2_data = json.load(f)

# Check if vol2 already exists
existing_ids = [v['id'] for v in main_data['volumes']]
if vol2_data['id'] in existing_ids:
    print("Volume 2 already exists. Updating it.")
    # Find existing index
    index = existing_ids.index(vol2_data['id'])
    main_data['volumes'][index] = vol2_data
else:
    print("Appending Volume 2.")
    main_data['volumes'].append(vol2_data)

with open(MAIN_PATH, 'w') as f:
    json.dump(main_data, f, indent=2)

print("Merge complete.")
