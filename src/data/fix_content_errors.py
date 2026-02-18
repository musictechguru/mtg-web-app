import json
import os

def fix_errors():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    changes = 0

    # Helper to find Q
    def find_q(content_snippet):
        for vol in data['volumes']:
            for part in vol['parts']:
                for topic in part['topics']:
                    for level, qs in topic.get('levels', {}).items():
                        for q in qs:
                            if content_snippet in q['content']:
                                return q
        return None

    # 1. Fix Equilateral Triangle Image
    q1 = find_q("Equilateral triangle setup")
    if q1:
        print(f"Found Q: {q1['content']}")
        q1['explanation_image'] = "/images/explanations/equilateral_triangle_setup.svg"
        q1['img'] = "/images/explanations/equilateral_triangle_setup.svg" # Ensure both set if needed
        changes += 1

    # 2. Fix EQ Gain Answer
    q2 = find_q("gain\" control do on an EQ")
    if not q2: q2 = find_q("gain' control do on an EQ") # Try single quote
    if not q2: q2 = find_q("control do on an EQ") # Try broad
    
    if q2:
        print(f"Found Q: {q2['content']}")
        # Reset all answers to no
        for a in q2['answers']:
            a['is_true'] = "no"
            if "boost" in a['text'].lower() or "cut" in a['text'].lower() or "amplitude" in a['text'].lower() or "amount" in a['text'].lower():
                a['is_true'] = "yes"
                print(f"  -> Set correct answer: {a['text']}")
        changes += 1

    # 3. Fix Dithering Answer
    q3 = find_q("Dithering adds what")
    if q3:
        print(f"Found Q: {q3['content']}")
        for a in q3['answers']:
            a['is_true'] = "no"
            if "noise" in a['text'].lower():
                a['is_true'] = "yes"
                print(f"  -> Set correct answer: {a['text']}")
        changes += 1

    if changes > 0:
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Fixed {changes} errors.")
    else:
        print("No errors found to fix.")

if __name__ == "__main__":
    fix_errors()
