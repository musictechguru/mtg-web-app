import re
import json
import os

BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 5- Dynamic_Processing_Parts 1 - 4 Markdown'
FILES = [
    'MT_Dictionary_Volume_5_Dynamic_Processing_Part1.md',
    'MT_Dictionary_Volume_5_Dynamic_Processing_Part2.md',
    'MT_Dictionary_Volume_5_Dynamic_Processing_Part3_4.md'
]

# Regex Helpers
def get_sections(text):
    sections = []
    matches = list(re.finditer(r'^### (.+)', text, re.MULTILINE))
    
    for i, match in enumerate(matches):
        title = match.group(1).strip()
        start = match.end()
        end = matches[i+1].start() if i + 1 < len(matches) else len(text)
        content = text[start:end].strip()
        sections.append({"title": title, "text": content})
    return sections

def parse_all_topics():
    topics = []
    for fname in FILES:
        path = os.path.join(BASE_DIR, fname)
        if not os.path.exists(path):
            print(f"Skipping missing file: {path}")
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        parts = re.split(r'^## (.+)', content, flags=re.MULTILINE)
        
        for i in range(1, len(parts), 2):
            title = parts[i].strip()
            text = parts[i+1]
            
            if "Volume 5" in title: continue
            if "Summary" in title: continue
            
            sections = get_sections(text)
            
            if not sections and len(text.strip()) > 50:
                 sections = [{"title": "Overview", "text": text.strip()}]
            
            if sections:
                topic = {
                    "title": re.sub(r'^\d+\.\s*', '', title),
                    "sections": sections,
                    "original_file": fname
                }
                topics.append(topic)
    return topics

topics = parse_all_topics()

# -- RESTRUCTURING --

restructured = {
    "id": "vol5",
    "title": "Volume 5: Dynamic Processing",
    "parts": [
        {"id": "p1", "title": "Part 1: Compression Fundamentals", "topics": []},
        {"id": "p2", "title": "Part 2: Compressor Types", "topics": []},
        {"id": "p3", "title": "Part 3: Limiting & Gating", "topics": []},
        {"id": "p4", "title": "Part 4: Dynamics in Production", "topics": []}
    ]
}

def get_part(pid):
    return next(p for p in restructured['parts'] if p['id'] == pid)

for topic in topics:
    t_title = topic['title']
    
    # Mapping Logic
    # P1: Theory (Fundamentals, Controls)
    if "Compression Theory" in t_title or "Threshold" in t_title or "Ratio" in t_title or "Attack" in t_title:
        get_part("p1")['topics'].append(topic)
    elif "Knee" in t_title or "Makeup" in t_title or "Gain Reduction" in t_title:
        get_part("p1")['topics'].append(topic)
        
    # P2: Types (VCA, FET, Optical, etc.)
    elif "Compressor Types" in t_title or "VCA" in t_title or "FET" in t_title or "Optical" in t_title:
         get_part("p2")['topics'].append(topic)
    elif "Advanced Compression" in t_title or "Parallel" in t_title or "Serial" in t_title:
         get_part("p2")['topics'].append(topic)

    # P3: Limiting & Gates
    elif "Limiting" in t_title or "True Peak" in t_titleSeconds:
        get_part("p3")['topics'].append(topic)
    elif "Noise Gates" in t_title or "Expanders" in t_title or "De-essers" in t_title:
        get_part("p3")['topics'].append(topic)
        
    # P4: Production/Mixing
    elif "Dynamics in Mixing" in t_title or "Sidechain" in t_title or "Gain Staging" in t_title:
        get_part("p4")['topics'].append(topic)
         
    else:
        # Fallback based on file source
        if "Part1.md" in topic['original_file']:
            get_part("p1")['topics'].append(topic)
        elif "Part2.md" in topic['original_file']:
            get_part("p2")['topics'].append(topic)
        elif "Part3_4.md" in topic['original_file']:
             if "Mixing" in t_title or "Sidechain" in t_title:
                 get_part("p4")['topics'].append(topic)
             else:
                 get_part("p3")['topics'].append(topic)
        else:
            print(f"Unassigned Topic: {t_title}")
            get_part("p3")['topics'].append(topic)

# Assign IDs
for p in restructured['parts']:
    t_count = 1
    for t in p['topics']:
        t['id'] = f"t{t_count}"
        t_count += 1

print(f"Found {len(topics)} topics.")
print(f"P1: {len(get_part('p1')['topics'])}")
print(f"P2: {len(get_part('p2')['topics'])}")
print(f"P3: {len(get_part('p3')['topics'])}")
print(f"P4: {len(get_part('p4')['topics'])}")

with open('vol5_restructured.json', 'w') as f:
    json.dump(restructured, f, indent=2)

print("Restructuring Complete.")
