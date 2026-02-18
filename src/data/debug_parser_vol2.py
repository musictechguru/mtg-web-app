
import re
import os

def debug_vol2_parse():
    file_path = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 2/Microphone_Basic_Quiz_120_Questions.md"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Logic from generate_quiz_json.py
    subjects = re.split(r'#+\s*(?:SUBJECT|TOPIC)\s*\d+:\s*(.+)', content, flags=re.IGNORECASE)
    
    print(f"Found {len(subjects)} splits (should be odd number, > 1)")
    
    # Check if we even entered the loop
    if len(subjects) < 2:
        print("ERROR: Did not split by SUBJECT/TOPIC correctly!")
        return

    # Check first topic
    topic_title = subjects[1].strip()
    print(f"First Topic Title: '{topic_title}'")
    topic_content = subjects[2]
    
    q_blocks = re.split(r'### Question \d+', topic_content)
    print(f"Found {len(q_blocks)-1} questions in Topic 1")
    
    if len(q_blocks) > 1:
        # Check Question 1
        q_block = q_blocks[1]
        lines = q_block.strip().split('\n')
        
        # ... logic ...
        answer_line_idx = -1
        for idx, line in enumerate(lines):
             if line.startswith('**Answer:'):
                 answer_line_idx = idx
                 break
        
        print(f"Answer Line Index: {answer_line_idx}")
        if answer_line_idx != -1:
            post_answer_lines = lines[answer_line_idx+1:]
            print("Lines after answer:")
            for l in post_answer_lines:
                print(f"'{l}'")
                
            expert_explanation = ""
            current_section = None
            
            for line in post_answer_lines:
                line = line.strip()
                if not line or line.startswith('---'): continue
                
                if line.startswith('**Expert Explanation:**'):
                    current_section = "explanation"
                    expert_explanation = line.replace('**Expert Explanation:**', '').strip()
                elif current_section == "explanation":
                     expert_explanation += " " + line
            
            print(f"Extracted Explanation: '{expert_explanation}'")

if __name__ == "__main__":
    debug_vol2_parse()
