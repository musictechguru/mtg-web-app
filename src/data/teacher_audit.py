import json
import os
import random

def teacher_audit():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    report_lines = []
    report_lines.append("# Teacher & Quiz Master Audit Report")
    report_lines.append("**Objective:** Review questions for A-Level suitability, distractor quality, and pedagogical value.")
    report_lines.append("")

    for vol in data['volumes']:
        report_lines.append(f"## {vol['title']}")
        # Pick 3 random topics per volume to save space but get a spread
        topics = random.sample(vol['parts'][0]['topics'], min(3, len(vol['parts'][0]['topics'])))
        
        for topic in topics:
            report_lines.append(f"### Topic: {topic['title']}")
            # Pick 1 random question
            all_qs = []
            for level, qs in topic.get('levels', {}).items():
                all_qs.extend(qs)
            
            if all_qs:
                q = random.choice(all_qs)
                
                report_lines.append(f"**Q:** {q.get('content')}")
                
                # List all answers (marking the correct one)
                for a in q.get('answers', []):
                    marker = "(CORRECT)" if (str(a.get('is_true')).lower() == 'yes' or a.get('is_true') is True) else "   "
                    report_lines.append(f"- {marker} {a['text']}")
                
                report_lines.append(f"**Explanation:** {q.get('expert_explanation')}")
                report_lines.append("---")

    output_path = os.path.join(base_path, 'src/data/teacher_review.md')
    with open(output_path, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Teacher review generated: {output_path}")

if __name__ == "__main__":
    teacher_audit()
