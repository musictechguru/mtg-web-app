#!/usr/bin/env python3
import urllib.request
import json
import base64
import os

WP_URL = "https://www.musictechguru.com/wp-json/wp/v2"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

AMBER = "#fbbf24"
ORANGE = "#f97316"
CYAN = "#38bdf8"
CARD = "#0f172a"
BG = "#080e1a"

def video_card(vid_id, title, subtitle):
    return f'''
    <div style="background: #111827; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
            <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/{vid_id}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
            <strong style="color: #ffffff; font-size: 13.5px;">{title}</strong>
            <span style="color: {AMBER}; font-size: 11px; font-weight: 700; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); padding: 2px 8px; border-radius: 6px;">{subtitle}</span>
        </div>
    </div>
    '''

def resource_card(tag, color, title, desc, link, link_text):
    return f'''
    <div style="background: {CARD}; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span style="color: {color}; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 8px;">{tag}</span>
            <h4 style="color: #ffffff; font-size: 15px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.35;">{title}</h4>
            <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.55; margin: 0 0 16px 0;">{desc}</p>
        </div>
        <a href="{link}" target="_blank" rel="noopener" style="color: {color}; text-decoration: none; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">{link_text} &rarr;</a>
    </div>
    '''

def build_amplifiers_html():
    return f'''
<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #1e1b2e 0%, #111827 50%, #0c1220 100%); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: {AMBER}; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Instrumental Technology &bull; Edexcel Component 3
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2;">
            Guitar &amp; Bass Amplifiers <span style="color: {AMBER}; font-size: 0.85em;">&amp; Valve Tone</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 820px;">
            Preamp gain stages, power amp saturation, vacuum tube technologies (12AX7, EL34, 6L6), output transformer impedance matching, open vs. closed-back speaker cabinets, and studio close-mic placement techniques.
        </p>
    </div>

    <!-- 2. FOUR SPECIFICATION PILLARS -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 40px;">
        <div style="background: {CARD}; border-radius: 14px; padding: 20px; border-left: 4px solid {AMBER}; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
            <span style="color: {AMBER}; font-size: 11px; font-weight: 800; text-transform: uppercase;">01 &bull; Two-Stage Topology</span>
            <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Preamp vs. Power Amp</strong>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Preamp boosts millivolt guitar signals to line level, controlling harmonic bite and sustain without scaling volume. Power amp push-pull valves deliver massive current to drive speakers, generating transformer saturation and dynamic sag.</p>
        </div>
        <div style="background: {CARD}; border-radius: 14px; padding: 20px; border-left: 4px solid {ORANGE}; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
            <span style="color: {ORANGE}; font-size: 11px; font-weight: 800; text-transform: uppercase;">02 &bull; Vacuum Tubes / Valves</span>
            <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Even-Order Harmonics</strong>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Tubes (12AX7 dual-triodes, EL34/6L6 pentodes) clip softly when driven, generating musical even-order harmonics (2nd, 4th partials), touch-sensitive compression, and warm sustain compared to harsh transistor square waves.</p>
        </div>
        <div style="background: {CARD}; border-radius: 14px; padding: 20px; border-left: 4px solid {CYAN}; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
            <span style="color: {CYAN}; font-size: 11px; font-weight: 800; text-transform: uppercase;">03 &bull; Cabinet Enclosures</span>
            <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Open vs. Closed-Back</strong>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Open-back combos (Fender Twin, Vox AC30) radiate 360&deg; sound with airy presence, but suffer low-end phase cancellation. Closed-back 4&times;12 cabinets (Marshall 1960A) eliminate cancellation, delivering tight directional palm-mute punch.</p>
        </div>
        <div style="background: {CARD}; border-radius: 14px; padding: 20px; border-left: 4px solid #22c55e; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
            <span style="color: #22c55e; font-size: 11px; font-weight: 800; text-transform: uppercase;">04 &bull; Studio Micing &amp; Bass DI</span>
            <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Cap vs. Edge &amp; DI Blend</strong>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Dynamic mic (Shure SM57) on the center dust cap captures aggressive high bite; cap edge balances warmth and cut. Bass tracking splits signal into a clean active DI (30Hz&ndash;100Hz sub) and mic'd tube cabinet (mid growl), phase-aligned in DAW.</p>
        </div>
    </div>

    <!-- 3. INTERACTIVE SLIDE PRESENTATION DECK EMBED -->
    <div style="background: {CARD}; border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 18px; padding: 28px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: {AMBER}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 2px;">Interactive Learning Deck</span>
                <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0;">Guitar &amp; Bass Amplifiers &bull; Master Curriculum Deck</h3>
            </div>
            <a href="https://app.musictechguru.com/interactive-slide-amplifiers" target="_blank" rel="noopener" style="background: rgba(245, 158, 11, 0.15); color: {AMBER}; border: 1px solid rgba(245, 158, 11, 0.35); text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <span>&#x26F6;</span> Open Fullscreen Deck
            </a>
        </div>
        <p style="color: #94a3b8; font-size: 13.5px; margin: 0 0 16px 0;">15 comprehensive specification slides with high-resolution vector schematics, vacuum tube anatomy, harmonic clipping waveforms, and zero-history embedded video players.</p>
        <div style="position: relative; width: 100%; height: 680px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: #000;">
            <iframe src="https://app.musictechguru.com/interactive-slide-amplifiers" style="width: 100%; height: 100%; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 4. SPECIFICATION INTERACTIVE QUIZ EMBED -->
    <div style="background: {CARD}; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 18px; padding: 28px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: {CYAN}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 2px;">Component 3 Knowledge Check</span>
                <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0;">Amplifiers &amp; Valve Tone &bull; Specification Quiz</h3>
            </div>
            <a href="https://app.musictechguru.com/amplifiers-interactive-quiz" target="_blank" rel="noopener" style="background: rgba(56, 189, 248, 0.15); color: {CYAN}; border: 1px solid rgba(56, 189, 248, 0.35); text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <span>&#x26F6;</span> Open Standalone Quiz
            </a>
        </div>
        <p style="color: #94a3b8; font-size: 13.5px; margin: 0 0 16px 0;">10 authentic Edexcel-style examination questions covering preamp voltage gain, power valve types, output transformer impedance matching, no-load hazards, and cabinet acoustics.</p>
        <div style="position: relative; width: 100%; height: 640px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: #000;">
            <iframe src="https://app.musictechguru.com/amplifiers-interactive-quiz" style="width: 100%; height: 100%; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 5. CURATED VIDEO LISTENING LOUNGE -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Video Listening Lounge &amp; Demonstrations</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            {video_card("_170IlG9iic", "Valve Circuits Explained", "Preamp Gain vs. Power Amp Overdrive")}
            {video_card("nA_tgIygvNo", "Thermionic Valves", "Electron Flow &amp; Triode Physics")}
            {video_card("SHhrZgojY1Q", "The Who &bull; Won't Get Fooled Again", "Pete Townshend Marshall 100W Stack")}
            {video_card("_PVjcIO4MT4", "Jimi Hendrix &bull; Foxey Lady (1968)", "Super Lead Controlled Feedback")}
            {video_card("1w7OgIMMRc4", "Guns N' Roses &bull; Sweet Child O' Mine", "Slash JCM800 2203 Master Volume Tone")}
            {video_card("pAgnJDJN4VA", "AC/DC &bull; Back In Black", "Marshall JTM45 Power Tube Crunch")}
        </div>
    </div>

    <!-- 6. GUIDED EXAM HOMEWORK & REVISION PACK (3 GUIDED ASSIGNMENTS + PDF BUTTON) -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Guided Exam Homework &amp; Comprehensive Study Pack</span>
                <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
            </div>
            <a href="https://app.musictechguru.com/downloads/homework/homework-amplifiers.html" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%); color: #080e1a; padding: 7px 16px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(245,158,11,0.35);">
                📥 Open / Print PDF Homework Pack
            </a>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Three classroom-ready exam practice tasks, mark schemes, and technical listening exercises aligned directly with the Edexcel Component 3 Question 5 specification.</p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {resource_card("Guided Assignment 1", AMBER, "HW 1: Impedance Matching &amp; No-Load Hazards (4 Marks)", "Explain why output valves require a step-down magnetic transformer to drive 4Ω/8Ω/16Ω voice coils. Detail the inductive flyback voltage spikes (>2,500V) that occur if powered without a load.", "https://app.musictechguru.com/downloads/homework/homework-amplifiers.html", "Explore Assignment 1")}
            {resource_card("Guided Assignment 2", ORANGE, "HW 2: Harmonic Distortion &amp; Cabinet Physics (6 Marks)", "Contrast valve soft clipping (even-order harmonics) with transistor hard clipping (odd-order harmonics). Explain low-frequency phase cancellation in open-back combos vs. sealed 4×12s.", "https://app.musictechguru.com/downloads/homework/homework-amplifiers.html", "Explore Assignment 2")}
            {resource_card("Guided Assignment 3", CYAN, "HW 3: High-Gain Evolution &amp; Studio Micing (10 Marks)", "Evaluate how the transition to Master Volume amplifiers, speaker cone topography (dust cap vs. edge micing), and the parallel bass DI blend transformed 1970s and 1980s rock production.", "https://app.musictechguru.com/downloads/homework/homework-amplifiers.html", "Explore Assignment 3")}
        </div>
    </div>

    <!-- 7. FEATURED COMPONENT 2 COURSEWORK CALLOUT -->
    <div style="margin-bottom: 45px; background: linear-gradient(135deg, #1e1b38 0%, {CARD} 100%); border: 1px solid rgba(245,158,11,0.3); border-radius: 18px; padding: 28px; box-shadow: 0 12px 35px rgba(0,0,0,0.4);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: center;">
            <div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2017/10/Component-2.png" alt="Component 2 Sequencing, Sampling &amp; Synthesis" style="width: 100%; height: auto; display: block; border-radius: 12px;">
                </div>
            </div>
            <div>
                <span style="background: rgba(245,158,11,0.15); color: {AMBER}; border: 1px solid rgba(245,158,11,0.3); font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">
                    Component 2 NEA Audio Programming
                </span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 10px 0 8px 0; line-height: 1.25;">
                    Mastering Amp Simulation &amp; Cabinet Impulse Responses
                </h3>
                <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.6; margin: 0 0 18px 0;">
                    Applying amplifier physics inside your DAW: learn how digital amp modelers replicate tube grid conduction, power sag, and convolution Impulse Responses (IRs) of iconic 4&times;12 speaker cabinets for Component 2 NEA compositions.
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/edexcel-music-technology-component-2-the-complete-composition-arrangement-masterclass/" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%); color: #080e1a; font-size: 13px; font-weight: 800; text-decoration: none; padding: 10px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(245,158,11,0.3); display: inline-flex; align-items: center; gap: 6px;">
                        Explore Component 2 Masterclass &rarr;
                    </a>
                </div>
            </div>
        </div>
    </div>

</div>
'''

def update_wordpress_amplifiers():
    page_id = 13352
    payload = {
        "content": build_amplifiers_html()
    }
    url = f"{WP_URL}/pages/{page_id}"
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"SUCCESS: Page ID {page_id} updated! Link: {data.get('link')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP ERROR on Page {page_id}: {e.code} - {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"ERROR on Page {page_id}: {e}")

if __name__ == "__main__":
    update_wordpress_amplifiers()
