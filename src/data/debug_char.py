import re

MD_FILE = "../../public/Quiz_questions/Volume 3/Volume3_Basic_Level_All_Subjects_120Q.md"

with open(MD_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the first occurrence of "Answer:" in Subject 10
sub10_idx = content.find("# SUBJECT 10")
if sub10_idx != -1:
    sub10_content = content[sub10_idx:]
    answer_idx = sub10_content.find("Answer:")
    if answer_idx != -1:
        # Get surrounding chars
        snippet = sub10_content[answer_idx-2:answer_idx+10]
        print(f"Snippet: {snippet}")
        print(f"Repr: {repr(snippet)}")
        print(f"Hex: {snippet.encode('utf-8').hex()}")
    else:
        print("Answer: not found in Sub 10")
else:
    print("Subject 10 not found")
