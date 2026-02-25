import json
import os

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# If an image is missing, we will fallback to something generic that exists.
fallback_map = {
    # Sequencing
    "seq_60": "/images/analog_polyphony_synth.png",
    "seq_70": "/images/analog_polyphony_synth.png",
    "seq_80": "/images/midi_piano_roll.svg",
    "seq_90": "/images/vintage_tracker_software.png",
    "seq_00": "/images/daw_interface.svg",
    
    # Distortion
    "dist_50": "/images/svg/preamp_gain.svg",
    "dist_60": "/images/Monster Fuzz pedal.png",
    "dist_70": "/images/svg/preamp_gain.svg",
    "dist_80": "/images/Monster Fuzz pedal.png",
    "dist_90": "/images/vst_plugin_architecture_diagram.png",
    
    # Sampling
    "samp_00": "/images/sampler_panel.png",
    
    # Synthesis
    "synth_60": "/images/analog_polyphony_synth.png",
    "synth_90": "/images/massive_synth.png",
    
    # Reverb
    "rev_50": "/images/diagram_reverb.png",
    "rev_70": "/images/reverb_plugin.png",
    "rev_80": "/images/reverb_plugin.png",
    "rev_90": "/images/reverb_plugin.png",
    "rev_00": "/images/reverb_plugin.png",
    
    # Delay
    "del_50": "/images/Tape delay picture.png",
    "del_70": "/images/delay_slapback.svg",
    "del_80": "/images/delay_slapback.svg",
    "del_90": "/images/delay_slapback.svg",
    
    # Guitars
    "gui_50": "/images/Acoustic guitar.jpg",
    "gui_60": "/images/Acoustic guitar.jpg",
    "gui_70": "/images/Acoustic guitar.jpg",
    "gui_80": "/images/Acoustic guitar.jpg",
    "gui_90": "/images/Acoustic guitar.jpg"
}

images_dir = 'public'

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for question in item.get('questions', []):
                    if question.get('type') == 'timeline':
                        for q_item in question.get('items', []):
                            img_path = q_item.get('img')
                            if img_path:
                                full_path = os.path.join(images_dir, img_path.lstrip('/'))
                                if not os.path.exists(full_path):
                                    item_id = q_item.get('id')
                                    if item_id in fallback_map:
                                        print(f"Replacing missing {img_path} with {fallback_map[item_id]}")
                                        q_item['img'] = fallback_map[item_id]
                                    else:
                                        # Default totally generic fallback
                                        q_item['img'] = "/images/daw_interface.svg"
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Fixed missing images.")

