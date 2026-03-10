import json

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

print("Checking image values in dictionary_quizzes.json...")
image_types = set()
for section in data.get('sections', []):
    for quiz in section.get('items', []):
        for q in quiz.get('questions', []):
            img = q.get('img')
            if img:
                if 'placeholder' in img:
                    image_types.add("Placeholder")
                elif img.endswith('.svg'):
                    image_types.add("SVG")
                elif img.startswith('/images/'):
                    image_types.add(f"Local Image: {img.split('/')[-1][:10]}...")
                else:
                    image_types.add(f"Other: {img[:20]}...")

print(f"Found image types: {image_types}")
