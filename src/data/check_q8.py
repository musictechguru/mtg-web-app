import json

def find_question():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    # Navigate to Volume 1
    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1:
        print("Volume 1 not found")
        return

    # Navigate to Part 1
    part1 = next((p for p in vol1['parts'] if p['id'] == 'v1_p1'), None)
    if not part1:
        print("Part 1 not found")
        return

    print(f"Checking Part 1: {part1.get('title')}")

    # Inspect structure to find Q8
    # Questions might be distributed across topics and levels.
    # Let's see if we can find "Question 8" by title or ID anywhere in Part 1.
    
    found_any = False
    
    for topic in part1.get('topics', []):
        print(f"  Topic: {topic.get('title')} ({topic.get('id')})")
        for level_name, questions in topic.get('levels', {}).items():
            for i, q in enumerate(questions):
                # Check for explicit ID or Title
                q_id = q.get('id', '')
                q_title = q.get('title', '')
                
                # Loose matching for "Question 8"
                if "Question 8" in q_title or q_id.endswith("q8"):
                     print(f"    FOUND Q8 in {level_name} level:")
                     print(f"      Title: {q_title}")
                     print(f"      Content: {q.get('content')}")
                     print(f"      Image field present: {'img' in q}")
                     if 'img' in q:
                         print(f"      Image path: {q['img']}")
                     print("-" * 20)
                     found_any = True

    if not found_any:
        print("    No 'Question 8' found in Part 1.")

find_question()
