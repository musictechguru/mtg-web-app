import json
import random
import re

# --- DATA & ASSETS ---

QUOTES = [
    "\"The synthesizer is the only instrument that you can build from the inside out.\" - Robert Moog",
    "\"I don't separate sound design from composition.\" - Hans Zimmer",
    "\"Modulation is the key to life (and synthesis).\" - Unknown",
    "\"The beauty of synthesis is that you can create sounds that have never existed before.\" - Wendy Carlos",
    "\"Filters are where the magic happens.\" - Tom Oberheim",
    "\"Digital purity is nice, but analog grit is emotion.\" - Dave Smith",
    "\"ADSR: The DNA of every sound.\" - Synth Proverb"
]

IMAGES_MAP = {
    # Waveforms
    "Sine": "/images/gen/wave_sine.png", 
    "Sawtooth": "/images/gen/wave_saw.png",
    "Square": "/images/gen/wave_square.png",
    "Triangle": "/images/gen/wave_triangle.png",
    "Pulse": "/images/gen/wave_pulse.png",
    "Noise": "/images/gen/wave_noise.png",
    
    # Components
    "Oscillator": "/images/MT Pictures/Oscillator 1.png", # Placeholder if available, or generic synth
    "Filter": "/images/MT Pictures/Filter.png",
    "Amplifier": "/images/MT Pictures/VCA.png", # Placeholder
    "Envelope": "https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg", # Using external for now until generated
    "LFO": "/images/MT Pictures/LFO logic.png",
    
    # Concepts
    "ADSR": "https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg",
    "Subtractive": "/images/MT Pictures/Minimoog.png", # Placeholder
    "FM": "/images/MT Pictures/FM8.png", # Placeholder
    "Wavetable": "/images/MT Pictures/Serum.png", # Placeholder
    "Modulation": "/images/MT Pictures/Modulation Matrix.png",
    
    # Classic Synths (Fallbacks to generic if explicit not found)
    "Minimoog": "/images/MT Pictures/Minimoog.png",
    "DX7": "/images/MT Pictures/Yamaha DX7.png",
    "Prophet": "/images/MT Pictures/Prophet 5.png",
    "TB-303": "/images/MT Pictures/TB303.png",
    "Jupiter": "/images/MT Pictures/Roland Jupiter 8.png"
}

# --- PARSING HELPERS ---

def get_image(title):
    # Clean title
    clean_title = re.sub(r'^(Review:|Define:|Concept:|Feature:|Match:|Application:|Identify:|Technique:)\s*', '', title, flags=re.IGNORECASE).strip()
    clean_title_lower = clean_title.lower()
    
    # Specific Exact Matches
    for key, path in IMAGES_MAP.items():
        if key.lower() in clean_title_lower:
            return path
            
    # Category Fallbacks
    if "wave" in clean_title_lower:
         if "measure" in clean_title_lower: return "/images/gen/wave_sine.png" # generic
         if "timbre" in clean_title_lower: return "/images/gen/wave_saw.png"
         
    if "filter" in clean_title_lower: return "/images/MT Pictures/Filter.png"
    if "envelope" in clean_title_lower or "attack" in clean_title_lower or "release" in clean_title_lower: 
        return "https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg"
    
    if "lfo" in clean_title_lower: return "/images/MT Pictures/LFO logic.png"
    
    if "synth" in clean_title_lower or "keyboard" in clean_title_lower:
        return "/images/MT Pictures/Minimoog.png" # Generic synth image
        
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
    # improved regex to find the first definition sentence
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
    # Get all bullets regardless of section
    return [re.sub(r'\*\*(.*?)\*\*', r'\1', line.strip()[2:]) for line in text.split('\n') if line.strip().startswith('- ')]

def get_key_values(text):
    kvs = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        # Regex to find **Key:** Value
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
    text = re.sub(r'^Key Parameters:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Characteristics:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^Sound Character:', '', text, flags=re.IGNORECASE)
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
    "Used for generating sub-bass",
    "Controls the amplitude over time",
    "Removes high frequencies from the sound",
    "Adds odd harmonics only",
    "Creates a chorus-like effect",
    "Modulates the filter cutoff",
    "Based on sample playback",
    "Requires high CPU usage",
    "Generates a pure sine wave",
    "Common in additive synthesis"
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
    "What is the function of '{title}'?",
    "Which definition best describes '{title}'?",
    "In synthesis, what does '{title}' do?",
    "Identify the correct description for '{title}':"
]

INT_Q_TEMPLATES = [
    "Which characteristic is specific to '{title}'?",
    "Key Feature: What distinguishes '{title}'?",
    "Identify a core property of '{title}':"
]

ADV_Q_TEMPLATES = [
    "For '{title}', what is the typical value for '{param}'?",
    "Regarding '{title}', what does the '{param}' setting control?",
    "What is the standard specification for '{param}' in '{title}'?"
]

MASTER_Q_TEMPLATES = [
    "When designing a sound, why would you use '{title}'?",
    "For which sound design task is '{title}' most effective?",
    "Choose the best application for '{title}':"
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

        # Concept Question
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
        
        meaningful_bullets = get_named_list(section['text'], ["Key Characteristics", "Advantages", "Disadvantages", "Sound Character", "Harmonic Content"])
        
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

with open('vol3_restructured.json', 'r') as f:
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
                q['id'] = f"v3_{part['id']}_{topic['id']}_{lvl_name[0]}_{i+1}"

with open('vol3_complex_quizzes.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Generation Complete.")
