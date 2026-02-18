import json

def update_topic2_images():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    with open(path, 'r') as f:
        data = json.load(f)

    # Locate Topic 2 (Decibels & Dynamic Range)
    # It assumes it is in Volume 1, Part 1 based on previous checks, but let's be robust
    # Actually, previous check said "v1_t2" is "DECIBELS & DYNAMIC RANGE"
    
    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1: return
    
    # It might be in part 1 or part 2 depending on structure, but "v1_t2" seems to be part 1 in previous dump
    # Let's search all topics in vol1
    
    target_topic = None
    for part in vol1['parts']:
        for topic in part['topics']:
            if topic['id'] == 'v1_t2':
                target_topic = topic
                break
        if target_topic: break
    
    if not target_topic:
        print("Topic 2 not found")
        return

    print(f"Updating Topic: {target_topic['title']}")
    
    # Map matching logic to index or content key 
    # Q5: Headroom
    # Q6: Dynamic Range
    # Q8: Clipping
    # Q10: Red Light
    
    questions = target_topic['levels']['basic']
    
    updates = {
        4: {'src': '/images/svg/headroom_diagram.svg', 'alt': 'Headroom Diagram'},       # Q5 (index 4)
        5: {'src': '/images/svg/dynamic_range_concept.svg', 'alt': 'Dynamic Range'},     # Q6 (index 5)
        7: {'src': '/images/svg/clipping_waveform.svg', 'alt': 'Clipping Waveform'},     # Q8 (index 7)
        9: {'src': '/images/svg/red_light_clipping.svg', 'alt': 'Red Click Indicator'}   # Q10 (index 9)
    }

    for idx, img_data in updates.items():
        if idx < len(questions):
            q = questions[idx]
            print(f"  Updating Q{idx+1}: {q['content'][:30]}...")
            q['explanation_image'] = img_data
            # Remove legacy img if exists to keep clean
            if 'img' in q:
                del q['img']

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Update complete.")

if __name__ == "__main__":
    update_topic2_images()
