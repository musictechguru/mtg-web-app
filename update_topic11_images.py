
import json

# Define the image swaps mapping
# Q Title -> New Image Path
# Using a dictionary for precise replacement based on question content/ID if possible, 
# but here mapping by index/title within the level for simplicity as per previous inspection.

# Best images found:
# Dynamic: "public/images/gen/diagram_dynamic_capsule.png" (Better than svg)
# Condenser: "public/images/MT Pictures/Neumann U87 Microphone.png" (Real photo!)
# Ribbon: "public/images/MT Pictures/RCA_44-BX_Bi-Directional_Velocity_Microphone.jpg" or "public/images/MT Pictures/Ribbon Microphone.png"
# Polar Patterns: "public/images/vol2/explanation_understanding_polar_patterns.svg" (Keep SVGs for diagrams, they are good, unless user hates them. User said "terrible images", usually means low res or bad cartoons. The SVGs might be fine but maybe the "mic_dynamic.svg" is the ugly one.)
# Phantom Power: "public/images/svg/phantom_power.svg" - Do we have a better one? Maybe not.
# Large vs Small Diaphragm: "public/images/svg/large_vs_small_diaphragm.svg" - Keep for now.

# Strategy: Replace the "main" mic images with the high-quality photos/renders found.

swaps = {
    # BASIC
    "v2_t11_b_1": "/images/gen/diagram_dynamic_capsule.png", # Q1: Dynamic Mic (was svg)
    "v2_t11_b_4": "/images/MT Pictures/Neumann U87 Microphone.png", # Q4: Condenser Mic (was svg)
    "v2_t11_b_6": "/images/gen/diagram_dynamic_capsule.png", # Q6: Dynamic construction (was svg)
    
    # INTERMEDIATE
    "v2_t11_i_2": "/images/gen/diagram_dynamic_capsule.png", # Q2: Dynamic (was svg)
    "v2_t11_i_8": "/images/MT Pictures/RCA_44-BX_Bi-Directional_Velocity_Microphone.jpg", # Q8: Ribbon Mic (was svg)
    "v2_t11_i_9": "/images/gen/diagram_condenser_capsule.png", # Q9: Condenser Capsule (Already good, ensure it's set)
    "v2_t11_i_10": "/images/gen/diagram_dynamic_capsule.png", # Q10: Dynamic (was svg)
}

try:
    with open('src/data/dictionary_quizzes.json', 'r') as f:
        data = json.load(f)

    # valid volumes
    vol2 = None
    for vol in data['volumes']:
        if vol['id'] == 'vol2' or 'Volume 2' in vol['title']:
            vol2 = vol
            break
    
    if not vol2:
        print("Volume 2 not found.")
        exit()

    # Find Topic 11
    all_topics = []
    if 'parts' in vol2:
        for part in vol2['parts']:
            if 'topics' in part:
                all_topics.extend(part['topics'])
    
    if len(all_topics) < 11:
        print("Topic 11 not found.")
        exit()

    target_topic = all_topics[10]
    print(f"Updating Topic: {target_topic['title']}")

    updated_count = 0

    for level in ['basic', 'intermediate', 'advanced']:
        if level in target_topic['levels']:
            for q in target_topic['levels'][level]:
                qid = q.get('id')
                if qid in swaps:
                    new_img = swaps[qid]
                    print(f"  Swapping {qid} image to: {new_img}")
                    
                    # update 'img' if it exists or create it
                    q['img'] = new_img
                    
                    # Update explanation image too if it was the same bad svg
                    # But often explanation image is a diagram. 
                    # If the question image is now a photo, the explanation might still need to be a diagram?
                    # User said "poor quality images". Photos are better for identification questions.
                    
                    # Let's set 'img' (displayed with question) to the new high quality one.
                    # We will leave 'explanation_image' alone unless it refers to the exact same bad SVG.
                    
                    updated_count += 1

    with open('src/data/dictionary_quizzes.json', 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Successfully updated {updated_count} images.")

except Exception as e:
    print(f"Error: {e}")
