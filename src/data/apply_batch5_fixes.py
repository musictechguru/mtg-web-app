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
        'v4_t5_i_7': { # Quantization Basic Q7
            'src': "/images/explanations/bit_depth_quantization_comparison.svg",
            'alt': "16-bit vs 24-bit Quantization Steps"
        },
        'v4_t7_i_6': { # Multi-Sampling Basic Q6
            'src': "/images/explanations/multi_sampling_layers_diagram.svg",
            'alt': "Dimensions of a Modern Sample Library"
        },
        'v8_t8_b_4': { # Mastering EQ Q4 (HPF)
            'src': "/images/explanations/mastering_hpf_curve.svg",
            'alt': "Mastering Low Cut Filter (HPF)"
        },
        'v8_t8_b_6': { # Mastering EQ Q6 (M/S)
            'src': "/images/explanations/mid_side_eq_mastering.svg",
            'alt': "Mid/Side EQ Strategy in Mastering"
        },
        'v3_t3_b_10': { # Special Waveforms Basic Q10 (Sub-Oscillator)
            'src': "/images/explanations/sub_oscillator_visual.svg",
            'alt': "Sub-Oscillator adding LFE",
            'expert_explanation': "Sub-oscillators enable you to add low-end weight to a sound. They are usually a square or sine wave tuned one octave below the main oscillator."
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
                            
                            # Update Image
                            q['explanation_image'] = {
                                "src": update['src'],
                                "alt": update['alt']
                            }
                            
                            # Update Explanation if provided
                            if 'expert_explanation' in update:
                                q['expert_explanation'] = update['expert_explanation']
                                print(f"  - Updated expert_explanation for {q_id}")

                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
