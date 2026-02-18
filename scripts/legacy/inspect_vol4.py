import json

def inspect_vol4():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    vol4 = next((v for v in data['volumes'] if v['id'] == 'vol4'), None)
    if not vol4:
        print("Volume 4 not found!")
        return

    print(f"Volume 4 found: {vol4['title']}")
    for part in vol4['parts']:
        print(f"Part ID: {part['id']}, Title: {part['title']}")
        for topic in part['topics']:
            print(f"  Topic ID: {topic['id']}, Title: {topic['title']}")
            # Sample a few questions to see current state
            for q in topic['levels']['basic'][:3]:
                print(f"    Q ID: {q['id']}")
                print(f"    Content: {q.get('content', q.get('text', 'N/A'))}")
                print(f"    Image: {q.get('explanation_image', 'N/A')}")
                print("-" * 20)

if __name__ == "__main__":
    inspect_vol4()
