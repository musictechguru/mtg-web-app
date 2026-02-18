import json
import os

def audit_completeness():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    total_questions = 0
    missing_explanation_count = 0
    missing_image_count = 0
    missing_quote_count = 0
    
    failures = []

    volumes = data.get('volumes', [])
    for volume in volumes:
        vol_id = volume.get('id')
        parts = volume.get('parts', [])
        for part in parts:
            part_id = part.get('id')
            topics = part.get('topics', [])
            for topic in topics:
                topic_id = topic.get('id')
                levels = topic.get('levels', {})
                for level_name, questions in levels.items():
                    for q in questions:
                        total_questions += 1
                        q_id = q.get('id', 'unknown_id')
                        q_title = q.get('title', 'Untitled')
                        
                        missing_fields = []
                        
                        # Check Expert Explanation
                        expl = q.get('expert_explanation')
                        if not expl or not isinstance(expl, str) or not expl.strip():
                            missing_fields.append('expert_explanation')
                            missing_explanation_count += 1
                        
                        # Check Image
                        img = q.get('explanation_image')
                        has_image = False
                        if img:
                            if isinstance(img, dict):
                                if img.get('src'):
                                    has_image = True
                            elif isinstance(img, str) and img.strip():
                                has_image = True
                        
                        # Fallback check for old 'img' key if we want to be lenient, 
                        # but user asked for "image" which implies the standard field.
                        # We will strictly check 'explanation_image' based on recent schema,
                        # but if 'img' exists, we might note it. 
                        # Actually, let's stick to checking if *any* valid image field exists.
                        if not has_image:
                             # check 'img' key just in case
                            alt_img = q.get('img')
                            if alt_img and isinstance(alt_img, str) and alt_img.strip():
                                has_image = True # Count as having an image
                            else:
                                missing_fields.append('image')
                                missing_image_count += 1

                        # Check Quote
                        quote = q.get('expert_quote')
                        has_quote = False
                        if quote and isinstance(quote, dict):
                            if quote.get('text') and quote.get('author'):
                                has_quote = True
                        
                        if not has_quote:
                            missing_fields.append('quote')
                            missing_quote_count += 1

                        if missing_fields:
                            failures.append({
                                'id': q_id,
                                'location': f"{vol_id} > {part_id} > {topic_id} > {level_name}",
                                'title': q_title,
                                'missing': missing_fields
                            })

    # Generate Report
    report_lines = []
    report_lines.append("# Dictionary Quiz Completeness Audit")
    report_lines.append(f"**Total Questions:** {total_questions}")
    report_lines.append(f"**Questions with Missing Explanations:** {missing_explanation_count}")
    report_lines.append(f"**Questions with Missing Images:** {missing_image_count}")
    report_lines.append(f"**Questions with Missing Quotes:** {missing_quote_count}")
    report_lines.append(f"**Total Incomplete Questions:** {len(failures)}")
    report_lines.append("")
    
    if failures:
        report_lines.append("## Detailed Failures")
        report_lines.append("| ID | Location | Missing |")
        report_lines.append("|---|---|---|")
        for fail in failures:
            missing_str = ", ".join(fail['missing'])
            report_lines.append(f"| {fail['id']} | {fail['location']} | {missing_str} |")
    else:
        report_lines.append("## All Clear!")
        report_lines.append("Every question has an expert explanation, image, and quote.")

    report_content = "\n".join(report_lines)
    
    output_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/audit_dq_report.md'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report_content)
    
    print(report_content)
    print(f"\nReport saved to: {output_path}")

if __name__ == "__main__":
    audit_completeness()
