import re
import json
import os

BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 2 - Microphones_Parts 1 - 5 Markdown'
FILES = [
    'Volume_2_Microphones_Part1.md',
    'Volume_2_Microphones_Part2.md',
    'Volume_2_Microphones_Part3_4_5.md'
]

def parse_file(filename):
    path = os.path.join(BASE_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    parts = []
    current_part = None
    current_topic = None
    current_section = None
    current_text = []

    def flush_section():
        nonlocal current_section, current_text
        if current_section and current_topic:
            current_section['text'] = '\n'.join(current_text).strip()
            current_topic['sections'].append(current_section)
            current_section = None
            current_text = []

    def flush_topic():
        nonlocal current_topic
        if current_topic and current_part:
            current_part['topics'].append(current_topic)
            current_topic = None

    for line in lines:
        line = line.rstrip()
        
        # Part Header (Level 1)
        if line.startswith('# PART'):
            flush_section()
            flush_topic()
            
            match = re.search(r'PART \d+: (.+)', line)
            title = match.group(1) if match else line.strip('# ').strip()
            
            current_part = {"title": title, "topics": []}
            parts.append(current_part)
            continue
            
        # Topic Header (Level 2)
        if line.startswith('## '):
            if 'Volume 2' in line: continue # Skip main title

            flush_section()
            flush_topic()

            current_topic = {"title": line.strip('# ').strip(), "sections": []}
            continue

        # Section Header (Level 3)
        if line.startswith('### '):
            # Skip "Part X of 5" headers
            if 'Part' in line and 'of' in line: continue
            
            # Auto-create topic if missing
            if current_part and not current_topic:
                current_topic = {"title": current_part['title'], "sections": []}
                # (No flush needed as there was no topic)

            flush_section()
            current_section = {"title": line.strip('# ').strip(), "text": ""}
            continue

        # Content
        if current_section:
            current_text.append(line)

    flush_section()
    flush_topic()
    return parts

full_structure = {
    "id": "vol2",
    "title": "Volume 2: Microphones",
    "parts": []
}

for f in FILES:
    file_parts = parse_file(f)
    full_structure['parts'].extend(file_parts)

# Post-processing to assign IDs
p_count = 1
for part in full_structure['parts']:
    part['id'] = f"p{p_count}"
    t_count = 1
    for topic in part['topics']:
        topic['id'] = f"t{t_count}"
        t_count += 1
    p_count += 1

print(json.dumps(full_structure, indent=2))
