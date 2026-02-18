import re
import json
import os

BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 4- Sampling_Parts 1 - 4 Markdown'
FILES = [
    'MT_Dictionary_Volume_4_Sampling_Part1.md',
    'MT_Dictionary_Volume_4_Sampling_Part2.md',
    'MT_Dictionary_Volume_4_Sampling_Part3.md',
    'MT_Dictionary_Volume_4_Sampling_Part4.md'
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
            
            if "Volume 4" in title: continue
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
    "id": "vol4",
    "title": "Volume 4: Sampling & Sequencing",
    "parts": [
        {"id": "p1", "title": "Part 1: Sampling Editing", "topics": []},
        {"id": "p2", "title": "Part 2: Digital Audio Theory", "topics": []},
        {"id": "p3", "title": "Part 3: Sampling Techniques", "topics": []},
        {"id": "p4", "title": "Part 4: MIDI & Sequencing", "topics": []}
    ]
}

def get_part(pid):
    return next(p for p in restructured['parts'] if p['id'] == pid)

for topic in topics:
    t_title = topic['title']
    
    # Mapping Logic
    # P1: Editing (Cutting, Fades, Loops, Normalizing)
    if "Sample Editing" in t_title or "Cutting" in t_title or "Fades" in t_title or "Looping" in t_title or "Reverse" in t_title:
        get_part("p1")['topics'].append(topic)
    elif "Destructive" in t_title or "DC Offset" in t_title:
        get_part("p1")['topics'].append(topic)
        
    # P2: Theory (Bit Depth, Sample Rate, Aliasing, File Formats)
    elif "Digital Audio Theory" in t_title or "Bit Depth" in t_title or "Sample Rate" in t_title or "Nyquist" in t_title:
         get_part("p2")['topics'].append(topic)
    elif "Aliasing" in t_title or "Quantization" in t_title or "Dithering" in t_title or "Binary" in t_title or "PCM" in t_title:
         get_part("p2")['topics'].append(topic)
    elif "File Formats" in t_title or "Clipping" in t_title:
         get_part("p2")['topics'].append(topic)

    # P3: Techniques (Multi-Sampling, Playback Params)
    elif "Sample Playback" in t_title or "Root Note" in t_title or "Pitch/Transpose" in t_title:
        get_part("p3")['topics'].append(topic)
    elif "Multi-Sampling" in t_title or "Key Zones" in t_title: # Assuming these exist in following parts
        get_part("p3")['topics'].append(topic)
        
    # P4: Sequencing/MIDI
    elif "MIDI" in t_title or "Sequencing" in t_title or "General MIDI" in t_title:
        get_part("p4")['topics'].append(topic)
         
    else:
        # Fallback based on file source
        if "Part1.md" in topic['original_file']:
            get_part("p1")['topics'].append(topic)
        elif "Part2.md" in topic['original_file']:
            get_part("p2")['topics'].append(topic)
        elif "Part3.md" in topic['original_file']:
            get_part("p3")['topics'].append(topic)
        elif "Part4.md" in topic['original_file']:
            get_part("p4")['topics'].append(topic)
        else:
            print(f"Unassigned Topic: {t_title}")
            get_part("p4")['topics'].append(topic)

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

with open('vol4_restructured.json', 'w') as f:
    json.dump(restructured, f, indent=2)

print("Restructuring Complete.")
