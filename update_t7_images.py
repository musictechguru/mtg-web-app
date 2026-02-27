import json
import glob
import os
import re

def update_t7_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic7 = next((t for t in stage2['items'] if "Topic 7" in t.get('title', '')), None)
    
    mappings = {
        0: 't7_q1_rt60_decay_hq',
        1: 't7_q2_early_reflections_hq',
        2: 't7_q3_delay_definition_hq',
        3: 't7_q4_predelay_gap_hq',
        4: 't7_q5_slapback_delay_hq',
        5: 't7_q6_hall_reverb_rt60_hq',
        6: 't7_q7_delay_feedback_hq',
        7: 't7_q8_aux_return_wet_hq',
        8: 't7_q9_emt140_plate_reverb_hq',
        9: 't7_q10_reverb_damping_hq',
        10: 't7_q11_convolution_ir_hq',
        11: 't7_q12_abbey_road_eq_hq',
        12: 't7_q13_dotted_eighth_delay_hq',
        13: 't7_q14_time_pitch_warp_hq',
        14: 't7_q15_de_essing_reverb_hq',
        15: 't7_q16_haas_stereo_delay_hq',
        16: 't7_q17_ducking_reverb_hq',
        17: 't7_q18_space_echo_heads_hq',
        18: 't7_q19_shimmer_reverb_hq',
        19: 't7_q20_gated_snare_reverb_hq'
    }
    
    for i, q in enumerate(topic7['questions']):
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
        print("Updated course_data.json completely for Topic 7.")

if __name__ == '__main__':
    update_t7_images()
