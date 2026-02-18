import json

def check_content_images():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    part1 = next((p for p in vol1['parts'] if p['id'] == 'v1_p1'), None)

    print(f"Scanning Part 1 Content for Markdown Images")
    
    found = False
    for topic in part1.get('topics', []):
        t_title = topic['title']
        
        # Check Basic
        for q in topic.get('levels', {}).get('basic', []):
            if q.get('title') == 'Question 8':
                if '![' in q.get('content', ''):
                    print(f"Topic: {t_title} (Basic) - Q8 HAS MARKDOWN IMAGE")
                    print(f"Content: {q.get('content')}")
                    found = True
        
        # Check Intermediate
        for q in topic.get('levels', {}).get('intermediate', []):
            if q.get('title') == 'Question 8':
                if '![' in q.get('content', ''):
                    print(f"Topic: {t_title} (Intermediate) - Q8 HAS MARKDOWN IMAGE")
                    print(f"Content: {q.get('content')}")
                    found = True

    if not found:
        print("No markdown images found in any Q8 of V1 P1.")

check_content_images()
