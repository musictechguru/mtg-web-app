#!/usr/bin/env python3
"""
deploy_audit_gaps_and_option_1.py
1. Upgrades WordPress Page 8604 (Component 1: Recording & Mixing) with Interactive Deck, Quiz & App Coursework Toolkit
2. Upgrades WordPress Page 8632 (Component 2: Sequencing, Sampling, Synthesis & Composition) with Interactive Deck, Quiz & App Synth/Sampling Toolkit
3. Upgrades WordPress Page 8494 (A-Level Music Technology Main Hub) with Interactive 4-Component Diagnostic Quiz & Transparent App Pricing/School Packs Section
4. Implements Option 1 ("Single Source of Truth" App Login & Get Pro CTA) in the global WordPress header via widget custom_html-2
"""

import urllib.request
import urllib.parse
import json
import base64
import re

B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()
HEADERS = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

def encode_vc_raw_html(html_str):
    url_encoded = urllib.parse.quote(html_str, safe='')
    b64_encoded = base64.b64encode(url_encoded.encode('utf-8')).decode('utf-8')
    return b64_encoded

def update_wp_page(page_id, new_raw_content, label):
    url = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{page_id}"
    payload = json.dumps({"content": new_raw_content}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=HEADERS, method="POST")
    res = urllib.request.urlopen(req, timeout=20)
    data = json.loads(res.read().decode("utf-8"))
    print(f"SUCCESS [{label}] Page {page_id} updated -> {data.get('link')}")

