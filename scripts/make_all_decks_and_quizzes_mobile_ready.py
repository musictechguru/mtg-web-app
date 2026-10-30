#!/usr/bin/env python3
"""
Ensure all 31 interactive slide decks (30 topic decks + studio_effects_deck.html)
and 35 interactive quizzes in public/ are 100% mobile-phone responsive (320px - 430px viewports),
with:
- Single continuous vertical scroll per slide (.slide.active { display: block !important; height: 100% !important; overflow-y: auto !important; })
- Zero clipped or 0px-height columns (.grid-2-split, .split-grid, .column-panel, .col-panel all unconstrained on mobile)
- Stacked card headers (.panel-header, .col-header, .takeaway-box) on phones so badges and titles never crush each other
- Clean top and bottom navigation bars across all 12 deck templates
- iOS Safari / mobile fullscreen fallback in toggleFullscreen() when embedded in WordPress iframes
- Touch-swipe left/right slide navigation across all 31 decks
"""
import glob
import os
import re

DECK_MOBILE_CSS = """
    /* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === */
    @media (max-width: 768px) {
      html, body {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
        max-width: 100vw !important;
        display: flex !important;
        flex-direction: column !important;
      }
      /* Compact top utility bar */
      .deck-topbar-controls, .top-utility-bar, header.deck-topbar-controls {
        padding: 6px 10px !important;
        gap: 6px !important;
        min-height: 40px !important;
        height: auto !important;
        flex-wrap: nowrap !important;
        flex-shrink: 0 !important;
        justify-content: space-between !important;
      }
      /* Hide secondary promo link in topbar on phones so Fullscreen button never clips */
      .deck-topbar-controls a[href*="app.musictechguru.com"] {
        display: none !important;
      }
      .exit-deck-link {
        padding: 5px 8px !important;
        font-size: 11px !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
      }
      .deck-topbar-controls > div:first-child,
      .top-utility-bar > div:first-child,
      header.deck-topbar-controls > div:first-child {
        min-width: 0 !important;
        flex: 1 1 auto !important;
        overflow: hidden !important;
      }
      .deck-topbar-title, .top-bar-title, .deck-topbar-controls span[style*="color: #94a3b8"] {
        font-size: 11px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 38vw !important;
        display: inline-block !important;
        vertical-align: middle !important;
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
      /* Hide redundant secondary inner banner bars on mobile to maximize slide viewport height */
      header.deck-topbar,
      .deck-topbar,
      .top-bar {
        display: none !important;
      }
      header.deck-header, .deck-header {
        padding: 6px 12px !important;
        min-height: auto !important;
        flex-shrink: 0 !important;
      }
      header.deck-header .deck-title-group, .deck-header .deck-title-group {
        display: none !important;
      }
      header.deck-header .deck-actions, .deck-header .deck-actions {
        width: 100% !important;
        display: flex !important;
        justify-content: space-between !important;
      }
      header.deck-header .slide-select, .deck-header .slide-select {
        max-width: 100% !important;
        width: 100% !important;
      }
      header.deck-header button, .deck-header button {
        display: none !important;
      }
      /* Full-bleed deck wrapper / container as flex column */
      .deck-wrapper, .deck-container {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
        flex: 1 1 auto !important;
        min-height: 0 !important;
        height: auto !important;
        max-height: none !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }
      .slides-viewport, .slide-stage {
        flex: 1 1 auto !important;
        min-height: 0 !important;
        width: 100% !important;
        padding: 0 !important;
        overflow: hidden !important;
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
      }
      /* Single continuous vertical scroll container for the active slide */
      .slide:not(.active) {
        display: none !important;
      }
      .slide.active {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        flex: 1 1 auto !important;
        min-height: 0 !important;
        padding: 14px 14px 80px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        box-sizing: border-box !important;
        transform: none !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
      /* Collapse all multi-column slide grids into a single unconstrained vertical stack */
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
        display: flex !important;
        flex-direction: column !important;
        grid-template-columns: 1fr !important;
        gap: 14px !important;
        flex: none !important;
        width: 100% !important;
        height: auto !important;
        min-height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        margin-bottom: 16px !important;
      }
      /* Unconstrain all column panels and cards so they expand naturally inside the slide scroll */
      .slide .column-panel,
      .slide .col-panel,
      .slide .info-card,
      .slide .feature-card,
      .slide .music-col,
      .slide .instrument-col,
      .slide .format-col,
      .slide .prod-col,
      .slide .tech-col,
      .slide .col-music,
      .slide .col-tech,
      .slide .artist-visual-col {
        display: flex !important;
        flex-direction: column !important;
        flex: none !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        padding: 14px !important;
        box-sizing: border-box !important;
      }
      /* Stack panel headers and takeaway/tip boxes vertically on phones so badges & text never crush */
      .slide .panel-header,
      .slide .col-header,
      .slide .header-bar,
      .slide .takeaway-box,
      .slide .callout-box,
      .slide .exam-tip,
      .slide .tip-box {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        gap: 6px !important;
        height: auto !important;
      }
      /* Give photo cards and hardware images generous height on mobile */
      .slide .photo-card,
      .slide .hardware-photo,
      .slide .instrument-photo-card {
        height: auto !important;
        min-height: 175px !important;
        max-height: none !important;
        flex-shrink: 0 !important;
      }
      .slide .photo-card img,
      .slide .hardware-photo img,
      .slide .instrument-photo-card img.instrument-photo {
        height: 185px !important;
        max-height: 220px !important;
        width: 100% !important;
        object-fit: contain !important;
      }
      .slide .table-container,
      .slide .comp-table-wrap {
        overflow-x: auto !important;
        overflow-y: visible !important;
        max-height: none !important;
        flex: none !important;
        width: 100% !important;
      }
      .slide h1, .slide .slide-heading, .slide .slide-title {
        font-size: clamp(20px, 5.5vw, 25px) !important;
        line-height: 1.22 !important;
      }
      .slide h2 {
        font-size: clamp(17px, 4.8vw, 21px) !important;
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
      /* Bottom Controls Bar: Ensure Previous, Slide Counter/Dropdown, and Next always fit on 320-430px phones */
      footer.deck-controls,
      .deck-controls,
      .deck-nav,
      .bottom-bar,
      .deck-nav-bar,
      .deck-footer,
      .deck-bottombar {
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
        flex-shrink: 0 !important;
      }
      .deck-controls .controls-left,
      .bottom-bar .nav-buttons,
      .deck-nav-bar .nav-left,
      .deck-nav-bar .nav-right,
      .deck-nav-bar > div:first-child {
        display: contents !important;
      }
      /* Reorder amplifiers bottom bar children so Prev is left, Counter is center, Next is right */
      .deck-nav-bar #prevBtn { order: 1 !important; }
      .deck-nav-bar .slide-counter, .deck-nav-bar .nav-center { order: 2 !important; }
      .deck-nav-bar #nextBtn { order: 3 !important; }
      /* When both a slide-counter and a slide-select dropdown exist in deck-nav-bar, hide the duplicate text counter on phones */
      .deck-nav-bar .nav-left .slide-counter {
        display: none !important;
      }
      /* Hide duplicate bottom Fullscreen button, keyboard hints & wide dot arrays on mobile so Next button is never clipped */
      #bottomFsBtn,
      .deck-controls button[onclick*="toggleFullscreen"],
      .bottom-bar button[onclick*="toggleFullscreen"],
      .deck-nav button[onclick*="toggleFullscreen"],
      .deck-nav-bar button[onclick*="toggleFullscreen"],
      .deck-footer button[onclick*="toggleFullscreen"],
      .deck-bottombar button[onclick*="toggleFullscreen"],
      .controls-right,
      .keyboard-hint,
      .nav-shortcuts,
      .progress-dots,
      .slide-dots,
      #dotsContainer,
      #progressDots,
      .progress-track,
      .progress-bar-track,
      .progress-bar-container {
        display: none !important;
      }
      .progress-container,
      .progress-group,
      .deck-progress-group,
      .slide-indicator,
      .deck-nav-bar .nav-center {
        flex: 1 1 auto !important;
        min-width: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 0 4px !important;
      }
      .slide-counter, #slideCounter, .progress-label {
        font-size: 11.5px !important;
        white-space: nowrap !important;
        text-align: center !important;
      }
      .slide-select, #slideSelect {
        max-width: 155px !important;
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

DECK_MOBILE_JS = """
  // Universal mobile-friendly toggleFullscreen (with fallback for iPhone / iOS Safari where Fullscreen API is unavailable on divs)
  window.toggleFullscreen = function() {
    var docEl = document.documentElement;
    var isFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (!isFs) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(function() {
          if (window.self !== window.top) {
            window.top.location.href = window.location.href;
          }
        });
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (window.self !== window.top) {
        // iOS Safari fallback: open the standalone deck full-screen in the top viewport
        window.top.location.href = window.location.href;
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // Universal touch-swipe slide navigation for mobile phones
  (function() {
    var touchStartX = 0;
    var touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
      if (!e.changedTouches || !e.changedTouches.length) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      if (!e.changedTouches || !e.changedTouches.length) return;
      var target = e.target;
      if (target && target.closest && target.closest('table, .table-container, .comp-table-wrap, select, button, a, .video-modal-backdrop, #videoModal')) {
        return;
      }
      var dx = e.changedTouches[0].screenX - touchStartX;
      var dy = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.8) {
        if (dx < 0) {
          if (typeof nextSlide === 'function') nextSlide();
          else if (typeof changeSlide === 'function') changeSlide(1);
        } else {
          if (typeof prevSlide === 'function') prevSlide();
          else if (typeof changeSlide === 'function') changeSlide(-1);
        }
      }
    }, { passive: true });
  })();
