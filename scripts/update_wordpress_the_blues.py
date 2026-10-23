import urllib.request, json, base64

WP_PAGE_ID = 236782
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

BLUE, AMBER, GREEN, BG, CARD = "#60a5fa", "#f59e0b", "#22c55e", "#060a14", "#0b1226"


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
                    <span style="color: {BLUE}; font-size: 11.5px; font-weight: 700; background: rgba(96,165,250,0.12); padding: 3px 8px; border-radius: 6px;">{song}</span>
                </div>
            </div>'''


def embed(color, label_dot, title, sub, src, height, min_h=None):
    return f'''<div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: {label_dot}; border-radius: 50%; box-shadow: 0 0 8px {label_dot};"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">{title}</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">{sub}</span>
        </div>
        <div style="position: relative; width: 100%; height: {height}px; background: {CARD}; border: 1px solid {color}; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="{src}" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>'''


html_content = f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #0d1a3a 0%, {BG} 100%); border: 1px solid rgba(96,165,250,0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(96,165,250,0.12); color: #93c5fd; border: 1px solid rgba(96,165,250,0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            1920s to Present &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            The Blues <span style="color: {BLUE}; font-size: 0.85em;">&amp; Recording Tech</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 840px;">
            Delta field recordings, resonator and slide guitar, the 12 bar form, amplified Chicago Blues, natural valve overdrive, Chess Records, British Blues and the style&rsquo;s legacy in rock and sampling.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {BLUE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Breakdown</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {pillar(BLUE, "01 &bull; Instrumentation", "Resonator to Electric Guitar", "Resonator and slide guitar in Country Blues, then electric guitar, bass guitar, drums and amplified harmonica in Chicago Blues; Hammond organ later in British Blues and Blues Rock.")}
            {pillar(AMBER, "02 &bull; Recording", "Field Discs to Chess Records", "Early blues is mono, scratchy and noisy with poor separation. Recording quality is vastly improved from 1945 onwards, with Chicago bands captured in small studios.")}
            {pillar(GREEN, "03 &bull; Processing", "Natural Valve Overdrive", "Little use of effects apart from distortion: small valve amplifiers pushed until they clip, with speaker compression and natural room ambience.")}
            {pillar("#f472b6", "04 &bull; Landmark Artists", "Delta to Chicago to Britain", "Robert Johnson, Muddy Waters, B.B. King, Howlin&rsquo; Wolf, Little Walter and Willie Dixon at Chess Records; the Yardbirds and Rolling Stones in Britain.")}
        </div>
    </div>

    <!-- 3. INTERACTIVE 14-SLIDE DECK -->
    {embed("rgba(96,165,250,0.35)", BLUE, "Interactive Study Presentation Deck", "14 Interactive Slides &bull; Illustrated Guide", "https://app.musictechguru.com/interactive-slide-blues?v=1", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(245,158,11,0.35)", AMBER, "Edexcel Component 3 Exam Specification Quiz", "12 Multiple Choice Questions &bull; Instant Feedback", "https://app.musictechguru.com/blues-interactive-quiz?v=1", 680)}

    <!-- 5. LISTENING LOUNGE -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {BLUE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark Recordings</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            {track("Kxi4XkIVWLQ", "Robert Johnson - Cross Road Blues", "Robert Johnson", "Cross Road Blues (1936)")}
            {track("bSfqNEvykv0", "Muddy Waters - Mannish Boy", "Muddy Waters", "Mannish Boy (1955)")}
            {track("VMUt8KdDtTY", "Howlin' Wolf - Smokestack Lightning", "Howlin&rsquo; Wolf", "Smokestack Lightning")}
            {track("4fk2prKnYnI", "B.B. King - The Thrill Is Gone", "B.B. King", "The Thrill Is Gone")}
        </div>
    </div>

    <!-- 6. RETURN HUB -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #0d1a3a 0%, {BG} 100%); border: 1px solid rgba(96,165,250,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.</p>
        <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {BLUE}; color: {BG}; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none;">&larr; Return to Component 3 Hub</a>
    </div>

</div>'''

if __name__ == "__main__":
    req = urllib.request.Request(
        WP_API_URL, data=json.dumps({'content': html_content}).encode('utf-8'),
        headers={'Authorization': f'Basic {B64_AUTH}', 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as resp:
        res = json.load(resp)
        print("WordPress The Blues Page Updated! ID:", res.get('id'), "Status:", res.get('status'))
