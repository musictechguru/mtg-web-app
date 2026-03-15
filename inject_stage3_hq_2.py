import json
import os
import shutil
import glob

# Mapping of concepts to our new generated artifacts
generated_map = {
    "duration": "midi_note_duration",
    "lanes": "midi_track_lanes",
    "drum": "drum_machine_step_sequencer",
    "arp": "synthesizer_arpeggiator",
    "automation": "midi_automation_curves",
    "keyboard": "midi_keyboard_controller",
    "patchbay": "patchbay_routing",
    "jacks": "audio_interface_inputs",
    "meters": "analog_vu_meters",
    "clipping": "digital_clipping_waveform"
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

replacements_made = 0

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            quiz_title = item.get('title', '')
            for q in item.get('questions', []):
                # We want to replace if the current image is a generic repeat like piano_roll.svg or signal_chain_basic.svg
                current_img = q.get('img', '')
                if current_img in ['/images/piano_roll.svg', '/images/signal_chain_basic.svg', '/images/binary_midi_table.png']:
                    
                    content = q.get('content', '').lower()
                    
                    # Logic for sequencing
                    if "duration" in content or "length" in content or "drag" in content:
                        q['img'] = injected_paths.get('duration', current_img)
                        replacements_made += 1
                    elif "lane" in content or "track" in content or "multiple" in content:
                        q['img'] = injected_paths.get('lanes', current_img)
                        replacements_made += 1
                    elif "drum" in content or "step" in content:
                        q['img'] = injected_paths.get('drum', current_img)
                        replacements_made += 1
                    elif "arp" in content or "pattern" in content:
                        q['img'] = injected_paths.get('arp', current_img)
                        replacements_made += 1
                    elif "curve" in content or "automation" in content or "draw" in content or "smooth" in content:
                        q['img'] = injected_paths.get('automation', current_img)
                        replacements_made += 1
                    elif "keyboard" in content or "controller" in content or "play" in content:
                        q['img'] = injected_paths.get('keyboard', current_img)
                        replacements_made += 1
                    
                    # Logic for signal chain
                    elif "patch" in content or "route" in content or "bay" in content:
                        q['img'] = injected_paths.get('patchbay', current_img)
                        replacements_made += 1
                    elif "jack" in content or "input" in content or "interface" in content:
                        q['img'] = injected_paths.get('jacks', current_img)
                        replacements_made += 1
                    elif "meter" in content or "vu" in content or "level" in content:
                        q['img'] = injected_paths.get('meters', current_img)
                        replacements_made += 1
                    elif "clip" in content or "distort" in content or "loud" in content:
                        q['img'] = injected_paths.get('clipping', current_img)
                        replacements_made += 1


with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"\nInjected {replacements_made} specific images to resolve remaining generic duplicates.")
