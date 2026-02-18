import json

try:
    with open('dictionary_quizzes_generated.json', 'r') as f:
        data = json.load(f)

    print(f"{'Volume':<40} | {'Level':<15} | {'Count'}")
    print("-" * 70)

    for vol in data['volumes']:
        print(f"{vol['title']:<40}")
        
        # Aggregate counts across all topics in the single part
        level_counts = {}
        if vol['parts']:
            for topic in vol['parts'][0]['topics']:
                for level, questions in topic['levels'].items():
                    level_counts[level] = level_counts.get(level, 0) + len(questions)
        
        for level in sorted(level_counts.keys()):
            print(f"{'':<40} | {level:<15} | {level_counts[level]}")
        print("-" * 70)

except Exception as e:
    print(f"Error: {e}")
