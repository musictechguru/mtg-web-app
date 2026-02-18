import json
import os
import urllib.parse

def list_missing_images():
    base_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_dir, 'src/data/dictionary_quizzes.json')
    public_dir = os.path.join(base_dir, 'public')

    with open(json_path, 'r') as f:
        data = json.load(f)

    missing = set()

    def check_img(path):
        if not path: return
        clean_path = urllib.parse.urlparse(path).path
        if clean_path.startswith('/'):
            rel_path = clean_path[1:]
        else:
            rel_path = clean_path
        
        full_path = os.path.join(public_dir, rel_path)
        if not os.path.exists(full_path):
            missing.add(clean_path)

    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, questions in topic.get('levels', {}).items():
                    for q in questions:
                        if 'explanation_image' in q:
                            if isinstance(q['explanation_image'], dict):
                                check_img(q['explanation_image'].get('src'))
                            else:
                                check_img(q['explanation_image'])
                        if 'img' in q:
                            check_img(q['img'])

    sorted_missing = sorted(list(missing))
    
    output_path = os.path.join(base_dir, 'src/data/missing_images_list.txt')
    with open(output_path, 'w') as f:
        f.write('\n'.join(sorted_missing))
    
    print(f"Found {len(sorted_missing)} unique missing images.")
    print(f"List saved to {output_path}")

if __name__ == "__main__":
    list_missing_images()
