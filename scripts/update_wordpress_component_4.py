#!/usr/bin/env python3
"""
update_wordpress_component_4.py
Enriches WordPress Page ID 13245:
https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/

Includes:
- Hero header with dark studio theme & exam stats
- Master Interactive Split-Screen Deck Embed (10 slides)
- Component 4 Specification Assessment Quiz Embed (10 questions)
- Interactive Music Tech Web App Practice Suite (15 direct links to C4 modules & tools)
- Exam Breakdown & Core Skills Matrix (Q1–4 Practical, Q5 Mix, Q6 Essay)
- Logic Pro X starter tutorial card
- Curated Video Masterclass Lounge with MTG YouTube walkthroughs
- Official Exam Guidance Video Packs (WooCommerce Products)
- Fully base64-encoded [vc_raw_html] Visual Composer payload to prevent wpautop issues
"""

import urllib.request
import json
import base64
import re
import os

WP_PAGE_ID = 13245
WP_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

def generate_inner_html():
    return """
<style>
/* Scoped Dark Theme Reset & Utilities */
#mtg-c4-wrapper {
    background: #080e1a;
    color: #cbd5e1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.65;
    max-width: 1040px;
    margin: 0 auto;
    padding: 10px 0 60px 0;
}

#mtg-c4-wrapper * {
    box-sizing: border-box;
}

/* Card Hover Animations */
.c4-hover-card {
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
}
.c4-hover-card:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(0, 193, 240, 0.45) !important;
    box-shadow: 0 12px 30px rgba(0, 193, 240, 0.2) !important;
}

/* Web App Practice Module Button */
.c4-app-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px 18px;
    text-decoration: none !important;
    color: #cbd5e1 !important;
    transition: all 0.2s ease;
}
.c4-app-btn:hover {
    background: #1e293b;
    border-color: #00C1F0;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 193, 240, 0.25);
    color: #ffffff !important;
}
.c4-app-btn-title {
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
}
.c4-app-btn-desc {
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.45;
    margin-bottom: 12px;
}
.c4-app-btn-action {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 700;
    color: #00C1F0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* WooCommerce Product Grid Reset */
ul.product-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
    gap: 22px !important;
    list-style: none !important;
    padding: 0 !important;
    margin: 16px 0 30px 0 !important;
}
ul.product-grid > li.product {
    background: #0f172a !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
}
ul.product-grid > li.product:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 30px rgba(0, 193, 240, 0.25) !important;
    border-color: rgba(0, 193, 240, 0.5) !important;
}
</style>

<div id="mtg-c4-wrapper">

    <!-- 1. Hero Card -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-left: 6px solid #00C1F0; border-radius: 18px; padding: 36px 30px; margin-bottom: 32px; box-shadow: 0 15px 35px rgba(0,0,0,0.35);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div style="display: inline-block; background: rgba(0, 193, 240, 0.12); color: #00C1F0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(0, 193, 240, 0.3);">
                Edexcel A-Level Music Technology &bull; Paper Code: 9MT0/04
            </div>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/" style="color: #94a3b8; font-size: 12.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; font-weight: 600;">
                &larr; Back to A-Level Course Overview
            </a>
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(26px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Component 4: Production &amp; Analysing
        </h1>
        <p style="color: #cbd5e1; font-size: 15.5px; margin: 0 0 20px 0; line-height: 1.6; max-width: 880px;">
            The practical DAW examination for Edexcel A-Level Music Technology. Candidates are assessed on their hands-on audio production skills—audio editing, phase alignment, dynamic processing, surgical EQ unmasking, subtractive synthesis, sampling, and stereo mix balancing—alongside in-depth written critical analysis (AO3/AO4) of recording and acoustic scenarios.
        </p>

        <!-- Exam Stats Badges -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08);">
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 8px;">⏱️ 2 Hours 15 Minutes</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #00C1F0; font-size: 12px; font-weight: 800; padding: 5px 12px; border-radius: 8px;">💯 105 Total Marks</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 8px;">📊 40% of A-Level</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #34d399; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 8px;">🎧 Section A: 85 Marks (Practical DAW)</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #a855f7; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 8px;">📝 Section B: 20 Marks (Extended Essay)</span>
        </div>
    </div>

    <!-- 2. Master Interactive Deck Embed Section -->
    <div style="background: linear-gradient(135deg, #0b1120 0%, #0f172a 100%); border: 1px solid rgba(0, 193, 240, 0.3); border-radius: 18px; padding: 24px; margin-bottom: 36px; box-shadow: 0 18px 45px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="color: #00C1F0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Split-Screen Learning &bull; Master Slide Deck</span>
                <h3 style="color: #ffffff; font-size: 21px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                    Component 4: Interactive Syllabus Presentation
                </h3>
            </div>
            <a href="https://app.musictechguru.com/interactive-slide-component-4" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #00A3FF 0%, #0077EE 100%); color: #ffffff !important; text-decoration: none; font-size: 12.5px; font-weight: 800; padding: 10px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 163, 255, 0.35); display: inline-flex; align-items: center; gap: 6px;">
                <span>Open Full Screen Deck</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>
        
        <!-- Iframe with Screen-Fit Deck -->
        <div style="position: relative; width: 100%; height: 860px; border-radius: 12px; overflow: hidden; background: #030712; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
            <iframe id="iframe-c4-deck" src="https://app.musictechguru.com/interactive-slide-component-4" data-src="https://app.musictechguru.com/interactive-slide-component-4" style="width: 100%; height: 100%; border: 0; display: block;" title="Component 4 Interactive Slide Deck" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="eager" data-no-lazy="1" data-skip-lazy="1" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 12px; font-size: 12px; color: #64748b;">
            <div><span>Navigation:</span> Use on-screen arrows, keyboard <kbd style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px; color: #cbd5e1;">&larr;</kbd> <kbd style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px; color: #cbd5e1;">&rarr;</kbd>, or press <kbd style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px; color: #cbd5e1;">F</kbd> for Fullscreen mode.</div>
            <div style="color: #00C1F0; font-weight: 700;">10 In-Depth Production Slides &bull; 10 Audio/Video Case Studies &bull; Master AO3/AO4 Matrix</div>
        </div>
    </div>

    <!-- 3. Music Tech App Practice Suite (Loaded with Links) -->
    <div style="background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 18px; padding: 26px; margin-bottom: 36px; box-shadow: 0 18px 40px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 18px;">
            <div>
                <span style="color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Music Tech Web App &bull; Interactive Revision &amp; Mock Exams</span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                    Component 4 Interactive Practice Suite
                </h3>
                <p style="color: #94a3b8; font-size: 13.5px; margin: 4px 0 0 0;">
                    Jump directly into hands-on practical DAW modules, interactive signal flow challenges, and full mock exams on the Music Tech Guru Web App.
                </p>
            </div>
            <a href="https://app.musictechguru.com/" target="_blank" rel="noopener" style="background: #9333ea; color: #ffffff !important; text-decoration: none; font-size: 12.5px; font-weight: 800; padding: 10px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4); display: inline-flex; align-items: center; gap: 6px;">
                <span>Open MTG Web App</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>

        <!-- Section: Mock Exams -->
        <h4 style="color: #e9d5ff; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 10px 0; display: flex; align-items: center; gap: 6px;">
            <span>📋</span> Component 4 Practice Mock Exams
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 22px;">
            <a href="https://app.musictechguru.com/?quiz=c4_edm" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">🎚️ Practice Exam: EDM &amp; Electronic Production</div>
                    <div class="c4-app-btn-desc">Full 105-mark timed mock exam paper covering sidechain pumping, synthesizer modulation, drum quantization, and stereo widening.</div>
                </div>
                <div class="c4-app-btn-action">Launch EDM Mock Exam &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=c4_template" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">🎸 Practice Exam: Rock &amp; Acoustic Production</div>
                    <div class="c4-app-btn-desc">Comprehensive mock exam analyzing multi-mic drum phase alignment, guitar amp DI phase cancellation, vocal compression, and room acoustics.</div>
                </div>
                <div class="c4-app-btn-action">Launch Rock Mock Exam &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=c4_spop" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">🎹 Practice Exam: Synth Pop Production</div>
                    <div class="c4-app-btn-desc">Vintage drum machine sequencing, gated snare reverb, chorus modulation routing, and subtractive synth patch recreation.</div>
                </div>
                <div class="c4-app-btn-action">Launch Synth Pop Exam &rarr;</div>
            </a>
        </div>

        <!-- Section: Practical DAW Modules (Stage 3 Existing Interactive Tasks) -->
        <h4 style="color: #e9d5ff; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 10px 0; display: flex; align-items: center; gap: 6px;">
            <span>🎧</span> Stage 3: Interactive Practical Tasks &amp; DAW Challenges
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 22px;">
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-46" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 27: Phase Alignment &amp; Polarities</div>
                    <div class="c4-app-btn-desc">Calibrate nominal -18 dBFS levels, diagnose multi-mic drum polarities (180° flip), and eliminate destructive comb filtering.</div>
                </div>
                <div class="c4-app-btn-action">Launch Phase &amp; Polarity Quiz &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-36" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 17: EDM Production Techniques</div>
                    <div class="c4-app-btn-desc">Configure sidechain compression key inputs, threshold and ratio pumping, and dynamic space between kick and sub-bass.</div>
                </div>
                <div class="c4-app-btn-action">Launch EDM Production Quiz &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-45" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 26: Frequency Spectrum &amp; EQ Pocketing</div>
                    <div class="c4-app-btn-desc">Surgical Q-factor carving, complementary frequency unmasking between kick and bass, and sweeping to notch harsh resonances.</div>
                </div>
                <div class="c4-app-btn-action">Launch EQ Pocketing Quiz &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-34" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 15: Synthesizer Fundamentals</div>
                    <div class="c4-app-btn-desc">Interactive virtual synth: shape oscillators, adjust 24dB ladder filter cutoff, dial resonance (Q), and assign LFO routing.</div>
                </div>
                <div class="c4-app-btn-action">Launch Interactive Synth &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-39" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 20: Sample Editing &amp; Chopping</div>
                    <div class="c4-app-btn-desc">Interactive waveform editor: zoom to zero-crossings, slice drum loops, configure MIDI keyzones, and apply crossfades.</div>
                </div>
                <div class="c4-app-btn-action">Launch Sample Chopper &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-35" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 16: Audio Effects Processing</div>
                    <div class="c4-app-btn-desc">Interactive rack challenge: route modulation, delays, reverbs, and serial/parallel dynamics in the correct signal chain order.</div>
                </div>
                <div class="c4-app-btn-action">Launch Effects Chain Rack &rarr;</div>
            </a>
        </div>

        <!-- Section: Interactive Diagnostic Tools & Studio Quizzes -->
        <h4 style="color: #e9d5ff; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 10px 0; display: flex; align-items: center; gap: 6px;">
            <span>⚡</span> Stage 3: Signal Flow &amp; Studio Diagnostic Quizzes
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-21" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 2: Signal Flow Challenge</div>
                    <div class="c4-app-btn-desc">Trace audio signal flow across preamps, inserts, aux sends, submix groups, and master bus converters.</div>
                </div>
                <div class="c4-app-btn-action">Play Signal Flow Quiz &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-24" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 5: EQ Parameter Mastery</div>
                    <div class="c4-app-btn-desc">Interactive ear-training identifying frequency bands, filter slope dB/octave attenuation, and resonant Q peaks.</div>
                </div>
                <div class="c4-app-btn-action">Play EQ Challenge &rarr;</div>
            </a>
            <a href="https://app.musictechguru.com/?quiz=quiz-topic-33" target="_blank" rel="noopener" class="c4-app-btn">
                <div>
                    <div class="c4-app-btn-title">Practical Quiz 14: Advanced Microphone Placement</div>
                    <div class="c4-app-btn-desc">Interactive visual positioning: place cardioid, omni, and figure-8 mics on drum kits, guitar cabinets, and vocalists.</div>
                </div>
                <div class="c4-app-btn-action">Play Mic Placement Quiz &rarr;</div>
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/" class="c4-app-btn" style="border-color: rgba(56, 189, 248, 0.4);">
                <div>
                    <div class="c4-app-btn-title">📖 Official Music Tech Dictionary &amp; Signal Diagrams</div>
                    <div class="c4-app-btn-desc">364+ examiner-verified definitions, visual signal-flow diagrams, and hardware guides directly mapped to Component 4 exam questions.</div>
                </div>
                <div class="c4-app-btn-action">Browse Complete Glossary &rarr;</div>
            </a>
        </div>
    </div>

    <!-- 4. Interactive Quiz Assessment Section -->
    <div style="background: linear-gradient(135deg, #0b1120 0%, #111827 100%); border: 1px solid rgba(0, 193, 240, 0.3); border-radius: 18px; padding: 24px; margin-bottom: 36px; box-shadow: 0 18px 40px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="color: #00C1F0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Exam-Standard Knowledge Check &bull; 10 Questions</span>
                <h3 style="color: #ffffff; font-size: 21px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                    Component 4: Specification Assessment Quiz
                </h3>
                <p style="color: #94a3b8; font-size: 13.5px; margin: 4px 0 0 0;">
                    Instant score feedback, audio circuit explanations, parameter calculations, and Pearson Edexcel Component 4 exam scoring.
                </p>
            </div>
            <a href="https://app.musictechguru.com/component-4-interactive-quiz" target="_blank" rel="noopener" style="background: #00A3FF; color: #ffffff !important; text-decoration: none; font-size: 12.5px; font-weight: 800; padding: 9px 18px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 163, 255, 0.35); display: inline-flex; align-items: center; gap: 6px;">
                <span>Open Quiz Fullscreen</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>
        
        <div style="position: relative; width: 100%; height: 780px; border-radius: 12px; overflow: hidden; background: #030712; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
            <iframe id="iframe-c4-quiz" src="https://app.musictechguru.com/component-4-interactive-quiz" data-src="https://app.musictechguru.com/component-4-interactive-quiz" style="width: 100%; height: 100%; border: 0; display: block;" title="Component 4 Interactive Quiz" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="eager" data-no-lazy="1" data-skip-lazy="1" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    </div>

    <!-- 5. Exam Breakdown & Structure -->
    <div style="margin-bottom: 36px;">
        <h3 style="font-size: 20px; font-weight: 700; color: #ffffff !important; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(255,255,255,0.1);">
            Exam Breakdown &amp; Structure
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" class="c4-hover-card">
                <span style="font-size: 11px; font-weight: 800; color: #00C1F0; background: rgba(0, 193, 240, 0.15); padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">Questions 1–4 &bull; Section A</span>
                <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #ffffff !important; font-weight: 800;">Practical Application</h4>
                <p style="margin: 0; font-size: 13.5px; color: #94a3b8; line-height: 1.6;">Setting up equipment, non-destructive waveform edits, phase alignment, flex timing correction, subtractive synthesis sound design, sampler mapping, pitch correction, and surgical filtering.</p>
            </div>
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" class="c4-hover-card">
                <span style="font-size: 11px; font-weight: 800; color: #00C1F0; background: rgba(0, 193, 240, 0.15); padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">Question 5 &bull; Section A</span>
                <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #ffffff !important; font-weight: 800;">Mixdown &amp; Balance</h4>
                <p style="margin: 0; font-size: 13.5px; color: #94a3b8; line-height: 1.6;">Applying corrective and creative processing (complementary subtractive EQ, dynamic compression, auxiliary spatial sends, automation) to produce a cohesive, balanced, and broadcast-ready final stereo mix.</p>
            </div>
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" class="c4-hover-card">
                <span style="font-size: 11px; font-weight: 800; color: #00C1F0; background: rgba(0, 193, 240, 0.15); padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">Question 6 &bull; Section B</span>
                <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #ffffff !important; font-weight: 800;">Extended Technical Essay (20m)</h4>
                <p style="margin: 0; font-size: 13.5px; color: #94a3b8; line-height: 1.6;">An extended open-response essay comparing contrasting recording environments, analogue hardware vs digital in-the-box signal paths, or acoustic treatment vs DSP correction under Pearson AO3/AO4 criteria.</p>
            </div>
        </div>
    </div>

    <!-- 6. Key Skills Banner -->
    <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(0, 193, 240, 0.25); border-left: 4px solid #00C1F0; border-radius: 0 12px 12px 0; padding: 20px 24px; margin-bottom: 34px;">
        <p style="margin: 0 0 12px 0; font-size: 14px; color: #e2e8f0; line-height: 1.65;">
            <strong style="color: #00C1F0;">Aural Discrimination &amp; Diagram Analysis:</strong> Candidates will need to use aural discrimination to identify and evaluate music technology elements and make informed decisions by analysing data, circuit schematics, spectrograms, and transfer curves.
        </p>
        <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.65;">
            <strong style="color: #00C1F0;">Technical Numeracy &amp; Terminology:</strong> The exam requires applying technical numeracy—calculating delay times ($ms = 60000 / BPM$), Q-factor bandwidths ($Q = f_0 / BW$), filter slopes ($dB/oct$), decibel ratios, and true peak headroom ($dBTP$) within the context of music technology production.
        </p>
    </div>

    <!-- 7. Free Logic Pro Tutorial Card -->
    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 14px; padding: 24px 28px; margin-bottom: 36px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
        <div style="flex: 1 1 320px;">
            <div style="display: inline-block; background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 4px; margin-bottom: 8px;">
                Starter Tutorial &bull; Free Resource
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 18px; color: #ffffff !important; font-weight: 800;">Logic Pro X: Sequencing &amp; Arrangement Basics</h4>
            <p style="margin: 0; font-size: 13.5px; color: #cbd5e1; line-height: 1.55;">Get a firm grip on Logic Pro X workflow from the start. Download and open the project ZIP file and follow the step-by-step instructions in the companion PDF and Video.</p>
        </div>
        <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/sequencing-101-arrange-shape-of-you-on-logic-pro-x/" style="display: inline-block; background: #10b981; color: #ffffff !important; font-weight: 800; font-size: 13.5px; padding: 12px 24px; border-radius: 8px; text-decoration: none; white-space: nowrap; transition: background 0.2s; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            Access Starter Tutorial &rarr;
        </a>
    </div>

    <!-- 8. Curated Video Masterclass Lounge -->
    <div style="margin-bottom: 40px;">
        <div style="margin-bottom: 18px;">
            <span style="color: #00C1F0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Video Masterclasses &bull; Past Paper Guidance</span>
            <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                Production Techniques &amp; Exam Video Guidance
            </h3>
            <p style="font-size: 14px; color: #94a3b8; margin: 6px 0 0 0; line-height: 1.6;">
                Watch official Music Tech Guru walkthroughs and tutorials breaking down Component 4 practical exam workflows, timing corrections, and scoring strategies:
            </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px;">
            <!-- Video 1 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/eI4k12bQGyY?rel=0" title="How to Score FULL MARKS in Component 4" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Masterclass Strategy</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">How to Score FULL MARKS in Component 4</h5>
                </div>
            </div>

            <!-- Video 2 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/vejjQ0Lurrk?rel=0" title="How to Ace the 2022 Edexcel Music Tech Component 4 Exam" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Exam Paper Guidance</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">How to Ace the Component 4 Exam Paper</h5>
                </div>
            </div>

            <!-- Video 3 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/6Tb2auJ52xI?rel=0" title="Creative Audio Manipulation for Component 4" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Practical Audio Editing</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">Creative Audio Manipulation for Component 4</h5>
                </div>
            </div>

            <!-- Video 4 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/MZb-bW6z5wI?rel=0" title="2019 Production &amp; Analysing Exam Guidance" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Past Paper Walkthrough</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">2019 Production &amp; Analysing Exam (Q1)</h5>
                </div>
            </div>

            <!-- Video 5 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/HscjlESnmsE?rel=0" title="2020 Music Technology Exam Tutorial" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Past Paper Walkthrough</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">2020 Music Technology Exam Tutorial Paper</h5>
                </div>
            </div>

            <!-- Video 6 -->
            <div style="background: #0f172a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);" class="c4-hover-card">
                <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000;">
                    <iframe src="https://www.youtube-nocookie.com/embed/BNQIKRvOi9c?rel=0" title="Basic Mastering on Logic Pro X" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
                <div style="padding: 14px 16px;">
                    <span style="color: #00C1F0; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Mastering &amp; Mixdown</span>
                    <h5 style="margin: 4px 0 0 0; color: #ffffff !important; font-size: 14.5px; font-weight: 700;">Basic Mastering on Logic Pro X (Walkthrough)</h5>
                </div>
            </div>
        </div>

        <p style="margin-top: 18px; font-size: 13.5px; color: #94a3b8;">
            Complete past paper video packs and model projects are available in the <a href="https://www.musictechguru.com/shop/" style="color: #00C1F0; font-weight: 700;">MTG SHOP</a>.
        </p>
    </div>

    <!-- 9. Official Exam Guidance Study Guides Header -->
    <div style="margin-bottom: 12px;">
        <h3 style="font-size: 20px; font-weight: 700; color: #ffffff !important; margin: 0 0 8px 0; padding-bottom: 8px; border-bottom: 2px solid rgba(255,255,255,0.1);">
            Official Exam Guidance Guides &amp; Video Packs
        </h3>
    </div>

</div>
"""

