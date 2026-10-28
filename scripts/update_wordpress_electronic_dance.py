import urllib.request, json, base64

WP_PAGE_ID = 236841
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #060713; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #0e1333 0%, #060713 100%); border: 1px solid rgba(0, 193, 240, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(0, 193, 240, 0.12); color: #38bdf8; border: 1px solid rgba(0, 193, 240, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Late 1970s to Present &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Electronic &amp; Dance Music <span style="color: #00C1F0; font-size: 0.85em;">&amp; Studio Production</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 840px;">
            From German synthesizer experimentalism and Chicago House to the Roland TB-303 Acid explosion, Detroit machine soul, UK Jungle Amen break timestretching, Trance Supersaws, and modern Festival EDM sidechain dynamics.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #00C1F0; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #00C1F0;">
                <span style="color: #00C1F0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Drum Machine Rhythms</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">TR-808 &amp; TR-909 Architecture</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Unrelenting 4-to-the-floor kicks, snappy analog snares, and 6-bit digital PCM metallic open hi-hats hitting the offbeats ('and' of every beat) synchronized via MIDI and DIN sync.</p>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #6366f1;">
                <span style="color: #818cf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Synthesis &amp; Modulation</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">TB-303 Squelch &amp; JP-8000 Supersaw</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Pushing the TB-303 18 dB/oct resonant filter into screaming self-oscillation for Acid House, and stacking 7 detuned sawtooth waves on the Roland JP-8000 for uplifting trance leads.</p>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #22c55e;">
                <span style="color: #4ade80; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Digital Sampler Science</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Akai S950 &amp; Amen Break Slicing</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Chopping The Winstons' 'Amen Brother' breakbeat in Akai S950/S1000 samplers, pitching up to 160–175 BPM, and exploiting granular timestretching artifacts for UK Jungle and D&amp;B.</p>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #ec4899;">
                <span style="color: #f472b6; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Dynamics &amp; Arrangement</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Sidechain Ducking &amp; The Drop</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Routing 4-on-the-floor kicks into compressor sidechain inputs to duck synth pads and create rhythmic pumping; HPF sweeps, accelerating snare rolls, and pre-drop silence.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE 13-SLIDE PRESENTATION DECK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #00C1F0; border-radius: 50%; box-shadow: 0 0 8px #00C1F0;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Interactive Study Presentation Deck</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">13 Interactive Slides &bull; Audio-Visual Guide</span>
        </div>
        <div style="position: relative; width: 100%; height: 680px; background: #0c0f24; border: 1px solid rgba(0, 193, 240, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-dance?v=2" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 4. EDEXCEL COMPONENT 3 SPECIFICATION QUIZ -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 8px #6366f1;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Edexcel Component 3 Exam Specification Quiz</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">12 Multiple Choice Questions &bull; Instant Feedback</span>
        </div>
        <div style="position: relative; width: 100%; min-height: 650px; background: #0c0f24; border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/dance-interactive-quiz?v=1" style="width: 100%; height: 650px; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 5. CURATED LISTENING LOUNGE (4 LANDMARK TRACKS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #00C1F0; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark Productions</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/D_8Pma1vHmw" title="Kraftwerk - The Robots" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Kraftwerk</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">The Robots (1978)</span>
                </div>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/LOLE1YE_oFQ" title="Frankie Knuckles - Your Love" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Frankie Knuckles</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">Your Love (1987)</span>
                </div>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/wmin5WkOuPw" title="The Prodigy - Firestarter" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">The Prodigy</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">Firestarter (1996)</span>
                </div>
            </div>
            <div style="background: #0c0f24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/K0HSD_i2DvA" title="Daft Punk - Around the World" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Daft Punk</strong>
                    <span style="color: #00C1F0; font-size: 11.5px; font-weight: 700; background: rgba(0,193,240,0.12); padding: 3px 8px; border-radius: 6px;">Around the World (1997)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #0e1333 0%, #060713 100%); border: 1px solid rgba(0, 193, 240, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #00C1F0; color: #060713; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
                &larr; Return to Component 3 Hub
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/urban-hip-hop/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.15);">
                &larr; Previous Era: Urban &amp; Hip Hop
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
    print("WordPress Electronic & Dance Music Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
