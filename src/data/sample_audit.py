import json
import os
import random

def sample_audit():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    report_lines = []
    report_lines.append("# Final Content Audit Sample")
    report_lines.append("**Method:** Randomly selected 1 question per topic from all 10 Volumes.")
    report_lines.append("")

    for vol in data['volumes']:
        report_lines.append(f"## {vol['title']} ({vol['id']})")
        for part in vol['parts']:
            for topic in part['topics']:
                # Get all questions
                all_qs = []
                for level, qs in topic.get('levels', {}).items():
                    all_qs.extend(qs)
                
                if all_qs:
                    q = random.choice(all_qs)
                    
                    # Answers
                    correct = next((a['text'] for a in q.get('answers', []) if str(a.get('is_true')).lower() == 'yes' or a.get('is_true') is True), "MISSING")
                    
                    # Quote
                    quote = q.get('expert_quote', {})
                    if isinstance(quote, dict):
                         quote_str = f"\"{quote.get('text', '')}\" - {quote.get('author', '')}"
                    else:
                         quote_str = str(quote)

                    # Image
                    img = q.get('explanation_image', {})
                    if isinstance(img, dict):
                        img_str = img.get('src', 'MISSING')
                    else:
                        img_str = str(img)

                    report_lines.append(f"### Topic: {topic['title']}")
                    report_lines.append(f"**Q:** {q.get('content')}")
                    report_lines.append(f"**A:** {correct}")
                    report_lines.append(f"**Exp:** {q.get('expert_explanation')}")
                    report_lines.append(f"**Quote:** {quote_str}")
                    report_lines.append(f"**Img:** `{img_str}`")
                    report_lines.append("---")

    output_path = os.path.join(base_path, 'src/data/content_sample.md')
    with open(output_path, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Sample generated: {output_path}")

if __name__ == "__main__":
    sample_audit()
