#!/usr/bin/env python3
"""
Script to add title and content fields to Binary MIDI quiz questions
"""

import json

# Define the fixed Binary MIDI quiz with proper title and content fields
binary_quiz = {
    "id": "quiz-topic-30",
    "title": "Topic 30: Binary & MIDI",
    "type": "lp_quiz",
    "description": "Learn how binary numbers work in MIDI protocol by clicking boxes to build numbers!",
    "randomise": False,
    "questions": [
        {
            "title": "Q1: Make 76 in Binary",
            "content": "Click the boxes to make the number 76 in binary",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 76 in binary",
            "targetNumber": 76,
            "hint": "You need to add up to 76. Which boxes should have a 1? (Hint: 64 + 8 + 4 = 76)",
            "explanation": "To make 76, you need the 64 box, 8 box, and 4 box: 64 + 8 + 4 = 76. In binary, this is 1001100. This is a common MIDI velocity value!"
        },
        {
            "title": "Q2: Make 60 in Binary (Middle C)",
            "content": "Click the boxes to make the number 60 in binary (Middle C)",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 60 in binary (Middle C)",
            "targetNumber": 60,
            "hint": "Break 60 into powers of 2. Try: 32 + 16 + 8 + 4 = 60",
            "explanation": "To make 60, you need: 32 + 16 + 8 + 4 = 60. In binary, this is 0111100. MIDI note 60 is Middle C on the piano!"
        },
        {
            "title": "Q3: Make 100 in Binary",
            "content": "Click the boxes to make the number 100 in binary",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 100 in binary",
            "targetNumber": 100,
            "hint": "What powers of 2 add to 100? Try: 64 + 32 + 4",
            "explanation": "To make 100, you need: 64 + 32 + 4 = 100. In binary, this is 1100100. This represents a fairly loud MIDI note!"
        },
        {
            "title": "Q4: Make 127 in Binary (Maximum)",
            "content": "Click the boxes to make the number 127 in binary (maximum MIDI value)",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 127 in binary (maximum MIDI value)",
            "targetNumber": 127,
            "hint": "This is the highest 7-bit value. ALL boxes should be clicked!",
            "explanation": "To make 127, you need ALL the boxes: 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127. In binary, this is 1111111. This is why MIDI values max out at 127!"
        },
        {
            "title": "Q5: Make 64 in Binary",
            "content": "Click the boxes to make the number 64 in binary",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 64 in binary",
            "targetNumber": 64,
            "hint": "This is a single power of 2. Only ONE box needs to be clicked!",
            "explanation": "To make 64, you only need the 64 box: 64 = 64. In binary, this is 1000000. Powers of 2 have only one '1' bit! 64 is the center value for many MIDI controllers."
        },
        {
            "title": "Q6: Make 0 in Binary",
            "content": "Click the boxes to make the number 0 in binary",
            "type": "binary-diagram",
            "question": "Click the boxes to make the number 0 in binary",
            "targetNumber": 0,
            "hint": "Zero means no boxes are clicked. Leave them all at 0!",
            "explanation": "To make 0, you don't click any boxes! All bits are 0. In binary, this is 0000000. This is the minimum MIDI value and represents the first program/patch."
        }
    ]
}

# Read the current course_data.json
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find Stage 3 and Topic 30
stage3 = None
topic_30_index = None

for section in data['sections']:
    if 'Stage 3' in section.get('title', ''):
        stage3 = section
        # Find Topic 30 if it exists
        for i, item in enumerate(stage3['items']):
            if item.get('id') == 'quiz-topic-30':
                topic_30_index = i
                break
        break

if not stage3:
    print("ERROR: Could not find Stage 3")
    exit(1)

# Replace the quiz
if topic_30_index is not None:
    stage3['items'][topic_30_index] = binary_quiz
    print(f"✅ Fixed Topic 30 - added title and content fields to all questions")
else:
    stage3['items'].append(binary_quiz)
    print(f"✅ Added new Topic 30")

print(f"Stage 3 now has {len(stage3['items'])} items")
print(f"Quiz now has {len(binary_quiz['questions'])} questions with proper fields")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("✅ Success! Binary MIDI quiz fixed and ready to use")
