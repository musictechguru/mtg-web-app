import json

def update_vol8():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol8 = next((v for v in data['volumes'] if v['id'] == 'vol8'), None)
    if not vol8:
        print("Volume 8 not found!")
        return

    print("Updating Vol 8 (Mastering)...")
    
    for part in vol8['parts']:
        for topic in part['topics']:
            for level in topic['levels'].values():
                for q in level:
                    txt = (q.get('content', '') + q.get('expert_explanation', '')).lower()
                    
                    # MASTERING SIGNAL CHAIN
                    if 'chain' in txt or 'order' in txt or 'flow' in txt or 'first processor' in txt or 'last processor' in txt:
                        # Avoid specific destructive editing questions if they exist, but usually "chain" implies processors
                        q['explanation_image'] = {"src": "/images/explanations/explanation_mastering_chain.png", "alt": "Mastering Signal Chain Diagram"}

                    # MULTIBAND COMPRESSION
                    if 'multiband' in txt or 'crossover' in txt or 'split' in txt and 'band' in txt:
                         q['explanation_image'] = {"src": "/images/explanations/explanation_multiband_comp.png", "alt": "Multiband Compression Crossovers"}

                    # LIMITER & LUFS
                    if 'limiter' in txt or 'limiting' in txt or 'ceiling' in txt or 'brickwall' in txt:
                         q['explanation_image'] = {"src": "/images/explanations/explanation_limiter_lufs.png", "alt": "Brickwall Limiter & LUFS Meter"}
                    
                    if 'lufs' in txt or 'loudness' in txt or 'true peak' in txt or 'dbtp' in txt:
                         q['explanation_image'] = {"src": "/images/explanations/explanation_limiter_lufs.png", "alt": "Brickwall Limiter & LUFS Meter"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Updated Vol 8 successfully.")

if __name__ == "__main__":
    update_vol8()
