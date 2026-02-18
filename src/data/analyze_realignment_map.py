import json
import os

def analyze_realignment():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app'
    json_path = os.path.join(base_path, 'src/data/dictionary_quizzes.json')
    
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print("Analyzing Potential Merges...")
    print("="*60)

    # analyze Vol 6-10 (Expected +12 offset)
    for vol_id in ['vol6', 'vol7', 'vol8', 'vol9', 'vol10']:
        vol = next((v for v in data['volumes'] if v['id'] == vol_id), None)
        if not vol: continue

        print(f"VOLUME: {vol_id}")
        basic_topics = []
        inter_topics = []
        
        for part in vol['parts']:
            for topic in part['topics']:
                levels = topic.get('levels', {}).keys()
                if 'basic' in levels and 'intermediate' not in levels:
                    basic_topics.append(topic)
                elif 'intermediate' in levels and 'basic' not in levels:
                    inter_topics.append(topic)
        
        # Check alignment
        print(f"  Basic Count: {len(basic_topics)}")
        print(f"  Inter Count: {len(inter_topics)}")
        
        limit = min(len(basic_topics), len(inter_topics))
        for i in range(limit):
            b_title = basic_topics[i]['title']
            i_title = inter_topics[i]['title']
            print(f"    Match? {basic_topics[i]['id']} ({b_title}) <-> {inter_topics[i]['id']} ({i_title})")
        print("-" * 60)

    # Analyze Vol 5 (Complex)
    vol5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
    if vol5:
        print("VOLUME: vol5 (Complex Analysis)")
        topics = []
        for part in vol5['parts']:
            topics.extend(part['topics'])
        
        for t in topics:
            levels = list(t.get('levels', {}).keys())
            print(f"  {t['id']} - {t['title']} {levels}")

if __name__ == "__main__":
    analyze_realignment()
