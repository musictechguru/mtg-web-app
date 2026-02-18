import json

def inspect_remaining_volumes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    for vol_id in ['vol1', 'vol9', 'vol10']:
        vol = next((v for v in data['volumes'] if v['id'] == vol_id), None)
        if not vol:
            print(f"{vol_id} not found!")
            continue

        print(f"=== {vol_id}: {vol['title']} ===")
        for part in vol['parts']:
            print(f"Part ID: {part['id']}, Title: {part['title']}")
            for topic in part['topics']:
                print(f"  Topic ID: {topic['id']}, Title: {topic['title']}")
                # Sample a few questions
                if 'basic' in topic['levels']:
                    for q in topic['levels']['basic'][:1]:
                        print(f"    Q (Basic): {q.get('content', '')}")
                        print(f"    Img: {q.get('explanation_image', 'N/A')}")
                print("-" * 10)
        print("\n")

if __name__ == "__main__":
    inspect_remaining_volumes()
