import json
import shutil
import glob
import os

artifacts_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
dest_dir = "public/images/Dictiionary_Quiz_image_Pool"

image_mappings = {
    "Topic 1: Fundamentals & Recording (Part 1)": {
        '3': "t1p1_q3_phantom_power",
        '7': "t1p1_q7_bit_depth",
        '8': "t1p1_q8_preamp_gain"
    },
    "Topic 7: FX & Processors (Part 2)": {
        '1': "t7p2_q1_rt60",
        '3': "t7p2_q3_room_reverb",
        '4': "t7p2_q4_spring_reverb",
        '5': "t7p2_q5_reverb_decay",
        '6': "t7p2_q6_bbd_chip",
        '7': "t7p2_q7_chorus_pedal",
        '8': "t7p2_q8_vibrato",
        '9': "t7p2_q9_distortion_clipping"
    },
    "Topic 8: Mastering (Part 2)": {
        '2': "t8p2_q2_peak_reduction",
        '3': "t8p2_q3_lufs_comparison",
        '4': "t8p2_q4_lra_meter",
        '5': "t8p2_q5_streaming_lufs",
        '6': "t8p2_q6_ebu_r128",
        '7': "t8p2_q7_dithering",
        '8': "t8p2_q8_tonal_eq",
        '9': "t8p2_q9_mastering_compression"
    },
    "Topic 9: Acoustics (Part 2)": {
        '1': "t9p2_q1_spl_doubling",
        '2': "t9p2_q2_inverse_square",
        '3': "t9p2_q3_angle_incidence",
        '4': "t9p2_q4_absorption",
        '5': "t9p2_q5_diffuser_wells",
        '6': "t9p2_q6_room_modes",
        '7': "t9p2_q7_room_volume",
        '8': "t9p2_q8_membrane_absorber",
        '9': "t9p2_q9_mirror_trick",
        '10': "t9p2_q10_amp_power_doubling"
    },
    "Topic 10: Equipment (Part 2)": {
        '1': "t10p2_q1_nyquist_96k",
        '3': "t10p2_q3_midi_velocity",
        '4': "t10p2_q4_gain_staging",
        '8': "t10p2_q8_dat_tape",
        '9': "t10p2_q9_lufs_meter",
        '10': "t10p2_q10_sm57_on_axis"
    }
}

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == "Stage 2: Topic Mastery Quizzes":
        for quiz in section.get('items', []):
            quiz_title = quiz.get('title')
            if quiz_title in image_mappings:
                mapping = image_mappings[quiz_title]
                for i, q in enumerate(quiz.get('questions', [])):
                    q_num = str(i + 1)
                    if q_num in mapping:
                        key = mapping[q_num]
                        files = glob.glob(f"{artifacts_dir}/{key}_*.png")
                        if files:
                            latest_file = sorted(files)[-1]
                            dest_filename = f"{key}.png"
                            dest_path = f"{dest_dir}/{dest_filename}"
                            shutil.copy(latest_file, dest_path)
                            q['img'] = f"/images/Dictiionary_Quiz_image_Pool/{dest_filename}"
                            print(f"Injected {key} into {quiz_title} Q{q_num}")
                        else:
                            print(f"WARNING: Image for {key} not found!")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Stage 2 images fully injected seamlessly.")
