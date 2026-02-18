import re

FILES = [
    "../../public/Quiz_questions/Volume 1/Volume1_Fundamentals_Basic_Level_120Q.md",
    "../../public/Quiz_questions/Volume 1/Volume1_Fundamentals_Intermediate_Level_120Q.md"
]

def audit():
    for fpath in FILES:
        print(f"Scanning {fpath}...")
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all explanations
            # Regex for **Expert Explanation:** (.*)
            # If the group 1 is empty or very short, flag it.
            
            matches = re.finditer(r'\*\*Answer: (.*?)\*\*\s*\n\s*\*\*Expert Explanation:\*\*(.*)', content)
            
            count = 0
            blanks = 0
            
            for m in matches:
                ans_char = m.group(1).strip()
                expl_text = m.group(2).strip()
                
                # Check if effectively blank (e.g. just "Correct Answer: **Text**.")
                # We expect more text after the period.
                
                is_effectively_blank = False
                if len(expl_text) < 5:
                    is_effectively_blank = True
                elif expl_text.startswith("Correct Answer:"):
                    # Check if there is text after the bold answer
                    # e.g. "Correct Answer: **Foo**." -> ends with . or nothing
                    # We want "Correct Answer: **Foo**. Explanation..."
                    parts = expl_text.split('**.')
                    if len(parts) > 1:
                        post_answer = parts[1].strip()
                        if len(post_answer) < 5:
                           is_effectively_blank = True
                    else:
                        # Maybe it ends with just . 
                        if expl_text.strip().endswith('**.'):
                            is_effectively_blank = True
                            
                if is_effectively_blank:
                    print(f"BLANK FOUND near Answer {ans_char}: '{expl_text}'")
                    blanks += 1
                
                count += 1
                
            print(f"Total Explanations: {count}")
            print(f"Blanks Found: {blanks}\n")
            
        except FileNotFoundError:
            print(f"File not found: {fpath}")

if __name__ == "__main__":
    audit()
