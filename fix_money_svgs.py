import json
import re

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Money'" in quiz.get('title', ''):
                for q in quiz.get('questions', []):
                    if 'explanation' in q:
                        # Find and remove any markdown images/SVGs in the explanation, e.g., ![...](<svg...)
                        original_text = q['explanation']
                        # Remove markdown images: ![alt](url)
                        clean_text = re.sub(r'!\[.*?\]\([^)]+\)', '', original_text)
                        clean_text = clean_text.strip()
                        if clean_text != original_text:
                            q['explanation'] = clean_text
                            print("Removed SVG from Money question explanation.")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
