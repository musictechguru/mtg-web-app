#!/usr/bin/env python3
"""
Script to move Topics 11, 21, 22, 24 from Stage 4 to Stage 3 in course_data.json
"""

import json

# Read the file
with open('src/data/course_data.json', 'r') as f:
    lines = f.readlines()

# Extract topics (1-indexed line numbers, so subtract 1)
topic_11 = lines[3922:4049]  # lines 3923-4049
topic_21 = lines[4050:4077]  # lines 4051-4077
topic_22 = lines[4078:4201]  # lines 4079-4201
topic_24 = lines[4202:4284]  # lines 4203-4284

# Find where to insert in Stage 3 (after Topic 26)
# Stage 3 starts at line 742, Topic 26 starts at line 745
# We need to find the end of Topic 26's closing brace
stage3_insert_point = None
for i in range(744, 2400):  # Search from line 745 onwards
    if lines[i].strip() == '},':
        stage3_insert_point = i + 1
        break

print(f"Stage 3 insert point: line {stage3_insert_point + 1}")

# Build new file content
new_lines = []

# Part 1: Everything up to the insert point in Stage 3
new_lines.extend(lines[:stage3_insert_point])

# Part 2: Insert the topics
new_lines.extend(topic_11)
new_lines.extend(topic_21)
new_lines.extend(topic_22)
new_lines.extend(topic_24)

# Part 3: Everything from insert point to before Topic 11
new_lines.extend(lines[stage3_insert_point:3922])

# Part 4: Skip Topics 11, 21, 22, 24 and continue from after Topic 24
new_lines.extend(lines[4284:])

# Write the new file
with open('src/data/course_data.json', 'w') as f:
    f.writelines(new_lines)

print("Topics moved successfully!")
print(f"Moved {len(topic_11)} lines for Topic 11")
print(f"Moved {len(topic_21)} lines for Topic 21")
print(f"Moved {len(topic_22)} lines for Topic 22")
print(f"Moved {len(topic_24)} lines for Topic 24")
