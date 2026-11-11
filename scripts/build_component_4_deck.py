#!/usr/bin/env python3
"""
build_component_4_deck.py
Generates the split-screen interactive presentation deck for Edexcel A-Level Component 4: Producing and Analysing (9MT0/04).
Creates: public/interactive-slide-component-4.html

Features:
- 10 verified, 100% working Music Tech Guru tutorial videos
- True 16:9 widescreen video container with HD hint (&vq=hd1080)
- HD Theater Mode modal (large 1080p player overlay)
- Direct 'YouTube ↗' link buttons
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

    /* True 16:9 Video Container with sharp rendering */
    .video-container {{
      position: relative;
      width: 100%;
      padding-bottom: 56.25% !important; /* Standard 16:9 */
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      background: #000;
      margin-bottom: 6px !important;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
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

    /* Video Action Buttons (HD Theater & Direct YouTube) */
    .video-actions-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      flex-wrap: wrap;
      flex-shrink: 0 !important;
    }}

    .hd-theater-btn {{
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      color: #00C1F0;
      background: rgba(0, 193, 240, 0.12);
      border: 1px solid rgba(0, 193, 240, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .hd-theater-btn:hover {{
      background: rgba(0, 193, 240, 0.25);
      border-color: #00C1F0;
      transform: translateY(-1px);
    }}

    .yt-direct-btn {{
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #ffffff !important;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.45);
      padding: 4px 10px;
      border-radius: 6px;
      text-decoration: none !important;
      transition: all 0.2s ease;
    }}
    .yt-direct-btn:hover {{
      background: rgba(239, 68, 68, 0.4);
      border-color: #ef4444;
      transform: translateY(-1px);
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

    /* Lightbox Modal (Images) */
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

    /* Video Theater HD Modal */
    .video-modal-backdrop {{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 99998;
      justify-content: center;
      align-items: center;
      padding: 24px;
      box-sizing: border-box;
    }}

    .video-modal-backdrop.open {{
      display: flex;
    }}

    .video-modal-content {{
      width: 90vw;
      max-width: 1180px;
      height: 82vh;
      max-height: 720px;
      background: #0f172a;
      border: 1px solid rgba(0, 193, 240, 0.4);
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 193, 240, 0.2);
    }}

    .video-modal-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: #080e1a;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }}

    .video-modal-title {{
      color: #ffffff;
      font-size: 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .video-player-wrapper {{
      flex: 1;
      width: 100%;
      background: #000000;
      position: relative;
    }}

    .video-player-wrapper iframe {{
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }}

    .video-modal-footer {{
      padding: 10px 18px;
      background: #080e1a;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #94a3b8;
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

  <!-- Video Theater HD Modal -->
  <div class="video-modal-backdrop" id="videoModal" onclick="closeVideo()" role="dialog" aria-modal="true" aria-label="HD Video Theater">
    <div class="video-modal-content" onclick="event.stopPropagation()">
      <div class="video-modal-header">
        <span class="video-modal-title" id="videoModalTitle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          <span id="videoModalTitleText">Video Masterclass</span>
        </span>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a id="videoModalExternalLink" href="#" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">
            <span>Open in YouTube ↗</span>
          </a>
          <button class="image-modal-close" style="position: static; margin: 0; width: 28px; height: 28px; font-size: 16px;" onclick="closeVideo()">&times;</button>
        </div>
      </div>
      <div class="video-player-wrapper" id="videoPlayerWrapper"></div>
      <div class="video-modal-footer">
        <span>🎬 Playing in 1080p Full HD Theater View</span>
        <a id="videoModalFooterLink" href="#" target="_blank" rel="noopener noreferrer" style="color: #00C1F0; font-weight: 700; text-decoration: none;">Watch Directly on YouTube &rarr;</a>
      </div>
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
        closeVideo();
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

    // Video Theater HD Modal
    function openVideo(videoId, title) {
      const modal = document.getElementById('videoModal');
      const titleText = document.getElementById('videoModalTitleText');
      const extLink = document.getElementById('videoModalExternalLink');
      const footLink = document.getElementById('videoModalFooterLink');
      const wrapper = document.getElementById('videoPlayerWrapper');

      if (!modal || !wrapper) return;

      const ytUrl = 'https://www.youtube.com/watch?v=' + videoId;
      if (titleText) titleText.textContent = title || 'Video Masterclass';
      if (extLink) extLink.href = ytUrl;
      if (footLink) footLink.href = ytUrl;

      wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&vq=hd1080&playsinline=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width: 100%; height: 100%; border: 0; display: block;"></iframe>`;
      modal.classList.add('open');
    }

    function closeVideo() {
      const modal = document.getElementById('videoModal');
      const wrapper = document.getElementById('videoPlayerWrapper');
      if (modal) modal.classList.remove('open');
      if (wrapper) wrapper.innerHTML = '';
    }

    // Universal Image Lightbox
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
        if (target.closest('#imageModal') || target.closest('#videoModal') || target.classList.contains('no-expand')) return;
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
    escaped_title = track_title.replace("'", "\\'")

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
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1&vq=hd1080&playsinline=1" 
                    title="{track_title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="video-actions-bar">
            <button class="hd-theater-btn" onclick="openVideo('{yt_id}', '{escaped_title}')">
              <span>⛶ Watch in HD (Theater Mode)</span>
            </button>
            <a href="https://www.youtube.com/watch?v={yt_id}" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" style="vertical-align: -1px; margin-right: 3px;">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube ↗</span>
            </a>
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
    escaped_title = track_title.replace("'", "\\'")

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
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1&vq=hd1080&playsinline=1" 
                    title="{track_title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
          </div>

          <div class="video-actions-bar">
            <button class="hd-theater-btn" onclick="openVideo('{yt_id}', '{escaped_title}')">
              <span>⛶ Watch in HD (Theater Mode)</span>
            </button>
            <a href="https://www.youtube.com/watch?v={yt_id}" target="_blank" rel="noopener noreferrer" class="yt-direct-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" style="vertical-align: -1px; margin-right: 3px;">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube ↗</span>
            </a>
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
        "How to Score FULL MARKS in Component 4 – Fix This NOW! 🔥", "Music Tech Guru Masterclass",
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

    # Slide 2: Audio Editing - Finding Mistakes & Copying Audio
    slides.append(make_slide(
        2, "Section A &bull; Practical DAW Tasks", "Audio Editing: <span>Finding Mistakes &amp; Copying Audio</span>",
        "Audio editing in Component 4 tests practical track repair: listening to stems to locate performance mistakes or unwanted noises, and cleanly copying good audio to fix them.",
        "DAW Practical Demonstration", "Question 1 Audio Editing & Stem Correction", "6Tb2auJ52xI",
        "A-Level Music Tech: Audio Editing & Track Correction for Component 4", "Music Tech Guru Tutorial",
        "🎧 Ear-Training Focus: Spotting Faults & Clean Splices",
        "Solo the track and listen for faults: wrong notes, timing slips, bad vocal takes, or unwanted sounds like clicks, pops, count-in bleed, and mic thumps.",
        "Audition your edit points in solo and in the full mix: make sure the copied section lands on beat with no timing drift, and check for clicks at region boundaries.",
        ["Find Mistakes", "Copy & Paste", "Clean Take", "Zero-Crossing", "5–10ms Crossfade", "Trim Silence"],
        "DAW Audio Editing Workflow", "Spotting Mistakes & Copying Clean Audio", "/images/audio_editing_mistake_fix.svg", "Finding Mistakes and Copying Audio in DAW",
        "✂️ Non-Destructive DAW Editing: Spot, Copy &amp; Replace", "Identify Fault &bull; Locate Clean Section &bull; Snap to Grid &bull; 5–10ms Crossfade",
        "The Two Golden Rules of Exam Audio Editing",
        "Rule 1: Always find the mistake first. Component 4 stems feature deliberate errors—such as a guitarist playing a wrong chord in Verse 2, a missed vocal lyric, or a click track bleed. Pinpoint the exact bar and beat.",
        "Rule 2: Copy from an identical clean bar earlier in the track (e.g. Verse 1). Paste it into place on the beat grid, and always apply a 5–10ms equal-power crossfade across the edit to prevent digital clicks or pops.",
        "3 Steps to Full Marks in Editing Tasks",
        [
            (1, "Identify the Mistake", "Solo the track and listen with headphones. Mark the start and end of the faulty section or unwanted noise."),
            (2, "Copy Clean Audio", "Find the matching bar from another chorus or verse that was performed correctly, cut it cleanly, and copy it."),
            (3, "Paste & Crossfade", "Snap the copied audio to the exact bar/beat, verify groove sync, and add 5–10ms crossfades at both boundaries.")
        ]
    ))

    # Slide 3: Surgical Dynamic Processing (Compression, Limiting & Gating)
    slides.append(make_slide(
        3, "Section A &bull; Dynamic Processing", "Dynamic Control: <span>Compression, Gating &amp; Sidechaining</span>",
        "Component 4 tests precise configuration of compressor parameters to control dynamic range, shape transient attack punch, clamp peak overshoots, and clean bleed with noise gates.",
        "Logic Pro Masterclass", "Parallel Compression in Logic Pro – A-Level Music Tech", "uRa_OcpDSGE",
        "Parallel Compression in Logic Pro – A-Level Music Tech Tutorial", "Music Tech Guru Tutorial",
        "🎧 Ear-Training Focus: Attack & Release Calibration",
        "Fast attack (<1ms) crushes drum transients, pushing the snare backward in the mix; slower attack (15–30ms) lets initial stick-crack poke through before clamping body.",
        "Parallel (New York) compression blends heavily smashed transient punch with natural uncompressed dynamics, delivering massive fatness without sacrificing life.",
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
        "Channel EQ in Logic Pro X – Essential Tips for Beginners!", "Music Tech Guru Masterclass",
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

    # Slide 5: Spatial Positioning - Stereo Panning (L/R) & Reverb Depth
    slides.append(make_slide(
        5, "Section A &bull; Spatial Positioning", "Spatial Positioning: <span>Stereo Panning (L/R) &amp; Reverb Depth</span>",
        "Creating a balanced 3D mix in Component 4 relies on two fundamental tools: positioning instruments across the stereo field using Left and Right panning, and creating front-to-back depth with Reverb.",
        "Mixdown Masterclass", "Spatial Positioning & Mix Placement", "0amjhDBUn4M",
        "How to Get Top Marks in A-Level Music Tech Mixing (Component 1 &amp; 4)", "Music Tech Guru Masterclass",
        "🎧 Ear-Training Focus: Stereo Soundstage & Front-to-Back Depth",
        "Listen across the stereo field: ensure the center isn't cluttered. Spread rhythm guitars, keyboards, and backing vocals Left and Right to make space for the lead vocal.",
        "Assess front-to-back depth: keep the lead vocal and bass dry and upfront. Use subtle reverb on rhythm parts to push them naturally into the room behind the focal elements.",
        ["Stereo Panning", "Left & Right", "Center Anchor", "Reverb Depth", "Dry vs Wet", "Mono Compatibility"],
        "DAW Spatial Architecture", "Left/Right Panning & Reverb Depth", "/images/spatial_positioning_panning_reverb.svg", "Spatial Positioning with Left Right Panning and Reverb Depth",
        "🎛️ The 3D Mix Soundstage: Width (L/R) &amp; Depth (Reverb)", "Pan Pots (Left/Right) &bull; Center Anchor &bull; Dry vs. Wet Depth &bull; Aux Reverb Bus",
        "Building a Clear, 3-Dimensional Soundstage",
        "In Component 4 mixing, examiners listen for clarity, instrument separation, and a sense of physical space. Panning allows you to separate competing instruments—like double-tracked electric guitars panned hard Left and Right—so they don't fight with the center.",
        "Depth is created using reverb. A completely dry sound sits directly in front of the listener's face (intimate and upfront), while adding reverb moves the instrument further back into the virtual room. Always keep low frequencies (kick and bass) dry to preserve punch.",
        "The 3 Golden Rules of Spatial Placement",
        [
            (1, "Anchor the Center", "Keep Kick drum, Snare, Bass guitar, and Lead vocal panned dead center (0) for maximum punch, focus, and mono compatibility."),
            (2, "Pan Left & Right", "Pan rhythm guitars, synth pads, hi-hats, and backing vocals across the stereo field to create width and avoid masking the lead vocal."),
            (3, "Create Depth with Reverb", "Use dry levels to bring lead vocals and drums up front, while using an Aux reverb send to push rhythm and ambient elements back into the room.")
        ]
    ))

    # Slide 6: Time-Based FX & Auxiliary Spatial Routing
    slides.append(make_slide(
        6, "Section A &bull; Time-Based Effects", "Time-Based FX: <span>Reverb Pre-Delay, RT60 &amp; Aux Busses</span>",
        "Auxiliary send/return topology is mandatory for spatial effects in Component 4: inserting reverb directly onto audio tracks wastes CPU, causes phase mud, and prevents shared acoustic space.",
        "Logic Pro Tutorial", "How to Use Reverb (Basic to Pro) on Logic Pro X", "PfPCYzpZnXo",
        "How to use reverb (basic) on Logic Pro X", "Music Tech Guru Tutorial",
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
        "Synthesis Masterclass", "How to Use the Retro Synth in Logic Pro X", "tBrkY4mQ_D4",
        "How to use the RETRO SYNTH in Logic Pro X. Simple Music Production tutorial", "Music Tech Guru Masterclass",
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
        "Exam Walkthrough Video", "2019 Production & Analysing Exam Guidance (Question 1)", "MZb-bW6z5wI",
        "Edexcel A Level Music Technology - Component 4 Exam 2019 Guidance Video (Question 1)", "Music Tech Guru Official Exam Guide",
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
        "Basic Mastering on Logic Pro X. Walkthrough and tips", "Music Tech Guru Tutorial",
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
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
      <!-- AO3 Card -->
      <div style="background: rgba(0, 193, 240, 0.08); border: 1px solid rgba(0, 193, 240, 0.25); border-radius: 8px; padding: 10px 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase;">AO3: Technical Facts</span>
          <span style="background: #0284c7; color: #fff; font-size: 9.5px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">10 MARKS</span>
        </div>
        <div style="color: #f8fafc; font-size: 12px; font-weight: 700; margin-bottom: 4px;">WHAT gear &amp; HOW it works</div>
        <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #cbd5e1; line-height: 1.45;">
          <li>Name specific microphones &amp; polar patterns</li>
          <li>State mic distance, angle &amp; placement</li>
          <li>Detail signal routing, EQ &amp; compression controls</li>
        </ul>
      </div>

      <!-- AO4 Card -->
      <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 8px; padding: 10px 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase;">AO4: Aural Evaluation</span>
          <span style="background: #9333ea; color: #fff; font-size: 9.5px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">10 MARKS</span>
        </div>
        <div style="color: #f8fafc; font-size: 12px; font-weight: 700; margin-bottom: 4px;">WHY you chose it &amp; HOW it sounds</div>
        <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #cbd5e1; line-height: 1.45;">
          <li>Describe sonic results (warmth, bleed, punch, room)</li>
          <li>Compare the trade-offs of both options</li>
          <li>Explain which method best suits the scenario</li>
        </ul>
      </div>
    </div>

    <div style="padding: 10px 12px;">
      <div style="color: #94a3b8; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
        🎯 How Examiners Award the 20 Marks
      </div>
      <table class="matrix-table" style="font-size: 11px;">
        <thead>
          <tr>
            <th style="width: 22%;">Mark Band</th>
            <th style="width: 39%;">AO3: Technical Facts (10m)</th>
            <th style="width: 39%;">AO4: Sonic Evaluation (10m)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong style="color: #34d399;">Band 4<br>(17–20)</strong></td>
            <td>Accurate gear names, signal chain &amp; precise settings.</td>
            <td>Directly compares both options; explains sonic trade-offs.</td>
          </tr>
          <tr>
            <td><strong style="color: #38bdf8;">Band 3<br>(13–16)</strong></td>
            <td>Good tech knowledge with mostly correct controls.</td>
            <td>Clear reasons for choices; explains impact on the mix.</td>
          </tr>
          <tr>
            <td><strong style="color: #facc15;">Band 2<br>(7–12)</strong></td>
            <td>Basic gear descriptions; occasional technical errors.</td>
            <td>Describes what was used, but rarely explains <em>why</em>.</td>
          </tr>
          <tr>
            <td><strong style="color: #f87171;">Band 1<br>(1–6)</strong></td>
            <td>Vague or incorrect claims; confuses basic concepts.</td>
            <td>Just lists equipment with no evaluation or link to scenario.</td>
          </tr>
        </tbody>
      </table>
    </div>
    """

    slides.append(make_table_slide(
        10, "Section B &bull; Extended Essay (20 Marks)", "Extended Response: <span>AO3 vs. AO4 Essay Strategy</span>",
        "Question 6 is a 20-mark essay comparing two studio approaches. To get top marks, balance technical facts (AO3) with how they affect the sound (AO4).",
        "Exam Essay Masterclass", "How to Ace the 2022 Edexcel Music Tech Component 4 Exam!", "vejjQ0Lurrk",
        "How to Ace the 2022 Edexcel Music Tech Component 4 Exam!", "Music Tech Guru Tutorial",
        "📝 Simple 4-Step Essay Structure",
        "¶1 &amp; ¶2: State the scenario goal, then detail Approach A (gear, mic placement, DAW settings) and explain its sonic character.",
        "¶3 &amp; ¶4: Detail Approach B, compare pros and cons directly against Approach A, and conclude with the best choice for the scenario.",
        ["20 Marks", "AO3: Tech (10m)", "AO4: Sound (10m)", "Compare Both", "Justify Choice", "Simple 4-Step Plan"],
        "Pearson Edexcel Mark Scheme Matrix", "AO3 (Technical Facts) vs AO4 (Sonic Evaluation)", table_content
    ))

    # Assemble HTML
    full_html = HTML_HEAD + "\n".join(slides) + HTML_FOOTER

    output_path = "public/interactive-slide-component-4.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    
    print(f"SUCCESS: Generated {output_path} ({len(full_html)} bytes, {TOTAL_SLIDES} slides)")

if __name__ == "__main__":
    build_deck()
