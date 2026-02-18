import json

def list_all_q8_in_p1():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1: return

    part1 = next((p for p in vol1['parts'] if p['id'] == 'v1_p1'), None)
    if not part1: return

    print(f"Scanning Part 1: {part1['title']}")
    
    for topic in part1.get('topics', []):
        t_title = topic['title']
        
        # Check Basic
        for q in topic.get('levels', {}).get('basic', []):
            if q.get('title') == 'Question 8':
                print(f"Topic: {t_title} (Basic) - Q8: {q.get('content')}")
                print(f"  Has Image: {'img' in q}")
                if 'img' in q: print(f"  Image: {q['img']}")
                print("-" * 20)
        
        # Check Intermediate
        for q in topic.get('levels', {}).get('intermediate', []):
            if q.get('title') == 'Question 8':
                print(f"Topic: {t_title} (Intermediate) - Q8: {q.get('content')}")
                print(f"  Has Image: {'img' in q}")
                if 'img' in q: print(f"  Image: {q['img']}")
                print("-" * 20)

list_all_q8_in_p1()
