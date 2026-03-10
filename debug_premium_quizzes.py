import json

file_path = "src/data/course_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for stage in data:
    if "items" in stage:
        for item in stage["items"]:
            title = item.get("title", "")
            if title.startswith("Practical Quiz "):
                print(f"TITLE: {title}")
                try:
                    quiz_num_str = title.split("Practical Quiz ")[1].split(":")[0]
                    quiz_num = int(quiz_num_str)
                    print(f"  -> NUM: {quiz_num}, IS_PREMIUM: {item.get('isPremium')}")
                except Exception as e:
                    print(f"  -> ERROR parsing title: {e}")
