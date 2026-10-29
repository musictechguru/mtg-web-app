#!/usr/bin/env python3
"""
update_wordpress_studio_effects.py
Updates the 5 Edexcel A-Level Component 3 Studio Effects pages on WordPress:
1. Delay & Echo (Page ID 297827, slug: delay)
2. Reverb Effects (Page ID 297828, slug: reverb)
3. Chorus Effect (Page ID 297829, slug: chorus)
4. Phaser Effect (Page ID 297830, slug: phaser)
5. Flanger Effect (Page ID 297831, slug: flanger)

Each page is updated with:
- Dedicated Interactive Presentation Deck embed (with direct slide anchor jump)
- Master Technical Theory, Signal Flow & Transduction Guide
- Dedicated Interactive 10-Question Specification Quiz embed
- Downloadable/Printable Homework & Exam Revision Pack banner
- Curated Video Listening Lounge featuring verified landmark tracks and gear shootouts
- Component 3 Effects Suite Navigation Pills
"""

import urllib.request
import json
import base64
import os

WP_URL = "https://www.musictechguru.com/wp-json/wp/v2"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

EFFECTS = [
    {
        "id": 297827,
        "slug": "delay",
        "anchor": "delay",
        "quiz_slug": "delay-interactive-quiz",
        "hw_file": "homework-delay.html",
        "title": "Delay & Echo Effects",
        "subtitle": "Tape Delay, Bucket-Brigade Devices (BBD), Digital Buffer RAM, Slapback, Feedback Loops & Auxiliary Sends",
        "color": "#38bdf8",
        "gradient": "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
        "landmark_title": "U2 - 'Where The Streets Have No Name' (1987)",
        "landmark_vid": "GzZWSrr5wFI",
        "landmark_note": "The Edge's signature dotted-eighth note delay (3/16th subdivision) tempo-synced at ~375ms to double the picking rhythm.",
        "gear_title": "Roland Space Echo RE-201 Tape Delay",
        "gear_vid": "cJfNDVJ5Y5o",
        "gear_note": "Analog magnetic tape loop with 3 playback heads, mechanical motor speed control, warm tape saturation, and wow & flutter.",
        "shootout_title": "BBD vs Digital Delay Shootout",
        "shootout_vid": "XpYzQPjofY0",
        "shootout_note": "Comparing dark analog Bucket-Brigade microchip clocking against crystal-clear digital RAM buffer converters.",
        "theory_html": """
<h3>1. What is Delay?</h3>
<p><strong>Delay</strong> is a fundamental time-based audio effect that captures an input signal, stores it in a temporary storage medium (magnetic tape, analog capacitor bucket, or digital RAM), and plays it back after a designated time offset (measured in milliseconds or musical subdivisions such as dotted-8ths). When the delayed output is fed back into the delay line input, repeating echoes are created that decay exponentially over time.</p>

<div style="background: #0f172a; border-left: 4px solid #38bdf8; border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0;">
    <h4 style="color: #38bdf8; margin: 0 0 8px 0; font-size: 16px;">The Delay Time Spectrum (A-Level Core Physics):</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #cbd5e1; line-height: 1.8;">
        <li><strong>&lt; 1 ms (Sub-millisecond):</strong> All-pass filtering and phase cancellation (Phasing). No perceived discrete echo.</li>
        <li><strong>1 ms – 15 ms:</strong> Short time delay causing comb filtering with harmonically related cancellation notches (Flanging).</li>
        <li><strong>15 ms – 35 ms:</strong> Haas perceptual doubling zone. Brain fuses dry and wet signals into a single thickened sound (Chorus &amp; Doubling).</li>
        <li><strong>40 ms – 120 ms:</strong> Slapback Echo. Single discrete repeat with zero feedback, famous in 1950s Sun Records rockabilly vocals (Sam Phillips).</li>
        <li><strong>150 ms – 2000 ms+:</strong> Long discrete echoes, rhythmic tempo-synced repeats, and ambient soundscapes.</li>
    </ul>
</div>

<h3>2. Key Delay Parameters &amp; Calculations</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 20px 0;">
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 15px;">Delay Time (ms / Subdivisions)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">The interval between dry sound and repeat. Free mode is calibrated in milliseconds (1–2000ms); Sync mode locks to host DAW BPM (1/4, 1/8, dotted-8th, triplets).</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 15px;">Feedback (Regeneration %)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Determines how much delayed signal returns to the input. 0% = single slapback repeat; 50% = 4-6 repeating echoes; 100%+ = runaway self-oscillation.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 15px;">Wet / Dry Mix (%)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Ratio of original dry signal to processed delayed signal. Crucial rule: Set to 100% Wet when placed on an Auxiliary Return bus to prevent dry signal phase cancellation.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 15px;">High / Low Damping (Filters)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Low-pass and high-pass filters in the feedback path. High damping rolls off treble on successive repeats, simulating air absorption in real physical acoustics.</p>
    </div>
</div>

<div style="background: #1e1b4b; border: 1px solid #4338ca; border-radius: 12px; padding: 18px 22px; margin: 20px 0;">
    <h4 style="color: #a5b4fc; margin: 0 0 8px 0; font-size: 15px;">Exam Math: Calculating Dotted-Eighth Delay Time</h4>
    <p style="font-size: 13.5px; color: #c7d2fe; margin: 0 0 8px 0;">To calculate musical delay times from song tempo (BPM):</p>
    <code style="display: block; background: #0f172a; color: #38bdf8; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-family: monospace;">
        Quarter Note (ms) = 60,000 / BPM<br>
        Eighth Note (ms) = 30,000 / BPM<br>
        Dotted-Eighth (ms) = (60,000 / BPM) * 0.75  [At 120 BPM: 500 * 0.75 = 375 ms]
    </code>
</div>

<h3>3. Evolution of Delay Hardware in Audio History</h3>
<ul style="line-height: 1.8; color: #cbd5e1;">
    <li><strong>Magnetic Tape Delay (1950s–1970s):</strong> Uses continuous magnetic tape loops running across record and playback heads (e.g. <em>Echoplex EP-2/EP-3</em>, <em>Roland Space Echo RE-201</em>). Delay time is altered by varying the physical motor speed or selecting different playback head spacings. Introduces warm harmonic tape saturation, progressive treble attenuation on each pass, and pitch flutter from mechanical tape transport irregularities.</li>
    <li><strong>Slapback Echo (1950s):</strong> Single discrete echo at 75–125ms with 0% feedback. Pioneered by producer Sam Phillips at Sun Records using two synced Ampex reel-to-reel recorders (monitoring off the playback head of the second tape machine). Defines rockabilly and rock 'n' roll vocals (Elvis Presley, Carl Perkins).</li>
    <li><strong>Analogue Bucket-Brigade Device (BBD) Delay (1970s):</strong> Solid-state IC chips (e.g. Panasonic MN3005) that pass audio voltage packets across a chain of thousands of capacitors clocked by a high-frequency oscillator (e.g. <em>Electro-Harmonix Deluxe Memory Man</em>, <em>Boss DM-2</em>). Requires steep anti-aliasing low-pass filtering, creating famously dark, warm, and slightly gritty repeats.</li>
    <li><strong>Digital Delay (1980s–Present):</strong> Uses Analog-to-Digital Converters (ADCs) to store 16-bit/24-bit audio samples into solid-state RAM buffer memory (e.g. <em>Lexicon PCM42</em>, <em>TC Electronic 2290</em>, modern DAW plugins). Allows crystal-clear frequency reproduction up to 20kHz, infinite pristine feedback loops, reverse delay, dynamic ducking delay, and stereo ping-pong cross-panning.</li>
</ul>

<h3>4. Signal Routing: Channel Serial Insert vs. Parallel Aux Send/Return</h3>
<div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h4 style="color: #38bdf8; margin: 0 0 8px 0; font-size: 15px;">Why Delay Belongs on an Auxiliary Bus in Professional Mixes:</h4>
    <p style="font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin: 0 0 12px 0;">
        Placing delay as a <strong>Serial Channel Insert</strong> forces you to balance wet and dry with a mix knob on that single track. If placed on multiple channels, each instance consumes massive CPU and clutters the stereo image.
    </p>
    <p style="font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin: 0;">
        Setting up delay on a dedicated <strong>Auxiliary Return bus (100% Wet Mix)</strong> allows you to send varying amounts from lead vocals, backing vocals, and electric guitars to the exact same tempo-synced delay space. Furthermore, the delay return channel can be independently equalised (e.g. Abbey Road filter: high-pass at 500Hz, low-pass at 8kHz), compressed, sidechain-ducked, or modulated without altering the original dry instruments!
    </p>
</div>
"""
    },
    {
        "id": 297828,
        "slug": "reverb",
        "anchor": "reverb",
        "quiz_slug": "reverb-interactive-quiz",
        "hw_file": "homework-reverb.html",
        "title": "Reverberation Effects",
        "subtitle": "Acoustic Chambers, Springs, EMT Plates, Algorithmic Digital Units & Convolution Impulse Responses (IR)",
        "color": "#a855f7",
        "gradient": "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
        "landmark_title": "Phil Collins - 'In The Air Tonight' (1981)",
        "landmark_vid": "YkADj0TPrJA",
        "landmark_note": "Hugh Padgham and Peter Gabriel's iconic gated room snare at The Townhouse Studio 2 (stone room + SSL 4000 Talkback Limiter + Noise Gate).",
        "gear_title": "Reverb Hardware Shootout: Plate, Spring, Hall & Room",
        "gear_vid": "b3MN-HJxWxk",
        "gear_note": "Ear training comparison demonstrating how physical transducer materials (spring coils, steel plates, acoustic spaces) sculpt audio decay.",
        "shootout_title": "Phaser vs Flanger vs Chorus vs Delay",
        "shootout_vid": "z9tg5ELAW7o",
        "shootout_note": "A-Level masterclass comparing time-based and modulation effects side-by-side to understand phase cancellation and delay times.",
        "theory_html": """
<h3>1. What is Reverberation?</h3>
<p><strong>Reverberation (Reverb)</strong> is the complex acoustic persistence of sound in an enclosed environment after the original sound source has stopped. Unlike discrete delay (where distinct echoes are heard separated by silence), reverb consists of tens of thousands of microscopic sound reflections bouncing off walls, ceilings, and floors so densely packed together that the human brain perceives them as a single continuous decaying acoustic tail.</p>

<h3>2. Anatomy of a Reverb Response (A-Level Core Listening Guide)</h3>
<div style="background: #0f172a; border-left: 4px solid #a855f7; border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0;">
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #cbd5e1; line-height: 1.8;">
        <li><strong>Direct Sound:</strong> The unaltered sound traveling directly from sound source to listener’s ear along the shortest straight-line path. Sets initial perceptual timbre, stereo positioning, and localization.</li>
        <li><strong>Pre-Delay:</strong> The time gap (in milliseconds, 0–120ms) between the direct sound and the onset of the very first reflection. Increasing pre-delay pushes the dry sound forward in the mix while preserving a deep acoustic hall behind it.</li>
        <li><strong>Early Reflections:</strong> The first few distinct surface reflections bouncing off nearby walls and floor (first 5–50ms). Crucially informs the brain of the physical geometry, volume, and boundary dimensions of the room.</li>
        <li><strong>Late Reflections (Diffuse Reverberant Tail):</strong> Millions of randomized secondary, tertiary, and higher-order reflections scattering together. Characterized by <strong>Decay Time (RT60)</strong> — the time required for sound energy to decay by 60 dB.</li>
    </ul>
</div>

<h3>3. Evolution of Reverb Technologies Across Audio History</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 20px 0;">
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #a855f7; margin: 0 0 6px 0; font-size: 15px;">1. Acoustic Echo Chambers (1940s–1960s)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Dedicated basement rooms tiled with hard reflective ceramic surfaces. A loudspeaker broadcasts audio into the room; microphones pick up the natural acoustic reverberation (e.g. Abbey Road Studio 2 Echo Chambers, Bill Putnam at Universal Audio).</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #a855f7; margin: 0 0 6px 0; font-size: 15px;">2. Spring Reverb (1930s–1960s)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Invented by Laurens Hammond for organs; popularized in Fender guitar combo amplifiers (e.g. Twin Reverb). Uses an electromagnetic transducer to send mechanical torsional shear waves down steel coil springs. Characterized by a metallic, 'boingy', high-resonance frequency response.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #a855f7; margin: 0 0 6px 0; font-size: 15px;">3. Plate Reverb (1957)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">The <em>EMT 140</em> suspended a 600-pound, 1x2-meter cold-rolled steel sheet in a heavy metal frame. A central moving-coil driver excites the sheet; dual piezo contact pickups capture the vibrations. Delivers dense, bright, shimmering vocal reverb without flutter echoes.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #a855f7; margin: 0 0 6px 0; font-size: 15px;">4. Digital &amp; Convolution Reverb (1976–Present)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;"><strong>Algorithmic:</strong> Uses recirculating all-pass delay networks and comb filter matrices to synthesize acoustic spaces mathematically (<em>EMT 250</em>, <em>Lexicon 224 / 480L</em>).<br><strong>Convolution:</strong> Mathematical multiplication of dry audio with real-world acoustic <em>Impulse Responses (IR)</em> recorded with starter pistols or sine sweeps.</p>
    </div>
</div>

<h3>4. Famous Studio Technique: Gated Reverb</h3>
<p style="color: #cbd5e1; line-height: 1.6;">
    Pioneered by recording engineer Hugh Padgham and Peter Gabriel at London's Townhouse Studios (Studio 2, featuring a 25-foot stone room), and immortalized by Phil Collins in <em>'In The Air Tonight'</em> (1981).
    A drum snare was hit with enormous energy into the live stone room, compressed brutally by the SSL 4000 console's listen talkback limiter, and fed into an aggressive <strong>Noise Gate</strong> with a rapid hold and millisecond release. The reverb tail is severed abruptly mid-decay, creating huge punch and explosive presence without cluttering the bottom end of the mix.
</p>
"""
    },
    {
        "id": 297829,
        "slug": "chorus",
        "anchor": "chorus",
        "quiz_slug": "chorus-interactive-quiz",
        "hw_file": "homework-chorus.html",
        "title": "Chorus Effect",
        "subtitle": "Short Time Delay (15–35ms), LFO Pitch Detuning, Psychoacoustic Doubling & Stereo Haas Expansion",
        "color": "#06b6d4",
        "gradient": "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
        "landmark_title": "Nirvana - 'Come As You Are' (1991)",
        "landmark_vid": "vabnZ9-ex7o",
        "landmark_note": "Kurt Cobain's iconic watery guitar intro created using an Electro-Harmonix Small Clone analog BBD chorus pedal.",
        "gear_title": "What Does a Chorus Pedal Do? Technical Explanation",
        "gear_vid": "hw3fH43-u8g",
        "gear_note": "In-depth circuit explanation showing how an LFO modulates delay time to introduce pitch vibrato before summing with the dry signal.",
        "shootout_title": "Phaser vs Flanger vs Chorus vs Vibrato",
        "shootout_vid": "z9tg5ELAW7o",
        "shootout_note": "Clear audio demonstrations contrasting Haas chorus doubling against all-pass phasing and resonant flanging.",
        "theory_html": """
<h3>1. What is the Chorus Effect?</h3>
<p><strong>Chorus</strong> is a modulation-based time delay effect engineered to emulate the rich acoustic phenomenon of multiple musicians or vocalists performing the identical musical part in unison (such as a choir or orchestral string section). In nature, no two performers ever play with 100% identical pitch or absolute microsecond timing. Chorus replicates this natural imperfection electronically using short time delays modulated by an LFO.</p>

<div style="background: #0f172a; border-left: 4px solid #06b6d4; border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0;">
    <h4 style="color: #06b6d4; margin: 0 0 8px 0; font-size: 16px;">The Psychoacoustic Principle (Haas Effect &amp; Pitch Modulation):</h4>
    <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.7;">
        The dry audio signal is split into two paths. One path remains completely direct and unmodulated. The second path is routed into a short delay line operating between <strong>15 ms and 35 ms</strong>. Because this delay is under the human psychoacoustic echo threshold (the <em>Haas Effect</em>), the ear does not perceive a separate distinct echo; instead, the brain fuses the two signals into a thickened single sound. A <strong>Low Frequency Oscillator (LFO)</strong> then continuously modulates the delay time. By the Doppler principle, accelerating and decelerating the delay buffer dynamically shifts the pitch sharp and flat. When mixed back with the dry signal, the subtle pitch discrepancies create rich acoustic beating and shimmering spatial depth.
    </p>
</div>

<h3>2. Key Chorus Controls &amp; Parameters</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 20px 0;">
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #06b6d4; margin: 0 0 6px 0; font-size: 15px;">Rate / Speed (Hz)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">The frequency of the Low Frequency Oscillator (typically 0.1 Hz to 5.0 Hz). Slow rates provide lush, subtle shimmering; high rates produce rapid rotary or vibrato-like warbles.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #06b6d4; margin: 0 0 6px 0; font-size: 15px;">Depth / Width (ms / cents)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Controls the amplitude of the LFO sweep. Dictates how drastically the delay time modulates, determining the maximum pitch deviation (cents detuning) of the wet signal.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #06b6d4; margin: 0 0 6px 0; font-size: 15px;">Pre-Delay Offset (ms)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">The baseline delay time around which the LFO oscillates (e.g. 20ms). Adjusts the perceived distance and timing difference between the dry and doubled parts.</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #06b6d4; margin: 0 0 6px 0; font-size: 15px;">Stereo Phase Inversion (180°)</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">In stereo chorus units (e.g. Roland JC-120), the LFO modulates the left channel in normal polarity and right channel with inverted 180° polarity, creating ultra-wide 3D width.</p>
    </div>
</div>

<h3>3. Classic Hardware &amp; Seminal Track Applications</h3>
<ul style="line-height: 1.8; color: #cbd5e1;">
    <li><strong>Roland Jazz Chorus JC-120 Amplifier (1975):</strong> The world's first built-in true stereo chorus guitar amplifier. Equipped with two separate 60-watt power amps and two 12-inch speakers; one speaker played dry direct signal while the second speaker played 100% wet pitch-modulated signal. The acoustic blending occurred naturally in physical room air!</li>
    <li><strong>Boss CE-1 Chorus Ensemble (1976):</strong> The circuitry of the JC-120 packaged into the very first Boss pedal. Powered by the legendary Reticon SAD1024 BBD analog microchip.</li>
    <li><strong>Roland Juno-6 / Juno-60 / Juno-106 Synthesizers (1982):</strong> Fitted with a famous built-in two-button analog stereo chorus. Synthesizer designers used simple single-oscillator architectures per voice (to keep production costs low) and relied on the built-in chorus to produce enormous, lush 80s synth brass and pad textures.</li>
    <li><strong>Iconic 1980s &amp; 1990s Tracks:</strong> The Police – <em>'Walking on the Moon'</em> (Andy Summers' clean chiming Stratocaster); Nirvana – <em>'Come As You Are'</em> (Kurt Cobain's watery EHX Small Clone intro); Cocteau Twins and The Cure (Robert Smith's signature moody layered guitars).</li>
</ul>
"""
    },
    {
        "id": 297830,
        "slug": "phaser",
        "anchor": "phaser",
        "quiz_slug": "phaser-interactive-quiz",
        "hw_file": "homework-phaser.html",
        "title": "Phaser Effect",
        "subtitle": "All-Pass Filter Stages, Phase Cancellation Notches, LFO Frequency Sweeping & Resonant Feedback",
        "color": "#f59e0b",
        "gradient": "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
        "landmark_title": "Van Halen - 'Ain't Talkin' 'Bout Love' (1978)",
        "landmark_vid": "qtwBFz6lfrY",
        "landmark_note": "Eddie Van Halen's legendary MXR Phase 90 script logo stompbox creating chewy, sweeping harmonic bite across his Marshall Plexi amplifier.",
        "gear_title": "MXR Phase 90 Technical Demonstration & History",
        "gear_vid": "oumDGQ2qPdU",
        "gear_note": "Detailed examination of 4-stage active all-pass filtering, JFET modulation control, and signature Phase 90 phase cancellation notches.",
        "shootout_title": "Phaser vs Flanger vs Chorus vs Vibrato",
        "shootout_vid": "z9tg5ELAW7o",
        "shootout_note": "Educational guide detailing why phaser notches are spaced non-harmonically, whereas flanger notches form a linear harmonic series.",
        "theory_html": """
<h3>1. What is a Phaser (Phase Shifter)?</h3>
<p>A <strong>Phaser</strong> is an audio modulation effect that creates sweeping, swirling swooshes across the frequency spectrum. Unlike flangers or chorus units, <strong>a phaser does not use time delay!</strong> Instead, it splits the audio signal, passes one branch through a series of active electronic <strong>All-Pass Filters</strong> to alter phase angles, and combines it back with the dry signal.</p>

<div style="background: #0f172a; border-left: 4px solid #f59e0b; border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0;">
    <h4 style="color: #f59e0b; margin: 0 0 8px 0; font-size: 16px;">How Phasing Works (All-Pass Filters &amp; Destructive Interference):</h4>
    <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.7;">
        An <strong>All-Pass Filter</strong> passes all audio frequencies with equal volume gain, but shifts the phase of specific frequencies by up to 180 degrees.
        When two all-pass filter stages are placed in series, they produce a total phase shift of 360 degrees. At the center transition frequency, the phase shift is exactly 180 degrees (antiphase). When this phase-shifted path is mixed equally with the direct dry input signal, <strong>destructive interference</strong> occurs, causing a complete cancellation dip or <strong>notch</strong> at that frequency!
        As a Low Frequency Oscillator (LFO) modulates the resistance of JFET transistors or optocouplers in each filter stage, these notches sweep up and down the audio spectrum, generating the signature psychedelic 'whoosh'.
    </p>
</div>

<h3>2. The Stages Architecture (A-Level Core Specification)</h3>
<p style="color: #cbd5e1; line-height: 1.6;">
    The number of cancellation notches created across the audio spectrum depends directly on the number of all-pass stages in the circuit. Each pair of all-pass stages creates exactly one notch:
</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 20px 0;">
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #f59e0b; margin: 0 0 6px 0; font-size: 15px;">2-Stage Phaser</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Produces <strong>1 notch</strong>. Subtle, transparent phase shading (e.g. <em>MXR Phase 45</em>, Uni-Vibe style pulse).</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #f59e0b; margin: 0 0 6px 0; font-size: 15px;">4-Stage Phaser</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Produces <strong>2 notches</strong>. The definitive rock guitar phaser (e.g. <em>MXR Phase 90</em>, <em>Electro-Harmonix Small Stone</em>).</p>
    </div>
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;">
        <h4 style="color: #f59e0b; margin: 0 0 6px 0; font-size: 15px;">8 to 12-Stage Phaser</h4>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Produces <strong>4 to 6 notches</strong>. Highly complex, dense, multi-peak swooshing (e.g. <em>MXR Phase 100</em>, <em>Mu-Tron Bi-Phase</em>).</p>
    </div>
</div>

<h3>3. Key Controls</h3>
<ul style="line-height: 1.8; color: #cbd5e1;">
    <li><strong>Speed / Rate (Hz):</strong> Governs the frequency of the LFO sweeping the all-pass filter notches up and down the frequency spectrum.</li>
    <li><strong>Depth / Width:</strong> Determines how wide the frequency band is through which the notches sweep. High depth sweeps across both deep bass and shimmering highs.</li>
    <li><strong>Feedback / Resonance (Regen):</strong> Reroutes a portion of the phase-shifted output back into the first all-pass filter stage. This accentuates frequencies immediately adjacent to the notches with sharp resonant peaks, transforming a mild wash into an aggressive, vocal, hollow jet sweep.</li>
</ul>

<h3>4. Classic Applications &amp; Seminal Examples</h3>
<ul style="line-height: 1.8; color: #cbd5e1;">
    <li><strong>Eddie Van Halen (1978):</strong> Used an original script logo MXR Phase 90 placed directly in front of his cranked Marshall 1959 Super Lead Plexi amplifier on <em>'Ain't Talkin' 'Bout Love'</em> and <em>'Eruption'</em>. Placed before distortion, the sweeping notches dynamically altered which frequencies saturated into clipping.</li>
    <li><strong>David Gilmour / Pink Floyd:</strong> Employed the MXR Phase 90 extensively across <em>The Dark Side of the Moon</em> (1973) and <em>Wish You Were Here</em> (1975) for ethereal sweeping 4-voice guitar arpeggios.</li>
    <li><strong>The Mu-Tron Bi-Phase (1974):</strong> Dual 6-stage phaser utilized by dub pioneer Lee 'Scratch' Perry at the Black Ark studio in Jamaica, processing entire drum kits and horns through sweeping phase cancellation.</li>
</ul>
"""
    },
    {
        "id": 297831,
        "slug": "flanger",
        "anchor": "flanger",
        "quiz_slug": "flanger-interactive-quiz",
        "hw_file": "homework-flanger.html",
        "title": "Flanger Effect",
        "subtitle": "Tape Reel Flanging, Comb Filtering Harmonics (1–15ms), Jet Plane Resonant Sweeps & Through-Zero Phase Inversion",
        "color": "#ec4899",
        "gradient": "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
        "landmark_title": "Heart - 'Barracuda' (1977)",
        "landmark_vid": "PeMvMNpvB5M",
        "landmark_note": "Iconic galloping rock rhythm guitar featuring aggressive BBD analog flanging with heavy feedback resonance.",
        "gear_title": "Analog Tape Flanging Demonstration & Physics",
        "gear_vid": "k-efYklAa5Q",
        "gear_note": "Live demonstration of tape reel manipulation illustrating how dragging a thumb on the metal tape reel flange produces time delays.",
        "shootout_title": "Phaser vs Flanger vs Chorus vs Vibrato",
        "shootout_vid": "z9tg5ELAW7o",
        "shootout_note": "A-Level masterclass comparing flanger comb filtering (harmonic notches) with phaser all-pass filtering (non-harmonic notches).",
        "theory_html": """
<h3>1. What is a Flanger?</h3>
<p>A <strong>Flanger</strong> is a time-based modulation effect that splits an audio signal into two paths, delays one path by a microscopic interval between <strong>1 ms and 15 ms</strong>, modulates that delay time continuously with a Low Frequency Oscillator (LFO), and recombines it with the dry signal. This produces a series of harmonically spaced cancellation notches known as a <strong>Comb Filter</strong>, creating an intense, sweeping 'jet-plane' or 'wind-tunnel' sound.</p>

<div style="background: #0f172a; border-left: 4px solid #ec4899; border-radius: 0 12px 12px 0; padding: 18px 22px; margin: 24px 0;">
    <h4 style="color: #ec4899; margin: 0 0 8px 0; font-size: 16px;">The Historical Origin: Manual Tape Reel Flanging (1960s):</h4>
    <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.7;">
        Flanging was originally discovered accidentally in tape recording studios during the 1960s (notably at Abbey Road by Ken Townsend and John Lennon, and in Olympic Studios by Eddie Kramer with Jimi Hendrix).
        Two identical reel-to-reel tape recorders were set up playing the exact same audio recording simultaneously in synchronization. An audio engineer would press their thumb firmly against the rim or <strong>flange</strong> of the supply reel of one machine. The mechanical friction slowed the tape by a fraction of a millisecond. When released, the motor accelerated back into synchronization. As the two tapes passed through zero time difference (<em>Through-Zero Flanging</em>), absolute phase cancellation occurred, sweeping a dramatic comb filter across the entire audible spectrum!
    </p>
</div>

<h3>2. Comb Filtering Physics (A-Level Critical Distinction)</h3>
<p style="color: #cbd5e1; line-height: 1.6;">
    When a dry audio signal is summed with a copy delayed by time $\tau$ (tau), destructive phase cancellation occurs at all frequencies where the delayed signal arrives exactly 180 degrees out of phase:
</p>
<div style="background: #1e1b4b; border: 1px solid #4338ca; border-radius: 12px; padding: 18px 22px; margin: 20px 0;">
    <h4 style="color: #a5b4fc; margin: 0 0 8px 0; font-size: 15px;">Mathematical Formula for Comb Filter Notches:</h4>
    <code style="display: block; background: #0f172a; color: #ec4899; padding: 10px 14px; border-radius: 8px; font-size: 13.5px; font-family: monospace;">
        Notch Frequencies (Hz) = (2n + 1) / (2 * Delay_Time)<br>
        For a 2 ms delay (0.002s):<br>
        - Notch 1 (n=0): 1 / (2 * 0.002) = 250 Hz<br>
        - Notch 2 (n=1): 3 / (2 * 0.002) = 750 Hz<br>
        - Notch 3 (n=2): 5 / (2 * 0.002) = 1,250 Hz<br>
        - Notch 4 (n=3): 7 / (2 * 0.002) = 1,750 Hz
    </code>
    <p style="font-size: 13px; color: #c7d2fe; margin: 10px 0 0 0;">Notice that all flanger notches form a <strong>linear harmonic series</strong> (odd integer multiples: 1x, 3x, 5x, 7x). This is why a flanger sounds musical and harmonically intense compared to a phaser!</p>
</div>

<h3>3. Flanger vs. Phaser: Critical Exam Comparison Matrix</h3>
<div style="overflow-x: auto; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px; background: #0f172a; border-radius: 10px; overflow: hidden;">
        <thead>
            <tr style="background: #1e293b; color: #ffffff;">
                <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">Feature / Characteristic</th>
                <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #ec4899;">Flanger</th>
                <th style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #f59e0b;">Phaser</th>
            </tr>
        </thead>
        <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 12px 16px; font-weight: 700; color: #e2e8f0;">Circuit Technology</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">True micro time delay line (BBD chip or digital buffer)</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">All-pass RC filter stages (No time delay)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 12px 16px; font-weight: 700; color: #e2e8f0;">Delay Time Range</td>
                <td style="padding: 12px 16px; color: #cbd5e1;"><strong>1 ms to 15 ms</strong></td>
                <td style="padding: 12px 16px; color: #cbd5e1;"><strong>&lt; 1 ms</strong> (Phase shift only)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 12px 16px; font-weight: 700; color: #e2e8f0;">Notch Relationship</td>
                <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Harmonically related</strong> (Comb filter series)</td>
                <td style="padding: 12px 16px; color: #cbd5e1;"><strong>Non-harmonic</strong> (Dependent on RC capacitor values)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 12px 16px; font-weight: 700; color: #e2e8f0;">Number of Notches</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">Infinite series extending up through the Nyquist frequency</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">Fixed by stages: 4-stage = 2 notches, 8-stage = 4 notches</td>
            </tr>
            <tr>
                <td style="padding: 12px 16px; font-weight: 700; color: #e2e8f0;">Sonic Character</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">Sharp metallic 'jet-engine' whoosh with pronounced resonant whistle</td>
                <td style="padding: 12px 16px; color: #cbd5e1;">Chewy, liquid, watery, warm swirling sweeps</td>
            </tr>
        </tbody>
    </table>
</div>

<h3>4. Iconic Tracks &amp; Classic Stompbox Units</h3>
<ul style="line-height: 1.8; color: #cbd5e1;">
    <li><strong>Heart – 'Barracuda' (1977):</strong> Famous galloping rhythm guitar riff processed through aggressive BBD flanging with heavy feedback regeneration.</li>
    <li><strong>Small Faces – 'Itchycoo Park' (1967):</strong> Engineered by Glyn Johns at Olympic Studios; one of the first pop records to showcase dramatic manual tape flanging on Keith Moon's drum fills.</li>
    <li><strong>The Police – 'Walking on the Moon' (1979):</strong> Andy Summers' clean guitar sound shaped by the <em>Electro-Harmonix Electric Mistress</em> flanger, producing lush chorused shimmering sweeps.</li>
    <li><strong>Classic Hardware:</strong> <em>Electro-Harmonix Electric Mistress</em> (1976), <em>MXR 117 Flanger</em> (1976), <em>Eventide FL 201 Instant Flanger</em> (1975 rackmount studio unit).</li>
</ul>
"""
    }
]

