import json
import random
import re

# --- DATA & ASSETS ---

QUOTES = [
    "\"The computer is the most flexible instrument ever created.\" - Brian Eno",
    "\"Digital audio is all about the numbers, but the soul comes from the human.\" - Unknown",
    "\"Sampling is a new typography.\" - Paul D. Miller",
    "\"Editing is 50% of the magic in production.\" - George Martin",
    "\"Nyquist was right, but your ears are the final judge.\" - Mastering Engineer Proverb",
    "\"Great sampling doesn't sound like sampling.\" - Amon Tobin"
]

IMAGES_MAP = {
    # Sampling & Editing
    "Editing": "/images/MT Pictures/Audio Editor.png",
    "Fades": "/images/gen/fades_graph.png", # Placeholder
    "Looping": "/images/gen/loop_crossfade.png", # Placeholder
    "Zero-Crossing": "/images/gen/zero_crossing.png", # Placeholder
    "Waveform": "/images/MT Pictures/Audio Waveform.png",
    
    # Digital Theory
    "Aliasing": "https://upload.wikimedia.org/wikipedia/commons/2/28/AliasingSines.svg", # Reliable external
    "Bit Depth": "https://upload.wikimedia.org/wikipedia/commons/a/a2/4-bit-linear-pcm.svg", # Placeholder representation
    "Sample Rate": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Signal_Sampling.png/600px-Signal_Sampling.png", # Placeholder
    "Nyquist": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Nyquist_sampling.svg/450px-Nyquist_sampling.svg.png", # Reliable
    "Quantization": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/4-bit-linear-pcm.svg/600px-4-bit-linear-pcm.svg.png",
    
    # Concepts
    "File Formats": "/images/MT Pictures/File Icons.png", # Placeholder
    "MIDI": "/images/MT Pictures/MIDI Piano Roll Logic.png",
    
    # General
    "DAW": "/images/MT Pictures/Logic Mixer.png",
    "Studio": "/images/MT Pictures/Recording Studio.jpg"
}

# --- PARSING HELPERS ---

def get_image(title):
    clean_title = re.sub(r'^(Review:|Define:|Concept:|Feature:|Match:|Application:|Identify:|Technique:|Parameter:)\s*', '', title, flags=re.IGNORECASE).strip()
    clean_title_lower = clean_title.lower()
    
    for key, path in IMAGES_MAP.items():
        if key.lower() in clean_title_lower:
            return path
            
    # Category Fallbacks
    if "edit" in clean_title_lower or "trim" in clean_title_lower or "cut" in clean_title_lower:
        return "/images/MT Pictures/Audio Editor.png"
    if "fade" in clean_title_lower: return "/images/MT Pictures/Audio Editor.png"
    if "bit" in clean_title_lower or "depth" in clean_title_lower:
         return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/4-bit-linear-pcm.svg/600px-4-bit-linear-pcm.svg.png"
    if "sample rate" in clean_title_lower or "hz" in clean_title_lower or "nyquist" in clean_title_lower:
         return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Signal_Sampling.png/600px-Signal_Sampling.png"
    if "midi" in clean_title_lower or "sequence" in clean_title_lower:
         return "/images/MT Pictures/MIDI Piano Roll Logic.png"
    if "loop" in clean_title_lower: return "/images/MT Pictures/Audio Editor.png"
    
    return None

def pad_questions(qs, target_count=10):
    if not qs: return []
    
    if len(qs) >= target_count:
        return qs[:target_count]
        
    needed = target_count - len(qs)
    variations = []
    
    source_pool = list(qs)
    random.shuffle(source_pool)
    
    for q in source_pool:
        if len(variations) >= needed: break
        new_q = q.copy()
        new_q['title'] = f"Review: {q['title']}"
        new_q['content'] = f"Quick Review: {q['content']}"
        variations.append(new_q)
        
    qs.extend(variations)
    while len(qs) < target_count:
        qs.append(random.choice(qs).copy())
        
    return qs[:target_count]

