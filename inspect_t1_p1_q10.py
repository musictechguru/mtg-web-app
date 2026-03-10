import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Stage 2 is "stage2"
stage2 = None
for sec in data.get('sections', []):
    if "Stage 2" in sec.get('title', ''):
        stage2 = sec
        break

if stage2:
    for item in stage2.get('items', []):
        if "Topic 1: Fundamentals & Recording (Part 1)" in item.get('title', ''):
            questions = item.get('questions', [])
            if len(questions) >= 10:
                q10 = questions[9]
                print(json.dumps(q10, indent=4))
            else:
                print("Quiz does not have 10 questions.")
            break
