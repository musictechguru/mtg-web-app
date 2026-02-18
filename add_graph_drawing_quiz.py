#!/usr/bin/env python3
"""
Script to add Topic 31: Graph Drawing to Stage 3
"""

import json

# Define Topic 31: Graph Drawing quiz
graph_drawing_quiz = {
    "id": "quiz-topic-31",
    "title": "Topic 31: Graph Drawing",
    "type": "lp_quiz",
    "description": "Draw audio graphs to demonstrate your understanding of ADSR, EQ, compression, and filters!",
    "randomise": False,
    "questions": [
        {
            "title": "Q1: Fast Attack ADSR Envelope",
            "content": "Draw an ADSR envelope with: Fast Attack, Medium Decay, 70% Sustain, Slow Release",
            "type": "graph-drawing",
            "question": "Draw an ADSR envelope with: Fast Attack, Medium Decay, 70% Sustain, Slow Release",
            "hint": "Start low, rise quickly (attack), drop to 70% (decay), hold flat (sustain), then drop slowly (release)",
            "targetPoints": [
                {"x": 0, "y": 100},
                {"x": 15, "y": 0},
                {"x": 35, "y": 30},
                {"x": 70, "y": 30},
                {"x": 100, "y": 100}
            ],
            "explanation": "ADSR controls how a sound evolves over time. Attack = how fast it starts, Decay = drop to sustain level, Sustain = held level, Release = fade out after key release. This envelope creates a punchy sound with a long tail."
        },
        {
            "title": "Q2: EQ Boost Curve",
            "content": "Draw an EQ curve that boosts 3kHz by +6dB",
            "type": "graph-drawing",
            "question": "Draw an EQ curve that boosts 3kHz by +6dB",
            "hint": "Start flat, create a bell-shaped bump in the middle-right area",
            "targetPoints": [
                {"x": 0, "y": 50},
                {"x": 40, "y": 50},
                {"x": 60, "y": 20},
                {"x": 80, "y": 50},
                {"x": 100, "y": 50}
            ],
            "explanation": "Boosting 3kHz adds presence and clarity to vocals and instruments. The bell curve affects frequencies around 3kHz, with the Q (width) determining how many neighboring frequencies are affected."
        },
        {
            "title": "Q3: Compression Curve",
            "content": "Draw a 4:1 compression ratio with threshold at -12dB",
            "type": "graph-drawing",
            "question": "Draw a 4:1 compression ratio with threshold at -12dB",
            "hint": "Draw a straight line that bends at the threshold point, becoming gentler above it",
            "targetPoints": [
                {"x": 0, "y": 100},
                {"x": 40, "y": 60},
                {"x": 60, "y": 55},
                {"x": 80, "y": 50},
                {"x": 100, "y": 45}
            ],
            "explanation": "A 4:1 ratio means for every 4dB above the threshold, only 1dB comes out. This evens out loud peaks while keeping quiet parts untouched. The threshold at -12dB is common for vocals."
        },
        {
            "title": "Q4: Low-Pass Filter",
            "content": "Draw a low-pass filter with cutoff at 2kHz",
            "type": "graph-drawing",
            "question": "Draw a low-pass filter with cutoff at 2kHz",
            "hint": "Start high/flat on the left, then drop steeply on the right side",
            "targetPoints": [
                {"x": 0, "y": 20},
                {"x": 50, "y": 20},
                {"x": 60, "y": 30},
                {"x": 75, "y": 60},
                {"x": 100, "y": 100}
            ],
            "explanation": "A low-pass filter lets low frequencies through and cuts high frequencies. The cutoff frequency (2kHz) is where the filter starts reducing volume. Great for removing harshness or simulating distance."
        },
        {
            "title": "Q5: Pad Sound ADSR",
            "content": "Draw a pad sound envelope: Slow Attack, No Decay, 100% Sustain, Medium Release",
            "type": "graph-drawing",
            "question": "Draw a pad sound envelope: Slow Attack, No Decay, 100% Sustain, Medium Release",
            "hint": "Gradual rise to full volume, stay flat, then medium drop at the end",
            "targetPoints": [
                {"x": 0, "y": 100},
                {"x": 30, "y": 0},
                {"x": 70, "y": 0},
                {"x": 100, "y": 60}
            ],
            "explanation": "Pad sounds use slow attacks to create a swelling effect. No decay and full sustain keep the sound at maximum volume while held. This creates lush, atmospheric textures perfect for backgrounds."
        },
        {
            "title": "Q6: High-Pass Filter",
            "content": "Draw a high-pass filter (cut bass below 100Hz)",
            "type": "graph-drawing",
            "question": "Draw a high-pass filter (cut bass below 100Hz)",
            "hint": "Start low on the left (cutting bass), rise steeply, then stay flat",
            "targetPoints": [
                {"x": 0, "y": 100},
                {"x": 15, "y": 70},
                {"x": 25, "y": 50},
                {"x": 50, "y": 50},
                {"x": 100, "y": 50}
            ],
            "explanation": "High-pass filters remove low-end rumble and mud. Cutting below 100Hz cleans up vocals and instruments, leaving room for bass and kick drum. Essential for mixing clarity!"
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

# Add Topic 31
stage3['items'].append(graph_drawing_quiz)
print(f"✅ Added Topic 31: Graph Drawing to Stage 3")
print(f"Stage 3 now has {len(stage3['items'])} items")
print(f"Quiz has {len(graph_drawing_quiz['questions'])} graph drawing questions")

# Write back to file
with open('src/data/course_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("✅ Success! Graph Drawing quiz added to course_data.json")
