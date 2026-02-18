import re

BASIC_QUIZ_FILE = "public/Quiz_questions/volume 2/Microphone_Basic_Quiz_120_Questions.md"

def parse_quiz_file(filepath):
    print(f"Reading {filepath}")
    with open(filepath, 'r') as f:
        content = f.read()

    # Attempt Regex
    # ## TOPIC 1: GAIN & SIGNAL PATH
    topic_blocks = re.split(r'## TOPIC \d+: ', content)[1:] 
    
    for i, block in enumerate(topic_blocks):
        lines = block.split('\n')
        topic_title = lines[0].strip()
        
        # Check questions count
        q_blocks = re.split(r'### Question \d+', block)[1:]

        if i == 0:
            print("--- First Question Details ---")
            for qb in q_blocks[:1]:
                qb = qb.strip()
                if not qb: continue
                match = re.search(r'\*\*Answer:\s*([A-D])\*\*', qb)
                if match:
                    correct_letter = match.group(1)
                    print(f"Extract Answer Letter: '{correct_letter}'")
                    
                    body_part = qb[:match.start()].strip()
                    body_lines = [l.strip() for l in body_part.split('\n') if l.strip()]
                    
                    if body_lines:
                        print(f"Question Text: '{body_lines[0]}'")
                        for line in body_lines:
                             # Logic from main script
                             opt_match = re.match(r'-\s*([A-D])\)?\s*(.*)', line)
                             if opt_match:
                                 opt_char = opt_match.group(1)
                                 opt_text = opt_match.group(2)
                                 is_correct = (opt_char == correct_letter)
                                 print(f"  Option {opt_char}: '{opt_text}' -> Correct? {is_correct}")

if __name__ == "__main__":
    parse_quiz_file(BASIC_QUIZ_FILE)
