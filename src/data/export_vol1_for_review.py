import json
import os

def export_vol1():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1:
        print("Volume 1 not found")
        return

    report_lines = []
    report_lines.append("# Volume 1 Content Review")
    report_lines.append(f"**Goal:** Audit for Tone, Relevance, and Specialist Accuracy.")
    report_lines.append("")

    for part in vol1['parts']:
        report_lines.append(f"## Part: {part['title']}")
        for topic in part['topics']:
            report_lines.append(f"### Topic: {topic['title']}")
            
            # Check Basic Level
            for i, q in enumerate(topic['levels']['basic']):
                report_lines.append(f"#### Q{i+1}: {q.get('content', 'No Content')}")
                
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

    output_path = os.path.join(base_path, 'src/data/vol1_content_review.md')
    with open(output_path, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Export complete. Review file saved to {output_path}")

if __name__ == "__main__":
    export_vol1()
