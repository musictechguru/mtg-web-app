import json

def update_vol7():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol7 = next((v for v in data['volumes'] if v['id'] == 'vol7'), None)
    if not vol7:
        print("Volume 7 not found!")
        return

    print("Updating Vol 7 (Creative FX)...")
    
    for part in vol7['parts']:
        for topic in part['topics']:
            for level in topic['levels'].values():
                for q in level:
                    txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                    
                    # MODULATION (Chorus, Flanger, Phaser)
                    # We look for keywords related to LFO, Modulation, Chorus, Flanger
                    if 'modulation' in txt or 'chorus' in txt or 'flanger' in txt or 'lfo' in txt:
                        # Ensure we don't overwrite if it's specifically about something else entirely
                        if 'delay' in txt and 'feedback' in txt and 'echo' not in txt: 
                             # This might be tricky as Flangers use delay. 
                             # If it's pure "Delay" topic, we might want to skip or use delay image.
                             # But "Modulation is short delay" is a key concept.
                             pass

                    # Direct targeting based on inspection output would be safer if we can match IDs or titles.
                    # But keyword matching has worked well.
                    
                    if 'lfo' in txt or 'chorus' in txt or 'flanger' in txt:
                         q['explanation_image'] = {"src": "/images/explanations/explanation_modulation_lfo.png", "alt": "LFO Modulation Diagram"}

                    # REVERB (Pre-delay, Early Reflections, Decay)
                    # Target Reverb specifics
                    if 'reverb' in txt:
                        if 'pre-delay' in txt or 'early reflection' in txt or 'decay' in txt or 'tail' in txt or 'rt60' in txt:
                             q['explanation_image'] = {"src": "/images/explanations/explanation_reverb_params.png", "alt": "Reverb Parameters Timeline"}
                        elif 'plate' in txt or 'spring' in txt:
                             # We have a specific SVG for plate/spring from previous work? Or inspection showed one?
                             # Inspection: 'plate_vs_spring_diagram.svg'. precise. Let's KEEP that one.
                             # So only update if we don't have a specific mechanical diagram.
                             # The generic "explanation_reverb.png" was used for basic reverb questions.
                             # We typically replace the generic one.
                             
                             curr_src = ""
                             if isinstance(q.get('explanation_image'), dict):
                                 curr_src = q['explanation_image'].get('src', '')
                             
                             if 'explanation_reverb.png' in curr_src:
                                 q['explanation_image'] = {"src": "/images/explanations/explanation_reverb_params.png", "alt": "Reverb Parameters Timeline"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Updated Vol 7 successfully.")

if __name__ == "__main__":
    update_vol7()
