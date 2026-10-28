import urllib.request, json, base64

WP_PAGE_ID = 236827
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #070b14; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #0d1527 0%, #070b14 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            1960–1975 &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Soul &amp; Motown <span style="color: #f59e0b; font-size: 0.85em;">&amp; Recording Tech</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 820px;">
            Direct Injection bass tracking, the Hitsville attic echo chamber, gospel-rooted vocal arrangements, driving backbeat tambourines, and 1970s synthesizer soul innovations.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #f59e0b; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px;">
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f59e0b;">
                <span style="color: #f59e0b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Instrumentation</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Rhythm, Horns &amp; Keys</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Fender Precision Bass (flatwound strings &amp; foam mute), Wurlitzer 200A electric piano with tremolo, Hammond B3 organ with Leslie speaker, Hohner Clavinet D6, and tight staccato horn sections (trumpets, tenor/baritone sax).</p>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f59e0b;">
                <span style="color: #f59e0b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Studio Capture</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Direct Injection (DI) Era</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Custom 5-channel DI boxes eliminating basement spill in Motown's "Snakepit", heavily damped snare drums (wallets/tape) for a dry, focused transient thud, and open live room cinema acoustics at Stax in Memphis.</p>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f59e0b;">
                <span style="color: #f59e0b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Key Processing</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Attic Chambers &amp; AM EQ</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Hitsville attic acoustic echo chamber (speaker send / KM86 mic return), custom inductor graphic EQs boosting 200–500Hz punch &amp; 3–5kHz presence for car radios, and bus limiting for high average loudness.</p>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f59e0b;">
                <span style="color: #f59e0b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Landmark Studios</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Detroit to Memphis</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Hitsville U.S.A. (Studio A), Stax Records (Memphis), FAME Studios (Muscle Shoals), and Electric Lady (NYC). Key artists: The Supremes, Marvin Gaye, Aretha Franklin, Otis Redding, and Stevie Wonder.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE PRESENTATION SLIDE DECK -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: #f59e0b; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Interactive Study Deck</span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                    Soul &amp; Motown: Specification Presentation
                </h3>
            </div>
            <div style="color: #94a3b8; font-size: 13px;">
                13 Interactive Revision Slides &bull; Audio/Video References
            </div>
        </div>
        <div style="position: relative; width: 100%; min-height: 640px; height: 680px; overflow: hidden; border-radius: 14px; border: 1px solid rgba(245, 158, 11, 0.35); box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #070b14;">
            <iframe src="https://app.musictechguru.com/interactive-slide-soul?v=1" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen="true" allow="fullscreen"></iframe>
        </div>
    </div>

    <!-- 4. INTERACTIVE KNOWLEDGE CHECK QUIZ -->
    <div style="margin-bottom: 50px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: #00C1F0; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Formative Assessment</span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                    Interactive Knowledge Check Quiz
                </h3>
            </div>
            <div style="color: #94a3b8; font-size: 13px;">
                12 Exam-Style Questions &bull; Instant Feedback &amp; Examiner Tips
            </div>
        </div>
        <div style="position: relative; width: 100%; min-height: 720px; height: 760px; overflow: hidden; border-radius: 14px; border: 1px solid rgba(0, 193, 240, 0.35); box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #070b14;">
            <iframe src="https://app.musictechguru.com/soul-interactive-quiz?v=1" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen="true" allow="fullscreen"></iframe>
        </div>
    </div>

    <!-- 5. CURATED VIDEO LISTENING LOUNGE -->
    <div style="margin-bottom: 40px;">
        <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: -0.5px;">
            Curated Listening Lounge &bull; Landmark Recordings
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/6FOUqQt3Kg0" title="Aretha Franklin - Respect" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Aretha Franklin</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">Respect (1967)</span>
                </div>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/wEBlaMOmKV4" title="Sam Cooke - A Change Is Gonna Come" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Sam Cooke</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">A Change Is Gonna Come</span>
                </div>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/H-kA3UtBj4M" title="Marvin Gaye - What's Going On" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Marvin Gaye</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">What's Going On (1971)</span>
                </div>
            </div>
            <div style="background: #0d1527; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/rTVjnBo96Ug" title="Otis Redding - (Sittin' On) The Dock of the Bay" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Otis Redding</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">Dock of the Bay (1968)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #0d1527 0%, #070b14 100%); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #00C1F0; color: #070b14; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
                &larr; Return to Component 3 Hub
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/funk/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.15);">
                Next Era: Funk &rarr;
            </a>
        </div>
    </div>

</div>"""

payload = json.dumps({'content': html_content}).encode('utf-8')
req = urllib.request.Request(
    WP_API_URL,
    data=payload,
    headers={
        'Authorization': f'Basic {B64_AUTH}',
        'Content-Type': 'application/json'
    },
    method='POST'
)

with urllib.request.urlopen(req) as resp:
    res = json.load(resp)
    print("WordPress Soul Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
