import json

def list_v3_t1_questions():
    try:
        with open('src/data/dictionary_quizzes.json', 'r') as f:
            data = json.load(f)
            
        print("Searching for Volume 3, Topic 1 (Basic Synthesis)...")
        # Assuming v3_t1 is the correct ID based on previous context, but let's confirm title
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    # Check for "Basic Synthesis" or similar in title
                    if "SYNTHESIS" in topic.get('title', '').upper():
                        print(f"Found Topic: {topic.get('title')} ({topic.get('id')})")
                        if 'levels' in topic and 'basic' in topic['levels']:
                             questions = topic['levels']['basic']
                             for i, q in enumerate(questions):
                                 print(f"  Q{i+1}: {q.get('content')}")
                                 print(f"    Image: {q.get('image', 'N/A')}")
                                 print(f"    Explanation Image: {q.get('explanation_image', 'N/A')}")
                                 
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_v3_t1_questions()
