import json
import glob
import os
import re

def update_t6_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic6 = next((t for t in stage2['items'] if "Topic 6" in t.get('title', '')), None)
    
    mappings = {
        0: 't6_q1_eq_definition_hq',
        1: 't6_q2_parametric_parameters_hq',
        2: 't6_q3_high_pass_filter_hq',
        3: 't6_q4_q_bandwidth_hq',
        4: 't6_q5_subtractive_additive_hq',
        5: 't6_q6_panning_definition_hq',
        6: 't6_q7_phantom_center_hq',
        7: 't6_q8_shelf_filter_hq',
        8: 't6_q9_subtractive_first_hq',
        9: 't6_q10_frequency_masking_hq',
        10: 't6_q11_eq_pocket_carving_hq',
        11: 't6_q12_graphic_eq_hq',
        12: 't6_q13_surgical_narrow_q_hq',
        13: 't6_q14_phase_shift_eq_hq',
        14: 't6_q15_dynamic_eq_hq',
        15: 't6_q16_pultec_eq_trick_hq',
        16: 't6_q17_lcr_panning_hq',
        17: 't6_q18_pan_law_compensation_hq',
        18: 't6_q19_mono_compatibility_bass_hq',
        19: 't6_q20_octave_frequency_math_hq'
    }
    
    for i, q in enumerate(topic6['questions']):
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
        print("Updated course_data.json completely for Topic 6.")

if __name__ == '__main__':
    update_t6_images()
