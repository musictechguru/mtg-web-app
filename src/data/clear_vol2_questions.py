import json

TARGET_FILE = 'vol2_complex_quizzes.json'

with open(TARGET_FILE, 'r') as f:
    data = json.load(f)

for part in data.get('parts', []):
    for topic in part.get('topics', []):
        if 'levels' in topic:
            for level in topic['levels']:
                topic['levels'][level] = []

with open(TARGET_FILE, 'w') as f:
    json.dump(data, f, indent=2)

print("Cleared all questions from Volume 2.")
