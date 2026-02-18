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
        'v6_t2_b_3': { # Q (Bandwidth) Basic Q3
            'src': "/images/explanations/eq_wide_vs_narrow.svg",
            'alt': "Wide Q vs Narrow Q Comparison"
        },
        'v8_t10_b_5': { # Limiting Basic Q5
            'src': "/images/explanations/limiter_overcompression.svg",
            'alt': "Visualizing Limiter Distortion"
        },
        'v2_t3_i_7': { # Polar Patterns Intermediate Q7 (checked as "Figure 8 nulls" content)
            'src': "/images/explanations/figure_8_null_zones.svg",
            'alt': "Figure-8 Null Points (90°/270°)"
        },
        'v5_t13_b_6': { # Attack & Release Basic Q6
            'src': "/images/explanations/compression_attack_delay.svg",
            'alt': "Visualizing Attack Time Delay"
        }
    }

    # Also check if user meant Basic Q7 for Polar Patterns (it might not exist, but let's check)
    # The topic is v2_t3 (Topic 3 in Volume 2 is Microphones/Polar Patterns usually).
    # We will search for ANY Q7 in that topic if the ID doesn't match perfectly or if we want to be robust.
    # But for now, sticking to the IDs we found during inspection is safest.

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
