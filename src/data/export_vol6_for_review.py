import json
import os

def export_vol6():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol6'), None)
    if not vol:
        print("Volume 6 not found")
        return

    report_lines = []
    report_lines.append("# Volume 6 Content Review")
    report_lines.append(f"**Goal:** Audit for Tone, Relevance, and EQ Accuracy.")
    report_lines.append("")

    for part in vol['parts']:
        report_lines.append(f"## Part: {part['title']}")
        for topic in part['topics']:
            report_lines.append(f"### Topic: {topic['title']}")
            
            # Check All Levels
            for level_name, questions in topic.get('levels', {}).items():
                for i, q in enumerate(questions):
                    report_lines.append(f"#### {level_name.upper()} Q{i+1}: {q.get('content', 'No Content')}")
                    
                    # Answers
                    answers = q.get('answers', [])
                    correct_answer = next((a['text'] for a in answers if a.get('is_true') == 'yes' or a.get('is_true') is True), "N/A")
                    report_lines.append(f"- **Correct Answer:** {correct_answer}")
                    
                    # Explanation
                    explanation = q.get('expert_explanation', 'MISSING')
                    report_lines.append(f"- **Expert Explanation:** {explanation}")
                    
                    # Quote
                    quote = q.get('expert_quote')
                    quote_str = "MISSING"
                    if isinstance(quote, dict):
                        quote_str = f"\"{quote.get('text', '')}\" - {quote.get('author', '')}"
                    report_lines.append(f"- **Quote:** {quote_str}")
                    
                    # Image
                    image_data = q.get('explanation_image') or q.get('img')
                    img_str = "MISSING"
                    if image_data:
                        if isinstance(image_data, dict):
                             img_str = f"[{image_data.get('alt', 'Image')}]({image_data.get('src', '')})"
                        else:
                             img_str = f"[Image]({image_data})"
                    report_lines.append(f"- **Image:** {img_str}")
                    report_lines.append("")
                    report_lines.append("---")
                    report_lines.append("")

    output_path = os.path.join(base_path, 'src/data/vol6_content_review.md')
    with open(output_path, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Export complete. Review file saved to {output_path}")

if __name__ == "__main__":
    export_vol6()
