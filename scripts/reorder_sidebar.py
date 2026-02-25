import json
import re
import os

filepath = 'src/data/course_data.json'

with open(filepath, 'r') as f:
    data = json.load(f)

sections = data.get('sections', [])

stage1 = sections[0]
stage2_orig = sections[1]
stage3_orig = sections[2]
case_studies = sections[3]
mock_exams = sections[4]
historical = sections[5]

new_sections = []

# --- Stage 1 ---
new_sections.append(stage1)

# --- Stage 2 & 3 ---
stage2_items = []
stage3_items = []

target_stage3_topics = ['11', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']

for item in stage2_orig.get('items', []):
    title = item.get('title', '')
    match = re.search(r'Topic (\d+):', title)
    if match:
        topic_num = int(match.group(1))
        if 1 <= topic_num <= 10:
            stage2_items.append(item)
        elif str(topic_num) in target_stage3_topics:
            item['title'] = title.replace(f'Topic {topic_num}:', f'Practical Quiz {topic_num}:')
            stage3_items.append(item)
        else:
            # Drop topics that don't match 1-10 or the custom ones (if any)
            pass

new_sections.append({
    "title": "Stage 2: Topic Mastery Quizzes",
    "description": stage2_orig.get('description', ''),
    "items": stage2_items
})

new_sections.append({
    "title": "Stage 3: Interactive Quizzes",
    "description": "Interactive and practical quizzes for applying knowledge.",
    "items": stage3_items
})

# --- Stage 4: Comparison Quizzes ---
stage4_items = []
comp_counter = 1
for item in stage3_orig.get('items', []):
    title = item.get('title', '')
    if 'Activity' in title:
        continue
    if 'Comparison' in title:
        parts = title.split(':', 1)
        if len(parts) > 1:
            name_part = parts[1].strip()
            item['title'] = f"Comparison {comp_counter}: {name_part}"
            stage4_items.append(item)
            comp_counter += 1

new_sections.append({
    "title": "Stage 4: Comparison Quizzes",
    "description": "Compare and contrast different tracks.",
    "items": stage4_items
})

# --- Stage 5: Case Studies ---
case_studies['title'] = "Stage 5: Case Studies"
new_sections.append(case_studies)

# --- Stage 6: Historical Music Tech ---
historical['title'] = "Stage 6: Historical Music Tech"
new_sections.append(historical)

# --- Stage 7: Component 3 Mock Exams ---
# --- Stage 8: Component 4 Mock Exam ---
stage7_items = []
stage8_items = []

for item in mock_exams.get('items', []):
    title = item.get('title', '')
    if "Mock Exam 1" in title:
        continue
    if "Component 3" in title:
        stage7_items.append(item)
    elif "Component 4" in title or "EDM & Production" in title:
        stage8_items.append(item)

new_sections.append({
    "title": "Stage 7: Component 3 Mock Exams",
    "description": "Practice mock exams focusing on Component 3.",
    "items": stage7_items
})

new_sections.append({
    "title": "Stage 8: Component 4 Mock Exam",
    "description": "Practice mock exam focusing on Component 4.",
    "items": stage8_items
})

data['sections'] = new_sections

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Course data updated successfully!")
