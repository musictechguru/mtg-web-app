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
    # Attack & Release Q10: v5_t13_b_10
    # Stereo Fundamentals Q4: v6_t10_b_4
    # Headphones Q1: v9_t12_b_1
    # Modern Production Q4: v10_t8_b_4
    # Stereo Recording Q3: v1_t7_b_3
    # Performance Controls Q10: v3_t12_b_10

    target_ids = {
        'v5_t13_b_10': { # Attack Q10
            'src': "/images/svg/transient_waveform_v2.svg",
            'alt': "Transient Waveform with Attack Phase"
        },
        'v6_t10_b_4': { # Stereo Q4
            'src': "/images/svg/pan_pot.svg",
            'alt': "Pan Pot Hard Left"
        },
        'v9_t12_b_1': { # Headphones Q1 (Ensuring this is set correctly)
            'src': "/images/explanations/open_vs_closed_headphones.svg",
            'alt': "Diagram of Headphone types"
        },
        'v10_t8_b_4': { # Modern Production Q4
            'src': "/images/svg/daw_interface.svg",
            'alt': "DAW Interface Example"
        },
        'v1_t7_b_3': { # Stereo Recording Q3
            'src': "/images/explanations/phase_correlation_visual.svg",
            'alt': "Phase Correlation Meter"
        },
        'v3_t12_b_10': { # Performance Q10
            'src': "/images/svg/synth_signal_flow.svg",
            'alt': "Synthesizer Signal Flow Overview"
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
