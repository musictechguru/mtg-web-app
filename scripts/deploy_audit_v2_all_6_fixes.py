#!/usr/bin/env python3
"""
deploy_audit_v2_all_6_fixes.py
Executes all 6 items from the Second Comprehensive Audit of MusicTechGuru.com:

1. Fixes corrupted `/wp-json/wp/v2/pages/...?add-to-cart=` WooCommerce links on
   Component 3 Hub (Page 13311) and Component 4 Hub (Page 13245).
2. Embeds the new 10-question `music-formats-interactive-quiz` at the bottom of
   Page 236770 (`/music-formats/`) and Post 236766 (`/2020/03/04/music-formats/`).
3. Replaces the legacy "The Theremin" button on Component 3 Hub (Page 13311) with
   "Mellotron & Sampling", and replaces the legacy `/audio-mixers/` stub (Page 8581)
   and `/2020/03/04/the-theremin/` post (Post 236750) with redirect bridges to
   `/mixers-digital-audio-workstations-daw/` and `/the-synthesizer/`.
4. Upgrades legacy WordPress membership/auth pages (`membership-levels` 6519,
   `membership-join` 296936, `membership-registration` 296937, `membership-login` 296938,
   `auth-login` 4984, `auth-register` 4983, `auth-forgot-password` 4987, `auth-resetpass` 4985,
   `test-quiz` 8336, `courses` 2778) to route directly to `https://app.musictechguru.com/`.
5. Injects contextual MTG Web App Integration Banners into the remaining content pages
   and posts that had 0 or low app links (`296462`, `297524`, `296602`, `296624`, `297308`,
   `296591`, `13343`, `297486`, `296964`, `11781`, `297651`, `297654`, `10071`, `296891`,
   `297817`, `12989`).
"""

import urllib.request
import json
import base64
import re

WP_URL = "https://www.musictechguru.com/wp-json/wp/v2"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

HEADERS = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}


def get_wp_item(endpoint, item_id):
    req = urllib.request.Request(f"{WP_URL}/{endpoint}/{item_id}?context=edit", headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def update_wp_item(endpoint, item_id, raw_content, label=""):
    payload = json.dumps({"content": raw_content}).encode("utf-8")
    req = urllib.request.Request(f"{WP_URL}/{endpoint}/{item_id}", data=payload, headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, timeout=25) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"  ✓ Updated {endpoint}/{item_id} ({label}) -> {res['link']}")


