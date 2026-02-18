import json
import os
from collections import Counter

def audit_bad_images():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol_image_usage = {} 

    for vol in data['volumes']:
        vol_title = vol['title']
        if vol_title not in vol_image_usage:
            vol_image_usage[vol_title] = Counter()

        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img = q.get('explanation_image') or q.get('img')
                        if not img: continue
                        if isinstance(img, dict): img = img.get('src')
                        
                        vol_image_usage[vol_title][img] += 1

    print("--- Repeated Images (Threshold > 3) ---")
    candidates = []
    
    # Known good assets we don't want to replace even if repeated (e.g. logos, dividers?)
    # For now, assume anything repeated > 3x in a dictionary volume is a candidate for diversification
    
    for vol, counter in vol_image_usage.items():
        print(f"\n{vol}:")
        found_in_vol = False
        for img, count in counter.most_common():
            if count > 3:
                # Filter out the good ones we just swapped in, if they are repeated correctly
                # But actually, if "diagram_masking_eq_v2.png" is used 10 times, maybe we still want variety?
                # For this pass, let's see everything.
                print(f"  {count}x: {img}")
                candidates.append(img)
                found_in_vol = True
        
        if not found_in_vol:
            print("  (No images used > 3 times)")

    print(f"\nTotal Candidates: {len(set(candidates))}")

if __name__ == "__main__":
    audit_bad_images()
