import json
import shutil
import glob
import os
import re

# 1. Handle Q21 Tape Loop Image
img_files = glob.glob("/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b/tnk_q21_tape_loop*.png")
dst_img = "public/images/case_studies/tomorrow_never_knows/tnk_q21_tape_loop.png"
if img_files:
    src_img = img_files[-1]
    os.makedirs(os.path.dirname(dst_img), exist_ok=True)
    shutil.copy(src_img, dst_img)
    print(f"Copied {src_img} to {dst_img}")
else:
    print("Could not find tape loop image for Q21")

# 2. Update JSON
filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Find TNK quiz
tnk_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if quiz.get('title') == "'Tomorrow Never Knows' - Music Technology Analysis":
                tnk_quiz = quiz
                break

if tnk_quiz:
    # Remove SVGs from ALL explanations
    count = 0
    for q in tnk_quiz.get('questions', []):
        if 'explanation' in q and q['explanation']:
            # Using regex to remove SVG tags and their contents robustly
            original = q['explanation']
            # Find everything between <svg and </svg> including the tags
            pattern = re.compile(r'<svg.*?</svg>', re.DOTALL)
            cleaned = re.sub(pattern, '', original)
            if cleaned != original:
                q['explanation'] = cleaned
                count += 1
    print(f"Removed SVGs from {count} questions.")

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
else:
    print("Could not find Tomorrow Never Knows quiz")
