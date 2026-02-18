import re
import json
import sys
import os

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    structure = {
        "title": "",
        "parts": []
    }
    
    current_part = None
    current_topic = None
    current_section = None # Usually a sub-topic or definition
    current_text = []

    for line in lines:
        line = line.rstrip()
        
        # Volume Title
        if line.startswith('## Volume'):
            structure['title'] = line.strip('# ').strip()
            continue

        # Part Header (Level 1)
        if line.startswith('# PART'):
            if current_section and current_topic:
                current_section['text'] = '\n'.join(current_text).strip()
                current_topic['sections'].append(current_section)
                current_section = None
                current_text = []
            
            if current_topic and current_part:
                current_part['topics'].append(current_topic)
                current_topic = None
            
            match = re.search(r'PART \d+: (.+)', line)
            part_title = match.group(1) if match else line.strip('# ').strip()
            
            current_part = {"title": part_title, "topics": []}
            structure['parts'].append(current_part)
            continue
            
        # Topic Header (Level 2) - e.g. "## 1. Gain and Signal Path"
        if line.startswith('## '):
            if current_section and current_topic:
                current_section['text'] = '\n'.join(current_text).strip()
                current_topic['sections'].append(current_section)
                current_section = None
                current_text = []
            
            if current_topic and current_part:
                current_part['topics'].append(current_topic)

            current_topic = {"title": line.strip('# ').strip(), "sections": []}
            continue

        # Section Header (Level 3) - e.g. "### Microphone Level"
        if line.startswith('### '):
            if current_section and current_topic:
                current_section['text'] = '\n'.join(current_text).strip()
                current_topic['sections'].append(current_section)
                current_text = []
            
            current_section = {"title": line.strip('# ').strip(), "text": ""}
            continue

        # Content
        if current_section:
            current_text.append(line)

    # Flush last section
    if current_section and current_topic:
        current_section['text'] = '\n'.join(current_text).strip()
        current_topic['sections'].append(current_section)
    
    if current_topic and current_part:
        current_part['topics'].append(current_topic)

    return structure

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 extract_md_content.py <filepath>")
        sys.exit(1)
        
    path = sys.argv[1]
    data = parse_markdown(path)
    print(json.dumps(data, indent=2))
