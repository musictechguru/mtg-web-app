import json

def get_t2_questions():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic2 = next((t for t in stage2['items'] if "Topic 2" in t.get('title', '')), None)
    
    for i, q in enumerate(topic2['questions']):
        print(f"Q{i+1}: {q['content']}")

get_t2_questions()