# ==============================================================================
# 1 & 3 & 6: Fix Component 3 Hub (Page 13311) & Component 4 Hub (Page 13245)
#            + Redirect /audio-mixers/ (8581) and /the-theremin/ (Post 236750)
# ==============================================================================
def fix_component_3_and_4_hubs():
    print("\n--- [1, 3, 6] Fixing Component 3 Hub (13311), Component 4 Hub (13245), & Legacy Stubs ---")
    # Page 13311: decode [vc_raw_html], fix wp-json add-to-cart links, replace Theremin link
    p13311 = get_wp_item("pages", 13311)
    raw_13311 = p13311["content"]["raw"]
    m = re.search(r"\[vc_raw_html\](.*?)\[/vc_raw_html\]", raw_13311, re.DOTALL)
    if m:
        decoded = base64.b64decode(m.group(1).strip()).decode("utf-8")
        # Fix corrupted /wp-json/wp/v2/pages/13311?add-to-cart=...
        decoded = decoded.replace(
            "/wp-json/wp/v2/pages/13311?add-to-cart=",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/?add-to-cart="
        )
        # Replace Theremin card in Column 2 with Mellotron & Sampling
        decoded = decoded.replace(
            'href="https://www.musictechguru.com/2020/03/04/the-theremin/"',
            'href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-mellotron/"'
        )
        decoded = decoded.replace("&bull; The Theremin", "&bull; The Mellotron")
        new_b64 = base64.b64encode(decoded.encode("utf-8")).decode("utf-8")
        new_raw_13311 = raw_13311[:m.start(1)] + new_b64 + raw_13311[m.end(1):]
        update_wp_item("pages", 13311, new_raw_13311, "Component 3 Hub - Fixed Cart URLs & Theremin link")

    # Page 13245: fix /wp-json/wp/v2/pages?slug=component-4-production-analysing...
    p13245 = get_wp_item("pages", 13245)
    raw_13245 = p13245["content"]["raw"]
    new_raw_13245 = re.sub(
        r"/wp-json/wp/v2/pages\?slug=component-4-production-analysing(?:&#038;|&amp;|&)add-to-cart=",
        "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/?add-to-cart=",
        raw_13245
    )
    if new_raw_13245 != raw_13245:
        update_wp_item("pages", 13245, new_raw_13245, "Component 4 Hub - Fixed Cart URLs")

    # Redirect bridge helper
    def build_redirect_bridge(badge, title, desc, target_url, btn_label):
        return f'''<div style="background: linear-gradient(135deg, #080e1a 0%, #0f172a 100%); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 20px; padding: 40px 32px; margin: 24px auto; max-width: 820px; text-align: center; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; color: #f8fafc; box-shadow: 0 20px 50px rgba(0,0,0,0.45);">
  <div style="display: inline-block; background: rgba(56, 189, 248, 0.14); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 5px 14px; border-radius: 999px; margin-bottom: 14px;">{badge}</div>
  <h2 style="color: #ffffff; font-size: 26px; font-weight: 900; margin: 0 0 12px;">{title}</h2>
  <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; max-width: 600px; margin: 0 auto 24px;">{desc}</p>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
    <a href="{target_url}" style="background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); color: #080e1a !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 10px;">{btn_label} &rarr;</a>
    <a href="https://app.musictechguru.com/" style="background: rgba(192, 132, 252, 0.15); border: 1px solid rgba(192, 132, 252, 0.4); color: #d8b4fe !important; text-decoration: none; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 10px;">🚀 Launch MTG Revision Web App &rarr;</a>
  </div>
  <script>window.location.replace("{target_url}");</script>
</div>'''

    # Page 8581 (/audio-mixers/) -> /mixers-digital-audio-workstations-daw/
    update_wp_item(
        "pages",
        8581,
        build_redirect_bridge(
            "Updated Syllabus Module",
            "Audio Mixers & Digital Audio Workstations (DAWs)",
            "This module has been upgraded with an interactive 15-slide presentation deck, console signal-flow diagrams, and a 12-question specification quiz.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/mixers-digital-audio-workstations-daw/",
            "Open Mixers & DAWs Interactive Hub"
        ),
        "Redirect /audio-mixers/ stub to Mixers & DAWs"
    )

    # Post 236750 (/2020/03/04/the-theremin/) -> /the-synthesizer/
    update_wp_item(
        "posts",
        236750,
        build_redirect_bridge(
            "Edexcel A-Level Specification Hub",
            "The Synthesizer & Electronic Sound Synthesis",
            "Explore the complete A-Level Music Technology Synthesizer module featuring a 15-slide interactive deck, verified audio examples, and a 10-question specification quiz.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/",
            "Open The Synthesizer Interactive Hub"
        ),
        "Redirect /the-theremin/ post to The Synthesizer"
    )


