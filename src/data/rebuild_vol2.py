import re
import json
import os

BASE_DIR = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 2 - Microphones_Parts 1 - 5 Markdown'
FILES = [
    'Volume_2_Microphones_Part1.md',
    'Volume_2_Microphones_Part2.md',
    'Volume_2_Microphones_Part3_4_5.md'
]

# Regex Helpers
def get_sections(text):
    # Split by level 3 headers
    sections = []
    # Find all start indices of ###
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
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Split by level 2 headers (Topics)
        # But ignore "Volume 2" or "Part X" headers which might be ## or #
        # We look for ## [Topic Name]
        
        parts = re.split(r'^## (.+)', content, flags=re.MULTILINE)
        # parts[0] is preamble
        # parts[1] is Title 1, parts[2] is Content 1
        # parts[3] is Title 2, parts[4] is Content 2...
        
        for i in range(1, len(parts), 2):
            title = parts[i].strip()
            text = parts[i+1]
            
            # Filter distinct non-topics
            if "Volume 2" in title: continue
            
            # Extract sub-sections
            sections = get_sections(text)
            
            # If no sections found, maybe the text IS the section (if it just has bullets)
            # But our format is strictly ### Section.
            # If sections is empty, check if text has content.
            # (Handling the edge case of orphan text)
            
            topic = {
                "title": title,
                "sections": sections,
                "original_file": fname
            }
            topics.append(topic)
    return topics

topics = parse_all_topics()

# -- RESTRUCTURING --

part1_types = [
    "Gain and Signal Path",
    "Microphone Types & Characteristics", # Contains Dynamic, Condenser
    "Ribbon Microphone",
    "Boundary Microphone (PZM - Pressure Zone Microphone)",
    "Shotgun Microphone (Interference Tube)",
    "Lavalier/Lapel Microphone",
    "USB Microphone",
    "Tube Microphone",
    "Multi-Pattern Microphone"
]

part2_patterns = [
    "Understanding Polar Patterns",
    "Cardioid Pattern (Heart-Shaped)",
    "Supercardioid Pattern",
    "Hypercardioid Pattern",
    "Omnidirectional Pattern",
    "Figure-8 (Bidirectional) Pattern",
    "Shotgun (Lobar) Pattern",
    "Switchable/Multi-Pattern"
]

# We might need to 'flatten' the topics.
# Currently "Microphone Types & Characteristics" contains Dynamic and Condenser.
# But "Ribbon Microphone" is a top-level Header 3 (###) under a Header 2 (part 2 continued?).
# Wait, "Ribbon Microphone" in file 2 is `### Ribbon Microphone` under `## PART 1 CONTINUED...`
# My `parse_all_topics` splits by `##`.
# So "PART 1 CONTINUED: MORE MICROPHONE TYPES" is a Topic Title?
# Yes.
# So I need to grab sections from that topic and put them into Part 1.

restructured = {
    "id": "vol2",
    "title": "Volume 2: Microphones",
    "parts": [
        {"id": "p1", "title": "Part 1: Microphone Fundamentals & Types", "topics": []},
        {"id": "p2", "title": "Part 2: Polar Patterns", "topics": []},
        {"id": "p3", "title": "Part 3: Micing Techniques", "topics": []},
        {"id": "p4", "title": "Part 4: Instrument Guide", "topics": []},
        {"id": "p5", "title": "Part 5: Stereo & Tech", "topics": []}
    ]
}

# Helper to find part by ID
def get_part(pid):
    return next(p for p in restructured['parts'] if p['id'] == pid)

# Content Distribution Logic
for topic in topics:
    t_title = topic['title']
    
    # -- SPECIAL HANDLING FOR "PART 1 CONTINUED" HEADER --
    if "MORE MICROPHONE TYPES" in t_title:
        # These are all types (Ribbon, Boundary, etc.)
        # We treat each SECTION as a TOPIC for quiz purposes?
        # Or we group them all under one topic "Other Microphone Types"?
        # User wants "Part 1 ... carries on with Ribbon".
        # Let's create a topic "Advanced Microphone Types" in P1.
        new_topic = {"title": "Specialty & Ribbon Microphones", "sections": topic['sections']}
        get_part("p1")['topics'].append(new_topic)
        continue

    # -- SPECIAL HANDLING FOR "POLAR PATTERNS COMPLETE" HEADER --
    if "POLAR PATTERNS COMPLETE" in t_title:
        # Note: In Markdown "PART 2: POLAR PATTERNS COMPLETE" is a Header 1 (#).
        # But "Understanding Polar Patterns" is Header 2 (##).
        # So "Understanding Polar Patterns" is already a topic.
        # But "Cardioid Pattern" is a ### SECTION under that?
        # Let's check the source in `audit_vol2_missing.py` output.
        # Output says: "Understanding Polar Patterns". 
        # Inside that file, Cardioid etc are ### headers.
        # So they are sections of "Understanding Polar Patterns".
        # We put this topic in P2.
        get_part("p2")['topics'].append(topic)
        continue
    
    # -- OTHER PART 2 CONTINUED --
    if "FINAL POLAR PATTERNS" in t_title:
        # Figure-8, Shotgun Pattern.
        # Add to P2.
        topic['title'] = "Advanced Polar Patterns" # Rename for clarity
        get_part("p2")['topics'].append(topic)
        continue

    # -- STANDARD MAPPING --
    if "Gain" in t_title:
        get_part("p1")['topics'].append(topic)
    elif "Types" in t_title:
        get_part("p1")['topics'].append(topic)
    elif "Polar Patterns" in t_title or "Cardioid" in t_title or "Omni" in t_title or "Figure" in t_title:
        get_part("p2")['topics'].append(topic)
    elif "Micing Techniques" in t_title:
        get_part("p3")['topics'].append(topic)
    elif "Drums" in t_title or "Strings" in t_title or "Vocals" in t_title or "Wind" in t_title or "Piano" in t_title or "Instrument" in t_title:
        get_part("p4")['topics'].append(topic)
    elif "STEREO" in t_title:
        get_part("p5")['topics'].append(topic)
    elif "Technology" in t_title or "Work" in t_title or "Accessories" in t_title:
        get_part("p5")['topics'].append(topic)
    else:
        # Fallback
        print(f"Unassigned Topic: {t_title}")
        get_part("p5")['topics'].append(topic)

# Assign IDs
for p in restructured['parts']:
    t_count = 1
    for t in p['topics']:
        t['id'] = f"t{t_count}"
        t_count += 1

print(f"Found {len(topics)} raw topics.")
print(f"P1 topics: {len(get_part('p1')['topics'])}")
print(f"P2 topics: {len(get_part('p2')['topics'])}")

with open('vol2_restructured.json', 'w') as f:
    json.dump(restructured, f, indent=2)

print("Restructuring Complete.")