def generate_page_html(effect):
    p_id = effect["id"]
    slug = effect["slug"]
    anchor = effect["anchor"]
    quiz_slug = effect["quiz_slug"]
    hw_file = effect["hw_file"]
    title = effect["title"]
    subtitle = effect["subtitle"]
    color = effect["color"]
    gradient = effect["gradient"]

    # Navigation bar with links to all 5 studio effects
    nav_links = []
    for other in EFFECTS:
        is_active = (other["id"] == p_id)
        active_style = f"background: {other['color']}; color: #000000; font-weight: 800;" if is_active else "background: rgba(255,255,255,0.06); color: #94a3b8;"
        nav_links.append(f"""
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/{other['slug']}/" style="{active_style} padding: 8px 14px; border-radius: 8px; text-decoration: none; font-size: 12.5px; transition: all 0.2s ease;">
                {other['title'].replace(' Effects', '').replace(' Effect', '')}
            </a>
        """)
    nav_html = "".join(nav_links)

    html = f"""
<div id="mtg-dark-theme-wrapper" style="background: #080e1a; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; max-width: 980px; margin: 0 auto; padding: 10px 0 50px 0;">

    <!-- 1. Hero Card -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-left: 6px solid {color}; border-radius: 18px; padding: 34px 28px; margin-bottom: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.35);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <div style="display: inline-block; background: rgba(255, 255, 255, 0.08); color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12);">
                Component 3: Music Technology in Context &bull; Studio Effects
            </div>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="color: #94a3b8; font-size: 12.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; font-weight: 600;">
                &larr; Back to Component 3 Hub
            </a>
        </div>
        <h1 style="color: #ffffff !important; font-size: clamp(26px, 4vw, 36px); font-weight: 900; margin: 0 0 10px 0; line-height: 1.2; letter-spacing: -0.5px;">
            {title}
        </h1>
        <p style="color: #94a3b8; font-size: 15px; margin: 0 0 18px 0; line-height: 1.6; max-width: 820px;">
            {subtitle}
        </p>
        <!-- Suite Switcher Pills -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-right: 4px;">Studio Effects Suite:</span>
            {nav_html}
        </div>
    </div>

    <!-- 2. Master Interactive Deck Embed Section -->
    <div style="background: linear-gradient(135deg, #0b1120 0%, #0f172a 100%); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 18px; padding: 22px; margin-bottom: 35px; box-shadow: 0 18px 40px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Split-Screen Learning &bull; Slide Deck</span>
                <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                    {title}: Interactive Audio Presentation
                </h3>
            </div>
            <a href="https://app.musictechguru.com/interactive-slide-studio-effects#{anchor}" target="_blank" rel="noopener" style="background: {gradient}; color: #ffffff !important; text-decoration: none; font-size: 12.5px; font-weight: 800; padding: 9px 18px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); display: inline-flex; align-items: center; gap: 6px;">
                <span>Full Screen Deck</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>
        
        <!-- Iframe with hash routing -->
        <div style="position: relative; width: 100%; height: 860px; border-radius: 12px; overflow: hidden; background: #030712; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
            <iframe src="https://app.musictechguru.com/interactive-slide-studio-effects#{anchor}" style="width: 100%; height: 100%; border: 0;" title="{title} Interactive Slide Deck" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 12px; font-size: 12px; color: #64748b;">
            <div><span>Navigation:</span> Use arrows on screen, keyboard <kbd style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px; color: #cbd5e1;">&larr;</kbd> <kbd style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px; color: #cbd5e1;">&rarr;</kbd>, or the slide selector.</div>
            <div style="color: {color}; font-weight: 700;">6 In-Depth Study Slides &bull; 6 Audio Case Studies &bull; Master Specification Matrix</div>
        </div>
    </div>

    <!-- 3. Core Technical Syllabus Guide -->
    <div style="color: #cbd5e1; font-size: 15px; margin-bottom: 40px;">
        {effect["theory_html"]}
    </div>

    <!-- 4. Interactive Quiz Assessment Section -->
    <div style="background: linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 18px; padding: 22px; margin-bottom: 35px; box-shadow: 0 18px 40px rgba(0,0,0,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
                <span style="color: #c084fc; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Exam-Standard Assessment &bull; 10 Questions</span>
                <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                    {title}: Interactive Specification Quiz
                </h3>
                <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">
                    Instant score feedback, audio circuit explanations, parameter calculations, and Edexcel Component 3 exam scoring.
                </p>
            </div>
            <a href="https://app.musictechguru.com/{quiz_slug}" target="_blank" rel="noopener" style="background: #9333ea; color: #ffffff !important; text-decoration: none; font-size: 12.5px; font-weight: 800; padding: 9px 18px; border-radius: 8px; box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4); display: inline-flex; align-items: center; gap: 6px;">
                <span>Open Quiz Fullscreen</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        </div>
        
        <div style="position: relative; width: 100%; height: 780px; border-radius: 12px; overflow: hidden; background: #030712; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
            <iframe src="https://app.musictechguru.com/{quiz_slug}" style="width: 100%; height: 100%; border: 0;" title="{title} Interactive Quiz" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    </div>

    <!-- 5. Printable Homework & Exam Revision Pack Banner -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 16px; padding: 26px; margin-bottom: 40px; box-shadow: 0 12px 30px rgba(0,0,0,0.3); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <div style="max-width: 620px;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 3px 10px; border-radius: 12px; margin-bottom: 8px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Printable Worksheet &bull; Homework Pack &bull; Mark Scheme
            </div>
            <h3 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0 0 6px 0;">
                {title}: Extended Exam Revision Pack
            </h3>
            <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5; margin: 0;">
                Comprehensive 3-part homework pack with Part A: Multiple Choice (10 marks), Part B: Signal Flow &amp; Technical Analysis (15 marks), and Part C: 8-Mark Extended Evaluation Essay Question with complete Pearson Edexcel mark scheme.
            </p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="https://app.musictechguru.com/downloads/homework/{hw_file}" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff !important; padding: 12px 22px; border-radius: 10px; font-weight: 800; font-size: 13px; text-decoration: none; box-shadow: 0 6px 18px rgba(2, 132, 199, 0.35); display: inline-flex; align-items: center; gap: 8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                <span>Print / Save PDF Pack</span>
            </a>
        </div>
    </div>

    <!-- 6. Curated Video Listening Lounge -->
    <div style="margin-bottom: 45px;">
        <div style="margin-bottom: 18px;">
            <span style="color: {color}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Ear Training &bull; Audio Demonstrations</span>
            <h3 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 4px 0 0 0; letter-spacing: -0.5px;">
                {title}: Video Listening Lounge &amp; Technical Shootouts
            </h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 18px;">
            <!-- Landmark Track -->
            <div style="background: #111827; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 10px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/{effect['landmark_vid']}" title="{effect['landmark_title']}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div style="margin-bottom: 6px;">
                    <span style="color: {color}; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Landmark Audio Study</span>
                    <strong style="display: block; color: #ffffff; font-size: 13.5px; margin-top: 2px;">{effect['landmark_title']}</strong>
                </div>
                <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.45;">
                    {effect['landmark_note']}
                </p>
            </div>
            <!-- Hardware Deep Dive -->
            <div style="background: #111827; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 10px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/{effect['gear_vid']}" title="{effect['gear_title']}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div style="margin-bottom: 6px;">
                    <span style="color: {color}; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">Circuit &amp; Transduction</span>
                    <strong style="display: block; color: #ffffff; font-size: 13.5px; margin-top: 2px;">{effect['gear_title']}</strong>
                </div>
                <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.45;">
                    {effect['gear_note']}
                </p>
            </div>
            <!-- Shootout / Comparison -->
            <div style="background: #111827; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; margin-bottom: 10px; background: #000;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube-nocookie.com/embed/{effect['shootout_vid']}" title="{effect['shootout_title']}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div style="margin-bottom: 6px;">
                    <span style="color: {color}; font-size: 10.5px; font-weight: 800; text-transform: uppercase;">A-Level Shootout</span>
                    <strong style="display: block; color: #ffffff; font-size: 13.5px; margin-top: 2px;">{effect['shootout_title']}</strong>
                </div>
                <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.45;">
                    {effect['shootout_note']}
                </p>
            </div>
        </div>
    </div>

    <!-- 7. Back to Hub & Navigation Footer -->
    <div style="margin-top: 30px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
        <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/" style="display: inline-flex; align-items: center; gap: 8px; color: #00C1F0; font-weight: 700; text-decoration: none; font-size: 14px;">
            &larr; Back to Component 3 Hub Overview
        </a>
        <a href="https://app.musictechguru.com/" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #00A3FF 0%, #0077EE 100%); color: #ffffff !important; padding: 10px 20px; border-radius: 20px; font-weight: 700; font-size: 13px; text-decoration: none;">
            Practice Exam Questions on Web App &rarr;
        </a>
    </div>

</div>
"""
    return html

def update_wordpress_page(effect):
    p_id = effect["id"]
    title = effect["title"]
    content = generate_page_html(effect)
    
    # Save local copy
    with open(f"scripts/page_{p_id}_{effect['slug']}_updated.html", "w", encoding="utf-8") as f:
        f.write(content)
        
    payload = json.dumps({
        "content": content
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{WP_URL}/pages/{p_id}",
        data=payload,
        headers=headers,
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"SUCCESS: Page {p_id} ({title}) updated! URL: {data.get('link')}")
            return True
    except Exception as e:
        print(f"ERROR updating Page {p_id}: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))
        return False

def main():
    print("Beginning update of all 5 Studio Effects pages on WordPress...")
    for effect in EFFECTS:
        update_wordpress_page(effect)
    print("\nAll 5 pages processed!")

if __name__ == "__main__":
    main()