"""

QUIZ_MOBILE_CSS = """
    /* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === */
    @media (max-width: 640px) {
      html, body {
        overflow-x: hidden !important;
      }
      body {
        padding: 12px 10px 24px !important;
        align-items: flex-start !important;
      }
      .quiz-container, .quiz-card, .container, main {
        width: 100% !important;
        max-width: 100% !important;
        padding: 16px 14px !important;
        margin: 0 auto !important;
        border-radius: 14px !important;
        box-sizing: border-box !important;
      }
      .quiz-header, .header-row, .top-bar {
        flex-wrap: wrap !important;
        gap: 8px !important;
      }
      h1, .quiz-title {
        font-size: clamp(19px, 5.5vw, 24px) !important;
        line-height: 1.25 !important;
      }
      .question-text, #questionText, h2 {
        font-size: clamp(15px, 4.4vw, 18px) !important;
        line-height: 1.4 !important;
      }
      .option-btn, .option, .answer-btn, .choice-btn {
        padding: 12px 12px !important;
        font-size: 13.5px !important;
        line-height: 1.4 !important;
        min-height: 46px !important;
      }
      .quiz-footer, .nav-row, .controls-row, .action-row {
        flex-wrap: wrap !important;
        gap: 8px !important;
      }
    }
    /* === END MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === */
