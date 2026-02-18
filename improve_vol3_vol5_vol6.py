import json

def update_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    def find_question(q_id, questions_list):
        return next((q for q in questions_list if q['id'] == q_id), None)

    # --- VOLUME 3 (SYNTHESIS) ---
    vol3 = next((v for v in data['volumes'] if v['id'] == 'vol3'), None)
    if vol3:
        # Topic 4: Filter Types
        # Note: Based on inspection, this topic might be in part 1 (index 0) or elsewhere. 
        # Using a search strategy similar to previous scripts.
        t4 = None
        for part in vol3['parts']:
            t4 = next((t for t in part['topics'] if t['id'] == 'v3_t4'), None)
            if t4: break
        
        if t4:
            print("Updating Vol 3 Topic 4 (Filter Types)...")
            qs = t4['levels']['basic']
            # Update all questions in this topic to use the new filter chart if they are about filter types
            # Specific updates for relevance:
            
            # Q1: Low Pass
            q = find_question('v3_t4_b_1', qs)
            if q:
                q['explanation_image'] = {"src": "/images/explanations/explanation_filter_types.png", "alt": "Filter Types Chart"}
                q['expert_explanation'] = "Low Pass Filter (LPF) cuts highs and lets lows pass. It's the most common synth filter, used to remove brightness/buzz."

            # Q5: High Pass
            q = find_question('v3_t4_b_5', qs)
            if q:
                q['explanation_image'] = {"src": "/images/explanations/explanation_filter_types.png", "alt": "Filter Types Chart"}
                q['expert_explanation'] = "High Pass Filter (HPF) cuts lows and lets highs pass. Essential for removing muddy rumble or thinning out a sound."

            # Q7: Band Pass
            q = find_question('v3_t4_b_7', qs)
            if q:
                q['explanation_image'] = {"src": "/images/explanations/explanation_filter_types.png", "alt": "Filter Types Chart"}
                q['expert_explanation'] = "Band Pass Filter (BPF) allows only a narrow middle band to pass, rejecting both highs and lows. It creates a 'telephone' or 'nasal' sound."

            # Q10: Notch
            q = find_question('v3_t4_b_10', qs)
            if q:
                 # Notch isn't explicitly on the generated chart (usually), but it's the inverse. 
                 # We'll leave it or update if appropriate. The generated chart has HP, LP, BP.
                 # Let's verify the chart content mentally. The prompt asked for HP, LP, BP.
                 # We can use the chart for context or keep existing if it's generic.
                 pass


    # --- VOLUME 5 (DYNAMICS) ---
    vol5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
    if vol5:
        print("Updating Vol 5 (Compression)...")
        # Recursively find all questions with "compression" in text or content and update image
        for part in vol5['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        # If the question currently uses the old compression SVG, replace it
                        current_img = q.get('explanation_image')
                        if isinstance(current_img, dict):
                            src = current_img.get('src', '')
                        else:
                            src = current_img or ''
                        
                        if 'compression_graph.svg' in src or 'compression_attack_release.svg' in src:
                             # Don't replace attack/release specific diagrams with the Ratio graph unless it fits.
                             # The new image is a Transfer Curve (Input/Output) with Threshold/Ratio.
                             # So it replaces 'compression_graph.svg' perfectly.
                             if 'compression_graph.svg' in src:
                                 q['explanation_image'] = {"src": "/images/explanations/explanation_compression.png", "alt": "Compression Transfer Curve"}
                                 
                             # Also update generic compression definition questions
                             if 'What is a compressor' in q.get('content', '') or 'Threshold' in q.get('content', ''):
                                  q['explanation_image'] = {"src": "/images/explanations/explanation_compression.png", "alt": "Compression Transfer Curve"}


    # --- VOLUME 6 (EQ) ---
    vol6 = next((v for v in data['volumes'] if v['id'] == 'vol6'), None)
    if vol6:
        print("Updating Vol 6 (EQ Curves)...")
        # Target Topic 3 (Filter Types / EQ Basics?) based on inspection V6 questions seem to be around v6_t3, v6_t15 etc.
        # Let's search generally for EQ questions using generic graphs.
        
        for part in vol6['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        # If question mentions Shelving, Bell, High/Low Pass, use the new EQ Curves image
                        # But be careful not to overwrite specific HPF/LPF questions if they are better served by the Filter Types chart?
                        # Actually, Volume 6 is "EQ", so the EQ Curves chart (showing Shelf, Bell, Cut) is perfect.
                        
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        
                        if 'shelf' in txt or 'bell' in txt or 'curve' in txt:
                            # Use EQ Curves image
                            q['explanation_image'] = {"src": "/images/explanations/explanation_eq_curves.png", "alt": "EQ Curves: Shelf, Bell, Cut"}
                        
                        # If it's specifically about filter slopes/types, we might arguably use the Vol 3 image too?
                        # But let's stick to the plan: Vol 6 uses EQ Curves.
                        
                        # Replace any existing generic EQ svgs if they exist (none explicitly named in plan, but good practice)
                        # The prior grep showed questions using '/images/explanations/filter_types_chart.svg' in V6 T3. 
                        # We should probably replace THOSE with the new High Quality one if it fits.
                        # Actually, `explanation_eq_curves.png` shows Low Cut, Bell, High Shelf.
                        # `explanation_filter_types.png` shows HPF, LPF, BPF.
                        # So if the question is about Low Pass/Band Pass -> Filter Types.
                        # If it's about Shelf/Bell -> EQ Curves.
                        
                        if 'band pass' in txt or 'low pass' in txt or 'high pass' in txt:
                            # Use Filter Types image (we moved it to public, so it's available)
                            q['explanation_image'] = {"src": "/images/explanations/explanation_filter_types.png", "alt": "Filter Types Chart"}
                        elif 'shelf' in txt or 'bell' in txt or 'parametric' in txt: # Parametric often uses bells
                             # If we have a parametric specific image later, we'd use that. 
                             # But for now, EQ Curves is better than nothing or generic.
                             pass
                        
                        # Explicitly replacing the ones we saw in grep in V6 T3
                        current_img = q.get('explanation_image')
                        if isinstance(current_img, dict):
                            src = current_img.get('src', '')
                            if 'filter_types_chart.svg' in src:
                                 # This matches the grep. Replace with our new HQ one.
                                 q['explanation_image'] = {"src": "/images/explanations/explanation_filter_types.png", "alt": "Filter Types Chart"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print("Updated Volumes 3, 5, and 6 successfully.")

if __name__ == "__main__":
    update_quizzes()
