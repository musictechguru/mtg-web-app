import json

def update_vol4_and_vol6():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    def find_question(q_id, questions_list):
        return next((q for q in questions_list if q['id'] == q_id), None)

    # --- VOLUME 4 (SAMPLING & MIDI) ---
    vol4 = next((v for v in data['volumes'] if v['id'] == 'vol4'), None)
    if vol4:
        print("Updating Vol 4 (Sampling & MIDI)...")
        # Topic 1: Sampling Basics (Zero Crossing)
        # Scan all questions in Vol 4 for relevant keywords due to potential structure variations
        for part in vol4['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        
                        # Waveform / Zero Crossing
                        if 'zero crossing' in txt or 'trimming' in txt or 'cut' in txt:
                             q['explanation_image'] = {"src": "/images/explanations/explanation_sampling_waveform.png", "alt": "Waveform Editing & Zero Crossing"}
                             
                        # Bit Depth
                        if 'bit depth' in txt or 'quantization' in txt or 'step' in txt or 'resolution' in txt:
                             q['explanation_image'] = {"src": "/images/explanations/explanation_bit_depth.png", "alt": "Bit Depth & Quantization Steps"}
                             
                        # MIDI
                        if 'piano roll' in txt or 'midi note' in txt or 'velocity' in txt or 'middle c' in txt:
                             q['explanation_image'] = {"src": "/images/explanations/explanation_midi_piano_roll.png", "alt": "MIDI Piano Roll Editor"}


    # --- VOLUME 6 (EQ - Retrying Parametric Controls) ---
    vol6 = next((v for v in data['volumes'] if v['id'] == 'vol6'), None)
    if vol6:
         print("Updating Vol 6 (Parametric Controls)...")
         # We already updated filters/curves. Now we target the "Controls" questions.
         for part in vol6['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        
                        # Parametric Controls (Knobs, Q, Gain, Freq)
                        # Avoid overwriting the Curves diagram if the question is about the visual curve shape.
                        # Target questions about "parameters", "knobs", "Q factor", "bandwidth control".
                        
                        if 'parametric' in txt and ('control' in txt or 'knob' in txt or 'parameter' in txt or 'q ' in txt or 'bandwidth' in txt):
                            # Check if it's better served by the Knobs image or the Curves image. 
                            # If it asks "What does Q do?", the knobs image shows the Q knob, which is good.
                            # The previous update might have set it to eq_curves. Let's see.
                            # If the current image is generic or eq_curves, and this is specifically about CONTROLS, update it.
                            
                            q['explanation_image'] = {"src": "/images/explanations/explanation_parametric_controls.png", "alt": "Parametric EQ Controls (Freq, Gain, Q)"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Updated Vol 4 and Vol 6 successfully.")

if __name__ == "__main__":
    update_vol4_and_vol6()
