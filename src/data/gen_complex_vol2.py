import json
import random
import re

# --- DATA & ASSETS ---

QUOTES = [
    "\"If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.\" - Nikola Tesla",
    "\"Small improvements lead to big results.\" - Rupert Neve",
    "\"The microphone is the lens through which we see the sound.\" - George Massenburg",
    "\"Bad sound quality is the graffiti of the 21st century.\" - Hans Zimmer",
    "\"There are no rules in filmmaking. Only sins. And the cardinal sin is dullness.\" - Frank Capra (Applicable to Audio!)",
    "\"You can't fix it in the mix if it wasn't there in the tracks.\" - Bruce Swedien",
    "\"First rule of recording: Get it right at the source.\" - Al Schmitt"
]

IMAGES_MAP = {
    "Cardioid": "/images/gen/polar_cardioid.png", 
    "Omni": "/images/gen/polar_omni.png",
    "Figure-8": "/images/gen/polar_figure8.png",
    "Compressor": "/images/MT Pictures/Classic VCA Compressor ( DBX 160).png",
    "Dynamic": "/images/MT Pictures/Shure SM57.png",
    "Condenser": "/images/MT Pictures/Neumann U87 Microphone.png",
    "Ribbon": "/images/MT Pictures/Ribbon Microphone.png",
    "Gate": "/images/MT Pictures/Noise gate graph.png",
    "EQ": "/images/MT Pictures/EQ picture.png",
    "Gain": "/images/MT Pictures/Logic Mixer.png",
    "Level": "/images/MT Pictures/Logic Mixer.png",
    "Phantom": "/images/MT Pictures/Neumann U87 Microphone.png",
    "Snare": "/images/MT Pictures/Shure SM57.png",
    "Kick": "/images/MT Pictures/Shure SM57.png", # Placeholder, dynamic
    "Guitar": "/images/MT Pictures/Acoustic guitar.jpg",
    "Vocal": "/images/MT Pictures/Neumann U87 Microphone.png",
    "Piano": "/images/MT Pictures/MIDI Piano Roll Logic.png", # Placeholder
    "X/Y": "/images/gen/stereo_XY.png", # Placeholder
    "Spaced": "/images/gen/stereo_spaced.png" # Placeholder
}

# --- PARSING HELPERS ---

def get_image(title):
    # Specific Exact Matches
    for key, path in IMAGES_MAP.items():
        if key.lower() in title.lower():
            return path
            
    # Category Fallbacks
    title_lower = title.lower()
    if "drum" in title_lower: return "/images/MT Pictures/Shure SM57.png"
    if "guitar" in title_lower: return "/images/MT Pictures/Acoustic guitar.jpg"
    if "vocal" in title_lower: return "/images/MT Pictures/Neumann U87 Microphone.png"
    if "piano" in title_lower: return "/images/MT Pictures/MIDI Piano Roll Logic.png"
    if "mic" in title_lower: return "/images/MT Pictures/Shure SM57.png"
    
    return None

def pad_questions(qs, target_count=10):
    if not qs: return []
    
    # If we have enough, just trim
    if len(qs) >= target_count:
        return qs[:target_count]
        
    # If not, we need to generate variations
    # Variation 1: Reverse the question (True/False based on existing)
    needed = target_count - len(qs)
    variations = []
    
    source_pool = list(qs) # Copy
    random.shuffle(source_pool)
    
    for q in source_pool:
        if len(variations) >= needed: break
        
        # Create a "Review" variation
        new_q = q.copy()
        new_q['title'] = f"Review: {q['title']}"
        new_q['content'] = f"Quick Review: {q['content']}"
        variations.append(new_q)
        
    qs.extend(variations)
    
    # If still not enough (rare), duplicate
    while len(qs) < target_count:
        qs.append(random.choice(qs).copy())
        
    return qs[:target_count]

def get_definition(text):
    clean = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    # improved regex to find the first definition sentence
    match = re.search(r'^[^.]+\.', clean)
    return match.group(0) if match else clean[:100] + "."

def get_named_list(text, headers):
    # headers is a list of strings like ["Key Characteristics", "Advantages"]
    found_lines = []
    lines = text.split('\n')
    capturing = False
    
    for line in lines:
        line = line.strip()
        if line.startswith('**'):
            clean_header = line.replace('**', '').replace(':', '').strip()
            if any(h.lower() in clean_header.lower() for h in headers):
                capturing = True
            else:
                capturing = False
            continue
            
        if capturing and line.startswith('- '):
            val = line[2:].strip()
            val = re.sub(r'\*\*(.*?)\*\*', r'\1', val)
            found_lines.append(val)
        elif capturing and not line.startswith('- ') and line != "":
            capturing = False
            
    return found_lines

