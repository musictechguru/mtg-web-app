import json

def inspect_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol3 = next((v for v in data['volumes'] if v['id'] == 'vol3'), None)
    if not vol3:
        print("Volume 3 not found!")
        return

    print(f"Volume 3 found: {vol3['title']}")
    for part in vol3['parts']:
        print(f"Part ID: {part['id']}, Title: {part['title']}")
        for topic in part['topics']:
            print(f"  Topic ID: {topic['id']}, Title: {topic['title']}")
            for q in topic['levels']['basic']:
                print(f"    Q ID: {q['id']}")
                if 'content' in q:
                    print(f"    Content: {q['content']}")
                elif 'text' in q:
                    print(f"    Text: {q['text']}")
                print(f"    Explanation: {q.get('expert_explanation', 'N/A')}")
                img = q.get('explanation_image', 'N/A')
                if isinstance(img, dict):
                    print(f"    Image: {img.get('src', 'N/A')}")
                else:
                    print(f"    Image: {img}")
                print("-" * 20)

if __name__ == "__main__":
    inspect_quizzes()
