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

    volumes = data.get('volumes', [])
    for volume in volumes:
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                for level_name, questions in topic.get('levels', {}).items():
                    for q in questions:
                        q_id = q.get('id')
                        
                        # Fix Mid/Side Q5
                        if q_id == 'v6_t11_b_5':
                            print(f"Updating {q_id}...")
                            q['explanation_image'] = {
                                "src": "/images/explanations/mid_side_eq_cut.svg",
                                "alt": "Mid Channel EQ Cut Diagram"
                            }
                            updates_made += 1

                        # Fix Analog Era Q1
                        if q_id == 'v10_t6_b_1':
                            print(f"Updating {q_id}...")
                            q['explanation_image'] = {
                                "src": "/images/explanations/phonograph_diagram.svg",
                                "alt": "Edison Phonograph Diagram"
                            }
                            # Update explanation to be relevant to Phonograph
                            q['expert_explanation'] = "Edison's Phonograph (1877) was the first machine to record and reproduce sound. It used a stylus to indent sound waves onto a rotating tinfoil (later wax) cylinder, mechanically preserving the waveform."
                            q['expert_quote'] = {
                                "text": "Mary had a little lamb...",
                                "author": "Thomas Edison (First Recording)"
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
