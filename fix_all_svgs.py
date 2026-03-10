import json
import re

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

count = 0
for section in data.get('sections', []):
    for quiz in section.get('items', []):
        for q in quiz.get('questions', []):
            if 'explanation' in q:
                original = q['explanation']
                # Remove inline <svg>...</svg>
                clean = re.sub(r'<svg.*?</svg>', '', original, flags=re.DOTALL)
                # Remove markdown images like ![...](...svg)
                clean = re.sub(r'!\[.*?\]\([^)]+\.svg\)', '', clean)
                # Remove HTML img tags pointing to svg: <img src="...svg" ... />
                clean = re.sub(r'<img[^>]+src=["\'][^"\']+\.svg["\'][^>]*>', '', clean)
                if clean != original:
                    q['explanation'] = clean.strip()
                    count += 1
            
            # Also if the main `img` is an SVG, maybe we should leave it or remove it?
            # The prompt says "get rid of svg images". Let's clear main img if it's .svg
            if 'img' in q and q['img'].endswith('.svg'):
                q['img'] = ""
                count += 1

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Removed SVG from {count} locations.")
