import re
import sys

def test_file(file_path):
    print(f"Testing {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # The regex from generate_quiz_json.py
    regex = r'#+\s*(?:SUBJECT|TOPIC)\s*\d+:\s*(.+)'
    
    subjects = re.split(regex, content, flags=re.IGNORECASE)
    
    print(f"Total parts after split: {len(subjects)}")
    if len(subjects) <= 1:
        print("FAIL: No splits found. Regex did not match any headers.")
        print("First 500 chars of content:")
        print(content[:500])
    else:
        print("SUCCESS: Splits found.")
        print(f"Subject 1 Title: '{subjects[1].strip()}'")

test_file("../../public/Quiz_questions/Volume 6/Volume6_EQ_Stereo_Intermediate_Level_120Q.md")
test_file("../../public/Quiz_questions/Volume 8/Volume8_Mastering_Basic_Level_120Q.md")
