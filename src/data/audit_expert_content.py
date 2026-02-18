import json
import os

def audit_expert_content():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes_generated.json'
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    total_questions = 0
    missing_expert_explanation = []
    missing_image = []
    non_png_images = []
    missing_quote = []
    
    # samples for relevance check
    samples = []

    for volume in data.get('volumes', []):
        vol_id = volume.get('id')
        for part in volume.get('parts', []):
            part_id = part.get('id')
            for topic in part.get('topics', []):
                topic_id = topic.get('id')
                levels = topic.get('levels', {})
                for level, questions in levels.items():
                    for q in questions:
                        total_questions += 1
                        q_id = q.get('id', 'unknown')
                        q_content = q.get('content', '')
                        
                        # 1. Check Expert Explanation Existence
                        expert_explanation = q.get('expert_explanation')
                        if not expert_explanation or len(expert_explanation.strip()) == 0:
                            missing_expert_explanation.append(q_id)
                        
                        # 2. Check Image
                        image = q.get('explanation_image')
                        if not image or not image.get('src'):
                            missing_image.append(q_id)
                        else:
                            src = image.get('src', '')
                            ext = os.path.splitext(src)[1].lower()
                            if ext != '.png':
                                non_png_images.append({'id': q_id, 'src': src})

                        # 3. Check Quote
                        quote = q.get('expert_quote')
                        if not quote or not quote.get('text'):
                            missing_quote.append(q_id)

                        # Collect sample for relevance check (first 5 that have explanation)
                        if expert_explanation and len(samples) < 5:
                            samples.append({
                                'id': q_id,
                                'question': q_content,
                                'explanation': expert_explanation
                            })

    print(f"Total Questions Scanned: {total_questions}")
    print("-" * 30)
    
    print(f"Questions missing Expert Explanation: {len(missing_expert_explanation)}")
    if missing_expert_explanation:
        print(f"IDs (first 10): {missing_expert_explanation[:10]}")
    
    print("-" * 30)
    print(f"Questions missing Explanation Image: {len(missing_image)}")
    if missing_image:
        print(f"IDs (first 10): {missing_image[:10]}")

    print("-" * 30)
    print(f"Questions with Non-PNG Images: {len(non_png_images)}")
    if non_png_images:
        print("Examples (first 10):")
        for item in non_png_images[:10]:
            print(f"  {item['id']}: {item['src']}")
            
    print("-" * 30)
    print(f"Questions missing Expert Quote: {len(missing_quote)}")
    if missing_quote:
        print(f"IDs (first 10): {missing_quote[:10]}")

    print("-" * 30)
    print("Samples for Relevance Check:")
    for sample in samples:
        print(f"\nID: {sample['id']}")
        print(f"Q: {sample['question']}")
        print(f"Exp: {sample['explanation']}")

if __name__ == "__main__":
    audit_expert_content()
