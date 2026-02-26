import json
import glob
import os
import re

def update_t3_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic3 = next((t for t in stage2['items'] if "Topic 3" in t.get('title', '')), None)
    
    mappings = {
        0: 't3_q1_subtractive_flow_hq',
        1: 't3_q2_sine_wave_hq',
        2: 't3_q3_vcf_filter_hq',
        3: 't3_q4_adsr_release_hq',
        4: 't3_q5_lfo_mod_hq',
        5: 't3_q6_vco_oscillator_hq',
        6: 't3_q7_multisample_map_hq',
        7: 't3_q8_square_wave_hq',
        8: 't3_q9_high_pass_filter_hq',
        9: 't3_q10_filter_resonance_hq',
        10: 't3_q11_fm_synthesis_hq',
        11: 't3_q12_vco_drift_hq',
        12: 't3_q13_tremolo_vca_hq',
        13: 't3_q14_granular_cloud_hq',
        14: 't3_q15_square_odd_harmonics_hq',
        15: 't3_q16_additive_synthesis_hq',
        16: 't3_q17_filter_slopes_hq',
        17: 't3_q18_wavetable_scanning_hq',
        18: 't3_q19_round_robin_hq',
        19: 't3_q20_tb303_acid_hq'
    }
    
    for i, q in enumerate(topic3['questions']):
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
        print("Updated course_data.json completely for Topic 3.")

if __name__ == '__main__':
    update_t3_images()