def get_bullets(text):
    return [re.sub(r'\*\*(.*?)\*\*', r'\1', line.strip()[2:]) for line in text.split('\n') if line.strip().startswith('- ')]

def get_key_values(text):
    # Extracts **Key:** Value pairs
    # Supports Mic, Position, Distance, Angle, Technology, etc.
    kvs = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        # Regex to find **Key:** Value
        match = re.match(r'\*\*(.*?):\*\*\s*(.*)', line)
        if match:
            k = match.group(1).strip()
            v = match.group(2).strip()
            # Filter out headers that look like keys but have no value or are lists
            if v and not v.startswith('-'):
               kvs.append((k, v))
        # Handle simple bolded keys: Key: Value (sometimes markdown varies)
        elif ':' in line and line.startswith('**'):
             # Try clean
             clean = line.replace('**', '')
             if ':' in clean:
                 k, v = clean.split(':', 1)
                 if v.strip():
                     kvs.append((k.strip(), v.strip()))
    return kvs

def text_to_html(text):
    html = ""
    in_list = False
    for line in text.split('\n'):
        line = line.strip()
        if not line: continue
        if line.startswith('### '):
            html += f"<h4>{line[4:]}</h4>"
        elif line.startswith('- '):
            if not in_list: html += "<ul>"; in_list = True
            html += f"<li>{line[2:]}</li>"
        else:
            if in_list: html += "</ul>"; in_list = False
            line = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', line)
            html += f"<p>{line}</p>"
    if in_list: html += "</ul>"
    return html

# --- GENERATORS ---

# --- HELPERS FOR RELEVANCE ---
def get_applications(text):
    # Extract "Applications:" block
    match = re.search(r'\*\*Applications:\*\*(.*?)(?=\n\n|\n\*\*|$)', text, re.DOTALL)
    if match:
        return get_bullets(match.group(1))
    return []

# --- IMPROVED GENERATORS ---

# --- CONCISE TEXT HELPERS ---
def clean_prefix(text):
    # Remove common Markdown prefixes
    text = re.sub(r'^\*\*.*?\*\*:\s*', '', text) # Remove **Prefix**:
    text = re.sub(r'^Technology.*?:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Construction:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Key Characteristics:', '', text, flags=re.IGNORECASE)
    return text.strip()

def shorten_answer(text):
    text = clean_prefix(text)
    # Take first sentence, or split by comma/semicolon/markers
    # Split on multiple delimiters
    parts = re.split(r'[.;:]', text)
    candidate = parts[0].strip()
    
    # If still too long, split on " which", " that"
    if len(candidate) > 50:
        candidate = re.split(r' which | that | and ', candidate)[0].strip()

    if len(candidate) > 60:
        return candidate[:57] + "..."
    return candidate.strip() or "Standard feature"

# --- GENERIC DISTRACTOR POOL ---
GENERIC_DISTRACTORS = [
    "Requires external phantom power",
    "Uses a moving coil mechanism",
    "Best for distant micing",
    "Has a figure-8 polar pattern",
    "Creates a proximity effect boost",
    "Reduces background noise significantly",
    "Captures sound from all directions",
    "Typically used for kick drum",
    "Requires high gain preamp",
    "Commonly found in live vocals"
]

def ensure_distractors(correct_ans, distractors, required_count=3):
    # Ensure distinct from correct answer
    final_dist = [d for d in distractors if d.lower() != correct_ans.lower()]
    final_dist = list(set(final_dist)) # Unique
    
    # Fill if needed
    attempts = 0
    while len(final_dist) < required_count and attempts < 100:
        attempts += 1
        g = random.choice(GENERIC_DISTRACTORS)
        if g.lower() != correct_ans.lower() and g not in final_dist:
             final_dist.append(g)
             
    return final_dist[:required_count]

# --- IMAGE HELPERS ---
def get_image(title):
    # Clean title for lookup (remove "Review:", "Define:", etc)
    clean_title = re.sub(r'^(Review:|Define:|Concept:|Feature:|Match:|Application:|Identify:)\s*', '', title, flags=re.IGNORECASE).strip()
    
    # Specific Exact Matches
    for key, path in IMAGES_MAP.items():
        if key.lower() in clean_title.lower():
            return path
            
    # Category Fallbacks
    title_lower = clean_title.lower()
    if "drum" in title_lower: return "/images/MT Pictures/Shure SM57.png"
    if "guitar" in title_lower: return "/images/MT Pictures/Acoustic guitar.jpg"
    if "vocal" in title_lower: return "/images/MT Pictures/Neumann U87 Microphone.png"
    if "piano" in title_lower: return "/images/MT Pictures/MIDI Piano Roll Logic.png"
    if "condenser" in title_lower: return "/images/MT Pictures/Neumann U87 Microphone.png"
    if "dynamic" in title_lower: return "/images/MT Pictures/Shure SM57.png"
    if "ribbon" in title_lower: return "/images/MT Pictures/Ribbon Microphone.png"
    if "mic" in title_lower: return "/images/MT Pictures/Shure SM57.png" # Safe generic
    
    return None

