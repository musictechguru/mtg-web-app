#!/usr/bin/env python3
"""
Script to update Binary MIDI quiz to match the interactive binary-diagram format
"""

import json

# Define the updated Binary MIDI quiz matching the .jsx format
binary_quiz = {
    "id": "quiz-topic-30",
    "title": "Topic 30: Binary & MIDI",
    "type": "lp_quiz",
    "description": "Learn how binary numbers work in MIDI protocol by clicking boxes to build numbers!",
    "randomise": False,
    "questions": [
        {
            "type": "binary-diagram",
            "title": "Introduction: Binary in MIDI",
            "content": "<h3>Understanding Binary in MIDI</h3><img src='/images/binary_midi_table.png' style='width:100%; max-width:600px; margin:20px 0; border-radius:8px;'/><p>MIDI uses <strong>7-bit binary numbers</strong>, ranging from <strong>0 to 127</strong>.</p><p>Each box represents a power of 2: <strong>64, 32, 16, 8, 4, 2, 1</strong></p><hr style='margin:20px 0;'/><h4>Example: Make the number 76</h4><p>To make 76, click the boxes that add up to 76:</p><ul><li>76 = <strong>64</strong> + <strong>8</strong> + <strong>4</strong></li><li>Click the 64 box, 8 box, and 4 box</li><li>Leave the others at 0</li></ul><p>This gives you: <code>1001100</code> in binary!</p><p><strong>Now try it yourself with the questions below!</strong></p>",
            "question": "Click the boxes to make the number 76 in binary",
            "targetNumber": 76,
            "hint": "You need to add up to 76. Which boxes should have a 1? (Hint: 64 + 8 + 4 = 76)",
            "explanation": "To make 76, you need the 64 box, 8 box, and 4 box: 64 + 8 + 4 = 76. In binary, this is 1001100. This is a common MIDI velocity value!"
        },
        {
            "type": "binary-diagram",
            "title": "Q1: MIDI Note Number = 60",
            "content": "<p>Middle C is MIDI note number <strong>60</strong>. Click the boxes to make 60 in binary.</p>",
            "question": "Click the boxes to make the number 60 in binary (Middle C)",
            "targetNumber": 60,
            "hint": "Break 60 into powers of 2. Try: 32 + 16 + 8 + 4 = 60",
            "explanation": "To make 60, you need: 32 + 16 + 8 + 4 = 60. In binary, this is 0111100. MIDI note 60 is Middle C on the piano!"
        },
        {
            "type": "binary-diagram",
            "title": "Q2: MIDI Velocity = 100",
            "content": "<p>A MIDI note has velocity <strong>100</strong> (fairly loud). Click the boxes to make 100 in binary.</p>",
            "question": "Click the boxes to make the number 100 in binary",
            "targetNumber": 100,
            "hint": "What powers of 2 add to 100? Try: 64 + 32 + 4",
            "explanation": "To make 100, you need: 64 + 32 + 4 = 100. In binary, this is 1100100. This represents a fairly loud MIDI note!"
        },
        {
            "type": "binary-diagram",
            "title": "Q3: Maximum MIDI Value = 127",
            "content": "<p>The maximum MIDI value is <strong>127</strong>. Click the boxes to make 127 in binary.</p>",
            "question": "Click the boxes to make the number 127 in binary (maximum MIDI value)",
            "targetNumber": 127,
            "hint": "This is the highest 7-bit value. ALL boxes should be clicked!",
            "explanation": "To make 127, you need ALL the boxes: 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127. In binary, this is 1111111. This is why MIDI values max out at 127!"
        },
        {
            "type": "binary-diagram",
            "title": "Q4: MIDI CC Value = 64",
            "content": "<p>A MIDI Control Change has value <strong>64</strong> (center position for mod wheel, pan, etc.). Click the boxes to make 64 in binary.</p>",
            "question": "Click the boxes to make the number 64 in binary",
            "targetNumber": 64,
            "hint": "This is a single power of 2. Only ONE box needs to be clicked!",
            "explanation": "To make 64, you only need the 64 box: 64 = 64. In binary, this is 1000000. Powers of 2 have only one '1' bit! 64 is the center value for many MIDI controllers."
        },
        {
            "type": "binary-diagram",
            "title": "Q5: MIDI Program Change = 0",
            "content": "<p>A MIDI Program Change selects patch <strong>0</strong> (first patch). Click the boxes to make 0 in binary.</p>",
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
    print(f"Updated Topic 30 with interactive binary-diagram format")
else:
    stage3['items'].append(binary_quiz)
    print(f"Added new Topic 30 with interactive binary-diagram format")

print(f"Stage 3 now has {len(stage3['items'])} items")
print(f"Quiz now has {len(binary_quiz['questions'])} interactive binary-diagram questions")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Success! Interactive Binary MIDI quiz updated in course_data.json")
