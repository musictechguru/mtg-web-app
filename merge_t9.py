import json

def merge_t9():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)

    all_qs = []
    for batch in [
        't9_q1_to_4.json',
        't9_q5_to_8.json',
        't9_q9_to_12.json',
        't9_q13_to_16.json',
        't9_q17_to_20.json'
    ]:
        with open(batch, 'r') as f:
            all_qs.extend(json.load(f))

    for section in data['sections']:
        if "Stage 2" in section.get('title', ''):
            for item in section['items']:
                if "Topic 9" in item.get('title', ''):
                    item['questions'] = all_qs
                    print(f"Merged {len(all_qs)} questions into {item['title']}")
                    break
            break

    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == '__main__':
    merge_t9()
