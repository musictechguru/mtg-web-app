import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Find TNK quiz
tnk_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if quiz.get('title') == "'Tomorrow Never Knows' - Music Technology Analysis":
                tnk_quiz = quiz
                break

if tnk_quiz:
    q3 = tnk_quiz['questions'][2]
    # Remove the SVG from the explanation
    old_explanation = q3['explanation']
    if '<svg' in old_explanation:
        # Split by </svg> and keep the second part
        parts = old_explanation.split('</svg>')
        if len(parts) > 1:
            q3['explanation'] = parts[1]
            print("Removed SVG from Q3 explanation.")
            
    # Also add Q21 if it doesn't exist
    if len(tnk_quiz['questions']) == 20:
        new_q = {
            "type": "true_false",
            "statement": "Tape loops were extensively used in the production of 'Tomorrow Never Knows'.",
            "correct_answer": True,
            "explanation": "Tape loops are a defining characteristic of the track, providing a hypnotic, repetitive backing.",
            "img": "/images/case_studies/tomorrow_never_knows/tnk_q21_tape_loop.png",
            "expert_quote": {
                "text": "The repetitive nature of tape loops introduced a new form of minimal composition to popular music.",
                "author": "Sonic Frontiers"
            }
        }
        tnk_quiz['questions'].append(new_q)
        print("Added Q21 for Tape Loop.")

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
else:
    print("Could not find Tomorrow Never Knows quiz")
