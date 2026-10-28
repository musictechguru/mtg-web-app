import urllib.request, json, base64

WP_PAGE_ID = 236848
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

EMERALD, AMBER, TEAL, PURPLE, BG, CARD = "#34d399", "#f59e0b", "#2dd4bf", "#c084fc", "#080d0a", "#0f1712"


def pillar(color, label, title, text):
    return f'''<div style="background: {CARD}; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 20px; border-left: 4px solid {color};">
                <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">{label}</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">{title}</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">{text}</p>
            </div>'''


def track(vid, title, artist, song):
    return f'''<div style="background: {CARD}; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/{vid}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                    <strong style="color: #ffffff; font-size: 14px;">{artist}</strong>
                    <span style="color: {EMERALD}; font-size: 11.5px; font-weight: 700; background: rgba(52,211,153,0.12); padding: 3px 8px; border-radius: 6px;">{song}</span>
                </div>
            </div>'''


def embed(border, dot, title, sub, src, height):
    return f'''<div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
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
    <div style="background: linear-gradient(135deg, #0d1f14 0%, {BG} 100%); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(52, 211, 153, 0.12); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Traditional to Contemporary &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Acoustic &amp; Folk <span style="color: {EMERALD}; font-size: 0.85em;">&amp; Recording Tech</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 840px;">
            Stereo acoustic guitar miking (spaced pair, coincident XY, Blumlein &amp; 12th fret placement), fingerpicking nuances, Sound Techniques studio intimacy, natural bleed management, and uncompressed dynamic expression.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {EMERALD}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Breakdown</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(EMERALD, "01 &bull; Instrumentation", "Acoustic Stringed Ensemble", "Martin D-28 and Gibson J-45 flat-top acoustics, 12-string guitars, 5-string banjo, mandolin chop chords, fiddle ornamentation, and upright double bass.")}
            {pillar(AMBER, "02 &bull; Studio Capture", "12th Fret &amp; Stereo Arrays", "Small-diaphragm condensers (AKG C451, Neumann KM184) at the 12th fret to avoid boomy sound hole resonance; coincident XY and Blumlein figure-8 stereo arrays.")}
            {pillar(TEAL, "03 &bull; Dynamic Control", "Transparent Optical Leveling", "Gentle optical compression (Teletronix LA-2A) preserving natural dynamic expression; EMT 140 plate reverb, natural room bleed, and subtle high-shelf air EQ (10&ndash;12 kHz).")}
            {pillar(PURPLE, "04 &bull; Landmark Artists", "Roots to Modern Folk", "Woody Guthrie, Bob Dylan (acoustic &amp; Newport '65 electric), Joan Baez, Fairport Convention, Nick Drake, Joni Mitchell, Laura Marling, and Mumford &amp; Sons.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 14-SLIDE DECK -->
    {embed("rgba(52,211,153,0.35)", EMERALD, "Interactive Study Presentation Deck", "14 Interactive Slides &bull; Illustrated Guide", "https://app.musictechguru.com/interactive-slide-folk?v=2", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Edexcel Component 3 Exam Specification Quiz", "12 Multiple Choice Questions &bull; Shuffled Answers &bull; Instant Feedback", "https://app.musictechguru.com/folk-interactive-quiz?v=2", 680)}

    <!-- 5. LISTENING LOUNGE -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {EMERALD}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark Recordings</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {track("90WD_ats6eE", "Bob Dylan - The Times They Are A-Changin'", "Bob Dylan", "The Times They Are A-Changin&#8217; (1964)")}
            {track("NAEppFUWLfc", "Simon & Garfunkel - The Sound of Silence", "Simon &amp; Garfunkel", "The Sound of Silence (Concert in Central Park)")}
            {track("aXnfhnCoOyo", "Nick Drake - Pink Moon", "Nick Drake", "Pink Moon (1972 &bull; Sound Techniques)")}
            {track("94bdMSCdw20", "Joni Mitchell - Big Yellow Taxi", "Joni Mitchell", "Big Yellow Taxi (1970 &bull; Open Tunings)")}
        </div>
    </div>

    <!-- 6. NAVIGATION -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #0d1f14 0%, {BG} 100%); border: 1px solid rgba(52,211,153,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {EMERALD}; color: {BG}; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none;">&larr; Back to Component 3 Overview</a>
            <a href="https://app.musictechguru.com/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">Practice Exam Questions on Web App &rarr;</a>
        </div>
    </div>

</div>'''

if __name__ == "__main__":
    req = urllib.request.Request(
        WP_API_URL, data=json.dumps({'content': html_content}).encode('utf-8'),
        headers={'Authorization': f'Basic {B64_AUTH}', 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as resp:
        res = json.load(resp)
        print("WordPress Acoustic Folk Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
