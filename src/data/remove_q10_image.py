import json

file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

try:
    with open(file_path, 'r') as f:
        data = json.load(f)

    found = False
    
    # Iterate through all volumes to find the target topic
    for volume in data['volumes']:
        for part in volume['parts']:
            for topic in part['topics']:
                # Check by ID or Title to be sure
                if topic['id'] == 'v10_t8' or topic['title'] == 'MODERN PRODUCTION & TECHNOLOGY':
                    print(f"Found topic: {topic['title']} (ID: {topic['id']})")
                    
                    # Check basic level
                    basic_questions = topic['levels'].get('basic', [])
                    for q in basic_questions:
                        if q['title'] == 'Question 10':
                            if 'explanation_image' in q:
                                del q['explanation_image']
                                print("Removed explanation_image from Question 10")
                                found = True
                            else:
                                print("Question 10 already has no image")
                                found = True
                            
                            # Also check if img field exists (sometimes present duplicate)
                            if 'img' in q:
                                del q['img']
                                print("Removed img field from Question 10")
                    
                    if found: break
            if found: break
        if found: break

    if found:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Successfully updated dictionary_quizzes.json")
    else:
        print("Could not find Question 10 in Modern Production & Technology")

except Exception as e:
    print(f"Error: {e}")
