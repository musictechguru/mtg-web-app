import json
import os
import shutil
import re

# internal paths
base_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
json_path = os.path.join(base_dir, 'src/data/dictionary_quizzes.json')
public_dir = os.path.join(base_dir, 'public')

# target paths
output_dir = os.path.join(base_dir, 'collected_expert_assets')
images_out_dir = os.path.join(output_dir, 'images')
quotes_out_dir = os.path.join(output_dir, 'quotes')

# Ensure output directories exist
os.makedirs(images_out_dir, exist_ok=True)
os.makedirs(quotes_out_dir, exist_ok=True)

# Regex patterns
img_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']')
quote_pattern = re.compile(r'<blockquote>(.*?)</blockquote>', re.DOTALL)

print(f"Reading {json_path}...")
with open(json_path, 'r') as f:
    data = json.load(f)

extracted_images = set()
extracted_quotes = []

def process_explanation(expl, q_id, title):
    if not expl:
        return
    
    # Extract Images
    imgs = img_pattern.findall(expl)
    for img_src in imgs:
        # img_src is likely /images/...
        # Remove leading slash to join
        rel_path = img_src.lstrip('/')
        src_abs = os.path.join(public_dir, rel_path)
        
        if os.path.exists(src_abs):
            filename = os.path.basename(src_abs)
            dest_abs = os.path.join(images_out_dir, filename)
            
            # Handle duplicates (same filename, different path?) - unlikely given flattened structure request
            # We'll just copy it. If unique set is identifying by path, we're good.
            if src_abs not in extracted_images:
                try:
                    shutil.copy2(src_abs, dest_abs)
                    extracted_images.add(src_abs)
                except Exception as e:
                    print(f"Failed to copy {src_abs}: {e}")
        else:
            print(f"Warning: Image not found: {src_abs}")

    # Extract Quotes
    qs = quote_pattern.findall(expl)
    for q_text in qs:
        # Clean tags if any inside blockquote ? normally simple text or em
        # We will keep the html for fidelity or strip it? User said "copies of quotes".
        # Let's simple create a record
        clean_text = re.sub(r'<[^>]+>', '', q_text).strip()
        if clean_text:
            extracted_quotes.append({
                "id": q_id,
                "title": title,
                "quote": clean_text,
                "raw_html": q_text
            })

# Traverse JSON
for vol in data.get('volumes', []):
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            levels = topic.get('levels', {})
            for lvl_name, questions in levels.items():
                for q in questions:
                    process_explanation(q.get('explanation', ''), q.get('id'), q.get('title'))

print(f"Copied {len(extracted_images)} unique images.")
print(f"Found {len(extracted_quotes)} quotes.")

# Write quotes to file
quotes_md_path = os.path.join(quotes_out_dir, 'all_quotes.md')
with open(quotes_md_path, 'w') as f:
    f.write("# Collected Expert Quotes\n\n")
    for item in extracted_quotes:
        f.write(f"## {item['title']} ({item['id']})\n")
        f.write(f"> {item['quote']}\n\n")

print(f"Quotes saved to {quotes_md_path}")
