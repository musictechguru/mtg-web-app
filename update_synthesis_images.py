import json

def update_synthesis_images():
    json_path = 'src/data/dictionary_quizzes.json'
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            
        print("Updating Basic Synthesis Images...")
        updates = {
            "Q2": {"text": "What does VCO stand for?", "img": "/images/gen/synth_vco_module.png"},
            "Q4": {"text": "What does VCA stand for?", "img": "/images/gen/synth_vca_module.png"},
            "Q5": {"text": "What is the purpose of an envelope generator?", "img": "/images/gen/synth_envelope_generator_module.png"},
            "Q6": {"text": "What does ADSR stand for?", "img": "/images/explanations/explanation_adsr_envelope.png"},
            "Q8": {"text": "What is the typical frequency range of an LFO?", "img": "/images/gen/synth_lfo_frequency_chart.png"}
        }
        
        count = 0
        
        for volume in data.get('volumes', []):
            for part in volume.get('parts', []):
                for topic in part.get('topics', []):
                    # Target BASIC SYNTHESIS COMPONENTS
                    if topic.get('title') == "BASIC SYNTHESIS COMPONENTS":
                        if 'levels' in topic and 'basic' in topic['levels']:
                            questions = topic['levels']['basic']
                            
                            for i, q in enumerate(questions):
                                q_text = q.get('content', '')
                                
                                # Check against our updates map
                                # We can check simple inclusion of key phrases
                                matched_key = None
                                for k, v in updates.items():
                                    if v["text"] in q_text:
                                        matched_key = k
                                        break
                                        
                                if matched_key:
                                    q['img'] = updates[matched_key]['img']
                                    print(f"Updated {matched_key}: {q_text[:30]}... -> {q['img']}")
                                    count += 1

        if count > 0:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=4)
            print(f"Successfully updated {count} questions.")
        else:
            print("No updates made. Check topic title or question text.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_synthesis_images()
