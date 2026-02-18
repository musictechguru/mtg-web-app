import json
import os

def swap_assets():
    json_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    # Swaps identified by previous audit script
    swaps = {
        "/images/svg/mic_shock_mount_diagram.svg": "/images/mic_shock_mount.png",
        "/images/svg/stereo_xy_diagram.svg": "/images/stereo_xy.png",
        "/images/explanations/ssl_bus_comp.svg": "/images/SSL Bus compressor.png",
        "/images/svg/mic_placement_piano.svg": "/images/explanations/mic_placement_piano.png", # Note: double check if this file exists in public/images/explanations or just public/images
        "/images/svg/midi_piano_roll.svg": "/images/MIDI Piano Roll Logic.png",
        "/images/explanations/channel_strip_eq.svg": "/images/channel_strip.png",
        "/images/explanations/noise_gate_graph.svg": "/images/Noise gate graph.png"
    }

    # Verify existance before swapping
    valid_swaps = {}
    public_root = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public'
    
    for old, new in swaps.items():
        if os.path.exists(os.path.join(public_root, new.lstrip('/'))):
            valid_swaps[old] = new
        else:
            # Fallback for paths that might be relative differently
            print(f"Skipping swap: {new} not found.")

    if not valid_swaps:
        print("No valid swaps to perform.")
        return

    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error: {e}")
        return

    count = 0
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img_obj = q.get('explanation_image') or q.get('img')
                        current = ""
                        if isinstance(img_obj, dict): current = img_obj.get('src')
                        elif isinstance(img_obj, str): current = img_obj
                        
                        if current in valid_swaps:
                            new_src = valid_swaps[current]
                            q['explanation_image'] = new_src
                            q['img'] = new_src
                            count += 1

    with open(json_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Swapped {count} instances to use better assets.")
    for old, new in valid_swaps.items():
        print(f" - {old} -> {new}")

if __name__ == "__main__":
    swap_assets()
