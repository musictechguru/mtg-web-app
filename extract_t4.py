import json

def extract_t4_full():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic4 = next((t for t in stage2['items'] if "Topic 4" in t.get('title', '')), None)
    
    print(f"Topic Title: {topic4['title']}")
    for i, q in enumerate(topic4['questions']):
        print(f"\n--- Q{i+1}: {q['content']} ---")
        if q['type'] == 'multi_choice':
            for a in q['answers']:
                print(f"  - {a['text']} (is_true: {a.get('is_true', False)})")
        print(f"Explanation: {q.get('expert_explanation', 'MISSING')}")

if __name__ == '__main__':
    extract_t4_full()
