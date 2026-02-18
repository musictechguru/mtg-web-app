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
    # Targeted IDs detected in previous steps:
    # Advanced Techniques Q6: v5_t12_b_6
    # Rock Production Q6: v10_t9_b_6
    # Microphone Accessories Q3: v2_t12_i_3

    target_ids = {
        'v5_t12_b_6': { # Advanced Tech Q6
            'src': "/images/explanations/sidechain_ducking_graph.svg",
            'alt': "Sidechain Ducking Graph"
        },
        'v10_t9_b_6': { # Rock Production Q6
            'src': "/images/svg/mic_dynamic.svg",
            'alt': "Dynamic Microphone (e.g. SM7B)"
        },
        'v2_t12_i_3': { # Mic Access Q3
            'src': "/images/svg/mic_pop_filter_setup.svg",
            'alt': "Mic with Pop Filter",
            'quote': {
                "text": "Pop filters stop plosives indoors; Foam windscreens stop wind noise outdoors.",
                "author": "Field Recording Rule"
            }
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
                            
                            if 'src' in update:
                                q['explanation_image'] = {
                                    "src": update['src'],
                                    "alt": update['alt']
                                }
                                print(f"  - Set image to {update['src']}")
                            
                            if 'quote' in update:
                                q['expert_quote'] = update['quote']
                                print(f"  - Set quote to: {update['quote']['text'][:30]}...")

                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
