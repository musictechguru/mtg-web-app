import json
import os

def remap_images():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    changes = 0

    # Remap Generated SVG -> Existing High Quality PNG
    # Based on user feedback that /public/images contains "pretty good" assets
    remap_pairs = {
        "/images/explanations/frequency_masking_diagram.svg": "/images/diagram_masking_eq_v2.png",
        "/images/explanations/frequency_spectrum_chart.svg": "/images/diagram_frequency_v2.png",
        "/images/explanations/graphic_eq_faceplate.svg": "/images/Graphic EQ.png"
    }

    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        # Handle both string and dict formats
                        current_img_obj = q.get('explanation_image') or q.get('img')
                        current_src = ""
                        
                        if isinstance(current_img_obj, dict):
                            current_src = current_img_obj.get('src', "")
                        elif isinstance(current_img_obj, str):
                            current_src = current_img_obj
                            
                        # Check for remapping
                        if current_src in remap_pairs:
                            new_src = remap_pairs[current_src]
                            q['explanation_image'] = new_src
                            q['img'] = new_src
                            changes += 1
                            # print(f"Remapped: {current_src} -> {new_src} in {q['content'][:30]}...")

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Remapped {changes} questions to use existing high-quality assets.")

if __name__ == "__main__":
    remap_images()
