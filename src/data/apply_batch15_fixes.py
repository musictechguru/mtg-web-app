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
    # Targeted IDs detected/verified:
    # Additive EQ Q3: v6_t8_b_2 (Confirmed: 'What's considered a "subtle" boost...')? No. v6_t8_b_3?
    # Wait, previous view showed v6_t8_b_2 was Question 3. "v6_t8_b_1" was Q1. "v6_t8_b_2" was Q3? No.
    # Let's re-verify from previous output:
    # 45735: "Question 2" -> content: "When should you typically use additive EQ..." -> v6_t8_b_1 was Q2?? No. 
    # 45766: "id": "v6_t8_b_2" -> belongs to Q2.
    # 45769: "Question 3" -> "Subtle boost..." -> so ID is likely v6_t8_b_3.
    #
    # Monitor Placement Q8: v9_t11_b_8 (Confirmed in view: "Toe-in refers to...")
    # ADSR Q1: v3_t4_b_1 (Assumed based on "Question 1" request and standard ID).
    # Mastering Fund Q1: v8_t1_b_1 (Confirmed: "Mastering is...")
    # Stereo Width Q2: v6_t12_b_2 (Confirmed: "Heavy stereo widening... thin in mono")
    # Attack Release Q7: Need to find ID for "Release is too slow" content. Searching...
    # Tube Digital Q5: v5_t8_i_5 (Confirmed: "Manley Variable Mu...") Wait. User said "Basic Q5". 
    # v5_t8_i_5 is Intermediate? "v5_t8_i_5" is ID. Topic 8 is Tube/Digital.
    # User said "Basic". Let's check Basic Q5 in Topic 8.
    # Basic Q5 in Topic 8 likely v5_t8_b_5.
    
    target_ids = {
        'v6_t8_b_3': { # Additive EQ Q3 (Subtle boost)
            'src': "/images/svg/eq_bell_curve_q_comparison.svg",
            'alt': "EQ Boosting Curves (Subtle vs Aggressive)"
        },
        'v9_t11_b_8': { # Monitor Placement Q8 (Toe-in)
            'src': "/images/svg/monitoring_speaker_triangle_placement.svg",
            'alt': "Speaker Toe-In Angle Diagram"
        },
        'v3_t4_b_1': { # ADSR Basic Q1
            'src': "/images/gen/adsr_envelope.png",
            'alt': "Standard ADSR Envelope Graph"
        },
        'v8_t1_b_1': { # Mastering Basic Q1
            'src': "/images/svg/daw_interface.svg",
            'alt': "DAW Mastering Session View"
        },
        'v6_t12_b_2': { # Stereo Width Basic Q2
            'src': "/images/explanations/phase_correlation_visual.svg",
            'alt': "Phase Correlation Meter Reading"
        },
        'v5_t3_b_7': { # Attack/Release Basic Q7 (Assumption - verified by grep content if found)
            'src': "/images/svg/compression_attack_release.svg",
            'alt': "Compression Release Curve"
        },
        'v5_t8_b_5': { # Tube/Digital Basic Q5 (Assumption - verifying vs Intermediate)
            'src': "/images/svg/digital_quantization_error_steps.svg",
            'alt': "Digital Audio Quantization Steps"
        }
    }

    # Special logic for Q7 and Q5 if IDs differ:
    # I'll iterate and check titles/content if possible or rely on the Ids.
    # The grep for "Release is too slow" will help confirm Q7 ID.
    # If not found, I will print available questions for Topic 3 Basic.

    volumes = data.get('volumes', [])
    for volume in volumes:
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                for level_name, questions in topic.get('levels', {}).items():
                    for q in questions:
                        q_id = q.get('id')
                        q_title = q.get('title', '')
                        q_content = q.get('content', '')

                        # Check for "Release is too slow" text to confirm Attack Q7 ID
                        if 'Release is too slow' in q_content or 'Release is too slow' in str(q.get('answers')):
                             if 'v5_t3' in q_id:
                                 print(f"Found 'Release is too slow' in {q_id}. Updating image.")
                                 q['explanation_image'] = {
                                     "src": "/images/svg/compression_attack_release.svg",
                                     "alt": "Compression Release Curve"
                                 }
                                 updates_made += 1
                                 continue # Skip the dictionary lookup for this one

                        # Check for Tube/Digital Basic Q5 content if ID not standard
                        if q_title == "Question 5" and "Tube" in topic.get('title', '') and "Digital" in topic.get('title', '') and level_name == 'basic':
                             print(f"Found Tube/Digital Basic Q5 ({q_id}). Updating image.")
                             q['explanation_image'] = {
                                 "src": "/images/svg/digital_quantization_error_steps.svg",
                                 "alt": "Digital Audio Quantization Steps"
                             }
                             updates_made += 1
                             continue

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
