import json

file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

updates = [
    {
        "topic_title": "PRE-DELAY", 
        "question_title": "Question 8", 
        "new_image": "/images/reverb_plugin.png"
    },
    {
        "topic_title": "BASS TRAPS", 
        "question_title": "Question 8", 
        "new_image": "/images/MT Pictures/Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg"
    },
    {
        "topic_title": "ACOUSTIC PANELS & TREATMENT", 
        "question_title": "Question 3", 
        "new_image": "/images/Acoustic Reverb Room.jpg"
    }
]

# Note: adjusting the bass trap image path to be relative to public, assuming the image is in public/images or public/images/MT Pictures
# The list_dir showed "Mastering..." in root of public/images AND "MT Pictures" folder. 
# The user said "best one are in root images folder".
# Step 189 showed "Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg" in root of public/images (size 380684).
# It also showed "Acoustic Reverb Room.jpg" in root (size 20278).
# It showed "reverb_plugin.png" in root (size 767876).
# So I will use /images/Filename.jpg

updates = [
    {
        "topic_title": "PRE-DELAY", 
        "question_title": "Question 8", 
        "new_image": "/images/reverb_plugin.png"
    },
    {
        "topic_title": "BASS TRAPS", 
        "question_title": "Question 8", 
        "new_image": "/images/Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg"
    },
    {
        "topic_title": "ACOUSTIC PANELS & TREATMENT", 
        "question_title": "Question 3", 
        "new_image": "/images/Acoustic Reverb Room.jpg"
    }
]

try:
    with open(file_path, 'r') as f:
        data = json.load(f)

    updated_count = 0
    
    for volume in data['volumes']:
        for part in volume['parts']:
            for topic in part['topics']:
                
                # Check if this topic is in our updates list
                target_update = next((u for u in updates if u['topic_title'] == topic['title']), None)
                
                if target_update:
                    print(f"Found topic: {topic['title']}")
                    
                    # Check basic level
                    basic_questions = topic['levels'].get('basic', [])
                    for q in basic_questions:
                        if q['title'] == target_update['question_title']:
                            # Update image
                            q['explanation_image'] = target_update['new_image']
                            
                            # Remove 'img' if exists
                            if 'img' in q:
                                del q['img']
                            
                            print(f"  Updated {q['title']} with {target_update['new_image']}")
                            updated_count += 1

    if updated_count > 0:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Successfully updated {updated_count} questions in dictionary_quizzes.json")
    else:
        print("No questions were updated. Please check topic titles and question numbers.")

except Exception as e:
    print(f"Error: {e}")
