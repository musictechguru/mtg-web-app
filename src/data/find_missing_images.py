import json
import re

def find_missing_images(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    missing_images = []

    for volume in data.get('volumes', []):
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                levels = topic.get('levels', {})
                for level_name, questions in levels.items():
                    for q in questions:
                        has_image = False
                        
                        # Check for hotspot image_src
                        if q.get('type') == 'hotspot':
                            if q.get('image_src'):
                                has_image = True
                        
                        # Check for img tag in explanation
                        explanation = q.get('explanation', '')
                        if '<img' in explanation:
                            has_image = True
                        
                        if not has_image:
                            missing_images.append({
                                'id': q.get('id'),
                                'title': q.get('title'),
                                'content': q.get('content'),
                                'topic': topic.get('title'),
                                'level': level_name
                            })

    return missing_images

if __name__ == "__main__":
    missing = find_missing_images('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json')
    print(f"Found {len(missing)} questions missing images.")
    # Print first 20 as sample
    for m in missing[:20]:
        print(f"[{m['topic']} - {m['level']}] {m['title']}: {m['content']}")
        
    # Also save to a file for review
    with open('missing_images_report.json', 'w') as f:
        json.dump(missing, f, indent=2)
