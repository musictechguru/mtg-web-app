import os
import re

QUIZ_DIR = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions"

def audit_brackets():
    print("Auditing Quiz Questions for bracketed content in options...")
    count = 0
    for root, dirs, files in os.walk(QUIZ_DIR):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    
                for line in lines:
                    strip_line = line.strip()
                    # Check for Option lines: "- A)", "- B)", etc.
                    if re.match(r'^- [A-D]\)', strip_line):
                        # Check for brackets
                        if '(' in strip_line and ')' in strip_line:
                            # Verify if it's just the letter (A) - unlikely as match is A)
                            # We look for textual brackets, e.g. " - A) 44.1kHz (CD)"
                            # We want to exclude cases where the answer itself is a function call like "print()" (unlikely in this context but possible)
                            # Most likely these are explanations.
                            print(f"[FOUND OPTION] {file}: {strip_line}")
                            count += 1
                    
                    # Check for Answer lines
                    if strip_line.startswith("**Answer:"):
                        if '(' in strip_line and ')' in strip_line:
                             print(f"[FOUND ANSWER KEY] {file}: {strip_line}")
                             count += 1
    
    print(f"\nTotal bracketed options found: {count}")

if __name__ == "__main__":
    audit_brackets()
