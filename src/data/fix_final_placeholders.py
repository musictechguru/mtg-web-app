import json

def fix_final_placeholders():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    # Map placeholders to known good assets
    replacements = {
        "/images/placeholders/mt_placeholder_microphone.png": "/images/svg/mic_dynamic_construction.svg",
        "/images/placeholders/mt_placeholder_digital_audio.png": "/images/svg/diagram_digital_audio.svg",
        "/images/placeholders/mt_placeholder_studio_console.png": "/images/svg/recording_chain_flow.svg"
    }

    count = 0
    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img_obj = q.get('explanation_image') or q.get('img')
                        if not img_obj: continue
                        
                        src = ""
                        if isinstance(img_obj, dict): src = img_obj.get('src', "")
                        elif isinstance(img_obj, str): src = img_obj
                        
                        if src in replacements:
                            new_src = replacements[src]
                            q['explanation_image'] = new_src
                            q['img'] = new_src
                            count += 1
                            # print(f"Fixed placeholder: {src} -> {new_src}")

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Batch 6: Replaced {count} explicit placeholders.")

if __name__ == "__main__":
    fix_final_placeholders()
