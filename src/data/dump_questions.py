import json

with open("/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json") as f:
    data = json.load(f)

output = []
for sec in data.get("sections", []):
    if "Comparison" in sec.get("title", ""):
        for item in sec.get("items", []):
            title = item.get("title", "")
            if "Comparison" in title and int(title.split()[1].replace(":", "")) <= 7:
                output.append(f"### {title}")
                if item.get("questions"):
                    q_list = item["questions"]
                    if q_list[0].get("type") == "cloze":
                        output.append(f"CLOZE QUESTION:")
                        output.append("\n".join(q_list[0].get("text", [])))
                        output.append("Options: " + str(q_list[0].get("options", [])))
                        output.append("Answers: " + str(q_list[0].get("answer", [])))
                    else:
                        for i, q in enumerate(q_list):
                            answers = q.get("answers", [])
                            correct = next((a["text"] for a in answers if a.get("is_true") == "yes"), "None")
                            output.append(f"Q{i+1}: {q.get('content')}")
                            output.append(f"   Correct Answer: {correct}")

with open("/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/questions_dump.txt", "w") as f:
    f.write("\n".join(output))
