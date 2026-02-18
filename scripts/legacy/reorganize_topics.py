#!/usr/bin/env python3
"""
Script to:
1. Rename "Stage 3: Practical Activities" to "Stage 3: Practical Topic Quizzes"
2. Rename the section containing comparisons to "Stage 4: Comparison Quizzes"
3. Move Topics 11, 21, 22, 24 from Stage 4 to Stage 3
4. Handle duplicate Stage 3 sections
"""

import json

# Read and parse the JSON file
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find all Stage 3 sections and the comparison section
stage3_sections = []
comparison_section = None

for i, section in enumerate(data['sections']):
    title = section.get('title', '')
    if title == 'Stage 3: Practical Activities':
        stage3_sections.append((i, section))
    # The comparison section is the one with "items" that contains comparison quizzes
    elif 'items' in section and any('Comparison' in item.get('title', '') for item in section.get('items', [])):
        comparison_section = (i, section)

print(f"Found {len(stage3_sections)} Stage 3 sections")
print(f"Found comparison section: {comparison_section is not None}")

# Merge Stage 3 sections if there are duplicates
if len(stage3_sections) > 1:
    print(f"Merging {len(stage3_sections)} Stage 3 sections...")
    # Keep the first one, merge items from others
    main_stage3_idx, main_stage3 = stage3_sections[0]
    for idx, stage3 in stage3_sections[1:]:
        main_stage3['items'].extend(stage3['items'])
        # Mark for removal
        data['sections'][idx] = None
    
    # Remove None entries
    data['sections'] = [s for s in data['sections'] if s is not None]
    print(f"Merged into single Stage 3 with {len(main_stage3['items'])} items")
    
    # Update our reference
    stage3 = main_stage3
else:
    _, stage3 = stage3_sections[0]

# Rename Stage 3
stage3['title'] = 'Stage 3: Practical Topic Quizzes'
print("Renamed Stage 3 to 'Stage 3: Practical Topic Quizzes'")

# Rename and process comparison section
if comparison_section:
    comp_idx, comp_section = comparison_section
    comp_section['title'] = 'Stage 4: Comparison Quizzes'
    print("Renamed comparison section to 'Stage 4: Comparison Quizzes'")
    
    # Move topics from Stage 4 to Stage 3
    topics_to_move = []
    remaining_items = []
    
    for item in comp_section['items']:
        item_id = item.get('id', '')
        if item_id in ['quiz-topic-11', 'quiz-topic-21', 'quiz-topic-22', 'quiz-topic-24']:
            topics_to_move.append(item)
            print(f"Moving: {item.get('title', 'Unknown')}")
        else:
            remaining_items.append(item)
    
    # Add topics to Stage 3
    stage3['items'].extend(topics_to_move)
    
    # Update Stage 4
    comp_section['items'] = remaining_items
    
    print(f"\nMoved {len(topics_to_move)} topics to Stage 3")
    print(f"Stage 3 now has {len(stage3['items'])} items")
    print(f"Stage 4 now has {len(comp_section['items'])} items")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("\nSuccess! File updated.")
