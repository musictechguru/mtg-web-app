import json
import os

def update_batch_5_json():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

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
                        
                        # 1. Near Field
                        if "near field" in content or "near-field" in content:
                            new_src = "/images/explanations/near_field_setup.svg"
                            
                        # 2. Reflection Types / Diffusion
                        elif "diffus" in content or "specular" in content or "scatter" in content:
                             new_src = "/images/explanations/reflection_types.svg"
                             
                        # 3. Comb Filtering
                        elif "comb" in content and "filter" in content:
                            new_src = "/images/explanations/comb_filtering_graph.svg"
                        
                        # 4. Membrane Absorber
                        elif "membrane" in content or "panel absorber" in content:
                             new_src = "/images/explanations/membrane_absorber.svg"
                             
                        # 5. Air Gap
                        elif "air gap" in content:
                            new_src = "/images/explanations/air_gap_mounting.svg"
                            
                        # 6. SBIR
                        elif "sbir" in content or "boundary interference" in content:
                             new_src = "/images/explanations/sbir_boundary_effect.svg"

                        # 7. Standing Waves
                        elif "standing wave" in content or "room mode" in content:
                            new_src = "/images/explanations/standing_waves_visual.svg"
                            
                        # 8. Aftertouch
                        elif "aftertouch" in content:
                             new_src = "/images/explanations/aftertouch_curve.svg"
                             
                        # 9. Series Flow
                        elif "series" in content and "flow" in content:
                             new_src = "/images/explanations/series_signal_flow.svg"
                             
                        # 10. Balanced vs Unbalanced (general signal q's)
                        elif "balanced" in content and "unbalanced" in content:
                             new_src = "/images/explanations/balanced_vs_unbalanced.svg"

                        # Apply update
                        if new_src and new_src != current_src:
                            # print(f"Update: {new_src} for {q['content'][:30]}")
                            q['explanation_image'] = new_src
                            q['img'] = new_src
                            replacements += 1

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Batch 5: Updated {replacements} questions with new specific images.")

if __name__ == "__main__":
    update_batch_5_json()
