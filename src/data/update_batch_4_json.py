import json
import os

def update_batch_4_json():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    # Map: keyword or old filename -> new specific filename
    # Strategy: Find questions with specific keywords + generic images, and update them
    
    replacements = 0
    
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        content = q['content'].lower()
                        
                        img_obj = q.get('explanation_image') or q.get('img')
                        current_src = ""
                        if isinstance(img_obj, dict): current_src = img_obj.get('src', "")
                        elif isinstance(img_obj, str): current_src = img_obj
                        
                        if not current_src: continue
                        
                        new_src = None
                        
                        # 1. Cable Capacitance
                        if "capacitance" in content and "cable" in content and "filter" in content:
                            new_src = "/images/explanations/cable_capacitance_filter.svg"
                            
                        # 2. Drum Room Mics
                        elif "room mic" in content and "drum" in content:
                             new_src = "/images/explanations/drum_room_mic_setup.svg"
                             
                        # 3. Double Tracking
                        elif "double track" in content and "pan" in content:
                            new_src = "/images/explanations/double_tracking_panning.svg"
                        
                        # 4. Tube Bias
                        elif "bias" in content and "tube" in content:
                             new_src = "/images/explanations/vacuum_tube_bias_curve.svg"
                             
                        # 5. Balanced Cable / CMRR
                        elif ("balanced" in content or "cmrr" in content) and ("cable" in content or "noise" in content):
                            new_src = "/images/explanations/balanced_cable_cmrr.svg"
                            
                        # 6. Impedance / DI
                        elif "impedance" in content and ("z" in content or "di box" in content):
                             new_src = "/images/explanations/high_z_low_z_diagram.svg"

                        # 7. Transformer
                        elif "transformer" in content and "isolation" in content:
                            new_src = "/images/explanations/transformer_isolation_diagram.svg"
                            
                        # 8. Ground Loop
                        elif "ground loop" in content or "hum" in content:
                             new_src = "/images/explanations/ground_loop_diagram.svg"
                             
                        # 9. Patchbay
                        elif "patchbay" in content and "normal" in content:
                             new_src = "/images/explanations/patchbay_normalisation.svg"
                             
                        # 10. Parallel Compression
                        elif "parallel" in content and "compression" in content:
                             new_src = "/images/explanations/parallel_compression_routing.svg"

                        # Apply update if match found and new source is different
                        if new_src and new_src != current_src:
                            q['explanation_image'] = new_src
                            q['img'] = new_src
                            replacements += 1
                            # print(f"Updated: {q['content'][:30]}... -> {new_src}")

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Batch 4: Updated {replacements} questions with new specific images.")

if __name__ == "__main__":
    update_batch_4_json()