# ==============================================================================
# 1. UPGRADE PAGE 8604: COMPONENT 1 (RECORDING & MIXING)
# ==============================================================================
def upgrade_component_1():
    with open("scripts/decoded_wp_page_8604.html", "r", encoding="utf-8") as f:
        dec = f.read()
    with open("scripts/backup_wp_page_8604_component-1-recording-mixing.html", "r", encoding="utf-8") as f:
        raw_page = f.read()

    c1_enrichment_block = """
    <!-- INTERACTIVE MASTER DECK: COMPONENT 1 RECORDING & MIXING -->
    <div id="c1-interactive-deck" style="margin-bottom: 36px; background: #0b1120; border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 18px; padding: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 50px; margin-bottom: 6px;">
                    ★ Interactive Studio Master Deck &bull; 10 Slides + 1080p HD Video
                </span>
                <h2 style="color: #ffffff !important; font-size: 24px; font-weight: 800; margin: 0;">
                    Component 1: Recording, Miking &amp; Mixing Master Deck
                </h2>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="https://app.musictechguru.com/interactive-slide-component-1" target="_blank" rel="noopener" style="background: rgba(16, 185, 129, 0.18); border: 1px solid rgba(16, 185, 129, 0.45); color: #34d399 !important; font-size: 12.5px; font-weight: 800; padding: 8px 16px; border-radius: 8px; text-decoration: none;">
                    ⛶ Open Deck in Full Tab &rarr;
                </a>
                <a href="https://app.musictechguru.com/?quiz=tracksheet_creator" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff !important; font-size: 12.5px; font-weight: 800; padding: 8px 16px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);">
                    📋 Launch Track Sheet &amp; Logbook Creator &rarr;
                </a>
            </div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px 0; line-height: 1.55;">
            Step through all 10 stages of a top-band Component 1 production: drum kit miking, kick/snare polarity, 12th-fret acoustic capture, DI box signal routing, vocal pop-shield geometry, the 3:1 rule, noise gating, Abbey Road reverb EQ, and final 16-bit/44.1kHz bounce protocols. Click <strong>Watch in HD (Theater Mode)</strong> on any slide for full-screen Logic Pro walkthroughs.
        </p>
        <div style="width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: #080e1a; box-shadow: 0 12px 32px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-component-1" title="Component 1 Interactive Master Deck" style="width: 100%; height: 760px; border: 0; display: block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- COMPONENT 1 APP COURSEWORK TOOLKIT & LOGBOOK GENERATOR -->
    <div id="c1-app-toolkit" style="margin-bottom: 36px; background: linear-gradient(135deg, #0f172a 0%, #0b192c 100%); border: 1px solid rgba(0, 193, 240, 0.35); border-radius: 18px; padding: 28px; box-shadow: 0 12px 35px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
            <div style="max-width: 680px;">
                <span style="display: inline-block; background: rgba(0, 193, 240, 0.15); color: #00C1F0; border: 1px solid rgba(0, 193, 240, 0.35); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 50px; margin-bottom: 8px;">
                    ⚡ Music Tech Guru Revision App Integration
                </span>
                <h3 style="color: #ffffff !important; font-size: 22px; font-weight: 800; margin: 0 0 8px 0;">
                    Component 1 Coursework Toolkit &amp; Interactive Studio Simulators
                </h3>
                <p style="color: #cbd5e1; font-size: 14px; margin: 0; line-height: 1.55;">
                    Don't lose marks on paperwork or mic placement mistakes. Use our interactive tools inside the <strong>Music Tech Guru App</strong> to generate your Pearson Logbook, practice 3D microphone placement, and test your mixing chains.
                </p>
            </div>
            <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #00C1F0 0%, #2563eb 100%); color: #ffffff !important; font-weight: 800; font-size: 13px; padding: 11px 20px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(0, 193, 240, 0.35); white-space: nowrap;">
                ⭐ Unlock Full Toolkit (£12.99/yr) &rarr;
            </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px;">
            <a href="https://app.musictechguru.com/?quiz=tracksheet_creator" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #34d399; text-transform: uppercase;">Coursework Essential</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">📋 Track Sheet &amp; Logbook Creator</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Generate examiner-ready Component 1 track sheets, mic diagrams, and mixing logs with PDF export.</p>
                </div>
                <span style="color: #34d399; font-size: 12px; font-weight: 800;">Launch Creator in App &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=component1_guide" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #38bdf8; text-transform: uppercase;">Mark Scheme Audit</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">✅ Component 1 Tick-List &amp; Guide</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Interactive pre-submission checklist covering capture quotas, noise floor, EQ, dynamics, and bounce specs.</p>
                </div>
                <span style="color: #38bdf8; font-size: 12px; font-weight: 800;">Open Tick-List in App &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=mic_placement" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #c084fc; text-transform: uppercase;">Interactive Lab</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">🎙️ 3D Microphone Placement Lab</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Practice positioning dynamic, condenser, and ribbon mics on drums, guitars, piano, brass, and vocals.</p>
                </div>
                <span style="color: #c084fc; font-size: 12px; font-weight: 800;">Start Mic Simulator &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=effects_chain" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #fbbf24; text-transform: uppercase;">Signal Routing</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">🎚️ Insert &amp; Aux Mixing Chain Lab</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Master gate -> EQ -> compressor insert ordering and post-fader auxiliary reverb/delay bus routing.</p>
                </div>
                <span style="color: #fbbf24; font-size: 12px; font-weight: 800;">Practice Signal Flow &rarr;</span>
            </a>
        </div>
    </div>

    <!-- INTERACTIVE COMPONENT 1 SPECIFICATION QUIZ -->
    <div id="c1-interactive-quiz" style="margin-bottom: 36px; background: #0b1120; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 18px; padding: 24px; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div>
                <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 3px 10px; border-radius: 50px; margin-bottom: 4px;">
                    Knowledge Check &bull; 10 Specification Questions
                </span>
                <h3 style="color: #ffffff !important; font-size: 21px; font-weight: 800; margin: 0;">
                    Test Your Component 1 Recording &amp; Mixing Knowledge
                </h3>
            </div>
            <a href="https://app.musictechguru.com/component-1-interactive-quiz" target="_blank" rel="noopener" style="color: #38bdf8; font-size: 12.5px; font-weight: 700; text-decoration: none;">
                Open Quiz in Full Screen &rarr;
            </a>
        </div>
        <div style="width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #080e1a;">
            <iframe src="https://app.musictechguru.com/component-1-interactive-quiz" title="Component 1 Interactive Quiz" style="width: 100%; height: 640px; border: 0; display: block;" loading="lazy"></iframe>
        </div>
    </div>
"""

    # Remove previously injected c1-interactive-deck block if re-running
    dec = re.sub(r'<!-- INTERACTIVE MASTER DECK: COMPONENT 1 RECORDING & MIXING -->.*?<!-- 2\. Coursework Pillars \(3 Cards\) -->', '<!-- 2. Coursework Pillars (3 Cards) -->', dec, flags=re.S)
    dec_updated = dec.replace('<!-- 2. Coursework Pillars (3 Cards) -->', c1_enrichment_block + '\n    <!-- 2. Coursework Pillars (3 Cards) -->')

    new_b64 = encode_vc_raw_html(dec_updated)
    new_raw = re.sub(
        r'(\[vc_raw_html[^\]]*\])(.*?)(\[/vc_raw_html\])',
        lambda m: m.group(1) + new_b64 + m.group(3),
        raw_page,
        count=1,
        flags=re.S
    )
    update_wp_page(8604, new_raw, "Component 1: Recording & Mixing")

