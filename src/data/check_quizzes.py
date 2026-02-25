import json

with open("/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json") as f:
    data = json.load(f)

for section in data.get("sections", []):
    if "Comparison" in section.get("title", "") or "Stage 4" in section.get("title", ""):
        print("SECTION:", section["title"])
        for item in section.get("items", []):
            if "Comparison" in item.get("title", ""):
                print(f"  Item: {item.get('title', '')}")
                questions = item.get("questions", [])
                print(f"    Total Questions: {len(questions)}")
                if questions:
                    q1 = questions[0]
                    opts = q1.get("answers", []) or q1.get("options", [])
                    print(f"    Q1 Type: {q1.get('type', 'unknown')}")
                    print(f"    Q1 Options length: {len(opts)}")
