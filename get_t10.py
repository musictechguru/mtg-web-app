import json

with open("src/data/course_data.json", "r") as f:
    data = json.load(f)

for section in data.get("sections", []):
    for stage in section.get("stages", []):
        for t in stage.get("topics", []):
            if "Topic 10: Equipment (Part 1)" in t.get("title", ""):
                for i, q in enumerate(t.get("questions", [])):
                    print(f"Q{i+1}: {q.get('imagePrompt', 'NO PROMPT')}")
                    print(f"Current Image: {q.get('image', 'NO IMAGE')}")
                    print(f"ID: {q.get('id', 'NO ID')}")
                    print()
