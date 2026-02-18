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
    target_ids = {
        'v9_t4_b_9': { # Absorption Q9
            'src': "/images/explanations/porous_absorber_diagram.svg",
            'alt': "Sound energy absorbed by porous material"
        },
        'v5_t13_b_9': { # Attack & Release Q9
            'src': "/images/explanations/slow_attack_transient.svg",
            'alt': "Slow Attack preserving transients"
        },
        'v10_t6_b_2': { # Analog Era Q2
            'src': "/images/explanations/tape_editing_razor.svg",
            'alt': "Physical Tape Editing with Razor Blade"
        },
        'v5_t12_i_6': { # Advanced Techniques Q6 (Sidechain)
            'src': "/images/explanations/sidechain_routing_visual.svg",
            'alt': "Sidechain Signal Flow Diagram"
        },
        'v6_t12_b_5': { # Stereo Width Q5 (Haas)
            'src': "/images/explanations/haas_effect_visual.svg",
            'alt': "Haas Effect: Short Delay = Width"
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
                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
