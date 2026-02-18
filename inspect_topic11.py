
import json

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

    # Flatten topics from all parts in Volume 2 to find the 11th one
    all_topics = []
    if 'parts' in vol2:
        for part in vol2['parts']:
            if 'topics' in part:
                all_topics.extend(part['topics'])
    
    if len(all_topics) < 11:
        print(f"Volume 2 only has {len(all_topics)} topics. Cannot find Topic 11.")
        exit()

    target_topic = all_topics[10] # 0-indexed
    print(f"Topic 11: {target_topic['title']} (ID: {target_topic['id']})")
    
    print("\nCurrent Images:")
    
    def extract_images(question_list, level_name):
        for q in question_list:
            img = q.get('img')
            exp_img = q.get('explanation_image')
            
            if img:
                print(f"  [{level_name}] Q: {q['title']} - Img: {img}")
            
            # if exp_img:
            #     if isinstance(exp_img, dict):
            #         src = exp_img.get('src')
            #         print(f"  [{level_name}] Q: {q['title']} - ExpImg: {src}")
            #     else:
            #         print(f"  [{level_name}] Q: {q['title']} - ExpImg: {exp_img}")

    for level in ['basic', 'intermediate', 'advanced']:
        if level in target_topic['levels']:
             extract_images(target_topic['levels'][level], level)

except Exception as e:
    print(f"Error: {e}")