def generate_full_post_content():
    inner_html = generate_inner_html()
    b64_inner = base64.b64encode(inner_html.encode("utf-8")).decode("utf-8")
    
    # We preserve the WooCommerce products block exactly as it existed on the original page
    woocommerce_block = """[vc_row][vc_column]<div class="woocommerce columns-3 "><ul class="product-grid columns-3">
<li class="product type-product post-13244 status-publish first instock product_cat-uncategorized has-post-thumbnail sale downloadable shipping-taxable purchasable product-type-simple">
			<div class="content__product">
						<div class="product_thumb">
				
	<span class="onsale">Sale!</span>
	<img decoding="async" width="300" height="300" src="https://www.musictechguru.com/wp-content/uploads/2017/10/Component-4-300x300.png" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Component 4 Edexcel Music Technology" /><div class="quick-view" data-prod="13244"><a href="javascript:;"><i class="edu-eye"></i></a></div>				<a href="https://www.musictechguru.com/product/guidance-video-edexcel-music-technology-c4-production-analysing-exam-sample-paper/" class="link-images-product"></a>
			</div>
			<div class="product__title">
				<a href="https://www.musictechguru.com/product/guidance-video-edexcel-music-technology-c4-production-analysing-exam-sample-paper/" class="title">
					Guidance Video &#8211; Edexcel Music Technology C4 Production &#038; Analysing Exam Sample Paper				</a>

				<div class="block-after-title">
					
	<span class="price"><del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>25.00</bdi></span></del> <span class="screen-reader-text">Original price was: &pound;25.00.</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>9.49</bdi></span></ins><span class="screen-reader-text">Current price is: &pound;9.49.</span></span>
				</div>
				<div class="description">
					<p>This guidance video covers techniques and advice for effectively tackling the Music Technology Production &amp; Analysing Exam sample paper.  For Music Tech students, this is useful when you are&#8230;</p>
				</div>
				</a><a href="/wp-json/wp/v2/pages?slug=component-4-production-analysing&#038;add-to-cart=13244" aria-describedby="woocommerce_loop_add_to_cart_link_describedby_13244" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="13244" data-product_sku="" aria-label="Add to cart: &ldquo;Guidance Video - Edexcel Music Technology C4 Production &amp; Analysing Exam Sample Paper&rdquo;" rel="nofollow" data-success_message="&ldquo;Guidance Video - Edexcel Music Technology C4 Production &amp; Analysing Exam Sample Paper&rdquo; has been added to your cart" role="button">Add to cart</a>	<span id="woocommerce_loop_add_to_cart_link_describedby_13244" class="screen-reader-text">
			</span>
			</div>
		</div>
	</li>
<li class="product type-product post-296811 status-publish instock product_cat-recreation-tutorials product_tag-67649 product_tag-analysing product_tag-component-4 product_tag-exam product_tag-music-technology product_tag-producing has-post-thumbnail sale downloadable shipping-taxable purchasable product-type-simple">
			<div class="content__product">
						<div class="product_thumb">
				
	<span class="onsale">Sale!</span>
	<img decoding="async" width="300" height="300" src="https://www.musictechguru.com/wp-content/uploads/2022/12/How-to-pass-C4-exam-TK-2-3-300x300.png" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="How to pass C4 exam TK 2 3" /><div class="quick-view" data-prod="296811"><a href="javascript:;"><i class="edu-eye"></i></a></div>				<a href="https://www.musictechguru.com/product/how-to-pass-the-2019-music-technology-exam-component-4/" class="link-images-product"></a>
			</div>
			<div class="product__title">
				<a href="https://www.musictechguru.com/product/how-to-pass-the-2019-music-technology-exam-component-4/" class="title">
					Guidance Video &#8211; How to pass the 2019 Music Technology Exam Component 4				</a>

				<div class="block-after-title">
					
	<span class="price"><del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>50.00</bdi></span></del> <span class="screen-reader-text">Original price was: &pound;50.00.</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>9.49</bdi></span></ins><span class="screen-reader-text">Current price is: &pound;9.49.</span></span>
				</div>
				<div class="description">
					<p>Ace Your Music Technology Exam with Ease!</p>
<p>Get Instant Access to Our Comprehensive Study Guide and Boost Your Confidence for the 2019 Music Technology Exam Component 4.</p>
<p>Expertly Designed to Cover&#8230;</p>
				</div>
				</a><a href="/wp-json/wp/v2/pages?slug=component-4-production-analysing&#038;add-to-cart=296811" aria-describedby="woocommerce_loop_add_to_cart_link_describedby_296811" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="296811" data-product_sku="" aria-label="Add to cart: &ldquo;Guidance Video - How to pass the 2019 Music Technology Exam Component 4&rdquo;" rel="nofollow" data-success_message="&ldquo;Guidance Video - How to pass the 2019 Music Technology Exam Component 4&rdquo; has been added to your cart" role="button">Add to cart</a>	<span id="woocommerce_loop_add_to_cart_link_describedby_296811" class="screen-reader-text">
			</span>
			</div>
		</div>
	</li>
<li class="product type-product post-296969 status-publish last instock product_cat-recreation-tutorials product_tag-67655 product_tag-analysing product_tag-component-4 product_tag-edexcel product_tag-exam product_tag-music-technology product_tag-producing product_tag-tutorial has-post-thumbnail sale downloadable shipping-taxable purchasable product-type-simple">
			<div class="content__product">
						<div class="product_thumb">
				
	<span class="onsale">Sale!</span>
	<img decoding="async" width="300" height="300" src="https://www.musictechguru.com/wp-content/uploads/2023/04/2020-How-to-pass-C4-exam-TK-2-300x300.png" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="2020 How to pass C4 exam TK 2" /><div class="quick-view" data-prod="296969"><a href="javascript:;"><i class="edu-eye"></i></a></div>				<a href="https://www.musictechguru.com/product/guidance-video-how-to-pass-the-2020-music-technology-exam-component-4/" class="link-images-product"></a>
			</div>
			<div class="product__title">
				<a href="https://www.musictechguru.com/product/guidance-video-how-to-pass-the-2020-music-technology-exam-component-4/" class="title">
					Guidance Video &#8211; How to pass the 2020 Music Technology Exam Component 4				</a>

				<div class="block-after-title">
					
	<span class="price"><del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>50.00</bdi></span></del> <span class="screen-reader-text">Original price was: &pound;50.00.</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&pound;</span>9.49</bdi></span></ins><span class="screen-reader-text">Current price is: &pound;9.49.</span></span>
				</div>
				<div class="description">
					<p>Ace Your Music Technology Exam with Ease!</p>
<p>Get Instant Access to Our Comprehensive Study Guide and Boost Your Confidence for the 2020 Music Technology Exam Component 4.</p>
<p>Expertly Designed to Cover&#8230;</p>
				</div>
				</a><a href="/wp-json/wp/v2/pages?slug=component-4-production-analysing&#038;add-to-cart=296969" aria-describedby="woocommerce_loop_add_to_cart_link_describedby_296969" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="296969" data-product_sku="" aria-label="Add to cart: &ldquo;Guidance Video - How to pass the 2020 Music Technology Exam Component 4&rdquo;" rel="nofollow" data-success_message="&ldquo;Guidance Video - How to pass the 2020 Music Technology Exam Component 4&rdquo; has been added to your cart" role="button">Add to cart</a>	<span id="woocommerce_loop_add_to_cart_link_describedby_296969" class="screen-reader-text">
			</span>
			</div>
		</div>
	</li>
</ul>
</div>[/vc_column][/vc_row]"""

    full_payload = f"[vc_row][vc_column][vc_raw_html]{b64_inner}[/vc_raw_html][/vc_column][/vc_row]\n{woocommerce_block}"
    return full_payload

def update_wordpress():
    print(f"Preparing payload for WordPress Page {WP_PAGE_ID}...")
    content = generate_full_post_content()
    
    # Save a backup copy locally
    with open("scripts/component_4_final_payload.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Saved local payload to scripts/component_4_final_payload.html")

    payload_data = json.dumps({
        "content": content
    }).encode("utf-8")

    req = urllib.request.Request(
        WP_URL,
        data=payload_data,
        headers=headers,
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"\nSUCCESS: WordPress Page {WP_PAGE_ID} successfully updated!")
            print(f"Page Title: {data.get('title', {}).get('rendered')}")
            print(f"Page Link: {data.get('link')}")
            return True
    except Exception as e:
        print(f"\nERROR updating Page {WP_PAGE_ID}: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))
        return False

if __name__ == "__main__":
    update_wordpress()
