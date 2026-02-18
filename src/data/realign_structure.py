import json
import os

def realign_structure():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    # --- Realignment Strategy ---
    # Vol 6-10: Standard Merge (Basic ID N, Inter ID N+12)
    # Vol 5: Custom Map

    def merge_topics(vol_id, mapping_logic):
        vol = next((v for v in data['volumes'] if v['id'] == vol_id), None)
        if not vol: return
        
        print(f"Realigning {vol_id}...")
        
        for part in vol['parts']:
            new_topics = []
            # Keep tracks of IDs we've already merged so we don't add them twice
            merged_ids = set()
            
            # Map of ID -> Topic Object
            topic_map = {t['id']: t for t in part['topics']}
            
            # Preserve order based on the "Base" topics
            for t in part['topics']:
                if t['id'] in merged_ids: continue
                
                target_id = mapping_logic(t['id'], part['topics'])
                
                if target_id and target_id != t['id']:
                    # This implies t is a "Secondary" topic that should be merged INTO target_id
                    # We skip it here, it will be processed when we hit target_id or if we handled it in target_id
                    pass
                else:
                    # This is a Base topic (or has no match). 
                    # Let's look for its pair.
                    
                    # Logic: If this is 'basic', look for 'inter'.
                    # Or simpler: For Vol 6-10, T(i) matches T(i+12).
                    
                    # Let's define specific pairs for each volume to be safe.
                    pass

    # Simplified Approach: Build new topic lists for each volume
    
    def process_vol6_to_10(vol_id):
        vol = next((v for v in data['volumes'] if v['id'] == vol_id), None)
        if not vol: return

        for part in vol['parts']:
            current_topics = part['topics']
            basic_topics = [t for t in current_topics if 'basic' in t.get('levels', {})]
            inter_topics = [t for t in current_topics if 'intermediate' in t.get('levels', {})]
            
            # If perfectly aligned (12 vs 12), merge 1:1
            if len(basic_topics) == 12 and len(inter_topics) == 12:
                merged_topics = []
                for b, i in zip(basic_topics, inter_topics):
                    # Merge Inter into Basic
                    if 'intermediate' in i['levels']:
                        b['levels']['intermediate'] = i['levels']['intermediate']
                    # Append strictly technical title? Or keep Basic's title "EQ Fundamentals"?
                    # Usually Basic title is simpler. Users prefer that.
                    merged_topics.append(b)
                part['topics'] = merged_topics
                print(f"  Merged {len(merged_topics)} topics (12 pairs).")
            else:
                print(f"  Detailed mismatch in {vol_id}, skipping auto-merge.")

    for vid in ['vol6', 'vol7', 'vol8', 'vol9', 'vol10']:
        process_vol6_to_10(vid)

    # --- Volume 5 Custom Merge ---
    v5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
    if v5:
        print("Realigning vol5...")
        for part in v5['parts']:
            ts = part['topics']
            # Map by ID
            tm = {t['id']: t for t in ts}
            
            new_topics = []
            
            # T1, T2: Keep (Nested)
            new_topics.append(tm['v5_t1'])
            new_topics.append(tm['v5_t2'])
            
            # T3 (Inter: Attack/Rel) + T13 (Basic: Attack) + T14 (Basic: Release)
            t3 = tm['v5_t3'] # Base
            t13 = tm.get('v5_t13')
            t14 = tm.get('v5_t14')
            if t13 and t14:
                # Merge lists
                basic_qs = t13['levels'].get('basic', []) + t14['levels'].get('basic', [])
                t3['levels']['basic'] = basic_qs
            new_topics.append(t3)

            # T4 (Inter) + T15 (Basic)
            t4 = tm['v5_t4']
            t15 = tm.get('v5_t15')
            if t15: t4['levels']['basic'] = t15['levels']['basic']
            new_topics.append(t4)
            
            # T5 (Inter) + T16 (Basic)
            t5 = tm['v5_t5']
            t16 = tm.get('v5_t16')
            if t16: t5['levels']['basic'] = t16['levels']['basic']
            new_topics.append(t5)

            # T6 + T17
            t6 = tm['v5_t6']
            t17 = tm.get('v5_t17')
            if t17: t6['levels']['basic'] = t17['levels']['basic']
            new_topics.append(t6)

            # T7 + T18
            t7 = tm['v5_t7']
            t18 = tm.get('v5_t18')
            if t18: t7['levels']['basic'] = t18['levels']['basic']
            new_topics.append(t7)

            # T8 + T19
            t8 = tm['v5_t8']
            t19 = tm.get('v5_t19')
            if t19: t8['levels']['basic'] = t19['levels']['basic']
            new_topics.append(t8)

            # T9 + T20
            t9 = tm['v5_t9']
            t20 = tm.get('v5_t20')
            if t20: t9['levels']['basic'] = t20['levels']['basic']
            new_topics.append(t9)

            # T10 + T21
            t10 = tm['v5_t10']
            t21 = tm.get('v5_t21')
            if t21: t10['levels']['basic'] = t21['levels']['basic']
            new_topics.append(t10)

            # T11 (Parallel) - Inter Only. Keep.
            new_topics.append(tm['v5_t11'])
            
            # T12 (Advanced) - Nested. Keep.
            new_topics.append(tm['v5_t12'])
            
            part['topics'] = new_topics
            print(f"  Merged Vol 5 topics (Count: {len(new_topics)})")

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Realignment Complete.")

if __name__ == "__main__":
    realign_structure()
