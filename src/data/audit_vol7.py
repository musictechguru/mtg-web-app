import json
import os

def audit_vol7():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol7'), None)
    if not vol:
        print("Volume 7 not found")
        return

    report_lines = []
    report_lines.append("# Audit Report: Volume 7 Content")
    report_lines.append(f"Base Path: {base_path}")
    report_lines.append("")

    total_questions = 0
    issues_found = 0

    for part in vol['parts']:
        report_lines.append(f"## Part: {part['title']}")
        for topic in part['topics']:
            topic_issues = []
            
            # Check All Levels
            for level_name, questions in topic.get('levels', {}).items():
                for i, q in enumerate(questions):
                    total_questions += 1
                    q_id = f"{topic['id']}_{level_name}_q{i+1}"
                    q_text = q.get('content', 'No Content')[:50] + "..."
                    
                    failures = []
                    
                    # 1. Check Answers
                    answers = q.get('answers', [])
                    if len(answers) < 2:
                        failures.append(f"Fewer than 2 answers ({len(answers)})")
                    
                    # 2. Check Expert Explanation
                    explanation = q.get('expert_explanation', '')
                    if not explanation or len(explanation) < 10:
                        failures.append("Missing or too short expert explanation")
                    
                    # 3. Check Image
                    image_data = q.get('explanation_image') or q.get('img')
                    if not image_data:
                        failures.append("Missing image")
                    else:
                        # Check file existence
                        src = image_data.get('src', '') if isinstance(image_data, dict) else image_data
                        if src.startswith('/'):
                            full_path = os.path.join(base_path, 'public', src.lstrip('/'))
                            if not os.path.exists(full_path):
                                failures.append(f"Image file not found: {src}")
                        else:
                             failures.append(f"Invalid image path format: {src}")

                    # 4. Check Quote
                    quote = q.get('expert_quote')
                    if not quote:
                        failures.append("Missing expert quote")
                    elif isinstance(quote, dict):
                         if not quote.get('text') or not quote.get('author'):
                             failures.append("Incomplete quote data")

                    if failures:
                        topic_issues.append(f"- **{level_name.upper()} Q{i+1}** ({q_text}): {', '.join(failures)}")
                        issues_found += 1

            if topic_issues:
                report_lines.append(f"### Topic: {topic['title']} ({topic['id']})")
                report_lines.extend(topic_issues)

    report_lines.append("")
    report_lines.append(f"**Total Questions Checked:** {total_questions}")
    report_lines.append(f"**Total Questions with Issues:** {issues_found}")

    output_path = os.path.join(base_path, 'src/data/audit_report_vol7.md')
    with open(output_path, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Audit complete. Report saved to {output_path}")
    print(f"Found {issues_found} issues out of {total_questions} questions.")

if __name__ == "__main__":
    audit_vol7()
