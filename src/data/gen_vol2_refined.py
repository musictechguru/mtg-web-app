
import json
import random
import re
import os

# Configuration
MD_DIR = "public/MT_Dictionary_MARKDOWN_Volumes_1-10/MT Dictionary Volume 2 - Microphones_Parts 1 - 5 Markdown"
FILES = [
    "Volume_2_Microphones_Part1.md",
    "Volume_2_Microphones_Part2.md",
    "Volume_2_Microphones_Part3_4_5.md"
]
OUTPUT_FILE = "src/data/vol2_quizzes_refined.json"
OUTPUT_FILE = "src/data/vol2_quizzes_refined.json"
BASIC_QUIZ_FILE = "public/Quiz_questions/volume 2/Microphone_Basic_Quiz_120_Questions.md"
INTERMEDIATE_QUIZ_FILE = "public/Quiz_questions/volume 2/Microphone_Intermediate_Quiz_120_Questions.md"
ADVANCED_QUIZ_FILE = "public/Quiz_questions/volume 2/Microphone_Advanced_Quiz_120_Questions.md"
MASTER_QUIZ_FILE = "public/Quiz_questions/volume 2/Microphone_Master_Quiz_120_Questions.md"

def parse_quiz_file(filepath):
    """
    Parses a Quiz Markdown file (Basic or Intermediate).
    Returns a dict: { "TOPIC NAME": [ {question_dict}, ... ] }
    """
    with open(filepath, 'r') as f:
        content = f.read()

    # Split by Topics
    # ## TOPIC 1: GAIN & SIGNAL PATH
    topic_blocks = re.split(r'## TOPIC \d+: ', content)[1:] # Skip preamble
    
    parsed_topics = {}
    
    for block in topic_blocks:
        lines = block.split('\n')
        topic_title = lines[0].strip() # First line is title
        
        # normalize title to map later
        # e.g. "GAIN & SIGNAL PATH" -> "Gain & Signal Path"
        
        questions = []
        # Split by "### Question"
        q_blocks = re.split(r'### Question \d+', block)[1:]
        
        for qb in q_blocks:
            # Parse body, options, answer
            # Structure:
            # What is...?
            # - A) Option
            # - B) Option
            # ...
            # **Answer: B**
            
            qb = qb.strip()
            if not qb: continue
            
            # Extract Answer and Explanation
            ans_match = re.search(r'\*\*Answer:\s*([A-D])\*\*\s*(?:\((.*?)\))?', qb, re.DOTALL)
            if not ans_match: continue
            correct_letter = ans_match.group(1)
            specific_explanation = ans_match.group(2).strip() if ans_match.group(2) else ""
            if specific_explanation:
                print(f"Captured Explanation for '{correct_letter}': {specific_explanation[:30]}...")
            
            # Lines before answer are question + options
            body_part = qb[:ans_match.start()].strip()
            body_lines = [l.strip() for l in body_part.split('\n') if l.strip()]
            
            question_text = body_lines[0] # First substantial line
            
            options = []
            char_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
            
            # Find options
            for line in body_lines:
                # - A) ... or - A ...
                opt_match = re.match(r'-\s*([A-D])\)?\s*(.*)', line)
                if opt_match:
                    opt_char = opt_match.group(1)
                    opt_text = opt_match.group(2)
                    # Frontend expects "is_true": "yes" | "no"
                    is_true = "yes" if (opt_char == correct_letter) else "no"
                    options.append({"text": opt_text, "is_true": is_true})
            
            if len(options) == 4:
                questions.append({
                    "title": "quiz_concept", # Placeholder, will be overwritten by generator
                    "question": question_text,
                    "content": question_text, # ADDED: Frontend likely uses 'content'
                    "answers": options,
                    "type": "multi_choice",
                    "explanation_text": specific_explanation
                })
        
        parsed_topics[topic_title.upper()] = questions
        
    return parsed_topics

