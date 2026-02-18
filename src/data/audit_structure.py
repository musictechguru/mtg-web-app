import json
import os

def audit_structure():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print(f"Total Volumes: {len(data['volumes'])}")
    print("-" * 40)

    for vol in data['volumes']:
        print(f"VOLUME: {vol.get('id')} - {vol.get('title')}")
        for part in vol.get('parts', []):
            print(f"  PART: {part.get('id')} - {part.get('title')}")
            for topic in part.get('topics', []):
                print(f"    TOPIC: {topic.get('id')} - {topic.get('title')}")
                # Check levels existence
                levels = topic.get('levels', {}).keys()
                print(f"      Levels: {list(levels)}")
        print("-" * 40)

if __name__ == "__main__":
    audit_structure()
