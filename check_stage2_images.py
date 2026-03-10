import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

missing_images = []
total_questions = 0

# Stage 2 seems to be the second section in data['sections']
stage2 = None
for sec in data.get('sections', []):
    if "Stage 2" in sec.get('title', ''):
        stage2 = sec
        break

if stage2:
    for item in stage2.get('items', []):
        quiz_title = item.get('title', 'Unknown Quiz')
        questions = item.get('questions', [])
        
        for idx, q in enumerate(questions):
            total_questions += 1
            img = q.get('img')
            
            # The 'img' tag might not exist, or might be empty
            if not img or str(img).strip() == "":
                missing_images.append({
                    "quiz": quiz_title,
                    "question_num": idx + 1,
                    "question_text": q.get('content', '')[:50] + "..." if len(q.get('content', '')) > 50 else q.get('content', ''),
                    "id": q.get('id', 'Unknown')
                })

    print(f"Total Stage 2 quizzes scanned: {len(stage2.get('items', []))}")
    print(f"Total Stage 2 questions scanned: {total_questions}")
    print(f"Total missing images: {len(missing_images)}")

    if missing_images:
        for item in missing_images:
            print(f"- {item['quiz']} -> Q{item['question_num']}: {item['question_text']}")
        
        with open('missing_stage2_images_report.json', 'w') as f:
            json.dump(missing_images, f, indent=4)
        print("\nDetailed report saved to missing_stage2_images_report.json")
    else:
        print("All questions in Stage 2 have images assigned!")
else:
    print("Could not find Stage 2 in course_data.json")
