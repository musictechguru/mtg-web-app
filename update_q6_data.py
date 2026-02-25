import json
import os
import glob
import shutil

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Find generated images
images_dir = 'public/images/'
base_brain_dir = os.path.expanduser('~/.gemini/antigravity/brain/e734b6b9-b3d2-4d80-bbfd-1441b19b5f3e/')

echo_files = glob.glob(base_brain_dir + 'hq_rev_echo_chamber*.png')
early_files = glob.glob(base_brain_dir + 'hq_rev_early_digital*.png')
gated_files = glob.glob(base_brain_dir + 'hq_rev_gated_digital*.png')
algo_files = glob.glob(base_brain_dir + 'hq_rev_algorithmic*.png')
convo_files = glob.glob(base_brain_dir + 'hq_rev_convolution*.png')

def get_and_copy(files):
    if files:
        f = files[0]
        name = os.path.basename(f)
        dest = os.path.join(images_dir, name)
        shutil.copy(f, dest)
        return "/images/" + name
    return None

img_map = {
    "rev_50": get_and_copy(echo_files),
    "rev_70": get_and_copy(early_files),
    "rev_80": get_and_copy(gated_files),
    "rev_90": get_and_copy(algo_files),
    "rev_00": get_and_copy(convo_files)
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        for q_item in q.get('items', []):
                            i_id = q_item.get('id')
                            if i_id in img_map and img_map[i_id]:
                                # update the img attribute
                                q_item['img'] = img_map[i_id]
                                # also update the explanation string to point to the new image
                                exp = q_item.get('explanation', '')
                                if exp.startswith('<img src='):
                                    # replace the first img tag with the new src
                                    new_img_tag = f'<img src="{img_map[i_id]}" alt="{q_item["text"]}" style="max-width:200px; display:block; margin: 0 auto 15px auto; border-radius:8px;" />'
                                    import re
                                    # split at the first </p> to isolate the image and the rest
                                    exp_rest = re.sub(r'^<img[^>]+>', '', exp)
                                    q_item['explanation'] = new_img_tag + exp_rest
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Q6 HQ images mapped and JSON updated.")
