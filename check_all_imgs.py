import json

d = json.load(open('src/data/course_data.json'))
for s in d.get('sections', []):
    for i in s.get('items', []):
        for q in i.get('questions', []):
            if 'img' in q:
                print(f"question img: {q['img']}")
            for opt in q.get('options', []):
                if 'img' in opt:
                    print(f"option img: {opt['img']}")
            for sub in q.get('items', []):
                if 'img' in sub:
                     print(f"sub item img: {sub['img']}")
