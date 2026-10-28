import urllib.request, json, base64

WP_PAGE_ID = 13317
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
            Evolutionary Era 01 &bull; Edexcel Component 4: Production &amp; Analysing
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Direct to Tape Recording <span style="color: {AMBER}; font-size: 0.85em;">(1950–1963)</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 860px;">
            The technological foundation of modern music production: direct-to-mono live tracking, acoustic bleed balancing, valve preamplifiers, ribbon microphones, tape head mechanics, Sun Studio slapback echo, and Les Paul’s breakthrough Sel-Sync multitrack recording.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Production Breakdown</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(AMBER, "01 &bull; Live Room Acoustics", "Spill &amp; Physical Balance", "Performers tracked live together without headphones. Level balance was achieved entirely through performer distance, room placement, and exploiting figure-8 microphone null angles.")}
            {pillar(GOLD, "02 &bull; Transducers", "Ribbons, Tubes &amp; Humbuckers", "RCA 44BX / 77DX ribbons and Neumann U47 valve condensers captured high dynamic energy. Seth Lover&#8217;s 1957 Gibson humbucker cancelled 60 Hz hum via reverse-wound reverse-polarity coils.")}
            {pillar(CYAN, "03 &bull; Tape Physics", "Electromagnetic Recording", "Ferric oxide magnetic particles aligned by record head gap electromagnetism. High tape speeds (15&ndash;30 ips) reduced noise; driven tape and tube circuits added warm soft-knee saturation.")}
            {pillar(PURPLE, "04 &bull; Outboard &amp; Overdubbing", "Slapback Echo &amp; Sel-Sync", "Sam Phillips generated iconic 80&ndash;120 ms slapback tape delay at Sun Studios using a second recorder. Les Paul invented Sel-Sync, allowing record heads to monitor playback for synchronous overdubbing.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 14-SLIDE PRESENTATION DECK -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Interactive Curriculum Slide Deck &bull; Direct to Tape (1950–1963)", "14 Comprehensive Slides &bull; 39 Technical Diagrams &bull; Audio Examples", "https://app.musictechguru.com/interactive-slide-direct-to-tape?v=7", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(251,191,36,0.35)", GOLD, "Component 4 Exam Specification Quiz &bull; Direct to Tape", "12 Exam-Style Multiple Choice Questions &bull; Instant Marking &bull; Detailed Explanations", "https://app.musictechguru.com/direct-to-tape-interactive-quiz?v=7", 680)}

    <!-- 5. HISTORICAL STUDIO DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Historical Video Masterclasses &bull; Authentic 1950s Techniques</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); display: grid; gap: 18px;">
            {video_card("8hVW8PajaLc", "A Modern 1950s Recording Studio Setup", "Step inside an authentic 1950s live room setup: single-mic drum capture, upright bass isolation, acoustic guitar distance positioning, and vintage valve console summing.", "Studio Setup")}
            {video_card("FuStmPbG528", "Slap Back Echo at Sun Studios", "A technical deep dive into Sam Phillips&#8217; tape delay method: routing mixer aux sends to a secondary Ampex tape machine and blending the playback head output for the signature rockabilly bounce.", "Tape Delay")}
            {video_card("17HPqK9HgH8", "Glyn Johns on Mono Recording", "Legendary producer and engineer Glyn Johns discusses the discipline and artistic purity of tracking direct-to-mono, managing acoustic bleed, and capturing authentic band synergy.", "Mono Tracking")}
        </div>
    </div>

    <!-- 6. EXAM PRACTICE GUIDED HOMEWORK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {AMBER}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Exam Practice &bull; Guided Homework Assignments</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 16px;">
            {homework_card("1", "Guided Homework 1 &bull; Direct to Tape (1950–1963)", "Acoustic spill analysis, single-mic ensemble balancing, live room layouts, and early dynamic microphone applications.", "1P9m1KIshDci6sP8hIdrMcl6oIxVUJmsyo8AUzcuHTOg")}
            {homework_card("2", "Guided Homework 2 &bull; Direct to Tape (1950–1963)", "Tape transport mechanics, erase/record/playback head physics, 15 vs 7.5 ips speed differences, and valve tape saturation curves.", "1EbXjwFhArBNSzjME7KuAhrGTLSzSc9U0r1g2J5pLU-g")}
            {homework_card("3", "Guided Homework 3 &bull; Direct to Tape (1950–1963)", "Sun Studio slapback echo routing, Les Paul&#8217;s Sel-Sync overdubbing development, and Component 4 extended listening exam questions.", "1Q6F1GqQb2wZss3UmjWkQuBCgu7ZrrPu-hm9O6X4d4T4")}
        </div>
    </div>

    <!-- 7. FEATURED SHOP PRODUCT CARD -->
    <div style="margin-bottom: 40px; background: linear-gradient(135deg, #1a160c 0%, #0d121f 100%); border: 1px solid rgba(245,158,11,0.4); border-radius: 18px; padding: 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; align-items: center;">
            <div style="text-align: center;">
                <div style="position: relative; display: inline-block; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2025/03/Music-tech-1950s-resource-pack.png" alt="Music Technology 1930-1961 Teaching Pack" style="display: block; width: 100%; max-width: 320px; height: auto;">
                    <div style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(225,29,72,0.5);">
                        Save 60%
                    </div>
                </div>
            </div>
            <div>
                <div style="display: inline-block; background: rgba(245,158,11,0.15); color: {AMBER}; border: 1px solid rgba(245,158,11,0.35); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 10px;">
                    Essential Teacher &amp; Student Resource Pack
                </div>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.3;">
                    Music Technology 1930–1961: A Complete Teaching Pack
                </h3>
                <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px;">
                    <span style="color: {GOLD}; font-size: 26px; font-weight: 900;">&pound;9.95</span>
                    <span style="color: #64748b; font-size: 16px; text-decoration: line-through;">&pound;25.00</span>
                    <span style="color: #34d399; font-size: 12px; font-weight: 700; background: rgba(52,211,153,0.1); padding: 3px 8px; border-radius: 6px;">Instant Digital Download</span>
                </div>
                <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.7; padding-left: 20px; margin: 0 0 20px 0;">
                    <li>Comprehensive classroom presentation deck &amp; editable teacher slide notes</li>
                    <li>Full audio timeline analysis: acoustic Delta blues, Chicago electric blues, &amp; rock &#8217;n&#8217; roll</li>
                    <li>Component 3 &amp; 4 practice question booklets with complete examiner mark schemes</li>
                    <li>Technical guides covering tape head gaps, AC bias, Sel-Sync, and 1950s live room setups</li>
                </ul>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/cart/?add-to-cart=297533" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #080e1a; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(245,158,11,0.35);">
                        <span>Add to Cart (&pound;9.95)</span> &rarr;
                    </a>
                    <a href="https://www.musictechguru.com/product/music-technology-1930-1961/" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.06); color: #ffffff; font-size: 13px; font-weight: 600; padding: 12px 20px; border-radius: 10px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">
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
        print("WordPress Direct to Tape Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