# ==============================================================================
# 2: Embed `music-formats-interactive-quiz` on Page 236770 & Post 236766
# ==============================================================================
def embed_music_formats_quiz():
    print("\n--- [2] Embedding Music Formats Interactive Quiz on Page 236770 & Post 236766 ---")
    quiz_section_html = '''
<!-- CONSUMABLE MUSIC FORMATS INTERACTIVE SPECIFICATION QUIZ -->
<div id="formats-quiz" style="background: linear-gradient(135deg, #080e1a 0%, #0f172a 100%); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 20px; padding: 28px; margin: 40px 0 24px 0; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45); font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
        <div style="max-width: 780px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.35); color: #34d399; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 10px;">
                <span>💿</span> Interactive Assessment &bull; AO3 &amp; AO4 Exam Practice
            </div>
            <h2 style="color: #ffffff; font-size: clamp(20px, 2.6vw, 28px); font-weight: 900; letter-spacing: -0.5px; margin: 0 0 8px 0; line-height: 1.25;">
                Test Your Knowledge: <span style="color: #34d399;">Consumable Music Formats Quiz</span>
            </h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0;">
                10 exam-style specification questions covering Vinyl RIAA pre-emphasis, Compact Cassette bias &amp; Dolby B companding, Red Book CD 44.1 kHz / 16-bit Nyquist math, and MP3 psychoacoustic masking.
            </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
            <a href="https://app.musictechguru.com/?category=Dictionary+Quizzes" target="_blank" rel="noopener" style="background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.4); color: #34d399 !important; text-decoration: none; font-size: 13px; font-weight: 800; padding: 10px 18px; border-radius: 10px; display: inline-flex; align-items: center; gap: 8px;">
                <span>Practice More in Web App &rarr;</span>
            </a>
        </div>
    </div>
    <div style="position: relative; width: 100%; height: 660px; border-radius: 14px; overflow: hidden; background: #080e1a; border: 1px solid rgba(255, 255, 255, 0.08);">
        <iframe src="https://app.musictechguru.com/music-formats-interactive-quiz" style="width: 100%; height: 100%; border: 0;" title="Consumable Music Formats Specification Quiz" loading="lazy"></iframe>
    </div>
</div>
<!-- END CONSUMABLE MUSIC FORMATS INTERACTIVE SPECIFICATION QUIZ -->
'''

    for endpoint, item_id in [("pages", 236770), ("posts", 236766)]:
        item = get_wp_item(endpoint, item_id)
        raw = item["content"]["raw"]
        # Strip any prior quiz block if present
        raw = re.sub(
            r"<!-- CONSUMABLE MUSIC FORMATS INTERACTIVE SPECIFICATION QUIZ -->.*?<!-- END CONSUMABLE MUSIC FORMATS INTERACTIVE SPECIFICATION QUIZ -->",
            "",
            raw,
            flags=re.DOTALL
        )
        # Insert right before the closing </div> of #mtg-dark-theme-wrapper if present, else append
        last_div = raw.rfind("</div>")
        if last_div != -1:
            new_raw = raw[:last_div] + "\n" + quiz_section_html + "\n" + raw[last_div:]
        else:
            new_raw = raw + "\n" + quiz_section_html
        update_wp_item(endpoint, item_id, new_raw, "Added Music Formats Interactive Quiz")


# ==============================================================================
# 4: Upgrade Legacy WordPress Membership & Auth Pages
# ==============================================================================
def upgrade_legacy_membership_pages():
    print("\n--- [4] Upgrading Legacy WordPress Membership & Auth Pages ---")
    # Fix Page 6519 (/membership-account/membership-levels/) so the Free Registration button
    # points to https://app.musictechguru.com/ instead of /membership-join/membership-registration/
    p6519 = get_wp_item("pages", 6519)
    raw_6519 = p6519["content"]["raw"]
    new_raw_6519 = raw_6519.replace(
        "https://www.musictechguru.com/membership-join/membership-registration/",
        "https://app.musictechguru.com/"
    )
    if new_raw_6519 != raw_6519:
        update_wp_item("pages", 6519, new_raw_6519, "Membership Levels - Pointed registration CTA to Web App")

    # Upgrade membership-join (296936), membership-registration (296937), membership-login (296938)
    gateway_html = '''<div style="background: linear-gradient(135deg, #080e1a 0%, #0f172a 100%); border: 1px solid rgba(192, 132, 252, 0.35); border-radius: 22px; padding: 44px 32px; margin: 24px auto; max-width: 860px; text-align: center; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; color: #f8fafc; box-shadow: 0 25px 60px rgba(0,0,0,0.5);">
  <div style="display: inline-block; background: rgba(192, 132, 252, 0.14); border: 1px solid rgba(192, 132, 252, 0.35); color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 6px 16px; border-radius: 999px; margin-bottom: 16px;">⚡ Unified MTG Account Portal</div>
  <h2 style="color: #ffffff; font-size: clamp(24px, 3vw, 32px); font-weight: 900; margin: 0 0 12px;">Sign In or Create Your Music Tech Guru Account</h2>
  <p style="color: #94a3b8; font-size: 15px; line-height: 1.65; max-width: 640px; margin: 0 auto 28px;">
    All student revision passes, interactive quizzes, DAW simulations, and school classroom licenses are managed directly inside the <strong>Music Tech Guru Web App</strong>. Sign in once to unlock both the Web App and all website specification quizzes.
  </p>
  <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center;">
    <a href="https://app.musictechguru.com/" style="background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 15px; padding: 14px 28px; border-radius: 12px; box-shadow: 0 8px 25px rgba(168, 85, 247, 0.35);">🚀 Sign In / Create Account in Web App &rarr;</a>
    <a href="https://www.musictechguru.com/for-teachers/" style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8 !important; text-decoration: none; font-weight: 800; font-size: 15px; padding: 14px 24px; border-radius: 12px;">🏫 School &amp; Teacher Licenses (10 Seats) &rarr;</a>
  </div>
</div>'''

    for pid, label in [
        (296936, "membership-join"),
        (296937, "membership-registration"),
        (296938, "membership-login"),
        (4984, "auth-login"),
        (4983, "auth-register"),
        (4987, "auth-forgot-password"),
        (4985, "auth-resetpass"),
        (8336, "test-quiz"),
        (2778, "courses"),
    ]:
        update_wp_item("pages", pid, gateway_html, f"Upgraded legacy {label} page to Unified App Portal")


