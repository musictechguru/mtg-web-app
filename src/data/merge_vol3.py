import json
import os

MAIN_FILE = 'dictionary_quizzes.json'
NEW_VOL_FILE = 'vol3_complex_quizzes.json'

def merge_datasets():
    if not os.path.exists(MAIN_FILE):
        print(f"Error: Main file {MAIN_FILE} not found.")
        return

    with open(MAIN_FILE, 'r') as f:
        main_data = json.load(f)

    with open(NEW_VOL_FILE, 'r') as f:
        vol3_data = json.load(f)

    # Check if vol3 already exists
    vol_index = -1
    for i, vol in enumerate(main_data['volumes']):
        if vol['id'] == 'vol3':
            vol_index = i
            break
    
    if vol_index != -1:
        print("Volume 3 already exists. Updating...")
        main_data['volumes'][vol_index] = vol3_data
    else:
        print("Appending Volume 3...")
        main_data['volumes'].append(vol3_data)
        
    # Sort volumes by ID to be safe (vol1, vol2, vol3...)
    # main_data['volumes'].sort(key=lambda x: x['id'])

    with open(MAIN_FILE, 'w') as f:
        json.dump(main_data, f, indent=2)

    print("Merge Complete. Volume 3 is live.")

if __name__ == "__main__":
    merge_datasets()
