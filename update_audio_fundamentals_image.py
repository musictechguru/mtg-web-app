import json

def update_audio_fundamentals_image():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Updating Audio Fundamentals Image...")
        updated = False
        
        for volume in data.get('volumes', []):
            if volume.get('id') == 'vol1':
                for part in volume.get('parts', []):
                    for topic in part.get('topics', []):
                        if topic.get('id') == 'v1_t1':
                            if 'levels' in topic and 'basic' in topic['levels']:
                                questions = topic['levels']['basic']
                                if len(questions) > 0:
                                    q1 = questions[0]
                                    if "What is audio?" in q1.get('content', ''):
                                        q1['img'] = "/images/gen/audio_fundamentals_concept.png"
                                        updated = True
                                        print("Updated Q1 image.")
                                    else:
                                        print(f"Q1 mismatch: {q1.get('content')}")

        if updated:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print("Successfully updated dictionary_quizzes.json")
        else:
            print("Failed to find or update the question.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_audio_fundamentals_image()
