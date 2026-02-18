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
    # Vector & Phase Distortion Basic Q1: v3_t11_b_1
    # Modern Production & Technology Basic Q3: v10_t8_b_3
    # General MIDI & Advanced MIDI Basic Q6: v4_t12_b_6
    # USB & Digital Connections Basic Q1: v10_t5_b_1
    # Mixer Controls Basic Q9: v1_t11_b_9

    target_ids = {
        'v3_t11_b_1': { # Vector Q1
            'src': "/images/svg/automation.svg",
            'alt': "Automation Curves for Vector Control"
        },
        'v10_t8_b_3': { # Modern Q3
            'src': "/images/svg/audio_interface.svg",
            'alt': "Audio Interface Diagram"
        },
        'v4_t12_b_6': { # General MIDI Q6
            'src': "/images/explanations/midi_controllers_visual.svg",
            'alt': "MIDI Controllers (Wheels & Pads)"
        },
        'v10_t5_b_1': { # USB Q1
            'src': "/images/svg/equipment_digital_connectors_usb_thunderbolt.svg",
            'alt': "Digital Connectors (USB/Thunderbolt)"
        },
        'v1_t11_b_9': { # Mixer Q9
            'src': "/images/explanations/stereo_panning_arc.svg",
            'alt': "Stereo Panning Arc"
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
