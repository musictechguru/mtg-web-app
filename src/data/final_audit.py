
import json

def audit_all_parts():
    filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return

    flagged_count = 0
    print("Starting Final Audit for All Parts...")
    
    for vol in data['volumes']:
        for part in vol['parts']:
            part_id = part['id']
            for topic in part['topics']:
                topic_id = topic['id']
                for level, questions in topic['levels'].items():
                    for q in questions:
                        if q.get('type') != 'multi_choice':
                            continue
                        if 'answers' not in q:
                            continue
                            
                        answers = q['answers']
                        correct_list = [a for a in answers if a.get('is_true') == 'yes']
                        distractors = [a for a in answers if a.get('is_true') == 'no']
                        
                        if not correct_list or not distractors:
                            continue
                            
                        correct_text = correct_list[0]['text']
                        correct_len = len(correct_text)
                        
                        distractor_lens = [len(d['text']) for d in distractors]
                        if not distractor_lens:
                            continue
                            
                        max_distractor_len = max(distractor_lens)
                        avg_distractor_len = sum(distractor_lens) / len(distractor_lens)
                        
                        is_flagged = False
                        # Relaxed criteria slightly to avoid false positives on minor differences
                        if correct_len > max_distractor_len * 1.6 and (correct_len - max_distractor_len) > 20:
                            is_flagged = True
                        elif correct_len > avg_distractor_len * 2.0 and (correct_len - avg_distractor_len) > 25:
                            is_flagged = True
                            
                        if is_flagged:
                            flagged_count += 1
                            print(f"FLAGGED|{part_id}|{topic_id}|{q['id']}")
                            q_text = q.get('question') or q.get('content') or 'No Question Text'
                            print(f"  Q: {q_text}")
                            print(f"  Correct ({correct_len})")
                            print(f"  Max Distractor ({max_distractor_len})")
                            print("-" * 20)

    print(f"Audit Complete. Total Flagged: {flagged_count}")

if __name__ == "__main__":
    audit_all_parts()
