#!/usr/bin/env python3
"""
Script to add Binary MIDI quiz to Stage 3
"""

import json

# Define the Binary MIDI quiz
binary_quiz = {
    "id": "quiz-topic-30",
    "title": "Topic 30: Binary & MIDI",
    "type": "lp_quiz",
    "description": "Learn how binary numbers work in MIDI protocol. Convert decimal MIDI values to binary and understand why MIDI uses 7-bit values.",
    "randomise": False,
    "questions": [
        {
            "title": "Introduction: Binary in MIDI",
            "content": "<h3>Understanding Binary in MIDI</h3><img src='/images/binary_midi_table.png' style='width:100%; max-width:600px; margin:20px 0; border-radius:8px;'/><p>MIDI uses <strong>7-bit binary numbers</strong>, which means values range from <strong>0 to 127</strong>.</p><p>Each bit position represents a power of 2:</p><ul><li>128 (not used in 7-bit)</li><li>64, 32, 16, 8, 4, 2, 1</li></ul><p>To convert decimal to binary, determine which bit positions add up to your target number.</p><p><strong>Example:</strong> 76 = 64 + 8 + 4 = <code>01001100</code></p>",
            "type": "multi_choice",
            "explanation": "<p>Ready to practice? Let's convert some MIDI values to binary!</p>",
            "answers": [
                {"text": "I understand, let's begin", "is_true": "yes"},
                {"text": "Show me more examples first", "is_true": "no"}
            ]
        },
        {
            "title": "Q1: MIDI Velocity = 76",
            "content": "A MIDI note has a velocity of <strong>76</strong>. What is this value in binary?<br><br><em>Hint: 76 = 64 + 8 + 4</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 01001100</strong></p><p>Breaking it down:</p><ul><li>64 (bit 6) = 1</li><li>32 (bit 5) = 0</li><li>16 (bit 4) = 0</li><li>8 (bit 3) = 1</li><li>4 (bit 2) = 1</li><li>2 (bit 1) = 0</li><li>1 (bit 0) = 0</li></ul><p>76 = 64 + 8 + 4 = <code>01001100</code></p>",
            "answers": [
                {"text": "01001100", "is_true": "yes"},
                {"text": "01001000", "is_true": "no"},
                {"text": "01101100", "is_true": "no"},
                {"text": "10001100", "is_true": "no"}
            ]
        },
        {
            "title": "Q2: MIDI Note Number = 60",
            "content": "Middle C is MIDI note number <strong>60</strong>. What is this value in binary?<br><br><em>Hint: 60 = 32 + 16 + 8 + 4</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 00111100</strong></p><p>Breaking it down:</p><ul><li>32 (bit 5) = 1</li><li>16 (bit 4) = 1</li><li>8 (bit 3) = 1</li><li>4 (bit 2) = 1</li><li>2 (bit 1) = 0</li><li>1 (bit 0) = 0</li></ul><p>60 = 32 + 16 + 8 + 4 = <code>00111100</code></p>",
            "answers": [
                {"text": "00111100", "is_true": "yes"},
                {"text": "00111000", "is_true": "no"},
                {"text": "01111100", "is_true": "no"},
                {"text": "00110100", "is_true": "no"}
            ]
        },
        {
            "title": "Q3: MIDI CC Value = 100",
            "content": "A MIDI Control Change (CC) message has a value of <strong>100</strong>. What is this in binary?<br><br><em>Hint: 100 = 64 + 32 + 4</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 01100100</strong></p><p>Breaking it down:</p><ul><li>64 (bit 6) = 1</li><li>32 (bit 5) = 1</li><li>16 (bit 4) = 0</li><li>8 (bit 3) = 0</li><li>4 (bit 2) = 1</li><li>2 (bit 1) = 0</li><li>1 (bit 0) = 0</li></ul><p>100 = 64 + 32 + 4 = <code>01100100</code></p>",
            "answers": [
                {"text": "01100100", "is_true": "yes"},
                {"text": "01100000", "is_true": "no"},
                {"text": "01110100", "is_true": "no"},
                {"text": "01000100", "is_true": "no"}
            ]
        },
        {
            "title": "Q4: Maximum MIDI Velocity = 127",
            "content": "The maximum MIDI velocity is <strong>127</strong>. What is this value in binary?<br><br><em>Hint: This is the highest 7-bit value (all bits = 1)</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 01111111</strong></p><p>127 is the maximum value for 7-bit binary because all seven bits are set to 1:</p><ul><li>64 + 32 + 16 + 8 + 4 + 2 + 1 = 127</li></ul><p>This is why MIDI values max out at 127!</p>",
            "answers": [
                {"text": "01111111", "is_true": "yes"},
                {"text": "11111111", "is_true": "no"},
                {"text": "01111110", "is_true": "no"},
                {"text": "10000000", "is_true": "no"}
            ]
        },
        {
            "title": "Q5: MIDI Program Change = 32",
            "content": "A MIDI Program Change message selects patch number <strong>32</strong>. What is this in binary?<br><br><em>Hint: This is a single power of 2</em>",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 00100000</strong></p><p>32 is exactly 2<sup>5</sup>, so only bit 5 is set to 1:</p><ul><li>32 = <code>00100000</code></li></ul><p>When a number is a power of 2, only one bit is '1' in binary.</p>",
            "answers": [
                {"text": "00100000", "is_true": "yes"},
                {"text": "00110000", "is_true": "no"},
                {"text": "01000000", "is_true": "no"},
                {"text": "00010000", "is_true": "no"}
            ]
        },
        {
            "title": "Q6: Why 0-127?",
            "content": "Why are MIDI values limited to the range 0-127?",
            "type": "multi_choice",
            "explanation": "<p><strong>MIDI uses 7-bit data bytes.</strong></p><p>The 8th bit (most significant bit) is reserved as a <strong>status bit</strong> to distinguish between:</p><ul><li><strong>Status bytes</strong> (bit 7 = 1): Commands like Note On, CC, etc.</li><li><strong>Data bytes</strong> (bit 7 = 0): Values like velocity, note number, etc.</li></ul><p>This is why data values are limited to 7 bits (0-127).</p>",
            "answers": [
                {"text": "MIDI uses 7-bit data bytes (8th bit is for status)", "is_true": "yes"},
                {"text": "To save memory in early synthesizers", "is_true": "no"},
                {"text": "Because 128 values is enough for music", "is_true": "no"},
                {"text": "Hardware limitation of 1980s technology", "is_true": "no"}
            ]
        },
        {
            "title": "Q7: Note-Off Velocity",
            "content": "What is the binary value for a MIDI note-off with velocity <strong>0</strong> (silent release)?",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 00000000</strong></p><p>Zero in binary is all bits set to 0. This represents the minimum MIDI value.</p><p>Note: Some keyboards send Note-Off messages with velocity 0, while others send Note-On with velocity 0 (which is interpreted as Note-Off).</p>",
            "answers": [
                {"text": "00000000", "is_true": "yes"},
                {"text": "00000001", "is_true": "no"},
                {"text": "01111111", "is_true": "no"},
                {"text": "10000000", "is_true": "no"}
            ]
        },
        {
            "title": "Q8: 7-Bit Resolution",
            "content": "How many unique values can be represented with 7 bits?",
            "type": "multi_choice",
            "explanation": "<p><strong>Answer: 128 values (0-127)</strong></p><p>The formula is 2<sup>n</sup> where n = number of bits:</p><ul><li>2<sup>7</sup> = 128 unique values</li><li>Range: 0 to 127</li></ul><p>This is why MIDI has 128 possible values for velocity, note numbers, CC values, etc.</p>",
            "answers": [
                {"text": "128 (0-127)", "is_true": "yes"},
                {"text": "127", "is_true": "no"},
                {"text": "256", "is_true": "no"},
                {"text": "64", "is_true": "no"}
            ]
        },
        {
            "title": "Q9: Invalid MIDI Value",
            "content": "What happens if you try to send a MIDI value of <strong>128</strong> or higher?",
            "type": "multi_choice",
            "explanation": "<p><strong>It would be interpreted as a status byte, not a data value.</strong></p><p>Values 128-255 have bit 7 set to 1, which signals a <strong>status byte</strong> (command) rather than data:</p><ul><li>0-127 (bit 7 = 0): Data bytes</li><li>128-255 (bit 7 = 1): Status bytes (Note On, CC, etc.)</li></ul><p>This is why MIDI data is strictly limited to 0-127.</p>",
            "answers": [
                {"text": "It would be interpreted as a status byte (command)", "is_true": "yes"},
                {"text": "It would wrap around to 0", "is_true": "no"},
                {"text": "It would be clamped to 127", "is_true": "no"},
                {"text": "It would cause an error message", "is_true": "no"}
            ]
        },
        {
            "title": "Q10: 14-Bit MIDI",
            "content": "Why do some MIDI messages use <strong>14-bit resolution</strong> (combining two 7-bit values)?",
            "type": "multi_choice",
            "explanation": "<p><strong>To achieve higher resolution for smooth parameter changes.</strong></p><p>14-bit MIDI combines two 7-bit values:</p><ul><li><strong>MSB</strong> (Most Significant Byte): Coarse control (0-127)</li><li><strong>LSB</strong> (Least Significant Byte): Fine control (0-127)</li><li><strong>Total range</strong>: 0-16,383 (2<sup>14</sup>)</li></ul><p>Used for: Pitch bend, high-resolution CC (like mod wheel), and smooth automation.</p>",
            "answers": [
                {"text": "To achieve higher resolution for smooth parameter changes", "is_true": "yes"},
                {"text": "To send two parameters at once", "is_true": "no"},
                {"text": "To increase the maximum value to 255", "is_true": "no"},
                {"text": "To make MIDI compatible with modern DAWs", "is_true": "no"}
            ]
        }
    ]
}

# Read the current course_data.json
with open('src/data/course_data.json', 'r') as f:
    data = json.load(f)

# Find Stage 3
stage3 = None
for section in data['sections']:
    if 'Stage 3' in section.get('title', ''):
        stage3 = section
        break

if not stage3:
    print("ERROR: Could not find Stage 3")
    exit(1)

# Add the quiz to Stage 3
stage3['items'].append(binary_quiz)

print(f"Added Binary MIDI quiz to Stage 3")
print(f"Stage 3 now has {len(stage3['items'])} items")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Success! Binary MIDI quiz added to course_data.json")
