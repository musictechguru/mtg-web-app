
import json

try:
    with open('src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    # Flatten all topics to find index 27 (0-indexed -> 26 or 1-indexed -> 26)
    all_topics = []
    for vol in data['volumes']:
        if 'parts' in vol:
            for part in vol['parts']:
                if 'topics' in part:
                    all_topics.extend(part['topics'])
        elif 'topics' in vol:
             all_topics.extend(vol['topics'])

    print(f"Total Topics: {len(all_topics)}")
    
    if len(all_topics) > 26:
        t27 = all_topics[26] # 0-indexed 26 is the 27th item
        print(f"Topic #27 (0-indexed): {t27['title']} (ID: {t27['id']}) in Volume {t27['id'].split('_')[0]}")
    
    # Check for "Stage 2" = Volume 2
    # Maybe "Topic 27" is in Volume 2?
    # Volume 2 has topics 13-24. 
    # Volume 3 starts at 25.
    
    # Check "Topic 27" exact title
    # (Unlikely)

    # Check for "Recording Signal Chain" specifically
    found = False
    for t in all_topics:
        if "Signal" in t['title'] and "Chain" in t['title']:
            print(f"Found 'Signal Chain' in title: {t['title']} (ID: {t['id']})")
            found = True
        elif "Signal" in t['title']:
            print(f"Found 'Signal' in title: {t['title']} (ID: {t['id']})")
            found = True

except Exception as e:
    print(f"Error: {e}")
