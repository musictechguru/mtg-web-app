import json

def inspect_vol7():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol7 = next((v for v in data['volumes'] if v['id'] == 'vol7'), None)
    if not vol7:
        print("Volume 7 not found!")
        return

    print(f"Volume 7 found: {vol7['title']}")
    for part in vol7['parts']:
        print(f"Part ID: {part['id']}, Title: {part['title']}")
        for topic in part['topics']:
            print(f"  Topic ID: {topic['id']}, Title: {topic['title']}")
            # Sample a few questions
            for q in topic['levels']['basic'][:2]:
                print(f"    Q: {q.get('content', '')}")
                print(f"    Img: {q.get('explanation_image', 'N/A')}")
                print("-" * 10)

if __name__ == "__main__":
    inspect_vol7()
