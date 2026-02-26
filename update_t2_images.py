import json
import glob
import os
import re

def update_t2_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic2 = next((t for t in stage2['items'] if "Topic 2" in t.get('title', '')), None)
    
    mappings = {
        0: 't2_q1_dynamic_mic_hq',
        1: 't2_q2_acoustic_12th_fret_hq',
        2: 't2_q3_omni_pattern_hq',
        3: 't2_q4_ribbon_phantom_hq',
        4: 't2_q5_gain_vs_volume_hq',
        5: 't2_q6_3to1_rule_hq',
        6: 't2_q7_cymbals_condenser_hq',
        7: 't2_q6_kick_drum_hq',
        8: 't2_q8_tom_mics_hq',
        9: 't2_q10_untreated_room_hq',
        10: 't2_q11_room_reflections_hq',
        11: 't2_q7_brass_pad_hq',
        12: 't2_q13_brass_distance_hq',
        13: 't2_q14_piano_radiation_hq',
        14: 't2_q15_treated_vocal_omni_hq',
        15: 't2_q16_analog_clipping_hq',
        16: 't2_q17_mid_side_mics_hq',
        17: 't2_q18_spaced_pair_piano_hq',
        18: 't2_q19_spaced_pair_acoustic_hq',
        19: 't2_q20_blumlein_pair_hq'
    }
    
    for i, q in enumerate(topic2['questions']):
        prefix = mappings.get(i)
        if not prefix: continue
        
        matches = glob.glob(f'public/images/gen/{prefix}_*.png')
        if matches:
            filename = os.path.basename(matches[0])
            new_path = f'/images/gen/{filename}'
            print(f"Updating Q{i+1} image to {new_path}")
            q['img'] = new_path
            q['explanation'] = re.sub(r'<img src="[^"]+"', f'<img src="{new_path}"', q['explanation'])
        else:
            print(f"Could not find image for Q{i+1}: {prefix}")
            
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        print("Updated course_data.json successfully.")

if __name__ == '__main__':
    update_t2_images()
