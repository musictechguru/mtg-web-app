#!/usr/bin/env python3
"""
Script to update Binary MIDI quiz - simplified version with 5 questions
"""

import json

# Define the simplified Binary MIDI quiz
binary_quiz = {
    "id": "quiz-topic-30",
    "title": "Topic 30: Binary & MIDI",
    "type": "lp_quiz",
    "description": "Learn how binary numbers work in MIDI protocol. Convert decimal MIDI values to binary.",
    "randomise": False,
    "questions": [
        {
            "title": "Introduction: Binary in MIDI",
            "content": "<h3>Understanding Binary in MIDI</h3><img src='/images/binary_midi_table.png' style='width:100%; max-width:600px; margin:20px 0; border-radius:8px;'/><p>MIDI uses <strong>7-bit binary numbers</strong>, ranging from <strong>0 to 127</strong>.</p><p>Each bit position represents a power of 2: <strong>64, 32, 16, 8, 4, 2, 1</strong></p><hr style='margin:20px 0;'/><h4>Example: Convert 76 to Binary</h4><p>To convert 76 to binary, find which powers of 2 add up to 76:</p><ul><li>76 = <strong>64</strong> + <strong>8</strong> + <strong>4</strong></li><li>64 = bit 6 → <strong>1</strong></li><li>32 = bit 5 → <strong>0</strong> (not used)</li><li>16 = bit 4 → <strong>0</strong> (not used)</li><li>8 = bit 3 → <strong>1</strong></li><li>4 = bit 2 → <strong>1</strong></li><li>2 = bit 1 → <strong>0</strong> (not used)</li><li>1 = bit 0 → <strong>0</strong> (not used)</li></ul><p>Answer: <code>01001100</code></p><p>Now try converting some MIDI values yourself!</p>",
            "type": "multi_choice",
            "explanation": "<p>Ready to practice? Fill in the binary table for each MIDI value.</p>",
            "answers": [
                {"text": "I understand, let's begin", "is_true": "yes"},
                {"text": "Show me the example again", "is_true": "no"}
            ]
        },
        {
            "title": "Q1: MIDI Note Number = 60",
            "content": "Middle C is MIDI note number <strong>60</strong>. What is this value in binary?<br><br><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>1</strong></td></tr><tr><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td></tr></table>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 0111100</strong></p><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>1</strong></td></tr><tr><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td></tr></table><p>60 = 32 + 16 + 8 + 4</p>",
            "answers": [
                {"text": "0111100", "is_true": "yes"},
                {"text": "0111000", "is_true": "no"},
                {"text": "1111100", "is_true": "no"},
                {"text": "0110100", "is_true": "no"}
            ]
        },
        {
            "title": "Q2: MIDI Velocity = 100",
            "content": "A MIDI note has velocity <strong>100</strong>. What is this value in binary?<br><br><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>1</strong></td></tr><tr><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td></tr></table>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 1100100</strong></p><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>1</strong></td></tr><tr><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td></tr></table><p>100 = 64 + 32 + 4</p>",
            "answers": [
                {"text": "1100100", "is_true": "yes"},
                {"text": "1100000", "is_true": "no"},
                {"text": "1110100", "is_true": "no"},
                {"text": "1000100", "is_true": "no"}
            ]
        },
        {
            "title": "Q3: Maximum MIDI Value = 127",
            "content": "The maximum MIDI value is <strong>127</strong>. What is this value in binary?<br><br><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>1</strong></td></tr><tr><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td></tr></table><em>Hint: This is the highest 7-bit value</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 1111111</strong></p><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>1</strong></td></tr><tr><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td></tr></table><p>127 = 64 + 32 + 16 + 8 + 4 + 2 + 1 (all bits = 1)</p><p>This is why MIDI values max out at 127!</p>",
            "answers": [
                {"text": "1111111", "is_true": "yes"},
                {"text": "1111110", "is_true": "no"},
                {"text": "0111111", "is_true": "no"},
                {"text": "1111100", "is_true": "no"}
            ]
        },
        {
            "title": "Q4: MIDI CC Value = 64",
            "content": "A MIDI Control Change has value <strong>64</strong> (center position). What is this in binary?<br><br><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>1</strong></td></tr><tr><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td></tr></table><em>Hint: This is a single power of 2</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 1000000</strong></p><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>1</strong></td></tr><tr><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>1</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td></tr></table><p>64 is exactly 2<sup>6</sup>, so only bit 6 is set to 1</p><p>Powers of 2 have only one '1' bit in binary!</p>",
            "answers": [
                {"text": "1000000", "is_true": "yes"},
                {"text": "1100000", "is_true": "no"},
                {"text": "0100000", "is_true": "no"},
                {"text": "1010000", "is_true": "no"}
            ]
        },
        {
            "title": "Q5: MIDI Program Change = 0",
            "content": "A MIDI Program Change selects patch <strong>0</strong> (first patch). What is this in binary?<br><br><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center;'><strong>1</strong></td></tr><tr><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td><td style='border:1px solid #444; padding:8px; text-align:center;'>?</td></tr></table>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 0000000</strong></p><table style='margin:10px 0; border-collapse: collapse;'><tr><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>64</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>32</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>16</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>8</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>4</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>2</strong></td><td style='border:1px solid #444; padding:8px; text-align:center; background:#1a1a2e;'><strong>1</strong></td></tr><tr><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td><td style='border:1px solid #00d9ff; padding:8px; text-align:center; background:#00d9ff; color:#000;'><strong>0</strong></td></tr></table><p>Zero in binary is all bits set to 0</p><p>This is the minimum MIDI value!</p>",
            "answers": [
                {"text": "0000000", "is_true": "yes"},
                {"text": "0000001", "is_true": "no"},
                {"text": "1111111", "is_true": "no"},
                {"text": "0100000", "is_true": "no"}
            ]
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

# Replace or add the quiz
if topic_30_index is not None:
    stage3['items'][topic_30_index] = binary_quiz
    print(f"Updated existing Topic 30 in Stage 3")
else:
    stage3['items'].append(binary_quiz)
    print(f"Added new Topic 30 to Stage 3")

print(f"Stage 3 now has {len(stage3['items'])} items")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Success! Simplified Binary MIDI quiz updated in course_data.json")
