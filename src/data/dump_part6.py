
import json

filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(filepath, 'r') as f:
    data = json.load(f)

output = []

for vol in data['volumes']:
    if vol['id'] == 'vol1':
        for part in vol['parts']:
            if part['id'] == 'p6':
                for topic in part['topics']:
                    output.append(f"TOPIC: {topic['title']}")
                    for level, questions in topic['levels'].items():
                        output.append(f"  LEVEL: {level}")
                        for q in questions:
                            output.append(f"    ID: {q['id']}")
                            output.append(f"    Q: {q['content']}")
                            for ans in q['answers']:
                                marker = "[TRUE]" if ans['is_true'] == 'yes' else "[FAIL]"
                                output.append(f"      {marker} {ans['text']}")
                            output.append("")

with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/part6_dump.txt', 'w') as f:
    f.write('\n'.join(output))
