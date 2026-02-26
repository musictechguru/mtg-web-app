import json

with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json', 'r') as f:
    data = json.load(f)

stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
topic1 = next((t for t in stage2['items'] if "Topic 1" in t.get('title', '')), None)

questions = topic1['questions']

for i, q in enumerate(questions):
    print(f"--- Question {i+1}: Q_title={q.get('title')} ---")
    print(f"Content: {q.get('content')}")
    correct_answer = next((a['text'] for a in q.get('answers', []) if a.get('is_true') == 'yes'), None)
    print(f"Correct Answer: {correct_answer}")
    print(f"Expert Explanation: {q.get('expert_explanation', '')}")
    print(f"Image: {q.get('img', '')}")
    print(f"Quote: {q.get('expert_quote', {}).get('text', '')}")
    print("\n------------------\n")
