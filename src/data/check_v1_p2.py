import json

def check_v1_p2():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1:
        print("Volume 1 not found")
        return

    # Check Part 2
    if len(vol1['parts']) < 2:
        print("Volume 1 has less than 2 parts")
        return

    p2 = vol1['parts'][1]
    print(f"Part 2 Title: {p2['title']}")

    for topic in p2['topics']:
        print(f"\nTopic: {topic['title']} ({topic['id']})")
        
        # Check Basic Level Questions 5, 6, 8, 10 (Indices 4, 5, 7, 9)
        questions = topic['levels']['basic']
        indices = [4, 5, 7, 9]
        
        for i in indices:
            if i < len(questions):
                q = questions[i]
                print(f"  Q{i+1}: {q['content']}")
                if 'img' in q:
                    print(f"    Existing Img: {q['img']}")
                if 'explanation_image' in q:
                    print(f"    Existing Expl Img: {q['explanation_image']}")

if __name__ == "__main__":
    check_v1_p2()