# ==============================================================================
# 2. UPGRADE PAGE 8632: COMPONENT 2 (SEQUENCING, SAMPLING, SYNTHESIS & COMPOSITION)
# ==============================================================================
def upgrade_component_2():
    with open("scripts/decoded_wp_page_8632.html", "r", encoding="utf-8") as f:
        dec = f.read()
    with open("scripts/backup_wp_page_8632_component-2-sequencing-sampling-synthesis-composition.html", "r", encoding="utf-8") as f:
        raw_page = f.read()

    c2_enrichment_block = """
    <!-- INTERACTIVE MASTER DECK: COMPONENT 2 TECHNOLOGY-BASED COMPOSITION -->
    <div id="c2-interactive-deck" style="margin-bottom: 40px; background: #0b1120; border: 1px solid rgba(192, 132, 252, 0.4); border-radius: 20px; padding: 26px; box-shadow: 0 15px 40px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="display: inline-block; background: rgba(192, 132, 252, 0.15); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.35); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 50px; margin-bottom: 6px;">
                    ★ Interactive Composition Master Deck &bull; 10 Slides + 1080p HD Video
                </span>
                <h2 style="color: #ffffff !important; font-size: 24px; font-weight: 800; margin: 0;">
                    Component 2: Synthesis, Creative Sampling &amp; Sequencing Master Deck
                </h2>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="https://app.musictechguru.com/interactive-slide-component-2" target="_blank" rel="noopener" style="background: rgba(192, 132, 252, 0.18); border: 1px solid rgba(192, 132, 252, 0.45); color: #e9d5ff !important; font-size: 12.5px; font-weight: 800; padding: 8px 16px; border-radius: 8px; text-decoration: none;">
                    ⛶ Open Deck in Full Tab &rarr;
                </a>
                <a href="https://app.musictechguru.com/?quiz=component2_guide" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%); color: #ffffff !important; font-size: 12.5px; font-weight: 800; padding: 8px 16px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(192, 132, 252, 0.35);">
                    🎹 Launch Component 2 Guide &amp; Synth Lab &rarr;
                </a>
            </div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px 0; line-height: 1.55;">
            Explore all 10 pillars of a Distinction-grade Component 2 composition: set brief rules (2:30–3:30), building subtractive synth patches from scratch, Reese bass filtering, ADSR &amp; LFO modulation, Quick Sampler Foley mapping, granular Alchemy textures, humanizing MIDI drums, Flex Pitch/Tape-Stop tricks, SMPTE film spotting, and sidechain mixing.
        </p>
        <div style="width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: #080e1a; box-shadow: 0 12px 32px rgba(0,0,0,0.6);">
            <iframe src="https://app.musictechguru.com/interactive-slide-component-2" title="Component 2 Interactive Master Deck" style="width: 100%; height: 760px; border: 0; display: block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>

    <!-- COMPONENT 2 APP SYNTHESIS LAB & COURSEWORK TOOLKIT -->
    <div id="c2-app-toolkit" style="margin-bottom: 40px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border: 1px solid rgba(192, 132, 252, 0.4); border-radius: 20px; padding: 28px; box-shadow: 0 12px 35px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
            <div style="max-width: 680px;">
                <span style="display: inline-block; background: rgba(192, 132, 252, 0.18); color: #e9d5ff; border: 1px solid rgba(192, 132, 252, 0.4); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 50px; margin-bottom: 8px;">
                    ⚡ Music Tech Guru Revision App Integration
                </span>
                <h3 style="color: #ffffff !important; font-size: 22px; font-weight: 800; margin: 0 0 8px 0;">
                    Component 2 Synthesis Lab, Sampler Drills &amp; Coursework Checklists
                </h3>
                <p style="color: #cbd5e1; font-size: 14px; margin: 0; line-height: 1.55;">
                    Build original synthesizer patches, practice sample slicing and MIDI piano-roll editing, and verify every Pearson Component 2 marking requirement inside the <strong>Music Tech Guru App</strong>.
                </p>
            </div>
            <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #c084fc 0%, #7e22ce 100%); color: #ffffff !important; font-weight: 800; font-size: 13px; padding: 11px 20px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(192, 132, 252, 0.35); white-space: nowrap;">
                ⭐ Unlock Full Toolkit (£12.99/yr) &rarr;
            </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px;">
            <a href="https://app.musictechguru.com/?quiz=component2_guide" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(192, 132, 252, 0.45); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #c084fc; text-transform: uppercase;">Coursework Essential</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">📄 Component 2 Guide &amp; Logbook</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Step-by-step brief breakdown, synthesis documentation templates, and mark scheme tick-list.</p>
                </div>
                <span style="color: #c084fc; font-size: 12px; font-weight: 800;">Open C2 Guide in App &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=synthesizer" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #38bdf8; text-transform: uppercase;">Interactive Synth</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">🎛️ Subtractive Synthesizer Lab</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Dial in oscillators, filter cutoff/resonance, ADSR envelopes, and LFO modulation interactively.</p>
                </div>
                <span style="color: #38bdf8; font-size: 12px; font-weight: 800;">Launch Synth Lab &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=sample_chopping" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #34d399; text-transform: uppercase;">Creative Sampling</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">✂️ Sample Slicing &amp; Mapping Lab</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Practice transient slicing, root-note keyzone mapping, loop crossfades, and formant shifting.</p>
                </div>
                <span style="color: #34d399; font-size: 12px; font-weight: 800;">Start Sampling Lab &rarr;</span>
            </a>

            <a href="https://app.musictechguru.com/?quiz=lp_fingerprints" target="_blank" rel="noopener" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 12px; padding: 18px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #fbbf24; text-transform: uppercase;">Arrangement &amp; Style</span>
                    <h4 style="color: #ffffff !important; font-size: 15.5px; font-weight: 800; margin: 5px 0 6px 0;">🎧 Sonic Fingerprints &amp; Production</h4>
                    <p style="color: #94a3b8; font-size: 12.5px; margin: 0 0 12px 0; line-height: 1.45;">Analyze iconic electronic, synth-pop, hip-hop, and film score production techniques.</p>
                </div>
                <span style="color: #fbbf24; font-size: 12px; font-weight: 800;">Explore Fingerprints &rarr;</span>
            </a>
        </div>
    </div>

    <!-- INTERACTIVE COMPONENT 2 SPECIFICATION QUIZ -->
    <div id="c2-interactive-quiz" style="margin-bottom: 40px; background: #0b1120; border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 20px; padding: 24px; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div>
                <span style="display: inline-block; background: rgba(192, 132, 252, 0.15); color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 3px 10px; border-radius: 50px; margin-bottom: 4px;">
                    Knowledge Check &bull; 10 Specification Questions
                </span>
                <h3 style="color: #ffffff !important; font-size: 21px; font-weight: 800; margin: 0;">
                    Test Your Component 2 Synthesis, Sampling &amp; Sequencing Knowledge
                </h3>
            </div>
            <a href="https://app.musictechguru.com/component-2-interactive-quiz" target="_blank" rel="noopener" style="color: #c084fc; font-size: 12.5px; font-weight: 700; text-decoration: none;">
                Open Quiz in Full Screen &rarr;
            </a>
        </div>
        <div style="width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #080e1a;">
            <iframe src="https://app.musictechguru.com/component-2-interactive-quiz" title="Component 2 Interactive Quiz" style="width: 100%; height: 640px; border: 0; display: block;" loading="lazy"></iframe>
        </div>
    </div>
"""

    target_anchor = "<!-- 3. FEATURED PROJECT WALKTHROUGH: SHAPE OF YOU -->"
    if target_anchor not in dec:
        # fallback anchor
        target_anchor = "<!-- 2. FOUR CORE PILLARS MATRIX BAR -->"
    dec = re.sub(r'<!-- INTERACTIVE MASTER DECK: COMPONENT 2 TECHNOLOGY-BASED COMPOSITION -->.*?' + re.escape(target_anchor), target_anchor, dec, flags=re.S)
    dec_updated = dec.replace(target_anchor, c2_enrichment_block + "\n    " + target_anchor)

    new_b64 = encode_vc_raw_html(dec_updated)
    new_raw = re.sub(
        r'(\[vc_raw_html[^\]]*\])(.*?)(\[/vc_raw_html\])',
        lambda m: m.group(1) + new_b64 + m.group(3),
        raw_page,
        count=1,
        flags=re.S
    )
    update_wp_page(8632, new_raw, "Component 2: Synthesis & Composition")