# Map Generator Topics to Parsed Topics
# Generator Topic Key -> List of Parsed Topic Keys to pull from
TOPIC_MAPPING = {
    "Gain & Signal Path": ["GAIN & SIGNAL PATH"],
    "Microphone Types": ["MICROPHONE TYPES & CHARACTERISTICS"],
    "Understanding Polar Patterns": ["UNDERSTANDING POLAR PATTERNS"],
    "General Micing Techniques": ["GENERAL MICING TECHNIQUES", "AMBIENCE & ROOM MICING"],
    "Instrument Micing": ["DRUMS", "STRINGS", "VOCALS", "WIND INSTRUMENTS", "PIANO & KEYBOARDS"],
    "Stereo Techniques": ["STEREO TECHNIQUES"],
    "Technology": ["MICROPHONE SPECIFICATIONS & PHYSICS"]
}


# Data Structure Helpers
def clean_text(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    return text.strip()

def extract_content(md_content):
    """
    Parses the full markdown content into a linear list of headers and content blocks.
    Returns: [{'type': 'h1'|'h2'|'h3'|'text', 'content': string}]
    """
    lines = md_content.split('\n')
    parsed = []
    current_text = []
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if line.startswith('# '):
            if current_text:
                parsed.append({'type': 'text', 'content': '\n'.join(current_text)})
                current_text = []
            parsed.append({'type': 'h1', 'content': line[2:]})
        elif line.startswith('## '):
            if current_text:
                parsed.append({'type': 'text', 'content': '\n'.join(current_text)})
                current_text = []
            parsed.append({'type': 'h2', 'content': line[3:]})
        elif line.startswith('### '):
            if current_text:
                parsed.append({'type': 'text', 'content': '\n'.join(current_text)})
                current_text = []
            parsed.append({'type': 'h3', 'content': line[4:]})
        else:
            current_text.append(line)
            
    if current_text:
        parsed.append({'type': 'text', 'content': '\n'.join(current_text)})
        
    return parsed

def logical_structure(parsed_data):
    """
    Reorganizes the linear parsed data into the specific 6-Part structure requested.
    """
    structure = {
        "Part 1": {"title": "Microphone Fundamentals", "topics": {}},
        "Part 2": {"title": "Polar Patterns", "topics": {}},
        "Part 3": {"title": "Micing Techniques", "topics": {}},
        "Part 4": {"title": "Instrument Micing Techniques", "topics": {}},
        "Part 5": {"title": "Advanced Stereo Techniques", "topics": {}},
        "Part 6": {"title": "Microphone Technology", "topics": {}}
    }
    
    current_part = None
    current_topic = None
    
    # Manual Mapping based on H1/H2/H3 headers usually found in the text
    # We iterate through the parsed data and assign to structure
    
    for item in parsed_data:
        content = item['content']
        type = item['type']
        
        # Detect Part boundaries (often in H1 or H2)
        # Part 1
        if "Gain and Signal Path" in content:
            current_part = "Part 1"
            current_topic = "Gain & Signal Path"
            structure[current_part]["topics"][current_topic] = []
        elif "Microphone Types & Characteristics" in content or "Condenser Microphone" in content or "Ribbon Microphone" in content:
            # Note: Ribbon is in file 2, but physically part of "Mic Types" logic
            current_part = "Part 1"
            if "Microphone Types" in content:
                current_topic = "Microphone Types"
            else:
                 # If we hit a specific mic type header but haven't set topic yet
                 if current_topic != "Microphone Types":
                     current_topic = "Microphone Types"
            if current_topic not in structure[current_part]["topics"]:
                structure[current_part]["topics"][current_topic] = []

        # Part 2
        elif "PART 2: POLAR PATTERNS" in content or "Understanding Polar Patterns" in content:
            current_part = "Part 2"
            current_topic = "Understanding Polar Patterns"
            structure[current_part]["topics"][current_topic] = []
        elif "Cardioid Pattern" in content or "Omnidirectional Pattern" in content:
             current_part = "Part 2" # Ensure we are in part 2
             # We might treat individual patterns as sub-items of the topic "Polar Patterns"
             pass

        # Part 3
        elif "PART 3: MICING TECHNIQUES" in content:
            current_part = "Part 3"
            current_topic = "General Micing Techniques"
            structure[current_part]["topics"][current_topic] = []

        # Part 4
        elif "PART 4: INSTRUMENT MICING" in content:
            current_part = "Part 4"
            current_topic = "Instrument Micing" # Will subdivide later
            structure[current_part]["topics"][current_topic] = []
            
        # Part 5
        elif "PART 5: ADVANCED STEREO" in content:
            current_part = "Part 5"
            current_topic = "Stereo Techniques"
            structure[current_part]["topics"][current_topic] = []

        # Part 6
        elif "PART 6: MICROPHONE TECHNOLOGY" in content:
            current_part = "Part 6"
            current_topic = "Technology"
            structure[current_part]["topics"][current_topic] = []

        # Add Content
        if current_part and current_topic:
            # If it's a header for a sub-section (like "Snare Drum" in Part 4), we might want to capture that
            if current_part == "Part 4" and type == 'h3':
                # Use the H3 as a sub-topic key if needed, or just append it as a block
                pass 
            
            structure[current_part]["topics"][current_topic].append(item)

    return structure

def extract_definitions_and_facts(text_blocks):
    """
    Extracts key-value pairs, bullet points, and definitions from text blocks.
    """
    facts = []
    definitions = {}
    quotes = []
    
    full_text = "\n".join([b['content'] for b in text_blocks if b['type'] == 'text'])
    
    # Extract bold definitions: **Term:** Definition
    # We enforce that the definition must be substantial
    matches = re.findall(r'\*\*(.*?):\*\*\s*([^\n]*)', full_text)
    for term, defn in matches:
        clean_defn = defn.strip().lstrip('- ').strip()
        if len(clean_defn) > 15:
            definitions[term.strip()] = clean_defn
        
    # Extract "Professional" quotes OR standard headers we want to treat as wisdom
    quote_matches = re.findall(r'\*\*(Professional.*?|Characteristics|Advantages|Applications):\*\*\s*(.*)', full_text)
    for label, text in quote_matches:
        # Only take the first line if multiple
        clean_text = text.split('\n')[0].strip()
        if len(clean_text) > 10:
             quotes.append(f"{label}: {clean_text}")

    # Extract bullet points - Filter out empty or header-like bullets
    bullets = re.findall(r'-\s*(.*)', full_text)
    for b in bullets:
        clean_b = b.strip()
        # Clean up Markdown bolding from the fact itself for readability
        clean_b = clean_b.replace('**', '')
        
        # Filter out "headers" masquerading as bullets or broken lines
        # Must contain a verb or be substantial
        if len(clean_b) > 20 and not clean_b.endswith(':'):
             facts.append(clean_b)
             
    # FALLBACK: If no explicit quotes, use facts as quotes
    if not quotes and facts:
        # Take up to 5 facts and format them as "Professional Insight: [Fact]"
        for f in facts[:10]: # Pool of facts
             quotes.append(f"Professional Insight: {f}")
    
    return {"definitions": definitions, "facts": facts, "quotes": quotes, "full_text": full_text}

AUDIO_DISTRACTORS = [
    "It requires a 9V battery for operation.",
    "This technique is only suitable for live sound reinforcement.",
    "It introduces a significant phase shift at 1kHz.",
    "The primary application is for Foley recording.",
    "It creates a 6dB boost at 100Hz due to the proximity effect.",
    "This is achieved by reversing the polarity of the right channel.",
    "It requires a balanced connection to function correctly.",
    "The frequency response is limited to 20Hz-200Hz.",
    "It isolates the sound source from floor vibrations.",
    "This pattern rejects sound from the rear completely.",
    "It uses a moving coil within a magnetic field.",
    "It requires +48V phantom power to operate.",
    "The output impedance is typically 600 ohms.",
    "It is susceptible to electromagnetic interference.",
    "This results in a stereo image that collapses to mono.",
    "It maximizes the signal-to-noise ratio.",
    "This is commonly used for Decca Tree arrangements.",
    "It minimizes off-axis coloration.",
    "The diaphragm is made of ultra-thin aluminum.",
    "It handles high SPL without distortion.",
    "This setting engages a high-pass filter at 80Hz.",
    "It reduces the risk of feedback in live settings.",
    "This captures room ambience and natural reverb.",
    "It is essential for checking phase coherence.",
    "The signal is boosted by a transformer.",
    "It provides a figure-8 polar pattern.",
    "This allows for mid-side processing flexibility.",
    "It emulates the sound of vintage tube equipment.",
    "The capsule is internally shock-mounted.",
    "It keeps the signal cleaner over long cable runs."
]

# Helper to fetch parsed question
def get_parsed_question(topic_name, index, parsed_data, level_name, id_prefix):
    if not parsed_data: return None

    candidate_keys = TOPIC_MAPPING.get(topic_name, [])
    candidate_questions = []
    for key in candidate_keys:
        if key in parsed_data:
            candidate_questions.extend(parsed_data[key])
            
    if candidate_questions:
            q_idx = (index - 1) % len(candidate_questions)
            base_q = candidate_questions[q_idx]
            
            question = base_q.copy()
            question['id'] = f"{id_prefix}_{index}".replace(" ", "_").lower()
            question['level'] = level_name
            # Title override based on level
            if level_name == 'Basic':
                 question['title'] = "Basic Concept"
            else:
                 question['title'] = f"Understanding {topic_name}"
            return question

    return None

def generate_basic_question(data, topic_name, index, media_pool, parsed_basics=None):
    """
    Basic: Uses pre-parsed 120 questions if available.
    """
    if parsed_basics:
        q = get_parsed_question(topic_name, index, parsed_basics, "Basic", f"vol2_{topic_name}_basic")
        if q: return q

    # Fallback to old logic if no file or mapping found
    question = {}
    return None 
    
def generate_intermediate_question(data, topic_name, index, media_pool, parsed_intermediate=None):
    """
    Intermediate: Characteristics, Comparison, Context. Uses parsed file if available.
    """
    if parsed_intermediate:
        q = get_parsed_question(topic_name, index, parsed_intermediate, "Intermediate", f"vol2_{topic_name}_int")
        if q: return q

    if not data['definitions'] and not data['facts']: return None
    
    # Logic: Pick a term and ask for a characteristic
    # Or compare two things
    
    question = {
        "id": f"vol2_{topic_name}_int_{index}".replace(" ", "_").lower(),
        "level": "Intermediate",
        "type": "multi_choice",
        "title": f"Understanding {topic_name}",
        "question": f"Which of the following is a key characteristic of {topic_name}?",
        "answers": [] # Fill below
    }
    
    correct = random.choice(data['facts']) if data['facts'] else "Standard operating level."
    
    # Use global audio distractors
    possible_distractors = [d for d in AUDIO_DISTRACTORS if d != correct]
    random.shuffle(possible_distractors)
    others = possible_distractors[:3]
    
    question['answers'] = [
        {"text": correct, "correct": True},
        {"text": others[0], "correct": False},
        {"text": others[1], "correct": False},
        {"text": others[2], "correct": False} 
    ]
    random.shuffle(question['answers'])
    
    return question

def generate_advanced_question(data, topic_name, index, media_pool, parsed_advanced=None):
    """
    Advanced: Signal flow, frequency analysis, specific values
    Uses parsed file if available.
    """
    if parsed_advanced:
        q = get_parsed_question(topic_name, index, parsed_advanced, "Advanced", f"vol2_{topic_name}_adv")
        if q: return q
        
    return None # Pure file strategy


def generate_master_question(data, topic_name, index, media_pool, parsed_master=None):
    """
    Master: Expert nuance. Uses parsed file if available.
    """
    if parsed_master:
        q = get_parsed_question(topic_name, index, parsed_master, "Master", f"vol2_{topic_name}_master")
        if q: return q

    return None # Pure file strategy



def main():
    # Load Parsed Questions
    print(f"Parsing Basic Questions from {BASIC_QUIZ_FILE}...")
    BASIC_QUESTIONS = parse_quiz_file(BASIC_QUIZ_FILE)
    
    print(f"Parsing Intermediate Questions from {INTERMEDIATE_QUIZ_FILE}...")
    INTERMEDIATE_QUESTIONS = parse_quiz_file(INTERMEDIATE_QUIZ_FILE)
    
    print(f"Parsing Advanced Questions from {ADVANCED_QUIZ_FILE}...")
    ADVANCED_QUESTIONS = parse_quiz_file(ADVANCED_QUIZ_FILE)

    print(f"Parsing Master Questions from {MASTER_QUIZ_FILE}...")
    MASTER_QUESTIONS = parse_quiz_file(MASTER_QUIZ_FILE)

    # 1. Ingest
    full_parsed = []
    base_path = os.path.join(os.getcwd(), MD_DIR)
    
    for f_name in FILES:
        path = os.path.join(base_path, f_name)
        if os.path.exists(path):
            with open(path, 'r') as f:
                full_parsed.extend(extract_content(f.read()))
        else:
            print(f"Warning: file {path} not found")

    # 2. Structure
    structure = logical_structure(full_parsed)
    
    # 3. Generate
    final_output = []
    
    for part_key, part_data in structure.items():
        part_obj = {
            "title": f"{part_key}: {part_data['title']}",
            "id": part_key.lower().replace(" ", "_"),
            "topics": []
        }
        
        for topic_key, blocks in part_data['topics'].items():
            topic_obj = {
                "title": topic_key,
                "id": f"t_{topic_key.lower().replace(' ', '_')}",
                "levels": {
                    "basic": [],
                    "intermediate": [],
                    "advanced": [],
                    "master": []
                }
            }
            
            # Analyze content
            extracted = extract_definitions_and_facts(blocks)
            
            # Generate 10 per level = 40 questions
            levels = ["Basic", "Intermediate", "Advanced", "Master"]
            
            for level in levels:
                for i in range(1, 11):
                    q = None
                    if level == "Basic":
                        q = generate_basic_question(extracted, topic_key, i, None, parsed_basics=BASIC_QUESTIONS)
                    elif level == "Intermediate":
                        q = generate_intermediate_question(extracted, topic_key, i, None, parsed_intermediate=INTERMEDIATE_QUESTIONS)
                    elif level == "Advanced":
                        q = generate_advanced_question(extracted, topic_key, i, None, parsed_advanced=ADVANCED_QUESTIONS)
                    elif level == "Master":
                        q = generate_master_question(extracted, topic_key, i, None, parsed_master=MASTER_QUESTIONS)
                    
                    if q:
                        # Append common explanation structure
                        if q.get('explanation_text'):
                             expl_text = q['explanation_text']
                        else:
                             # Fallback: Construct relevant text using the Correct Answer + Generic Context
                             # Find correct answer text
                             correct_ans_text = "the correct choice."
                             for ans in q.get('answers', []):
                                 if ans.get('is_true') == "yes" or ans.get('correct') == True:
                                     correct_ans_text = ans['text']
                                     break
                             
                             expl_text = f"**Correct Answer:** {correct_ans_text}<br/><br/>" + extracted['full_text'][:150] + "..."
                        quote = random.choice(extracted['quotes']) if extracted['quotes'] else "Professional Tip: Critical listening is key."
                        
                        # Dynamic Image Selection Logic
                        safe_topic_name = re.sub(r'[^a-z0-9]+', '_', topic_key.lower()).strip('_')
                        default_image = f"/images/vol2/explanation_{safe_topic_name}.svg"
                        
                        image_path = default_image # Fallback
                        
                        # Keyword Mapping
                        q_text_lower = q['question'].lower()
                        
                        # 1. Microphone Types
                        if "dynamic" in q_text_lower or "moving coil" in q_text_lower:
                            image_path = "/images/vol2/explanation_mic_dynamic.svg"
                        elif "condenser" in q_text_lower or "capacitor" in q_text_lower:
                            image_path = "/images/vol2/explanation_mic_condenser.svg"
                        elif "ribbon" in q_text_lower:
                            image_path = "/images/vol2/explanation_mic_ribbon.svg"
                            
                        # 2. Gain & Signal
                        elif "gain" in q_text_lower and ("stage" in q_text_lower or "level" in q_text_lower or "meter" in q_text_lower):
                            image_path = "/images/vol2/explanation_gain_staging.svg"
                        elif "headroom" in q_text_lower or "clip" in q_text_lower or "noise floor" in q_text_lower:
                            image_path = "/images/vol2/explanation_gain_staging.svg"
                            
                        # 3. Polar Patterns (Existing specific files)
                        elif "cardioid" in q_text_lower and "hyper" not in q_text_lower and "super" not in q_text_lower:
                             if os.path.exists("public/images/vol2/explanation_understanding_polar_patterns_cardioid.svg"):
                                image_path = "/images/vol2/explanation_understanding_polar_patterns_cardioid.svg"
                        elif "figure-8" in q_text_lower or "bidirectional" in q_text_lower:
                             if os.path.exists("public/images/vol2/explanation_understanding_polar_patterns_figure_8.svg"):
                                image_path = "/images/vol2/explanation_understanding_polar_patterns_figure_8.svg"
                        elif "omni" in q_text_lower:
                             if os.path.exists("public/images/vol2/explanation_understanding_polar_patterns_omni.svg"):
                                image_path = "/images/vol2/explanation_understanding_polar_patterns_omni.svg"
                                
                        # 4. Techniques
                        elif "proximity" in q_text_lower:
                            image_path = "/images/vol2/explanation_proximity_effect.svg"
                        elif "3:1" in q_text_lower or "phase cancellation" in q_text_lower:
                            image_path = "/images/vol2/explanation_3_to_1_rule.svg"
                        elif "xy" in q_text_lower or "coincident" in q_text_lower:
                            image_path = "/images/vol2/explanation_stereo_xy.svg"
                        elif "spaced pair" in q_text_lower or "ab" in q_text_lower:
                            image_path = "/images/vol2/explanation_stereo_spaced.svg"

                        # Debug print for specific matches
                        if image_path != default_image:
                             print(f"MATCH: '{q['question'][:30]}...' -> {os.path.basename(image_path)}")
                        
                        # Generate HTML String directly (compact, like Volume 1)
                        # Fix Formatting: Convert **Bold** to <strong>Bold</strong>
                        expl_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', expl_text)
                        
                        html_explanation = (
                            f"<h3>Expert Insight</h3>"
                            f"<p>{expl_text}</p>"
                            f"<blockquote>{quote}</blockquote>"
                            f"<div class='explanation-media'>"
                            f"<img src='{image_path}' alt='Explanation Diagram' />"
                            f"</div>"
                        )

                        q['explanation'] = html_explanation
                        # DEBUG: Verify type
                        if i == 1 and level == "Basic" and "Gain" in topic_key:
                            print(f"DEBUGGING EXPLANATION TYPE: {type(q['explanation'])}")
                            print(f"CONTENT PREVIEW: {str(q['explanation'])[:50]}")
                        
                        # Add to specific level list
                        topic_obj['levels'][level.lower()].append(q)
            
            part_obj['topics'].append(topic_obj)
        final_output.append(part_obj)
        
        
    # Wrap in Volume Object for compatibility
    volume_object = {
        "id": "vol2",
        "title": "Volume 2: Microphones (Updated)",
        "parts": final_output
    }

    # Write
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(volume_object, f, indent=2)
    
    print(f"Generated Volume 2 with {len(final_output)} parts in {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
