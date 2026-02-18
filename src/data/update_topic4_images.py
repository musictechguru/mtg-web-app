import json

def update_topic4_images():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    with open(path, 'r') as f:
        data = json.load(f)

    # Locate Topic 4 (Recording Chain & Signal Path)
    # Based on previous checks, id is 'v1_t4'
    
    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1: return
    
    target_topic = None
    for part in vol1['parts']:
        for topic in part['topics']:
            if topic['id'] == 'v1_t4':
                target_topic = topic
                break
        if target_topic: break
    
    if not target_topic:
        print("Topic 4 not found")
        return

    print(f"Updating Topic: {target_topic['title']}")
    
    questions = target_topic['levels']['basic']
    
    updates = {
        1: {'src': '/images/svg/mic_dynamic.svg', 'alt': 'Dynamic Microphone Construction'},       # Q2
        2: {'src': '/images/svg/signal_levels_chart.svg', 'alt': 'Signal Levels Chart'},            # Q3
        3: {'src': '/images/svg/microphone_preamp.svg', 'alt': 'Microphone Preamp'},                # Q4
        4: {'src': '/images/svg/preamp_gain.svg', 'alt': 'Preamp Gain Knob'},                       # Q5 (Reuse existing)
        5: {'src': '/images/svg/ad_converter_process.svg', 'alt': 'A/D Conversion Diagram'},        # Q6
        6: {'src': '/images/svg/recording_signal_flow.svg', 'alt': 'Recording Signal Flow'},        # Q7
        9: {'src': '/images/svg/da_converter_process.svg', 'alt': 'D/A Conversion Diagram'}         # Q10
    }

    for idx, img_data in updates.items():
        if idx < len(questions):
            q = questions[idx]
            print(f"  Updating Q{idx+1}: {q['content'][:30]}...")
            q['explanation_image'] = img_data
            # Remove legacy img if exists
            if 'img' in q:
                del q['img']

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Update complete.")

if __name__ == "__main__":
    update_topic4_images()
