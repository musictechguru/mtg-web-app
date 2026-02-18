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
        'v5_t5_i_10': { # VCA Techniques Basic Q10
            'src': "/images/explanations/compression_attack_delay.svg",
            'alt': "Visualizing Attack Time delay"
        },
        'v9_t12_b_7': { # Headphones & Monitoring Basic Q7 (Found ID by inference earlier, will double check)
                        # Wait, ID for "SPL calibration" needs confirmation.
                        # Step 460 showed v9_t12_b_6 then the start of Q7. 
                        # Assuming sequential IDs: v9_t12_b_7.
            'src': "/images/svg/fletcher_munson_curve_loudness.svg",
            'alt': "Fletcher-Munson Equal Loudness Curve",
            'expert_explanation': "Monitoring at 85dB SPL is a standard reference level that provides a balanced frequency response (Fletcher-Munson) and reduces ear fatigue over long listening sessions."
        },
        'v5_t4_i_10': { # Knee & Makeup Basic Q10
            'src': "/images/explanations/1176_compressor_visual.svg",
            'alt': "1176 Compressor Interface"
        },
        'v1_t4_b_2': { # Recording Chain Basic Q2
            'src': "/images/explanations/high_spl_mic_diagram.svg",
            'alt': "Microphone converting acoustic energy to electrical signal"
        }
    }

    volumes = data.get('volumes', [])
    for volume in volumes:
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                for level_name, questions in topic.get('levels', {}).items():
                    for q in questions:
                        q_id = q.get('id')
                        
                        # Handle potential ID mismatch for Headphones Q7 if needed
                        # But v9_t12_b_7 fits the pattern.
                        
                        if q_id in target_ids:
                            print(f"Updating {q_id} ({q.get('title')})...")
                            update = target_ids[q_id]
                            
                            # Verify if it's the right question content for safety
                            if q_id == 'v9_t12_b_7' and "SPL calibration" not in q.get('content', ''):
                                print(f"WARNING: ID {q_id} content mismatch! Skipping explanation update.")
                                # Still update image if likely match, but be careful.
                                # Actually, better to check content.
                                continue

                            q['explanation_image'] = {
                                "src": update['src'],
                                "alt": update['alt']
                            }
                            
                            if 'expert_explanation' in update:
                                q['expert_explanation'] = update['expert_explanation']
                                print(f"  - Updated expert_explanation")

                            updates_made += 1

    if updates_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updates_made} questions in {file_path}")
    else:
        print("No matching questions found to update.")

if __name__ == "__main__":
    update_quizzes()
