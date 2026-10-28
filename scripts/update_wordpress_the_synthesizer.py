import urllib.request, json, base64

WP_PAGE_ID = 298025
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
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
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/{vid}" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                    <strong style="color: #ffffff; font-size: 15px; line-height: 1.3;">{title}</strong>
                    <span style="background: rgba(192,132,252,0.12); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.3); font-size: 10.5px; font-weight: 800; padding: 3px 8px; border-radius: 6px; white-space: nowrap;">{badge}</span>
                </div>
                <p style="color: #94a3b8; font-size: 12.5px; line-height: 1.55; margin: 0;">{description}</p>
            </div>'''

def resource_card(tag, color, title, desc, link, link_text):
    return f'''<div style="background: {CARD}; border: 1px solid {BORDER}; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid {color}; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <div>
                    <span style="color: {color}; font-size: 10.5px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase;">{tag}</span>
                    <h4 style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 8px 0 10px 0;">{title}</h4>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.55; margin: 0 0 18px 0;">{desc}</p>
                </div>
                <a href="{link}" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.05); color: #ffffff; border: 1px solid rgba(255,255,255,0.12); padding: 9px 16px; border-radius: 8px; font-size: 12.5px; font-weight: 700; text-decoration: none; transition: all 0.2s ease;">
                    <span>{link_text}</span> &rarr;
                </a>
            </div>'''

def embed(border_color, accent, title, subtitle, url, height):
    iframe_id = f"frame_{abs(hash(url))}"
    return f'''<div style="margin-bottom: 45px; background: {CARD}; border: 1px solid {border_color}; border-radius: 18px; padding: 22px; box-shadow: 0 12px 35px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: {accent}; box-shadow: 0 0 10px {accent};"></span>
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
        <script>
        (function(){{
            var el = document.getElementById('{iframe_id}');
            if (el && (!el.getAttribute('src') || el.getAttribute('src') === 'about:blank')) {{
                el.src = '{url}';
            }}
        }})();
        </script>
    </div>'''

def main():
    content = f'''<div id="mtg-dark-theme-wrapper" style="background: {BG}; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 1100px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. HERO BANNER -->
    <div style="margin-bottom: 24px;">
        <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; color: #94a3b8; text-decoration: none; font-size: 13.5px; font-weight: 600; padding: 6px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 50px;">
            <span>&larr;</span> Back to Component 3 Hub
        </a>
    </div>

    <div style="background: linear-gradient(135deg, #181126 0%, {CARD} 100%); border: 1px solid rgba(192, 132, 252, 0.35); border-radius: 20px; padding: 36px 32px; margin-bottom: 35px; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
        <div style="display: inline-block; background: rgba(192, 132, 252, 0.15); color: {PURPLE}; border: 1px solid rgba(192, 132, 252, 0.35); padding: 5px 14px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
            Electronic Instruments &bull; Edexcel Component 3 &bull; Music Technology in Context
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(30px, 4.5vw, 42px); font-weight: 900; margin: 0 0 12px 0; line-height: 1.2;">
            The Synthesizer <span style="color: {PURPLE};">&amp; Sound Synthesis</span>
        </h1>
        <p style="color: #94a3b8; font-size: 16px; margin: 0 0 20px 0; line-height: 1.6; max-width: 880px;">
            From modular patch bays and voltage-controlled analog circuits to polyphonic microprocessor patch memory and digital FM operators: the technology that redefined 20th and 21st-century music production.
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 12px; color: #cbd5e1;">&#8226; Subtractive &amp; FM Synthesis</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 12px; color: #cbd5e1;">&#8226; Minimoog &amp; Prophet-5</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 12px; color: #cbd5e1;">&#8226; Yamaha DX7 &amp; MIDI Protocol</span>
            <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 12px; color: #cbd5e1;">&#8226; Component 3 Exam Focus: Q5 &amp; Section B</span>
        </div>
    </div>

    <!-- 2. FOUR TECHNICAL PRODUCTION PILLARS -->
    <div style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); display: grid; gap: 16px; margin-bottom: 40px;">
        {pillar(PURPLE, "01 &bull; Subtractive Flow", "VCO &rarr; VCF &rarr; VCA Architecture", "Raw harmonically rich waveforms (Sawtooth with all harmonics, Square with odd harmonics) pass through a 24dB/octave resonant low-pass filter to sculpt timbre, amplified dynamically at the VCA output.")}
        {pillar(CYAN, "02 &bull; Dynamic Modulation", "ADSR Envelopes &amp; LFO Sweeps", "4-stage Envelope Generators (Attack, Decay, Sustain voltage level, Release) shape volume over time and filter sweep contour. Sub-audible LFOs (&lt;20 Hz) modulate pitch vibrato, filter cutoff wobble, and amplitude tremolo.")}
        {pillar(EMERALD, "03 &bull; Polyphony &amp; Memory", "Minimoog to Prophet-5 &amp; MIDI", "The 1970 Minimoog established hardwired normalization. In 1978, the Sequential Circuits Prophet-5 introduced 5-voice polyphony with Z80 microprocessor patch storage, leading directly to the universal 1983 MIDI 1.0 standard.")}
        {pillar(AMBER, "04 &bull; FM &amp; Acid House", "Yamaha DX7 &amp; Roland TB-303", "FM synthesis uses 6 sine wave operators modulating each other at audio rates (Modulator into Carrier) to produce crystalline digital electric pianos and bells without analog filters. The TB-303 diode ladder and slide sparked Acid House.")}
    </div>

    <!-- 3. INTERACTIVE 15-SLIDE PRESENTATION DECK -->
    {embed("rgba(192,132,252,0.35)", PURPLE, "Interactive Curriculum Slide Deck &bull; The Synthesizer &amp; Sound Synthesis", "15 Comprehensive Slides &bull; 25 Technical Photographs &amp; Schematics &bull; Lightbox Image Inspection", "https://app.musictechguru.com/interactive-slide-the-synthesizer?v=20261028", 680)}

    <!-- 4. SPECIFICATION QUIZ -->
    {embed("rgba(56,189,248,0.35)", CYAN, "Interactive Specification Quiz &bull; The Synthesizer &amp; Sound Synthesis", "10 Edexcel Component 3 Specification Questions &bull; Real-Time Feedback &amp; Examiner Explanations", "https://app.musictechguru.com/the-synthesizer-interactive-quiz?v=20261028", 640)}

    <!-- 5. HISTORICAL STUDIO & TECHNICAL DEMONSTRATIONS (VIDEOS) -->
    <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {PURPLE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Technical Video Masterclasses &bull; Authentic Music Tech Guru Tutorials</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 20px;">
            {video_card("LUjKWcpvU6c", "Subtractive Synthesis Lesson 1: Introduction", "Music Tech Guru masterclass breaking down the core fundamentals of subtractive sound design: oscillators, harmonic spectra, filter resonance, and signal flow.", "Synthesis Fundamentals")}
            {video_card("tBrkY4mQ_D4", "How to Use Retro Synth in Logic Pro X", "Comprehensive walkthrough of subtractive, wavetable, and FM sound design inside Logic Pro X Retro Synth, illustrating parameter manipulation in a modern DAW.", "DAW Sound Design")}
            {video_card("olkaItQbSZ4", "Synthesis Lesson 2: Iconic Bass Sound Design", "Step-by-step tutorial reconstructing a punchy dance bass patch using oscillator detuning, tight filter decay envelopes, and sub-octave warmth.", "Bass Patch Design")}
            {video_card("PTxVKjsXPOs", "Synthesis Lesson 3: The Kernkraft Riff &amp; Leads", "Advanced lead synth programming: configuring envelope release sustain, filter cutoff keytracking, and portamento glide settings for maximum hook cut.", "Lead Programming")}
        </div>
    </div>

    <!-- 6. GUIDED EXAM HOMEWORK & REVISION PACK (3 GUIDED ASSIGNMENTS) -->
    <div style="margin-bottom: 45px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
            <span style="color: {PURPLE}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Guided Exam Homework &amp; Comprehensive Study Pack</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.08);"></div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Three classroom-ready exam practice tasks, mark schemes, and technical listening exercises aligned directly with the Edexcel Component 3 Question 5 specification.</p>
        <div style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); display: grid; gap: 18px;">
            {resource_card("Guided Assignment 1", PURPLE, "HW 1: Subtractive Architecture &amp; The Minimoog (8 Marks)", "Analyze the VCO &rarr; VCF &rarr; VCA signal path, 24dB ladder filter resonance self-oscillation, and how Stevie Wonder and Kraftwerk utilized normalized monosynths for iconic basslines.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/", "Explore Assignment 1")}
            {resource_card("Guided Assignment 2", CYAN, "HW 2: Monophonic to Polyphonic &amp; Prophet-5 (10 Marks)", "Evaluate the voice card allocation challenge, Zilog Z80 microprocessor patch memory, and the shift from monophonic leads to lush polyphonic pads in 1980s pop production.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/", "Explore Assignment 2")}
            {resource_card("Guided Assignment 3", AMBER, "HW 3: Yamaha DX7, FM Synthesis &amp; MIDI (12 Marks)", "Contrast analog subtractive filtering against digital FM carrier/modulator operators, explain the 31.25 kbaud 5-pin DIN protocol, and assess the impact on computer sequencing.", "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/", "Explore Assignment 3")}
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
                <div style="display: inline-block; background: rgba(192,132,252,0.15); color: {PURPLE}; border: 1px solid rgba(192,132,252,0.35); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 10px;">
                    Coursework NEA Masterclass
                </div>
                <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; line-height: 1.3;">
                    Component 2: Sequencing, Sampling &amp; Synthesis Guide
                </h3>
                <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.6; margin: 0 0 16px 0;">
                    Fulfill examiner criteria for your Edexcel coursework brief: create original subtractive and FM synthesizer patches, program expressive modulation wheels, and document your sound design in the written commentary.
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #c084fc, #9333ea); color: #ffffff; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(192,132,252,0.35);">
                        <span>Component 2 Coursework Hub</span> &rarr;
                    </a>
                    <a href="https://www.musictechguru.com/homepage/music-tech-tutor/" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.06); color: #ffffff; font-size: 13px; font-weight: 600; padding: 12px 20px; border-radius: 10px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">
                        <span>1-on-1 Specialist Tuition</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- 8. BOTTOM NAVIGATION -->
    <div style="margin-top: 40px; padding: 28px 24px; background: linear-gradient(135deg, #181126 0%, {BG} 100%); border: 1px solid rgba(192,132,252,0.3); border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0; font-weight: 700;">Continue Your Instrumental &amp; Historical Revision</h4>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0; max-width: 620px; margin-left: auto; margin-right: auto;">Master each technological development across Component 3 from synthesizers and modular systems through recording consoles and multitrack tape.</p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; background: {PURPLE}; color: #080e1a; font-weight: 800; font-size: 13.5px; padding: 11px 24px; border-radius: 50px; text-decoration: none;">&larr; Back to Component 3 Hub</a>
            <a href="https://app.musictechguru.com/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); color: #ffffff; font-weight: 600; font-size: 13.5px; padding: 11px 22px; border-radius: 50px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">Go to Revision App &rarr;</a>
        </div>
    </div>

</div>'''

    print(f"Deploying complete 'all the trimmings' payload to WordPress Page ID {WP_PAGE_ID}...")
    req = urllib.request.Request(
        WP_API_URL,
        headers={"Authorization": f"Basic {B64_AUTH}", "Content-Type": "application/json"},
        data=json.dumps({"content": content}).encode("utf-8")
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(f"SUCCESS: Page ID {WP_PAGE_ID} updated successfully!")
        print("Live URL:", res.get("link"))

if __name__ == "__main__":
    main()
