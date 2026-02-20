import json

quiz_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'
with open(quiz_file, 'r') as f:
    data = json.load(f)

img_path = '/images/Dictiionary_Quiz_image_Pool/history_synth_hq.png'
target_str = "What was the most significant innovation of the first commercially successful portable analog synthesizers in the early 1970s?"

def update_node(node):
    updated = False
    if isinstance(node, dict):
        if node.get('content') == target_str:
            print("Found the target string!")
            node['img'] = img_path
            node['explanation_image'] = {'src': img_path, 'alt': 'Portable Analog Synthesizers'}
            return True
        for k, v in node.items():
            if update_node(v):
                updated = True
    elif isinstance(node, list):
        for item in node:
            if update_node(item):
                updated = True
    return updated

if update_node(data):
    with open(quiz_file, 'w') as f:
        json.dump(data, f, indent=4)
    print("Successfully forcefully updated course_data.json")
else:
    print("Could not find the target question via deep search.")
