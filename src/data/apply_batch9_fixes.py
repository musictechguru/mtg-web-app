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
    # Targeted IDs located in previous steps:
    # General Micing Techniques Basic Q7: v2_t4_b_7
    # Damping & Size Basic Q7: v7_t15_b_7

    target_ids = {
        'v2_t4_b_7': { # General Micing Q7
            'src': "/images/svg/phase_cancellation.svg",
            'alt': "Phase Cancellation Diagram"
        },
        'v7_t15_b_7': { # Damping & Size Q7
            'src': "/images/svg/acoustics_rt60_decay_room_comparison.svg",
            'alt': "Room Decay Time Comparison (RT60)"
        }
    }

    volumes = data.get('volumes', [])
    for volume in volumes:
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                for level_name, questions in topic.get('levels', {}).items():
                    for q in questions:
                        q_id = q.get('id')
                        
                        if q_id in target_ids:
                            print(f"Updating {q_id} ({q.get('title')})...")
                            update = target_ids[q_id]
                            
                            q['explanation_image'] = {
                                "src": update['src'],
                                "alt": update['alt']
                            }
                            print(f"  - Set image to {update['src']}")
                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
