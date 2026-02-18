import json

path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(path, 'r') as f:
    data = json.load(f)

# Find the question
q_id = 'v1_p1_t2_b_hot_1'
target_q = None

# Search structure
for volume in data['volumes']:
    for part in volume['parts']:
        for topic in part['topics']:
            if 'basic' in topic['levels']:
                for q in topic['levels']['basic']:
                    if q['id'] == q_id:
                        target_q = q
                        break
            if target_q: break
        if target_q: break
    if target_q: break

if target_q:
    print(f"Found question: {target_q['title']}")
    
    # Define the correct hotspot
    # Using 23, 30 as requested.
    
    if 'hotspots' in target_q and isinstance(target_q['hotspots'], list) and len(target_q['hotspots']) > 0:
        found_answer = False
        for spot in target_q['hotspots']:
            if spot.get('isAnswer'):
                spot['x'] = 23
                spot['y'] = 30
                found_answer = True
                print("Updated existing correct hotspot.")
        if not found_answer:
            # If we have distractors but no answer, add answer
            target_q['hotspots'].append({
                "id": f"h_{len(target_q['hotspots'])+1}",
                "x": 23,
                "y": 30,
                "width": 12,
                "height": 12,
                "label": "Correct Zone",
                "isAnswer": True
            })
            print("Added new correct hotspot to existing list.")
    else:
        # No hotspots, create fresh
        target_q['hotspots'] = [{
            "id": "h1",
            "x": 23,
            "y": 30,
            "width": 12,
            "height": 12,
            "label": "Correct Zone",
            "isAnswer": True
        }]
        print("Created fresh hotspots array.")

    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    print("File successfully updated.")

else:
    print("Question ID not found.")
