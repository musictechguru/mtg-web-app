import json
import shutil
import glob
import os

img_files = glob.glob("/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b/tnk_q12_tanpura*.png")
if img_files:
    src_img = img_files[-1]
    dst_img = "public/images/case_studies/tomorrow_never_knows/tnk_q12_tanpura.png"
    os.makedirs(os.path.dirname(dst_img), exist_ok=True)
    shutil.copy(src_img, dst_img)
    print(f"Copied {src_img} to {dst_img}")
else:
    print("Could not find tanpura image")
    exit(1)

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

tnk_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if quiz.get('title') == "'Tomorrow Never Knows' - Music Technology Analysis":
                tnk_quiz = quiz
                break

if tnk_quiz:
    if len(tnk_quiz.get('questions', [])) >= 12:
        tnk_quiz['questions'][11]['img'] = "/images/case_studies/tomorrow_never_knows/tnk_q12_tanpura.png"
        print("Updated course_data.json for Q12 with tanpura image.")

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
else:
    print("Could not find Tomorrow Never Knows quiz")