def get_definition(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    match = re.search(r'^[^.]+\.', text)
    return match.group(0) if match else text[:100] + "."

def get_named_list(text, headers):
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
    kvs = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        match = re.match(r'\*\*(.*?):\*\*\s*(.*)', line)
        if match:
            k = match.group(1).strip()
            v = match.group(2).strip()
            if v and not v.startswith('-'):
               kvs.append((k, v))
        elif ':' in line and line.startswith('**'):
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

# --- HELPERS FOR RELEVANCE ---
def get_applications(text):
    match = re.search(r'\*\*Applications:\*\*(.*?)(?=\n\n|\n\*\*|$)', text, re.DOTALL)
    if match:
        return get_bullets(match.group(1))
    return []

# --- CONCISE TEXT HELPERS ---
def clean_prefix(text):
    text = re.sub(r'^\*\*.*?\*\*:\s*', '', text) 
    text = re.sub(r'^Process:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Function:', '', text, flags=re.IGNORECASE)
    return text.strip()

def shorten_answer(text):
    text = clean_prefix(text)
    parts = re.split(r'[.;:]', text)
    candidate = parts[0].strip()
    if len(candidate) > 50:
        candidate = re.split(r' which | that | and ', candidate)[0].strip()
    if len(candidate) > 60:
        return candidate[:57] + "..."
    return candidate.strip() or "Standard feature"

# --- GENERIC DISTRACTOR POOL ---
GENERIC_DISTRACTORS = [
    "Increases the dynamic range significantly",
    "Requires a high sample rate",
    "Creates aliasing artifacts",
    "Removes DC offset from the signal",
    "Normalizes the audio to 0dBFS",
    "Adds dither to the processing chain",
    "Changes the pitch without affecting time",
    "Used for non-destructive editing",
    "Converts analog to digital",
    "Reduces quantization noise"
]

def ensure_distractors(correct_ans, distractors, required_count=3):
    final_dist = [d for d in distractors if d.lower() != correct_ans.lower()]
    final_dist = list(set(final_dist))
    
    attempts = 0
    while len(final_dist) < required_count and attempts < 100:
        attempts += 1
        g = random.choice(GENERIC_DISTRACTORS)
        if g.lower() != correct_ans.lower() and g not in final_dist:
             final_dist.append(g)
             
    return final_dist[:required_count]

# --- NATURAL QUESTION TEMPLATES ---
BASIC_Q_TEMPLATES = [
    "What is the primary function of '{title}'?",
    "Which definition describes '{title}'?",
    "In digital audio, what does '{title}' refer to?",
    "Select the correct explanation for '{title}':"
]

INT_Q_TEMPLATES = [
    "Which characteristic defines '{title}'?",
    "Key Aspect: What is a core feature of '{title}'?",
    "Identify the operational principle of '{title}':"
]

ADV_Q_TEMPLATES = [
    "What is the standard value or range for '{param}' in relation to '{title}'?",
    "Regarding '{title}', what does the specification '{param}' indicate?",
    "Technically, how is '{param}' defined for '{title}'?"
]

MASTER_Q_TEMPLATES = [
    "In a professional workflow, why utilize '{title}'?",
    "For which critical task is '{title}' the standard solution?",
    "Choose the best application scenario for '{title}':"
]

# --- GENERATORS ---

def gen_basic(topic_title, sections, global_defs):
    qs = []
    for section in sections:
        title = section['title']
        text = section['text']
        full_defin = clean_prefix(get_definition(text))
        short_defin = shorten_answer(full_defin)
        
        if len(short_defin) < 5: continue
        
        valid_distractors = [d for d in global_defs if "Param:" not in d]
        valid_distractors = [shorten_answer(d) for d in valid_distractors if d != full_defin and len(d) > 10]
        
        distractors = ensure_distractors(short_defin, valid_distractors, 3)
            
        img_path = get_image(title)
        img_html = f'<img src="{img_path}" alt="{title}" style="max-width:100%; margin-top:10px; border-radius:8px;" />' if img_path else ""
        
        q_text = random.choice(BASIC_Q_TEMPLATES).format(title=title)
            
        qs.append({
            "title": f"Define: {title}",
            "content": q_text,
            "type": "multi_choice",
            "answers": [{"text": short_defin, "is_true": "yes"}] + [{"text": d, "is_true": "no"} for d in distractors],
            "explanation": f"<h3>{title}</h3><p>{full_defin}</p>{img_html}<blockquote>{random.choice(QUOTES)}</blockquote>"
        })

        correct_stmt = short_defin
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
        
        meaningful_bullets = get_named_list(section['text'], ["Key Characteristics", "Advantages", "Disadvantages", "Process", "Why Important"])
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
        kvs = get_key_values(section['text'])
        
        for k, v in kvs:
            if len(v) < 2 or len(v) > 150: continue
            
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
                "title": f"Parameter: {title}",
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
        
        if not apps:
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
        
    return pad_questions(qs, 10)


# --- MAIN LOGIC ---

with open('vol4_restructured.json', 'r') as f:
    data = json.load(f)

for part in data['parts']:
    for topic in part['topics']:
        print(f"Generating for {topic['title']}")
        
        global_defs = []
        global_bullets = []
        global_specs = []
        global_apps = []
        
        for p in data['parts']:
            for t in p['topics']:
                for s in t['sections']:
                    global_defs.append(get_definition(s['text']))
                    global_bullets.extend(get_bullets(s['text']))
                    for k, v in get_key_values(s['text']):
                        global_specs.append(f"{k}: {v}")
                    global_apps.extend(get_applications(s['text']))

        topic['levels'] = {}
        topic['levels']['basic'] = gen_basic(topic['title'], topic['sections'], global_defs)
        topic['levels']['intermediate'] = gen_intermediate(topic['title'], topic['sections'], global_bullets)
        topic['levels']['advanced'] = gen_advanced(topic['title'], topic['sections'], global_specs)
        topic['levels']['master'] = gen_master(topic['title'], topic['sections'], global_apps)
        
        for lvl_name, q_list in topic['levels'].items():
            for i, q in enumerate(q_list):
                q['id'] = f"v4_{part['id']}_{topic['id']}_{lvl_name[0]}_{i+1}"

with open('vol4_complex_quizzes.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Generation Complete.")
