import json
import glob
import os
import re

def update_t4_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic4 = next((t for t in stage2['items'] if "Topic 4" in t.get('title', '')), None)
    
    mappings = {
        0: 't4_q1_cd_quality_hq',
        1: 't4_q2_sample_rate_hq',
        2: 't4_q3_midi_vs_audio_hq',
        3: 't4_q4_destructive_editing_hq',
        4: 't4_q5_midi_velocity_hq',
        5: 't4_q6_midi_range_127_hq',
        6: 't4_q7_digital_clipping_hq',
        7: 't4_q8_nyquist_theorem_hq',
        8: 't4_q9_normalization_hq',
        9: 't4_q10_24bit_noise_floor_hq',
        10: 't4_q11_16bit_steps_hq',
        11: 't4_q12_zero_crossing_hq',
        12: 't4_q13_round_robin_hq',
        13: 't4_q14_midi_note_60_hq',
        14: 't4_q15_sampler_pitch_shift_hq',
        15: 't4_q16_dithering_noise_hq',
        16: 't4_q17_noise_shaping_hq',
        17: 't4_q18_bit_depth_math_hq',
        18: 't4_q19_time_stretch_hq',
        19: 't4_q20_opto_isolator_hq'
    }
    
    for i, q in enumerate(topic4['questions']):
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
        print("Updated course_data.json completely for Topic 4.")

if __name__ == '__main__':
    update_t4_images()
