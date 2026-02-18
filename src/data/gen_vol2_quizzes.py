import json
import random
import re

def text_to_html(text):
    # Simple markdown to html
    html = ""
    in_list = False
    
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Headers
        if line.startswith('### '):
            html += f"<h4>{line[4:]}</h4>"
            continue
        if line.startswith('**') and line.endswith('**'):
             html += f"<p><strong>{line[2:-2]}</strong></p>"
             continue
             
        # Lists
        if line.startswith('- '):
            if not in_list:
                html += "<ul>"
                in_list = True
            html += f"<li>{line[2:]}</li>"
        else:
            if in_list:
                html += "</ul>"
                in_list = False
            
            # Bold keys
            line = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', line)
            html += f"<p>{line}</p>"
            
    if in_list:
        html += "</ul>"
    return html

def get_definition(text):
    # Get first sentence
    # Remove markdown bold
    clean = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    sentences = clean.split('. ')
    if len(sentences) > 0:
        return sentences[0].strip() + '.'
    return clean[:100] + '...'

def get_bullets(text):
    bullets = []
    lines = text.split('\n')
    for line in lines:
        if line.strip().startswith('- '):
            clean = re.sub(r'\*\*(.*?)\*\*', r'\1', line.strip()[2:])
            bullets.append(clean)
    return bullets

with open('vol2_raw.json', 'r') as f:
    data = json.load(f)

output_vol = {
    "id": data['id'],
    "title": data['title'],
    "parts": []
}

for part in data['parts']:
    new_part = {
        "id": part['id'],
        "title": part['title'],
        "topics": []
    }
    
    for topic in part['topics']:
        print(f"Processing Topic: {topic['title']}")
        new_topic = {
            "id": topic['id'],
            "title": topic['title'],
            "levels": {
                "basic": [],
                "intermediate": []
            }
        }
        
        # Collect all definitions in this topic for distractors
        all_defs = []
        all_bullets = []
        for section in topic['sections']:
            desc = get_definition(section['text'])
            if len(desc) > 10:
                all_defs.append(desc)
            
            bullets = get_bullets(section['text'])
            all_bullets.extend(bullets)
            
        # Create Questions
        q_counter = 1
        for section in topic['sections']:
            title = section['title']
            text = section['text']
            explanation = f"<h3>{title}</h3>" + text_to_html(text)
            
            # BASIC QUESTION: Definition
            correct_def = get_definition(text)
            if len(correct_def) < 10: continue
            
            distractors = [d for d in all_defs if d != correct_def]
            # Pick 3 random
            if len(distractors) < 3:
                # If not enough, use generic ones
                chosen_distractors = distractors + ["A type of impedance mismatch.", "Signal loss due to cable length."]
                chosen_distractors = chosen_distractors[:3]
            else:
                chosen_distractors = random.sample(distractors, 3)
            
            answers = [{"text": correct_def, "is_true": "yes"}]
            for d in chosen_distractors:
                answers.append({"text": d, "is_true": "no"})
            random.shuffle(answers)
            
            q_basic = {
                "id": f"v2_{part['id']}_{topic['id']}_b_{q_counter}",
                "title": f"Define: {title}",
                "content": f"Which of the following best defines <strong>{title}</strong>?",
                "type": "multi_choice",
                "answers": answers,
                "explanation": explanation
            }
            new_topic['levels']['basic'].append(q_basic)
            
            # INTERMEDIATE QUESTION: Characteristics
            section_bullets = get_bullets(text)
            if len(section_bullets) > 0:
                correct_bullet = random.choice(section_bullets)
                other_bullets = [b for b in all_bullets if b not in section_bullets]
                
                if len(other_bullets) >= 3:
                    dist_bullets = random.sample(other_bullets, 3)
                    
                    answers_int = [{"text": correct_bullet, "is_true": "yes"}]
                    for d in dist_bullets:
                        answers_int.append({"text": d, "is_true": "no"})
                    random.shuffle(answers_int)
                    
                    q_int = {
                        "id": f"v2_{part['id']}_{topic['id']}_i_{q_counter}",
                        "title": f"Characteristics: {title}",
                        "content": f"Which characteristic applies to <strong>{title}</strong>?",
                        "type": "multi_choice",
                        "answers": answers_int,
                        "explanation": explanation
                    }
                    new_topic['levels']['intermediate'].append(q_int)
            
            q_counter += 1
            
        new_part['topics'].append(new_topic)
    
    output_vol['parts'].append(new_part)

with open('vol2_quizzes.json', 'w') as f:
    json.dump(output_vol, f, indent=2)
