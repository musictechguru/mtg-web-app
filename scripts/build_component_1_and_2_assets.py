#!/usr/bin/env python3
"""
build_component_1_and_2_assets.py
Generates:
1. public/interactive-slide-component-1.html (10-slide interactive deck for Component 1: Recording & Mixing 9MT0/01)
2. public/interactive-slide-component-2.html (10-slide interactive deck for Component 2: Technology-Based Composition 9MT0/02)
3. public/component-1-interactive-quiz.html (10-question specification quiz + App Pro CTA)
4. public/component-2-interactive-quiz.html (10-question specification quiz + App Pro CTA)
5. public/a-level-diagnostic-quiz.html (8-question 4-Component A-Level Diagnostic Assessment + App Pro CTA)
"""

import json
import os

def get_deck_html(
    component_num,
    component_code,
    component_title,
    hub_url,
    accent_primary,
    accent_glow,
    accent_secondary,
    slides_html
):
    total_slides = 10
    dots_html = "\n".join(
        [f'        <div class="dot{" active" if i == 0 else ""}" onclick="goToSlide({i})"></div>' for i in range(total_slides)]
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Component {component_num}: {component_title} | Edexcel A-Level Music Technology Master Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-dark: #080e1a;
      --panel-bg: #0f172a;
      --card-bg: rgba(255, 255, 255, 0.03);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-prod: {accent_primary};
      --accent-prod-glow: {accent_glow};
      --accent-tech: {accent_secondary};
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
      background: var(--accent-prod-glow);
      border-color: var(--accent-prod);
      color: #ffffff;
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
      top: 12px;
      right: 16px;
      z-index: 10005;
      background: rgba(220, 38, 38, 0.9);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.35);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      font-family: inherit;
    }}
    .floating-exit-fs:hover {{
      background: rgba(239, 68, 68, 1);
      transform: scale(1.04);
    }}
    :fullscreen .floating-exit-fs,
    :-webkit-full-screen .floating-exit-fs {{
      display: inline-flex !important;
    }}

    .deck-container {{
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      flex: 1 1 auto !important;
      min-height: 0 !important;
      padding: 8px 16px 6px 16px !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }}

    .slide {{
      display: none;
      flex-direction: column;
      flex: 1 1 auto !important;
      min-height: 0 !important;
      height: 100% !important;
      overflow: hidden !important;
      animation: fadeIn 0.3s ease-out;
    }}

    .slide.active {{
      display: flex !important;
    }}

    @keyframes fadeIn {{
      from {{ opacity: 0; transform: translateY(4px); }}
      to {{ opacity: 1; transform: translateY(0); }}
    }}

    .slide-header {{
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
      border-bottom: 1px solid var(--border-subtle);
      flex-shrink: 0 !important;
    }}

    .era-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--accent-prod-glow);
      border: 1px solid var(--accent-prod);
      color: var(--accent-prod);
      font-size: 10px !important;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 2px 8px !important;
      border-radius: 50px;
      margin-bottom: 2px !important;
    }}

    .slide-title {{
      font-size: clamp(17px, 2vw, 22px) !important;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-white);
      line-height: 1.15 !important;
      margin-bottom: 2px !important;
    }}

    .slide-title span {{
      color: var(--accent-prod);
    }}

    .slide-subtitle {{
      font-size: 11.5px !important;
      color: var(--text-muted);
      line-height: 1.3 !important;
      max-width: 1150px;
    }}

    .split-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px !important;
      flex: 1 1 auto !important;
      min-height: 0 !important;
      overflow: hidden !important;
      align-items: stretch;
    }}

    @media (max-width: 1024px) {{
      .split-grid {{
        grid-template-columns: 1fr;
        overflow-y: auto !important;
      }}
    }}

    .col-panel {{
      background: var(--panel-bg);
      border-radius: 12px;
      padding: 10px 12px !important;
      display: flex;
      flex-direction: column;
      gap: 6px !important;
      position: relative;
      height: 100% !important;
      min-height: 0 !important;
      max-height: 100% !important;
      overflow-y: auto !important;
      box-sizing: border-box !important;
    }}

    .col-panel::-webkit-scrollbar {{ width: 5px; }}
    .col-panel::-webkit-scrollbar-track {{ background: rgba(15, 23, 42, 0.4); border-radius: 4px; }}
    .col-panel::-webkit-scrollbar-thumb {{ background: rgba(148, 163, 184, 0.35); border-radius: 4px; }}

    .col-music {{
      border: 1px solid var(--accent-prod);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }}
    .col-music::before {{
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-prod), var(--accent-tech), transparent);
    }}

    .col-tech {{
      border: 1px solid rgba(56, 189, 248, 0.35);
      box-shadow: inset 0 1px 0 0 rgba(56, 189, 248, 0.1), 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }}
    .col-tech::before {{
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-tech), #818cf8, transparent);
    }}

    .col-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 4px !important;
      border-bottom: 1px solid var(--border-subtle);
      flex-shrink: 0;
    }}

    .col-tag {{
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 2px 8px;
      border-radius: 5px;
    }}

    .col-music .col-tag {{
      background: var(--accent-prod-glow);
      color: var(--accent-prod);
      border: 1px solid var(--accent-prod);
    }}

    .col-tech .col-tag {{
      background: rgba(56, 189, 248, 0.15);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }}

    .col-Quick-title {{
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
    }}

    .video-wrapper {{
      position: relative;
      width: 100%;
      padding-bottom: 56.25% !important;
      background: #000;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
      flex-shrink: 0;
    }}

    .video-wrapper iframe {{
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: 0;
    }}

    .video-actions-bar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 2px;
      flex-shrink: 0;
    }}

    .hd-theater-btn {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--accent-prod-glow);
      border: 1px solid var(--accent-prod);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }}
    .hd-theater-btn:hover {{
      background: var(--accent-prod);
      color: #fff;
      transform: translateY(-1px);
    }}

    .yt-direct-link {{
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #fca5a5;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }}
    .yt-direct-link:hover {{
      background: rgba(239, 68, 68, 0.3);
      color: #fff;
    }}

    .track-banner {{
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 10px !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-shrink: 0;
    }}

    .track-info h4 {{
      font-size: 12.5px !important;
      font-weight: 800;
      color: var(--text-white);
      margin-bottom: 1px;
    }}

    .track-info p {{
      font-size: 11px !important;
      color: var(--accent-prod);
      font-weight: 600;
    }}

    .listening-focus {{
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid var(--accent-prod);
      border-radius: 8px;
      padding: 8px 10px !important;
      flex: 1;
    }}

    .listening-focus h5 {{
      font-size: 10.5px !important;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-prod);
      margin-bottom: 4px !important;
      display: flex;
      align-items: center;
      gap: 5px;
    }}

    .listening-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px !important;
    }}

    .listening-list li {{
      font-size: 11.5px !important;
      color: #e2e8f0;
      padding-left: 14px;
      position: relative;
      line-height: 1.35 !important;
    }}

    .listening-list li::before {{
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--accent-prod);
      font-weight: bold;
    }}

    .tag-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: auto;
      flex-shrink: 0;
    }}

    .Mini-badge {{
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 5px;
      font-family: 'JetBrains Mono', monospace;
    }}

    .photo-card {{
      position: relative;
      width: 100%;
      height: 125px !important;
      min-height: 95px !important;
      max-height: 140px !important;
      border-radius: 8px;
      overflow: hidden;
      background: #040812;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 1 !important;
      cursor: zoom-in;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }}

    .photo-card:hover {{
      border-color: var(--accent-tech);
      box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);
    }}

    .photo-card img {{
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 4px;
      background: radial-gradient(circle at center, #1e293b 0%, #090d16 100%);
      transition: transform 0.25s ease;
    }}

    .photo-card:hover img {{
      transform: scale(1.03);
    }}

    .zoom-hint-pill {{
      position: absolute;
      top: 6px;
      right: 6px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #e2e8f0;
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 6px;
      pointer-events: none;
      backdrop-filter: blur(4px);
    }}

    .gear-title-bar {{
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 8px;
      padding: 6px 10px !important;
      flex-shrink: 0;
    }}

    .gear-title-bar h4 {{
      font-size: 13px !important;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 1px;
    }}

    .gear-title-bar span {{
      font-size: 10.5px !important;
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }}

    .tech-card {{
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 8px 10px !important;
    }}

    .tech-card h5 {{
      font-size: 10.5px !important;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #38bdf8;
      margin-bottom: 4px !important;
    }}

    .tech-card p {{
      font-size: 11.5px !important;
      color: #cbd5e1;
      line-height: 1.35 !important;
    }}

    .steps-box {{
      background: rgba(245, 158, 11, 0.06);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 8px;
      padding: 8px 10px !important;
      margin-top: auto;
    }}

    .steps-box h5 {{
      font-size: 10.5px !important;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-gold);
      margin-bottom: 4px !important;
    }}

    .step-items {{
      display: flex;
      flex-direction: column;
      gap: 4px !important;
    }}

    .step-item {{
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 11px !important;
      color: #e2e8f0;
      line-height: 1.3 !important;
    }}

    .step-num {{
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
      font-weight: 800;
      font-size: 9.5px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }}

    .deck-nav {{
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      padding: 6px 16px !important;
      height: 44px !important;
      flex-shrink: 0 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-subtle);
      background: rgba(8, 14, 26, 0.95);
      backdrop-filter: blur(10px);
      z-index: 50;
      box-sizing: border-box !important;
    }}

    .nav-btn {{
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--text-white);
      padding: 5px 14px !important;
      border-radius: 8px;
      font-size: 12px !important;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      font-family: inherit;
    }}

    .nav-btn:hover:not(:disabled) {{
      background: var(--accent-prod);
      border-color: var(--accent-prod);
      color: #fff;
    }}

    .nav-btn:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    .progress-dots {{
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .dot {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.25s ease;
    }}

    .dot.active {{
      width: 22px;
      border-radius: 6px;
      background: var(--accent-prod);
      box-shadow: 0 0 10px var(--accent-prod-glow);
    }}

    .slide-counter {{
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
      margin-left: 8px;
    }}

    .img-modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(4, 8, 18, 0.92);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }}
    .img-modal-backdrop.open {{
      display: flex;
      opacity: 1;
    }}
    .img-modal-content {{
      position: relative;
      max-width: 92vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 16px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
    }}
    .img-modal-content img {{
      max-width: 86vw;
      max-height: 75vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      background: #080e1a;
    }}
    .img-modal-close {{
      position: absolute;
      top: -14px;
      right: -14px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #ef4444;
      color: #fff;
      border: 2px solid #fff;
      font-weight: 900;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }}
    .img-modal-caption {{
      margin-top: 10px;
      font-size: 13px;
      font-weight: 700;
      color: #f8fafc;
      text-align: center;
    }}

    .video-modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(4, 8, 18, 0.95);
      backdrop-filter: blur(12px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }}
    .video-modal-backdrop.open {{
      display: flex;
    }}
    .video-modal-box {{
      position: relative;
      width: 90vw;
      max-width: 1280px;
      background: #0f172a;
      border: 1px solid var(--accent-prod);
      border-radius: 16px;
      padding: 14px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9);
    }}
    .video-modal-frame-wrap {{
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      background: #000;
      border-radius: 10px;
      overflow: hidden;
    }}
    .video-modal-frame-wrap iframe {{
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: 0;
    }}
    .video-modal-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 0 4px;
    }}
    .video-modal-title {{
      font-size: 14px;
      font-weight: 800;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .video-modal-close {{
      background: #ef4444;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }}
  </style>
</head>
<body>

  <div class="deck-topbar-controls">
    <div style="display:flex; align-items:center; gap:10px;">
      <a href="{hub_url}" target="_top" class="exit-deck-link" title="Return to Component {component_num} Hub">
        <span>← Exit Deck</span>
      </a>
      <span style="color:rgba(255,255,255,0.15);">|</span>
      <div class="deck-topbar-title">
        <span>Component {component_num}: {component_title} ({component_code})</span>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:8px;">
      <a href="https://app.musictechguru.com" target="_blank" rel="noopener" class="exit-deck-link" style="background:var(--accent-prod-glow); border-color:var(--accent-prod); color:#fff;">
        <span>🚀 Open Full MTG Revision App</span>
      </a>
      <button class="exit-deck-link" onclick="toggleFullscreen()" title="Toggle Fullscreen Mode (F)">
        <span>⛶ Fullscreen</span>
      </button>
    </div>
  </div>

  <button class="floating-exit-fs" id="floatingExitFs" onclick="exitFullscreenMode()" title="Exit Fullscreen (Esc)">
    <span>✕ Exit Fullscreen</span>
  </button>

  <div class="deck-container">
{slides_html}
  </div>

  <div class="deck-nav">
    <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)" disabled>
      <span>‹ Previous</span>
    </button>

    <div style="display: flex; align-items: center;">
      <div class="progress-dots" id="progressDots">
{dots_html}
      </div>
      <span class="slide-counter" id="slideCounter">1 / {total_slides}</span>
    </div>

    <div style="display: flex; align-items: center; gap: 8px;">
      <button class="nav-btn" onclick="toggleFullscreen()" id="fsBtn" title="Toggle Fullscreen (F)">
        <span>⛶ Fullscreen</span>
      </button>
      <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">
        <span>Next ›</span>
      </button>
    </div>
  </div>

  <div class="img-modal-backdrop" id="imageModal" onclick="closeLightbox()" role="dialog" aria-modal="true">
    <div class="img-modal-content" onclick="event.stopPropagation()">
      <button class="img-modal-close" onclick="closeLightbox()" aria-label="Close image">✕</button>
      <img id="modalImg" src="" alt="Expanded view">
      <div class="img-modal-caption" id="modalCaption"></div>
    </div>
  </div>

  <div class="video-modal-backdrop" id="videoModal" onclick="closeVideo()" role="dialog" aria-modal="true">
    <div class="video-modal-box" onclick="event.stopPropagation()">
      <div class="video-modal-header">
        <div class="video-modal-title">
          <span>🎬 Playing in 1080p Full HD Theater View</span>
          <span style="color:#64748b;">•</span>
          <span id="videoModalTitle" style="color:var(--accent-prod);"></span>
        </div>
        <button class="video-modal-close" onclick="closeVideo()">✕ Close HD Player</button>
      </div>
      <div class="video-modal-frame-wrap">
        <iframe id="videoModalIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('slideCounter');
    const totalSlides = slides.length;

    function stopAllVideos() {{
      document.querySelectorAll('.slide iframe').forEach(iframe => {{
        const src = iframe.getAttribute('src');
        if (src) iframe.setAttribute('src', src);
      }});
    }}

    function updateDeck() {{
      stopAllVideos();
      slides.forEach((s, idx) => s.classList.toggle('active', idx === currentSlide));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === currentSlide));
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
      counter.textContent = `${{currentSlide + 1}} / ${{totalSlides}}`;
    }}

    function changeSlide(dir) {{
      const next = currentSlide + dir;
      if (next >= 0 && next < totalSlides) {{
        currentSlide = next;
        updateDeck();
      }}
    }}

    function goToSlide(idx) {{
      if (idx >= 0 && idx < totalSlides) {{
        currentSlide = idx;
        updateDeck();
      }}
    }}

    function openLightbox(src, caption) {{
      const modal = document.getElementById('imageModal');
      document.getElementById('modalImg').src = src;
      document.getElementById('modalCaption').textContent = caption || '';
      modal.classList.add('open');
    }}

    function closeLightbox() {{
      const modal = document.getElementById('imageModal');
      modal.classList.remove('open');
      document.getElementById('modalImg').src = '';
    }}

    function openVideo(ytId, title) {{
      stopAllVideos();
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoModalIframe');
      document.getElementById('videoModalTitle').textContent = title || 'Masterclass Video';
      iframe.src = `https://www.youtube-nocookie.com/embed/${{ytId}}?autoplay=1&rel=0&modestbranding=1&vq=hd1080&playsinline=1`;
      modal.classList.add('open');
    }}

    function closeVideo() {{
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoModalIframe');
      iframe.src = '';
      modal.classList.remove('open');
    }}

    document.querySelectorAll('.photo-card').forEach(card => {{
      const img = card.querySelector('img');
      if (img) {{
        card.addEventListener('click', () => {{
          openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
        }});
      }}
    }});

    function toggleFullscreen() {{
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {{
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      }} else {{
        exitFullscreenMode();
      }}
    }}

    function exitFullscreenMode() {{
      if (document.fullscreenElement || document.webkitFullscreenElement) {{
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }}
    }}

    document.addEventListener('keydown', (e) => {{
      const imgModal = document.getElementById('imageModal');
      const vidModal = document.getElementById('videoModal');
      if (e.key === 'Escape') {{
        if (vidModal && vidModal.classList.contains('open')) {{ closeVideo(); return; }}
        if (imgModal && imgModal.classList.contains('open')) {{ closeLightbox(); return; }}
      }}
      if (e.key === 'ArrowRight') changeSlide(1);
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'f' || e.key === 'F') {{
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {{
          toggleFullscreen();
        }}
      }}
    }});
  </script>
