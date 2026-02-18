import json

def investigate_v1p1_q8():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1: return

    part1 = next((p for p in vol1['parts'] if p['id'] == 'v1_p1'), None)
    if not part1: return

    print(f"Scanning Part 1: {part1['title']}")
    
    for i, topic in enumerate(part1.get('topics', [])):
        t_title = topic['title']
        print(f"\nTopic {i+1}: {t_title} ({topic['id']})")
        
        # Check Basic Level
        basic_qs = topic.get('levels', {}).get('basic', [])
        found_basic = False
        
        # Check by Title
        for q in basic_qs:
            if q.get('title') == 'Question 8':
                print(f"  [Basic] Found explicit 'Question 8':")
                print(f"    Content: {q.get('content')}")
                print(f"    Image: {q.get('img', 'None')}")
                found_basic = True

        # Check by Index (0-based index 7 = 8th question)
        if len(basic_qs) > 7:
            q8_idx = basic_qs[7]
            # avoid duplicate print if title matched
            if q8_idx.get('title') != 'Question 8':
                print(f"  [Basic] 8th Question in list (Index 7):")
                print(f"    Title: {q8_idx.get('title')}")
                print(f"    Content: {q8_idx.get('content')}")
                print(f"    Image: {q8_idx.get('img', 'None')}")
                found_basic = True
        
        if not found_basic:
            print("  [Basic] No Q8 candidate found.")

        # Check Intermediate Level
        inter_qs = topic.get('levels', {}).get('intermediate', [])
        found_inter = False
        
        for q in inter_qs:
            if q.get('title') == 'Question 8':
                print(f"  [Intermediate] Found explicit 'Question 8':")
                print(f"    Content: {q.get('content')}")
                print(f"    Image: {q.get('img', 'None')}")
                found_inter = True

        if len(inter_qs) > 7:
            q8_idx = inter_qs[7]
            if q8_idx.get('title') != 'Question 8':
                print(f"  [Intermediate] 8th Question in list (Index 7):")
                print(f"    Title: {q8_idx.get('title')}")
                print(f"    Content: {q8_idx.get('content')}")
                print(f"    Image: {q8_idx.get('img', 'None')}")
                found_inter = True
                
        if not found_inter:
            print("  [Intermediate] No Q8 candidate found.")

investigate_v1p1_q8()
