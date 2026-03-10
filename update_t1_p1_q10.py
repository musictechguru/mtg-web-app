import json
import re

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for sec in data.get('sections', []):
    if "Stage 2" in sec.get('title', ''):
        for item in sec.get('items', []):
            if "Topic 1: Fundamentals & Recording (Part 1)" in item.get('title', ''):
                questions = item.get('questions', [])
                if len(questions) >= 10:
                    q10 = questions[9]
                    
                    # Update the image paths
                    new_img = "/images/gen/headroom_10dbfs_meter.png"
                    q10['img'] = new_img
                    
                    explanation = q10.get('explanation', '')
                    # Replace the old image path in the explanation string
                    # <img src="/images/Dictiionary_Quiz_image_Pool/Mic Placement.png"
                    explanation = re.sub(
                        r'<img src="[^"]+"',
                        f'<img src="{new_img}"',
                        explanation
                    )
                    q10['explanation'] = explanation
                    
                    print(f"Updated Q10 image to: {new_img}")
                    break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
    print("Saved course_data.json")
