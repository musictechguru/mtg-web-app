import json
from collections import Counter

def audit_remaining():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error: {e}")
        return

    img_counts = Counter()
    missing_count = 0
    
    # 1. Count usage
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img = q.get('explanation_image') or q.get('img')
                        if not img:
                            missing_count += 1
                            continue
                        
                        src = img
                        if isinstance(img, dict): src = img.get('src')
                        
                        img_counts[src] += 1

    # 2. Analyze
    print(f"Total Missing Images: {missing_count}")
    print("\n--- Potentially Generic / Overused Images (>3 uses) ---")
    
    # We want to filter out known "good" generics if possible, or just list them to see.
    # High usage isn't bad if it's "sine_wave.svg" used for 10 sine wave questions.
    # But "waveform.svg" used for 50 diff things is bad.
    
    sorted_imgs = img_counts.most_common()
    for img, count in sorted_imgs:
        if count > 3:
            print(f"{count}x: {img}")

    print("\n--- Explicit Placeholders ---")
    for img, count in sorted_imgs:
        if "placeholder" in str(img).lower() or "generic" in str(img).lower():
            print(f"{count}x: {img}")

if __name__ == "__main__":
    audit_remaining()
