import json
import os
import re
import difflib

# Configuration
DATA_FILE = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
IMAGE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg'
EXISTING_IMAGES_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'

STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'is', 'it', 'what', 'how', 'why', 'are',
    'sound', 'audio', 'music', 'digital', 'analog', 'signal', 'noise', 'level', 'picture', 
    'image', 'diagram', 'graph', 'chart', 'plot', 'svg', 'png', 'jpg', 'jpeg', 'frequency',
    'range', 'dynamic', 'recording', 'studio', 'gear'
}

def get_all_images():
    """Recursively finds all images in public/images"""
    images = []
    for root, dirs, files in os.walk(EXISTING_IMAGES_DIR):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg')):
                # Check if it's an auto-generated one (we don't want to match against these)
                if file.startswith('auto_'):
                    continue
                    
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, EXISTING_IMAGES_DIR)
                # Ensure path starts with /images/
                web_path = '/images/' + rel_path
                images.append({
                    'filename': file,
                    'path': web_path,
                    'keywords': extract_keywords(file)
                })
    return images

def extract_keywords(filename):
    """Clean up filename to get keywords for matching."""
    name = os.path.splitext(filename)[0].lower()
    tokens = set(re.sub(r'[^\w\s]', ' ', name).split())
    return tokens - STOP_WORDS

def score_match(question_title, question_content, image_keywords):
    """Scoring mechanism: strict matching."""
    # We focus mostly on the title, as it's the primary subject
    q_title_tokens = set(re.sub(r'[^\w\s]', ' ', question_title.lower()).split()) - STOP_WORDS
    
    # Check for direct title overlap
    overlap = q_title_tokens.intersection(image_keywords)
    
    # If we have specific hardware codes, boost them heavily
    hardware_codes = {'1176', 'la2a', 'la-2a', 'sm58', 'sm57', 'u87', 'u47', 'dbx', 'ssl', 'neumann', 'akg', 'shure'}
    
    q_content_tokens = set(re.sub(r'[^\w\s]', ' ', question_content.lower()).split())
    
    score = 0
    
    # Base score from title overlap
    score += len(overlap) * 2
    
    # Hardware code matching in content
    for code in hardware_codes:
        if code in q_content_tokens and code in image_keywords:
            score += 5 # Strong confidence
            
    return score

def update_quizzes_refinement():
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    all_images = get_all_images()
    replaced_count = 0

    for volume in data.get('volumes', []):
        for part in volume.get('parts', []):
            for topic in part.get('topics', []):
                levels = topic.get('levels', {})
                for level_name, questions in levels.items():
                    for q in questions:
                        current_img_src = None
                        
                        # Find current image src if it exists
                        explanation = q.get('explanation', '')
                        img_match = re.search(r"src='([^']+)'", explanation)
                        if img_match:
                            current_img_src = img_match.group(1)
                        
                        # We want to replace 'auto_' images OR 'Noise gate picture' (cleaning up previous run)
                        # We identify "bad" previous matches by checking if they are the generic 'Noise gate picture' for non-gate questions
                        # or just re-run the logic on everything that isn't a "manually assigned" strict match (hard to know)
                        # SImplest: If it's auto_ OR we just did a pass that might have been messy, let's just re-evaluate everything 
                        # that DOESN'T look like a diagram_*.png (which were original high quality ones).
                        
                        can_update = False
                        if not current_img_src:
                            can_update = True
                        elif 'auto_' in current_img_src:
                            can_update = True
                        elif 'MT Pictures' in current_img_src:
                            # Re-evaluating our recent changes
                            can_update = True
                        
                        if can_update:
                            best_image = None
                            best_score = 0
                            
                            for img in all_images:
                                score = score_match(q['title'], q['content'], img['keywords'])
                                if score > best_score:
                                    best_score = score
                                    best_image = img
                            
                            # Threshold: Require at least a decent match
                            # Score 2 means at least 1 significant title keyword matches (2 points)
                            # or a hardware code matches (5 points).
                            if best_image and best_score >= 2:
                                new_img_tag = f"<div class='explanation-media'><img src='{best_image['path']}' alt='{q['title']}' /></div>"
                                
                                if current_img_src:
                                    # Replace existing tag
                                    q['explanation'] = re.sub(
                                        r"<div class='explanation-media'><img src='[^']+' alt='[^']+' /></div>", 
                                        new_img_tag, 
                                        q['explanation']
                                    )
                                else:
                                    # Append if missing
                                    q['explanation'] += new_img_tag
                                    
                                print(f"Assigned: {q['title']} -> {best_image['filename']} (Score: {best_score})")
                                replaced_count += 1
                            else:
                                # If we can't find a GOOD match, and we currently have a 'bad/messy' MT Picture match,
                                # should we revert to auto?
                                # If the previous run assigned "Noise gate" to "CD Quality", the score now will be 0.
                                # So best_image will be None.
                                # Ideally we revert to auto_*.svg if we destroyed a placeholder with garbage.
                                
                                # Let's regenerate the auto tag if we are stripping a bad match
                                if current_img_src and 'MT Pictures' in current_img_src:
                                    # We are removing a likely bad match.
                                    # Generate auto filename
                                    title_slug = re.sub(r'[^\w\s]', '', q['title']).lower().replace(' ', '_')
                                    filename = f"auto_{title_slug}.svg"
                                    # Check if that file exists (it should from previous step)
                                    # If not, we'd need to recreate it, but it likely exists.
                                    auto_path = f"/images/svg/{filename}"
                                    
                                    new_img_tag = f"<div class='explanation-media'><img src='{auto_path}' alt='{q['title']}' /></div>"
                                    q['explanation'] = re.sub(
                                        r"<div class='explanation-media'><img src='[^']+' alt='[^']+' /></div>", 
                                        new_img_tag, 
                                        q['explanation']
                                    )
                                    print(f"Reverted to Auto: {q['title']} -> {filename}")

    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Refinement complete. Matches updated.")

if __name__ == "__main__":
    update_quizzes_refinement()
