#!/usr/bin/env python3
"""
Script to move Topics 11, 21, 22, 24 from Stage 4 to Stage 3 in course_data.json
Uses JSON parsing for safety
"""

import json

# Read and parse the JSON file
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find Stage 3 and Stage 4
stage3 = None
stage4 = None

for section in data['sections']:
    if section.get('title') == 'Stage 3: Practical Topic Quizzes':
        stage3 = section
    elif section.get('title') == 'Stage 4: Comparison Quizzes':
        stage4 = section

if not stage3 or not stage4:
    print("ERROR: Could not find Stage 3 or Stage 4")
    exit(1)

print(f"Found Stage 3 with {len(stage3['items'])} items")
print(f"Found Stage 4 with {len(stage4['items'])} items")

# Find and extract topics from Stage 4
topics_to_move = []
remaining_items = []

for item in stage4['items']:
    item_id = item.get('id', '')
    if item_id in ['quiz-topic-11', 'quiz-topic-21', 'quiz-topic-22', 'quiz-topic-24']:
        topics_to_move.append(item)
        print(f"Extracting: {item.get('title', 'Unknown')}")
    else:
        remaining_items.append(item)

print(f"\nMoving {len(topics_to_move)} topics")
print(f"Remaining in Stage 4: {len(remaining_items)} items")

# Add topics to Stage 3
stage3['items'].extend(topics_to_move)

# Update Stage 4
stage4['items'] = remaining_items

print(f"\nStage 3 now has {len(stage3['items'])} items")
print(f"Stage 4 now has {len(stage4['items'])} items")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("\nTopics moved successfully!")
