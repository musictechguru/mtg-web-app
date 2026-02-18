import json

def fix_v10_q6():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    # Locate Topic 8 in Volume 10 (Modern Production)
    # We look for ID 'v10_t8' based on previous search
    
    vol10 = next((v for v in data['volumes'] if v['id'] == 'vol10'), None)
    if not vol10:
        print("Volume 10 not found")
        return
    
    target_topic = None
    for part in vol10['parts']:
        for topic in part['topics']:
            if topic['id'] == 'v10_t8':
                target_topic = topic
                break
        if target_topic: break
    
    if not target_topic:
        print("Topic v10_t8 not found")
        return

    print(f"Updating Topic: {target_topic['title']}")
    
    questions = target_topic['levels']['basic']
    if len(questions) > 5:
        q6 = questions[5] # Index 5 is Q6
        print(f"  Current Q6: {q6['content']}")
        
        # Verify it matches expected target to be safe
        if "Software plugins compared to hardware" in q6['content']:
            new_text = "How do modern software plugins generally compare to hardware counterparts?"
            q6['content'] = new_text
            print(f"  Updated Q6 to: {new_text}")
            
            with open(path, 'w') as f:
                json.dump(data, f, indent=4)
            print("Update complete.")
        else:
            print("  Target question wording mismatch. Aborting.")
    else:
        print("  Topic has fewer than 6 questions.")

if __name__ == "__main__":
    fix_v10_q6()
