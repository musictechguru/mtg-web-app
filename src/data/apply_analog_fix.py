import json
import os

def update_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updates_made = 0
    # Analog Era History - Basic Question 10
    target_id = 'v10_t6_b_10'
    new_image_src = "/images/explanations/tape_editing_razor.svg"
    new_image_alt = "Physical Tape Editing with Razor Blade"

    volumes = data.get('volumes', [])
    for volume in volumes:
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                for level_name, questions in topic.get('levels', {}).items():
                    for q in questions:
                        if q.get('id') == target_id:
                            print(f"Updating {target_id} ({q.get('title')})...")
                            print(f"  Old Image: {q.get('explanation_image', {}).get('src')}")
                            
                            q['explanation_image'] = {
                                "src": new_image_src,
                                "alt": new_image_alt
                            }
                            print(f"  New Image: {new_image_src}")
                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
