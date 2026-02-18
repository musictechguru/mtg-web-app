import json
import os
import statistics

def audit_answer_lengths():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    bias_count_1_5 = 0
    bias_count_2_0 = 0
    total_questions = 0
    
    flagged_questions = []

    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        total_questions += 1
                        
                        # Find correct answer
                        correct_ans = next((a for a in q.get('answers', []) if str(a.get('is_true')).lower() == 'yes' or a.get('is_true') is True), None)
                        
                        if not correct_ans:
                            continue

                        correct_len = len(correct_ans['text'])
                        
                        # Get distractor lengths
                        distractor_lens = [len(a['text']) for a in q.get('answers', []) if a != correct_ans]
                        
                        if not distractor_lens:
                            continue
                            
                        avg_dist_len = statistics.mean(distractor_lens)
                        
                        # Check for bias
                        ratio = correct_len / avg_dist_len if avg_dist_len > 0 else 0
                        
                        if ratio > 1.5:
                            bias_count_1_5 += 1
                            if ratio > 2.0:
                                bias_count_2_0 += 1
                                flagged_questions.append({
                                    "vol": vol['title'],
                                    "topic": topic['title'],
                                    "q": q['content'],
                                    "correct": correct_ans['text'],
                                    "avg_dist": avg_dist_len,
                                    "ratio": round(ratio, 2)
                                })

    print(f"Total Questions Analyzed: {total_questions}")
    print(f"Questions with Correct Answer > 1.5x longer than distractors: {bias_count_1_5} ({round(bias_count_1_5/total_questions*100, 1)}%)")
    print(f"Questions with Correct Answer > 2.0x longer than distractors: {bias_count_2_0} ({round(bias_count_2_0/total_questions*100, 1)}%)")
    print("\n--- Top 20 Worst Offenders (Most Obvious Length Cues) ---")
    
    # Sort by ratio descending
    flagged_questions.sort(key=lambda x: x['ratio'], reverse=True)
    
    for item in flagged_questions[:20]:
        print(f"\n[{item['vol']} - {item['topic']}]")
        print(f"Q: {item['q']}")
        print(f"Correct ({len(item['correct'])} chars): {item['correct']}")
        print(f"Avg Distractor Length: {round(item['avg_dist'], 1)} chars")
        print(f"Ratio: {item['ratio']}x")

if __name__ == "__main__":
    audit_answer_lengths()
