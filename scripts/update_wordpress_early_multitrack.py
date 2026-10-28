import urllib.request, json, base64

WP_PAGE_ID = 13330
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

AMBER = "#f59e0b"
GOLD = "#fbbf24"
CYAN = "#38bdf8"
PURPLE = "#c084fc"
BG = "#080e1a"
CARD = "#0f172a"
BORDER = "rgba(255, 255, 255, 0.08)"


def pillar(color, label, title, text):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 20px; border-left: 4px solid {color};">
                <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">{label}</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">{title}</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">{text}</p>
            </div>'''


def video_card(vid, title, description, badge):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.35); display: flex; flex-direction: column;">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 14px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/{vid}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                    <strong style="color: #ffffff; font-size: 15px; line-height: 1.3;">{title}</strong>
                    <span style="color: {AMBER}; font-size: 11px; font-weight: 700; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); padding: 3px 8px; border-radius: 6px; white-space: nowrap;">{badge}</span>
                </div>
                <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 12px 0; flex: 1;">{description}</p>
                <a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.06); color: #cbd5e1; font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s;">
                    <span>Watch Directly on YouTube</span> <span style="color: {AMBER};">&nearr;</span>
                </a>
            </div>'''


def homework_card(num, title, focus, doc_id):
    url = f"https://docs.google.com/document/d/{doc_id}/copy"
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: {GOLD}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Guided Homework {num}</span>
                        <span style="background: rgba(251,191,36,0.12); color: {GOLD}; border: 1px solid rgba(251,191,36,0.3); font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 5px;">Google Doc Template</span>
                    </div>
                    <strong style="color: #ffffff; font-size: 15px; display: block; margin-bottom: 8px; line-height: 1.35;">{title}</strong>
                    <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.5; margin: 0 0 16px 0;">{focus}</p>
                </div>
                <a href="{url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1)); color: #fbbf24; border: 1px solid rgba(245,158,11,0.4); padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">
                    <span>Make a Copy in Google Docs</span> &rarr;
                </a>
            </div>'''


def embed(border, dot, title, sub, src, height):
    return f'''<div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: {dot}; border-radius: 50%; box-shadow: 0 0 8px {dot};"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">{title}</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">{sub}</span>
        </div>
        <div style="position: relative; width: 100%; height: {height}px; background: {CARD}; border: 1px solid {border}; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="{src}" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>'''