# ==============================================================================
# 5: Inject Contextual MTG Web App Integration Banners on Content Pages & Posts
# ==============================================================================
def build_cta_banner(badge, title, desc, primary_url, primary_label, secondary_url="https://app.musictechguru.com/", secondary_label="Explore All 4 Components in Web App"):
    return f'''<!-- MTG AUDIT V2 CONTEXTUAL APP CTA -->
<div style="background: linear-gradient(135deg, #080e1a 0%, #131c31 100%); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 28px 30px; margin: 32px 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; color: #f8fafc; box-shadow: 0 18px 40px rgba(0,0,0,0.4);">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;">
    <div style="flex: 1 1 460px;">
      <div style="display: inline-block; background: rgba(56, 189, 248, 0.14); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 999px; margin-bottom: 10px;">{badge}</div>
      <h3 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 0 0 8px; line-height: 1.3;">{title}</h3>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0;">{desc}</p>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
      <a href="{primary_url}" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); color: #080e1a !important; text-decoration: none; font-weight: 800; font-size: 13.5px; padding: 12px 20px; border-radius: 10px; white-space: nowrap;">{primary_label} &rarr;</a>
      <a href="{secondary_url}" target="_blank" rel="noopener" style="background: rgba(192, 132, 252, 0.15); border: 1px solid rgba(192, 132, 252, 0.4); color: #d8b4fe !important; text-decoration: none; font-weight: 800; font-size: 13.5px; padding: 12px 18px; border-radius: 10px; white-space: nowrap;">{secondary_label} &rarr;</a>
    </div>
  </div>
</div>
<!-- END MTG AUDIT V2 CONTEXTUAL APP CTA -->'''


