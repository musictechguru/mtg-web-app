import json
import os

def upgrade_images():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    # Mapping of keywords/current-filenames to new HQ PNGs
    # keys are used to match 'src' content.
    replacements = [
        {
            "match": ["synth_adsr.svg", "adsr_envelope.svg"], 
            "target": "/images/explanations/explanation_adsr_envelope.png",
            "alt": "ADSR Envelope Diagram"
        },
        {
            "match": ["parametric_eq_knobs.svg", "parametric_eq.svg"], 
            "target": "/images/explanations/explanation_parametric_eq.png",
            "alt": "Parametric EQ Controls"
        },
        {
            # Replace the specific cardioid SVG we just set, and others
            "match": ["explanation_understanding_polar_patterns_cardioid.svg", "polar_pattern_cardioid.svg", "polar_patterns.svg"], 
            "target": "/images/explanations/explanation_polar_patterns.png",
            "alt": "Microphone Polar Patterns Chart"
        },
        {
            "match": ["stereo_xy.svg", "xy_setup.svg", "stereo_xy_setup.svg"], 
            "target": "/images/explanations/explanation_stereo_xy.png",
            "alt": "XY Stereo Configuration"
        },
        {
            # Generic signal flow might be tricky, let's be specific to recording/basic flow
            "match": ["recording_signal_flow.svg", "basic_signal_flow.svg"], 
            "target": "/images/explanations/explanation_signal_flow.png",
            "alt": "Signal Flow Diagram"
        },
        {
            "match": ["kick_in_out_mic.svg"], 
            "target": "/images/explanations/mic_placement_kick.png",
            "alt": "Kick Drum Mic Placement"
        },
        {
            "match": ["acoustic_guitar_12th_fret.svg", "mic_placement_acoustic_guitar.svg"], 
            "target": "/images/explanations/mic_placement_acoustic.png",
            "alt": "Acoustic Guitar Mic Placement"
        },
        {
            "match": ["mic_placement_piano.svg"], 
            "target": "/images/explanations/mic_placement_piano.png",
            "alt": "Piano Mic Placement"
        },
        {
            "match": ["reverb_rt60_graph.svg", "rt60_decay_curve.svg", "reverb_components.svg"], 
            "target": "/images/explanations/explanation_reverb.png",
            "alt": "Reverb Parameters Diagram"
        },
        {
            "match": ["delay_feedback_loop.svg", "delay_signal_flow.svg", "echo_chamber_diagram.svg"], 
            "target": "/images/explanations/explanation_delay.png",
            "alt": "Delay Signal Flow"
        },
        {
            "match": ["snare_mic_position.svg", "snare_rim_vs_center.svg"], 
            "target": "/images/explanations/mic_placement_snare.png",
            "alt": "Snare Mic Placement"
        },
        {
            "match": ["vocal_mic_distance.svg", "vocal_position.svg"], 
            "target": "/images/explanations/mic_placement_vocal.png",
            "alt": "Vocal Mic Placement"
        }
    ]

    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        updates_count = 0
        
        def update_node(node):
            nonlocal updates_count
            if isinstance(node, dict):
                
                # Helper to check and replace
                def check_and_replace(img_key):
                    if img_key in node:
                        current_val = node[img_key]
                        src = ""
                        if isinstance(current_val, dict):
                            src = current_val.get('src', '')
                        elif isinstance(current_val, str):
                            src = current_val
                        
                        for rep in replacements:
                            for m in rep['match']:
                                if m in src:
                                    # Found a match!
                                    print(f"Upgrading {node.get('id', 'unknown')} ({m}) -> {rep['target']}")
                                    
                                    if isinstance(current_val, dict):
                                        node[img_key]['src'] = rep['target']
                                        node[img_key]['alt'] = rep['alt']
                                    else:
                                        # If it was a string, genericize it to string path
                                        # But our schema prefers dicts usually. 
                                        # If it was distinct string, keep it as string path
                                        node[img_key] = rep['target']
                                    
                                    # Increment and break inner loop (matches)
                                    nonlocal updates_count
                                    updates_count += 1
                                    return

                check_and_replace('explanation_image')
                check_and_replace('img')

                for key, value in node.items():
                    update_node(value)
            elif isinstance(node, list):
                for item in node:
                    update_node(item)

        update_node(data)
        
        if updates_count > 0:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=4)
            print(f"Success: Upgraded {updates_count} images to High Quality PNGs.")
        else:
            print("No matching images found to upgrade.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    upgrade_images()
