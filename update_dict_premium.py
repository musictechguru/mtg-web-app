import json

file_path = "src/data/dictionary_quizzes.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

updated_count = 0

if "volumes" in data:
    for vol in data["volumes"]:
        topic_index = 0
        if "parts" in vol:
            for part in vol["parts"]:
                if "topics" in part:
                    for topic in part["topics"]:
                        if topic_index >= 2:
                            if not topic.get("isPremium"):
                                topic["isPremium"] = True
                                updated_count += 1
                        else:
                            # Explicitly set false for the first two
                            if topic.get("isPremium"):
                                topic["isPremium"] = False
                                updated_count += 1
                        topic_index += 1

if updated_count > 0:
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    print(f"Successfully saved {file_path} with {updated_count} updates.")
else:
    print("No topics needed updating.")
