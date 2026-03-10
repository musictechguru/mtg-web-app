import json
import shutil
import glob
import os

os.makedirs("public/images/case_studies/billie_jean", exist_ok=True)

image_keys = [
    "convolution", "disco_kit", "rb_guitar"
]

artifacts_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Billie Jean'" in quiz.get('title', ''):
                qs = quiz.get('questions', [])
                for idx, key in enumerate(image_keys):
                    q_num = idx + 18
                    files = glob.glob(f"{artifacts_dir}/billie_jean_q{q_num}_{key}_*.png")
                    if files:
                        latest_file = sorted(files)[-1]
                        dest_filename = f"billie_jean_q{q_num}_{key}.png"
                        dest_path = f"public/images/case_studies/billie_jean/{dest_filename}"
                        shutil.copy(latest_file, dest_path)
                        img_path = f"/images/case_studies/billie_jean/{dest_filename}"
                        if len(qs) > q_num - 1:
                            qs[q_num - 1]['img'] = img_path
                            print(f"Updated Q{q_num} Image path: {img_path}")
                    else:
                        print(f"Warning: No image found for Q{q_num}")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
print("Finished injecting last 3 Billie Jean images.")
