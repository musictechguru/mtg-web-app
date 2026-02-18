import json

def fix_v1_t6_q9():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    # Locate Topic 6 (Microphone Techniques) in Volume 1
    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1:
        print("Volume 1 not found")
        return
    
    target_topic = None
    for part in vol1['parts']:
        for topic in part['topics']:
            if topic['id'] == 'v1_t6':
                target_topic = topic
                break
        if target_topic: break
    
    if not target_topic:
        print("Topic v1_t6 not found")
        return

    print(f"Updating Topic: {target_topic['title']}")
    
    questions = target_topic['levels']['basic']
    if len(questions) > 8:
        q9 = questions[8] # Index 8 is Q9
        print(f"  Current Q9 Image: {q9.get('explanation_image') or q9.get('img')}")
        
        # New image
        new_img = {'src': '/images/svg/mic_placement_piano.svg', 'alt': 'Piano Mic Placement'}
        q9['explanation_image'] = new_img
        if 'img' in q9:
            del q9['img']
            
        print(f"  Updated Q9 Image to: {new_img}")
        
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Update complete.")
    else:
        print("  Topic has fewer than 9 questions.")

if __name__ == "__main__":
    fix_v1_t6_q9()
