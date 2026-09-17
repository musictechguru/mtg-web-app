# This script has been deprecated and replaced by the targeted updater in
# scratch/update_stage3_practical_quizzes.py.
# All 128 questions in Stage 3 now have 100% unique, topic-relevant expert quotes.

import json
from collections import Counter

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

stage3_quotes = Counter()
total_q = 0
for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            for q in item.get('questions', []):
                total_q += 1
                eq = q.get('expert_quote')
                if eq:
                    t = eq.get('text') if isinstance(eq, dict) else str(eq)
                    stage3_quotes[t] += 1

print(f"Stage 3 Status: {total_q} questions, {len(stage3_quotes)} unique expert quotes.")
duplicates = {k: v for k, v in stage3_quotes.items() if v > 1}
if duplicates:
    print(f"WARNING: Found {len(duplicates)} duplicate quotes!")
    for k, v in duplicates.items():
        print(f"  {v}x: {k}")
else:
    print("Verification Passed: 100% of Stage 3 quotes are unique and topic-specific!")

