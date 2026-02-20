import json

with open("src/data/course_data.json", "r") as f: 
    data = json.load(f)

for s in data["sections"]:
    if s["title"] == "Historical Music Tech Context":
        for quiz in s["items"]:
            print(f"--- {quiz['title']} ---")
            for q in quiz["questions"]:
                print(f"Q: {q['title']} - {q['content']}")
