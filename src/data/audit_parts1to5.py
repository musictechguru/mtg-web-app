
import json

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(filepath, 'r') as f:
    data = json.load(f)

print("AUDIT START PARTS 1-5")

parts_to_check = ['p1', 'p2', 'p3', 'p4', 'p5']

for vol in data['volumes']:
    if vol['id'] == 'vol1':
        for part in vol['parts']:
            if part['id'] in parts_to_check:
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            # Skip non-multi-choice questions
                            if 'answers' not in q:
                                continue
                            
                            correct_ans = None
                            answers = q['answers']
                            lengths = []
                            
                            for ans in answers:
                                l = len(ans['text'])
                                lengths.append(l)
                                if ans['is_true'] == 'yes':
                                    correct_ans = ans
                                    correct_len = l
                            
                            if not correct_ans:
                                continue # Should not happen but safe guard

                            sorted_lens = sorted(lengths)
                            longest = sorted_lens[-1]
                            second_longest = sorted_lens[-2]
                            
                            # Check if correct answer is the longest
                            if correct_len == longest:
                                # Check if it is significantly longer
                                if correct_len > second_longest * 1.15 or (correct_len - second_longest) > 15:
                                    print(f"FLAGGED|{part['id']}|{q['id']}|{q['title']}|Correct: {correct_len} vs Next: {second_longest}")
                                    print(f"  Q: {q['content']}")
                                    print(f"  Correct: {correct_ans['text']}")
                                    print(f"  Distractors: {[a['text'] for a in answers if a != correct_ans]}")
                                    print("-" * 20)
