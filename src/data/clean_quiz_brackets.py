import os
import re

QUIZ_DIR = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions"

def clean_brackets():
    print("Cleaning Quiz Questions options...")
    modified_count = 0
    
    for root, dirs, files in os.walk(QUIZ_DIR):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                
                new_lines = []
                file_modified = False
                
                for line in lines:
                    # Target lines like "- A) Some Text (Explanation)"
                    # We want "- A) Some Text"
                    match = re.match(r'^(\s*- [A-D]\) )(.*)', line)
                    if match:
                        prefix = match.group(1)
                        content = match.group(2)
                        
                        # Remove content in parenthesis at the end or middle, usually at the end.
                        # Regex to find (text) and replace with nothing
                        # We use a non-greedy match for content
                        
                        # Strategy: Split by '(' if present
                        if '(' in content and ')' in content:
                            # Use regex to replace parenthetical groups
                            # Assumption: brackets are used for explanation
                            # We replace ` (.*?)` with ``
                            
                            cleaned_content = re.sub(r'\s*\([^)]*\)', '', content).strip()
                            
                            # Safety check: ensure we didn't wipe the whole answer
                            if len(cleaned_content) < 1:
                                # If it became empty, maybe the answer WAS the bracket
                                # e.g. "A) (None)" -> "A) "
                                # In this case, we prefer keeping specific content or the original.
                                # But if the original was "(None)", cleaning gives "".
                                # Let's keep original if clean is empty.
                                print(f"Skipping empty result for: {line.strip()}")
                                new_lines.append(line)
                            else:
                                new_lines.append(f"{prefix}{cleaned_content}\n")
                                file_modified = True
                                modified_count += 1
                        else:
                             new_lines.append(line)
                    
                    elif line.strip().startswith("**Answer:"):
                        # Clean bracketed text from Answer line
                        # Matches "**Answer: B (Expl)**" or "**Answer: B** (Expl)"
                        if '(' in line:
                            cleaned_content = re.sub(r'\s*\([^)]*\)', '', line).strip()
                            new_lines.append(f"{cleaned_content}\n")
                            file_modified = True
                            modified_count += 1
                        else:
                            new_lines.append(line)

                    else:
                        new_lines.append(line)
                
                if file_modified:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.writelines(new_lines)
                    print(f"Updated {file}")

    print(f"\nTotal lines modified: {modified_count}")

if __name__ == "__main__":
    clean_brackets()
