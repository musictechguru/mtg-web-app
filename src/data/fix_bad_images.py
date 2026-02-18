import json
import os

def fix_bad_images_json():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    changes = 0

    image_map = {
        "knee": "/images/explanations/compression_knee_visual.svg",
        "lufs": "/images/explanations/lufs_metering_visual.svg",
        "loudness unit": "/images/explanations/lufs_metering_visual.svg",
        "diffus": "/images/explanations/skyline_diffuser_visual.svg",
        "scatter": "/images/explanations/skyline_diffuser_visual.svg",
        "normalled": "/images/explanations/patchbay_normalling_visual.svg",
        "patchbay": "/images/explanations/patchbay_normalling_visual.svg",
        "standing wave": "/images/explanations/standing_waves_visual.svg",
        "room mode": "/images/explanations/standing_waves_visual.svg",
        "dimensions": "/images/explanations/standing_waves_visual.svg",
        "tape echo": "/images/explanations/tape_echo_visual.svg",
        "delay heads": "/images/explanations/tape_echo_visual.svg",
        "phase correlation": "/images/explanations/phase_correlation_visual.svg",
        "dither": "/images/explanations/dither_visual.svg",
        "quantization error": "/images/explanations/dither_visual.svg",
        "di box": "/images/explanations/di_box_visual.svg",
        "direct injection": "/images/explanations/di_box_visual.svg",
        "impedance match": "/images/explanations/di_box_visual.svg",
        "speed of sound": "/images/explanations/speed_of_sound_visual.svg",
        "inverse square": "/images/explanations/inverse_square_visual.svg",
        "distance": "/images/explanations/inverse_square_visual.svg",
        "1176": "/images/explanations/1176_compressor_visual.svg",
        "fet compressor": "/images/explanations/1176_compressor_visual.svg",
        "pultec": "/images/explanations/pultec_eq_visual.svg",
        "low end trick": "/images/explanations/pultec_eq_visual.svg",
        "buffer size": "/images/explanations/buffer_latency_visual.svg",
        "latency issue": "/images/explanations/buffer_latency_visual.svg",
        "parallel compression": "/images/explanations/parallel_compression_visual.svg",
        "new york compression": "/images/explanations/parallel_compression_visual.svg",
        "midi controller": "/images/explanations/midi_controllers_visual.svg",
        "drum pad": "/images/explanations/midi_controllers_visual.svg",
        "fader bank": "/images/explanations/midi_controllers_visual.svg"
    }
    
    # Specific targeted replacements for highly repetitive images
    bad_source_images = [
        "/images/explanations/mastering_signal_flow.svg",
        "/images/explanations/monitoring_environment.svg",
        "/images/explanations/waveform_compression_rarefaction.svg"
    ]

    for vol in data['volumes']:
        # Focus on latter volumes
        if "Volume 8" in vol['title'] or "Volume 9" in vol['title'] or "Volume 10" in vol['title'] or "Volume 5" in vol['title']:
            print(f"Scanning {vol['title']}...")
            
            for part in vol['parts']:
                for topic in part['topics']:
                    for level, qs in topic.get('levels', {}).items():
                        for q in qs:
                            content = q['content'].lower()
                            
                            # Get current image string
                            current_img_obj = q.get('explanation_image') or q.get('img')
                            current_img_str = ""
                            if isinstance(current_img_obj, dict):
                                current_img_str = current_img_obj.get('src', "")
                            elif isinstance(current_img_obj, str):
                                current_img_str = current_img_obj
                            
                            # Check map
                            new_img = None
                            for key, img_path in image_map.items():
                                if key in content:
                                    new_img = img_path
                                    # print(f"  Match '{key}' in: {content[:40]}...")
                                    break
                            
                            if new_img:
                                # Update if different
                                if current_img_str != new_img:
                                    # print(f"    UPDATING: {current_img_str} -> {new_img}")
                                    q['explanation_image'] = new_img
                                    q['img'] = new_img
                                    changes += 1

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Updated {changes} questions with new high-quality images.")

if __name__ == "__main__":
    fix_bad_images_json()
