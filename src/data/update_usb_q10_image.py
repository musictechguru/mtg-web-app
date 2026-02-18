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
                # Check by ID or Title
                if topic['id'] == 'v10_t5' or topic['title'] == 'USB & DIGITAL CONNECTIONS':
                    print(f"Found topic: {topic['title']} (ID: {topic['id']})")
                    
                    # Check basic level
                    basic_questions = topic['levels'].get('basic', [])
                    for q in basic_questions:
                        if q['title'] == 'Question 10':
                            # Add/Replace the explanation_image
                            q['explanation_image'] = "/images/explanations/audio_interface_diagram.svg"
                            
                            # Remove 'img' if it exists (cleanup)
                            if 'img' in q:
                                del q['img']
                                print("Removed redundant 'img' field")
                            
                            print("Updated explanation_image for Question 10")
                            found = True
                    
                    if found: break
            if found: break
        if found: break

    if found:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Successfully updated dictionary_quizzes.json")
    else:
        print("Could not find Question 10 in USB & DIGITAL CONNECTIONS")

except Exception as e:
    print(f"Error: {e}")
