import json
import os
import glob

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Find the exact filenames generated in public/images
images_dir = 'public/images/'
preamp_file = os.path.basename(glob.glob(images_dir + 'hq_dist_console_preamp*.png')[0])
fuzz_file = os.path.basename(glob.glob(images_dir + 'hq_dist_fuzz_pedal*.png')[0])
marshall_file = os.path.basename(glob.glob(images_dir + 'hq_dist_marshall_stack*.png')[0])
overdrive_file = os.path.basename(glob.glob(images_dir + 'hq_dist_overdrive_pedal*.png')[0])
modeler_file = os.path.basename(glob.glob(images_dir + 'hq_dist_digital_modeler*.png')[0])

hq_map = {
    "dist_50": "/images/" + preamp_file,
    "dist_60": "/images/" + fuzz_file,
    "dist_70": "/images/" + marshall_file,
    "dist_80": "/images/" + overdrive_file,
    "dist_90": "/images/" + modeler_file
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        for q_item in q.get('items', []):
                            i_id = q_item.get('id')
                            if i_id in hq_map:
                                q_item['img'] = hq_map[i_id]
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Q3 HQ images correctly mapped.")
