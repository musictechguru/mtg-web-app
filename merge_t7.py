import json

def merge_t7():
    with open('t7_q1_to_10.json', 'r') as f:
        q1_10 = json.load(f)
    with open('t7_q11_to_20.json', 'r') as f:
        q11_20 = json.load(f)
        
    all_qs = q1_10 + q11_20
    
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic7 = next((t for t in stage2['items'] if "Topic 7" in t.get('title', '')), None)
    
    topic7['questions'] = all_qs
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Merged all 20 questions into course_data.json for Topic 7!")

if __name__ == '__main__':
    merge_t7()
