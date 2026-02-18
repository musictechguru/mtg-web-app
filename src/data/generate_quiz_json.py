import os
import re
import json

# Configuration
INPUT_DIR = "../../public/Quiz_questions"
OUTPUT_FILE = "dictionary_quizzes_generated.json"

# Volume Title Mapping
VOLUME_TITLES = {
    "1": "Volume 1: Fundamentals & Recording",
    "2": "Volume 2: Microphones",
    "3": "Volume 3: Synthesis",
    "4": "Volume 4: Sampling",
    "5": "Volume 5: Dynamic Processing",
    "6": "Volume 6: EQ & Stereo",
    "7": "Volume 7: FX & Processors",
    "8": "Volume 8: Mastering",
    "9": "Volume 9: Acoustics",
    "10": "Volume 10: Equipment"
}

# Schema Structure
final_json = {
    "volumes": []
}

def parse_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by Subject Headers (### SUBJECT X: TITLE or ## TOPIC X: TITLE)
    # Regex handles:
    # # SUBJECT 1: Title
    # ## TOPIC 1: Title
    # Case insensitive
    subjects = re.split(r'#+\s*(?:SUBJECT|TOPIC)\s*\d+:\s*(.+)', content, flags=re.IGNORECASE)
    
    # The first element is pre-content (ignore), then we have Title, Content, Title, Content...
    parsed_topics = []
    
    # Iterate in pairs (Title, Content)
    for i in range(1, len(subjects), 2):
        topic_title = subjects[i].strip()
        topic_content = subjects[i+1]
        
        questions = []
        
        # Split by Questions (### Question \d+)
        # Regex: ### Question \d+
        q_blocks = re.split(r'### Question \d+', topic_content)
        
        # Skip first block (preamble)
        for q_block in q_blocks[1:]:
            lines = q_block.strip().split('\n')
            
            # 1. Extract Question Text (everything until the options)
            question_text_lines = []
            options = []
            answer_char = None
            
            mode = "question"
            for line in lines:
                line = line.strip()
                if not line: continue
                if line.startswith('---'): continue
                
                # Check for Option
                if re.match(r'- [A-D]\)', line):
                    mode = "options"
                    options.append(line)
                # Check for Answer
                elif line.startswith('**Answer:'):
                    match = re.search(r'\*\*Answer:\s*([A-D])', line)
                    if match:
                        answer_char = match.group(1)
                elif mode == "question":
                    question_text_lines.append(line)

            question_text = " ".join(question_text_lines).strip()
            
            # Extract Enriched Content (Expert Explanation, Quote, Image)
            # We look for lines starting with specific markers within the block
            expert_explanation = ""
            explanation_image = None
            expert_quote = None
            
            # Re-scan the lines for these specific fields which might be mixed in or at the end
            # However, the previous loop might have consumed them into question_text if we are not careful.
            # actually, the previous loop only stops at "- A)" or "**Answer:".
            # The "Expert Explanation" usually comes AFTER the Answer in my proposed format.
            # So we need to look at lines AFTER the answer line.
            
            # Let's find the answer line index
            answer_line_idx = -1
            for idx, line in enumerate(lines):
                 if line.startswith('**Answer:'):
                     answer_line_idx = idx
                     break
            
            if answer_line_idx != -1:
                # Parse content AFTER the answer for enrichment
                post_answer_lines = lines[answer_line_idx+1:]
                
                current_section = None
                quote_text = []
                quote_author = ""
                
                for line in post_answer_lines:
                    line = line.strip()
                    if not line or line.startswith('---'): continue
                    
                    if line.startswith('**Expert Explanation:**'):
                        current_section = "explanation"
                        expert_explanation = line.replace('**Expert Explanation:**', '').strip()
                    elif line.startswith('**Expert Quote:**'):
                        current_section = "quote"
                        # Format: "Quote text" - Author
                        raw_quote = line.replace('**Expert Quote:**', '').strip()
                        if " - " in raw_quote:
                            parts = raw_quote.rsplit(" - ", 1)
                            expert_quote = {"text": parts[0].strip('"'), "author": parts[1].strip().strip('"')}
                        else:
                            expert_quote = {"text": raw_quote.strip('"'), "author": "Anonymous"}
                    elif line.startswith('**Image:**'):
                        current_section = "image"
                        # Format: ![Alt](src) or just src
                        # Regex for markdown image
                        img_match = re.search(r'!\[(.*?)\]\((.*?)\)', line)
                        if img_match:
                            explanation_image = {"src": img_match.group(2), "alt": img_match.group(1)}
                        else:
                             explanation_image = {"src": line.replace('**Image:**', '').strip(), "alt": "Diagram"}
                    elif current_section == "explanation":
                         expert_explanation += " " + line
            
            if not question_text or not options or not answer_char:
                continue

            # Format Options into object list
            formatted_options = []
            for opt in options:
                # Remove "- A) " prefix
                clean_opt = re.sub(r'- [A-D]\)\s*', '', opt)
                is_correct = "yes" if opt.startswith(f'- {answer_char})') else "no"
                formatted_options.append({
                    "text": clean_opt,
                    "is_true": is_correct
                })
            
            questions.append({
                "title": f"Question {len(questions) + 1}",
                "content": question_text,
                "type": "multi_choice",
                "answers": formatted_options,
                "explanation": "", # Legacy Placeholder
                "expert_explanation": expert_explanation,
                "explanation_image": explanation_image,
                "expert_quote": expert_quote
            })
            
        parsed_topics.append({
            "title": topic_title,
            "questions": questions
        })
        
    return parsed_topics

def main():
    # 1. Walk through Volumes
    # We expect folders like "Volume 1", "Volume 2", etc.
    if not os.path.exists(INPUT_DIR):
        print(f"Error: Directory {INPUT_DIR} not found.")
        return

    # Sort volumes naturally (Volume 1, Volume 2, ... Volume 10)
    vol_dirs = sorted([d for d in os.listdir(INPUT_DIR) if os.path.isdir(os.path.join(INPUT_DIR, d)) and "Volume" in d], 
                      key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 999)

    for vol_dir in vol_dirs:
        vol_path = os.path.join(INPUT_DIR, vol_dir)
        vol_num = re.search(r'\d+', vol_dir).group()
        
        # Get Volume Title from Map or Default
        vol_title = VOLUME_TITLES.get(vol_num, f"Volume {vol_num}")
        
        # Find markdown files
        md_files = [f for f in os.listdir(vol_path) if f.endswith('.md')]
        
        # We need to pair them or just process them.
        # Structure: Volume -> Parts -> Topics -> Levels
        # BUT the markdown structure is: Volume -> Subject (Topic) -> Questions (Level implied by filename)
        
        # We will create a single "Part 1" for simplicity since markdowns don't seem to split by Part explicitly in file structure
        # Wait, the folder names sometimes have "Part 1 - 6". 
        
        # Let's aggregate all topics from all files in the volume.
        # Key: Normalized Title -> { display_title: Str, levels: { basic: [], ... } }
        volume_topics_map = {} 
        
        for md_file in md_files:
            # Determine level based on filename
            is_basic = "basic" in md_file.lower()
            is_intermediate = "intermediate" in md_file.lower()
            
            # Skip if it's not one of our target levels
            if not (is_basic or is_intermediate):
                continue

            level = "basic" if is_basic else "intermediate"

            parsed_topics = parse_markdown_file(os.path.join(vol_path, md_file))
            
            for i, topic in enumerate(parsed_topics):
                # Normalize title for merging: "Subject 1: Reverb" -> "reverb"
                # But headers are "SUBJECT 1: REVERB..."
                # The parse_markdown_file returns the title part after the "SUBJECT X: " prefix.
                # So topic['title'] is "REVERB FUNDAMENTALS (10 Questions)" or similar.
                # We need to clean it up further for robust matching.

                raw_title = topic['title'].strip()
                # Remove "(10 Questions)" or similar suffix if present
                clean_title = re.sub(r'\s*\(\d+\s*Questions\).*', '', raw_title, flags=re.IGNORECASE).strip()
                
                # Normalize key
                t_key = clean_title.lower()
                
                if t_key not in volume_topics_map:
                    volume_topics_map[t_key] = {
                        "display_title": clean_title, 
                        "levels": {},
                        "sort_index": i if level == "basic" else i + 100 # Prefer Basic order, append others? 
                        # Actually, if we want to respect the order in the file:
                        # If Basic implies the primary order, we use that.
                    }
                    
                    # If this is the first time we see this topic, assign a sort index.
                    # If it appeared in Basic (usually processed first or we can force it), use that index.
                    # But we are iterating files.
                    
                # Update display title if the new one is "better" (e.g. not ALL CAPS, or longer/more descriptive)
                # But we stripped the title for the key. Let's keep a nice display title.
                current_display = volume_topics_map[t_key]["display_title"]
                
                # Heuristic: Prefer Title Case over UPPER CASE
                if (current_display.isupper() and not raw_title.isupper()):
                     volume_topics_map[t_key]["display_title"] = clean_title
                
                # Merge questions
                volume_topics_map[t_key]["levels"][level] = topic['questions']

        # Construct Volume Object
        topics_list = []
        
        # Python 3.7+ preserves insertion order for dicts.
        # Since we iterate through the file list (Basic then Intermediate), 
        # the order of keys in volume_topics_map should be roughly correct.
        sorted_keys = list(volume_topics_map.keys())
        
        # Sort by the order they appeared (using sort_index is tricky across files)
        # Simplified approach: Use the t_key sorted by when it was added?
        # Python 3.7+ dicts preserve insertion order. 
        # So passing through Basic file first sets the order.
        # Intermediate topics that didn't match will be appended at the end.
        
        for key in sorted_keys:
            data = volume_topics_map[key]
            t_title = data["display_title"]
            levels = data["levels"]
            
            # Assign IDs - We can't strictly use v1_t1 because order might have changed vs previous versions.
            # But the requirement is likely just unique IDs.
            # Let's generate a stable ID or just use counter.
            t_id = f"v{vol_num}_t{len(topics_list)+1}"
            
            # Update Question IDs to include the new Topic ID
            for lvl_name, q_list in levels.items():
                for q_idx, q in enumerate(q_list):
                    q['id'] = f"{t_id}_{lvl_name[0]}_{q_idx+1}"
            
            topics_list.append({
                "id": t_id,
                "title": t_title, 
                "levels": levels
            })
            
        final_json["volumes"].append({
            "id": f"vol{vol_num}",
            "title": vol_title,
            "parts": [
                {
                    "id": f"v{vol_num}_p1",
                    "title": "All Topics",
                    "topics": topics_list
                }
            ]
        })

    # Write Output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_json, f, indent=4)
    
    print(f"Successfully generated {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
