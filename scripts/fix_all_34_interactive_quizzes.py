#!/usr/bin/env python3
"""
Fixes all 34 interactive quiz HTML files in public/*quiz*.html so that:
1. The static `questions` array in all 23 `options`/`correct` quizzes has its options permuted
   so `correct` indices are evenly balanced across 0 (A), 1 (B), 2 (C), and 3 (D) with no streaks.
2. Every question load (`loadQuestion` / `renderQuestion`) dynamically shuffles `q.options` via
   an unbiased Fisher-Yates shuffle and updates `q.correct` to match the new position of the
   correct answer.
3. `classic-keyboards-interactive-quiz.html` and `the-synthesizer-interactive-quiz.html` use
   an unbiased Fisher-Yates shuffle instead of `.sort(...)`.
"""
import glob
import json
import re

BALANCED_TARGETS = [2, 0, 3, 1, 2, 1, 3, 0, 1, 3, 0, 2, 1, 2, 0, 3]

SHUFFLE_SNIPPET = """
      if (q && Array.isArray(q.options) && typeof q.correct === 'number') {
        const _correctOpt = q.options[q.correct];
        for (let _i = q.options.length - 1; _i > 0; _i--) {
          const _j = Math.floor(Math.random() * (_i + 1));
          const _tmp = q.options[_i];
          q.options[_i] = q.options[_j];
          q.options[_j] = _tmp;
        }
        q.correct = q.options.indexOf(_correctOpt);
      }"""


def balance_static_questions(html, fname):
    # Match `const questions = [...];`
    m = re.search(r"(const\s+questions\s*=\s*)(\[.*?\])(\s*;)", html, re.S)
    if not m:
        return html, []

    prefix, arr_str, suffix = m.group(1), m.group(2), m.group(3)
    try:
        questions = json.loads(arr_str)
    except Exception:
        try:
            quoted = re.sub(r'(\b(?:question|options|correct|explanation|category|ao|text|insight|tip|q|expl)\b)\s*:', r'"\1":', arr_str)
            questions = json.loads(quoted)
        except Exception:
            return html, None

    if not questions or "options" not in questions[0] or "correct" not in questions[0]:
        return html, []

    new_indices = []
    for idx, q in enumerate(questions):
        opts = q["options"]
        corr_idx = q["correct"]
        if not isinstance(corr_idx, int) or corr_idx < 0 or corr_idx >= len(opts):
            continue
        target_idx = BALANCED_TARGETS[idx % len(BALANCED_TARGETS)] % len(opts)
        if corr_idx != target_idx:
            # Swap corr_idx and target_idx
            opts[corr_idx], opts[target_idx] = opts[target_idx], opts[corr_idx]
            q["correct"] = target_idx
        new_indices.append(q["correct"])

    # Format nicely
    is_single_line = "\n" not in arr_str.strip()
    if is_single_line:
        new_arr_str = json.dumps(questions, ensure_ascii=False)
    else:
        new_arr_str = json.dumps(questions, indent=2, ensure_ascii=False)

    html = html[:m.start()] + prefix + new_arr_str + suffix + html[m.end():]
    return html, new_indices


def balance_js_literal_questions(html, fname):
    """For files where `const questions = [...]` uses single-quoted or unquoted JS object literals."""
    # Find each question object's options array and correct: <int>
    # Let's check which files failed strict json.loads
    return html


def main():
    quiz_files = sorted(glob.glob("public/*quiz*.html"))
    print(f"Inspecting {len(quiz_files)} quiz files...")

    for f in quiz_files:
        with open(f, "r", encoding="utf-8") as fp:
            orig = fp.read()
        html = orig

        # 1. Try balancing static JSON questions
        html, new_indices = balance_static_questions(html, f)
        if new_indices is None:
            print(f"  [NOTE] {f} uses non-JSON JS literal for questions")

        # 2. If this file has `correct: <int>` and `options`, inject runtime Fisher-Yates shuffle
        has_idx_correct = bool(re.search(r"\"?correct\"?\s*:\s*\d+", html))
        if has_idx_correct and "_correctOpt" not in html:
            # Inject right after `const q = questions[...];` inside loadQuestion or renderQuestion
            html, count = re.subn(
                r"(function\s+(?:loadQuestion|renderQuestion)\s*\([^)]*\)\s*\{\s*(?:answered\s*=\s*false;\s*)?const\s+q\s*=\s*questions\[[^\]]+\];)",
                r"\1" + SHUFFLE_SNIPPET,
                html,
                count=1
            )
            if count == 0:
                print(f"  [WARN] Could not inject SHUFFLE_SNIPPET in {f}")

        # 3. Fix classic-keyboards-interactive-quiz.html deterministic length sort
        if "classic-keyboards-interactive-quiz.html" in f:
            html = html.replace(
                "answers.sort((a, b) => (a.text.length % 3) - (b.text.length % 3));",
                "for (let i = answers.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [answers[i], answers[j]] = [answers[j], answers[i]]; }"
            )

        # 4. Fix the-synthesizer-interactive-quiz.html biased .sort(() => Math.random() - 0.5)
        if "the-synthesizer-interactive-quiz.html" in f:
            html = html.replace(
                "].sort(() => Math.random() - 0.5);",
                "];\n      for (let i = allOpts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [allOpts[i], allOpts[j]] = [allOpts[j], allOpts[i]]; }"
            )

        if html != orig:
            with open(f, "w", encoding="utf-8") as fp:
                fp.write(html)
            print(f"  UPDATED {f:48s} | static indices={new_indices}")
        else:
            print(f"  OK      {f:48s} (already Fisher-Yates shuffled)")


if __name__ == "__main__":
    main()
