import urllib.request, json, base64

WP_PAGE_ID = 236833
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #08060f; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #120d24 0%, #08060f 100%); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Late 1960s to 1980s &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Funk &amp; Disco-Funk <span style="color: #a855f7; font-size: 0.85em;">&amp; Recording Tech</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 820px;">
            The 'One' downbeat, percussive slap bass, envelope filter wah guitars, tight drum damping, Minimoog synth bass, and horn section punches.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #10b981; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px;">
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Instrumentation</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Syncopated Rhythm Section</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Fender Jazz &amp; Precision Bass (slap and fingerstyle), Clavinet D6 with wah-wah, Fender Rhodes, brass sections (trumpets, tenors, trombones), and tightly damped drum kits.</p>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Studio Capture</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Dead &amp; Punchy Isolation</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Heavily damped drums (tea towels, wallet on snare) tracked in tight, deadened rooms. Multi-mic brass captured in tight unison; DI electric bass blended with tube amp mic.</p>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Key Processing</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Mu-Tron &amp; Analog Phase</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Envelope filters (Mu-Tron III), Morley and Cry Baby wah pedals, MXR Phase 90 on rhythm guitars and Clavinets, snappy VCA compression on drum busses.</p>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Landmark Artists</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Funk Royalty</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">James Brown, Sly &amp; The Family Stone, Parliament-Funkadelic, Chic, Earth, Wind &amp; Fire, Herbie Hancock. Masterminded by George Clinton, Bootsy Collins, and Nile Rodgers.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE PRESENTATION SLIDE DECK -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: #a855f7; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Interactive Study Deck</span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                    Funk &amp; Disco-Funk: Specification Presentation
                </h3>
            </div>
            <div style="color: #94a3b8; font-size: 13px;">
                13 Interactive Revision Slides &bull; Audio/Video References
            </div>
        </div>
        <div style="position: relative; width: 100%; min-height: 640px; height: 680px; overflow: hidden; border-radius: 14px; border: 1px solid rgba(168, 85, 247, 0.35); box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #08060f;">
            <iframe src="https://app.musictechguru.com/interactive-slide-funk?v=1" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen="true" allow="fullscreen"></iframe>
        </div>
    </div>

    <!-- 4. INTERACTIVE KNOWLEDGE CHECK QUIZ -->
    <div style="margin-bottom: 50px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
                <span style="color: #10b981; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Formative Assessment</span>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                    Interactive Knowledge Check Quiz
                </h3>
            </div>
            <div style="color: #94a3b8; font-size: 13px;">
                12 Exam-Style Questions &bull; Instant Feedback &amp; Examiner Tips
            </div>
        </div>
        <div style="position: relative; width: 100%; min-height: 720px; height: 760px; overflow: hidden; border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.35); box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #08060f;">
            <iframe src="https://app.musictechguru.com/funk-interactive-quiz?v=1" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen="true" allow="fullscreen"></iframe>
        </div>
    </div>

    <!-- 5. CURATED VIDEO LISTENING LOUNGE -->
    <div style="margin-bottom: 40px;">
        <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: -0.5px;">
            Curated Listening Lounge &bull; Landmark Recordings
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/ZNaXb3uuekk" title="James Brown - Sex Machine" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">James Brown</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Sex Machine (1970)</span>
                </div>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/bWurqD68u70" title="Parliament - Flash Light" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Parliament</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Flash Light (1977)</span>
                </div>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/-T9vmaTI2LE" title="Sly & The Family Stone - Thank You" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Sly &amp; The Family Stone</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Thank You (1969)</span>
                </div>
            </div>
            <div style="background: #120d24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/Gs069dndIYk" title="Earth, Wind & Fire - September" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Earth, Wind &amp; Fire</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">September (1978)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #120d24 0%, #08060f 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #a855f7; color: #ffffff; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
                &larr; Return to Component 3 Hub
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/disco/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.15);">
                Next Era: Disco &rarr;
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
    print("WordPress Funk Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
