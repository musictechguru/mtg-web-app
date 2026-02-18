import json

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit()

print("AUDIT START - ALL VOLUMES")

flagged_count = 0

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    correct_ans = None
                    answers = q['answers']
                    lengths = []
                    
                    correct_len = 0
                    
                    for ans in answers:
                        if not ans.get('text'): continue
                        l = len(ans['text'])
                        lengths.append(l)
                        # Check for various truthy values just in case
                        is_true = str(ans.get('is_true', '')).lower() in ['yes', 'true', '1'] or ans.get('is_true') is True
                        if is_true:
                            correct_ans = ans
                            correct_len = l
                    
                    if not correct_ans or len(lengths) < 2:
                        continue

                    sorted_lens = sorted(lengths)
                    longest = sorted_lens[-1]
                    try:
                        second_longest = sorted_lens[-2]
                    except IndexError:
                        second_longest = 0
                    
                    # Criteria: Correct is longest AND significant difference
                    # Significant: > 50% longer or > 25 chars longer (stricter than previous audit)
                    if correct_len == longest:
                        ratio = correct_len / second_longest if second_longest > 0 else 2.0
                        diff = correct_len - second_longest
                        
                        if ratio > 1.5 or diff > 25:
                            print(f"FLAGGED|{vol['id']}|{q['id']}|{q['content'][:50]}...|Correct: {correct_len} vs Next: {second_longest}")
                            print(f"  Correct: {correct_ans['text']}")
                            print("-" * 20)
                            flagged_count += 1

print(f"AUDIT COMPLETE. Flagged {flagged_count} questions.")
