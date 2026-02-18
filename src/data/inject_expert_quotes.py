import json
import os
import re

def inject_quotes():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    quotes_path = os.path.join(base_path, 'collected_expert_assets/quotes/music-production-quotes.md')
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    # 1. Parse Quotes
    quotes = []
    current_author = "Unknown"
    
    try:
        with open(quotes_path, 'r') as f:
            lines = f.readlines()
            
        for line in lines:
            line = line.strip()
            if line.startswith('## '):
                current_author = line.replace('## ', '').strip()
            elif line.startswith('> "'):
                text = line.replace('> "', '').replace('"', '').strip()
                # Check if author is inline (e.g. — Rick Rubin)
                if " — " in text:
                    parts = text.split(" — ")
                    text = parts[0].strip()
                    author = parts[1].strip()
                else:
                    author = current_author
                
                quotes.append({
                    "text": text,
                    "author": author,
                    "used": False
                })
        print(f"Loaded {len(quotes)} quotes.")
        
    except Exception as e:
        print(f"Error loading quotes: {e}")
        return

    # 2. Topic/Keyword Mapping
    # Map keywords in (Topic Title + Question Content) -> Relevant Quotes
    # This is a bit manual but yields better results than random
    
    keyword_map = {
        "recording": ["magic in recording studios", "capturing the emotion", "microphone", "signal path", "preamp"],
        "mixing": ["mixing is not just", "balance", "faders", "space", "pan", "eq", "compression"],
        "mastering": ["mastering is", "final step", "loudness", "translation"],
        "production": ["producer", "vision", "arrangement", "psychotherapy", "limitation"],
        "equipment": ["gear", "tools", "technology", "console", "hardware", "limitations"],
        "creativity": ["art", "inspiration", "mistake", "failure", "rules"],
        "listening": ["ears", "listen", "monitor", "sound quality"],
        "experiment": ["experiment", "try it", "unknown", "adventure"]
    }

    # Helper to find a quote for a specific text blob
    def find_best_quote(text_blob):
        text_blob = text_blob.lower()
        
        # 1. Try specific keywords
        for key, phrases in keyword_map.items():
            if key in text_blob:
                # Find quotes containing these phrases
                candidates = [q for q in quotes if not q['used'] and any(p in q['text'].lower() for p in phrases)]
                if candidates:
                    q = candidates[0]
                    q['used'] = True
                    return q

        # 2. Fallback to general category matching if possible, or just "Production/Creativity" for general stuff
        # (This is a simplified logic, real logic would be more complex)
        
        # 3. If no specific match, return a random unused "General Wisdom" quote
        # prioritizing short, punchy ones
        candidates = [q for q in quotes if not q['used']]
        if candidates:
            q = candidates[0]
            q['used'] = True
            return q
            
        return None

    # 3. Inject into JSON
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        changes = 0
        
        for vol in data['volumes']:
            for part in vol['parts']:
                for topic in part['topics']:
                    for level, qs in topic.get('levels', {}).items():
                        for q in qs:
                            # Only replace if existing quote is "generic" or missing
                            current_q = q.get('expert_quote', {})
                            current_text = current_q.get('text', "")
                            
                            is_generic = False
                            if not current_text: is_generic = True
                            if "Terms like" in current_text: is_generic = True
                            if "Mastering this concept" in current_text: is_generic = True
                            if "Fact" in current_q.get('author', ""): is_generic = True
                            if "Dictionary" in current_q.get('author', ""): is_generic = True
                            
                            if is_generic:
                                # Context for matching: Volume + Topic + Question
                                context = f"{vol['title']} {topic['title']} {q['content']}"
                                new_quote = find_best_quote(context)
                                
                                if new_quote:
                                    q['expert_quote'] = {
                                        "text": new_quote['text'],
                                        "author": new_quote['author']
                                    }
                                    changes += 1
                                    # print(f"  -> Replaced quote for '{q['content'][:30]}...'")

        with open(json_path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Injected {changes} new expert quotes.")

    except Exception as e:
        print(f"Error processing JSON: {e}")

if __name__ == "__main__":
    inject_quotes()
