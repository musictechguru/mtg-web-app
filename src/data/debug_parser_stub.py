
import re

def debug_parse_stub():
    # A small chunk from Volume 1 Basic Question 1
    # Note the newlines and exact format observed in view_file output
    test_content = """### Question 1
What is audio?
- A) Only electricity
- B) Only light
- C) Vibrations traveling through air
- D) Only silence

**Answer: C**

**Expert Explanation:** Correct Answer: Vibrations traveling through air. Audio vs Sound: Think of a live vocalist. Their voice is 'Sound' (air pressure). The signal flowing through the XLR cable to the mixer is 'Audio' (electricity).
**Image:** !["Diagram"](/images/svg/waveform_time_domain.svg)
**Expert Quote:** "We take these sound waves, this sound, and we organize it into emotion, and that's how we connect with our audiences. - Stefon Harris"
"""

    lines = test_content.strip().split('\n')
    
    # Logic from generate_quiz_json.py lines 54-160 (simplified)
    
    question_text_lines = []
    options = []
    answer_char = None
    expert_explanation = ""
    explanation_image = None
    expert_quote = None
    
    mode = "question"
    
    # First pass: Extract Question, Options, Answer
    # The original script iterates lines to check startswith
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if line.startswith('---'): continue
        
        # Check for Option
        if re.match(r'- [A-D]\)', line):
            mode = "options"
            options.append(line)
        # Check for Answer
        elif line.startswith('**Answer:'):
            match = re.search(r'\*\*Answer:\s*([A-D])', line)
            if match:
                answer_char = match.group(1)
        elif mode == "question":
            question_text_lines.append(line)

    question_text = " ".join(question_text_lines).strip()
    
    print(f"Question Text: {question_text}")
    print(f"Answer Char: {answer_char}")

    # Second pass: Extract Enrichment (Lines AFTER Answer)
    answer_line_idx = -1
    for idx, line in enumerate(lines):
         if line.startswith('**Answer:'):
             answer_line_idx = idx
             break
    
    if answer_line_idx != -1:
        post_answer_lines = lines[answer_line_idx+1:]
        print(f"Lines after answer: {len(post_answer_lines)}")
        
        current_section = None
        
        for line in post_answer_lines:
            line = line.strip()
            # print(f"Processing line: '{line}'")
            if not line or line.startswith('---'): continue
            
            if line.startswith('**Expert Explanation:**'):
                current_section = "explanation"
                expert_explanation = line.replace('**Expert Explanation:**', '').strip()
                # print(f"Found Expl: {expert_explanation}")
                
            elif line.startswith('**Expert Quote:**'):
                current_section = "quote"
                raw_quote = line.replace('**Expert Quote:**', '').strip()
                if " - " in raw_quote:
                    parts = raw_quote.rsplit(" - ", 1)
                    expert_quote = {"text": parts[0].strip('"'), "author": parts[1].strip().strip('"')}
                else:
                    expert_quote = {"text": raw_quote.strip('"'), "author": "Anonymous"}
                # print(f"Found Quote: {expert_quote}")
                
            elif line.startswith('**Image:**'):
                current_section = "image"
                img_match = re.search(r'!\[(.*?)\]\((.*?)\)', line)
                if img_match:
                    explanation_image = {"src": img_match.group(2), "alt": img_match.group(1)}
                else:
                        explanation_image = {"src": line.replace('**Image:**', '').strip(), "alt": "Diagram"}
                # print(f"Found Image: {explanation_image}")
                
            elif current_section == "explanation":
                 # Appending multiline explanation
                 expert_explanation += " " + line

    print("-" * 20)
    print(f"Expert Explanation: {expert_explanation}")
    print(f"Explanation Image: {explanation_image}")
    print(f"Expert Quote: {expert_quote}")

if __name__ == "__main__":
    debug_parse_stub()
