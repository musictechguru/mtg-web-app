import json

with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

for section in data['sections']:
    if section['title'] == 'Stage 2: Topic Mastery Quizzes':
        new_items = []
        for item in section['items']:
            if "Topic" in item['title'] and ":" in item['title']:
                title = item['title']
                q_len = len(item['questions'])
                mid = q_len // 2
                
                item1 = dict(item)
                item1['id'] = item['id'] + '_p1'
                item1['title'] = title + ' (Part 1)'
                item1['questions'] = item['questions'][:mid]
                
                item2 = dict(item)
                item2['id'] = item['id'] + '_p2'
                item2['title'] = title + ' (Part 2)'
                item2['questions'] = item['questions'][mid:]
                
                new_items.extend([item1, item2])
            else:
                new_items.append(item)
        section['items'] = new_items

with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Topics split into Part 1 and Part 2.")
