import json

with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find the section we just added
c4_section = next(s for s in data['sections'] if s['title'] == "Component 4: Producing and Analysing")

# Add IDs
c4_section['items'][0]['id'] = 'c4_sidechain_lesson'
c4_section['items'][1]['id'] = 'c4_sidechain_task'
c4_section['items'][2]['id'] = 'c4_sidechain_quiz'

with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Added IDs to Component 4 items")
