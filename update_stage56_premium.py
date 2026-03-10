import json

file_path = "src/data/course_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

updated_count = 0

stage_5_targets = [
    "'Money' - Music Technology Analysis",
    "'Billie Jean' - Music Technology Analysis",
    "'Nuthin' but a 'G' Thang' - Music Technology Analysis",
    "'One More Time' - Music Technology Analysis"
]

for stage in data.get("sections", []):
    title = stage.get("title", "")
    
    if "Stage 5" in title:
        if "items" in stage:
            for item in stage["items"]:
                if item.get("title") in stage_5_targets:
                    if not item.get("isPremium"):
                        item["isPremium"] = True
                        updated_count += 1
                        print(f"Updated Stage 5 Quiz: {item['title']}")
                        
    elif "Stage 6" in title:
        if "items" in stage:
            for item in stage["items"]:
                if not item.get("isPremium"):
                    item["isPremium"] = True
                    updated_count += 1
                    print(f"Updated Stage 6 Quiz: {item['title']}")

if updated_count > 0:
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    print(f"Successfully saved {file_path} with {updated_count} updates.")
else:
    print("No quizzes needed updating.")
