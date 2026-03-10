import json
import shutil
import glob
import os

images_map = {
    '1': "topic1_p2_q1_harmonics",
    '4': "topic1_p2_q4_nyquist",
    '6': "topic1_p2_q6_preamp",
    '7': "topic1_p2_q7_haas",
    '8': "topic1_p2_q8_latency"
}

artifacts_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
image_paths = {}

for q_num, key in images_map.items():
    files = glob.glob(f"{artifacts_dir}/{key}_*.png")
    if files:
        latest_file = sorted(files)[-1]
        dest_filename = f"{key}.png"
        dest_path = f"public/images/Dictiionary_Quiz_image_Pool/{dest_filename}"
        shutil.copy(latest_file, dest_path)
        image_paths[q_num] = f"/images/Dictiionary_Quiz_image_Pool/{dest_filename}"
        print(f"Copied image for Q{q_num}")

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        if quiz.get('title') == "Topic 1: Fundamentals & Recording (Part 2)":
            for i, q in enumerate(quiz.get('questions', [])):
                q_num = str(i + 1)
                if q_num in image_paths:
                    q['img'] = image_paths[q_num]

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Injected T1P2 images successfully.")