# ==============================================================================
# 3. UPGRADE PAGE 8494: A-LEVEL MUSIC TECHNOLOGY MAIN HUB
# ==============================================================================
def upgrade_alevel_hub():
    with open("scripts/backup_wp_page_8494_a-level-music-technology.html", "r", encoding="utf-8") as f:
        raw_page = f.read()
    matches = re.findall(r'\[vc_raw_html[^\]]*\](.*?)\[/vc_raw_html\]', raw_page, re.S)
    block0_dec = urllib.parse.unquote(base64.b64decode(matches[0].strip()).decode('utf-8', errors='ignore'))

    hub_enrichment_block = """
    <!-- INTERACTIVE 4-COMPONENT A-LEVEL DIAGNOSTIC QUIZ & APP SAMPLER -->
    <div id="alevel-diagnostic-sampler" style="margin-bottom: 42px; background: linear-gradient(135deg, #0b1120 0%, #0f172a 100%); border: 1px solid rgba(0, 193, 240, 0.4); border-radius: 20px; padding: 28px; box-shadow: 0 15px 40px rgba(0,0,0,0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
            <div>
                <span style="display: inline-block; background: rgba(0, 193, 240, 0.15); color: #00C1F0; border: 1px solid rgba(0, 193, 240, 0.35); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 50px; margin-bottom: 6px;">
                    ⚡ Interactive 5-Minute Baseline Assessment &bull; Components 1, 2, 3 &amp; 4
                </span>
                <h2 style="color: #ffffff !important; font-size: 24px; font-weight: 800; margin: 0;">
                    Test Your A-Level Music Technology Readiness (Interactive Diagnostic)
                </h2>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="https://app.musictechguru.com/?quickfire=true" target="_blank" rel="noopener" style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8 !important; font-size: 12.5px; font-weight: 800; padding: 9px 16px; border-radius: 8px; text-decoration: none;">
                    🔥 Try Daily 5 Quick-Fire in App &rarr;
                </a>
                <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #00C1F0 0%, #2563eb 100%); color: #ffffff !important; font-size: 12.5px; font-weight: 800; padding: 9px 18px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(0, 193, 240, 0.35);">
                    ⭐ Get Full MTG Pro Access (£12.99/yr) &rarr;
                </a>
            </div>
        </div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 18px 0; line-height: 1.55;">
            Take this 8-question interactive diagnostic across <strong>Recording (C1)</strong>, <strong>Synthesis &amp; Sampling (C2)</strong>, <strong>Listening &amp; Context (C3)</strong>, and <strong>Producing &amp; Analysing (C4)</strong>—then save your progress inside the full Revision App.
        </p>
        <div style="width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: #080e1a;">
            <iframe src="https://app.musictechguru.com/a-level-diagnostic-quiz" title="A-Level Music Technology 4-Component Diagnostic Quiz" style="width: 100%; height: 640px; border: 0; display: block;" loading="lazy"></iframe>
        </div>
    </div>

    <!-- TRANSPARENT APP MEMBERSHIP & SCHOOL PACKS PRICING SECTION -->
    <div id="mtg-pro-pricing" style="margin-bottom: 44px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 20px; padding: 32px 28px; box-shadow: 0 18px 45px rgba(0,0,0,0.5);">
        <div style="text-align: center; max-width: 720px; margin: 0 auto 28px auto;">
            <span style="display: inline-block; background: rgba(192, 132, 252, 0.18); color: #e9d5ff; border: 1px solid rgba(192, 132, 252, 0.4); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 14px; border-radius: 50px; margin-bottom: 10px;">
                🔓 Single Unified Account &bull; Instant Access on Web, Tablet &amp; Mobile
            </span>
            <h2 style="color: #ffffff !important; font-size: 28px; font-weight: 900; margin: 0 0 10px 0;">
                Unlock the Complete A-Level Music Technology Revision App
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 0; line-height: 1.6;">
                All syllabus guides and interactive slide decks on this site are 100% free. Upgrade to <strong>MTG Pro</strong> inside the Revision App to unlock every Stage 1–4 interactive quiz, full Component 3 &amp; 4 mock exams, the Component 1 &amp; 2 Logbook Generators, and real-time grade tracking.
            </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <!-- Student Plan -->
            <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid #00C1F0; border-radius: 16px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 10px 30px rgba(0, 193, 240, 0.2);">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 12px; font-weight: 800; color: #00C1F0; text-transform: uppercase; letter-spacing: 0.8px;">Individual Student</span>
                        <span style="background: #00C1F0; color: #080e1a; font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 50px; text-transform: uppercase;">Most Popular</span>
                    </div>
                    <div style="font-size: 32px; font-weight: 900; color: #ffffff; margin-bottom: 4px;">
                        £12.99 <span style="font-size: 14px; font-weight: 600; color: #94a3b8;">/ year</span>
                    </div>
                    <p style="font-size: 12.5px; color: #94a3b8; margin: 0 0 18px 0;">Less than £1.10 per month for full A-Level exam &amp; coursework mastery.</p>
                    <ul style="list-style: none; padding: 0; margin: 0 0 22px 0; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <li>✓ <strong>500+ Interactive Exam Questions</strong> (Stages 1–4)</li>
                        <li>✓ <strong>Component 1 &amp; 2 Logbook &amp; Track Sheet Creator</strong></li>
                        <li>✓ <strong>3D Mic Placement, Synth &amp; Effects Chain Labs</strong></li>
                        <li>✓ <strong>Component 3 &amp; 4 Timed Mock Papers &amp; Model Essays</strong></li>
                        <li>✓ <strong>Personal Progress &amp; Mastery Analytics</strong></li>
                    </ul>
                </div>
                <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="display: block; text-align: center; background: linear-gradient(135deg, #00C1F0 0%, #2563eb 100%); color: #ffffff !important; font-weight: 800; font-size: 14px; padding: 13px 18px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(0, 193, 240, 0.35);">
                    Get Student Pro Pass (£12.99/yr) &rarr;
                </a>
            </div>

            <!-- 5-Student Small Cohort Pack -->
            <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(192, 132, 252, 0.45); border-radius: 16px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 12px; font-weight: 800; color: #c084fc; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 10px;">Small Class / 5-Student Pack</span>
                    <div style="font-size: 32px; font-weight: 900; color: #ffffff; margin-bottom: 4px;">
                        5 Seats <span style="font-size: 14px; font-weight: 600; color: #94a3b8;">&bull; £50 / year</span>
                    </div>
                    <p style="font-size: 12.5px; color: #94a3b8; margin: 0 0 18px 0;">Ideal for sixth-form music technology cohorts and small departments.</p>
                    <ul style="list-style: none; padding: 0; margin: 0 0 22px 0; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <li>✓ <strong>5 Full Student Pro Licenses</strong> (1-Click Invite Link)</li>
                        <li>✓ <strong>Full Teacher Analytics &amp; Class Gradebook</strong></li>
                        <li>✓ <strong>Set &amp; Track Weekly Homework Assignments</strong></li>
                        <li>✓ <strong>16-Block Curriculum Scheme of Work Builder</strong></li>
                        <li>✓ <strong>All Master Mark Schemes &amp; Teacher Resources</strong></li>
                    </ul>
                </div>
                <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="display: block; text-align: center; background: linear-gradient(135deg, #c084fc 0%, #7e22ce 100%); color: #ffffff !important; font-weight: 800; font-size: 14px; padding: 13px 18px; border-radius: 10px; text-decoration: none; box-shadow: 0 6px 20px rgba(192, 132, 252, 0.3);">
                    Get 5-Student Pack (£50/yr) &rarr;
                </a>
            </div>

            <!-- 10-Student School / College License -->
            <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 16px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 12px; font-weight: 800; color: #34d399; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 10px;">Full School / 10-Student Pack</span>
                    <div style="font-size: 32px; font-weight: 900; color: #ffffff; margin-bottom: 4px;">
                        10 Seats <span style="font-size: 14px; font-weight: 600; color: #94a3b8;">&bull; £100 / year</span>
                    </div>
                    <p style="font-size: 12.5px; color: #94a3b8; margin: 0 0 18px 0;">Complete Year 12 &amp; Year 13 coverage with live teacher monitoring.</p>
                    <ul style="list-style: none; padding: 0; margin: 0 0 22px 0; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <li>✓ <strong>10 Student Pro Accounts</strong> with Instant Onboarding</li>
                        <li>✓ <strong>Real-Time Class Heatmap &amp; Weak-Topic Alerts</strong></li>
                        <li>✓ <strong>Coursework Logbook &amp; Track Sheet Supervision</strong></li>
                        <li>✓ <strong>Downloadable PDF Homework &amp; Mark Schemes</strong></li>
                        <li>✓ <strong>Priority Support from Thor House</strong></li>
                    </ul>
                </div>
                <a href="https://app.musictechguru.com/?upgrade=true" target="_blank" rel="noopener" style="display: block; text-align: center; background: rgba(52, 211, 153, 0.18); border: 1px solid #34d399; color: #34d399 !important; font-weight: 800; font-size: 14px; padding: 13px 18px; border-radius: 10px; text-decoration: none;">
                    Get 10-Student Pack (£100/yr) &rarr;
                </a>
            </div>
        </div>
    </div>
"""

    target_anchor = "<!-- 3. COMPONENT DEEP-DIVE CARDS -->"
    block0_dec = re.sub(r'<!-- INTERACTIVE 4-COMPONENT A-LEVEL DIAGNOSTIC QUIZ & APP SAMPLER -->.*?' + re.escape(target_anchor), target_anchor, block0_dec, flags=re.S)
    block0_updated = block0_dec.replace(target_anchor, hub_enrichment_block + "\n    " + target_anchor)

    new_b64_0 = encode_vc_raw_html(block0_updated)
    # Replace first vc_raw_html block in raw_page
    new_raw = re.sub(
        r'(\[vc_raw_html[^\]]*\])(.*?)(\[/vc_raw_html\])',
        lambda m: m.group(1) + new_b64_0 + m.group(3),
        raw_page,
        count=1,
        flags=re.S
    )
    update_wp_page(8494, new_raw, "A-Level Music Technology Main Hub")

