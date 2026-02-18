import json
import os

MAIN_FILE = 'dictionary_quizzes.json'
NEW_VOL_FILE = 'vol4_complex_quizzes.json'

def merge_datasets():
    if not os.path.exists(MAIN_FILE):
        print(f"Error: Main file {MAIN_FILE} not found.")
        return

    with open(MAIN_FILE, 'r') as f:
        main_data = json.load(f)

    with open(NEW_VOL_FILE, 'r') as f:
        vol4_data = json.load(f)

    # Check if vol4 already exists
    vol_index = -1
    for i, vol in enumerate(main_data['volumes']):
        if vol['id'] == 'vol4':
            vol_index = i
            break
    
    if vol_index != -1:
        print("Volume 4 already exists. Updating...")
        main_data['volumes'][vol_index] = vol4_data
    else:
        print("Appending Volume 4...")
        main_data['volumes'].append(vol4_data)

    with open(MAIN_FILE, 'w') as f:
        json.dump(main_data, f, indent=2)

    print("Merge Complete. Volume 4 is live.")

if __name__ == "__main__":
    merge_datasets()
