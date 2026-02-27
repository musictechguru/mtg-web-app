import json

def merge_t8():
    with open('t8_q1_to_2.json', 'r') as f:
        q1_2 = json.load(f)
    with open('t8_q3_to_6.json', 'r') as f:
        q3_6 = json.load(f)
    with open('t8_q7_to_10.json', 'r') as f:
        q7_10 = json.load(f)
    with open('t8_q11_to_12.json', 'r') as f:
        q11_12 = json.load(f)
    with open('t8_q13_to_16.json', 'r') as f:
        q13_16 = json.load(f)
    with open('t8_q17_to_20.json', 'r') as f:
        q17_20 = json.load(f)
        
    all_qs = q1_2 + q3_6 + q7_10 + q11_12 + q13_16 + q17_20
    
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic8 = next((t for t in stage2['items'] if "Topic 8" in t.get('title', '')), None)
    
    topic8['questions'] = all_qs
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Merged all 20 questions into course_data.json for Topic 8!")

if __name__ == '__main__':
    merge_t8()
