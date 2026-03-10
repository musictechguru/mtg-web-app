import json

def find_quiz(obj, target_id):
    if isinstance(obj, dict):
        if obj.get('id') == target_id:
            return obj
        for v in obj.values():
            res = find_quiz(v, target_id)
            if res: return res
    elif isinstance(obj, list):
        for item in obj:
            res = find_quiz(item, target_id)
            if res: return res
    return None

def extract_topic9():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
    
    t9 = find_quiz(data, 'quiz-topic-9_p1')
    if t9:
        with open('t9_extracted.json', 'w') as f:
            json.dump(t9['questions'], f, indent=2)

if __name__ == '__main__':
    extract_topic9()
