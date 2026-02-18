
import json

try:
    with open('src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    print(f"Total Volumes: {len(data['volumes'])}")

    for vol in data['volumes']:
        print(f"\n[{vol['id']}] {vol['title']}")
        if 'parts' in vol:
            for part in vol['parts']:
                # print(f"  Part: {part['title']}")
                if 'topics' in part:
                    for idx, topic in enumerate(part['topics']):
                        print(f"    Topic {idx + 1}: {topic['title']} (ID: {topic['id']})")
        elif 'topics' in vol: # Handle volumes without parts if any
            for idx, topic in enumerate(vol['topics']):
                print(f"    Topic {idx + 1}: {topic['title']} (ID: {topic['id']})")

except Exception as e:
    print(f"Error: {e}")
