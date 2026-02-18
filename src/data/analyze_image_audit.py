
import re

input_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/image_relevance_audit_strict_output.txt'
output_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/image_mismatch_summary.md'

mismatches = []
current_item = {}

with open(input_file, 'r') as f:
    for line in f:
        line = line.strip()
        if line.startswith('FLAGGED|'):
            parts = line.split('|')
            current_item = {'id': parts[1], 'image': parts[2].replace('Image: ', '').strip()}
        elif line.startswith('Q: '):
            current_item['question'] = line[3:]
        elif line.startswith('Keywords: '):
            current_item['keywords'] = eval(line[10:])
        elif line.startswith('---'):
            mismatches.append(current_item)
            current_item = {}

# Define "Strong Mismatch" rules
# Rule format: (image_keyword, [required_question_keywords])
# If image has keyword, question MUST contain at least one of the required keywords.
rules = [
    ('ground', ['ground', 'earth', 'hum', 'loop', 'noise', 'connect']),
    ('fletcher', ['fletcher', 'munson', 'hearing', 'loudness', 'sensitivity', 'contour', 'perception']),
    ('nyquist', ['nyquist', 'sample', 'rate', 'aliasing', 'frequency']),
    ('spdif', ['spdif', 'digital', 'coaxial', 'optical', 'interface', 'connect']),
    ('midi', ['midi', 'data', 'note', 'velocity', 'control', 'protocol']),
    ('compressor', ['compress', 'dynamic', 'reduction', 'threshold', 'ratio', 'attack']),
    ('equalizer', ['equaliz', 'eq', 'frequency', 'boost', 'cut', 'filter']),
    ('microphone', ['mic', 'pickup', 'pattern', 'transducer', 'diaphragm', 'phantom']),
    ('cable', ['cable', 'lr', 'trs', 'xlr', 'balanc', 'connect', 'lead', 'wire']),
    ('connector', ['connector', 'xlr', 'trs', 'ts', 'rca', 'jack', 'plug']),
    ('aliasing', ['alias', 'sample', 'rate', 'nyquist', 'frequency']),
    ('jitter', ['jitter', 'clock', 'time', 'digital', 'error']),
    ('dither', ['dither', 'quantiz', 'noise', 'bit', 'depth']),
    ('latency', ['latency', 'delay', 'buffer', 'monitor']),
    ('phase', ['phase', 'cancel', 'coherent', 'polarity', 'shift']),
]

strong_mismatches = []

for item in mismatches:
    img_lower = item['image'].lower()
    q_lower = item['question'].lower()
    
    for img_kw, req_kws in rules:
        if img_kw in img_lower:
            # Check if any required keyword is in the question
            if not any(rk in q_lower for rk in req_kws):
                item['reason'] = f"Image has '{img_kw}' but question lacks {req_kws}"
                strong_mismatches.append(item)
                break

# Generate Report
with open(output_file, 'w') as f:
    f.write("# Image Relevance Mismatch Report\n\n")
    f.write(f"Found {len(strong_mismatches)} strong mismatches.\n\n")
    
    for item in strong_mismatches:
        f.write(f"### ID: `{item['id']}`\n")
        f.write(f"- **Question**: {item['question']}\n")
        f.write(f"- **Image**: `{item['image']}`\n")
        f.write(f"- **Reason**: {item['reason']}\n")
        f.write("\n---\n")

print(f"Generated report with {len(strong_mismatches)} items.")
