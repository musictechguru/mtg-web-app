import json
import os

def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

def find_quizzes(data, title_keyword):
    quizzes = []
    for section in data.get('sections', []):
        for item in section.get('items', []):
            if item.get('type') == 'lp_quiz' and title_keyword.lower() in item.get('title', '').lower():
                quizzes.append({
                    'id': item.get('id'),
                    'title': item.get('title')
                })
    return quizzes

def main():
    course_data_path = 'src/data/course_data.json'
    if not os.path.exists(course_data_path):
        print(f"File not found: {course_data_path}")
        return

    data = load_json(course_data_path)
    
    # Extract existing quizzes
    mastery_quizzes = find_quizzes(data, "Topic ")  # Captures Topic 1, Topic 2, etc.
    # Filter only the exact "Topic X:"
    mastery_quizzes = [q for q in mastery_quizzes if "Topic " in q['title'] and ":" in q['title']]
    mastery_quizzes.sort(key=lambda x: int(x['title'].split(' ')[1].replace(':', '')))
    
    practical_quizzes = find_quizzes(data, "Practical Quiz")
    comparison_quizzes = find_quizzes(data, "Comparison ")
    historical_quizzes = find_quizzes(data, "Historical Context")
    case_study_quizzes = find_quizzes(data, "Music Technology Analysis")

    rounds = []
    
    node_counter = 1
    
    def distribute_sequential(items, n_buckets):
        if not items:
            return [[] for _ in range(n_buckets)]
        if len(items) < n_buckets:
            # If fewer items than buckets, cycle them so every bucket gets 1
            return [[items[i % len(items)]] for i in range(n_buckets)]
        
        buckets = [[] for _ in range(n_buckets)]
        base_count = len(items) // n_buckets
        remainder = len(items) % n_buckets
        
        idx = 0
        for b in range(n_buckets):
            count = base_count + (1 if b < remainder else 0)
            for _ in range(count):
                buckets[b].append(items[idx])
                idx += 1
        return buckets

    # Manual mapping of Practical Quizzes to Rounds (Volumes)
    # Vol 1: Topic 1: Fundamentals & Recording
    # Vol 2: Topic 2: Microphones
    # Vol 3: Topic 3: Synthesis
    # Vol 4: Topic 4: Sampling
    # Vol 5: Topic 5: Dynamic Processing
    # Vol 6: Topic 6: EQ & Stereo
    # Vol 7: Topic 7: FX & Processors
    # Vol 8: Topic 8: Mastering
    # Vol 9: Topic 9: Acoustics
    # Vol 10: Topic 10: Equipment

    practical_mapping = {
        1: ["Practical Quiz 27: Recording Signal Chain", "Practical Quiz 29: Recording Workflow"],
        2: ["Practical Quiz 28: Microphone Techniques", "Practical Quiz 33: Advanced Microphone Placement"],
        3: ["Practical Quiz 22: Subtractive Synthesis Flow", "Practical Quiz 34: Synthesizer Fundamentals", "Practical Quiz 25: Waveform Wizard"],
        4: ["Practical Quiz 32: Sequencing & Piano Roll", "Practical Quiz 30: Binary & MIDI"],
        5: ["Practical Quiz 31: Graph Drawing", "Practical Quiz 36: EDM Production Techniques"],
        6: ["Practical Quiz 24: EQ Parameter Mastery"],
        7: ["Practical Quiz 23: FX Ear Training", "Practical Quiz 35: Audio Effects Processing"],
        8: ["Practical Quiz 37: Rock Production Techniques"],
        9: ["Practical Quiz 11: Studio Equipment & Acoustics"],
        10: ["Practical Quiz 21: Signal Flow Challenge", "Practical Quiz 26: Hardware Anatomy"]
    }

    mastery_buckets = distribute_sequential(mastery_quizzes, 10)
    comparison_buckets = distribute_sequential(comparison_quizzes, 5)
    case_study_buckets = distribute_sequential(case_study_quizzes, 5)
    historical_buckets = distribute_sequential(historical_quizzes, 10)

    for round_index in range(1, 11):
        round_nodes = []
        i = round_index - 1
        
        # Step 1: Mastery Quizzes (can be >1 if more than 10)
        for mq in mastery_buckets[i]:
            round_nodes.append({
                "id": f"node_{node_counter}", "round": round_index, "step": 1,
                "quizId": mq["id"], "type": "course", "title": mq["title"]
            })
            node_counter += 1
        
        # Step 2: Practical Quizzes (Mapped specifically by relevance)
        round_pq_titles = practical_mapping.get(round_index, [])
        for pq_title in round_pq_titles:
            # Find the full quiz object by matching the title string
            pq_match = next((q for q in practical_quizzes if q["title"] == pq_title), None)
            if pq_match:
                round_nodes.append({
                    "id": f"node_{node_counter}", "round": round_index, "step": 2,
                    "quizId": pq_match["id"], "type": "course", "title": pq_match["title"]
                })
                node_counter += 1

        # Step 3: Comparison OR Case Study
        if round_index % 2 != 0:
            # Odd round -> Comparison
            for cq in comparison_buckets[i // 2]:
                round_nodes.append({
                    "id": f"node_{node_counter}", "round": round_index, "step": 3,
                    "quizId": cq["id"], "type": "course", "title": cq["title"]
                })
                node_counter += 1
        else:
            # Even round -> Case Study
            for cs in case_study_buckets[(i - 1) // 2]:
                round_nodes.append({
                    "id": f"node_{node_counter}", "round": round_index, "step": 3,
                    "quizId": cs["id"], "type": "course", "title": cs["title"]
                })
                node_counter += 1
        
        # Step 4: Dictionary Quiz
        round_nodes.append({
            "id": f"node_{node_counter}", "round": round_index, "step": 4,
            "quizId": f"vol{round_index}", "topicId": f"v{round_index}_t1", "level": "intermediate",
            "type": "dictionary", "title": f"Volume {round_index} Dictionary"
        })
        node_counter += 1
        
        # Step 5: Historical Quizzes
        for hq in historical_buckets[i]:
            round_nodes.append({
                "id": f"node_{node_counter}", "round": round_index, "step": 5,
                "quizId": hq["id"], "type": "course", "title": hq["title"]
            })
            node_counter += 1
        
        rounds.append({
            "round": round_index,
            "title": f"Round {round_index}",
            "nodes": round_nodes
        })
        
        # Insert Mock Exams every 2 rounds
        if round_index % 2 == 0:
            exam_num = round_index // 2
            exam_type = "Component 3" if exam_num % 2 != 0 else "Component 4"
            if round_index == 10: exam_type = "Final Mock"
            
            rounds.append({
                "round": f"Exam_{exam_num}",
                "title": f"{exam_type} Exam Stage",
                "nodes": [{
                    "id": f"node_{node_counter}", "round": f"Exam_{exam_num}", "step": 1,
                    "quizId": f"exam_{exam_num}", "type": "exam", "title": f"{exam_type} Mock Exam"
                }]
            })
            node_counter += 1

    # Add Final Roulette Round
    rounds.append({
        "round": 11,
        "title": "Roulette Round",
        "nodes": [{
            "id": f"node_{node_counter}", "round": 11, "step": 1,
            "quizId": "roulette_1", "type": "roulette", "title": "Russian Roulette: Mega Quiz"
        }]
    })

    output_data = {
        "campaignName": "Path to Legend: 10-Volume Campaign",
        "description": "Complete all 10 volumes, facing Component 3 and 4 Mock Exams as bosses, ending with a Roulette Mega Quiz.",
        "rounds": rounds
    }

    with open('src/data/campaign_route.json', 'w') as f:
        json.dump(output_data, f, indent=4)
        
    print("Successfully generated src/data/campaign_route.json with 10 rounds and exams!")

if __name__ == '__main__':
    main()
