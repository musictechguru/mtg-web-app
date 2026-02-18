import json

def update_remaining_vols():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    # --- VOL 1: FUNDAMENTALS ---
    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if vol1:
        print("Updating Vol 1 (Phase)...")
        for part in vol1['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        if 'phase' in txt and ('cancellation' in txt or 'interference' in txt or '180' in txt or 'constructive' in txt):
                            q['explanation_image'] = {"src": "/images/explanations/explanation_phase_cancellation.png", "alt": "Phase Cancellation Diagram"}

    # --- VOL 9: ACOUSTICS ---
    vol9 = next((v for v in data['volumes'] if v['id'] == 'vol9'), None)
    if vol9:
        print("Updating Vol 9 (Acoustics)...")
        for part in vol9['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        # Acoustic Treatment
                        if 'treatment' in txt or 'absorption' in txt or 'diffus' in txt or 'bass trap' in txt or 'reflection' in txt:
                            # Avoid overwriting specific reflection ray-tracing if it exists and looks good. 
                            # But usually the treatment overview is better than generic text.
                            # We'll apply this to general treatment questions.
                            if 'speed of sound' not in txt and 'standing wave' not in txt:
                                q['explanation_image'] = {"src": "/images/explanations/explanation_acoustic_treatment.png", "alt": "Acoustic Treatment Diagram"}

    # --- VOL 10: EQUIPMENT ---
    vol10 = next((v for v in data['volumes'] if v['id'] == 'vol10'), None)
    if vol10:
        print("Updating Vol 10 (Equipment)...")
        for part in vol10['parts']:
            for topic in part['topics']:
                for level in topic['levels'].values():
                    for q in level:
                        txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                        # Balanced/Unbalanced Cables
                        if 'balanced' in txt or 'xlr' in txt or 'trs' in txt or 'unbalanced' in txt or 'ts cable' in txt or 'noise' in txt:
                             # Focusing on cable wiring/inteference questions
                             q['explanation_image'] = {"src": "/images/explanations/explanation_balanced_audio.png", "alt": "Balanced vs Unbalanced Wiring Diagram"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Updated Vols 1, 9, 10 successfully.")

if __name__ == "__main__":
    update_remaining_vols()
