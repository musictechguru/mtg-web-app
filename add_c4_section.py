import json

# Read the existing course data
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Read the sidechain example
with open('src/data/c4_sidechain_example.json', 'r') as f:
    c4_items = json.load(f)

# Create the new Component 4 section
new_section = {
    "title": "Component 4: Producing and Analysing",
    "items": c4_items
}

# Add it to the sections
data['sections'].append(new_section)

# Write it back
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Added Component 4 section to course_data.json")
