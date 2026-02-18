import re
import os
import json

# File Path
MD_FILE = "../../public/Quiz_questions/Volume 6/Volume6_EQ_Stereo_Basic_Level_120Q.md"
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"

def load_quotes():
    if os.path.exists(QUOTES_FILE):
        with open(QUOTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def enrich_markdown():
    quotes_db = load_quotes().get("Volume 6", {})
    
    with open(MD_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by subjects
    subjects = re.split(r'(# SUBJECT \d+:.*)', content)
    
    new_content = ""
    current_subject_num = 0
    
    for section in subjects:
        # Check if this is a header
        header_match = re.match(r'# SUBJECT (\d+):', section)
        if header_match:
            current_subject_num = header_match.group(1)
            new_content += section
            continue
            
        if not current_subject_num:
            # Add preamble/intro text
            new_content += section
            continue
            
        # Process Content of the Subject
        # Split into questions
        questions = re.split(r'(### Question \d+)', section)
        
        current_q_num = None
        for q_chunk in questions:
            if q_chunk.strip().startswith('### Question'):
                # It's a header, just add it
                new_content += q_chunk
                # Extract question number for lookup
                q_num_match = re.search(r'### Question (\d+)', q_chunk)
                if q_num_match:
                    current_q_num = q_num_match.group(1)
                continue
            
            # Look up dynamic quotes from JSON
            subject_quotes = quotes_db.get(str(current_subject_num), {}).get("quotes", [])
            
            if subject_quotes and current_q_num:
                 quote_idx = int(current_q_num) % len(subject_quotes)
                 quote_obj = subject_quotes[quote_idx]
                 new_quote_text = f"**Expert Quote:** \"{quote_obj['text']} - {quote_obj['author']}\""
                 
                 # Regex replace the existing quote line
                 # Pattern matches **Expert Quote:** "..." or **Expert Quote:** ...
                 if "**Expert Quote:**" in q_chunk:
                     q_chunk = re.sub(r'\*\*Expert Quote:\*\*.*', new_quote_text, q_chunk)
                 else:
                     # If quote is missing, inject it after the Answer or Image
                     if "**Image:**" in q_chunk:
                         q_chunk = re.sub(r'(\*\*Image:\*\*.*\n)', r'\1' + new_quote_text + '\n', q_chunk)
                     elif "**Answer:" in q_chunk:
                         # Find the Answer line and append quote after it (and its newlines)
                         # Simple regex to find "**Answer: X" - using \s for whitespace
                         if re.search(r'\*\*Answer:\s*[A-D]', q_chunk):
                             q_chunk = re.sub(r'(\*\*Answer:\s*[A-D].*)', r'\1\n\n' + new_quote_text + '\n', q_chunk)
            else:
                 if not subject_quotes:
                     pass

            
            new_content += q_chunk

    with open(MD_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Enrichment complete.")
    
if __name__ == "__main__":
    enrich_markdown()
