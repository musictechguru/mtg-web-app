import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

stage3 = None
for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        stage3 = sec
        break

total_questions = 0
missing_images = []
missing_quotes = []

if stage3:
    for item in stage3.get('items', []):
        quiz_title = item.get('title', 'Unknown Quiz')
        questions = item.get('questions', [])
        
        for idx, q in enumerate(questions):
            total_questions += 1
            
            # Check Image
            img = q.get('img')
            if not img or str(img).strip() == "":
                missing_images.append({
                    "quiz": quiz_title,
                    "q_num": idx + 1,
                    "q_id": q.get('id', 'Unknown')
                })
                
            # Check Quotes
            quote_text = ""
            if "expert_quote" in q and isinstance(q["expert_quote"], dict):
                quote_text = q["expert_quote"].get("text", "")
            elif "quote" in q:
                quote_text = q["quote"]
                
            if not quote_text or str(quote_text).strip() == "":
                 missing_quotes.append({
                    "quiz": quiz_title,
                    "q_num": idx + 1,
                    "q_id": q.get('id', 'Unknown')
                })

    print(f"Total Practical Quizzes scanned: {len(stage3.get('items', []))}")
    print(f"Total Questions scanned: {total_questions}")
    print(f"Questions missing images: {len(missing_images)}")
    print(f"Questions missing quotes: {len(missing_quotes)}")
    
    with open('stage3_audit.json', 'w') as f:
        json.dump({"missing_images": missing_images, "missing_quotes": missing_quotes}, f, indent=4)
    print("Saved audit to stage3_audit.json")
else:
    print("Could not find Stage 3 in course_data.json")
