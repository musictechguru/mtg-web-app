import json
import statistics
import os

DICT_FILE = "src/data/dictionary_quizzes.json"
COURSE_FILE = "src/data/course_data.json"

def get_answer_length_variance(q):
    answers = q.get("answers", [])
    if not answers:
        return float('inf')
    lengths = [len(a.get("text", "")) for a in answers]
    if len(lengths) < 2:
        return 0
    return statistics.variance(lengths)

def process_questions(questions):
    scored = []
    for q in questions:
        # Check if question has explanation, image, and quote (user prefers these, but we don't strictly require, just prefer)
        # Actually user said "with image explanations and quotes" so we should prioritize those!
        has_img = 1 if q.get("explanation_image") or q.get("img") else 0
        has_quote = 1 if q.get("expert_quote") else 0
        variance = get_answer_length_variance(q)
        
        # We sort by: primarily has_img (descending), then has_quote (descending), then variance (ascending)
        scored.append((has_img, has_quote, variance, q))
        
    # Sort
    scored.sort(key=lambda x: (-x[0], -x[1], x[2]))
    return [q for _, _, _, q in scored]

def convert_to_course_question(q, q_idx):
    explanation_html = ""
    img_src = ""
    img_alt = "Explanation Diagram"
    
    if isinstance(q.get("explanation_image"), dict):
        img_src = q["explanation_image"].get("src", "")
        img_alt = q["explanation_image"].get("alt", img_alt)
    elif isinstance(q.get("explanation_image"), str) and q.get("explanation_image"):
        img_src = q["explanation_image"]
    elif q.get("img"):
        img_src = q["img"]
        
    if img_src:
        explanation_html += f'<img src="{img_src}" alt="{img_alt}" style="width:100%; border-radius:8px; margin-bottom:10px;" />'
        
    exp_text = q.get("expert_explanation", "")
    if exp_text:
        explanation_html += f'<p><strong>Expert Explanation:</strong> {exp_text}</p>'
    elif q.get("explanation"):
        explanation_html += f'<p>{q.get("explanation")}</p>'
        
    quote = q.get("expert_quote")
    if quote and isinstance(quote, dict) and quote.get("text"):
        explanation_html += f'<blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote["text"]}"<br/><strong>- {quote.get("author", "Expert")}</strong></blockquote>'
        
    new_q = {
        "title": f"Q{q_idx+1}: {q.get('title', 'Question').split(':')[-1].strip()}",
        "content": q.get("content", ""),
        "type": q.get("type", "multi_choice"),
        "answers": q.get("answers", []),
        "explanation": explanation_html
    }
    
    # Keep the raw fields as well in case QuizPlayer checks them
    if img_src:
        new_q["img"] = img_src
    if quote:
        new_q["expert_quote"] = quote
    if exp_text:
        new_q["expert_explanation"] = exp_text
        
    return new_q

def main():
    with open(DICT_FILE, "r") as f:
        dict_data = json.load(f)

    with open(COURSE_FILE, "r") as f:
        course_data = json.load(f)

    new_quizzes = []

    for i, vol in enumerate(dict_data.get("volumes", [])[:10]):
        vol_title = vol.get("title", f"Volume {i+1}").replace("Volume ", "").split(":", 1)
        name = vol_title[1].strip() if len(vol_title) > 1 else vol_title[0]
        
        topic_title = f"Topic {i+1}: {name}"
        
        all_basic = []
        all_intermediate = []

        for part in vol.get("parts", []):
            for t in part.get("topics", []):
                levels = t.get("levels", {})
                all_basic.extend(levels.get("basic", []))
                all_intermediate.extend(levels.get("intermediate", []))

        # We need 20 questions: 10 basic, 10 intermediate
        best_basic = process_questions(all_basic)[:10]
        best_intermediate = process_questions(all_intermediate)[:10]

        selected_questions = best_basic + best_intermediate

        formatted_questions = []
        for q_idx, q in enumerate(selected_questions):
            formatted_questions.append(convert_to_course_question(q, q_idx))
            
        # isPremium based on some logic? Topics 1,2,3 free probably, rest premium
        is_premium = True if (i+1) > 3 else False

        new_quiz = {
            "id": f"quiz-topic-{i+1}",
            "title": topic_title,
            "type": "lp_quiz",
            "isPremium": is_premium,
            "description": f"Mastery quiz covering the fundamentals of {name}.",
            "questions": formatted_questions
        }
        
        new_quizzes.append(new_quiz)

    # Inject into course_data.json
    for section in course_data.get("sections", []):
        if "Stage 2" in section.get("title", ""):
            # We want to insert these 10 quizzes at the beginning of the items array
            # But first we should remove any existing "quiz-topic-1" to "quiz-topic-10" if they exist
            existing_ids = [new_q["id"] for new_q in new_quizzes]
            new_items = [item for item in section.get("items", []) if item.get("id") not in existing_ids]
            section["items"] = new_quizzes + new_items
            break

    with open(COURSE_FILE, "w") as f:
        json.dump(course_data, f, indent=4)
        
    print(f"Successfully generated {len(new_quizzes)} quizzes and updated course_data.json!")

if __name__ == "__main__":
    main()