</body>
</html>
"""

def make_slide(
    idx, badge, title, subtitle,
    left_tag, left_quick, yt_id, track_title, track_sub,
    focus_title, focus_p1, focus_p2, mini_badges,
    right_tag, right_quick, img_src, img_alt,
    gear_title, gear_sub,
    card_title, card_p1, card_p2,
    steps_title, steps_list
):
    active_cls = " active" if idx == 1 else ""
    badges_html = "\n".join([f'            <span class="Mini-badge">{b}</span>' for b in mini_badges])
    steps_html = "\n".join([
        f'            <div class="step-item"><span class="step-num">{num}</span><span><strong>{st}:</strong> {sd}</span></div>'
        for num, st, sd in steps_list
    ])
    safe_title = track_title.replace("'", "\\'")
    return f"""    <!-- SLIDE {idx} -->
    <div class="slide{active_cls}" id="slide-{idx}">
      <div class="slide-header">
        <div class="era-badge">{badge}</div>
        <h1 class="slide-title">{title}</h1>
        <p class="slide-subtitle">{subtitle}</p>
      </div>

      <div class="split-grid">
        <div class="col-panel col-music">
          <div class="col-header">
            <span class="col-tag">{left_tag}</span>
            <span class="col-Quick-title">{left_quick}</span>
          </div>

          <div class="video-wrapper">
            <iframe src="https://www.youtube-nocookie.com/embed/{yt_id}?rel=0&modestbranding=1&vq=hd1080&playsinline=1" title="{track_title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-actions-bar">
            <button class="hd-theater-btn" onclick="openVideo('{yt_id}', '{safe_title}')">
              <span>⛶ Watch in HD (Theater Mode)</span>
            </button>
            <a href="https://www.youtube.com/watch?v={yt_id}" target="_blank" rel="noopener" class="yt-direct-link">
              <span>▶ YouTube ↗</span>
            </a>
          </div>

          <div class="track-banner">
            <div class="track-info">
              <h4>{track_title}</h4>
              <p>{track_sub}</p>
            </div>
          </div>

          <div class="listening-focus">
            <h5>🎧 {focus_title}</h5>
            <ul class="listening-list">
              <li>{focus_p1}</li>
              <li>{focus_p2}</li>
            </ul>
          </div>

          <div class="tag-row">
{badges_html}
          </div>
        </div>

        <div class="col-panel col-tech">
          <div class="col-header">
            <span class="col-tag">{right_tag}</span>
            <span class="col-Quick-title">{right_quick}</span>
          </div>

          <div class="photo-card">
            <img src="{img_src}" alt="{img_alt}" loading="lazy">
            <span class="zoom-hint-pill">🔍 Click to Expand</span>
          </div>

          <div class="gear-title-bar">
            <h4>{gear_title}</h4>
            <span>{gear_sub}</span>
          </div>

          <div class="tech-card">
            <h5>{card_title}</h5>
            <p style="margin-bottom: 5px;">{card_p1}</p>
            <p>{card_p2}</p>
          </div>

          <div class="steps-box">
            <h5>⭐ {steps_title}</h5>
            <div class="step-items">
{steps_html}
            </div>
          </div>
        </div>
      </div>
    </div>"""

# ==============================================================================
# BUILD COMPONENT 1 DECK (9MT0/01: Recording & Mixing)
# ==============================================================================
c1_slides = [
    make_slide(
        1, "NEA COURSEWORK &bull; 9MT0/01 OVERVIEW", "Component 1: <span>Recording &amp; Mixing Architecture</span>",
        "Component 1 (9MT0/01) is the non-exam assessment worth 20% of the A-Level (60 marks). Candidates record, edit, mix, and master one multitrack song between 2:00 and 3:30 from Pearson's prescribed artist list.",
        "Official Coursework Guide", "Component 1 Recording & Mixing Walkthrough", "vrVVNFk03QE",
        "How to Mix for Component 1 Music Technology A-Level on Logic Pro", "Music Tech Guru Official Coursework Masterclass",
        "Mandatory Pearson Edexcel Component 1 Requirements",
        "You must capture a minimum of 7 instruments/parts (at least 4 captured using microphones, including acoustic drums/percussion and lead vocals).",
        "Final stereo bounce must be between 2 minutes 00 seconds and 3 minutes 30 seconds, exported as an uncompressed 16-bit / 44.1 kHz stereo WAV file.",
        ["60 Marks", "20% of A-Level", "Min 7 Parts", "Min 4 Mic Captures", "2:00–3:30 Duration", "Pearson Logbook"],
        "Signal Path & Studio Workflow", "Microphone -> Preamp -> A/D Converter -> DAW", "/images/recording_chain_flow.svg", "Studio Recording Signal Chain Architecture",
        "🎙️ The Component 1 Studio Signal Chain", "Transducer Capture &bull; Low-Noise Preamp &bull; 24-bit/44.1kHz A/D &bull; Multi-Track Mix Bus",
        "Mark Scheme Breakdown & Assessment Criteria",
        "Marks are awarded across Capture Quality (microphone choice, placement, zero clipping, room acoustics), Editing & Noise Control (clean comping, no clicks/spills), and Mixing & Balance (EQ, compression, stereo width, reverb depth).",
        "Submitting an incomplete or inaccurate Pearson Logbook can cost precious marks or trigger malpractice penalties—use the MTG App Track Sheet Creator to document every mic and plugin accurately.",
        "Golden Rules for Top-Band Marks (50–60/60)",
        [
            (1, "Capture First, Fix Later Never", "Examiners penalize heavily for poor raw recordings masked with extreme EQ or heavy noise reduction."),
            (2, "Strict Time Limits", "Submissions under 2:00 receive an automatic mark deduction; audio beyond 3:30 is ignored by the examiner."),
            (3, "No Pre-Recorded Samples", "All parts in Component 1 must be performed and recorded specifically for your candidate submission.")
        ]
    ),
    make_slide(
        2, "SECTION 1 &bull; DRUM CAPTURE & BALANCE", "Drum Kit Recording: <span>Overheads, Phase &amp; Low-End Foundation</span>",
        "Drum recording forms the rhythmic and spectral backbone of Component 1. Combining stereo overhead pairs with close spot microphones requires strict attention to phase coherence and the 3:1 placement rule.",
        "Component 1 Drum & Bass Guide", "Mixing Drums & Bass for Component 1", "2x3NJgdKGDY",
        "Mixing Drums & Bass – A-Level Music Tech (Component 1 Guide)", "Music Tech Guru Studio Tutorial",
        "Listening Focus: Stereo Overheads vs Close Spot Mics",
        "Overheads (Spaced Pair, XY, or Glyn Johns) should capture a balanced image of the entire drum kit—not just harsh cymbals.",
        "Measure exact equidistant spacing from the center of the snare drum to both Left and Right overhead capsules using a mic cable or tape measure to lock snare phase in the phantom center.",
        ["Spaced Pair (A/B)", "XY Coincident", "Glyn Johns Method", "Equidistant Snare", "3:1 Rule", "Phase Alignment"],
        "Live Room Drum Miking", "Multi-Mic Drum Kit Capture Architecture", "/images/live_room_drum_recording.jpg", "Studio Drum Kit Multi-Microphone Setup",
        "🥁 Multi-Microphone Drum Capture Protocol", "Dynamic Kick/Snare Spot Mics &bull; Matched Small-Diaphragm Condenser Overheads",
        "Phase Coherence & Stereo Imaging",
        "XY Coincident pairs place two cardioid capsules angled at 90°–135° directly above one another, guaranteeing mono compatibility with zero time-of-arrival phase cancellation.",
        "Spaced Pair (A/B) overheads produce a wider stereo soundstage via time-of-arrival differences, but require strict equidistant measurement from the snare center so the snare doesn't pull left or right.",
        "Examiner Drum Checkpoints",
        [
            (1, "Overhead High-Pass Filtering", "Roll off sub-bass mud below 80–100Hz on overheads if close kick/tom mics carry the weight."),
            (2, "Check Mono Compatibility", "Engage the Mono button on your master bus while blending overheads and close mics to spot hollow phase cancellation."),
            (3, "Pan from Drummer or Audience Perspective", "Keep snare and kick dead center; pan overheads and toms consistently (never exceed 65%–75% on toms).")
        ]
    ),
    make_slide(
        3, "SECTION 2 &bull; CLOSE DRUM SPOT MIKING", "Kick &amp; Snare Engineering: <span>Transient Punch &amp; Polarity</span>",
        "Capturing authoritative kick drum weight and articulate snare snap requires choosing high-SPL dynamic transducers, positioning capsules relative to the beater/shell, and inverting bottom snare polarity.",
        "Kick & Snare Mixing Tutorial", "How to Mix a Rock Kick Drum on Logic Pro X", "4ZipvGWO2bQ",
        "How to mix a ROCK KICK DRUM on Logic Pro X", "Music Tech Guru Production Walkthrough",
        "Listening Focus: Beater Click vs Sub-Bass Thump",
        "Placing a large-diaphragm dynamic mic (AKG D112 / Shure Beta 52A) inside the resonant port hole angled toward the beater captures crisp 3–5kHz attack click.",
        "Positioning the capsule at the resonant port edge captures maximum 50–80Hz sub-bass air movement, while cutting 250–350Hz boxy resonance cleans up low-mid mud.",
        ["AKG D112 / Beta 52A", "Shure SM57 Snare", "180° Polarity Ø", "Beater Transient", "Boxy 300Hz Cut", "High SPL Handling"],
        "Kick & Snare Close Miking", "Dynamic Capsule Positioning & Polarity Physics", "/images/drum_kick_micing_1770032490952.png", "Close Microphone Placement on Kick Drum",
        "🎯 High-SPL Dynamic Transducer Placement", "Moving-Coil Dynamic Capsules &bull; Cardioid Rejection &bull; >140 dB SPL Tolerance",
        "Top & Bottom Snare Phase Relationship",
        "When miking both top batter head and bottom snare wires with Shure SM57s, the drumheads move away from one capsule while moving toward the other on impact, creating a 180° polarity opposition.",
        "Engaging the Gain plugin's Phase Invert (Ø) button on the snare bottom channel restores low-mid body (150–250Hz) immediately.",
        "Kick & Snare Mixing Recipe",
        [
            (1, "Snare Rim Angle", "Angle the top SM57 2–3cm above the rim pointing toward the center dot, aiming the rear null at the hi-hat to minimize spill."),
            (2, "Surgical Boxiness Cut", "Attenuate 300–400Hz on the kick drum by -4dB to -6dB to remove cardboard resonance."),
            (3, "Slow Compressor Attack", "Use a 20–30ms compressor attack time on kick and snare so the initial stick/beater transient punches through unclamped.")
        ]
    ),
    make_slide(
        4, "SECTION 3 &bull; ACOUSTIC STRINGED INSTRUMENTS", "Acoustic Guitar &amp; Piano: <span>12th Fret Sweet Spot &amp; Stereo Pairs</span>",
        "Acoustic guitars and pianos demand fast transient response and extended high-frequency detail, making small-diaphragm condenser (SDC) microphones the industry standard.",
        "Acoustic Guitar Miking Masterclass", "Best Microphones for Recording Acoustic Guitar", "X7N1VXD6cHs",
        "Best Microphones for Recording Acoustic Guitar – Logic Pro Tutorial", "Music Tech Guru Studio Guide",
        "Listening Focus: Soundhole Boom vs 12th Fret Balance",
        "Never point a microphone directly into the acoustic guitar soundhole—air resonance around 80–120Hz creates overwhelming muddy boominess.",
        "Aiming a cardioid small-diaphragm condenser (e.g., Neumann KM184 / Rode NT5) 15–30cm away at the 12th fret neck joint captures an ideal blend of warm body resonance and articulate string detail.",
        ["Small-Diaphragm Condenser", "+48V Phantom Power", "12th Fret Sweet Spot", "Soundhole Avoidance", "XY / Spaced Stereo", "Transient Detail"],
        "Acoustic Guitar Miking", "12th Fret & Bridge Stereo Microphone Placement", "/images/guitar_acoustic_micing_1770033553666.png", "Acoustic Guitar Microphone Placement Diagram",
        "🎸 Small-Diaphragm Condenser (SDC) Precision", "Low-Mass Diaphragm &bull; Extended 20Hz–20kHz Response &bull; +48V Phantom Power",
        "Mono vs Stereo Acoustic Capture",
        "In a dense rock/pop multitrack mix (with drums, bass, electric guitars, and keys), a single mono SDC at the 12th fret sits cleanly in the stereo field without cluttering the mix.",
        "For exposed acoustic arrangements, use a stereo XY pair at the 12th fret or a spaced pair (one mic at the 12th fret, one aimed at the lower bout bridge) checked carefully for phase.",
        "Acoustic Recording Checklist",
        [
            (1, "Engage +48V Phantom Power", "Condenser capsules require +48V DC phantom power over balanced XLR to charge the backplate and active impedance converter."),
            (2, "High-Pass at 80–100Hz", "Remove foot taps, stand rumble, and proximity boom below the lowest guitar fundamental (E2 = 82.4Hz)."),
            (3, "Tame Finger Squeaks", "Use dynamic EQ or subtle de-essing around 2.5–4kHz if string slides jump out aggressively.")
        ]
    ),
    make_slide(
        5, "SECTION 4 &bull; ELECTRIC GUITAR & BASS", "Electric &amp; Bass Capture: <span>DI Boxes, Amp Miking &amp; Re-Amping</span>",
        "Capturing both a clean Direct Injection (DI) signal and a close-miked amplifier cabinet gives you rock-solid low-end definition alongside authentic valve/speaker harmonic overdrive.",
        "Rock Guitar & Bass Mixing", "Guide to Mixing Rock Using Logic Pro Stock Plugins", "TwBd3dRsUgQ",
        "Guide to Mixing ROCK using Logic Pro X stock Plugins only", "Music Tech Guru Production Guide",
        "Listening Focus: Center Cap Bite vs Cone Edge Warmth",
        "Placing a dynamic mic (SM57) dead-center on the speaker dust cap yields maximum 2–5kHz aggressive bite; moving 2–5cm off-center toward the paper cone edge warms the tone and smooths fizz.",
        "For bass guitar, blend a compressed DI stem (for tight 50–120Hz fundamental sub weight) with an amp/cab stem high-passed at 150Hz (for 700Hz–1.5kHz finger/pick grit).",
        ["Active / Passive DI", "Impedance Matching", "On-Axis vs Off-Axis", "SM57 + Ribbon Blend", "Bass DI + Amp Split", "Ground Lift"],
        "Direct Injection & Amp Signal Flow", "DI Box Thru Routing to Amplifier & Console", "/images/diagram_di_box_flow_v2.png", "DI Box and Amplifier Miking Signal Flow Diagram",
        "⚡ Direct Injection (DI) & Cabinet Miking Physics", "Hi-Z Guitar Pickup (1MΩ) -> Lo-Z Balanced XLR (150Ω) + Parallel Amp Thru",
        "How a DI Box Works in the Exam & Logbook",
        "Electric guitar and bass pickups output an unbalanced, high-impedance (Hi-Z) instrument-level signal susceptible to cable capacitance and hum. A DI box converts this into a balanced, low-impedance (Lo-Z) mic-level signal via XLR.",
        "Using the DI box's 'Thru' (Link) jack sends the parallel unprocessed signal simultaneously to a guitar amplifier on stage or in the live room.",
        "Guitar & Bass Mix Techniques",
        [
            (1, "Double-Tracking Rhythm Guitars", "Record two separate tight performances panned hard Left and Right rather than duplicating one audio region."),
            (2, "Phase-Align DI and Cab Mics", "Zoom in to sample level in Logic Pro and align the DI waveform crest with the microphone waveform crest."),
            (3, "Low-Pass Fizzy Amps", "Apply a 12dB/oct or 18dB/oct low-pass filter at 7–9kHz on distorted electric guitars to clear space for vocals and cymbals.")
        ]
    ),
    make_slide(
        6, "SECTION 5 &bull; VOCAL CAPTURE & COMPING", "Lead &amp; Backing Vocals: <span>Condenser Setup, Proximity &amp; Comping</span>",
        "Vocals are the focal point of almost every Component 1 submission. Examiners listen immediately for clean, intimate vocal capture free from plosive pops, room slapback, and sibilant harshness.",
        "Studio Vocal Setup Masterclass", "Setting Up a Vocal Microphone Correctly", "pwQfLPQsB7E",
        "Setting up a vocal microphone video 1", "Music Tech Guru Studio Recording Guide",
        "Listening Focus: Plosives, Sibilance & Room Reflections",
        "Plosives ('P' and 'B' blasts) launch low-frequency air bursts that overload condenser capsules—always place a dual-layer nylon or metal mesh pop shield 5–8cm in front of the capsule.",
        "Position the vocalist 15–20cm from a large-diaphragm cardioid condenser (e.g., Neumann U87 / Rode NT1) with acoustic absorption behind the singer's head (into the sensitive cardioid pickup lobe).",
        ["Large-Diaphragm Condenser", "Cardioid Null (180°)", "Pop Filter Setup", "Proximity Effect", "Take Folder Comping", "De-Essing (5–8kHz)"],
        "Studio Vocal Microphone & Pop Shield", "Large-Diaphragm Condenser Shockmount & Pop Screen", "/images/studio_mic_pop_screen.jpg", "Studio Vocal Condenser Microphone with Pop Filter",
        "🎤 Large-Diaphragm Condenser (LDC) Vocal Chain", "Shockmount Isolation &bull; Nylon Pop Shield &bull; Cardioid Polar Pattern",
        "Managing Proximity Effect & Vocal Comping",
        "Directional (cardioid/figure-8) microphones exhibit Proximity Effect: a progressive low-frequency boost (100–250Hz) as the singer moves within 10cm of the capsule. Maintain consistent distance via the pop filter.",
        "Record 3–5 full vocal passes into a Logic Pro Take Folder, then use Quick Swipe Comping to assemble the strongest pitch and phrasing from each take with automatic equal-power crossfades.",
        "Vocal Production Best Practices",
        [
            (1, "Absorb Behind the Singer", "A cardioid mic rejects sound from behind the mic (180°), meaning room reflections behind the vocalist bounce straight into the front of the capsule!"),
            (2, "Serial Vocal Compression", "Pair a fast FET compressor (1176 style, catching 3–4dB peaks) into a smooth Opto compressor (LA-2A style, 2–3dB levelling)."),
            (3, "Clip Gain Before Compression", "Even out quiet syllables and loud belted notes using region gain before hitting the compressor threshold.")
        ]
    ),
    make_slide(
        7, "SECTION 6 &bull; GAIN STAGING & PHASE", "Gain Staging &amp; Routing: <span>Headroom, Preamp Trim &amp; The 3:1 Rule</span>",
        "Clean digital recording starts at the analogue preamp gain stage. Recording too hot risks irreversible 0 dBFS digital clipping, while poor multi-mic spacing causes comb filtering.",
        "Logic Pro Recording Setup", "Setting Up a Record Track & Gain Staging in Logic Pro", "zY1DddKySlA",
        "setting up a record track in Logic Pro X", "Music Tech Guru DAW Workflow Tutorial",
        "Listening Focus: Digital Headroom vs Noise Floor",
        "In 24-bit digital recording (144 dB theoretical dynamic range), there is no need to push meters near 0 dBFS. Aim for an average recording level of -18 dBFS RMS with peaks around -10 to -6 dBFS.",
        "When using multiple microphones on a stage or ensemble, obey the 3:1 Distance Rule: the distance between microphones must be at least 3× the distance from each mic to its source.",
        ["-18 dBFS Average", "-6 dBFS Peak Ceiling", "24-Bit Dynamic Range", "3:1 Distance Rule", "Comb Filtering", "Preamp Pad (-20dB)"],
        "The 3:1 Microphone Placement Rule", "Preventing Phase Comb Filtering Between Adjacent Mics", "/images/explanation_3_to_1_rule.svg", "3 to 1 Microphone Distance Rule Diagram",
        "🎚️ Precision Gain Staging & Acoustic Isolation", "24-bit / 44.1kHz Capture &bull; -18 dBFS Nominal Level &bull; 3:1 Phase Rule",
        "Preamp Pad Switches & Input Monitoring",
        "Loud transient sources (snare drum, cranked guitar cab) can overload the analogue microphone preamp input transformer even with gain turned down. Engage the -15dB or -20dB Attenuation Pad switch.",
        "Set your audio interface buffer size to 32 or 64 samples (or enable Direct Hardware Monitoring) during tracking so musicians experience near-zero latency (<3ms) in their headphones.",
        "Tracking & Routing Checklist",
        [
            (1, "Never Clip the A/D Converter", "Once an analogue signal exceeds 0 dBFS at the A/D converter, the waveform flat-tops permanently and cannot be fixed by lowering the DAW fader."),
            (2, "Verify 3:1 Spacing", "If Mic A is 20cm from Singer A, Mic B must be at least 60cm away to keep bleed at least 9.5dB quieter than the direct voice."),
            (3, "Zero-Crossing Edits", "Always slice regions at zero-crossing points and apply 5–10ms crossfades to eliminate audible clicks.")
        ]
    ),
    make_slide(
        8, "SECTION 7 &bull; NOISE GATING & SUBTRACTIVE EQ", "Cleanup &amp; Unmasking: <span>Noise Gates, Spill &amp; Frequency Carving</span>",
        "Before adding creative polish, Component 1 mixes require surgical cleanup: gating tom/amp spill, high-pass filtering non-bass tracks, and carving complementary EQ pockets.",
        "Logic Pro Noise Gate Tutorial", "How to Use the Noise Gate in Logic Pro", "aLWklivuMmE",
        "How to Use the Noise Gate in Logic Pro (Quick Tip!)", "Music Tech Guru Mixing Masterclass",
        "Listening Focus: Natural Gate Decay vs Chattering",
        "When gating rack/floor toms or noisy guitar amplifiers, set a fast Attack (1–3ms) so transients aren't clipped, use Hold (20–50ms) to prevent chattering, and time the Release (150–400ms) to follow the drum ring.",
        "Instead of infinite (-100dB) reduction which sounds jarring when background cymbal bleed vanishes suddenly, set the Gate Reduction (Range/Floor) to -12dB to -18dB for transparent spill attenuation.",
        ["Threshold & Hysteresis", "Hold & Release", "Range / Reduction", "High-Pass Filtering", "Frequency Unmasking", "Mud Zone (200–400Hz)"],
        "Noise Gate Envelope Parameters", "Threshold, Attack, Hold, Release & Hysteresis Control", "/images/noise_gate_hold_envelope_diagram.svg", "Noise Gate Envelope Diagram",
        "🔇 Surgical Gating & Subtractive EQ Unmasking", "Hysteresis Control &bull; Sidechain Filter &bull; Complementary EQ Carving",
        "Eliminating Low-Mid Mud (200–450 Hz)",
        "The most common flaw in student Component 1 mixes is buildup between 200Hz and 450Hz where snare body, acoustic guitars, electric guitars, pianos, and lower vocals overlap.",
        "Apply High-Pass Filters (80–120Hz) on guitars, keys, and vocals, and use narrow subtractive EQ cuts (-3dB to -5dB, Q = 2.5) in the low-mids to let the kick and bass guitar breathe.",
        "Cleanup & EQ Golden Rules",
        [
            (1, "Use Hysteresis on Gates", "Set the Close threshold 3–6dB lower than the Open threshold so decaying drum sustains don't cause the gate to stutter."),
            (2, "Cut Narrow, Boost Wide", "Use high-Q narrow bells for surgical resonant cuts and low-Q gentle bells/shelves for musical tonal boosts."),
            (3, "Manual Strip Silence", "For vocal breaths and guitar intro silence, manual region trimming with fade-ins is often cleaner than an automated gate.")
        ]
    ),
    make_slide(
        9, "SECTION 8 &bull; AUXILIARY BUSES & SPATIAL DEPTH", "Buses, Reverb &amp; Delay: <span>Aux Sends, Pre-Delay &amp; Abbey Road EQ</span>",
        "Professional Component 1 mixes place instruments into a cohesive 3D acoustic space using shared auxiliary effect buses rather than inserting 15 separate reverbs on individual channels.",
        "Auxiliary & Bus Routing Tutorial", "Using Auxiliary and Bus Channels on Logic Pro X", "T3aMMpoz95Y",
        "Using Auxiliary and Bus channels on Logic Pro X", "Music Tech Guru Studio Routing Guide",
        "Listening Focus: Front-to-Back Depth & Vocal Clarity",
        "Routing tracks via Post-Fader Aux Sends to a shared Short Room Reverb and a Lush Vocal Plate glues disparate close-miked recordings into one believable studio room.",
        "Dial in 25–40ms of Pre-Delay on your vocal plate reverb so the dry consonant attack arrives at the listener's ear before the reverb tail blooms.",
        ["Post-Fader Aux Send", "100% Wet Return", "25–40ms Pre-Delay", "Abbey Road Reverb EQ", "Parallel Compression", "Track Stacks / Subgroups"],
        "Reverb Pre-Delay & Abbey Road EQ", "Separating Direct Transients from Early Reflections", "/images/reverb_predelay_separation_diagram.svg", "Reverb Pre-Delay Separation Diagram",
        "🌊 Auxiliary Bus Architecture & 3D Depth Staging", "Post-Fader Sends &bull; 100% Wet Aux Return &bull; Pre-Delay &bull; Abbey Road EQ Filtering",
        "The Abbey Road Reverb Trick",
        "Unfiltered reverb tails contain low-frequency rumble (mudding up the kick/bass) and harsh high-frequency sibilance. Insert a Channel EQ directly on your Reverb Aux channel before or after the reverb plugin.",
        "Roll off lows below 250–300Hz and highs above 6–8kHz on the Aux return. The result is lush, warm 3D depth that never clouds the lead vocal or rhythm section.",
        "Bus & Spatial Routing Rules",
        [
            (1, "Always Set Aux Reverbs to 100% Wet", "Because the dry signal is already playing on the source channel strip, the Aux return must output 100% Wet (0% Dry)."),
            (2, "Group Buses (Drum Bus / Vocal Bus)", "Route all drum channels to a Stereo Drum Bus for cohesive bus compression (2:1 ratio, 30ms attack, 2dB GR)."),
            (3, "Keep Sub-Bass Dry", "Never send kick drum sub-frequencies or bass guitar into a stereo reverb bus—it ruins low-end mono punch.")
        ]
    ),
    make_slide(
        10, "SECTION 9 &bull; FINAL MIXDOWN, MASTERING & LOGBOOK", "Final Mix &amp; Submission: <span>Stereo Balance, Mastering &amp; Logbook</span>",
        "The final stage of Component 1 brings together stereo panning, volume automation, gentle master bus limiting, uncompressed WAV bouncing, and completing your official Pearson Logbook.",
        "Full Band Mixing Masterclass", "How to Mix a Band in Logic Pro X (Full Tutorial)", "ZbOIpHBDTI8",
        "How to Mix a Band in Logic Pro X (Full Tutorial)", "Music Tech Guru Complete Mixing Guide",
        "Listening Focus: Reference Track Comparison & Final Bounce",
        "A/B your mix against commercial reference tracks in the same genre at matched loudness so your vocal level, snare crack, and bass weight translate on both studio monitors and headphones.",
        "Export your final master at 16-bit / 44.1 kHz Stereo Interleaved WAV (with TPDF Dither enabled and Normalize set to OFF), ensuring True Peak stays below -1.0 dBTP.",
        ["LCR / Stereo Staging", "Volume Automation", "-1.0 dBTP Limiter", "16-Bit / 44.1kHz WAV", "TPDF Dithering", "MTG Logbook Generator"],
        "Stereo Soundstage & Panning Architecture", "Frequency vs Panning Distribution Across the Stereo Field", "/images/lcr_panning_soundstage_diagram_v2.svg", "LCR and Stereo Soundstage Panning Diagram",
        "🏆 Final Submission & Coursework Logbook Protocol", "Stereo WAV (16-bit/44.1kHz) &bull; Normalize OFF &bull; Signed Authentication & Logbook",
        "Using the MTG App Track Sheet & Logbook Creator",
        "Pearson examiners cross-reference your audio mix against your written Component 1 Logbook. You must document exact microphone models, polar patterns, placement distances, EQ frequencies, compression ratios, and effects routing.",
        "Inside the Music Tech Guru App (app.musictechguru.com), use the interactive Component 1 Toolkit & Track Sheet Creator to generate examiner-ready documentation in minutes.",
        "Final Pre-Submission Checklist",
        [
            (1, "Clean Start & Tail Fade-Out", "Trim dead silence at the start and apply a smooth master fade-out at the end so noise floors don't cut off abruptly."),
            (2, "Listen to the Bounce File Outside the DAW", "Play the exported WAV file in Finder/QuickTime from 0:00 to the end to verify duration (2:00–3:30) and zero glitches."),
            (3, "Complete Your Logbook in the MTG App", "Verify every microphone and signal processor is listed accurately in your official Pearson Logbook PDF.")
        ]
    )
]

c1_deck_html = get_deck_html(
    1, "9MT0/01", "Recording &amp; Mixing",
    "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
    "#10b981", "rgba(16, 185, 129, 0.25)", "#38bdf8",
    "\n".join(c1_slides)
)

with open("public/interactive-slide-component-1.html", "w", encoding="utf-8") as f:
    f.write(c1_deck_html)
print(f"Generated public/interactive-slide-component-1.html ({len(c1_deck_html):,} bytes)")

# ==============================================================================
# BUILD COMPONENT 2 DECK (9MT0/02: Technology-Based Composition)
# ==============================================================================
c2_slides = [
    make_slide(
        1, "NEA COURSEWORK &bull; 9MT0/02 OVERVIEW", "Component 2: <span>Technology-Based Composition Architecture</span>",
        "Component 2 (9MT0/02) is the non-exam composition assessment worth 20% of the A-Level (60 marks). Candidates create an original technology-based piece (2:30–3:30) responding to one of three Pearson set briefs.",
        "Official Composition Guide", "Component 2 Composition & Arrangement Basics", "khY16VLIJMo",
        "Edexcel A Level Music Technology Component 2 - Composition - Arrangement Basics", "Music Tech Guru Official Composition Masterclass",
        "Mandatory Pearson Edexcel Component 2 Requirements",
        "You must select one official Pearson brief (Brief 1: Video/Film clip, Brief 2: Text/Poem stimulus, or Brief 3: Topic/Theme stimulus) and compose a piece strictly between 2:30 and 3:30.",
        "Your composition MUST integrate original synthesis patches created from scratch, original creative sampling/audio manipulation, and expressive MIDI sequencing—stock presets and unedited loops score low marks!",
        ["60 Marks", "20% of A-Level", "2:30–3:30 Duration", "3 Set Briefs", "Original Synthesis", "Creative Sampling"],
        "DAW Sequencing & Synthesis Workspace", "Integrating Synthesis, Sampling, Audio & MIDI", "/images/MIDI Piano Roll Logic.png", "Logic Pro X MIDI Piano Roll & Synthesis Composition Workspace",
        "🎹 The 4 Pillars of Component 2 Assessment", "Original Synthesis &bull; Creative Sampling &bull; MIDI Sequencing &bull; Musical Composition & Mix",
        "How the 60 Marks Are Awarded",
        "Examiners mark equally across Musical Composition (structure, harmony, melody, rhythm, response to brief) and Creative Music Technology (synthesis from scratch, sample manipulation, automation, and final mix quality).",
        "Every synthesizer patch and sampled sound must be documented in your Component 2 Logbook showing how you initialized the patch and sculpted oscillators, filters, envelopes, and LFOs.",
        "Golden Rules for Top-Band Marks (50–60/60)",
        [
            (1, "Never Rely on Unmodified Presets", "Initialize ('Init') your synth patches or substantially reprogram oscillators, filters, and envelopes—and screenshot them for your logbook."),
            (2, "Record & Manipulate Your Own Samples", "Capture original vocal phrases, Foley hits, or acoustic sounds and transform them using Quick Sampler / Alchemy."),
            (3, "Strict 2:30–3:30 Duration", "Unlike Component 1 (2:00 min), Component 2 requires a minimum duration of 2 minutes 30 seconds.")
        ]
    ),
    make_slide(
        2, "SECTION 1 &bull; SUBTRACTIVE SYNTHESIS ARCHITECTURE", "Subtractive Synthesis: <span>Oscillators, Waveforms &amp; Harmonics</span>",
        "To score top marks in Component 2 synthesis, you must build patches from an initialized state using oscillators (VCO/DCO), harmonic waveform selection, detuning, and sub-oscillator layering.",
        "Synthesis Masterclass Lesson 1", "Subtractive Synthesis Introduction", "LUjKWcpvU6c",
        "Subtractive Synthesis Lesson 1 Introduction", "Music Tech Guru Synthesis Series",
        "Listening Focus: Harmonic Spectra of Core Waveforms",
        "Sine Wave: Fundamental frequency only ($1f$)—pure sub-bass weight. Triangle Wave: Odd harmonics rolling off steeply ($1/n^2$)—warm flute/hollow lead.",
        "Sawtooth Wave: All integer harmonics ($1f, 2f, 3f, 4f...$)—bright, buzzy brass/strings/pads. Square/Pulse Wave: Odd harmonics only ($1f, 3f, 5f...$)—woodwind/woody hollow bass; Pulse Width Modulation (PWM) creates lush chorus movement.",
        ["Sine (1f)", "Triangle (Odd 1/n²)", "Sawtooth (All Integer)", "Square / PWM", "Cent Detuning", "Sub-Oscillator (-1 Oct)"],
        "Subtractive Synthesizer Signal Flow", "Oscillator -> Filter -> Amplifier -> Modulation", "/images/subtractive_synth_flow_hq.png", "Subtractive Synthesizer Signal Flow Diagram",
        "🎛️ Initialized Patch Design (VCO -> VCF -> VCA)", "Harmonic Generation &bull; Spectral Filtering &bull; Amplitude Shaping",
        "Unison Detuning & Oscillator Sync",
        "Stacking two or more sawtooth oscillators and detuning them by ±7 to ±18 cents creates phase interference beating (the classic 'Reese bass' or 'Supersaw' pad texture) without needing an external chorus plugin.",
        "Hard Sync locks the phase reset of Oscillator 2 to the fundamental pitch of Oscillator 1; sweeping Oscillator 2's pitch via an envelope produces aggressive, tearing harmonic lead timbres.",
        "Examiner Synth Patch Tips",
        [
            (1, "Start from 'Init' Patch", "In Retro Synth or ES2, choose 'Initialize' or 'Recall Default' so every parameter choice is authentically yours."),
            (2, "Add Noise for Acoustic Realism", "Blend 5–10% White or Pink Noise with a Triangle/Saw wave to simulate breath Chiff on synth flutes and brass."),
            (3, "Glide / Portamento", "Enable Mono Legato mode with 40–80ms Glide time on sub-basses and expressive synth leads.")
        ]
    ),
    make_slide(
        3, "SECTION 2 &bull; FILTERING & RESONANCE", "Synth Bass &amp; Leads: <span>Filter Cutoff, Resonance &amp; Key Tracking</span>",
        "The Voltage Controlled Filter (VCF) sculpts raw oscillator harmonics into dynamic basslines, acid squelches, and evolving pads using Low-Pass, High-Pass, and Band-Pass slopes.",
        "Synthesis Masterclass Lesson 2", "Creating Classic Synth BassPatches", "olkaItQbSZ4",
        "Synthesis Lesson 2 Kernkraft Bass", "Music Tech Guru Sound Design Guide",
        "Listening Focus: 12dB/oct vs 24dB/oct Ladder Filters",
        "A 24dB/octave (4-pole Moog style) Low-Pass Filter removes high frequencies steeply for punchy, deep basslines; a 12dB/octave (2-pole Oberheim style) filter leaves more upper-harmonic fizz and air.",
        "Pushing Filter Resonance (Q) boosts frequencies right at the cutoff point; sweeping the cutoff with high resonance creates vocal-like formant sweeps and acid basslines.",
        ["24dB/oct Low-Pass", "12dB/oct Oberheim", "Resonance (Q) Peak", "Filter Drive / Saturation", "Key Tracking", "Reese Bass Detune"],
        "Reese Bass & Filter Harmonics", "Detuned Sawtooth Phase Beating & Low-Pass Filtering", "/images/reese_bass_diagram.png", "Reese Bass Detuning and Low-Pass Filter Diagram",
        "🔊 Dynamic Filter Sculpting & Harmonic Drive", "Cutoff Frequency (Hz) &bull; Resonance ($Q$) &bull; Filter Envelope Amount",
        "Filter Envelopes & Keyboard Tracking",
        "Routing ADSR Envelope 2 to the Filter Cutoff (with Fast Attack, 200ms Decay, Zero Sustain) makes the filter snap open on every note strike and close rapidly—creating the signature plucky synth bass sound.",
        "Enabling Keyboard Tracking (0.5 to 1.0) raises the filter cutoff automatically as higher notes are played so upper-register notes don't sound muffled compared to low notes.",
        "Designing High-Scoring Synth Bass",
        [
            (1, "Mono Below 120Hz", "Keep your sub-oscillator strictly mono so low-end energy stays phase-coherent in the center of the mix."),
            (2, "Velocity-to-Cutoff Routing", "Map MIDI Note Velocity to Filter Cutoff depth so harder key strikes produce brighter, more aggressive notes."),
            (3, "Filter Saturation / Drive", "Add subtle internal filter drive to restore low-end warmth lost when high resonance is dialed in.")
        ]
    ),
    make_slide(
        4, "SECTION 3 &bull; ENVELOPES & LFO MODULATION", "Retro Synth &amp; Modulation: <span>ADSR Envelopes, LFOs &amp; Mod Matrix</span>",
        "Static synthesizer patches sound lifeless. Top-band Component 2 compositions use ADSR envelopes, Low Frequency Oscillators (LFOs), and Modulation Matrices to make timbres evolve continuously.",
        "Retro Synth Masterclass", "How to Use the Retro Synth in Logic Pro X", "tBrkY4mQ_D4",
        "How to use the RETRO SYNTH in Logic Pro X. Simple Music Production tutorial", "Music Tech Guru Synth Walkthrough",
        "Listening Focus: Shaping Plucks, Pads & Vibrato",
        "ADSR (Attack, Decay, Sustain, Release): Percussive plucks use 0ms Attack, 180ms Decay, 0% Sustain, 100ms Release. Cinematic pads use 600ms Attack, 800ms Decay, 75% Sustain, 1500ms Release.",
        "An LFO operates below human hearing (0.1 Hz – 20 Hz). Routing an LFO to Pitch creates Vibrato; routing to Filter Cutoff creates Wah/Wobble; routing to Amplitude creates Tremolo.",
        ["Attack / Decay (Time)", "Sustain (Level %)", "Release (Time)", "LFO -> Pitch (Vibrato)", "LFO -> Filter (Wobble)", "Wavetable / FM Modes"],
        "ADSR Envelope Generator Architecture", "Attack, Decay, Sustain Level & Release Time Parameters", "/images/explanation_adsr_envelope.png", "ADSR Envelope Generator Diagram",
        "📈 Time-Variant Modulation & Expressive Control", "4-Stage ADSR Envelope &bull; Tempo-Synced LFO &bull; Mod Wheel (CC1) Routing",
        "4 Synthesis Engines Inside Logic Retro Synth",
        "Retro Synth provides four distinct synthesis engines ideal for Component 2 diversity: Analog (classic subtractive), Sync (hard oscillator sync leads), Table (evolving digital wavetable pads), and FM (metallic DX7-style bells and electric pianos).",
        "Combine at least two different synthesis types (e.g., Analog Subtractive bass + Wavetable evolving pad + FM percussive bell) and explain their signal paths in your logbook!",
        "Modulation Techniques Examiners Love",
        [
            (1, "Delayed LFO Vibrato", "Set LFO fade-in or route LFO depth via Mod Wheel (CC1) so sustained lead notes develop natural vibrato after 300ms."),
            (2, "Tempo-Synced LFO Wobbles", "Sync the LFO rate to 1/4, 1/8T, or 1/16 notes to lock rhythmic filter movement to your project tempo."),
            (3, "Wavetable Position Automation", "Automate the Wavetable position knob across an 8-bar riser so the harmonic timbre morphs organically.")
        ]
    ),
    make_slide(
        5, "SECTION 4 &bull; CREATIVE SAMPLING & QUICK SAMPLER", "Creative Sampling: <span>Foley Capture, Root Mapping &amp; Slicing</span>",
        "Component 2 requires original creative sampling. Recording everyday acoustic objects, vocal whispers, or instrument hits and transforming them in Logic's Quick Sampler or Multi-Sampler is a guaranteed mark-winner.",
        "Quick Sampler Masterclass", "Logic Pro Q-Sampler Tutorial – A-Level Quick Guide", "BD-M-40CMW8",
        "Logic Pro Q-Sampler Tutorial – A-Level Music Tech Quick Guide", "Music Tech Guru Sampling Guide",
        "Listening Focus: Classic Pitch-Tracking vs Slice Mode",
        "In Classic Mode, Quick Sampler analyzes the fundamental pitch of your recorded audio, assigns it to the correct MIDI Root Key, and maps it chromatically across the keyboard.",
        "In Slice Mode, transient markers split a vocal phrase or acoustic percussion performance into individual MIDI notes starting at C1, allowing complete rhythmic rearrangement.",
        ["Original Foley Capture", "Root Key Detection", "Keyzone Mapping", "Equal-Power Loop Crossfade", "Formant Preservation", "Reverse Envelopes"],
        "Multi-Sampling & Keyzone Mapping", "Root Note Assignment, Keyzones & Velocity Layers", "/images/multisampling_note_zones.svg", "Sampler Keyzone Mapping and Root Note Diagram",
        "🎙️ From Raw Foley Recording to Playable Instrument", "24-bit Audio Capture &bull; Transient Slicing &bull; Loop Crossfade &bull; Pitch/Filter Envelopes",
        "Transforming Found Sounds into Musical Patches",
        "Example workflow for your Logbook: Record a wine glass tap or acoustic guitar body knock with a condenser mic. Load into Quick Sampler (Classic Mode), trim the start transient, and loop the sustained resonance with an equal-power crossfade.",
        "Engage the sampler's internal 24dB Low-Pass Filter with keyboard tracking and long Release to turn a 1-second household object recording into a lush, playable polyphonic pad!",
        "Sampling Marks Checklist",
        [
            (1, "Prevent Chipmunk Artifacts", "Enable Flex / Formant preservation in Quick Sampler or create multi-sample keyzones so extreme pitch shifts stay natural."),
            (2, "Zero-Crossing Loop Points", "Adjust loop start/end markers to zero-crossings and add a 20–50ms crossfade so sustained notes never click."),
            (3, "Document Original Sources", "State clearly in your logbook what microphone you used to record your raw sample or which stem you manipulated.")
        ]
    ),
    make_slide(
        6, "SECTION 5 &bull; ADVANCED SAMPLE FILTERING & PITCH", "Sample Sound Design: <span>ADSR, Filter Sweeps &amp; Pitch Envelopes</span>",
        "Once samples are loaded into Quick Sampler, Drum Machine Designer, or Alchemy, applying per-sample pitch envelopes, resonant filters, and bit-crushing elevates simple hits into bespoke sound design.",
        "Sampler Filtering & Envelopes", "Drum Sampling: Filtering, ADSR & Pitch Bend", "n9DSjUVsEeg",
        "Drum Sampling Lesson 4 Filtering, ADSR & Pitch bend", "Music Tech Guru Sampling Masterclass",
        "Listening Focus: Pitch Envelopes for Punchy Percussion",
        "Applying a fast downward Pitch Envelope (+12 semitones dropping to 0 in 25ms) on a sampled tom or sine kick creates an authoritative transient 'thwack' at the start of the hit.",
        "Using sample Reverse mode with a slow Attack envelope turns cymbal crashes, piano chords, or vocal syllables into dramatic pre-drop risers and atmospheric transitions.",
        ["Pitch Envelope (+12st)", "Sample Reverse Riser", "Granular Synthesis", "Alchemy Spectral Morph", "Sample Rate Reduction", "Velocity -> Filter"],
        "Sampler Signal Flow & Filtering", "Sample Playback -> Pitch Env -> Resonant Filter -> Amp ADSR", "/images/sample_filtering_diagram.svg", "Sampler Internal Filtering and Envelope Diagram",
        "🧪 Advanced Sampler Manipulation & Granular Textures", "Pitch Envelopes &bull; Reverse Risers &bull; Granular Clouds &bull; Formant Shifting",
        "Using Logic Pro Alchemy for Component 2",
        "Logic Pro's Alchemy allows you to import your own recorded audio into 4 independent sources (A, B, C, D) using Granular, Spectral, Additive, or Sampler engines.",
        "Granular synthesis chops your audio sample into tiny 10–50ms 'grains' and clouds them together, allowing you to freeze time, stretch a 1-second vocal breath into a 30-second atmospheric pad, or shift pitch independently of duration.",
        "High-Impact Sample Tricks",
        [
            (1, "Reverse Vocal Reverb Throws", "Bounce a dry vocal word with a long 4-second reverb tail in place, reverse the audio file, and align the swell right into the downbeat."),
            (2, "Velocity-Sensitive Hi-Hats", "Map MIDI velocity to both Sample Volume and Low-Pass Filter Cutoff so soft hi-hat hits sound darker and more human."),
            (3, "Stutter & Glitch Edits", "Slice vocal or drum regions into 1/32 and 1/64 rhythmic repeats with rising pitch transposition across a 1-bar fill.")
        ]
    ),
    make_slide(
        7, "SECTION 6 &bull; DRUM PROGRAMMING & GROOVE", "MIDI Sequencing: <span>Drum Programming, Velocity &amp; Groove</span>",
        "Robotic MIDI programming with every note fixed at velocity 100 and 100% rigid quantization caps your marks. Examiners reward expressive humanization, ghost notes, and layered percussion.",
        "Drum Programming Masterclass", "Drum Programming in Logic Pro X for Beginners", "HPEE8zpvhCI",
        "Drum Programming in Logic Pro X for Beginners. A Music Production Tutorial", "Music Tech Guru Sequencing Guide",
        "Listening Focus: Ghost Notes, Swing & Velocity Dynamics",
        "Program snare ghost notes (32nd/16th notes between main backbeats) at low velocities (25–45) contrasted against accented rimshot backbeats on beats 2 and 4 (velocity 110–125).",
        "Vary hi-hat velocities across 16th-note patterns (Strong-weak-Medium-weak) and dial in 54%–58% 16th-note Swing (Q-Swing) to inject infectious groove.",
        ["Velocity Shaping", "Snare Ghost Notes", "Q-Swing (54%–62%)", "MIDI Transform Humanize", "Layering Acoustic + 808", "CC Expression"],
        "MIDI Piano Roll & Velocity Editing", "Note Duration, Grid Quantization & Velocity Lanes", "/images/midi_piano_roll.svg", "MIDI Piano Roll and Velocity Shaping Diagram",
        "🥁 Expressive MIDI Sequencing & Groove Architecture", "Velocity Dynamics (1–127) &bull; Q-Strength & Q-Swing &bull; Continuous Controllers (CC)",
        "Beyond Basic Quantization",
        "Instead of hard-quantizing every MIDI performance to 100% grid lock, use Quantize Strength (Q-Strength at 70%–85%) to tighten timing errors while preserving natural human feel.",
        "For orchestral strings, brass, and synth leads, draw smooth curves in MIDI Continuous Controller lanes: CC1 (Modulation/Vibrato), CC11 (Expression/Swelling Dynamics), and CC64 (Sustain Pedal).",
        "MIDI Sequencing Examiner Checklist",
        [
            (1, "Avoid 'Machine-Gun' Fills", "When programming 16th-note snare or tom rolls, ramp velocities upward from 40 to 127 and slightly vary pitch/timbre."),
            (2, "Layer Kick & Snare Samples", "Combine a punchy acoustic kick (top transient) with a synthesized 808 sub-kick (tuned to the track's root key)."),
            (3, "Use MIDI Transform 'Humanize'", "Apply subtle randomization (±5 ticks timing, ±8 velocity) to programmed chord pads and arpeggios.")
        ]
    ),
    make_slide(
        8, "SECTION 7 &bull; CREATIVE AUDIO MANIPULATION", "Audio Manipulation: <span>Flex Time, Flex Pitch &amp; Vocal Chopping</span>",
        "Component 2 rewards blending live audio stems with electronic sequencing. Using Flex Time, Flex Pitch, Speed Fades, and rhythmic chopping turns raw audio into modern production hooks.",
        "Creative Audio Manipulation", "Manipulating Audio is EASY on Logic Pro X!", "NKQ3o8GuPuE",
        "Manipulating Audio is EASY on Logic Pro X! When you know how", "Music Tech Guru Production Masterclass",
        "Listening Focus: Choosing the Right Flex Algorithm",
        "Slicing Mode: Best for drums and percussion—cuts at transients without time-stretching artifacts. Monophonic: Best for solo vocals and basslines. Polyphonic: Best for chordal guitars and piano.",
        "Tempophone & Speed (FX) Modes create intentional creative artifacts: Speed Mode links time and pitch like a vinyl turntable or tape machine, allowing dramatic 'Tape Stop' spin-down effects!",
        ["Flex Time Algorithms", "Flex Pitch Formants", "Tape Stop Speed Fade", "Breakbeat Slicing", "Vocal Chopping", "Vocoder / Sidechain"],
        "Breakbeat & Audio Region Slicing", "Transient Slicing, Rearrangement & Pitch Manipulation", "/images/jungle_breakbeat_slicing_diagram.png", "Breakbeat Audio Slicing and Rearrangement Diagram",
        "✂️ Elastic Audio, Formant Shifting & Tape Stops", "Transient Markers &bull; Formant Shifting &bull; Vinyl Spin-Down Fade",
        "Creating Tape-Stop & Formant-Shifted Hooks",
        "In Logic Pro's Region Inspector, change the Fade Out type from 'Out' to 'Slow Down' (or Fade In to 'Speed Up') to create authentic analog tape-stop transitions at the end of a 16-bar section.",
        "In Flex Pitch, duplicate a lead vocal phrase, transpose it +12 semitones (+1 octave) or +7 semitones (perfect 5th), and shift the Formant parameter downward to create warm, modern electronic vocal harmonies.",
        "Creative Audio Techniques for Component 2",
        [
            (1, "EVOC 20 PolySynth Vocoder", "Route a recorded vocal stem into the Sidechain input of Logic's EVOC 20 Vocoder while playing lush synth chords via MIDI."),
            (2, "Rhythmic Trance Gate", "Use a Step FX or Noise Gate sidechained to a 16th-note muted hi-hat trigger to turn a static pad into a pulsing rhythmic hook."),
            (3, "Bounce in Place (Ctrl+B)", "Commit heavy CPU effects into audio regions so you can reverse, slice, and stutter the processed tail.")
        ]
    ),
    make_slide(
        9, "SECTION 8 &bull; COMPOSING TO A BRIEF & STRUCTURE", "Brief Fulfillment: <span>Film Sync, Hit Points, Structure &amp; Contrast</span>",
        "Whether composing to the Video Brief, Text Brief, or Topic Brief, top-band compositions demonstrate purposeful structural development, harmonic contrast, and precise synchronization.",
        "Official Composition Brief Guide", "A-Level Music Technology Composition Guidance Video", "KWppHE7ecew",
        "A Level Music Technology Composition 2019 Guidance Video 1", "Music Tech Guru Official Brief Analysis",
        "Listening Focus: Translating Brief Cues into Sonic Events",
        "For Video/Film Briefs: Spot exact SMPTE timecode hit points first using Markers in Logic Pro. Use Tempo Operations or beat-mapping so musical downbeats land naturally on visual cuts and impacts.",
        "For Text/Topic Briefs: Map out a clear structural arc (e.g., Atmospheric Intro -> Rhythmic Build -> Main Theme A -> Contrasting Bridge/Breakdown B -> Climax Theme A' -> Resolved Outro).",
        ["SMPTE Timecode Sync", "Scene Hit Points", "Leitmotif Development", "Harmonic Modulation", "Dynamic Contrast", "Automation Arc"],
        "DAW Automation & Structural Dynamics", "Volume, Filter & Send Automation Across Song Sections", "/images/vca_console_automation.png", "DAW Multi-Lane Automation and Structural Arrangement",
        "🎬 Synchronizing Music & Sound Design to the Brief", "Marker Spotting &bull; Tempo Changes &bull; Leitmotifs &bull; Tension & Release",
        "Avoiding the '8-Bar Loop Trap'",
        "The #1 reason Component 2 compositions get stuck in the mid-marks (30–38/60) is repetition: repeating a 4-bar or 8-bar chord loop for 3 minutes by simply muting and unmuting tracks.",
        "To reach 50+/60, introduce a contrasting B section (new chord progression, key/mode change, half-time or double-time feel, or metre shift) and develop your melodic motifs through inversion, augmentation, or timbre handoffs.",
        "Brief Fulfillment Strategy",
        [
            (1, "Use Diegetic & Non-Diegetic Layers", "Blend musical underscore (synths, drums, strings) with synchronized sonic events (impacts, risers, Foley textures) that directly reflect the brief."),
            (2, "Automate Transitions Every 4–8 Bars", "Draw filter cutoff sweeps, reverb throw swells, and stereo width automation leading into every structural boundary."),
            (3, "Reference the Brief in Your Logbook", "Explicitly state timestamps (e.g., 'At 01:14, the filter resonance peaks and drums drop out to reflect...') in your logbook.")
        ]
    ),
    make_slide(
        10, "SECTION 9 &bull; MIXING & FINALIZING COMPONENT 2", "Mixing &amp; Delivery: <span>Sidechain Space, Stereo Width &amp; Logbook</span>",
        "Electronic and hybrid compositions pack dense frequency energy across synths, samples, and drums. Clean mix separation, sidechain ducking, and accurate logbook documentation seal your grade.",
        "Component 2 Mixing Walkthrough", "Creating a Final Mix in Logic Pro X (Stock Plugins)", "McutLOQxzno",
        "Remixing 'Shape of You' on Logic Pro X (Stock Plugins ONLY) - Lesson 6 - Creating a Mix", "Music Tech Guru Mixing Masterclass",
        "Listening Focus: Carving Space in Dense Synth Arrangements",
        "Route your Kick Drum into the Sidechain input of a Compressor inserted on your Synth Bass and Lush Pads (Ratio 4:1, Fast Attack 2ms, Release 80ms) so the bass/pads duck 3–5dB on every kick hit.",
        "Keep sub-bass (<100Hz), kick, snare, and lead focal elements firmly centered; spread arpeggios, Foley percussion, and synth pads across the stereo field.",
        ["Sidechain Ducking", "Mid/Side Width", "EQ Spectral Unmasking", "-1.0 dBTP Ceiling", "16-Bit / 44.1kHz WAV", "MTG Coursework Toolkit"],
        "Sidechain Compression Routing", "Kick Trigger Ducking Synth Bass & Pads for Low-End Clarity", "/images/sidechain_compression_diagram.png", "Sidechain Compression Routing Diagram",
        "🏆 Final Mixdown & Component 2 Logbook Checklist", "Sidechain Clarity &bull; 16-bit/44.1kHz Bounce &bull; Complete Synthesis & Sampling Log",
        "Documenting Component 2 in the MTG App",
        "In your Component 2 Logbook, examiners look for exact technical evidence: oscillator waveforms, filter slopes/cutoffs, ADSR settings, LFO routings, sample sources, and creative effects chains.",
        "Use the Music Tech Guru App (app.musictechguru.com) Component 2 Coursework Toolkit & Synthesizer Lab to verify your synthesis terminology and audit your project before final submission.",
        "Final Pre-Submission Checklist",
        [
            (1, "Verify 2:30 to 3:30 Duration", "Check your bounced WAV file length! Component 2 must be at least 2 minutes 30 seconds long."),
            (2, "Video Brief Audio Bounce", "Even if you composed to the Video Brief, double-check your centre's submission rules for exporting the uncompressed 16-bit/44.1kHz stereo WAV file."),
            (3, "Check Mono & Headphone Translation", "Ensure wide stereo chorus/phaser synths don't vanish into thin air when summed to mono.")
        ]
    )
]

c2_deck_html = get_deck_html(
    2, "9MT0/02", "Technology-Based Composition",
    "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
    "#a855f7", "rgba(168, 85, 247, 0.25)", "#38bdf8",
    "\n".join(c2_slides)
)

with open("public/interactive-slide-component-2.html", "w", encoding="utf-8") as f:
    f.write(c2_deck_html)
print(f"Generated public/interactive-slide-component-2.html ({len(c2_deck_html):,} bytes)")


# ==============================================================================
# QUIZ GENERATOR FUNCTION (WITH HIGH-CONVERTING APP PRO CTA ON SCORE SCREEN)
# ==============================================================================
def build_quiz_html(
    quiz_title,
    quiz_subtitle,
    badge_text,
    accent_color,
    accent_glow,
    questions_list,
    cta_heading,
    cta_desc,
    app_cta_url="https://app.musictechguru.com"
):
    questions_json = json.dumps(questions_list)
    total_q = len(questions_list)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{quiz_title} | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-dark: #080e1a;
      --bg-card: #0f172a;
      --bg-surface: #1e293b;
      --accent: {accent_color};
      --accent-glow: {accent_glow};
      --accent-green: #34d399;
      --accent-red: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-accent: {accent_glow};
      --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}

    body {{
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }}

    .quiz-container {{
      width: 100%;
      max-width: 880px;
      background: radial-gradient(circle at 50% 0%, var(--accent-glow) 0%, rgba(14, 17, 36, 0) 70%), var(--bg-card);
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px var(--accent-glow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }}

    .quiz-header {{
      padding: 22px 28px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: rgba(8, 14, 26, 0.6);
    }}

    .header-left {{
      display: flex;
      flex-direction: column;
      gap: 4px;
    }}

    .spec-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      background: var(--accent-glow);
      border: 1px solid var(--accent);
      padding: 3px 10px;
      border-radius: 99px;
      width: fit-content;
    }}

    .quiz-main-title {{
      font-size: 18px;
      font-weight: 800;
      color: #fff;
    }}

    .quiz-counter {{
      font-size: 13px;
      font-weight: 800;
      color: var(--accent);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      padding: 6px 14px;
      border-radius: 10px;
    }}

    .progress-bar-wrap {{
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.06);
    }}

    .progress-bar-fill {{
      height: 100%;
      background: linear-gradient(90deg, var(--accent), #38bdf8);
      width: 10%;
      transition: width 0.35s ease;
    }}

    .quiz-body {{
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }}

    .question-title {{
      font-size: clamp(16px, 2vw, 19px);
      font-weight: 700;
      line-height: 1.45;
      color: #fff;
    }}

    .options-grid {{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}

    .option-btn {{
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px 18px;
      color: #e2e8f0;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      transition: all 0.2s ease;
      line-height: 1.45;
    }}

    .option-btn:hover:not(:disabled) {{
      background: rgba(51, 65, 85, 0.9);
      border-color: var(--accent);
      transform: translateX(3px);
    }}

    .opt-letter {{
      width: 26px;
      height: 26px;
      border-radius: 7px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--accent);
      font-weight: 800;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }}

    .option-btn.correct {{
      background: rgba(16, 185, 129, 0.15) !important;
      border-color: #10b981 !important;
      color: #ecfdf5 !important;
    }}
    .option-btn.correct .opt-letter {{
      background: #10b981;
      color: #052e16;
    }}

    .option-btn.incorrect {{
      background: rgba(239, 68, 68, 0.15) !important;
      border-color: #ef4444 !important;
      color: #fef2f2 !important;
    }}
    .option-btn.incorrect .opt-letter {{
      background: #ef4444;
      color: #fff;
    }}

    .explanation-box {{
      display: none;
      background: rgba(15, 23, 42, 0.9);
      border-left: 4px solid var(--accent);
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 13.5px;
      line-height: 1.55;
      color: #cbd5e1;
    }}

    .quiz-footer {{
      padding: 18px 28px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(8, 14, 26, 0.5);
    }}

    .next-btn {{
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      font-family: inherit;
    }}

    .next-btn:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    .score-screen {{
      display: none;
      padding: 36px 28px;
      text-align: center;
    }}

    .score-circle {{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 4px solid var(--accent);
      background: var(--accent-glow);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px auto;
    }}

    .score-val {{
      font-size: 34px;
      font-weight: 900;
      color: #fff;
      line-height: 1;
    }}

    .score-total {{
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 700;
      margin-top: 3px;
    }}

    .score-msg {{
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      margin-bottom: 8px;
    }}

    .score-desc {{
      font-size: 14px;
      color: var(--text-muted);
      max-width: 560px;
      margin: 0 auto 22px auto;
      line-height: 1.55;
    }}

    .pro-upgrade-banner {{
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%);
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 16px;
      padding: 22px 24px;
      max-width: 640px;
      margin: 0 auto 20px auto;
      text-align: left;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    }}

    .pro-upgrade-banner h4 {{
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .pro-upgrade-banner p {{
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 14px;
    }}

    .pro-cta-row {{
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }}

    .pro-btn-main {{
      background: linear-gradient(135deg, #00C1F0 0%, #2563eb 100%);
      color: #ffffff;
      text-decoration: none;
      font-weight: 800;
      font-size: 13.5px;
      padding: 11px 20px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 6px 20px rgba(0, 193, 240, 0.35);
      transition: transform 0.2s ease;
    }}
    .pro-btn-main:hover {{
      transform: translateY(-2px);
    }}

    .restart-btn {{
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }}
  </style>
</head>
<body>
  <div class="quiz-container">
    <div class="quiz-header">
      <div class="header-left">
        <span class="spec-badge">{badge_text}</span>
        <div class="quiz-main-title">{quiz_subtitle}</div>
      </div>
      <div class="quiz-counter" id="quizCounter">Question 1 / {total_q}</div>
    </div>

    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="progressBar"></div>
    </div>

    <div class="quiz-body" id="quizBody">
      <h2 class="question-title" id="questionTitle"></h2>
      <div class="options-grid" id="optionsGrid"></div>
      <div class="explanation-box" id="explanationBox"></div>
    </div>

    <div class="quiz-footer" id="quizFooter">
      <span style="font-size: 12px; color: var(--text-muted);" id="statusHint">Select the best answer</span>
      <button class="next-btn" id="nextBtn" onclick="nextQuestion()" disabled>
        <span>Next Question</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <div class="score-screen" id="scoreScreen">
      <div class="score-circle">
        <span class="score-val" id="finalScore">0</span>
        <span class="score-total">out of {total_q}</span>
      </div>
      <h3 class="score-msg" id="scoreMessage">Assessment Complete</h3>
      <p class="score-desc" id="scoreFeedback"></p>

      <div class="pro-upgrade-banner">
        <h4>🚀 {cta_heading}</h4>
        <p>{cta_desc}</p>
        <div class="pro-cta-row">
          <a href="{app_cta_url}" target="_blank" rel="noopener" class="pro-btn-main">
            <span>💾 Save Score &amp; Unlock Full MTG App (£12.99/yr) &rarr;</span>
          </a>
          <button class="restart-btn" onclick="restartQuiz()">↻ Retry Quiz</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const questions = {questions_json};
    let currentIdx = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {{
      const q = questions[currentIdx];
      document.getElementById('questionTitle').textContent = q.q;
      document.getElementById('quizCounter').textContent = `Question ${{currentIdx + 1}} / ${{questions.length}}`;
      document.getElementById('progressBar').style.width = `${{((currentIdx + 1) / questions.length) * 100}}%`;
      
      const grid = document.getElementById('optionsGrid');
      grid.innerHTML = '';
      answered = false;
      document.getElementById('nextBtn').disabled = true;
      document.getElementById('explanationBox').style.display = 'none';
      document.getElementById('statusHint').textContent = 'Select the best answer';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {{
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="opt-letter">${{letters[idx]}}</span><span>${{opt}}</span>`;
        btn.onclick = () => selectOption(idx);
        grid.appendChild(btn);
      }});
    }}

    function selectOption(selectedIdx) {{
      if (answered) return;
      answered = true;

      const q = questions[currentIdx];
      const buttons = document.querySelectorAll('.option-btn');
      
      buttons.forEach((btn, idx) => {{
        btn.disabled = true;
        if (idx === q.correct) {{
          btn.classList.add('correct');
        }} else if (idx === selectedIdx) {{
          btn.classList.add('incorrect');
        }}
      }});

      if (selectedIdx === q.correct) {{
        score++;
        document.getElementById('statusHint').textContent = '✓ Correct! Review technical explanation';
      }} else {{
        document.getElementById('statusHint').textContent = '✗ Incorrect. Review technical explanation';
      }}

      const exp = document.getElementById('explanationBox');
      exp.innerHTML = `<strong>Examiner Rationale:</strong> ${{q.expl}}`;
      exp.style.display = 'block';

      document.getElementById('nextBtn').disabled = false;
    }}

    function nextQuestion() {{
      currentIdx++;
      if (currentIdx < questions.length) {{
        renderQuestion();
      }} else {{
        showScore();
      }}
    }}

    function showScore() {{
      document.getElementById('quizBody').style.display = 'none';
      document.getElementById('quizFooter').style.display = 'none';
      const screen = document.getElementById('scoreScreen');
      screen.style.display = 'block';

      document.getElementById('finalScore').textContent = score;
      const pct = Math.round((score / questions.length) * 100);
      let msg = '';
      let desc = '';

      if (pct >= 80) {{
        msg = '🏆 Top-Band A* / Distinction Mastery!';
        desc = `Outstanding work (${{pct}}%)! You have strong command of the core technical concepts. Unlock Stage 2–4 Hard Mode, interactive DAW practice tools, and full coursework checklists inside the MTG Revision App.`;
      }} else if (pct >= 60) {{
        msg = 'Solid Merit / B-Grade Standard!';
        desc = `Good job (${{pct}}%)! Review the examiner explanations above and jump into the MTG Revision App to practice interactive audio & diagram drills.`;
      }} else {{
        msg = 'Keep Revising — Foundation Building!';
        desc = `You scored ${{pct}}%. Review the interactive deck above and use the MTG Revision App's guided topic modules to lock in your A-Level marks.`;
      }}

      document.getElementById('scoreMessage').textContent = msg;
      document.getElementById('scoreFeedback').textContent = desc;
    }}

    function restartQuiz() {{
      currentIdx = 0;
      score = 0;
      document.getElementById('scoreScreen').style.display = 'none';
      document.getElementById('quizBody').style.display = 'flex';
      document.getElementById('quizFooter').style.display = 'flex';
      renderQuestion();
    }}

    renderQuestion();
  </script>
</body>
</html>
"""

