import urllib.request, json, base64

B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

PURPLE = "#c084fc"
CYAN = "#38bdf8"
EMERALD = "#34d399"
AMBER = "#fbbf24"
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
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/{vid}" loading="lazy" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                    <strong style="color: #ffffff; font-size: 15px; line-height: 1.3;">{title}</strong>
                    <span style="background: rgba(192,132,252,0.12); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.3); font-size: 10.5px; font-weight: 800; padding: 3px 8px; border-radius: 6px; white-space: nowrap;">{badge}</span>
                </div>
                <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.55; margin: 0;">{description}</p>
            </div>'''

def resource_card(tag, color, title, desc, link, link_text):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                <div>
                    <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">{tag}</span>
                    <strong style="color: #ffffff; font-size: 16px; display: block; margin-bottom: 8px; line-height: 1.3;">{title}</strong>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.55; margin: 0 0 16px 0;">{desc}</p>
                </div>
                <a href="{link}" style="background: rgba(255,255,255,0.05); color: {color}; border: 1px solid rgba(255,255,255,0.12); padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; text-decoration: none; text-align: center; display: inline-block;">
                    {link_text} &rarr;
                </a>
            </div>'''

def embed(glow, color, title, subtitle, url, height):
    iframe_id = "iframe-" + title.lower().replace(" ", "-").replace("&amp;", "").replace("&bull;", "").replace(";", "").replace(":", "")[:18]
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 18px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 30px {glow}; margin-bottom: 45px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: {color}; box-shadow: 0 0 10px {color};"></div>
                <div>
                    <h3 style="color: #ffffff; font-size: 16px; font-weight: 800; margin: 0;">{title}</h3>
                    <span style="color: #94a3b8; font-size: 12px;">{subtitle}</span>
                </div>
            </div>
            <a href="{url}" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none;">
                Open Fullscreen &nearr;
            </a>
        </div>
        <div style="position: relative; width: 100%; height: {height}px; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.06);">
            <iframe id="{iframe_id}" src="{url}" data-src="{url}" style="width: 100%; height: 100%; border: 0; display: block;" loading="eager" data-no-lazy="1" data-skip-lazy="1" allowfullscreen></iframe>
        </div>
    </div>'''

def generate_page_content():
    return f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1140px; margin: 0 auto; padding: 10px 0 60px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #18112c 0%, #0d1222 100%); border: 1px solid rgba(192, 132, 252, 0.35); border-radius: 20px; padding: 40px 36px; margin-bottom: 35px; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
        
        <!-- Header & Breadcrumbs -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="color: {PURPLE}; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; font-size: 14px;">
                &larr; Component 3 Music Technology in Context
            </a>
            <span style="background: rgba(192,132,252,0.15); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.3); font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">
                Instrumental Technology Focus &bull; Vintage Keys
            </span>
        </div>

        <div style="display: inline-block; background: rgba(192, 132, 252, 0.12); color: {PURPLE}; border: 1px solid rgba(192, 132, 252, 0.3); padding: 5px 16px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 16px;">
            A-Level Music Technology &bull; Electro-Mechanical Keyboards Masterclass
        </div>
        <h1 style="color: #ffffff; font-size: clamp(30px, 4vw, 44px); font-weight: 900; margin: 0 0 16px 0; line-height: 1.15; letter-spacing: -0.5px;">
            Classic Keyboards <span style="color: {PURPLE};">&amp; Electro-Mechanical Audio</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16.5px; margin: 0; line-height: 1.6; max-width: 860px;">
            The definitive technical guide to the golden era of non-synth keyboard engineering: <strong style="color: #ffffff;">The Mellotron</strong> tape-replay action, <strong style="color: #ffffff;">Fender Rhodes</strong> tines vs. <strong style="color: #ffffff;">Wurlitzer 200A</strong> reeds, the funk-defining <strong style="color: #ffffff;">Hohner Clavinet D6</strong>, and the tonewheel additive majesty of the <strong style="color: #ffffff;">Hammond B3 &amp; Leslie 122</strong> rotating Doppler cabinet.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 45px;">
        {pillar(PURPLE, "01 &bull; Sound Generators", "Tapes, Tines, Reeds &amp; Tonewheels", "Physical matter in vibration: Mellotron 3/8&quot; tape strips, Rhodes steel tines with tonebars, Wurlitzer flat reeds, Clavinet guitar strings, and Hammond spinning toothed steel discs.")}
        {pillar(CYAN, "02 &bull; Transduction Methods", "Magnetic, Electrostatic &amp; Induction", "How mechanical motion becomes audio voltage: magnetic tape playback heads, electromagnetic induction coils, and Wurlitzer electrostatic plates polarized to ~170V DC.")}
        {pillar(EMERALD, "03 &bull; Mechanical Artifacts", "Key Click &amp; The 8-Second Limit", "Iconic mechanical flaws that became cherished trademarks: transient busbar key click, 8-second tape spring snapback, and tangent clacks with yarn string muting.")}
        {pillar(AMBER, "04 &bull; Rotary Modulation", "The Leslie 122 Doppler Horn &amp; Rotor", "Acoustic Doppler effect: 800 Hz passive crossover splitting highs to a rotating treble horn and lows to a spinning wooden drum rotor for natural pitch vibrato and tremolo.")}
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(192,132,252,0.35)", PURPLE, "Interactive Curriculum Slide Deck &bull; Classic Electro-Mechanical Keyboards", "15 Comprehensive Slides &bull; 16 Technical Photographs &amp; Schematics &bull; Integrated Video Audio Clips", "https://app.musictechguru.com/interactive-slide-classic-keyboards?v=20261028", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(56,189,248,0.35)", CYAN, "Interactive Specification Quiz &bull; Classic Keyboards &amp; Transduction", "10 Edexcel Component 3 Specification Questions &bull; Real-Time Feedback &amp; Examiner Explanations", "https://app.musictechguru.com/classic-keyboards-interactive-quiz?v=20261028", 640)}

    <!-- 5. CURATED VIDEO LOUNGE & DEMONSTRATIONS -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {PURPLE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Video Lounge &bull; Landmark Keyboard Demonstrations</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 20px;">
            {video_card("ByD8gH7kYxs", "The Beatles: Strawberry Fields Forever", "Paul McCartney&#39;s iconic Mellotron Mk II intro demonstrating the authentic tape-replay 3-piece flute bank recorded at Abbey Road Studios.", "Mellotron Mk II")}
            {video_card("UbkqE4fpvdI", "Herbie Hancock: Chameleon (Head Hunters)", "Masterclass in Fender Rhodes electric piano performance: bell-like tine attack, warm tonebar resonance, and dynamic soloing through a tube amplifier.", "Fender Rhodes")}
            {video_card("ftdZ363R9kQ", "Stevie Wonder: Superstition Live", "The definitive Hohner Clavinet D6 showcase: syncopated percussive comping, rubber tangents striking real strings, and expressive wah-wah filtering.", "Clavinet D6 Funk")}
            {video_card("_v2exWrsGOc", "Booker T. &amp; The M.G.s: Green Onions", "Legendary Stax Records performance demonstrating the Hammond M3/B3 tonewheel organ paired with a rotating Leslie speaker cabinet.", "Hammond &amp; Leslie")}
        </div>
    </div>

    <!-- 6. GUIDED EXAM HOMEWORK & REVISION PACK (3 GUIDED ASSIGNMENTS) -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <span style="color: {PURPLE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Guided Exam Homework &amp; Comprehensive Study Pack</span>
                <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
            </div>
            <a href="https://app.musictechguru.com/downloads/homework/homework-classic-keyboards.html" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #7e22ce 0%, #a855f7 100%); color: #ffffff; padding: 7px 16px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(126,34,206,0.35);">
                📥 Open / Print PDF Homework Pack
            </a>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Three classroom-ready exam practice tasks, mark schemes, and technical listening exercises aligned directly with the Edexcel Component 3 Question 5 specification.</p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {resource_card("Guided Assignment 1", PURPLE, "HW 1: Mellotron vs. Modern Digital Samplers (8 Marks)", "Compare physical 3/8&quot; magnetic tape strips, pinch roller capstan drive, and 8-second spring rewind against digital PCM RAM sampling. Explain why mechanical tape flutter and wow defined 1960s psychedelic rock arrangements.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-mellotron/", "Explore Assignment 1")}
            {resource_card("Guided Assignment 2", CYAN, "HW 2: Rhodes vs. Wurlitzer: Transduction Shootout (10 Marks)", "Evaluate the mechanical and acoustic differences between Rhodes tines/tonebars (electromagnetic pickup) and Wurlitzer reeds (electrostatic pickup). Contrast their dynamic frequency responses and explain why Rhodes suits smooth jazz-funk while Wurlitzer cuts through aggressive rock.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/electric-piano/", "Explore Assignment 2")}
            {resource_card("Guided Assignment 3", AMBER, "HW 3: Clavinet, Hammond B3 &amp; Leslie in 1970s Production (12 Marks)", "Explain how rubber tangents striking real guitar strings made the Clavinet the ultimate percussive funk weapon when paired with a wah-wah pedal. Analyze the Hammond 9-drawbar additive system, key click, and how a Leslie rotating Doppler speaker creates spatial depth.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-clavinet/", "Explore Assignment 3")}
        </div>
    </div>

    <!-- 7. FEATURED COMPONENT 2 COURSEWORK CALLOUT -->
    <div style="margin-bottom: 45px; background: linear-gradient(135deg, #1e1b38 0%, {CARD} 100%); border: 1px solid rgba(192,132,252,0.3); border-radius: 18px; padding: 28px; box-shadow: 0 12px 35px rgba(0,0,0,0.4);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: center;">
            <div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
                    <img src="https://www.musictechguru.com/wp-content/uploads/2017/10/Component-2.png" alt="Component 2 Sequencing, Sampling &amp; Synthesis" style="width: 100%; height: auto; display: block; border-radius: 12px;">
                </div>
            </div>
            <div>
                <span style="background: rgba(192,132,252,0.15); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.3); font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">
                    Component 2 NEA Audio Programming
                </span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 10px 0 8px 0; line-height: 1.25;">
                    Emulating Vintage Keyboards in Modern DAWs
                </h3>
                <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.6; margin: 0 0 18px 0;">
                    For your Component 2 Technology Composition, use Logic Pro's <strong style="color: #ffffff;">Vintage Clav</strong>, <strong style="color: #ffffff;">Vintage B3</strong>, and <strong style="color: #ffffff;">Vintage Electric Piano</strong> to recreate classic keyboard textures. Always insert guitar amp simulations (Fender Twin or Tweed), analog phasers (Small Stone), and tape saturation to recreate authentic mechanical warmth and avoid digital sterility.
                </p>
                <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/" style="background: {PURPLE}; color: #080e1a; font-weight: 800; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-block;">
                    Explore Component 2 Coursework Hub &rarr;
                </a>
            </div>
        </div>
    </div>

    <!-- 8. BOTTOM NAVIGATION (CLEAN & CENTERED) -->
    <div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 16px; padding: 24px; text-align: center;">
        <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
            Explore the complete Edexcel A-Level Music Technology Component 3 revision suite:
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="background: rgba(192,132,252,0.15); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.3); padding: 12px 24px; border-radius: 9999px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                &larr; Back to Component 3 Hub
            </a>
            <a href="https://app.musictechguru.com" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 12px 24px; border-radius: 9999px; font-weight: 600; font-size: 14px; text-decoration: none;">
                Go to Revision App &rarr;
            </a>
        </div>
    </div>

</div>'''

