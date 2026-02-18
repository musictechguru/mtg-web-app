import json
import os
import urllib.parse

def audit_images():
    base_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_dir, 'src/data/dictionary_quizzes.json')
    public_dir = os.path.join(base_dir, 'public')

    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    missing = []
    total_refs = 0
    checked_paths = set()

    def check_img(path, context):
        nonlocal total_refs
        if not path: return
        
        total_refs += 1
        
        # Clean path
        clean_path = urllib.parse.urlparse(path).path
        
        # Remove leading slash for join
        if clean_path.startswith('/'):
            rel_path = clean_path[1:]
        else:
            rel_path = clean_path
            
        full_path = os.path.join(public_dir, rel_path)
        
        if not os.path.exists(full_path):
            missing.append(f"{context} -> {path}")
        
        checked_paths.add(full_path)

    print("Starting Image Audit...")
    
    for vol in data['volumes']:
        vol_id = vol['id']
        for part in vol['parts']:
            for topic in part['topics']:
                topic_id = topic['id']
                for level, questions in topic.get('levels', {}).items():
                    for i, q in enumerate(questions):
                        qid = f"{vol_id}::{topic_id}::{level}::Q{i+1}"
                        
                        # Check explanation_image
                        if 'explanation_image' in q:
                            if isinstance(q['explanation_image'], dict):
                                check_img(q['explanation_image'].get('src'), qid + " (Explanation)")
                            elif isinstance(q['explanation_image'], str):
                                check_img(q['explanation_image'], qid + " (Explanation)")
                        
                        # Check img
                        if 'img' in q:
                            check_img(q['img'], qid + " (Question Image)")

    print("-" * 50)
    print(f"Total Image References Checked: {total_refs}")
    print(f"Unique Files Verified: {len(checked_paths)}")
    
    if missing:
        print(f"❌ Found {len(missing)} missing or broken image links:")
        for m in missing[:50]: # Cap output if huge
            print(m)
        if len(missing) > 50:
            print(f"...and {len(missing)-50} more.")
    else:
        print("✅ SUCCESS: All image references point to valid files.")

if __name__ == "__main__":
    audit_images()
