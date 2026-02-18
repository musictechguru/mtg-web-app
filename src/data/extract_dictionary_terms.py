import glob
import re
import json
import os

def extract_terms():
    base_dir = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions"
    md_files = glob.glob(os.path.join(base_dir, "Volume*", "*.md"))
    
    all_terms = []
    
    for md_file in md_files:
        print(f"Processing {md_file}...")
        with open(md_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        vol_name = "Unknown Volume"
        current_subject = "Unknown Subject"
        current_question = None
        current_q_num = None
        
        # Simple finite state machine
        for i, line in enumerate(lines):
            line = line.strip()
            
            # Volume Name (usually first line)
            if i == 0 and line.startswith("# Music Tech Dictionary"):
                 vol_match = re.search(r'# Music Tech Dictionary - (.*)', line)
                 if vol_match:
                     vol_name = vol_match.group(1).strip()
            
            # Subject
            if line.startswith("# SUBJECT"):
                # Remove " (10 Questions)" suffix if present
                clean_subject = line.replace("# SUBJECT", "").strip()
                # Remove the number prefix "1: "
                clean_subject = re.sub(r'^\d+:\s*', '', clean_subject)
                # Remove suffix
                clean_subject = re.sub(r'\s*\(\d+ Questions\).*', '', clean_subject)
                current_subject = clean_subject
                
            # Question Header
            if line.startswith("### Question"):
                q_match = re.search(r'### Question (\d+)', line)
                if q_match:
                    current_q_num = q_match.group(1)
                    
                    # Look ahead for question text
                    # It's usually the next non-empty line
                    for j in range(i + 1, min(i + 5, len(lines))):
                        next_line = lines[j].strip()
                        if next_line and not next_line.startswith("-") and not next_line.startswith("**") and not next_line.startswith("###"):
                            current_question = next_line
                            
                            all_terms.append({
                                "volume": vol_name,
                                "subject": current_subject,
                                "question_num": current_q_num,
                                "question": current_question,
                                "file": md_file
                            })
                            break
                            
            # We could also track existing quotes here to skip them if needed
            # But the goal is to find *as many as possible*, maybe even better ones?
            # Or just fill gaps. The user said "related to entries", implying enrichment.

    print(f"Found {len(all_terms)} terms.")
    save_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_terms.json'
    with open(save_path, 'w', encoding='utf-8') as f:
        json.dump(all_terms, f, indent=4)
    print(f"Saved to {save_path}")

if __name__ == "__main__":
    extract_terms()
