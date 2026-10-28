import urllib.request, json, base64

WP_PAGE_ID = 296930
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #070814; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #170d2c 0%, #070814 100%); border: 1px solid rgba(192, 132, 252, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(192, 132, 252, 0.12); color: #d8b4fe; border: 1px solid rgba(192, 132, 252, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Chicago 1980s to Global &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            The History of House Music <span style="color: #c084fc; font-size: 0.85em;">&amp; Studio Production</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 840px;">
            <em>"House music is a feeling."</em> The Warehouse Chicago, Roland TR-909 syncopation, Marshall Jefferson piano stabs, TB-303 Acid squelch, Korg M1 Organ 2 bass, and extended 12-inch club mixes.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #c084fc; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #c084fc;">
                <span style="color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Drum Machine Rhythms</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">TR-808 &amp; TR-909 Architecture</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Unrelenting 4-to-the-floor kick, snappy analog snares, and 6-bit digital PCM metallic open hi-hats hitting the offbeats ('and' of every beat) with 57–62% shuffle swing.</p>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #00C1F0;">
                <span style="color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Synths &amp; Workstations</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">TB-303 &amp; Korg M1 Organ 2</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Roland TB-303 18 dB/oct resonant filter squelch, Marshall Jefferson piano triplets, and the legendary Korg M1 Organ 2 preset in lower octaves for punchy club basslines.</p>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #22c55e;">
                <span style="color: #4ade80; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Studio Capture &amp; Splicing</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Atari ST &amp; Fostex Multitracks</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Reel-to-reel tape splicing extending breaks; Atari ST computer running Cubase with built-in MIDI ports slaved to Fostex R8 8-track tape via SMPTE timecode.</p>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f59e0b;">
                <span style="color: #fbbf24; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Sampling &amp; Dynamics</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Akai S900 &amp; Sidechain Pumping</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Chopping disco vocal hooks (Loleatta Holloway) in Akai S900/S1000 samplers, Yamaha SPX90 chorus, and Alesis 3630 sidechain ducking compression.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE 16-SLIDE PRESENTATION DECK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #c084fc; border-radius: 50%; box-shadow: 0 0 8px #c084fc;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Interactive Classroom Presentation Deck</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">16 Interactive Slides &bull; Complete Classroom Deck</span>
        </div>
        <div style="position: relative; width: 100%; height: 680px; background: #0e1124; border: 1px solid rgba(192, 132, 252, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-house?v=2" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 4. EDEXCEL COMPONENT 3 SPECIFICATION QUIZ -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #00C1F0; border-radius: 50%; box-shadow: 0 0 8px #00C1F0;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Edexcel Component 3 Exam Specification Quiz</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">12 Multiple Choice Questions &bull; Instant Feedback</span>
        </div>
        <div style="position: relative; width: 100%; min-height: 650px; background: #0e1124; border: 1px solid rgba(0, 193, 240, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/house-interactive-quiz?v=1" style="width: 100%; height: 650px; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 5. CURATED LISTENING LOUNGE (4 LANDMARK TRACKS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #c084fc; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark House Productions</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/QAR8cq5Bl94" title="Marshall Jefferson - Move Your Body" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Marshall Jefferson</strong>
                    <span style="color: #c084fc; font-size: 11.5px; font-weight: 700; background: rgba(192,132,252,0.12); padding: 3px 8px; border-radius: 6px;">Move Your Body (1986)</span>
                </div>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/LOLE1YE_oFQ" title="Frankie Knuckles - Your Love" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Frankie Knuckles</strong>
                    <span style="color: #c084fc; font-size: 11.5px; font-weight: 700; background: rgba(192,132,252,0.12); padding: 3px 8px; border-radius: 6px;">Your Love (1987)</span>
                </div>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/M0quXl_od3g" title="Black Box - Ride on Time" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Black Box</strong>
                    <span style="color: #c084fc; font-size: 11.5px; font-weight: 700; background: rgba(192,132,252,0.12); padding: 3px 8px; border-radius: 6px;">Ride On Time (1989)</span>
                </div>
            </div>
            <div style="background: #0e1124; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/Ps2Jc28tQrw" title="Robin S - Show Me Love" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Robin S</strong>
                    <span style="color: #c084fc; font-size: 11.5px; font-weight: 700; background: rgba(192,132,252,0.12); padding: 3px 8px; border-radius: 6px;">Show Me Love (1993)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #170d2c 0%, #070814 100%); border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #c084fc; color: #070814; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
                &larr; Return to Component 3 Hub
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/electronic-dance/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.15);">
                &larr; Era Overview: Electronic &amp; Dance
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
    print("WordPress History of House Music Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
