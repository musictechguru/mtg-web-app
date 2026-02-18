#!/usr/bin/env python3
"""
Final script to move Topics 11, 21, 22, 24 to Stage 3
"""

import json

# Read and parse the JSON file
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find Stage 3
stage3 = None
for section in data['sections']:
    if 'Stage 3' in section.get('title', ''):
        stage3 = section
        break

if not stage3:
    print("ERROR: Could not find Stage 3")
    exit(1)

print(f"Found Stage 3 with {len(stage3['items'])} items")

# Find and move topics from all sections
topics_to_move = []
for section in data['sections']:
    if section == stage3:
        continue  # Skip Stage 3 itself
    
    items_to_keep = []
    for item in section.get('items', []):
        item_id = item.get('id', '')
        if item_id in ['quiz-topic-11', 'quiz-topic-21', 'quiz-topic-22', 'quiz-topic-24']:
            topics_to_move.append(item)
            print(f"Found {item.get('title', 'Unknown')} in section: {section.get('title', 'Untitled')}")
        else:
            items_to_keep.append(item)
    
    section['items'] = items_to_keep

# Add topics to Stage 3
stage3['items'].extend(topics_to_move)

print(f"\nMoved {len(topics_to_move)} topics to Stage 3")
print(f"Stage 3 now has {len(stage3['items'])} items")

# Check for duplicate Topic 26 in Stage 3
topic_26_count = sum(1 for item in stage3['items'] if item.get('id') == 'quiz-topic-26')
if topic_26_count > 1:
    print(f"\nWARNING: Found {topic_26_count} instances of Topic 26 in Stage 3")
    # Keep only the first one
    seen_26 = False
    filtered_items = []
    for item in stage3['items']:
        if item.get('id') == 'quiz-topic-26':
            if not seen_26:
                filtered_items.append(item)
                seen_26 = True
            else:
                print(f"Removing duplicate Topic 26")
        else:
            filtered_items.append(item)
    stage3['items'] = filtered_items
    print(f"After deduplication, Stage 3 has {len(stage3['items'])} items")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("\nSuccess! Topics moved to Stage 3.")
