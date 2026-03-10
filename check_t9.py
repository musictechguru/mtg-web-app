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

def check_topic9():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
    
    t9 = find_quiz(data, 'quiz-topic-9_p1')
    if t9:
        for i, q in enumerate(t9['questions']):
            content_len = len(q.get('content', ''))
            quote_len = len(q.get('expert_quote', {}).get('text', ''))
            img = q.get('img', '')
            print(f"Q{i+1}: Content Len={content_len}, Quote Len={quote_len}, Img={img}")

if __name__ == '__main__':
    check_topic9()
