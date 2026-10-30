#!/usr/bin/env python3
"""
make_all_decks_and_quizzes_mobile_ready.py
Injects comprehensive mobile responsive CSS (@media max-width: 768px & 640px) across:
1. All 30 interactive slide decks (public/interactive-slide-*.html + public/studio_effects_deck.html)
2. All 35 interactive quizzes (public/*quiz*.html)
"""
import glob
import os
import re
import shutil

DECK_MOBILE_CSS = """
    /* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === */
    @media (max-width: 768px) {
      html, body {
        overflow-x: hidden !important;
        max-width: 100vw !important;
      }
      .deck-topbar-controls, .top-utility-bar, header.deck-topbar-controls {
        padding: 6px 10px !important;
        gap: 6px !important;
        min-height: 42px !important;
        height: auto !important;
        flex-wrap: nowrap !important;
      }
      .exit-deck-link {
        padding: 5px 8px !important;
        font-size: 11px !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
      }
      .deck-topbar-title, .top-bar-title {
        font-size: 11.5px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 42vw !important;
      }
      .deck-topbar-controls .fullscreen-btn,
      .top-utility-bar .fullscreen-btn,
      .deck-topbar-controls button[onclick*="toggleFullscreen"],
      .top-utility-bar button[onclick*="toggleFullscreen"] {
        padding: 5px 8px !important;
        font-size: 11px !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
      }
      /* Collapse multi-column slide grids to 1 column on phones */
      .slide .split-grid,
      .slide .grid-2,
      .slide .grid-2-split,
      .slide .slide-grid-2,
      .slide .artist-hero-card,
      .slide .cover-gallery,
      .slide .grid-3,
      .slide .grid-4,
      .slide .cards-grid,
      .slide .comparison-grid,
      .slide .content-grid,
      .slide .two-col,
      .slide .three-col,
      .slide [style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }
      .slide .grid-2-split {
        display: flex !important;
        flex-direction: column !important;
        overflow-y: visible !important;
        height: auto !important;
      }
      .slide .column-panel {
        overflow-y: visible !important;
        max-height: none !important;
        height: auto !important;
        flex-shrink: 0 !important;
      }
      .slide, .slide.active {
        padding: 14px 12px 24px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
      }
      .slide h1 {
        font-size: clamp(20px, 5.5vw, 26px) !important;
        line-height: 1.22 !important;
      }
      .slide h2 {
        font-size: clamp(17px, 4.8vw, 22px) !important;
        line-height: 1.25 !important;
      }
      .slide p, .slide li {
        font-size: 13.5px !important;
        line-height: 1.5 !important;
      }
      .slide table {
        display: block !important;
        width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        font-size: 12px !important;
      }
      /* Bottom Controls Bar: Ensure Previous, Slide Counter, and Next always fit on 320-390px phones */
      footer.deck-controls,
      .deck-controls,
      .deck-nav,
      .bottom-bar,
      .deck-nav-bar {
        padding: 8px 10px !important;
        gap: 6px !important;
        min-height: 50px !important;
        height: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        flex-wrap: nowrap !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .deck-controls .controls-left,
      .bottom-bar .nav-buttons,
      .deck-nav-bar .nav-left,
      .deck-nav-bar .nav-right {
        display: contents !important;
      }
      /* Hide duplicate bottom Fullscreen button & wide dot arrays on mobile so Next button is never clipped */
      #bottomFsBtn,
      .deck-controls button[onclick*="toggleFullscreen"],
      .bottom-bar button[onclick*="toggleFullscreen"],
      .deck-nav button[onclick*="toggleFullscreen"],
      .deck-nav-bar button[onclick*="toggleFullscreen"],
      .controls-right,
      .keyboard-hint,
      .progress-dots,
      .slide-dots,
      #dotsContainer,
      #progressDots,
      .progress-track {
        display: none !important;
      }
      .progress-container,
      .slide-indicator,
      .deck-nav-bar .nav-center {
        flex: 1 1 auto !important;
        min-width: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 0 4px !important;
      }
      .slide-counter, #slideCounter {
        font-size: 11.5px !important;
        white-space: nowrap !important;
        text-align: center !important;
      }
      .slide-select, #slideSelect {
        max-width: 135px !important;
        font-size: 11.5px !important;
        padding: 5px 8px !important;
        text-overflow: ellipsis !important;
      }
      #prevBtn, #nextBtn, .nav-btn, .control-btn, .btn-nav {
        padding: 8px 12px !important;
        font-size: 12px !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
        min-width: auto !important;
      }
    }
    /* === END MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === */
"""

