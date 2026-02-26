import json
import glob
import os
import re

def update_t5_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic5 = next((t for t in stage2['items'] if "Topic 5" in t.get('title', '')), None)
    
    mappings = {
        0: 't5_q1_compressor_function_hq',
        1: 't5_q2_compressor_threshold_hq',
        2: 't5_q3_compressor_ratio_hq',
        3: 't5_q4_attack_time_hq',
        4: 't5_q5_release_time_hq',
        5: 't5_q6_makeup_gain_hq',
        6: 't5_q7_noise_gate_hq',
        7: 't5_q8_compression_math_hq',
        8: 't5_q9_hard_vs_soft_knee_hq',
        9: 't5_q10_limiter_brickwall_hq',
        10: 't5_q11_opto_compressor_hq',
        11: 't5_q12_fet_1176_compressor_hq',
        12: 't5_q13_parallel_compression_hq',
        13: 't5_q14_sidechain_ducking_hq',
        14: 't5_q15_variable_mu_fairchild_hq',
        15: 't5_q16_vca_ssl_glue_compressor_hq',
        16: 't5_q17_upward_expansion_hq',
        17: 't5_q18_low_frequency_distortion_hq',
        18: 't5_q19_lookahead_limiter_hq',
        19: 't5_q20_true_peak_limiting_hq'
    }
    
    for i, q in enumerate(topic5['questions']):
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
        print("Updated course_data.json completely for Topic 5.")

if __name__ == '__main__':
    update_t5_images()