# --- IMPROVED GENERATORS ---

# --- NATURAL QUESTION TEMPLATES ---
BASIC_Q_TEMPLATES = [
    "What is meant by the term '{title}'?",
    "Which statement best defines '{title}'?",
    "In the context of microphones, what is '{title}'?",
    "Select the correct definition for '{title}':"
]

INT_Q_TEMPLATES = [
    "Which characteristic is distinct to '{title}'?",
    "Key feature: Which distinct quality applies to '{title}'?",
    "Identify a defining trait of '{title}':"
]

ADV_Q_TEMPLATES = [
    "Technically, what is the typical '{param}' for '{title}'?",
    "Regarding '{title}', what value is standard for '{param}'?",
    "What is the expected '{param}' specification for '{title}'?"
]

MASTER_Q_TEMPLATES = [
    "In a professional scenario, when would you specifically use '{title}'?",
    "For which recording application is '{title}' the ideal choice?",
    "Choose the best use-case for '{title}':"
]

# --- IMPROVED GENERATORS ---

def gen_basic(topic_title, sections, global_defs):
    qs = []
    for section in sections:
        title = section['title']
        text = section['text']
        full_defin = clean_prefix(get_definition(text))
        short_defin = shorten_answer(full_defin)
        
        if len(short_defin) < 5: continue
        
        # Valid Distractors
        valid_distractors = [d for d in global_defs if "Mic:" not in d and "Position:" not in d and "Setup:" not in d]
        valid_distractors = [shorten_answer(d) for d in valid_distractors if d != full_defin and len(d) > 10]
        
        distractors = ensure_distractors(short_defin, valid_distractors, 3)
            
        # Image?
        img_path = get_image(title)
        img_html = f'<img src="{img_path}" alt="{title}" style="max-width:100%; margin-top:10px; border-radius:8px;" />' if img_path else ""
        
        # Natural Question
        q_text = random.choice(BASIC_Q_TEMPLATES).format(title=title)
            
        qs.append({
            "title": f"Define: {title}",
            "content": q_text,
            "type": "multi_choice",
            "answers": [{"text": short_defin, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in distractors],
            "explanation": f"<h3>{title}</h3><p>{full_defin}</p>{img_html}<blockquote>{random.choice(QUOTES)}</blockquote>"
        })

        # Concept Question
        correct_stmt = short_defin
        # Get 3 distractors
        concept_distractors = ensure_distractors(correct_stmt, valid_distractors, 3)
        
        qs.append({
            "title": f"Concept: {title}",
            "content": f"Which statement describes '{title}'?",
            "type": "multi_choice", 
            "answers": [{"text": correct_stmt, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in concept_distractors],
            "explanation": f"<h3>Correct</h3><p>{full_defin}</p>{img_html}"
        })
        
    return pad_questions(qs, 10)

def gen_intermediate(topic_title, sections, global_bullets):
    qs = []
    for section in sections:
        title = section['title']
        
        # EXTRACT SPECIFIC LISTS
        meaningful_bullets = get_named_list(section['text'], ["Key Characteristics", "Advantages", "Disadvantages", "Features"])
        
        if not meaningful_bullets:
             meaningful_bullets = get_bullets(section['text'])

        if len(meaningful_bullets) < 1: continue
        
        correct = shorten_answer(random.choice(meaningful_bullets))
        if len(correct) < 5: continue
        
        possible_distractors = [shorten_answer(b) for b in global_bullets if b not in meaningful_bullets]
        dist_bullets = ensure_distractors(correct, possible_distractors, 3)
            
        q_text = random.choice(INT_Q_TEMPLATES).format(title=title)
        
        img_path = get_image(title)
        img_html = f'<img src="{img_path}" alt="{title}" style="max-width:100%; margin-top:10px; border-radius:8px;" />' if img_path else ""
            
        qs.append({
            "title": f"Feature: {title}",
            "content": q_text,
            "type": "multi_choice",
            "answers": [{"text": correct, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in dist_bullets],
            "explanation": f"<h3>{title}</h3><p>{correct}</p>{img_html}"
        })
        
        # MATCHING QUESTION
        match_distractors = ensure_distractors(correct, possible_distractors, 3)
        
        qs.append({
            "title": f"Match: {title}",
            "content": f"Match the characteristic to **{title}**:",
            "type": "multi_choice", 
            "answers": [{"text": correct, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in match_distractors],
            "explanation": f"<p><strong>{title}</strong> is characterized by: {correct}</p>{img_html}"
        })

    return pad_questions(qs, 10)

def gen_advanced(topic_title, sections, global_specs):
    qs = []
    for section in sections:
        title = section['title']
        # Use new generic K-V extractor
        kvs = get_key_values(section['text'])
        
        for k, v in kvs:
            # Skip if value is too long or short
            if len(v) < 2 or len(v) > 150: continue
            
            # Find distractors with same Key
            # We need a global pool of values for this Key
            # This is hard to do efficiently with just 'global_specs' passed in.
            # Let's just assume global_distractors are passed, but they are just strings.
            # Better strategy: Filter global_specs (which are strings "Key: Value")
            
            # Extract values from global_specs that have matching key
            same_key_vals = []
            for spec_str in global_specs:
                if ':' in spec_str:
                    gk, gv = spec_str.split(':', 1)
                    if gk.strip().lower() == k.strip().lower() and gv.strip() != v:
                         same_key_vals.append(gv.strip())
            
            distractors = ensure_distractors(shorten_answer(v), same_key_vals, 3)

            q_text = random.choice(ADV_Q_TEMPLATES).format(title=title, param=k)
            
            img_path = get_image(title)
            img_html = f'<img src="{img_path}" alt="{title}" style="max-width:100%; margin-top:10px; border-radius:8px;" />' if img_path else ""

            qs.append({
                "title": f"Technique: {title}",
                "content": q_text,
                "type": "multi_choice",
                "answers": [{"text": shorten_answer(v), "is_true": "yes"}] + [{"text": shorten_answer(d), "is_true": "no"} for d in distractors],
                "explanation": f"<h3>{title}</h3><p><strong>{k}:</strong> {v}</p>{img_html}"
            })
            
    return pad_questions(qs, 10)

def gen_master(topic_title, sections, global_apps):
    qs = []
    for section in sections:
        title = section['title']
        apps = get_applications(section['text'])
        
        # If no explicit "Applications" section, try to infer from text or skip
        if not apps:
             # Try KVs that look like applications
             kvs = get_key_values(section['text'])
             for k, v in kvs:
                 if "Application" in k or "Use" in k:
                     apps.append(v)

        if apps:
            correct_app = shorten_answer(random.choice(apps))
            other_apps = [shorten_answer(a) for a in global_apps if a not in apps]
            
            distractors = ensure_distractors(correct_app, other_apps, 3)
            
            q_text = random.choice(MASTER_Q_TEMPLATES).format(title=title)
            
            img_path = get_image(title)
            img_html = f'<img src="{img_path}" alt="{title}" style="max-width:100%; margin-top:10px; border-radius:8px;" />' if img_path else ""
            
            qs.append({
                "title": f"Application: {title}",
                "content": q_text,
                "type": "multi_choice",
                "answers": [{"text": correct_app, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in distractors],
                "explanation": text_to_html(section['text']) + f"{img_html}<blockquote>{random.choice(QUOTES)}</blockquote>"
            })
        else:
            # Fallback to Hotspot if no text-based master question
             # Only if we really have nothing else
             pass
        
    return pad_questions(qs, 10)


# --- MAIN LOGIC ---

with open('vol2_restructured.json', 'r') as f:
    data = json.load(f)

for part in data['parts']:
    for topic in part['topics']:
        print(f"Generating for {topic['title']}")
        
        # --- COLLECT GLOBAL CONTEXT FOR DISTRACTORS ---
        global_defs = []
        global_bullets = []
        global_specs = []
        global_apps = []
        
        # Iterate over ALL parts/topics to build a massive pool
        for p in data['parts']:
            for t in p['topics']:
                for s in t['sections']:
                    global_defs.append(get_definition(s['text']))
                    global_bullets.extend(get_bullets(s['text']))
                    # Store KVs as "Key: Value" strings for compatibility
                    for k, v in get_key_values(s['text']):
                        global_specs.append(f"{k}: {v}")
                    global_apps.extend(get_applications(s['text']))

        # Basic
        topic['levels'] = {}
        topic['levels']['basic'] = gen_basic(topic['title'], topic['sections'], global_defs)
        topic['levels']['intermediate'] = gen_intermediate(topic['title'], topic['sections'], global_bullets)
        topic['levels']['advanced'] = gen_advanced(topic['title'], topic['sections'], global_specs)
        topic['levels']['master'] = gen_master(topic['title'], topic['sections'], global_apps)
        
        # Ensure IDs are unique
        for lvl_name, q_list in topic['levels'].items():
            for i, q in enumerate(q_list):
                q['id'] = f"v2_{part['id']}_{topic['id']}_{lvl_name[0]}_{i+1}"

with open('vol2_complex_quizzes.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Generation Complete.")
