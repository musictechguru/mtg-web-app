import json

def update_q7_q9_images():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Updating Q7 and Q9 Images...")
        updated_count = 0
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    if topic.get('id') == 'v2_t1':
                        if 'levels' in topic and 'basic' in topic['levels']:
                            questions = topic['levels']['basic']
                            
                            # Q7 - Gain Level
                            if len(questions) >= 7:
                                q7 = questions[6]
                                if "What level should you aim for when setting gain?" in q7.get('content', ''):
                                    q7['img'] = "/images/gen/gain_staging_meter.png"
                                    updated_count += 1
                                    print("Updated Q7.")
                                else:
                                    print(f"Q7 mismatch: {q7.get('content')}")
                                    
                            # Q9 - Gain too low
                            if len(questions) >= 9:
                                q9 = questions[8]
                                if "What happens if you set the gain too low?" in q9.get('content', ''):
                                    q9['img'] = "/images/gen/noise_floor_tape.png"
                                    updated_count += 1
                                    print("Updated Q9.")
                                else:
                                    print(f"Q9 mismatch: {q9.get('content')}")

        if updated_count > 0:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print(f"Successfully updated {updated_count} questions.")
        else:
            print("No updates made.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_q7_q9_images()