# 1. Component 1 Quiz Questions
c1_questions = [
    {
        "q": "Under Pearson Edexcel Component 1 (9MT0/01) rules, what is the mandatory minimum number of instruments/parts and microphone captures required in a candidate's recording?",
        "options": [
            "At least 4 instruments total, with at least 1 captured via microphone",
            "At least 7 instruments/parts total, with at least 4 captured using microphones (including drums/percussion and lead vocal)",
            "At least 12 instruments total, all recorded simultaneously in one live room take",
            "Any number of tracks, provided at least 50% use Apple Loops or splice samples"
        ],
        "correct": 1,
        "expl": "Pearson Edexcel 9MT0/01 specifies a minimum of 7 parts in total, of which at least 4 must be captured using microphones (specifically including percussion/drums and vocals), with a final duration of 2:00 to 3:30."
    },
    {
        "q": "When miking an acoustic guitar for Component 1, why do studio engineers aim a small-diaphragm condenser at the 12th fret neck joint rather than directly into the soundhole?",
        "options": [
            "Because the soundhole emits zero acoustic energy below 1 kHz",
            "Because the soundhole acts as a Helmholtz air resonator around 80–120 Hz, producing overwhelming, muddy low-end boominess",
            "Because small-diaphragm condensers cannot operate without magnetic string pickups",
            "Because pointing at the soundhole inverts the stereo panning automatically"
        ],
        "correct": 1,
        "expl": "The soundhole of an acoustic guitar resonates strongly between 80 Hz and 120 Hz. Placing a mic directly in front of it captures excessive boomy low-end mud, whereas the 12th fret balances warm body resonance with articulate string transient detail."
    },
    {
        "q": "In multi-microphone drum recording, why is it critical that Left and Right spaced-pair overhead microphones are placed at an exact equal distance from the center of the snare drum?",
        "options": [
            "To ensure the snare drum arrives at both capsules simultaneously, keeping it phase-coherent and dead-center in the stereo image",
            "To prevent +48V phantom power from leaking into the dynamic snare microphone",
            "To boost the hi-hat volume by +12 dB",
            "To convert the overhead condenser microphones into ribbon transducers"
        ],
        "correct": 0,
        "expl": "If one overhead mic is closer to the snare than the other, the snare transient arrives earlier in one channel (Haas effect) and out of phase, pulling the snare off-center and causing hollow comb filtering when summed to mono."
    },
    {
        "q": "What is the primary electrical purpose of a Direct Injection (DI) box when recording an electric bass guitar or electric guitar in Component 1?",
        "options": [
            "To convert an unbalanced, high-impedance (Hi-Z) instrument signal into a balanced, low-impedance (Lo-Z) mic-level signal suitable for long XLR runs and mic preamps",
            "To amplify the guitar signal directly to 100 Watts to drive a 4x12 speaker cabinet",
            "To apply digital reverb and delay before the audio interface",
            "To convert analogue audio into 5-pin DIN MIDI data"
        ],
        "correct": 0,
        "expl": "Passive guitar/bass pickups have high output impedance (Hi-Z) and unbalanced connections prone to noise and high-frequency roll-off. A DI box transforms the signal to balanced low-impedance (Lo-Z) mic level via XLR while offering a parallel 'Thru' jack to feed an amplifier."
    },
    {
        "q": "According to the 3:1 Distance Rule, if Microphone A is placed 15 cm away from Guitar Amp A, what is the minimum distance Microphone B (recording Guitar Amp B in the same room) must be placed from Microphone A?",
        "options": [
            "5 cm",
            "15 cm",
            "45 cm (at least 3 times the source-to-mic distance)",
            "300 cm"
        ],
        "correct": 2,
        "expl": "The 3:1 rule states that the distance between adjacent microphones must be at least 3 times the distance from each microphone to its intended sound source (15 cm × 3 = 45 cm) to minimize acoustic phase comb filtering from off-axis bleed."
    },
    {
        "q": "When recording a vocalist with a cardioid large-diaphragm condenser microphone, where is the microphone's point of maximum acoustic rejection (null point), and why must acoustic treatment be placed behind the singer?",
        "options": [
            "The null point is at 180° (rear of the mic), which faces the room behind the mic; reflections bouncing off the wall behind the singer's head travel directly into the sensitive 0° front of the capsule",
            "The null point is at 0° directly in front of the singer's mouth",
            "Cardioid microphones pick up equally from all 360° directions",
            "Acoustic treatment behind the singer increases 50 Hz mains hum"
        ],
        "correct": 0,
        "expl": "A cardioid microphone is most sensitive at 0° (pointing at the singer and the wall behind the singer) and rejects sound at 180° (behind the microphone). Therefore, placing an acoustic absorber behind the vocalist prevents room reflections from entering the live front side of the capsule."
    },
    {
        "q": "What happens physically as a vocalist moves closer (within 5–10 cm) to a directional cardioid or figure-of-8 microphone capsule?",
        "options": [
            "Proximity effect: low-frequency bass response (100–250 Hz) increases progressively relative to mid and high frequencies",
            "All frequencies below 500 Hz are completely muted",
            "The microphone automatically switches to an omnidirectional polar pattern",
            "The sample rate doubles from 44.1 kHz to 88.2 kHz"
        ],
        "correct": 0,
        "expl": "Proximity effect occurs exclusively in pressure-gradient (directional) microphones: as the sound source moves very close to the diaphragm, phase pressure differences between the front and rear ports accentuate low frequencies."
    },
    {
        "q": "When setting up a Noise Gate on a rack tom track to eliminate hi-hat and cymbal spill, which parameter prevents the gate from rapidly opening and closing ('chattering') as the drum sustains near the threshold?",
        "options": [
            "Pan Law (-3 dB)",
            "Hold time & Hysteresis (setting the close threshold several dB lower than the open threshold)",
            "Sample rate bit-crushing",
            "Stereo Width 200%"
        ],
        "correct": 1,
        "expl": "Hold keeps the gate open for a fixed minimum duration after the transient, while Hysteresis sets a lower dB threshold for closing than opening—preventing decaying vibrations from triggering rapid open/close chattering."
    },
    {
        "q": "In the 'Abbey Road Reverb Trick' used on a Component 1 vocal auxiliary bus, how is the EQ configured on the reverb return channel?",
        "options": [
            "Boost +12 dB at 50 Hz and +12 dB at 15 kHz",
            "Apply a High-Pass Filter around 250–300 Hz and a Low-Pass Filter around 6–8 kHz so the reverb tail adds warm mid-range depth without low-end mud or high-frequency sibilance",
            "Mute the entire mid-range between 300 Hz and 5 kHz",
            "Set the reverb plugin to 0% Wet and 100% Dry"
        ],
        "correct": 1,
        "expl": "Filtering the auxiliary reverb return below ~250 Hz prevents booming mud on low notes, while rolling off above ~7 kHz stops 'S' and 'T' sibilants from clashing with the dry lead vocal."
    },
    {
        "q": "What are the mandatory export specifications for your final Component 1 stereo master file submission?",
        "options": [
            "128 kbps Mono MP3 file, 1:00 duration",
            "Uncompressed 16-bit / 44.1 kHz Stereo WAV (or AIFF) file, strictly between 2:00 and 3:30 duration, accompanied by a completed Pearson Component 1 Logbook",
            "32-bit / 192 kHz 5.1 Surround Sound Dolby Atmosstem pack",
            "MIDI file (.mid) only"
        ],
        "correct": 1,
        "expl": "Pearson Edexcel requires Component 1 coursework audio to be submitted as a standard Red Book resolution uncompressed 16-bit / 44.1 kHz stereo file (2:00–3:30) alongside the signed authentication and completed Logbook."
    }
]

