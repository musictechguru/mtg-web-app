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
    # IDs need to be accurate.
    # EDM/Dance Production Basic Q5 -> v10_t10_b_5
    # Physical Modeling & Sampling Basic Q7 -> v3_t6_b_7 (Checking part 1, topic 6 "Physical Modeling/Sampling")
    # EDM/Dance Production Basic Q1 -> v10_t10_b_1
    # Preventing Clipping & Headroom Basic Q3 -> v1_t3_b_3
    # Bass Traps Basic Q5 -> v9_t8_b_5
    # Acoustic Panels & Treatment Basic Q10 -> v9_t9_b_10

    target_ids = {
        'v10_t10_b_5': { # EDM Q5
            'src': "/images/svg/synth_adsr.svg",
            'alt': "Synth ADSR Envelope (Risers/Buildups)"
        },
        'v3_t6_b_7': { # Multisample Q7. Need to confirm ID logic matching Volume 3 (Synthesis).
                       # Wait, "Physical Modeling & Sampling" might be Vol 3 or Vol 10? 
                       # Viewing file roughly line 22590 (Vol 3?).
            'src': "/images/svg/sampler_multisample_map.svg",
            'alt': "Multisample Key Mapping Diagram"
        },
        'v10_t10_b_1': { # EDM Q1
            'src': "/images/Alchemy Synth.png",
            'alt': "Alchemy Synthesizer Interface"
        },
        'v1_t3_b_3': { # Clipping Q3
            'src': "/images/svg/red_light_clipping.svg",
            'alt': "Digital Clipping Indicator (Red Light)"
        },
        'v9_t8_b_5': { # Bass Traps Q5
            'src': "/images/svg/acoustics_bass_trap_corner_placement.svg",
            'alt': "Bass Trap Corner Placement Diagram"
        },
        'v9_t9_b_10': { # Acoustic Panels Q10
            'src': "/images/explanations/monitoring_environment.svg",
            'alt': "Studio Environment with Acoustic Treatment"
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
