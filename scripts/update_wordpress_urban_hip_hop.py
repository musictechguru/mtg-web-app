import urllib.request, json, base64

WP_PAGE_ID = 236839
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #08070d; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #1c130b 0%, #08070d 100%); border: 1px solid rgba(249, 115, 22, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            1970s to Present &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Urban &amp; Hip Hop <span style="color: #f97316; font-size: 0.85em;">&amp; Studio Production</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 820px;">
            Turntablism, E-mu SP-1200 12-bit sample chopping, Akai MPC swing, Roland TR-808 sub-bass, West Coast G-Funk, and modern VST Trap production.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #f97316; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f97316;">
                <span style="color: #f97316; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Turntablism &amp; Sampling</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Breaks &amp; 12-Bit Hardware</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Technics SL-1200 direct-drive turntables (Kool Herc's 'Merry-Go-Round'), E-mu SP-1200 12-bit/26kHz crunchy sampling, and Akai MPC60 16-pad unquantized swing.</p>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f97316;">
                <span style="color: #f97316; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Studio Capture</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Crates &amp; Vocal Proximity</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Sampling vinyl at 45 RPM and pitching down to save memory; close-mic rap vocals (Shure SM7B, Neumann U87) with heavy 1176 compression, doubled takes, and panned ad-libs.</p>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f97316;">
                <span style="color: #f97316; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Key Processing</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Bass Filtering &amp; Sidechain</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Low-pass filtering samples (~120 Hz) to isolate vinyl basslines; sidechain ducking on sub-bass under acoustic kick hits; tape flanging on guitar riffs (Ice Cube).</p>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #f97316;">
                <span style="color: #f97316; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Sub-Bass &amp; Synthesis</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">TR-808 &amp; G-Funk Leads</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Roland TR-808 bridged-T resonant circuit tuned into sustained sub-bass; Dr. Dre's gliding Minimoog high-sine leads; modern VST plugins (Omnisphere/Nexus) and 808 pitch glides.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE 13-SLIDE PRESENTATION DECK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #f97316; border-radius: 50%; box-shadow: 0 0 8px #f97316;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Interactive Study Presentation Deck</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">13 Interactive Slides &bull; Audio-Visual Guide</span>
        </div>
        <div style="position: relative; width: 100%; height: 680px; background: #110f1c; border: 1px solid rgba(249, 115, 22, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-hiphop?v=1" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 4. EDEXCEL COMPONENT 3 SPECIFICATION QUIZ -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; box-shadow: 0 0 8px #f59e0b;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Edexcel Component 3 Exam Specification Quiz</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">12 Multiple Choice Questions &bull; Instant Feedback</span>
        </div>
        <div style="position: relative; width: 100%; min-height: 650px; background: #110f1c; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/hiphop-interactive-quiz?v=1" style="width: 100%; height: 650px; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 5. CURATED LISTENING LOUNGE (4 LANDMARK TRACKS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #f97316; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark Productions</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/mcCK99wHrk0" title="Sugarhill Gang - Rapper's Delight" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Sugarhill Gang</strong>
                    <span style="color: #f97316; font-size: 11.5px; font-weight: 700; background: rgba(249,115,22,0.12); padding: 3px 8px; border-radius: 6px;">Rapper's Delight (1979)</span>
                </div>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/4B_UYYPb-Gk" title="Run-D.M.C. - Walk This Way" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Run-D.M.C.</strong>
                    <span style="color: #f97316; font-size: 11.5px; font-weight: 700; background: rgba(249,115,22,0.12); padding: 3px 8px; border-radius: 6px;">Walk This Way (1986)</span>
                </div>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/h4UqMyldS7Q" title="Ice Cube - It Was A Good Day" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Ice Cube</strong>
                    <span style="color: #f97316; font-size: 11.5px; font-weight: 700; background: rgba(249,115,22,0.12); padding: 3px 8px; border-radius: 6px;">It Was A Good Day (1992)</span>
                </div>
            </div>
            <div style="background: #110f1c; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/_CL6n0FJZpk" title="Dr. Dre ft. Snoop Dogg - Still D.R.E." allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Dr. Dre ft. Snoop Dogg</strong>
                    <span style="color: #f97316; font-size: 11.5px; font-weight: 700; background: rgba(249,115,22,0.12); padding: 3px 8px; border-radius: 6px;">Still D.R.E. (1999)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #1c130b 0%, #08070d 100%); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #f97316; color: #08070d; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
                &larr; Return to Component 3 Hub
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/commercial-pop/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 10px 20px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.15);">
                &larr; Previous Era: Commercial Pop
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
    print("WordPress Urban Hip Hop Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
