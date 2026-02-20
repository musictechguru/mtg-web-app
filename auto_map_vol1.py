import json
import os
import re
from collections import Counter

pool_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/Dictiionary_Quiz_image_Pool'
missing_file = 'missing_vol1.json'

pool_files = [f for f in os.listdir(pool_dir) if not f.startswith('.') and not os.path.isdir(os.path.join(pool_dir, f))]

# Pre-tokenize pool filenames
def tokenize(text):
    text = re.sub(r'\.[a-zA-Z0-9]+$', '', text) # remove ext
    text = re.sub(r'[^a-zA-Z0-9]', ' ', text)
    return set(text.lower().split())

pool_tokens = {f: tokenize(f) for f in pool_files}
# Boost HQ png images by adding a tiny score bonus
def is_hq(f):
    return 0.1 if f.lower().endswith('.png') else 0.0

with open(missing_file, 'r') as f:
    missing_data = json.load(f)

mappings = {}

for q in missing_data:
    text_to_search = f"{q.get('topic', '')} {q.get('content', '')} {q.get('correct_answer', '')} {q.get('expert_explanation', '')}"
    q_tokens = tokenize(text_to_search)
    
    # Also boost if the original missing basename shares words with the new filename
    original_basenames = [m['basename'] for m in q['missing']]
    orig_tokens = set()
    for b in original_basenames:
        orig_tokens.update(tokenize(b))
    
    best_score = -1
    best_match = None
    
    for pf in pool_files:
        p_toks = pool_tokens[pf]
        # Calculate overlap
        overlap = len(p_toks.intersection(q_tokens))
        orig_overlap = len(p_toks.intersection(orig_tokens))
        
        score = overlap * 1.0 + orig_overlap * 2.0 + is_hq(pf) # Original name match is strong indicator
        # Penalize if it matches 'v2' but original isn't, actually just rely on raw score.
        
        # specific hardcoded boosts based on topic for volume 1
        if 'DECIBEL' in q['topic'] and 'decibel' in pf.lower(): score += 2.0
        if 'PHASE' in q['topic'] and 'phase' in pf.lower(): score += 2.0
        
        if score > best_score:
            best_score = score
            best_match = pf
            
    # if it's very generic, just fallback to something
    if best_score < 0.5:
        best_match = pool_files[0] # Not ideal, but we'll see it
        
    mappings[q['id']] = {
        'question': q['content'][:50] + '...',
        'suggested_image': f"/images/Dictiionary_Quiz_image_Pool/{best_match}",
        'score': best_score,
        'missing': q['missing']
    }

with open('proposed_mappings.json', 'w') as f:
    json.dump(mappings, f, indent=2)

print(f"Generated proposed_mappings.json. Average score: {sum(m['score'] for m in mappings.values())/len(mappings):.2f}")
# Print a few samples with low scores
print("Low score samples:")
for k, v in sorted(mappings.items(), key=lambda item: item[1]['score'])[:10]:
    print(f"{k}: Score {v['score']:.1f} -> {v['suggested_image']} (Q: {v['question']})")
    
