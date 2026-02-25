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
    
    def get_cyclical(lst, index):
        if not lst:
            return {"id": "placeholder", "title": "Placeholder"}
        return lst[index % len(lst)]

    for round_index in range(1, 11):
        round_nodes = []
        i = round_index - 1
        
        # Step 1: Mastery Quiz
        mq = get_cyclical(mastery_quizzes, i)
        round_nodes.append({
            "id": f"node_{node_counter}", "round": round_index, "step": 1,
            "quizId": mq["id"], "type": "course", "title": mq["title"]
        })
        node_counter += 1
        
        # Step 2: Practical Quiz
        pq = get_cyclical(practical_quizzes, i)
        round_nodes.append({
            "id": f"node_{node_counter}", "round": round_index, "step": 2,
            "quizId": pq["id"], "type": "course", "title": pq["title"]
        })
        node_counter += 1

        # Step 3: Comparison OR Case Study
        if round_index % 2 != 0:
            # Odd round -> Comparison
            cq = get_cyclical(comparison_quizzes, i // 2)
            round_nodes.append({
                "id": f"node_{node_counter}", "round": round_index, "step": 3,
                "quizId": cq["id"], "type": "course", "title": cq["title"]
            })
        else:
            # Even round -> Case Study
            cs = get_cyclical(case_study_quizzes, (i - 1) // 2)
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
        
        # Step 5: Historical Quiz
        hq = get_cyclical(historical_quizzes, i)
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
