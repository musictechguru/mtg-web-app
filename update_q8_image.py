import json

def update_q8_image():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Updating Question 8 Image...")
        updated = False
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    if topic.get('id') == 'v2_t1':
                        if 'levels' in topic and 'basic' in topic['levels']:
                            questions = topic['levels']['basic']
                            # Q8 should be index 7
                            if len(questions) >= 8:
                                q8 = questions[7]
                                if "What is an audio interface?" in q8.get('content', ''):
                                    print("Found Q8.")
                                    q8['img'] = "/images/gen/audio_interface_modern.png"
                                    updated = True
                                else:
                                    print(f"Index 7 content mismatch: {q8.get('content')}")

        if updated:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print("Successfully updated Q8.")
        else:
            print("Failed to update Q8.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_q8_image()