# ==============================================================================
# 4. IMPLEMENT OPTION 1: UNIFIED APP LOGIN & GET PRO CTA IN WORDPRESS HEADER
# ==============================================================================
def implement_option_1_header():
    with open("scripts/backup_widget_custom_html_2.html", "r", encoding="utf-8") as f:
        widget_content = f.read()

    option_1_injection = """/* === OPTION 1: UNIFIED MTG APP LOGIN & PRO HEADER === */
#thim-popup-login {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
.site-header .navigation .menu-right ul li#woocommerce_widget_cart-2.widget,
.site-header .navigation .menu-right .widget_shopping_cart,
.site-header .navigation .menu-right a.minicart_hover {
  display: none !important;
}
.site-header .navigation .menu-right .thim-link-login {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
}
.site-header .navigation .menu-right .thim-link-login a.mtg-pro-header-cta {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%) !important;
  color: #ffffff !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  padding: 7px 14px !important;
  border-radius: 50px !important;
  text-decoration: none !important;
  line-height: 1.2 !important;
  box-shadow: 0 3px 12px rgba(168, 85, 247, 0.4) !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
}
.site-header .navigation .menu-right .thim-link-login a.mtg-pro-header-cta:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 5px 16px rgba(168, 85, 247, 0.65) !important;
  color: #ffffff !important;
}
@media (max-width: 640px) {
  .site-header .navigation .menu-right .thim-link-login a.mtg-pro-header-cta {
    display: none !important;
  }
}
</style>
<script>
// OPTION 1: UNIFIED SINGLE SOURCE OF TRUTH (MTG APP LOGIN & PRO UPGRADE)
(function() {
  function unifyHeaderAuth() {
    var loginContainers = document.querySelectorAll('.thim-link-login');
    loginContainers.forEach(function(container) {
      var loginLink = container.querySelector('a.login, a.js-show-popup, a[href*="wp-login"]');
      if (loginLink) {
        loginLink.classList.remove('js-show-popup');
        loginLink.setAttribute('href', 'https://app.musictechguru.com/');
        loginLink.setAttribute('target', '_blank');
        loginLink.setAttribute('rel', 'noopener');
        loginLink.textContent = 'App Login';
        loginLink.title = 'Sign in to your Music Tech Guru Revision App account';
        var cleanLink = loginLink.cloneNode(true);
        loginLink.parentNode.replaceChild(cleanLink, loginLink);
      }
      if (!container.querySelector('.mtg-pro-header-cta')) {
        var proBtn = document.createElement('a');
        proBtn.href = 'https://app.musictechguru.com/?upgrade=true';
        proBtn.target = '_blank';
        proBtn.rel = 'noopener';
        proBtn.className = 'mtg-pro-header-cta';
        proBtn.innerHTML = '⭐ Get Pro (£12.99/yr)';
        container.insertBefore(proBtn, container.firstChild);
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unifyHeaderAuth);
  } else {
    unifyHeaderAuth();
  }
  window.addEventListener('load', unifyHeaderAuth);

  // GLOBAL BROWSER BACK-BUTTON FIX: Disarm WP Smush iframe[data-src] lazy-load so it never mutates .src on an initialized data:image/svg+xml iframe (which pushes fake entries onto window.history)
  function disarmLazyIframes(root) {
    var list = (root || document).querySelectorAll('iframe[data-src]');
    for (var i = 0; i < list.length; i++) {
      var f = list[i];
      var realSrc = f.getAttribute('data-src');
      if (!realSrc) continue;
      var curSrc = f.getAttribute('src') || '';
      if (curSrc === realSrc) {
        f.removeAttribute('data-src');
        f.removeAttribute('data-load-mode');
        f.classList.remove('lazyload', 'lazyloading', 'lazyloaded');
        continue;
      }
      var clone = f.cloneNode(false);
      clone.removeAttribute('data-src');
      clone.removeAttribute('data-load-mode');
      clone.classList.remove('lazyload', 'lazyloading', 'lazyloaded');
      clone.setAttribute('src', realSrc);
      if (f.parentNode) {
        f.parentNode.replaceChild(clone, f);
      }
    }
  }

  document.addEventListener('lazybeforeunveil', function(e) {
    if (e.target && e.target.tagName === 'IFRAME' && e.target.getAttribute('data-src')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      disarmLazyIframes(e.target.parentNode || document);
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { disarmLazyIframes(document); });
  } else {
    disarmLazyIframes(document);
  }
  window.addEventListener('load', function() { disarmLazyIframes(document); });
})();
</script>
<script>"""

    updated_widget = widget_content.replace("</style>\n<script>", option_1_injection, 1)

    url = "https://www.musictechguru.com/wp-json/wp/v2/widgets/custom_html-2"
    payload = json.dumps({
        "instance": {
            "raw": {
                "title": "",
                "content": updated_widget
            }
        }
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=HEADERS, method="POST")
    res = urllib.request.urlopen(req, timeout=20)
    data = json.loads(res.read().decode("utf-8"))
    print(f"SUCCESS [Option 1 Global Header] custom_html-2 updated ({len(updated_widget):,} chars)")

if __name__ == "__main__":
    upgrade_component_1()
    upgrade_component_2()
    upgrade_alevel_hub()
    implement_option_1_header()
