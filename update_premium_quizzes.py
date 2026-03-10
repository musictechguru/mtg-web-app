import json
import os

file_path = "src/data/course_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

updated_count = 0

for stage in data.get("sections", []):
    if "items" in stage:
        for item in stage["items"]:
            title = item.get("title", "")
            if title.startswith("Practical Quiz "):
                try:
                    # Extract the number from "Practical Quiz XX: ..."
                    quiz_num_str = title.split("Practical Quiz ")[1].split(":")[0]
                    quiz_num = int(quiz_num_str)
                    if 9 <= quiz_num <= 19:
                        print(f"Found {title}, current isPremium: {item.get('isPremium')}")
                        if not item.get("isPremium"):
                            item["isPremium"] = True
                            updated_count += 1
                            print(f"-> Updated to premium.")
                except Exception as e:
                    print(f"Error parsing title {title}: {e}")

if updated_count > 0:
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    print(f"Successfully saved course_data.json with {updated_count} updates.")
else:
    print("No quizzes needed updating.")
