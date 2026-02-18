import re
import json
import os

BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 3 - Synthesis_Parts 1 - 3 Markdown'
FILES = [
    'MT_Dictionary_Volume_3_Synthesis_Part1.md',
    'MT_Dictionary_Volume_3_Synthesis_Part2.md',
    'MT_Dictionary_Volume_3_Synthesis_Part3.md'
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
            
            if "Volume 3" in title: continue
            if "Summary" in title: continue
            
            sections = get_sections(text)
            
            # If no sections, but text exists (and not just newlines), maybe the topic ITSELF is the content
            # But the logic expects sections.
            # If sections empty, use the whole text as one section entitled "Overview"
            if not sections and len(text.strip()) > 50:
                 sections = [{"title": "Overview", "text": text.strip()}]
            
            if sections:
                topic = {
                    "title": re.sub(r'^\d+\.\s*', '', title), # Remove "1. ", "2. " prefixes
                    "sections": sections,
                    "original_file": fname
                }
                topics.append(topic)
    return topics

topics = parse_all_topics()

# -- RESTRUCTURING --

restructured = {
    "id": "vol3",
    "title": "Volume 3: Synthesis",
    "parts": [
        {"id": "p1", "title": "Part 1: Synthesis Fundamentals", "topics": []},
        {"id": "p2", "title": "Part 2: Advanced Modulation & Filters", "topics": []},
        {"id": "p3", "title": "Part 3: Synthesis Types & Performance", "topics": []}
    ]
}

def get_part(pid):
    return next(p for p in restructured['parts'] if p['id'] == pid)

for topic in topics:
    t_title = topic['title']
    
    # Mapping Logic
    # P1: Components, Envelopes, LFO, Waveforms
    if "Basic Components" in t_title or "Oscillator Waveforms" in t_title:
        get_part("p1")['topics'].append(topic)
    elif "Envelope Generators" in t_title or "LFO" in t_title: # Check specific file content headers if needed
        # "PART 3: ENVELOPE GENERATORS" is a # header? No, likely ## based on file analysis
        get_part("p1")['topics'].append(topic)
        
    # P2: Filters, Modulation (Advanced), Noise
    elif "Filter Types" in t_title or "Low-Pass" in t_title or "High-Pass" in t_title or "Band-Pass" in t_title:
         get_part("p2")['topics'].append(topic)
    elif "Modulation" in t_title and "Advanced" not in t_title: # Simple "Modulation" might be P2
         get_part("p2")['topics'].append(topic)
    elif "REMAINING WAVEFORMS" in t_title: # Noise/Sub-Osc
         get_part("p2")['topics'].append(topic)

    # P3: Types, Performance, Classic Synths
    elif "Types of Synthesis" in t_title or "Performance Controls" in t_title or "Classic Synthesizers" in t_title:
        get_part("p3")['topics'].append(topic)
        
    # Specific Mapping for items that might be separate ## headers
    elif "Sub-Oscillator" in t_title or "Noise" in t_title:
         get_part("p2")['topics'].append(topic)
    elif "ADSR" in t_title:
         get_part("p1")['topics'].append(topic)
         
    else:
        # Fallback based on file source if title is ambiguous
        if "Part1.md" in topic['original_file']:
            get_part("p1")['topics'].append(topic)
        elif "Part2.md" in topic['original_file']:
            get_part("p2")['topics'].append(topic)
        elif "Part3.md" in topic['original_file']:
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

with open('vol3_restructured.json', 'w') as f:
    json.dump(restructured, f, indent=2)

print("Restructuring Complete.")