def update_page(page_id, title=None, is_post=False):
    endpoint = f"posts/{page_id}" if is_post else f"pages/{page_id}"
    url = f"https://www.musictechguru.com/wp-json/wp/v2/{endpoint}"
    payload = {"content": generate_page_content()}
    if title:
        payload["title"] = title
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method="POST", headers={
        "Content-Type": "application/json",
        "Authorization": f"Basic {B64_AUTH}",
        "User-Agent": "Mozilla/5.0"
    })
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
    item_type = "Post" if is_post else "Page"
    print(f"SUCCESS: {item_type} ID {page_id} updated! Link: {res.get('link')}")

def main():
    print("Deploying classic keyboards payload to WordPress...")
    # Update Page ID 236757 (The Mellotron)
    update_page(236757, "The Mellotron &amp; Classic Electro-Mechanical Keyboards")
    # Update Page ID 297825 (The Electric Piano)
    update_page(297825, "The Electric Piano &amp; Classic Electro-Mechanical Keyboards")
    # Update Page ID 297826 (The Clavinet)
    update_page(297826, "The Clavinet &amp; Classic Electro-Mechanical Keyboards")
    # Update Post ID 236760 (Electric Organ)
    update_page(236760, "Electric Organ &amp; Classic Electro-Mechanical Keyboards", is_post=True)

if __name__ == "__main__":
    main()