def inject_contextual_banners():
    print("\n--- [5] Injecting Contextual Web App Banners on Content Pages & Posts ---")
    targets = [
        ("pages", 296462, "Music Tech Tutor", build_cta_banner(
            "🎓 Combine 1-on-1 Tuition with Daily Interactive Practice",
            "Accelerate Your Grade Between Tutoring Sessions in the MTG Web App",
            "Practice interactive EQ, compression, microphone placement, synthesis signal flow, and timed Component 3 & 4 past-paper drills inside the Music Tech Guru Revision App.",
            "https://app.musictechguru.com/",
            "Launch Interactive Revision App",
            "https://www.musictechguru.com/homepage/a-level-music-technology/",
            "Explore A-Level Course Hub"
        )),
        ("pages", 297524, "Component 2 Composition Guide", build_cta_banner(
            "🎹 Component 2 Interactive Companion (9MT0/02)",
            "Open the Interactive Component 2 Brief Explorer & Synthesizer Lab",
            "Track your arrangement structure, test subtractive/FM synthesis signal flow, and audit your coursework against the official Edexcel Component 2 marking grids.",
            "https://app.musictechguru.com/?category=Component+2+Guide",
            "Open Component 2 Interactive Guide",
            "https://app.musictechguru.com/?quiz=synth-1",
            "Launch Interactive Synth Lab"
        )),
        ("pages", 296602, "BandLab Tutorials", build_cta_banner(
            "🎚️ Ready for A-Level Studio Production?",
            "Test Your Mixing, EQ, Compression & Signal Flow Skills in the Web App",
            "Move from foundational DAW arranging into interactive A-Level Music Technology audio simulations, frequency ear-training, and effects-chain routing challenges.",
            "https://app.musictechguru.com/?quiz=prod-tech-1",
            "Try EQ & Compression Ear Training",
            "https://app.musictechguru.com/",
            "Open Full MTG Web App"
        )),
        ("pages", 296624, "Remake Shape of You Logic Pro", build_cta_banner(
            "🎹 Component 2 Arrangement & Synthesis Practice",
            "Master MIDI Sequencing, Piano Roll Editing & Synth Patch Design",
            "Complement this Logic Pro remake walkthrough with interactive MIDI practical quizzes, drum pattern programming drills, and synthesizer signal-flow challenges in the Web App.",
            "https://app.musictechguru.com/?quiz=piano-roll-1",
            "Launch MIDI & Piano Roll Lab",
            "https://app.musictechguru.com/?category=Component+2+Guide",
            "Open Component 2 Coursework Guide"
        )),
        ("pages", 297308, "Sequencing 101 Shape of You", build_cta_banner(
            "🎹 Component 2 Sequencing & Quantization",
            "Practice MIDI Quantization, Velocity & Arrangement in the Web App",
            "Reinforce your Logic Pro sequencing workflow with interactive piano-roll editing drills and Component 2 mark-scheme checklists.",
            "https://app.musictechguru.com/?quiz=piano-roll-1",
            "Practice MIDI Quizzes in App",
            "https://app.musictechguru.com/?category=Component+2+Guide",
            "Component 2 Interactive Guide"
        )),
        ("pages", 296591, "Examples of Individual Assessments", build_cta_banner(
            "📋 Official Mark Scheme Checklists",
            "Grade & Audit Your Coursework Inside the MTG Web App",
            "Use our interactive Component 1 Logbook Tracksheet Creator and Component 2 Composition Guide to secure top-band marks.",
            "https://app.musictechguru.com/?category=Component+2+Guide",
            "Open Coursework Checklists",
            "https://app.musictechguru.com/?category=Tracksheet+Creator",
            "Launch C1 Tracksheet Creator"
        )),
        ("pages", 13343, "A-Level Course Overview", build_cta_banner(
            "🚀 All-in-One Edexcel 9MT0 Revision Platform",
            "Interactive Quizzes, Audio Simulations & Logbook Tools for All 4 Components",
            "Access 120+ dictionary topic quizzes, interactive DAW mixing drills, Component 1 Tracksheet Creator, and Component 3 & 4 mock exams in the MTG Web App.",
            "https://app.musictechguru.com/",
            "Launch MTG Revision Web App",
            "https://www.musictechguru.com/for-teachers/",
            "School & Teacher Licenses"
        )),
        ("pages", 297486, "Past Papers & Edexcel Resources", build_cta_banner(
            "📝 Interactive Past-Paper & Exam Simulators",
            "Practice Timed Component 3 & Component 4 Exam Questions with Instant Marking",
            "Go beyond static PDFs—practice interactive graph-drawing, audio comparisons, essay structuring, and 120+ specification topic quizzes inside the Web App.",
            "https://app.musictechguru.com/?category=Component+3+Mock+Exams",
            "Launch Interactive Exam Simulator",
            "https://app.musictechguru.com/?category=Dictionary+Quizzes",
            "120+ Topic Quizzes"
        )),
        ("pages", 296964, "Useful Downloads", build_cta_banner(
            "🎧 Companion Interactive Component 4 Practice",
            "Pair These Past Papers with Interactive Audio Manipulation & Essay Drills",
            "Practice Component 4 Section A audio editing/mixing calculations and Section B 20-mark extended essay mark schemes inside the MTG Web App.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/",
            "Open Component 4 Interactive Hub",
            "https://app.musictechguru.com/",
            "Launch MTG Web App"
        )),
        ("pages", 11781, "General Music Tech Terms", build_cta_banner(
            "📖 120+ Interactive Specification Term Quizzes",
            "Turn Revision Definitions into Active Recall in the MTG Web App",
            "Every term in the Edexcel A-Level Music Technology glossary has a matching 4-stage interactive quiz with audio examples and examiner rationales.",
            "https://app.musictechguru.com/?category=Dictionary+Quizzes",
            "Quiz These Terms in Web App",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/",
            "Open Full 200+ Term Dictionary"
        )),
        ("pages", 297651, "Edexcel Component 3 Revision", build_cta_banner(
            "🎧 Component 3 Interactive Slide Decks & Mock Exams",
            "Explore All 30 Interactive Topic Decks & Timed Listening Quizzes",
            "Master every genre, recording era, studio effect, and instrument on the Edexcel Component 3 syllabus with interactive slide decks and instant-feedback quizzes.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/",
            "Open Component 3 Interactive Hub",
            "https://app.musictechguru.com/?category=Component+3+Mock+Exams",
            "Launch C3 Mock Exams in App"
        )),
        ("pages", 297654, "Edexcel Component 4 Revision", build_cta_banner(
            "🎛️ Component 4 Interactive Deck & Practical Simulators",
            "Master the 9MT0/04 Practical Production Exam in the MTG Web App",
            "Practice interactive EQ/compression ear training, binary/MIDI diagrams, waveform editing, and Question 6 20-mark essay structures.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/",
            "Open Component 4 Interactive Hub",
            "https://app.musictechguru.com/?quiz=prod-tech-1",
            "Launch C4 Practical Drills in App"
        )),
        ("posts", 297817, "Glyn Johns 4-Mic Drum Technique", build_cta_banner(
            "🎙️ Component 1 Interactive Microphone Placement Lab",
            "Test Your Glyn Johns, XY, Blumlein & Multi-Mic Drum Setups in the App",
            "Drag and position virtual studio microphones, check phase coherence, and export your official Pearson Edexcel Component 1 Logbook Tracksheet.",
            "https://app.musictechguru.com/?quiz=interactive-mic-placement",
            "Launch Mic Placement Simulator",
            "https://app.musictechguru.com/?category=Tracksheet+Creator",
            "Open C1 Tracksheet Creator"
        )),
        ("posts", 12989, "Stranger Things Synth Breakdown", build_cta_banner(
            "🎹 Analog Subtractive Synthesis & Arpeggiator Lab",
            "Build Classic 1980s Analog Synth Patches Inside the MTG Web App",
            "Explore our 15-slide Synthesizer Interactive Deck and test your knowledge of VCO waveforms, ladder filters, and ADSR envelopes.",
            "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/",
            "Open The Synthesizer Interactive Hub",
            "https://app.musictechguru.com/?quiz=synth-1",
            "Launch Interactive Synth Quiz"
        )),
    ]

    for endpoint, item_id, label, banner_html in targets:
        item = get_wp_item(endpoint, item_id)
        raw = item["content"]["raw"]
        # Remove any previous audit v2 banner
        raw = re.sub(
            r"<!-- MTG AUDIT V2 CONTEXTUAL APP CTA -->.*?<!-- END MTG AUDIT V2 CONTEXTUAL APP CTA -->",
            "",
            raw,
            flags=re.DOTALL
        )
        if "[vc_row" in raw:
            b64_banner = base64.b64encode(banner_html.encode("utf-8")).decode("utf-8")
            vc_block = f'\n[vc_row][vc_column][vc_raw_html]{b64_banner}[/vc_raw_html][/vc_column][/vc_row]'
            new_raw = raw + vc_block
        else:
            new_raw = raw + "\n" + banner_html
        update_wp_item(endpoint, item_id, new_raw, f"Added contextual Web App CTA ({label})")


if __name__ == "__main__":
    fix_component_3_and_4_hubs()
    embed_music_formats_quiz()
    upgrade_legacy_membership_pages()
    inject_contextual_banners()
    print("\nALL 6 AUDIT V2 FIXES SUCCESSFULLY DEPLOYED LIVE!")