"""


def update_decks():
    deck_files = sorted(glob.glob("public/interactive-slide-*.html") + ["public/studio_effects_deck.html"])
    updated = 0
    for path in deck_files:
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()

        # Make root-relative /images/ paths relative (images/) so both production and local file:// work seamlessly
        html = html.replace('src="/images/', 'src="images/')

        # Replace raw LaTeX dollar expressions with clean native HTML
        latex_replacements = {
            "$f_c$": "<em>f</em><sub>c</sub>",
            "$Q = f_c / \\Delta f$": "<em>Q</em> = <em>f</em><sub>c</sub> / &Delta;<em>f</em>",
            "$1/n^2$": "1/<em>n</em><sup>2</sup>",
            "$1f, 2f, 3f, 4f...$": "1<em>f</em>, 2<em>f</em>, 3<em>f</em>, 4<em>f</em>...",
            "$1f, 2f, 3f...$": "1<em>f</em>, 2<em>f</em>, 3<em>f</em>...",
            "$1f, 3f, 5f...$": "1<em>f</em>, 3<em>f</em>, 5<em>f</em>...",
            "$1f$": "1<em>f</em>",
            "$Q$": "<em>Q</em>",
            "$500ms \\times 0.75 = 375ms$": "500ms &times; 0.75 = 375ms",
            "$0.75$": "0.75",
            "$\\rightarrow$": "&rarr;",
            "$\\Phi$": "&Phi;",
            "$ arnothing$": "&oslash;",
            "$\x08arnothing$": "&oslash;",
            "$\x0barnothing$": "&oslash;",
        }
        for k, v in latex_replacements.items():
            html = html.replace(k, v)

        # Remove previous mobile override block if present
        html = re.sub(
            r"\s*/\* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/.*?/\* === END MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/\s*",
            "\n",
            html,
            flags=re.S,
        )

        # Remove previous mobile JS block if present
        html = re.sub(
            r"\s*// Universal mobile-friendly toggleFullscreen.*?\(\)\);\s*",
            "\n",
            html,
            flags=re.S,
        )

        if "</style>" in html:
            idx = html.rfind("</style>")
            html = html[:idx] + DECK_MOBILE_CSS + "\n  </style>" + html[idx + len("</style>"):]

        if "<!-- === END HASH DEEP LINK === -->" in html:
            html = html.replace(
                "</script>\n<!-- === END HASH DEEP LINK === -->",
                DECK_MOBILE_JS + "\n</script>\n<!-- === END HASH DEEP LINK === -->",
            )

        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        updated += 1
    print(f"Updated {updated} interactive decks with mobile phone responsiveness + iOS fullscreen + touch swipe.")


def update_quizzes():
    quiz_files = sorted(glob.glob("public/*quiz*.html"))
    updated = 0
    for path in quiz_files:
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()

        html = re.sub(
            r"\s*/\* === MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/.*?/\* === END MTG MOBILE PHONE RESPONSIVENESS OVERRIDES === \*/\s*",
            "\n",
            html,
            flags=re.S,
        )

        if "</style>" in html:
            idx = html.rfind("</style>")
            html = html[:idx] + QUIZ_MOBILE_CSS + "\n  </style>" + html[idx + len("</style>"):]
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
            updated += 1
    print(f"Updated {updated} interactive quizzes with mobile phone responsiveness.")


if __name__ == "__main__":
    update_decks()
    update_quizzes()
