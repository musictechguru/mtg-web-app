import json
import shutil
import glob
import os

# Find the most recently generated mellotron image
img_files = glob.glob("/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b/tnk_q2_mellotron*.png")
if img_files:
    src_img = img_files[-1]
    dst_img = "public/images/case_studies/tomorrow_never_knows/tnk_q2_mellotron.png"
    os.makedirs(os.path.dirname(dst_img), exist_ok=True)
    shutil.copy(src_img, dst_img)
    print(f"Copied {src_img} to {dst_img}")
else:
    print("Could not find mellotron image")

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
    # Update Q2
    if len(tnk_quiz.get('questions', [])) >= 2:
        tnk_quiz['questions'][1]['img'] = "/images/case_studies/tomorrow_never_knows/tnk_q2_mellotron.png"
        print("Updated course_data.json for Q2 with mellotron image.")
    
    num_questions = len(tnk_quiz.get('questions', []))
    print(f"Total questions in TNK quiz: {num_questions}")
    if num_questions >= 21:
        q21 = tnk_quiz['questions'][20]
        print(f"Q21 details: statement='{q21.get('statement')}', explanation='{q21.get('explanation')}'")
    else:
        print("Question 21 does not exist in the JSON. The array length is", num_questions)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
else:
    print("Could not find Tomorrow Never Knows quiz")
