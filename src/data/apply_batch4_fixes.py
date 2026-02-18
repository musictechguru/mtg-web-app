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
        'v3_t8_b_3': { # Additive & FM Basic Q3
            'src': "/images/explanations/additive_synthesis_summation.svg",
            'alt': "Summing Sine Waves to create Complex Tones"
        },
        'v5_t13_b_10': { # Attack & Release Basic Q10
            'src': "/images/explanations/fast_attack_transient_loss.svg",
            'alt': "Fast Attack causing Transient Loss"
        },
        'v5_t9_i_9': { # Limiting Basic Q9 (Wait, ID is v5_t9_i_9 which is Intermediate, check view_file)
                       # Checking Step 264 view_file: "id": "v5_t9_i_9" question "Limiter with inf:1 ratio". 
                       # User said Basic Q9, but the ID suggests Intermediate. I'll target the ID I found.
            'src': "/images/explanations/infinite_ratio_brickwall.svg",
            'alt': "Infinite Ratio (Brickwall) Limiting"
        },
        'v4_t2_b_10': { # Sample Processing Basic Q10 (Normalization)
            'src': "/images/explanations/normalization_volume_only.svg",
            'alt': "Normalization increases Volume, not Dynamics"
        },
        'v6_t10_b_9': { # Stereo Fundamentals Basic Q9 (Panning)
            'src': "/images/explanations/mirror_panning_balance.svg",
            'alt': "Symmetrical Panning Balance"
        },
        'v2_t7_i_5': { # Vocals Basic Q5 (High SPL) - Again, ID is v2_t7_i_5 (Intermediate).
                       # Checking Step 267 view_file: "id": "v2_t7_i_5" content "loud opera singer". 
            'src': "/images/explanations/high_spl_mic_diagram.svg",
            'alt': "Dynamic Mic handling High SPL"
        },
        'v2_t10_i_5': { # Advanced Stereo Basic Q5 (ORTF) - ID v2_t10_i_5 (Intermediate).
                        # Checking Step 268 view_file: "id": "v2_t10_i_5" content "ORTF".
            'src': "/images/explanations/ortf_pair_diagram.svg",
            'alt': "ORTF Stereo Pair Diagram"
        },
        # ALSO Re-applying Haas Effect just in case
        'v6_t12_b_5': { 
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
