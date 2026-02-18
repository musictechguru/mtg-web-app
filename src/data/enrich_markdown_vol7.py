import re
import os
import json

# File Paths
BASIC_MD_FILE = "../../public/Quiz_questions/Volume 7/Volume7_Effects_Basic_Level_120Q.md"
INTERM_MD_FILE = "../../public/Quiz_questions/Volume 7/Volume7_Effects_Intermediate_Level_120Q.md"
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"

def load_quotes():
    if os.path.exists(QUOTES_FILE):
        with open(QUOTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def enrich_file(md_path, quotes_data):
    if not os.path.exists(md_path):
        print(f"File not found: {md_path}")
        return

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    updated_content = content
    
    # Iterate through all subjects in the quotes data
    for subject_num, data in quotes_data.items():
        subject_title = data.get("subject")
        quotes = data.get("quotes", [])
        
        if not quotes:
            continue
            
        print(f"Processing Subject {subject_num}: {subject_title}")
        
        # Regex to find the subject section
        # Pattern looks for "# SUBJECT X:"
        subject_pattern = re.compile(r'# SUBJECT ' + re.escape(subject_num) + r':.*?(?=# SUBJECT|\Z)', re.DOTALL)
        
        match = subject_pattern.search(updated_content)
        if match:
            subject_block = match.group(0)
            original_block = subject_block
            
            # QUOTE INJECTION LOGIC
            # 1. Look for existing "**Expert Quote:**" lines to replace (if any)
            # 2. If none, look for "**Answer: X**" lines to append to.
            
            import itertools
            quote_cycle = itertools.cycle(quotes)
            
            if "**Expert Quote:**" in subject_block:
                # Replace existing
                quote_split_pattern = re.compile(r'(\*\*Expert Quote:\*\* ")(.*?)(")')
                def replace_quote(m, quote_iter):
                    try:
                        new_quote = next(quote_iter)
                        return f'**Expert Quote:** "{new_quote["text"]} - {new_quote["author"]}"'
                    except StopIteration:
                        return m.group(0)
                
                new_subject_block = quote_split_pattern.sub(lambda m: replace_quote(m, quote_cycle), subject_block)
                
            else:
                # Inject new quotes after Answer
                print(f"  -> No placeholders found. Injecting new quotes for Subject {subject_num}...")
                
                # Regex to find Answer line: **Answer: A**
                # We will replace it with: **Answer: A**\n\n**Expert Quote:** "..."
                
                answer_pattern = re.compile(r'(\*\*Answer: [A-D]\*\*)')
                
                def inject_quote(m, quote_iter):
                    try:
                        new_quote = next(quote_iter)
                        return f'{m.group(1)}\n\n**Expert Quote:** "{new_quote["text"]} - {new_quote["author"]}"'
                    except StopIteration:
                         return m.group(0)

                new_subject_block = answer_pattern.sub(lambda m: inject_quote(m, quote_cycle), subject_block)

            if new_subject_block != original_block:
                updated_content = updated_content.replace(original_block, new_subject_block)
                print(f"  -> Successfully enriched Subject {subject_num}")
            else:
                 print(f"  -> No changes made to Subject {subject_num}")

    if updated_content != content:
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated {md_path}")
    else:
        print(f"No changes for {md_path}")

def main():
    all_quotes = load_quotes()
    
    # Process Basic
    basic_quotes = all_quotes.get("Volume 7 Basic", {})
    if basic_quotes:
        print("Enriching Basic Level...")
        enrich_file(BASIC_MD_FILE, basic_quotes)
        
    # Process Intermediate
    interm_quotes = all_quotes.get("Volume 7 Intermediate", {})
    if interm_quotes:
        print("Enriching Intermediate Level...")
        enrich_file(INTERM_MD_FILE, interm_quotes)

if __name__ == "__main__":
    main()
