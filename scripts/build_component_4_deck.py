#!/usr/bin/env python3
"""
build_component_4_deck.py
Generates the split-screen interactive presentation deck for Edexcel A-Level Component 4: Producing and Analysing (9MT0/04).
Creates: public/interactive-slide-component-4.html
Includes:
- 10 in-depth slides covering the full Component 4 syllabus
- Screen-fitting layout (100vh lock, independent column scroll)
- Top bar with Exit Deck link back to Component 4 Hub
- Fullscreen toggle in bottom bar & top bar
- Floating Exit Fullscreen button (✕ Exit Fullscreen)
- Expandable lightbox modals for all schematics and diagrams
- Keyboard shortcuts: 'F' toggles fullscreen, 'Esc' closes modals / exits fullscreen
"""

import os
import re

TOTAL_SLIDES = 10

HTML_HEAD = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Component 4: Producing &amp; Analysing | Edexcel A-Level Music Technology Master Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-dark: #080e1a;
      --panel-bg: #0f172a;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-prod: #00C1F0;
      --accent-prod-glow: rgba(0, 193, 240, 0.25);
      --accent-tech: #38bdf8;
      --accent-tech-glow: rgba(56, 189, 248, 0.25);
      --accent-gold: #f59e0b;
      --accent-purple: #a855f7;
      --text-white: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --border-subtle: rgba(255, 255, 255, 0.06);
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}

    html, body {{
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }}

    body {{
      background-color: var(--bg-dark);
      color: var(--text-white);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.5;
      display: flex !important;
      flex-direction: column !important;
      height: 100vh !important;
      max-height: 100vh !important;
      box-sizing: border-box !important;
    }}

    /* Top utility bar */
    .deck-topbar-controls {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 16px;
      background: rgba(8, 14, 26, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11.5px;
      z-index: 90;
      flex-shrink: 0;
      height: 36px;
      box-sizing: border-box;
    }}

    .exit-deck-link {{
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
      cursor: pointer;
    }}
    .exit-deck-link:hover {{
      background: rgba(0, 193, 240, 0.2);
      border-color: rgba(0, 193, 240, 0.4);
      color: #7dd3fc;
    }}

    .deck-topbar-title {{
      color: #cbd5e1;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .floating-exit-fs {{
      display: none;
      position: fixed;
      top: 10px;
      right: 14px;
      z-index: 100000;
      background: rgba(239, 68, 68, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #ffffff;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
      transition: all 0.2s ease;
    }}
    .floating-exit-fs:hover {{
      background: #dc2626;
      transform: scale(1.05);
    }}
    :fullscreen .floating-exit-fs,
    :-webkit-full-screen .floating-exit-fs,
    .is-fullscreen .floating-exit-fs {{
      display: inline-flex !important;
    }}

    /* Main Container */
    .deck-container {{
      max-width: 1560px !important;
      margin: 0 auto !important;
      padding: 6px 16px 0 !important;
      width: 100% !important;
      flex: 1 !important;
      min-height: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }}

    .slide {{
      display: none;
      height: 100% !important;
      min-height: 0 !important;
      box-sizing: border-box !important;
    }}

    .slide.active {{
      display: flex !important;
      flex-direction: column !important;
    }}

    .slide-header {{
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
      flex-shrink: 0 !important;
      border-bottom: 1px solid var(--border-subtle);
    }}

    .deck-tag {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 193, 240, 0.12);
      border: 1px solid rgba(0, 193, 240, 0.3);
      color: var(--accent-prod);
      font-size: 10px !important;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 2px 8px !important;
      border-radius: 9999px;
      margin-bottom: 2px !important;
    }}

    .slide-heading {{
      font-size: clamp(17px, 1.8vw, 22px) !important;
      font-weight: 900;
      letter-spacing: -0.5px;
      line-height: 1.15 !important;
      margin-bottom: 2px !important;
    }}

    .slide-heading span {{
      color: var(--accent-prod);
    }}

    .slide-lead {{
      color: var(--text-muted);
      font-size: 12px !important;
      line-height: 1.35 !important;
      margin-bottom: 0 !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }}

    /* Split-screen layout */
    .grid-2-split {{
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 12px !important;
      flex: 1 !important;
      min-height: 0 !important;
      margin-bottom: 54px !important;
      overflow: hidden !important;
    }}

    .column-panel {{
      background: var(--panel-bg);
      border-radius: 12px;
      border: 1px solid var(--card-border);
      padding: 10px 12px !important;
      display: flex !important;
      flex-direction: column !important;
      overflow-y: auto !important;
      min-height: 0 !important;
      max-height: 100% !important;
      box-sizing: border-box !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }}

    .column-panel::-webkit-scrollbar {{
      width: 4px;
    }}
    .column-panel::-webkit-scrollbar-track {{
      background: rgba(0, 0, 0, 0.2);
    }}
    .column-panel::-webkit-scrollbar-thumb {{
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }}

    .prod-col {{
      border-top: 3px solid var(--accent-prod);
    }}

    .tech-col {{
      border-top: 3px solid var(--accent-tech);
    }}

    .panel-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
      border-bottom: 1px solid var(--border-subtle);
      flex-shrink: 0 !important;
    }}

    .panel-badge {{
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 7px;
      border-radius: 4px;
    }}

    .prod-badge {{
      background: rgba(0, 193, 240, 0.15);
      color: var(--accent-prod);
      border: 1px solid rgba(0, 193, 240, 0.3);
    }}

    .tech-badge {{
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent-tech);
      border: 1px solid rgba(56, 189, 248, 0.3);
    }}

    .panel-title {{
      font-size: 11px;
      font-weight: 700;
      color: var(--text-dim);
    }}

    .video-container {{
      position: relative;
      padding-bottom: 44%;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      background: #000;
      margin-bottom: 6px !important;
      border: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0 !important;
    }}

    .video-container iframe {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }}

    .track-meta {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      flex-shrink: 0 !important;
    }}

    .track-title {{
      font-size: 12px !important;
      font-weight: 800;
      color: var(--text-white);
    }}

    .track-artist {{
      font-size: 11px;
      color: var(--accent-prod);
      font-weight: 600;
    }}

    .ear-training-box {{
      background: rgba(0, 193, 240, 0.06);
      border: 1px solid rgba(0, 193, 240, 0.2);
      border-left: 3px solid var(--accent-prod);
      border-radius: 8px;
      padding: 8px 10px !important;
      margin-bottom: 6px !important;
      font-size: 11.5px !important;
      line-height: 1.4 !important;
    }}

    .ear-training-header {{
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      color: var(--accent-prod);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }}

    .ear-points {{
      list-style: none;
      padding: 0;
      margin: 0;
    }}

    .ear-points li {{
      position: relative;
      padding-left: 14px;
      margin-bottom: 4px;
      color: #cbd5e1;
    }}

    .ear-points li::before {{
      content: '▶';
      position: absolute;
      left: 0;
      color: var(--accent-prod);
      font-size: 8px;
      top: 3px;
    }}

    .hardware-photo {{
      width: 100%;
      height: clamp(110px, 14vh, 150px) !important;
      object-fit: contain;
      background: #000;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 6px !important;
      cursor: zoom-in;
      transition: transform 0.2s ease, border-color 0.2s ease;
      flex-shrink: 0 !important;
    }}

    .hardware-photo:hover {{
      transform: scale(1.01);
      border-color: var(--accent-tech);
    }}

    .hardware-hero-card {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      flex-shrink: 0 !important;
    }}

    .inst-name {{
      font-size: 13px;
      font-weight: 800;
      color: var(--text-white);
    }}

    .inst-specs {{
      font-size: 10.5px;
      color: var(--accent-tech);
      font-family: 'JetBrains Mono', monospace;
      margin-top: 2px;
    }}

    .history-card {{
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 6px 10px !important;
      margin-bottom: 6px !important;
      font-size: 11.5px !important;
      line-height: 1.35 !important;
      color: #cbd5e1;
    }}

    .history-card h4 {{
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--accent-tech);
      margin-bottom: 4px;
      font-weight: 800;
    }}

    .history-card p {{
      margin-bottom: 4px;
    }}
    .history-card p:last-child {{
      margin-bottom: 0;
    }}

    .mech-chain {{
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 8px;
      padding: 6px 10px !important;
      font-size: 11.5px !important;
    }}

    .mech-header {{
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--accent-gold);
      font-weight: 800;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }}

    .step-item {{
      display: flex;
      align-items: flex-start;
      gap: 6px !important;
      margin-bottom: 3px !important;
      font-size: 11px !important;
    }}

    .step-num {{
      background: rgba(56, 189, 248, 0.2);
      color: var(--accent-tech);
      border: 1px solid rgba(56, 189, 248, 0.4);
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 1px;
    }}

    .step-text strong {{
      color: #ffffff;
    }}
    .step-text span {{
      color: #94a3b8;
    }}

    .tags-cloud {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }}

    .tech-tag {{
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
      font-size: 9.5px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
    }}

    /* Table Matrix slide */
    .table-container {{
      overflow-y: auto !important;
      flex: 1 !important;
      margin-top: 6px !important;
      background: var(--panel-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
    }}

    .matrix-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
      text-align: left;
    }}

    .matrix-table th {{
      background: rgba(0, 193, 240, 0.15);
      color: var(--accent-prod);
      font-weight: 800;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.5px;
      padding: 8px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 2;
    }}

    .matrix-table td {{
      padding: 7px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
      vertical-align: top;
    }}

    .matrix-table tr:hover td {{
      background: rgba(255, 255, 255, 0.03);
    }}

    /* Bottom navigation bar */
    .bottom-bar {{
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 48px !important;
      background: rgba(8, 14, 26, 0.96) !important;
      backdrop-filter: blur(12px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
      padding: 6px 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      z-index: 100 !important;
      box-sizing: border-box !important;
    }}

    .nav-btn {{
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-white);
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }}

    .nav-btn:hover:not(:disabled) {{
      background: rgba(0, 193, 240, 0.2);
      border-color: rgba(0, 193, 240, 0.5);
      color: #7dd3fc;
    }}

    .nav-btn:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    .slide-indicator {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .slide-dots {{
      display: flex;
      gap: 5px;
    }}

    .dot {{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .dot.active {{
      background: var(--accent-prod);
      transform: scale(1.3);
      box-shadow: 0 0 8px var(--accent-prod);
    }}

    .slide-counter {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 600;
    }}

    /* Lightbox Modal */
    .image-modal-backdrop {{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 99999;
      justify-content: center;
      align-items: center;
      padding: 24px;
      box-sizing: border-box;
      cursor: zoom-out;
    }}

    .image-modal-backdrop.open {{
      display: flex;
    }}

    .image-modal-content {{
      position: relative;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: default;
    }}

    .image-modal-img-wrap {{
      max-width: 100%;
      max-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #030712;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
    }}

    .image-modal-img-wrap img {{
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      display: block;
    }}

    .image-modal-caption {{
      margin-top: 10px;
      color: #e2e8f0;
      font-size: 13px;
      font-weight: 700;
      text-align: center;
      max-width: 800px;
      line-height: 1.4;
    }}

    .image-modal-hint {{
      margin-top: 4px;
      color: #64748b;
      font-size: 11px;
    }}

    .image-modal-close {{
      position: absolute;
      top: -36px;
      right: 0;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: all 0.2s ease;
    }}
    .image-modal-close:hover {{
      background: #ef4444;
      border-color: #ef4444;
    }}
  </style>
</head>
<body>

  <!-- Floating Exit Fullscreen Button -->
  <button id="floatingExitFsBtn" class="floating-exit-fs" onclick="toggleFullscreen()" title="Exit Fullscreen (Esc)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <span>Exit Fullscreen</span>
  </button>

  <!-- Pinned Top Utility Bar -->
  <div class="deck-topbar-controls">
    <div style="display: flex; align-items: center; gap: 10px;">
      <a class="exit-deck-link" onclick="exitDeck()" title="Return to Component 4 Hub">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Exit Deck</span>
      </a>
      <span style="color: #64748b; font-size: 11px;">|</span>
      <span class="deck-topbar-title">
        <span>Component 4: Producing &amp; Analysing (9MT0/04)</span>
      </span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <button class="exit-deck-link" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)">
        <span class="fs-icon-enter">&#x26F6;</span>
        <span class="fs-icon-exit" style="display: none;">✕</span>
        <span class="fs-label">Fullscreen</span>
      </button>
    </div>
  </div>

  <div class="deck-container">
"""

HTML_FOOTER = """
  </div>

  <!-- Pinned Bottom Navigation Bar -->
  <div class="bottom-bar">
    <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      <span>Previous</span>
    </button>

    <div class="slide-indicator">
      <div class="slide-dots" id="dotsContainer"></div>
      <span class="slide-counter" id="slideCounter">1 / 10</span>
    </div>

    <div style="display: flex; gap: 8px; align-items: center;">
      <button class="nav-btn" onclick="toggleFullscreen()" title="Toggle Fullscreen (F)">
        <span class="fs-icon-enter">&#x26F6;</span>
        <span class="fs-icon-exit" style="display: none;">✕</span>
        <span class="fs-label-bottom">Fullscreen</span>
      </button>
      <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">
        <span>Next</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <!-- Universal Image Lightbox Modal -->
  <div class="image-modal-backdrop" id="imageModal" onclick="closeImageModal()" role="dialog" aria-modal="true" aria-label="Expanded Image View">
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeImageModal()" title="Close (Esc)" aria-label="Close">&times;</button>
      <div class="image-modal-img-wrap">
        <img id="imageModalImg" src="" alt="Expanded Image">
      </div>
      <div class="image-modal-caption" id="imageModalCaption"></div>
      <div class="image-modal-hint">Click outside or press <kbd>ESC</kbd> to close</div>
    </div>
  </div>

  <script>
    let currentSlide = 1;
    const totalSlides = 10;

    function initDots() {
      const container = document.getElementById('dotsContainer');
      container.innerHTML = '';
      for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 1 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        container.appendChild(dot);
      }
    }

    function updateUI() {
      document.querySelectorAll('.slide').forEach((s, idx) => {
        s.classList.toggle('active', (idx + 1) === currentSlide);
      });

      document.querySelectorAll('.dot').forEach((d, idx) => {
        d.classList.toggle('active', (idx + 1) === currentSlide);
      });

      document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;
      document.getElementById('prevBtn').disabled = (currentSlide === 1);
      document.getElementById('nextBtn').disabled = (currentSlide === totalSlides);
    }

    function changeSlide(direction) {
      goToSlide(currentSlide + direction);
    }

    function goToSlide(n) {
      if (n < 1) n = 1;
      if (n > totalSlides) n = totalSlides;
      currentSlide = n;
      updateUI();
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        changeSlide(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        changeSlide(-1);
      } else if (e.key === 'f' || e.key === 'F') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          toggleFullscreen();
        }
      } else if (e.key === 'Escape') {
        closeImageModal();
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
      }
    });

    // Fullscreen Controls
    function toggleFullscreen() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    }

    function updateFullscreenUI() {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      document.documentElement.classList.toggle('is-fullscreen', isFs);
      document.querySelectorAll('.fs-icon-enter').forEach(el => el.style.display = isFs ? 'none' : 'inline-block');
      document.querySelectorAll('.fs-icon-exit').forEach(el => el.style.display = isFs ? 'inline-block' : 'none');
      document.querySelectorAll('.fs-label, .fs-label-bottom').forEach(el => el.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen');
    }

    document.addEventListener('fullscreenchange', updateFullscreenUI);
    document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

    function exitDeck() {
      if (window.opener) {
        window.close();
      } else if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/';
      }
    }

    // Universal Lightbox
    function openImageModal(src, captionText) {
      const modal = document.getElementById('imageModal');
      const img = document.getElementById('imageModalImg');
      const caption = document.getElementById('imageModalCaption');
      if (!modal || !img) return;
      img.src = src;
      caption.textContent = captionText || '';
      modal.classList.add('open');
    }

    function closeImageModal() {
      const modal = document.getElementById('imageModal');
      const img = document.getElementById('imageModalImg');
      if (modal) modal.classList.remove('open');
      if (img) img.src = '';
    }

    document.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      const photo = e.target.closest('.hardware-photo');
      const target = img || (photo ? photo.querySelector('img') : null);
      if (target) {
        if (target.closest('#imageModal') || target.classList.contains('no-expand')) return;
        e.preventDefault();
        const cap = target.alt || target.getAttribute('title') || target.closest('.hardware-hero-card')?.querySelector('.inst-name')?.textContent || '';
        openImageModal(target.src, cap);
      }
    });

    initDots();
    updateUI();
  </script>
