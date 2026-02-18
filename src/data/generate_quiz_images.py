import json
import os
import re
import difflib
import random

# Configuration
DATA_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
IMAGE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg'
EXISTING_IMAGES_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'

# Ensure SVG directory exists
os.makedirs(IMAGE_DIR, exist_ok=True)

def get_existing_images():
    images = []
    for root, dirs, files in os.walk(EXISTING_IMAGES_DIR):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg')):
                # Store relative path from public/images
                rel_path = os.path.relpath(os.path.join(root, file), EXISTING_IMAGES_DIR)
                images.append('/images/' + rel_path)
    return images

def generate_svg(title, filename):
    """Generates a simple placeholder SVG with the title text."""
    colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
    bg_color = random.choice(colors)
    
    # Simple abstract shapes
    shapes = ""
    for _ in range(5):
        cx = random.randint(10, 390)
        cy = random.randint(10, 290)
        r = random.randint(5, 50)
        opacity = random.uniform(0.1, 0.4)
        shapes += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="white" fill-opacity="{opacity}" />'

    svg_content = f'''<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="{bg_color}" />
    {shapes}
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">{title}</text>
</svg>'''
    
    filepath = os.path.join(IMAGE_DIR, filename)
    with open(filepath, 'w') as f:
        f.write(svg_content)
    
    return f'/images/svg/{filename}'

def find_best_match(query, choices):
    """Finds the best matching image filename for a given query string."""
    matches = difflib.get_close_matches(query, choices, n=1, cutoff=0.6)
    return matches[0] if matches else None

def update_quizzes():
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    existing_images_paths = get_existing_images()
    # Create a simplified list of filenames for matching
    image_filenames = [os.path.basename(p) for p in existing_images_paths]
    
    updates_count = 0
    generated_count = 0

    for volume in data.get('volumes', []):
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                levels = topic.get('levels', {})
                for level_name, questions in levels.items():
                    for q in questions:
                        has_image = False
                        
                        # Check if it already has an image
                        if q.get('type') == 'hotspot' and q.get('image_src'):
                            has_image = True
                        if '<img' in q.get('explanation', ''):
                            has_image = True
                        
                        if not has_image:
                            # Try to find a match
                            title_slug = re.sub(r'[^\w\s]', '', q['title']).lower().replace(' ', '_')
                            content_slug = re.sub(r'[^\w\s]', '', q['content'][:30]).lower().replace(' ', '_')
                            
                            # Try matching strictly on specific keywords or title
                            best_match_filename = find_best_match(title_slug, image_filenames)
                            
                            if best_match_filename:
                                # Find the full path for this filename
                                for path in existing_images_paths:
                                    if os.path.basename(path) == best_match_filename:
                                        image_path = path
                                        break
                                print(f"Matched: {q['title']} -> {image_path}")
                            else:
                                # Generate new SVG
                                filename = f"auto_{title_slug}.svg"
                                image_path = generate_svg(q['title'], filename)
                                generated_count += 1
                                print(f"Generated: {q['title']} -> {image_path}")

                            # Update explanation
                            if q.get('explanation'):
                                q['explanation'] += f"<div class='explanation-media'><img src='{image_path}' alt='{q['title']}' /></div>"
                            else:
                                q['explanation'] = f"<div class='explanation-media'><img src='{image_path}' alt='{q['title']}' /></div>"
                            
                            updates_count += 1

    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Update complete. {updates_count} questions updated ({generated_count} generated, {updates_count - generated_count} matched).")

if __name__ == "__main__":
    update_quizzes()
