# Rule: Interactive Question Review Protocol for course_data.json

When working on revision questions in `src/data/course_data.json`:
1. Check each question, answers, explanation, quote, and image against the Edexcel A-Level Music Technology syllabus.
2. Formulate simplified, punchy options with realistic distractors (eliminate joke answers).
3. Check existing repository images first; generate crisp studio diagrams only when needed.
4. **ALWAYS** present the proposed options to the user and wait for explicit approval before editing `course_data.json`.
5. Run `node -e "JSON.parse(require('fs').readFileSync('src/data/course_data.json'))"` after every modification.
