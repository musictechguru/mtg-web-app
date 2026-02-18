
import json

try:
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)

    print("Checking Course Data for 'Studio Equipment' or Topic 11...")
    
    # Iterate through courses -> modules -> topics
    for course in data.get('courses', []):
        print(f"\nCourse: {course.get('title')}")
        for module in course.get('modules', []):
            print(f"  Module: {module.get('title')}")
            for topic in module.get('topics', []):
                t_title = topic.get('title')
                t_id = topic.get('id')
                # Check for "Topic 11" or "Studio Equipment"
                if "Topic 11" in t_title or "Studio Equipment" in t_title or "Acoustics" in t_title:
                   print(f"    FOUND TOPIC: {t_title} (ID: {t_id})")
                   # Inspect its quiz link if any
                   if 'quizId' in topic:
                       print(f"      -> Linked Quiz ID: {topic['quizId']}")
                   elif 'type' in topic:
                       print(f"      -> Type: {topic['type']}")

except Exception as e:
    print(f"Error: {e}")
