import urllib.request, json, base64

WP_PAGE_ID = 236814
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
AUTH_STR = "musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u"
B64_AUTH = base64.b64encode(AUTH_STR.encode()).decode()

html_content = """<div id="mtg-dark-theme-wrapper" style="background: #060d0a; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1040px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="background: linear-gradient(135deg, #0f2018 0%, #060d0a 100%); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 12px 35px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
        <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); padding: 4px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            1960s to 1980s &bull; Edexcel Component 3: Music in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(28px, 4vw, 38px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2; letter-spacing: -0.5px;">
            Reggae, Dub, Ska &amp; Rocksteady <span style="color: #10b981; font-size: 0.85em;">&amp; Studio Tech</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0; line-height: 1.6; max-width: 820px;">
            The One Drop drum groove, offbeat guitar skank, sub-bass sculpting, Roland Space Echo tape delay loops, spring reverb splatters, and King Tubby's mixing desk alchemy.
        </p>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #10b981; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Core Technical Pillars</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); display: grid; gap: 16px;">
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">01 &bull; Rhythm Section</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">The One Drop &amp; Skank</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Carlton Barrett's empty beat 1 with kick and snare rim-shot hitting together on beat 3; staccato clean guitar chops on offbeats; 16th-note bubble organ; syncopated bass ostinatos.</p>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">02 &bull; Studio Capture</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Kingston Studios &amp; Tape</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Close miking in deadened booths, 4-track tape bouncing at Lee Perry's Black Ark generating rich tape compression, and Island Records' crossover multitrack polish in London.</p>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">03 &bull; Key Processing</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">Space Echo &amp; Spring Splatter</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">Roland RE-201 tape delay with multi-head rhythmic taps and self-oscillating feedback; Fisher spring reverb tanks physically struck for explosive thunderclaps.</p>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 20px; border-left: 4px solid #10b981;">
                <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">04 &bull; Mixing Philosophy</span>
                <strong style="color: #ffffff; font-size: 16px; display: block; margin: 4px 0 6px 0;">The Console as Instrument</strong>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">King Tubby's custom straight-line fader drops, Big Knob high-pass filter sweeps, radical 40–90 Hz sub-bass carving, and acetate dubplates for sound system dances.</p>
            </div>
        </div>
    </div>

    <!-- 3. INTERACTIVE 13-SLIDE PRESENTATION DECK -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></span>
                <strong style="color: #ffffff; font-size: 15px; letter-spacing: 0.5px;">Interactive Study Presentation Deck</strong>
            </div>
            <span style="color: #94a3b8; font-size: 12.5px;">13 Interactive Slides &bull; Audio-Visual Guide</span>
        </div>
        <div style="position: relative; width: 100%; height: 680px; background: #0c1813; border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-reggae?v=1" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
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
        <div style="position: relative; width: 100%; min-height: 650px; background: #0c1813; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 16px 45px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/reggae-interactive-quiz?v=1" style="width: 100%; height: 650px; border: none;" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- 5. CURATED LISTENING LOUNGE (4 LANDMARK TRACKS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: #10b981; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Curated Listening Lounge &bull; Landmark Productions</span>
            <div style="height: 1px; flex: 1; background: rgba(255, 255, 255, 0.08);"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px;">
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/QBeNlUG0Vyc" title="Bob Marley - Exodus" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">Bob Marley &amp; The Wailers</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Exodus (1977)</span>
                </div>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/XHANusHem7E" title="Augustus Pablo & King Tubby - Rockers Uptown" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">King Tubby &amp; Augustus Pablo</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Rockers Uptown (1974)</span>
                </div>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/dMHb62VqtN4" title="The Congos & Lee Perry - Fisherman" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">The Congos (Lee Perry)</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Fisherman (1977)</span>
                </div>
            </div>
            <div style="background: #0c1813; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 12px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/RZ2oXzrnti4" title="The Specials - Ghost Town" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #ffffff; font-size: 14px;">The Specials (2-Tone)</strong>
                    <span style="color: #10b981; font-size: 11.5px; font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Ghost Town (1981)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6. RETURN HUB NAVIGATION CARD -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #0f2018 0%, #060d0a 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Explore More Musical Genres &amp; Eras</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">
            Continue your Component 3 revision by exploring other seminal musical movements, production eras, and technological milestones.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: #10b981; color: #ffffff; font-weight: 700; font-size: 13.5px; padding: 10px 22px; border-radius: 50px; text-decoration: none; transition: transform 0.2s ease;">
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
    print("WordPress Reggae Page Updated Successfully! ID:", res.get('id'), "Status:", res.get('status'))
