import json

def inspect_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol2 = next((v for v in data['volumes'] if v['id'] == 'vol2'), None)
    if not vol2:
        print("Volume 2 not found!")
        return

    topics = ['v2_t7', 'v2_t8', 'v2_t9', 'v2_t10', 'v2_t11', 'v2_t12']
    
    for topic_id in topics:
        topic = next((t for t in vol2['parts'][0]['topics'] if t['id'] == topic_id), None)
        if topic:
            print(f"\n--- TOPIC {topic_id} ({topic['title']}) ---")
            for q in topic['levels']['basic']:
                print(f"ID: {q['id']}")
                if 'content' in q:
                    print(f"Content: {q['content']}")
                elif 'text' in q:
                    print(f"Text: {q['text']}")
                print(f"Explanation: {q.get('expert_explanation', 'N/A')}")
                img = q.get('explanation_image', 'N/A')
                if isinstance(img, dict):
                    print(f"Image: {img.get('src', 'N/A')}")
                else:
                    print(f"Image: {img}")
                print("-" * 20)

if __name__ == "__main__":
    inspect_quizzes()
