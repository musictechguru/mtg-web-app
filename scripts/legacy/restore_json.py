#!/usr/bin/env python3
"""
Script to restore the corrupted course_data.json by removing incorrectly inserted topics
"""

# Read the file
with open('src/data/course_data.json', 'r') as f:
    lines = f.readlines()

# The corruption starts at line 767 where Topic 11 was incorrectly inserted
# Topics 11, 21, 22, 24 were inserted (359 lines total)
# We need to remove lines 767-1125 (767 + 359 - 1)

# Build corrected file
new_lines = []

# Part 1: Everything before the corruption (lines 1-766)
new_lines.extend(lines[:766])

# Part 2: Skip the incorrectly inserted topics (lines 767-1125)
# Continue from line 1126 onwards
new_lines.extend(lines[1125:])

# Write the corrected file
with open('src/data/course_data.json', 'w') as f:
    f.writelines(new_lines)

print("File restored successfully!")
print(f"Removed {1125 - 766} lines of incorrectly inserted content")
