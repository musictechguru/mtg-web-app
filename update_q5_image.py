import json

def update_q5_image():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Updating Question 5 Image...")
        updated = False
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    # Target v2_t1 (Gain & Signal Path)
                    if topic.get('id') == 'v2_t1':
                        if 'levels' in topic and 'basic' in topic['levels']:
                            questions = topic['levels']['basic']
                            if len(questions) >= 5:
                                q5 = questions[4]
                                # Verify it's the right question
                                if "Gain and volume are exactly the same thing" in q5.get('content', ''):
                                    print("Found target question.")
                                    # Update the 'img' field (as seen in other questions)
                                    # Also 'image' just in case, but 'img' seems standard for questions in this file
                                    # Wait, let's check one more time. Q5 in search had "Image: None".
                                    # In Step 19, line 80: "img": "..."
                                    # So we should set "img".
                                    
                                    q5['img'] = "/images/gen/gain_vs_volume_diagram.png"
                                    # Also ensure explanation_image is preserved (it was already there)
                                    
                                    updated = True
                                    print(f"Updated Q5 image to: {q5['img']}")
                                else:
                                    print("Question text did not match expected.")

        if updated:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print("Successfully saved dictionary_quizzes.json")
        else:
            print("Failed to find or update the question.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_q5_image()
