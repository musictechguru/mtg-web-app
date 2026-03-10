import json
import shutil
import glob
import os

img_files = glob.glob("/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b/money_q6_pbass_headstock*.png")
if img_files:
    src_img = sorted(img_files)[-1]
    dest = "public/images/case_studies/money/money_q6_pbass_headstock.png"
    shutil.copy(src_img, dest)
    print(f"Copied to {dest}")

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Money'" in quiz.get('title', ''):
                qs = quiz.get('questions', [])
                if len(qs) >= 6:
                    qs[5]['img'] = "/images/case_studies/money/money_q6_pbass_headstock.png"
                    print("Updated Q6 Image path.")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