c1_quiz_html = build_quiz_html(
    "Component 1: Recording & Mixing Quiz",
    "Component 1: Recording & Mixing (9MT0/01)",
    "NEA Coursework • 60 Marks",
    "#10b981",
    "rgba(16, 185, 129, 0.3)",
    c1_questions,
    "Need to Build Your Component 1 Logbook & Track Sheet?",
    "Unlock the interactive Component 1 Track Sheet Creator, Mic Placement Simulator, and 500+ Exam Questions inside the Music Tech Guru App."
)
with open("public/component-1-interactive-quiz.html", "w", encoding="utf-8") as f:
    f.write(c1_quiz_html)
print(f"Generated public/component-1-interactive-quiz.html ({len(c1_quiz_html):,} bytes)")

# 2. Component 2 Quiz Questions
c2_questions = [
    {
        "q": "What is the mandatory duration window for a Pearson Edexcel Component 2 (9MT0/02) Technology-Based Composition submission?",
        "options": [
            "1 minute 00 seconds to 2 minutes 00 seconds",
            "2 minutes 30 seconds to 3 minutes 30 seconds",
            "4 minutes 00 seconds to 6 minutes 00 seconds",
            "There is no duration limit"
        ],
        "correct": 1,
        "expl": "While Component 1 allows 2:00 to 3:30, Component 2 (9MT0/02) strictly requires a composition duration between 2 minutes 30 seconds (2:30) and 3 minutes 30 seconds (3:30)."
    },
    {
        "q": "In subtractive synthesis, which oscillator waveform contains ALL integer harmonics (1f, 2f, 3f, 4f...) with amplitudes falling at 1/n, making it ideal for rich brass, strings, and 'Reese' bass patches?",
        "options": [
            "Sine wave",
            "Triangle wave",
            "Sawtooth wave",
            "Pure DC offset"
        ],
        "correct": 2,
        "expl": "A Sawtooth wave contains both odd and even integer harmonics (1f, 2f, 3f, 4f...), providing the richest harmonic spectrum for subtractive low-pass filtering."
    },
    {
        "q": "How do you program a classic 'plucky' synthesized bass or arpeggio envelope using an ADSR Envelope routed to the Low-Pass Filter Cutoff?",
        "options": [
            "Slow Attack (1000ms), Maximum Sustain (100%), Long Release (3000ms)",
            "Fast Attack (0–5ms), Short-to-Medium Decay (150–300ms), Zero or Low Sustain (0–15%), Short Release (80–150ms)",
            "Bypass the filter completely and set Attack to 5 seconds",
            "Set Attack, Decay, Sustain, and Release all to 0%"
        ],
        "correct": 1,
        "expl": "A fast attack opens the filter immediately on note-on for a bright transient pluck, while a short decay drops the cutoff down to a low sustain level, creating a percussive, articulate envelope."
    },
    {
        "q": "What is the sonic difference between routing an LFO (Low Frequency Oscillator) to Oscillator Pitch versus routing the same LFO to Amplifier Level (VCA)?",
        "options": [
            "LFO -> Pitch creates Vibrato (periodic pitch modulation); LFO -> Amplifier creates Tremolo (periodic volume/amplitude modulation)",
            "LFO -> Pitch creates Tremolo; LFO -> Amplifier creates Vibrato",
            "Both routings produce identical white noise",
            "Routing an LFO to Pitch deletes all MIDI notes"
        ],
        "correct": 0,
        "expl": "Modulating oscillator pitch at sub-audio speeds (e.g. 5–6 Hz) creates Vibrato, whereas modulating amplifier gain (VCA) creates Tremolo."
    },
    {
        "q": "When creating a playable multi-sampled instrument in Quick Sampler or Sampler from an acoustic recording, why do you apply an equal-power Crossfade to the Loop Start/End points?",
        "options": [
            "To convert the audio file into a MIDI sequence",
            "To blend the end of the loop smoothly into the start of the loop at zero-crossings, eliminating audible clicks or pops when a chord is held indefinitely",
            "To increase the bit depth from 16-bit to 32-bit float",
            "To mute the left speaker channel"
        ],
        "correct": 1,
        "expl": "When a sampler loops a middle section of a sample to sustain a long note, any discontinuity in waveform amplitude or phase at the loop boundary causes a repetitive click. A loop crossfade smooths that transition seamlessly."
    },
    {
        "q": "In Logic Pro Flex Time, which algorithm links playback speed directly to pitch (like slowing down a vinyl turntable or analog tape reel) to create 'Tape Stop' transition effects?",
        "options": [
            "Slicing Mode",
            "Polyphonic Mode",
            "Speed (FX) Mode (or Slow Down fade-out)",
            "Monophonic Mode"
        ],
        "correct": 2,
        "expl": "Speed (FX) mode changes pitch proportionally with tempo/duration just like analog tape or vinyl, whereas Slicing, Monophonic, and Polyphonic modes preserve pitch while stretching time."
    },
    {
        "q": "Why does relying solely on unmodified stock DAW synth presets and pre-made Apple Loops result in low marks in Component 2?",
        "options": [
            "Because Logic Pro presets only work in mono",
            "Because Pearson's assessment criteria explicitly award marks for original synthesis patch creation from scratch, original creative sampling, and bespoke sound design",
            "Because presets increase the exported WAV file size above 10 GB",
            "Because stock synths cannot play notes below C3"
        ],
        "correct": 1,
        "expl": "Component 2 assesses your ability to manipulate music technology creatively. Examiners require evidence in your audio and Logbook that you initialized and programmed your own synth patches and recorded/manipulated your own samples."
    },
    {
        "q": "When programming MIDI drum patterns for Component 2, what combination of techniques transforms a rigid, robotic loop into an expressive, human-sounding groove?",
        "options": [
            "Setting every single note velocity to 127 and quantizing to 1/1 whole notes",
            "Programming low-velocity snare ghost notes (vel 25–45), varying hi-hat velocities across 16th notes, and applying subtle Q-Swing (54%–58%)",
            "Inserting a 20 Hz brickwall low-pass filter on the master output",
            "Deleting all kick drum notes on beat 1"
        ],
        "correct": 1,
        "expl": "Real drummers vary stick height and dynamics continuously. Combining accented backbeats with soft ghost notes, varied hi-hat velocities, and subtle swing creates authentic rhythmic feel."
    },
    {
        "q": "How is Sidechain Compression configured in Component 2 to keep a punchy kick drum cutting cleanly through dense synth bass and atmospheric pads?",
        "options": [
            "Insert a compressor on the Kick Drum and sidechain it to the Master Output",
            "Insert a compressor on the Synth Bass/Pad track, set its External Sidechain input to the Kick Drum, and use a fast attack (1–3ms) and fast/medium release (60–100ms) so the synth ducks 3–5 dB on every kick hit",
            "Pan the kick drum 100% Left and the synth bass 100% Right",
            "Boost 60 Hz by +15 dB on both the kick and synth pad"
        ],
        "correct": 1,
        "expl": "External sidechain compression triggers gain reduction on the synth bass/pad whenever the kick drum hits, carving momentary dynamic space in the low end without permanently lowering the bass fader."
    },
    {
        "q": "When composing to the Video/Film Set Brief in Component 2, what is the purpose of spotting SMPTE timecode markers before writing musical themes?",
        "options": [
            "To identify exact visual hit points, scene cuts, and emotional shifts so tempo maps, metre changes, and sonic impacts lock precisely to the moving image",
            "To compress the video resolution from 1080p to 144p",
            "To automatically generate the written Logbook PDF",
            "To mute all dialogue stems permanently"
        ],
        "correct": 0,
        "expl": "Spotting hit points in SMPTE timecode (Hours:Minutes:Seconds:Frames) allows the composer to align musical downbeats, tempo changes, risers, and Foley impacts accurately with visual events."
    }
]

