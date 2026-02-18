import json
import os
import difflib

def find_better_assets():
    json_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    images_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'
    
    # 1. Get all currently used images
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error: {e}")
        return

    used_images = set()
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img = q.get('explanation_image') or q.get('img')
                        if isinstance(img, dict): img = img.get('src')
                        if img: used_images.add(img)

    # 2. Get all available high-quality images (PNG/JPG in root or subdirs)
    available_hq = []
    for root, dirs, files in os.walk(images_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                # We prefer these over SVGs usually if they are "diagrams"
                full_path = os.path.join(root, file)
                rel_path = full_path.replace('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public', '')
                available_hq.append(rel_path)

    # 3. Fuzzy Match
    print("--- Potential Better Asset Swaps ---")
    swaps = {}
    
    for used in used_images:
        if not used.endswith('.svg'): continue # Only looking to upgrade SVGs
        
        used_name = os.path.basename(used).replace('.svg', '').replace('_', ' ').lower()
        
        # Look for match
        best_match = None
        best_score = 0
        
        for hq in available_hq:
            hq_name = os.path.basename(hq).replace('.png', '').replace('.jpg', '').replace('_', ' ').lower()
            
            # Direct containment check is strong signal
            if used_name in hq_name or hq_name in used_name:
                score = difflib.SequenceMatcher(None, used_name, hq_name).ratio()
                if score > best_score:
                    best_score = score
                    best_match = hq
        
        if best_match and best_score > 0.6:
            print(f"Used: {used}")
            print(f"Better?: {best_match} (Score: {best_score:.2f})")
            print("-" * 20)
            swaps[used] = best_match

    # Save swaps for the next script
    with open('suggested_swaps.json', 'w') as f:
        json.dump(swaps, f, indent=4)
        
    print(f"Found {len(swaps)} potential swaps.")

if __name__ == "__main__":
    find_better_assets()
