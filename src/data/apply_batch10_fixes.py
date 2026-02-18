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
    # Digital Era History (1980s-Present) Basic Q1: v10_t7_b_1
    # EDM/DANCE PRODUCTION Basic Q3: v10_t10_b_3

    target_ids = {
        'v10_t7_b_1': { # Digital Era History Q1
            'src': "/images/svg/history_midi_connection_loop.svg",
            'alt': "MIDI Connection Loop Diagram"
        },
        'v10_t10_b_3': { # EDM Q3
            'src': "/images/explanations/sidechain_ducking_graph.svg",
            'alt': "Sidechain Ducking Envelope Graph"
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