c2_quiz_html = build_quiz_html(
    "Component 2: Synthesis & Composition Quiz",
    "Component 2: Technology-Based Composition (9MT0/02)",
    "NEA Coursework • 60 Marks",
    "#a855f7",
    "rgba(168, 85, 247, 0.3)",
    c2_questions,
    "Want to Master Synthesis, Sampling & Your Component 2 Logbook?",
    "Access the Interactive Synthesizer Lab, Sample Chopping Drills, and Component 2 Coursework Checklists inside the Music Tech Guru App."
)
with open("public/component-2-interactive-quiz.html", "w", encoding="utf-8") as f:
    f.write(c2_quiz_html)
print(f"Generated public/component-2-interactive-quiz.html ({len(c2_quiz_html):,} bytes)")

# 3. A-Level Main Hub 4-Component Diagnostic Quiz
diag_questions = [
    {
        "q": "[Component 1 • Recording] When miking a snare drum top and bottom simultaneously, why must you engage the polarity invert (Ø) switch on the bottom microphone?",
        "options": [
            "Because the drumhead moves away from one capsule while moving toward the other, causing 180° phase cancellation of low-mid body when summed",
            "Because dynamic microphones require +48V phantom power on the bottom head",
            "To double the sample rate of the snare channel",
            "To pan the snare drum hard left"
        ],
        "correct": 0,
        "expl": "Component 1 Core Skill: Top and bottom snare mics face opposite directions relative to drumhead motion, producing inverted waveforms that cancel low-end punch unless polarity (Ø) is flipped."
    },
    {
        "q": "[Component 1 • Mixing] What is the recommended nominal recording level in a 24-bit DAW project to preserve clean headroom for transient peaks?",
        "options": [
            "+6 dBFS above zero",
            "Around -18 dBFS RMS average, with transient peaks no higher than -6 dBFS",
            "Exactly 0.0 dBFS on every single track",
            "-90 dBFS near the noise floor"
        ],
        "correct": 1,
        "expl": "Component 1 Core Skill: -18 dBFS in 24-bit digital audio corresponds to 0 dBVU analogue sweet spot, leaving ~18 dB of clean headroom above average level so transients never clip."
    },
    {
        "q": "[Component 2 • Synthesis] Which synthesizer module shapes how a filter's cutoff frequency or an amplifier's volume evolves from the moment a MIDI key is pressed until it is released?",
        "options": [
            "The ADSR Envelope Generator (Attack, Decay, Sustain, Release)",
            "The Master Dither Generator",
            "The XLR Balanced Patchbay",
            "The SMPTE Timecode Reader"
        ],
        "correct": 0,
        "expl": "Component 2 Core Skill: The ADSR Envelope Generator triggers on every note-on event, shaping time-variant parameters like VCA volume or VCF cutoff frequency."
    },
    {
        "q": "[Component 2 • Sampling] What artifact occurs when a single vocal sample recorded at C3 is transposed up two octaves to C5 in a sampler without formant preservation?",
        "options": [
            "The playback duration doubles in length",
            "Vocal throat formants shift upward unnaturally, creating the shrill 'chipmunk' effect",
            "The audio converts to a pure 50 Hz sine wave",
            "The stereo image flips 180 degrees"
        ],
        "correct": 1,
        "expl": "Component 2 Core Skill: Standard pitch transposition speeds up the sample, shifting fixed vocal tract resonances (formants) upward and producing unnatural chipmunk timbres."
    },
    {
        "q": "[Component 3 • Eras & Context] What was the primary limitation of early 1960s 4-track tape recording (e.g., Abbey Road Studer J37) when bands needed to record more than 4 parts?",
        "options": [
            "Engineers had to 'bounce down' (reduction mix) 4 tracks onto 1 or 2 tracks of a second machine, causing cumulative generation tape hiss and high-frequency loss",
            "4-track tape machines could only record MIDI data, not audio",
            "Tape reels could only record for a maximum of 12 seconds",
            "Microphones had not been invented yet"
        ],
        "correct": 0,
        "expl": "Component 3 Core Skill: Bouncing (ping-ponging) tracks across 4-track machines locked in the sub-mix balance permanently and added a generation of analog tape hiss and HF roll-off."
    },
    {
        "q": "[Component 3 • Studio Effects] Which modulation effect splits the signal, delays one copy by a very short 1ms–10ms modulated time with feedback, and creates a dramatic 'jet plane' harmonic comb filter sweep?",
        "options": [
            "Spring Reverb",
            "Flanger (originally created by pressing a finger on the flange of an analog tape reel)",
            "Noise Gate",
            "High-Pass Filter"
        ],
        "correct": 1,
        "expl": "Component 3 Core Skill: Flanging uses a short 1–10ms modulated delay line with feedback, creating harmonically spaced comb-filter notches across the frequency spectrum."
    },
    {
        "q": "[Component 4 • Digital Audio] According to the Nyquist-Shannon Sampling Theorem, what is the highest audio frequency that can be accurately captured by a digital system running at a 44.1 kHz sample rate?",
        "options": [
            "44.1 kHz",
            "22.05 kHz (half the sample rate, known as the Nyquist frequency)",
            "88.2 kHz",
            "16 kHz"
        ],
        "correct": 1,
        "expl": "Component 4 Core Skill: The Nyquist frequency is half the sampling rate (44.1 kHz / 2 = 22.05 kHz). Frequencies above Nyquist must be removed by an anti-aliasing filter prior to A/D conversion."
    },
    {
        "q": "[Component 4 • Exam Mixing] Why do mastering engineers set a True Peak Limiter ceiling to -1.0 dBTP when bouncing a final stereo mixdown?",
        "options": [
            "To prevent inter-sample peak clipping when D/A converters and lossy streaming codecs (MP3/AAC) reconstruct the continuous analogue waveform",
            "To mute all frequencies above 10 kHz",
            "Because DAW faders cannot go below 0 dB",
            "To convert stereo tracks into mono"
        ],
        "correct": 0,
        "expl": "Component 4 Core Skill: Reconstructed continuous waveforms can overshoot between discrete digital samples (inter-sample peaks). A -1.0 dBTP ceiling guarantees zero clipping across all playback systems."
    }
]

diag_quiz_html = build_quiz_html(
    "A-Level Music Technology 4-Component Diagnostic Quiz",
    "Complete A-Level Specification Diagnostic (Components 1–4)",
    "Edexcel 9MT0 • Interactive Diagnostic",
    "#00C1F0",
    "rgba(0, 193, 240, 0.3)",
    diag_questions,
    "Ready to Unlock Your Full A* Revision Toolkit?",
    "Get instant access to all 4 Component Practice Suites, Interactive Synthesizer & EQ Labs, Coursework Track Sheet Creators, and 500+ Exam Questions for just £12.99/yr."
)
with open("public/a-level-diagnostic-quiz.html", "w", encoding="utf-8") as f:
    f.write(diag_quiz_html)
print(f"Generated public/a-level-diagnostic-quiz.html ({len(diag_quiz_html):,} bytes)")
