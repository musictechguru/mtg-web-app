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
    # Targeted IDs:
    # Modern Production & Technology Basic Q2: v10_t8_b_2
    # Vector & Phase Distortion Synthesis Basic Q6: v3_t11_b_6
    # Wind Instruments Basic Q1: v2_t8_b_1

    target_ids = {
        'v10_t8_b_2': { # Modern Production Q2
            'src': "/images/explanations/loudness_penalty_graph.svg",
            'alt': "Loudness Normalization Graph"
        },
        'v3_t11_b_6': { # Vector/Phase Distortion Q6
            'src': "/images/svg/synth_waveforms_comparison.svg",
            'alt': "Waveform Variety Comparison"
        },
        'v2_t8_b_1': { # Wind Instruments Q1
            'src': "/images/sax_micing_1770033437547.png",
            'alt': "Saxophone Microphone Placement"
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
