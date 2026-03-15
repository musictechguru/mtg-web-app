import json
import os
import shutil
import glob

# Mapping of concepts to our new generated artifacts
generated_map = {
    "velocity": "piano_roll_velocity_editor",
    "quantize": "midi_quantize_grid",
    "preamp": "microphone_preamp_gain",
    "fader": "analog_mixing_console_channel",
    "outboard": "studio_outboard_gear",
    "cable": "xlr_vs_ts_cable",
    "arrangement": "daw_arrangement_view",
    "converter": "ad_da_converter"
}

artifact_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
public_img_dir = "public/images/gen"
os.makedirs(public_img_dir, exist_ok=True)

injected_paths = {}

for key, base_name in generated_map.items():
    pattern = os.path.join(artifact_dir, f"{base_name}_*.png")
    matches = glob.glob(pattern)
    if matches:
        source_path = matches[0]
        dest_filename = f"{base_name}.png"
        dest_path = os.path.join(public_img_dir, dest_filename)
        shutil.copy2(source_path, dest_path)
        injected_paths[key] = f"/images/gen/{dest_filename}"
        print(f"Copied {dest_filename}")

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Track replacements
hotspots_fixed = 0
replacements_made = 0

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            quiz_title = item.get('title', '')
            for q in item.get('questions', []):
                
                # 1. Strip redundant `img` from hotspot questions
                if q.get('type') == 'hotspot' and 'img' in q:
                    del q['img']
                    hotspots_fixed += 1
                    
                # 2. Inject new specific images to break up repetition
                # Sequencing & Piano Roll quiz
                if "Sequencing & Piano Roll" in quiz_title or "Practical MIDI Applications" in quiz_title:
                    content = q.get('content', '').lower()
                    if "velocity" in content and "velocity" in injected_paths:
                        q['img'] = injected_paths['velocity']
                        replacements_made += 1
                    elif "quantize" in content or "grid" in content or "timing" in content:
                        q['img'] = injected_paths['quantize']
                        replacements_made += 1
                    elif "arrangement" in content or "region" in content or "track" in content:
                        q['img'] = injected_paths['arrangement']
                        replacements_made += 1
                        
                # Recording Signal Chain quiz
                elif "Recording Signal Chain" in quiz_title or "Studio Equipment" in quiz_title:
                    content = q.get('content', '').lower()
                    if "preamp" in content or "microphone signal" in content or "gain" in content:
                        q['img'] = injected_paths['preamp']
                        replacements_made += 1
                    elif "cable" in content or "balanced" in content or "xlr" in content:
                        q['img'] = injected_paths['cable']
                        replacements_made += 1
                    elif "fader" in content or "console" in content or "bus" in content or "aux" in content:
                        q['img'] = injected_paths['fader']
                        replacements_made += 1
                    elif "outboard" in content or "compressor" in content or "eq unit" in content or "hardware" in content:
                        q['img'] = injected_paths['outboard']
                        replacements_made += 1
                    elif "converter" in content or "a/d" in content or "d/a" in content or "bit depth" in content or "sample rate" in content:
                        q['img'] = injected_paths['converter']
                        replacements_made += 1

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"\nRemoved redundant img property from {hotspots_fixed} hotspot questions.")
print(f"Injected {replacements_made} new high-quality specific images into Stage 3.")
