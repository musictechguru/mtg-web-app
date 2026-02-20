import json

def list_basic_synthesis():
    try:
        with open('src/data/dictionary_quizzes.json', 'r') as f:
            data = json.load(f)
            
        print("Searching for 'BASIC SYNTHESIS COMPONENTS'...")
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    # Exact match or close to it
                    if topic.get('title') == "BASIC SYNTHESIS COMPONENTS":
                        print(f"Found Topic: {topic.get('title')} ({topic.get('id')})")
                        if 'levels' in topic and 'basic' in topic['levels']:
                             questions = topic['levels']['basic']
                             for i, q in enumerate(questions):
                                 print(f"  Q{i+1}: {q.get('content')}")
                                 print(f"    Image: {q.get('image', 'N/A')}")
                                 print(f"    Explanation Image: {q.get('explanation_image', 'N/A')}")
                        else:
                            print("No basic questions found.")
                        return # Stop after finding it
                        
        print("Topic 'BASIC SYNTHESIS COMPONENTS' not found.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_basic_synthesis()
