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
        'v9_t9_b_8': { # Acoustic Panels Basic Q8
            'src': "/images/explanations/monitoring_environment.svg",
            'alt': "Studio monitoring environment with acoustic treatment"
        },
        'v10_t11_b_10': { # Hip-Hop Basic Q10
            'src': "/images/studio-gear-akai-s1000.jpg",
            'alt': "Akai S1000 Sampler (Legendary Hip-Hop Tool)"
        },
        'v9_t11_b_1': { # Monitor Placement Basic Q1
            'src': "/images/svg/monitoring_speaker_triangle_placement.svg",
            'alt': "Equilateral Triangle Speaker Setup"
        },
        'v6_t8_b_6': { # Additive EQ Basic Q6
            'src': "/images/explanations/additive_eq_keywords.svg",
            'alt': "EQ Keywords: Presence, Air, Thump"
        },
        'v6_t4_b_8': { # Parametric EQ Basic Q8
            'src': "/images/explanations/subtractive_eq_curve.svg",
            'alt': "Subtractive EQ Curve (Removing Resonance)"
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
                            
                            # Sanity check content for Parametric Q8 which was inferred
                            if q_id == 'v6_t4_b_8' and "387Hz" not in q.get('content', ''):
                                print(f"WARNING: Content mismatch for {q_id}. Skipping to be safe.")
                                continue

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
