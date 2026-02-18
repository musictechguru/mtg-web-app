import json
import re

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
log_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/fix_log.txt'

try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit()

print("STARTING HEURISTIC FIX")

# Separators to try splitting on, in order of preference
separators = [
    " because ",
    " due to ",
    " resulting in ",
    " allowing ",
    " which ",
    ";",
    " - ",
    " (", # Removes parenthetical explanations at the end
    ", "  # Comma is last resort and needs care
]

changes_count = 0
log_entries = []

for vol in data['volumes']:
    for part in vol['parts']:
        for topic in part['topics']:
            for level, questions in topic['levels'].items():
                for q in questions:
                    answers = q['answers']
                    if not answers: continue

                    # Identify correct answer
                    correct_ans = None
                    other_answers_texts = []
                    lengths = []
                    
                    for ans in answers:
                        txt = ans.get('text', '')
                        l = len(txt)
                        lengths.append(l)
                        
                        is_true = str(ans.get('is_true', '')).lower() in ['yes', 'true', '1'] or ans.get('is_true') is True
                        if is_true:
                            correct_ans = ans
                        else:
                            other_answers_texts.append(txt)
                    
                    if not correct_ans or len(lengths) < 2:
                        continue
                        
                    correct_text = correct_ans['text']
                    correct_len = len(correct_text)
                    
                    # Logic to determine if it NEEDS fixing (same as audit)
                    sorted_lens = sorted(lengths)
                    longest = sorted_lens[-1] # This should be correct_len if it's the problem
                    
                    if correct_len != longest:
                        continue # Not the longest, doesn't need fixing
                        
                    try:
                        second_longest = sorted_lens[-2]
                    except IndexError:
                        second_longest = 0
                        
                    ratio = correct_len / second_longest if second_longest > 0 else 2.0
                    diff = correct_len - second_longest
                    
                    # Criteria: Significantly longer
                    if ratio > 1.4 or diff > 20:
                        # Attempt to fix
                        new_text = None
                        
                        for sep in separators:
                            if sep in correct_text:
                                parts = correct_text.split(sep)
                                candidate = parts[0].strip()
                                
                                # Validation
                                if len(candidate) < 3:
                                    continue # Too short
                                if candidate in other_answers_texts:
                                    continue # Duplicate of distractor
                                if candidate == correct_text:
                                    continue # No change
                                
                                # Special check for comma to avoid cutting too aggressively
                                if sep == ", " and len(candidate) < 15:
                                    continue # risky short comma split
                                    
                                new_text = candidate
                                break # Found a split
                        
                        if new_text:
                            # Clean up trailing punctuation
                            if new_text.endswith(('.', ',', ':')):
                                new_text = new_text[:-1]
                            
                            log_entry = f"FIXED|{q['id']}\n  OLD: {correct_text}\n  NEW: {new_text}\n"
                            print(f"Fixed {q['id']}")
                            log_entries.append(log_entry)
                            
                            # Apply change
                            correct_ans['text'] = new_text
                            changes_count += 1

print(f"Total changes: {changes_count}")

# Save Data
if changes_count > 0:
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
    print("Saved dictionary_quizzes.json")

# Save Log
with open(log_path, 'w') as f:
    f.writelines(log_entries)
print(f"Log saved to {log_path}")