</body>
</html>
"""

def make_slide(slide_num, tag, heading, lead,
               music_badge, music_title, yt_id, track_title, track_artist,
               ear_title, ear_p1, ear_p2, tags_list,
               tech_badge, tech_title, img_src, img_alt,
               inst_name, inst_specs, hist_title, hist_p1, hist_p2,
               mech_title, mech_steps):
    
    tags_html = "".join([f'<span class="tech-tag">{t}</span>' for t in tags_list])
    
    steps_html = ""
    for s_num, s_title, s_desc in mech_steps:
        steps_html += f"""
        <div class="step-item">
          <div class="step-num">{s_num}</div>
          <div class="step-text"><strong>{s_title}:</strong> <span>{s_desc}</span></div>
        </div>
        """

    active_class = " active" if slide_num == 1 else ""

    return f"""
    <!-- SLIDE {slide_num} -->
    <div class="slide{active_class}" id="slide-{slide_num}">
      <div class="slide-header">
        <div class="deck-tag">{tag}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: PRACTICAL DAW AUDIO & VIDEO FOCUS -->
        <div class="column-panel prod-col">
          <div class="panel-header">
            <span class="panel-badge prod-badge">{music_badge}</span>
            <span class="panel-title">{music_title}</span>
          </div>

          <div class="video-container">
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1" 
                    title="{track_title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="track-meta">
            <div class="track-title">{track_title}</div>
            <div class="track-artist">{track_artist}</div>
          </div>

          <div class="ear-training-box">
            <div class="ear-training-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              {ear_title}
            </div>
            <ul class="ear-points">
              <li>{ear_p1}</li>
              <li>{ear_p2}</li>
            </ul>
          </div>

          <div class="tags-cloud">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: TECHNICAL ARCHITECTURE & SYLLABUS SPECIFICATION -->
        <div class="column-panel tech-col">
          <div class="panel-header">
            <span class="panel-badge tech-badge">{tech_badge}</span>
            <span class="panel-title">{tech_title}</span>
          </div>

          <img src="{img_src}" alt="{img_alt}" class="hardware-photo" title="Click to zoom {img_alt}">

          <div class="hardware-hero-card">
            <div class="inst-name">{inst_name}</div>
            <div class="inst-specs">{inst_specs}</div>
          </div>

          <div class="history-card">
            <h4>{hist_title}</h4>
            <p>{hist_p1}</p>
            <p>{hist_p2}</p>
          </div>

          <div class="mech-chain">
            <div class="mech-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {mech_title}
            </div>
            {steps_html}
          </div>
        </div>
      </div>
    </div>
    """

def make_table_slide(slide_num, tag, heading, lead,
                     music_badge, music_title, yt_id, track_title, track_artist,
                     ear_title, ear_p1, ear_p2, tags_list,
                     tech_badge, tech_title, table_html):
    tags_html = "".join([f'<span class="tech-tag">{t}</span>' for t in tags_list])
    active_class = " active" if slide_num == 1 else ""

    return f"""
    <!-- SLIDE {slide_num} -->
    <div class="slide{active_class}" id="slide-{slide_num}">
      <div class="slide-header">
        <div class="deck-tag">{tag}</div>
        <h1 class="slide-heading">{heading}</h1>
        <p class="slide-lead">{lead}</p>
      </div>

      <div class="grid-2-split">
        <!-- LEFT: VIDEO / STRATEGY -->
        <div class="column-panel prod-col">
          <div class="panel-header">
            <span class="panel-badge prod-badge">{music_badge}</span>
            <span class="panel-title">{music_title}</span>
          </div>

          <div class="video-container">
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1" 
                    title="{track_title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="track-meta">
            <div class="track-title">{track_title}</div>
            <div class="track-artist">{track_artist}</div>
          </div>

          <div class="ear-training-box">
            <div class="ear-training-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              {ear_title}
            </div>
            <ul class="ear-points">
              <li>{ear_p1}</li>
              <li>{ear_p2}</li>
            </ul>
          </div>

          <div class="tags-cloud">
            {tags_html}
          </div>
        </div>

        <!-- RIGHT: TABLE / MATRIX -->
        <div class="column-panel tech-col">
          <div class="panel-header">
            <span class="panel-badge tech-badge">{tech_badge}</span>
            <span class="panel-title">{tech_title}</span>
          </div>

          <div class="table-container">
            {table_html}
          </div>
        </div>
      </div>
    </div>
    """

def build_deck():
    slides = []

    # Slide 1: Component 4 Exam Architecture & Master Overview
    slides.append(make_slide(
        1, "Paper 9MT0/04 Overview", "Component 4: <span>Producing &amp; Analysing Architecture</span>",
        "The Pearson Edexcel Component 4 exam is a 2-hour 15-minute practical and written paper carrying 105 marks (40% of the A-Level). Candidates complete practical audio tasks in their DAW alongside critical written analysis.",
        "Official Exam Walkthrough", "Component 4 Exam Protocol & Time Management", "eI4k12bQGyY",
        "How to Score FULL MARKS in Component 4 – Fix This NOW!", "Music Tech Guru Masterclass",
        "🎧 Exam Room Setup & Ear-Training Protocol",
        "Calibrate closed-back monitor headphones before starting; verify uncompressed 24-bit/44.1kHz audio stems import without automatic tempo stretching.",
        "Split the 2h 15m session strictly: 45m for Q1–Q4 practical editing/correction, 45m for Q5 balance & mixdown, and 45m for Q6 extended technical essay.",
        ["105 Marks", "40% Qualification", "2h 15m Duration", "Logic Pro / DAW", "Section A + B", "Uncompressed Audio"],
        "DAW Architecture & Workflow", "Digital Audio Workstation Signal Engine", "/images/daw_interface.svg", "DAW Interface Signal Engine",
        "🖥️ The Component 4 Digital Studio Workspace", "24-bit / 44.1kHz Audio Engine &bull; Non-Destructive Editing &bull; 64-bit Float Mix Bus",
        "Exam Paper Structure & Mark Allocations",
        "Section A (85 marks) tests practical DAW tasks: editing, timing alignment, pitch correction, sample replacement, subtractive synthesis sound design, dynamic processing, and surgical EQ unmasking, culminating in Question 5 (final track balance and bounce).",
        "Section B (20 marks) is Question 6: an extended written evaluation analyzing contrasting recording scenarios, acoustic room behaviors, hardware circuitry, or digital signal paths under strict Pearson AO3/AO4 criteria.",
        "Examiner Traps & Golden Rules",
        [
            (1, "Zero-Crossings", "Always slice audio files at true zero-crossings to avoid audible DC clicks and digital pops."),
            (2, "Crossfade Safety", "Apply 5–10ms equal-power crossfades on all audio edits to prevent phase discontinuity."),
            (3, "Gain Staging", "Keep individual channel faders below 0 dBFS; aim for -18 dBFS RMS to preserve headroom on the mix bus.")
        ]
    ))

    # Slide 2: Audio Editing, Phase Alignment & Timing Correction
    slides.append(make_slide(
        2, "Section A &bull; Practical DAW Tasks", "Audio Editing: <span>Phase Alignment &amp; Timing Correction</span>",
        "Phase coherence is the single most tested concept in Component 4 drum and multi-mic stems. Minor millisecond time arrival offsets produce destructive comb filtering and hollow low-end.",
        "DAW Practical Demonstration", "Multi-Mic Drum Phase Alignment & Audio Manipulation", "6Tb2auJ52xI",
        "Creative Audio Manipulation for Component 4", "Music Tech Guru Tutorial",
        "🎧 Ear-Training Focus: Detecting Phase Cancellation",
        "Listen to the kick drum and overheads in mono: when polarity is inverted (180°), low-end fundamental punch immediately drops out and the snare sounds thin and nasal.",
        "Zoom into sample level on transient spikes: align the initial positive pressure peak of the snare top mic with the snare bottom and overhead left/right channels.",
        ["Phase Inversion", "3:1 Rule", "Comb Filtering", "Sample-Level Zoom", "Flex Time", "Polarity Flip"],
        "Phase Cancellation Physics", "Destructive Interference & Comb Filtering", "/images/phase_cancellation.svg", "Phase Cancellation Waveform Analysis",
        "〰️ Waveform Physics: In-Phase vs. 180° Anti-Phase", "Constructive Summing (+6dB) vs. Complete Destructive Cancellation (-∞ dB)",
        "The 3:1 Rule & Acoustic Time Offsets",
        "Sound travels at 343 m/s (~1ms per foot). When a source is picked up by two mics at differing distances, the arrival time delay causes destructive phase cancellation at $f = 1 / (2 \times \Delta t)$ and all odd harmonics.",
        "In Component 4, examiners require flipping polarity switches ($\varnothing$) on snare bottom and bass DI/mic tracks, or nudging audio stems by precise sample offsets to restore frequency fullness.",
        "Exam Slicing & Elastic Audio Algorithms",
        [
            (1, "Slicing Mode", "Best for percussive drums; preserves sharp transient attacks without stretching artifacts."),
            (2, "Rhythmic Mode", "Designed for percussion loops; controls decay tails with custom crossfade lengths."),
            (3, "Monophonic Mode", "Specialized for solo vocals, woodwind, and bass; preserves formant structure during pitch edits.")
        ]
    ))

    # Slide 3: Surgical Dynamic Processing (Compression, Limiting & Gating)
    slides.append(make_slide(
        3, "Section A &bull; Dynamic Processing", "Dynamic Control: <span>Compression, Gating &amp; Sidechaining</span>",
        "Component 4 tests precise configuration of compressor parameters to control dynamic range, shape transient attack punch, clamp peak overshoots, and clean bleed with noise gates.",
        "Hardware & Plugin Analysis", "VCA vs FET vs Opto Compressor Topologies", "VrnqkEQmT6I",
        "Classic Compressor Topologies in the Studio", "Music Technology Masterclass",
        "🎧 Ear-Training Focus: Attack & Release Calibration",
        "Fast attack (<1ms) crushes drum transients, pushing the snare backward in the mix; slower attack (15–30ms) lets initial stick-crack poke through before clamping body.",
        "Release time must breathe in musical tempo with the groove: too fast causes pumping distortion; too slow suffocates the next incoming transient hit.",
        ["Threshold", "Ratio", "Attack / Release", "Sidechain Ducking", "Noise Gate", "VCA / FET / Opto"],
        "Compressor Anatomy & Transfer Curve", "Input vs Output dB Transfer Function", "/images/compression_graph.svg", "Compressor Transfer Curve Diagram",
        "🎚️ Dynamic Processing Parameters & Circuit Topologies", "VCA (Clean/Precise) &bull; FET 1176 (Ultra-Fast 20µs) &bull; Opto LA-2A (Program-Dependent) &bull; Vari-Mu (Tube Bias)",
        "Sidechain Ducking & Frequency-Conscious Gating",
        "Sidechain compression routes an external key signal (e.g., Kick Drum) into the compressor's detector circuit to duck another track (e.g., 808 Sub Bass or Synth Pad), clearing low-end headroom and creating rhythmic groove.",
        "Frequency-dependent gating uses high-pass/low-pass sidechain filters so the snare gate only triggers on mid-frequency snare hits (2–4kHz) and ignores high-frequency hi-hat bleed.",
        "The 4 Core Compressor Controls",
        [
            (1, "Threshold (dB)", "Sets the decibel amplitude level above which gain reduction is triggered."),
            (2, "Ratio (X:1)", "Determines the proportion of input attenuation applied to signal exceeding threshold."),
            (3, "Make-up Gain", "Compensates for peak attenuation, raising the average RMS energy of the signal.")
        ]
    ))

    # Slide 4: Surgical Equalisation & Frequency Unmasking
    slides.append(make_slide(
        4, "Section A &bull; Frequency Balance", "Surgical EQ: <span>Frequency Carving &amp; Unmasking</span>",
        "Equalisation in Component 4 is fundamentally corrective: removing unwanted low-frequency rumble, carving overlapping clutter between competing instruments, and controlling resonant peaks.",
        "Logic Pro Tutorial", "Channel EQ in Logic Pro X – Essential Tips for Beginners", "jvBmG0NwMpI",
        "Channel EQ Surgical Carving & Filtering", "Music Tech Guru Masterclass",
        "🎧 Ear-Training Focus: Spotting Frequency Masking",
        "When kick drum (60Hz fundamental) and bass guitar (90Hz fundamental) compete for the same energy, subtractive EQ carving separates them so both remain articulate.",
        "Boxiness sits between 300Hz and 500Hz; nasal harshness between 1kHz and 3kHz; sibilance and harsh cymbals between 6kHz and 9kHz.",
        ["High-Pass 24dB/oct", "Q-Factor", "Subtractive Carving", "Unmasking", "Linear Phase", "Boxiness 300Hz"],
        "Kick & Bass Frequency Carving", "Complementary Subtractive EQ Sculpting", "/images/kick_drum_eq_carving_diagram.svg", "Kick and Bass Complementary EQ Diagram",
        "📊 Complementary Subtractive Frequency Sculpting", "Kick fundamental at 60Hz &bull; Bass notched at 60Hz / boosted at 90Hz &bull; Cleared 300Hz Mud",
        "High-Pass Filter Slopes & Q Factor Bandwidth",
        "High-pass filters (HPF) clean non-musical sub-rumble below 30Hz on kick/bass and below 100Hz on guitars and vocals. Filter slopes range from gentle 6dB/octave (1st-order) to steep 24dB/octave (4th-order).",
        "Quality factor $Q = f_0 / \\text{Bandwidth}$. High Q values (>5) create narrow surgical notches to remove unwanted room resonances or mains hum without altering surrounding timbre.",
        "Linear Phase vs. Minimum Phase in Exam Practice",
        [
            (1, "Minimum Phase", "Standard analogue-modeled EQ; zero latency and warm phase shift, but alters phase around cutoffs."),
            (2, "Linear Phase", "Preserves exact waveform time alignment; zero phase smearing, ideal for multi-mic drum overheads."),
            (3, "Subtractive Rule", "Always cut narrow with high Q to fix faults; boost wide with low Q (<1.0) for musical tone.")
        ]
    ))

    # Slide 5: Stereo Imaging, Panning Laws & Mid/Side Processing
    slides.append(make_slide(
        5, "Section A &bull; Spatial Positioning", "Stereo Imaging: <span>Panning Laws &amp; Mid/Side Processing</span>",
        "Component 4 requires understanding how pan pots work in DAW mixers, how mono center summing alters perceived loudness, and how Mid/Side matrixing decodes spatial balance.",
        "Spatial Audio Tutorial", "Panning Laws, Mid/Side Matrix & Mono Compatibility", "HaZpZQG2z10",
        "Spatial Positioning & Mid/Side Processing in Context", "Music Technology Masterclass",
        "🎧 Ear-Training Focus: Mono Fold-Down & Spatial Width",
        "Sum the master output to mono: any out-of-phase stereo widening tricks (like the Haas effect) collapse completely, causing hollow cancellation.",
        "Lead vocal, kick drum, snare drum, and bass guitar must remain dead center to anchor energy and preserve mono playback compatibility across mobile devices and club PAs.",
        ["Pan Laws -3dB", "Mid/Side (M/S)", "Mono Compatibility", "Goniometer", "Haas Effect <35ms", "Phase Correlation"],
        "Mid/Side Matrix & Phase Goniometer", "Sum (Mid) vs Difference (Side) Architecture", "/images/mastering_mid_side_processing_diagram.svg", "Mid/Side Matrix Processing Diagram",
        "📐 Panning Laws (-3dB, -4.5dB, -6dB) & Mid/Side Matrix", "Mid = Left + Right (Mono Center) &bull; Side = Left - Right (Stereo Difference)",
        "The Panning Law Dilemma",
        "When a signal is panned dead center, it is reproduced by both left and right speakers. In acoustic space, two identical sound sources combine constructively, boosting SPL by up to +6dB.",
        "DAW pan laws compensate for this center buildup by automatically attenuating center-panned signals by -3dB (equal power) or -4.5dB / -6dB (equal voltage), maintaining consistent perceived loudness across the stereo field.",
        "Mid/Side EQ & Processing Rules",
        [
            (1, "Mono Bass Safety", "Apply a high-pass filter to the Side channel at 100Hz to eliminate out-of-phase sub frequencies."),
            (2, "Side Air Shelf", "Boost high shelf (>10kHz) exclusively on the Side channel to expand perceived air without muddying center vocal."),
            (3, "Haas Danger", "Delaying one channel by 5–30ms creates width via the precedence effect, but causes severe mono comb filtering.")
        ]
    ))

    # Slide 6: Time-Based FX & Auxiliary Spatial Routing
    slides.append(make_slide(
        6, "Section A &bull; Time-Based Effects", "Time-Based FX: <span>Reverb Pre-Delay, RT60 &amp; Aux Busses</span>",
        "Auxiliary send/return topology is mandatory for spatial effects in Component 4: inserting reverb directly onto audio tracks wastes CPU, causes phase mud, and prevents shared acoustic space.",
        "Studio Effects Masterclass", "Reverb Pre-Delay, Decay Time & Aux Send Architecture", "4ZipvGWO2bQ",
        "Reverb in Context: Auxiliary Busses & Acoustic Space", "Music Technology Tutorial",
        "🎧 Ear-Training Focus: Pre-Delay Separation & Reverb EQ",
        "Setting 20–40ms pre-delay on vocal reverb leaves the initial dry consonant attack completely articulate before the ambient reverb wash envelops the note.",
        "Abbey Road Reverb Trick: High-pass reverb sends at 600Hz and low-pass at 6kHz to prevent low-end bass rumble and harsh high-frequency splash.",
        ["Aux Send/Return", "Pre-Delay Gap", "RT60 Decay", "Abbey Road Trick", "Convolution IR", "Tempo-Synced Delay"],
        "Abbey Road Reverb EQ Filter", "High-Pass 600Hz & Low-Pass 6kHz Aux Filtering", "/images/reverb_abbey_road_eq_diagram.svg", "Abbey Road Reverb Filtering Diagram",
        "🏛️ Reverb Architecture: Algorithmic vs. Convolution", "Impulse Response (IR) Sampling &bull; RT60 Decay Spectrum &bull; Early Reflections &bull; Late Reverb Tail",
        "Parallel Aux Send vs. Serial Insert Routing",
        "Time-based effects (reverb, delay) are placed on dedicated Auxiliary Return tracks set to 100% Wet. Individual track channel faders use variable Aux Sends to feed proportional dry signal into the shared virtual room.",
        "Modulation effects (chorus, phaser, flanger) are placed as Serial Inserts directly on channel strips, blending dry and wet inside the plugin using internal Mix % controls.",
        "Key Parameter Formulas for the Exam",
        [
            (1, "Quarter-Note Delay", "Delay time $(ms) = 60,000 / \\text{BPM}$. (e.g. at 120 BPM, quarter-note = 500ms)."),
            (2, "Dotted-Eighth Delay", "Multiply quarter-note delay by $0.75$ (e.g., $500ms \\times 0.75 = 375ms$)."),
            (3, "Pre-Delay Calculation", "Keep pre-delay under 50ms; longer offsets are heard as distinct slapback echoes rather than spatial depth.")
        ]
    ))

    # Slide 7: Synthesis, Sampling & Sound Design for the Exam
    slides.append(make_slide(
        7, "Section A &bull; Sound Design", "Synthesis &amp; Sampling: <span>Subtractive Signal Flow</span>",
        "Component 4 tests the candidate's ability to recreate reference synthesizer timbres from scratch using subtractive synthesis, envelope modulation, and sampler keyzone mapping.",
        "Synthesis Masterclass", "Recreating Reference Synth Patches in the Exam", "4_9X2h0v0cI",
        "Subtractive Synthesis & Sound Design for Component 4", "Music Technology Masterclass",
        "🎧 Ear-Training Focus: Waveform & Envelope Auditioning",
        "Sawtooth waves contain all integer harmonics ($1f, 2f, 3f...$), sounding bright and reedy; Square waves contain only odd harmonics ($1f, 3f, 5f...$), sounding hollow and clarinety.",
        "Fast Attack, Fast Decay, Zero Sustain, and Moderate Release creates a plucky percussive bass; Slow Attack (>500ms) with Max Sustain creates lush ambient pads.",
        ["Subtractive Flow", "Oscillators (VCO)", "VCF Cutoff / Res", "VCA Envelope", "ADSR Modulation", "Sampler Keyzones"],
        "Subtractive Synth Signal Flow", "Oscillator -> Filter -> Amplifier Architecture", "/images/subtractive_synth_flow_hq.png", "Subtractive Synthesizer Signal Flow Schematic",
        "🎹 Classic Subtractive Synthesis Architecture", "VCO / Waveforms &bull; 24dB/oct Ladder Filter &bull; Resonance ($Q$) &bull; Dual ADSR Envelopes &bull; LFO Mod Matrix",
        "Filter Cutoff Modulation & Key Tracking",
        "The filter envelope generator modulates cutoff frequency dynamically over time. Filter resonance ($Q$) boosts harmonics near the cutoff point, producing signature resonant squelches or self-oscillation.",
        "Key tracking (Keyboard Follow) opens the filter cutoff as higher MIDI notes are played, maintaining consistent brightness and harmonic proportions across the entire 88-key range.",
        "Sampler Mapping Fundamentals",
        [
            (1, "Root Key & Keyzones", "Assign raw audio samples to exact MIDI root notes; map keyzone boundaries to prevent unnatural chipmunk pitching."),
            (2, "Velocity Crossfading", "Layer multiple dynamic velocity layers (soft, medium, hard) to capture authentic acoustic timbre variations."),
            (3, "Loop Points & Crossfading", "Set zero-crossing loop points with equal-power crossfades on sustained pads to prevent clicks.")
        ]
    ))

    # Slide 8: Diagnostic Audio Fault Finding & Restoration
    slides.append(make_slide(
        8, "Section A &bull; Audio Troubleshooting", "Diagnostic Fault Finding: <span>Hum, Clipping &amp; Phase</span>",
        "Component 4 frequently introduces audio stems containing intentional audio faults. Candidates must identify the physical origin of the artifact and apply appropriate surgical corrective processing.",
        "Exam Walkthrough Video", "2019 Production & Analysing Exam (Sample Paper Guidance)", "MZb-bW6z5wI",
        "Edexcel Component 4 Guidance Video (Question 1)", "Music Tech Guru Official Exam Guide",
        "🎧 Ear-Training Focus: Recognizing Common Audio Artifacts",
        "Mains Hum: A steady 50Hz (UK) or 60Hz (US) low buzz with prominent harmonic overtones at 100Hz, 150Hz, 200Hz, caused by ground loops or unshielded guitar single-coils.",
        "Digital Intersample Clipping: Harsh, brittle square-wave distortion generated when audio exceeds 0 dBFS, producing unharmonic aliasing across high frequencies.",
        ["50Hz Mains Hum", "Digital Clipping", "DC Offset", "Vocal Sibilance", "Headphone Bleed", "Spectral Repair"],
        "Inter-Sample True Peak Overshoots", "Digital Overs vs Reconstruction Filter Reconstruction", "/images/mastering_intersample_true_peak_diagram.svg", "Inter-sample True Peak Clipping Diagram",
        "🔍 Common Component 4 Audio Faults & Corrective Solutions", "Ground Loops (50Hz) &bull; Digital Overs (>0 dBFS) &bull; DC Offset &bull; Sibilance (5–8kHz) &bull; Mic Spill",
        "DC Offset & Sibilance Management",
        "DC offset occurs when direct current biases the alternating audio waveform away from the zero-amplitude center line, reducing dynamic headroom and causing loud clicks at edit boundaries. Fix: Apply a high-pass filter at 20Hz.",
        "De-essing is frequency-specific split-band dynamic attenuation. When sibilant 'S' and 'T' sounds peak between 5kHz and 8kHz, the compressor ducks only that frequency band while leaving mid-range vocals untouched.",
        "Examiner Checklist for Audio Cleanup",
        [
            (1, "Mains Hum Removal", "Use narrow notch filters ($Q > 15$) at 50Hz, 100Hz, and 150Hz rather than a wide high-pass cut."),
            (2, "Headphone Bleed", "Use an automated downward expander or noise gate with gentle release to silence click spill during vocal pauses."),
            (3, "Phase Cancellation", "Check stereo stems in mono; if low frequencies vanish, flip polarity or apply manual sample delay nudging.")
        ]
    ))

    # Slide 9: Mix Balancing, Automation & Master Bus Delivery
    slides.append(make_slide(
        9, "Section A &bull; Final Delivery", "Mixdown &amp; Mastering: <span>Gain Staging, Automation &amp; LUFS</span>",
        "Question 5 requires producing a balanced stereo mixdown with appropriate dynamic control, spatial balance, volume automation, and export formatting matching industry loudness standards.",
        "Logic Pro Masterclass", "Basic Mastering on Logic Pro X – Walkthrough and Tips", "BNQIKRvOi9c",
        "Mixdown Balance, Bus Processing & Master Export", "Music Tech Guru Tutorial",
        "🎧 Ear-Training Focus: Master Bus Glue & Loudness",
        "Mix bus glue compression uses gentle 1.5:1 or 2:1 ratios with slow attack (30ms) and auto release: needles should tickle only 1–2dB of gain reduction to knit elements together.",
        "Do not over-limit: crushing dynamics down to -8 LUFS destroys punch and transient clarity. Maintain healthy dynamic crest factor for streaming platforms.",
        ["-18 dBFS Headroom", "Mix Bus Glue", "Automation Modes", "True Peak Limiter", "-14 LUFS Standards", "TPDF Dither"],
        "Mix Bus Compression & Streaming Loudness", "True Peak Ceiling & Integrated LUFS Metering", "/images/mastering_bus_compression_glue_diagram.svg", "Master Bus Compression and Loudness Diagram",
        "📈 Professional Mixdown Standards & Delivery Protocols", "-18 dBFS Nominal &bull; VCA Groups &bull; -1.0 dBTP Ceiling &bull; -14 LUFS Integrated &bull; 24-bit to 16-bit TPDF Dither",
        "Automation Modes in the Exam",
        "Read: Plays back existing automation without recording changes. Touch: Writes automation only while touching the control; snaps back to previous values on release. Latch: Begins writing on touch, keeps current value after release until playback stops. Write: Continuously overwrites all existing data.",
        "Mastering Delivery: Inter-sample peaks occur during digital-to-analogue conversion (DAC). Set true peak limiters to -1.0 dBTP ceiling to avoid clipping on streaming encoders (MP3, AAC).",
        "Mastering Export Protocols",
        [
            (1, "Target Loudness", "Aim for -14 LUFS integrated for streaming normalization, with short-term peaks staying below -11 LUFS."),
            (2, "True Peak Ceiling", "Always set master output limiter ceiling to -1.0 dBTP (or -0.5 dBTP minimum)."),
            (3, "Dithering Protocol", "When bouncing 24-bit DAW projects to 16-bit master files, apply Triangular Probability Density Function (TPDF) dither.")
        ]
    ))

    # Slide 10: Section B: Extended Response Production Essay Strategy
    table_content = """
    <table class="matrix-table">
      <thead>
        <tr>
          <th>Mark Band</th>
          <th>AO3: Technical Knowledge &amp; Understanding (10 Marks)</th>
          <th>AO4: Aural Discrimination &amp; Contextual Evaluation (10 Marks)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Band 4 (High)<br>17–20 Marks</strong></td>
          <td>Comprehensive, fully accurate technical terminology. In-depth understanding of signal chains, transducer physics, circuit topologies (tube/FET/VCA), acoustic wave physics, and digital DSP constraints.</td>
          <td>Perceptive, critical comparative evaluation. Explains *why* specific techniques are chosen in the scenario; evaluates trade-offs (e.g., analog saturation vs digital headroom; close-mic isolation vs room spill).</td>
        </tr>
        <tr>
          <td><strong>Band 3 (Mid-High)<br>13–16 Marks</strong></td>
          <td>Good, mostly accurate technical knowledge. Clear explanation of equipment controls (threshold, Q, pre-delay, mic patterns), signal routing, and acoustic behavior with minor gaps.</td>
          <td>Clear comparative evaluation with relevant supporting points. Analyzes sonic impact on mix balance, spatial imaging, and frequency clarity; links choices to musical context.</td>
        </tr>
        <tr>
          <td><strong>Band 2 (Mid-Low)<br>7–12 Marks</strong></td>
          <td>Basic technical knowledge with occasional inaccuracies. Describes common studio tools (compressor, EQ, reverb) but lacks depth on circuit behavior or mathematical relationships.</td>
          <td>Descriptive rather than evaluative. Identifies what gear is used, but gives superficial explanations of *why*; limited critical comparison between production approaches.</td>
        </tr>
        <tr>
          <td><strong>Band 1 (Low)<br>1–6 Marks</strong></td>
          <td>Superficial or incorrect technical claims. Confuses fundamental concepts (e.g., mistaking phasing for panning; confusing bit depth with sample rate).</td>
          <td>Minimal or no aural evaluation. Simply lists equipment without discussing sonic consequences or answering the specific scenario posed in Question 6.</td>
        </tr>
      </tbody>
    </table>
    """

    slides.append(make_table_slide(
        10, "Section B &bull; Extended Essay (20 Marks)", "Extended Response: <span>AO3 vs. AO4 Essay Strategy</span>",
        "Question 6 is the 20-mark extended writing challenge. Success requires balancing rigorous technical theory (AO3) with perceptive critical evaluation of practical studio scenarios (AO4).",
        "Exam Essay Masterclass", "How to Ace the Edexcel Music Tech Component 4 Exam", "vejjQ0Lurrk",
        "How to Ace the Edexcel Music Tech Component 4 Exam!", "Music Tech Guru Tutorial",
        "📝 Essay Blueprint: Structure for Maximum Marks",
        "Paragraph 1: Scenario analysis, identifying acoustic limitations and technical goals. Paragraph 2–3: Direct comparison of contrasting hardware/DSP approaches (e.g., tube preamp vs transparent solid-state).",
        "Paragraph 4: Signal routing, dynamic processing, and surgical EQ unmasking. Paragraph 5: Evaluative conclusion weighing sonic character against practical delivery constraints.",
        ["20 Marks", "AO3 (10m)", "AO4 (10m)", "Scenario Analysis", "Acoustics vs DSP", "Level 4 Band"],
        "Pearson Edexcel Mark Scheme Matrix", "AO3 (Technical Understanding) vs AO4 (Aural Evaluation) Rubric", table_content
    ))

    # Assemble HTML
    full_html = HTML_HEAD + "\n".join(slides) + HTML_FOOTER

    output_path = "public/interactive-slide-component-4.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    
    print(f"SUCCESS: Generated {output_path} ({len(full_html)} bytes, {TOTAL_SLIDES} slides)")

if __name__ == "__main__":
    build_deck()
