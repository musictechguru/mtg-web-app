import json

def find_question_specific():
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    part1_topics = vol1['parts'][0]['topics']

    # Check Topic 1
    t1 = part1_topics[0]
    print(f"Topic 1: {t1['title']}")
    
    # Check Basic
    if 'basic' in t1['levels']:
        q8 = next((q for q in t1['levels']['basic'] if q['title'] == 'Question 8'), None)
        if q8:
            print(f"  [Basic] Question 8: {q8.get('content')}")
            print(f"  Has Image: {'img' in q8}")
            if 'img' in q8: print(f"  Image: {q8['img']}")

    # Check Intermediate
    if 'intermediate' in t1['levels']:
        q8 = next((q for q in t1['levels']['intermediate'] if q['title'] == 'Question 8'), None)
        if q8:
            print(f"  [Intermediate] Question 8: {q8.get('content')}")
            print(f"  Has Image: {'img' in q8}")
            if 'img' in q8: print(f"  Image: {q8['img']}")

find_question_specific()
