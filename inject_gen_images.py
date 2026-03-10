import os
import json
import shutil
import glob

# Mapping of generated internal names to Question IDs
generated_map = {
    "v1_t7_i_4": "xy_stereo_technique_diagram",
    "v1_t10_b_8": "ts_instrument_cable",
    "v3_t10_b_2": "physical_modeling_synthesis_concept",
    "v3_t10_b_5": "multisampling_keyboard_diagram",
    "v3_t10_b_8": "software_sampler_interface",
    "v3_t10_i_3": "multisampling_realism_diagram",
    "v4_t11_b_3": "midi_cc_10_pan_knob",
    "v4_t11_b_7": "midi_cc_74_cutoff_knob",
    "v4_t11_b_8": "midi_cc_91_reverb_knob",
    "v5_t10_i_8": "expander_vs_gate_diagram",
    "v8_t14_i_9": "headroom_10dbfs_meter",
    "v8_t11_b_2": "daw_audio_region_clip",
    "v8_t11_b_10": "daw_region_editing",
    "v8_t12_b_2": "crossfade_audio_diagram",
    "v9_t3_b_10": "acoustic_reflection_diagram",
    "v9_t11_b_5": "studio_monitor_symmetry_diagram",
    "v9_t11_b_9": "equilateral_triangle_speakers"
}

artifact_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
public_img_dir = "public/images/gen"
os.makedirs(public_img_dir, exist_ok=True)

# 1. Copy images dynamically finding the timestamp suffixes
injected_paths = {}
for q_id, base_name in generated_map.items():
    pattern = os.path.join(artifact_dir, f"{base_name}_*.png")
    matches = glob.glob(pattern)
    if matches:
        source_path = matches[0]
        # Use clean name in public dir
        dest_filename = f"{base_name}.png"
        dest_path = os.path.join(public_img_dir, dest_filename)
        shutil.copy2(source_path, dest_path)
        injected_paths[q_id] = f"/images/gen/{dest_filename}"
        print(f"Copied {dest_filename}")
    else:
        print(f"WARNING: Image for {base_name} not found.")

# 2. Inject into dictionary_quizzes.json
filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

inject_count = 0
for vol in data.get('volumes', []):
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            for level_name, questions in topic.get('levels', {}).items():
                for q in questions:
                    q_id = q.get('id')
                    if q_id in injected_paths:
                        q['img'] = injected_paths[q_id]
                        inject_count += 1

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"\nSuccessfully injected {inject_count} generated images into dictionary_quizzes.json")