html_content = f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #1e1b11 0%, {BG} 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.12); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Evolutionary Era 02 &bull; Edexcel Component 4: Production &amp; Analysing
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Early Multitrack Recording <span style="color: {AMBER}; font-size: 0.85em;">(1964–1969)</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 860px;">
            The technological leap from live room direct-to-mono recording to 4-track and 8-track magnetic tape overdubbing: Studer J37 1-inch tape, reduction bouncing, EMI REDD tube mixing consoles, optical &amp; variable-mu compression, EMT 140 plate reverb, Ken Townsend’s ADT, tape flanging, fuzz, and the birth of modern psychedelic rock and soul.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Production Breakdown</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(AMBER, "01 &bull; 4-Track Tape &amp; Bouncing", "Studer J37 &amp; Sel-Sync", "1-inch 4-track magnetic tape at 15 ips. Sel-Sync allowed synchronous overdubbing without time lag. Ambitious arrangements used reduction mixes (bouncing down), trading generational tape hiss (+3 dB) for infinite layers.")}
            {pillar(GOLD, "02 &bull; Tube Consoles &amp; Dynamics", "REDD Desks &amp; Compressors", "EMI REDD.37 / REDD.51 consoles driven by Siemens V72 valve amps. Fairchild 670 variable-mu limiter (20 tubes) controlled drum transients; Teletronix LA-2A optical cell leveled vocals smoothly.")}
            {pillar(CYAN, "03 &bull; Studio Innovation &amp; Space", "EMT 140 Plate &amp; ADT", "The EMT 140 cold-rolled steel plate replaced bulky echo chambers with controllable decay (0.5–5s). Ken Townsend invented Automatic Double Tracking (ADT) using a secondary tape machine with varispeed control.")}
            {pillar(PURPLE, "04 &bull; Stompboxes &amp; Instruments", "Fuzz, Wah &amp; Keyboards", "Arbiter Fuzz Face delivered hard transistor clipping; Vox V846 wah swept resonant band-pass filters. Hammond B3 paired with Leslie 122 rotary speakers (Doppler effect); Mellotron M400 pioneered analog tape replay sampling.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Interactive Curriculum Slide Deck &bull; Early Multitrack (1964–1969)", "15 Comprehensive Slides &bull; 42 Technical Diagrams &bull; Audio Examples", "https://app.musictechguru.com/interactive-slide-early-multitrack?v=1", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(251,191,36,0.35)", GOLD, "Component 4 Exam Specification Quiz &bull; Early Multitrack", "12 Exam-Style Multiple Choice Questions &bull; Instant Marking &bull; Detailed Explanations", "https://app.musictechguru.com/early-multitrack-interactive-quiz?v=1", 680)}

    <!-- 5. HISTORICAL STUDIO DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Historical Video Masterclasses &bull; Authentic 1960s Techniques</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {video_card("6AhGzLJur5U", "The Beatles - Abbey Road 4-Track Session", "Experience the classic Abbey Road Studios 4-track tape tracking process, microphone placement, and live rhythm capture in Studio Two.", "Abbey Road")}
            {video_card("qBKPSRF5LEU", "EMI Studio Production - De-Mixing 4-Track Tape", "A technical deep dive into EMI 4-track tape stems, isolating individual tracks, and analyzing acoustic bleed between drums and bass.", "Tape De-Mixing")}
            {video_card("guiNy0jSKkI", "Deconstructing Sgt. Pepper Sessions", "Step through the track bouncing and reduction mixing stages used on Sgt. Pepper, combining orchestral layers with rock rhythm tracks.", "Reduction Bouncing")}
            {video_card("6jKme27M6xU", "Inside the Hammond Organ &amp; Leslie 122", "Explore the electro-mechanical tone-wheel generator, drawbar harmonics, and the rotating horn/rotor mechanics producing the Doppler effect.", "Rotary Speaker")}
        </div>
    </div>

    <!-- 6. EXAM PRACTICE GUIDED HOMEWORK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Exam Practice &bull; Guided Homework Assignments</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 16px;">
            {homework_card("1", "Guided Homework 1 &bull; 4-Track Tape &amp; Sel-Sync", "Studer J37 tape transport, 1-inch tape width, Sel-Sync synchronous overdubbing, and reduction mixing track allocation.", "1P9m1KIshDci6sP8hIdrMcl6oIxVUJmsyo8AUzcuHTOg")}
            {homework_card("2", "Guided Homework 2 &bull; Outboard Dynamics &amp; Reverb", "Fairchild 670 variable-mu limiting, Teletronix LA-2A optical leveling, and EMT 140 cold-rolled steel plate reverb acoustics.", "1EbXjwFhArBNSzjME7KuAhrGTLSzSc9U0r1g2J5pLU-g")}
            {homework_card("3", "Guided Homework 3 &bull; Studio Innovation &amp; Stereo Mixes", "Ken Townsend's ADT tape delay system, manual tape flanging comb filtering, Vox wah-wah filters, and early stereo hard-panning.", "1Q6F1GqQb2wZss3UmjWkQuBCgu7ZrrPu-hm9O6X4d4T4")}
        </div>
    </div>

    <!-- 7. FEATURED SHOP PRODUCT CARD -->
    <div style="margin-bottom: 40px; background: linear-gradient(135deg, #1a160c 0%, #0d121f 100%); border: 1px solid rgba(245,158,11,0.4); border-radius: 18px; padding: 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; align-items: center;">
            <div style="text-align: center;">
                <div style="position: relative; display: inline-block; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2025/02/2023-How-to-pass-C4-exam-TK-.png" alt="Component 4 Production &amp; Analysing Exam Guide" style="display: block; width: 100%; max-width: 320px; height: auto;">
                    <div style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(225,29,72,0.5);">
                        Exam Essential
                    </div>
                </div>
            </div>
            <div>
                <div style="display: inline-block; background: rgba(245,158,11,0.15); color: {AMBER}; border: 1px solid rgba(245,158,11,0.35); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 10px;">
                    Component 4 Masterclass Resource
                </div>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.3;">
                    Component 4 Production &amp; Analysing Exam Walkthrough
                </h3>
                <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px;">
                    <span style="color: {GOLD}; font-size: 26px; font-weight: 900;">&pound;9.95</span>
                    <span style="color: #64748b; font-size: 16px; text-decoration: line-through;">&pound;20.00</span>
                    <span style="color: #34d399; font-size: 12px; font-weight: 700; background: rgba(52,211,153,0.1); padding: 3px 8px; border-radius: 6px;">Instant Digital Access</span>
                </div>
                <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.7; padding-left: 20px; margin: 0 0 20px 0;">
                    <li>Step-by-step examiner walkthrough of authentic Component 4 exam questions</li>
                    <li>Audio analysis for 1960s multitrack recordings, bouncing loss, and plate reverbs</li>
                    <li>Detailed mark schemes, examiner commentary, and common pitfall warnings</li>
                    <li>Complete guide to answering technical questions on EQ, compression, and stereo imaging</li>
                </ul>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/cart/?add-to-cart=297504" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #080e1a; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(245,158,11,0.35);">
                        <span>Add to Cart (&pound;9.95)</span> &rarr;
                    </a>
                    <a href="https://www.musictechguru.com/product/2023-music-technology-component-4-past-paper-walkthough/" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.06); color: #ffffff; font-size: 13px; font-weight: 600; padding: 12px 20px; border-radius: 10px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">
                        <span>View Pack Details</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- 8. BOTTOM NAVIGATION -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #1e1b11 0%, {BG} 100%); border: 1px solid rgba(245,158,11,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Continue Your Production Revision</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Master each technological era in sequence from direct-to-tape mono through multitrack tape, analog consoles, and digital workstations.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {AMBER}; color: {BG}; font-weight: 800; font-size: 13.5px; padding: 11px 24px; border-radius: 50px; text-decoration: none;">&larr; Back to Component 3</a>
            <a href="https://app.musictechguru.com/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 11px 22px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">Go to Revision App &rarr;</a>
        </div>
    </div>

</div>'''

if __name__ == "__main__":
    req = urllib.request.Request(
        WP_API_URL, data=json.dumps({'content': html_content}).encode('utf-8'),
        headers={'Authorization': f'Basic {B64_AUTH}', 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as resp:
        res = json.load(resp)
        print("WordPress Early Multitrack Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
