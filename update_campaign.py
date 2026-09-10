import json

with open('src/data/campaign_route.json', 'r') as f:
    campaign = json.load(f)

# Find Round 5
round_5 = next(r for r in campaign['rounds'] if r.get('round') == 5)

# Calculate the next step number (max step + 1)
max_step = max([n['step'] for n in round_5['nodes']])

# Add the 3 new nodes
new_nodes = [
    {
        "id": "node_c4_1",
        "round": 5,
        "step": max_step + 1,
        "quizId": "c4_sidechain_lesson",
        "type": "course",
        "title": "C4 Lesson: Sidechain Compression"
    },
    {
        "id": "node_c4_2",
        "round": 5,
        "step": max_step + 2,
        "quizId": "c4_sidechain_task",
        "type": "course",
        "title": "C4 Practical Task: Sidechaining"
    },
    {
        "id": "node_c4_3",
        "round": 5,
        "step": max_step + 3,
        "quizId": "c4_sidechain_quiz",
        "type": "course",
        "title": "C4 Knowledge Check: Dynamics"
    }
]

# Insert them at the end of Round 5
round_5['nodes'].extend(new_nodes)

with open('src/data/campaign_route.json', 'w') as f:
    json.dump(campaign, f, indent=4)

print("Added Component 4 nodes to Round 5 in campaign_route.json")
