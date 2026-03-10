import json

filepath = 'src/data/dictionary_quizzes.json'
with open(filepath, 'r') as f:
    data = json.load(f)

total_questions = 0
missing_quotes = []

for vol in data.get('volumes', []):
    vol_title = vol.get('title', '')
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            topic_title = topic.get('title', '')
            for level_name, questions in topic.get('levels', {}).items():
                for q in questions:
                    total_questions += 1
                    quote_obj = q.get('expert_quote')
                    
                    is_missing = False
                    reason = ""
                    
                    if not quote_obj:
                        is_missing = True
                        reason = "Missing 'expert_quote' object"
                    elif not isinstance(quote_obj, dict):
                        is_missing = True
                        reason = f"'expert_quote' is not an object (is {type(quote_obj)})"
                    else:
                        text = quote_obj.get('text', '').strip()
                        author = quote_obj.get('author', '').strip()
                        if not text:
                            is_missing = True
                            reason = "Missing 'text'"
                        elif not author:
                            is_missing = True
                            reason = "Missing 'author'"
                            
                    if is_missing:
                        missing_quotes.append({
                            "id": q.get('id', 'Unknown'),
                            "path": f"{vol_title} -> {topic_title} ({level_name})",
                            "reason": reason
                        })

print(f"Total questions scanned: {total_questions}")
print(f"Total missing/incomplete quotes: {len(missing_quotes)}")

if missing_quotes:
    with open('missing_dict_quotes_report.json', 'w') as f:
        json.dump(missing_quotes, f, indent=4)
    print("Detailed report saved to missing_dict_quotes_report.json")
else:
    print("All questions have complete quotes and authors!")
