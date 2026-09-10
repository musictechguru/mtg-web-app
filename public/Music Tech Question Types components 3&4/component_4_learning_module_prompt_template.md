# COMPONENT 4 LEARNING MODULE GENERATOR PROMPT
## Template for Creating Gamified "Path to Legend" Nodes

---

## HOW TO USE THIS PROMPT

1. **Copy the entire prompt below** (from "BEGIN PROMPT" to "END PROMPT").
2. **Replace `[TOPIC]`** with your chosen Component 4 topic (e.g., Sidechain Compression, Vocal Comping, Subtractive Synthesis, Glyn Johns Drum Micing, etc.).
3. **Replace `[GENRE/CONTEXT]`** if you want it tied to a specific genre (e.g., EDM, 1960s Rock), or just say "General".
4. **Paste into your AI assistant** (ChatGPT, Claude, Gemini).
5. The AI will generate the JSON content needed to populate your app's `course_data.json` for that specific map node!

---

## BEGIN PROMPT

---

You are an expert Music Technology educator and instructional designer specializing in the Pearson Edexcel A-Level Music Technology (9MT0) specification, specifically **Component 4: Producing and Analysing**.

I am building a gamified "Path to Legend" campaign map for my Music Tech revision app. For each node on this map, the student must complete a 3-part Learning Module:
1. **Information Delivery (The Lesson)**: An HTML-formatted explanation of the concept, ready to be embedded with videos or presentations.
2. **Application (The Practical Task)**: Step-by-step instructions for a DAW-based practical exercise mimicking the actual Component 4 NEA coursework demands.
3. **Assessment (The Mini-Test)**: A short JSON quiz testing the theoretical knowledge (AO3/AO4) of the topic they just learned.

Please generate a complete 3-part Learning Module for the following topic:
**Topic:** [TOPIC]
**Context/Genre:** [GENRE/CONTEXT]

### OUTPUT FORMAT REQUIREMENTS
Your output must be formatted as valid JSON objects that I can insert directly into my app's `course_data.json` file. 

Please output ONE JSON array containing THREE objects:

```json
[
  {
    "type": "lesson",
    "title": "Module: [Topic Name] - Explanation",
    "content": "<h1>Understanding [Topic]</h1><p>...</p> <h2>Key Parameters</h2><ul>...</ul> <h3>Common Edexcel Pitfalls</h3><p>...</p> <div class='video-placeholder'>[Placeholder: Insert YouTube embed or Presentation iframe here]</div>"
  },
  {
    "type": "lesson",
    "title": "Practical Task: [Topic Name]",
    "content": "<h2>Your DAW Mission</h2><p>Download the provided stems and complete the following...</p><ul><li>Step 1...</li><li>Step 2...</li></ul> <h3>Marking Criteria (Levels-Based)</h3><ul><li>Level 3 (3 marks): ...</li></ul> <p><strong>Assets Required:</strong> List of stems/MIDI files the teacher needs to provide.</p>"
  },
  {
    "type": "lp_quiz",
    "title": "Knowledge Check: [Topic Name]",
    "description": "A quick test to verify your Component 4 knowledge before advancing.",
    "questions": [
      {
        "title": "Q1: [Concept]",
        "content": "Question text here (e.g., Which of the following best explains why...)",
        "type": "multi_choice",
        "answers": [
          {"text": "Correct Answer", "is_true": "yes"},
          {"text": "Distractor 1", "is_true": "no"},
          {"text": "Distractor 2", "is_true": "no"},
          {"text": "Distractor 3", "is_true": "no"}
        ],
        "expert_explanation": "AO4 Analysis explaining WHY this is correct according to Edexcel mark schemes."
      }
    ]
  }
]
```
Note: Ensure there are 3-5 questions in the quiz. Mix technical AO3 questions (e.g. parameter identification) and analytical AO4 questions.

### CONTENT GUIDELINES
- **The Lesson**: Must use appropriate Edexcel terminology (e.g., mentioning AO3/AO4, specific frequency ranges, precise parameter names like Threshold, Ratio, Attack, Release). Use HTML tags (`<h2>`, `<strong>`, `<ul>`) to make it readable.
- **The Practical Task**: Must reflect the exact style of practical tasks found in Component 4 (e.g., strict instructions on panning, noise removal, timing correction, synth parameter matching). Include the "Levels-Based" marking criteria so students know how they will be graded (Level 1 to Level 3). Since we use the `lesson` type for this, format the content in HTML.
- **The Mini-Test**: Must test the theory behind the practical task. If the task is Sidechain Compression, a question might ask "What is the effect of setting the release time too fast on a sidechain compressor?" (Answer: Pumping/distortion). 

Generate the JSON now. Do not include markdown formatting outside the JSON block.

---
## END PROMPT
