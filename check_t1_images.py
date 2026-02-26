import json

def get_t1_images():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic1 = next((t for t in stage2['items'] if "Topic 1" in t.get('title', '')), None)
    
    for i, q in enumerate(topic1['questions']):
        print(f"Q{i+1}: {q['img']}")

get_t1_images()