QUIZ_MOBILE_CSS = """
    /* === MTG QUIZ MOBILE PHONE RESPONSIVENESS OVERRIDES === */
    @media (max-width: 640px) {
      html, body {
        padding: 6px !important;
        justify-content: flex-start !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        min-height: 100vh !important;
      }
      .quiz-container, .quiz-card, .quiz-wrapper {
        border-radius: 14px !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      .quiz-header, .header-bar, header {
        padding: 12px 14px !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
      }
      .quiz-body, #quizStage, #questionScreen, .question-stage, #quizBody {
        padding: 14px !important;
        gap: 12px !important;
        min-height: auto !important;
      }
      .question-stem, #qText, #questionTitle, #questionText, .q-text {
        font-size: 15.5px !important;
        line-height: 1.38 !important;
        margin-bottom: 8px !important;
      }
      .options-grid, #optionsGrid, #answersGrid {
        gap: 8px !important;
      }
      .option-btn, .answer-btn {
        padding: 10px 12px !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        gap: 10px !important;
        border-radius: 10px !important;
      }
      .explanation-card, #insightCard, #feedbackBox, #explanationBox {
        padding: 12px 14px !important;
        font-size: 12.5px !important;
        line-height: 1.45 !important;
        margin-top: 8px !important;
      }
      .quiz-footer, .controls-row, #quizFooter, footer {
        padding: 12px 14px !important;
        position: sticky !important;
        bottom: 0 !important;
        background: rgba(15, 23, 42, 0.96) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        z-index: 20 !important;
      }
    }
    /* === END MTG QUIZ MOBILE PHONE RESPONSIVENESS OVERRIDES === */
"""


def main():
    decks = sorted(glob.glob("public/interactive-slide-*.html"))
    deck_count = 0
    for f in decks:
        with open(f, "r", encoding="utf-8") as fp:
            c = fp.read()
        c_clean = re.sub(
            r"\s*/\* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/.*?/\* === END MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/",
            "",
            c,
            flags=re.DOTALL
        )
        # Insert before last </style> in <head>
        style_idx = c_clean.find("</style>")
        if style_idx != -1:
            new_c = c_clean[:style_idx] + DECK_MOBILE_CSS + "\n  </style>" + c_clean[style_idx + 8:]
            if new_c != c:
                with open(f, "w", encoding="utf-8") as fp:
                    fp.write(new_c)
                deck_count += 1

    if os.path.exists("public/interactive-slide-studio-effects.html"):
        shutil.copyfile("public/interactive-slide-studio-effects.html", "public/studio_effects_deck.html")

    print(f"Updated mobile CSS across {deck_count}/{len(decks)} interactive decks (+ studio_effects_deck.html)")

    quizzes = sorted(glob.glob("public/*quiz*.html"))
    quiz_count = 0
    for f in quizzes:
        with open(f, "r", encoding="utf-8") as fp:
            c = fp.read()
        c_clean = re.sub(
            r"\s*/\* === MTG QUIZ MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/.*?/\* === END MTG QUIZ MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/",
            "",
            c,
            flags=re.DOTALL
        )
        style_idx = c_clean.find("</style>")
        if style_idx != -1:
            new_c = c_clean[:style_idx] + QUIZ_MOBILE_CSS + "\n  </style>" + c_clean[style_idx + 8:]
            if new_c != c:
                with open(f, "w", encoding="utf-8") as fp:
                    fp.write(new_c)
                quiz_count += 1

    print(f"Updated mobile CSS across {quiz_count}/{len(quizzes)} interactive quizzes")


if __name__ == "__main__":
    main()
