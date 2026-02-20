import json

def fix_image_visibility():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Fixing image visibility (overwriting explanation_image)...")
        count = 0
        
        updates = {
            # Audio Fundamentals
            "What is audio?": "/images/gen/audio_fundamentals_concept.png",
            
            # Synthesis
            "What does VCO stand for?": "/images/gen/synth_vco_module.png",
            "What does VCA stand for?": "/images/gen/synth_vca_module.png",
            "What is the purpose of an envelope generator?": "/images/gen/synth_envelope_generator_module.png",
            "What does ADSR stand for?": "/images/explanations/explanation_adsr_envelope.png",
            "What is the typical frequency range of an LFO?": "/images/gen/synth_lfo_frequency_chart.png",
            
            # Gain & Signal Path (previously verified, but good to be safe)
            "What level should you aim for when setting gain?": "/images/gen/gain_staging_meter.png",
            "What is an audio interface?": "/images/gen/audio_interface_modern.png",
            "What happens if you set the gain too low?": "/images/gen/noise_floor_tape.png",
            "Gain and volume are exactly the same thing.": "/images/gen/gain_vs_volume_diagram.png"
        }

        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    # Check all basic questions
                    if 'levels' in topic and 'basic' in topic['levels']:
                        for q in topic['levels']['basic']:
                            q_text = q.get('content', '')
                            
                            # Match content
                            matched_img = None
                            for key_phrase, img_path in updates.items():
                                if key_phrase in q_text:
                                    matched_img = img_path
                                    break
                            
                            if matched_img:
                                # Overwrite explanation_image to ensure visibility in QuizPlayer
                                # We set it as an object to maintain consistency/alt text potential
                                q['explanation_image'] = {
                                    "src": matched_img,
                                    "alt": "Diagram"
                                }
                                # Also set img for good measure
                                q['img'] = matched_img
                                
                                print(f"Fixed: {q_text[:30]}... -> {matched_img}")
                                count += 1

        if count > 0:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print(f"Successfully fixed {count} questions.")
        else:
            print("No questions found to fix.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_image_visibility()
