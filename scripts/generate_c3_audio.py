import math
import struct
import wave
import subprocess
import os

SAMPLE_RATE = 44100

def create_synth_track(duration_sec, generator_fn, wav_path, mp3_path):
    num_samples = int(SAMPLE_RATE * duration_sec)
    wav_file = wave.open(wav_path, 'w')
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    
    frames = bytearray()
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        left, right = generator_fn(t, duration_sec)
        
        # Soft limiter / clamp
        left = max(-0.95, min(0.95, left))
        right = max(-0.95, min(0.95, right))
        
        # Fade in/out
        if t < 0.2:
            fade = t / 0.2
            left *= fade
            right *= fade
        elif t > duration_sec - 0.5:
            fade = (duration_sec - t) / 0.5
            left *= fade
            right *= fade
            
        i_left = int(left * 32767)
        i_right = int(right * 32767)
        frames.extend(struct.pack('<hh', i_left, i_right))
        
    wav_file.writeframes(frames)
    wav_file.close()
    
    # Convert to MP3 using ffmpeg
    subprocess.run([
        'ffmpeg', '-y', '-i', wav_path, 
        '-codec:a', 'libmp3lame', '-b:a', '192k', mp3_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    if os.path.exists(wav_path):
        os.remove(wav_path)
    print(f"Generated {mp3_path} ({os.path.getsize(mp3_path)} bytes)")

# Helper oscillators
def sin_wave(freq, t):
    return math.sin(2 * math.pi * freq * t)

def saw_wave(freq, t):
    phase = (freq * t) % 1.0
    return 2.0 * phase - 1.0

def square_wave(freq, t):
    phase = (freq * t) % 1.0
    return 0.8 if phase < 0.5 else -0.8

def noise(t):
    return ((math.sin(t * 1234567.89) * 43758.5453) % 2.0) - 1.0

def kick(t_hit):
    if t_hit < 0 or t_hit > 0.35: return 0.0
    freq = 130 * math.exp(-t_hit * 25) + 45
    env = math.exp(-t_hit * 12)
    return sin_wave(freq, t_hit) * env * 0.9

def snare(t_hit):
    if t_hit < 0 or t_hit > 0.25: return 0.0
    env = math.exp(-t_hit * 18)
    tone = sin_wave(185, t_hit) * env * 0.4
    snare_noise = noise(t_hit) * env * 0.5
    return tone + snare_noise

def hihat(t_hit, closed=True):
    dur = 0.05 if closed else 0.25
    if t_hit < 0 or t_hit > dur: return 0.0
    env = math.exp(-t_hit * (60 if closed else 15))
    return noise(t_hit) * env * 0.3

def rimshot(t_hit):
    if t_hit < 0 or t_hit > 0.15: return 0.0
    env = math.exp(-t_hit * 35)
    return (sin_wave(850, t_hit) * 0.5 + noise(t_hit) * 0.4) * env

# REGGAE TRACKS GENERATORS
def gen_reggae_exodus(t, dur):
    bpm = 78.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    sub_beat = beat % 1.0
    
    # One drop: Kick & Snare on Beat 3 (which is bar in [2.0, 3.0))
    t_beat3 = (bar - 2.0) * (60.0 / bpm)
    k = kick(t_beat3)
    s = snare(t_beat3) * 0.8 + rimshot(t_beat3) * 0.6
    
    # Hi-hat on every 8th note
    t_hh = (beat % 0.5) * (60.0 / bpm)
    hh = hihat(t_hh, closed=True) * 0.4
    
    # Reggae Skank chords on beats 2 & 4 (bar 1.0 and 3.0)
    skank = 0.0
    for beat_idx in [1.0, 3.0]:
        t_skank = (bar - beat_idx) * (60.0 / bpm)
        if 0 <= t_skank < 0.18:
            env = math.exp(-t_skank * 20)
            # A minor triad (A4 440, C5 523.25, E5 659.25)
            skank += (sin_wave(440, t) + sin_wave(523.25, t) + sin_wave(659.25, t)) * env * 0.25
            
    # Deep roots bassline (A1 55Hz, C2 65.4Hz, D2 73.4Hz, E2 82.4Hz)
    bass_notes = [55.0, 55.0, 65.41, 82.41]
    curr_bass_freq = bass_notes[int(bar) % 4]
    bass = sin_wave(curr_bass_freq, t) * 0.6 + sin_wave(curr_bass_freq * 2, t) * 0.2
    
    out_l = (k + s + hh * 0.7 + skank * 0.9 + bass) * 0.7
    out_r = (k + s + hh * 0.3 + skank * 0.5 + bass) * 0.7
    return out_l, out_r

def gen_reggae_superape(t, dur):
    bpm = 72.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Dub rimshot with spring reverb splash on beat 3
    t_rim = (bar - 2.0) * (60.0 / bpm)
    rim = rimshot(t_rim)
    # Reverb / echo on rimshot
    echo1 = rimshot(t_rim - 0.375) * 0.6
    echo2 = rimshot(t_rim - 0.750) * 0.35
    echo3 = rimshot(t_rim - 1.125) * 0.2
    rim_fx = rim + echo1 + echo2 + echo3
    
    # Sub bass in G (G1 49Hz)
    bass = (sin_wave(48.99, t) * 0.8 + sin_wave(97.99, t) * 0.3) * (0.8 + 0.2 * sin_wave(2, t))
    
    # Filter sweep noise (Space Echo hiss/sweep)
    sweep_filter = (sin_wave(0.15, t) + 1.0) * 800 + 400
    sweep = noise(t) * 0.05 * sin_wave(sweep_filter, t)
    
    out_l = (rim_fx * 0.8 + bass + sweep) * 0.75
    out_r = (rim_fx * 0.5 + bass + sweep * 1.2) * 0.75
    return out_l, out_r

def gen_reggae_kingtubby(t, dur):
    bpm = 76.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Augustus Pablo style Melodica lead
    # Melody notes in D minor: D4 293.66, F4 349.23, A4 440.0, G4 392.0
    mel_notes = [293.66, 349.23, 440.0, 392.0]
    note = mel_notes[int(beat) % 4]
    # Melodica has rich reed harmonics (saw + square)
    melodica = (saw_wave(note, t) * 0.3 + square_wave(note, t) * 0.2) * 0.4
    # Tape delay on melodica
    del_t = (t - 0.395)
    mel_del = (saw_wave(note, del_t) * 0.2 + square_wave(note, del_t) * 0.15) * 0.25 if del_t > 0 else 0.0
    
    # One drop drums
    t_snare = (bar - 2.0) * (60.0 / bpm)
    s = rimshot(t_snare) * 0.7 + snare(t_snare) * 0.5
    
    # Heavy D bass
    bass = sin_wave(73.42, t) * 0.7
    
    out_l = (melodica + mel_del * 0.8 + s + bass) * 0.7
    out_r = (melodica * 0.7 + mel_del * 1.1 + s * 0.6 + bass) * 0.7
    return out_l, out_r

def gen_reggae_toots(t, dur):
    bpm = 92.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Brisk rocksteady beat: Kick on 1 and 3, Snare on 2 and 4
    t_k = (bar % 2.0) * (60.0 / bpm)
    k = kick(t_k) * 0.7
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.6
    
    # Upbeat rhythm guitar skank
    t_up = ((beat + 0.5) % 1.0) * (60.0 / bpm)
    skank = (sin_wave(330, t) + sin_wave(392, t) + sin_wave(523, t)) * math.exp(-t_up * 25) * 0.2 if t_up < 0.15 else 0.0
    
    # Bouncy bassline in C major (C2, E2, G2, A2)
    c_walk = [65.41, 82.41, 98.00, 110.00]
    bfreq = c_walk[int(beat) % 4]
    bass = (sin_wave(bfreq, t) + sin_wave(bfreq * 2, t) * 0.3) * 0.6
    
    return (k + s + skank + bass) * 0.75, (k + s + skank * 0.8 + bass) * 0.75

def gen_reggae_jacobmiller(t, dur):
    bpm = 75.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Roots vocal flute/melody
    f_freq = 329.63 if (beat % 4 < 2) else 392.00
    flute = sin_wave(f_freq, t) * 0.35 + sin_wave(f_freq * 2, t) * 0.1
    
    # Standard roots reggae groove
    t_s = (bar - 2.0) * (60.0 / bpm)
    s = rimshot(t_s) * 0.6 + kick(t_s) * 0.7
    
    bass = sin_wave(82.41, t) * 0.65
    return (flute + s + bass) * 0.7, (flute * 0.8 + s + bass) * 0.7

def gen_reggae_kingtubby_dub(t, dur):
    bpm = 75.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Dub version of Jacob Miller: Flute is cut out on bars 2 and 4, heavy tape delay on bar 1
    flute = 0.0
    if int(beat / 4) % 2 == 0:
        f_freq = 329.63 if (beat % 4 < 2) else 392.00
        flute = (sin_wave(f_freq, t) * 0.35) * (1.0 + sin_wave(4, t) * 0.3)
        # Heavy delay echo
        flute += (sin_wave(f_freq, t - 0.4) * 0.25) if t > 0.4 else 0.0
        
    t_s = (bar - 2.0) * (60.0 / bpm)
    s = (rimshot(t_s) * 0.8 + kick(t_s) * 0.8)
    # Giant dub snare echo
    s += rimshot(t_s - 0.4) * 0.5 + rimshot(t_s - 0.8) * 0.3
    
    bass = sin_wave(82.41, t) * 0.85
    return (flute + s + bass) * 0.75, (flute * 0.5 + s + bass) * 0.75

def gen_reggae_blackboard(t, dur):
    bpm = 70.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Tape delay sweeps + spring reverb crashes
    t_crash = (beat % 8.0) * (60.0 / bpm)
    crash = (noise(t) * math.exp(-t_crash * 3)) * 0.35 if t_crash < 1.5 else 0.0
    
    # Heavy one-drop beat
    t_s = (bar - 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.7 + kick(t_s) * 0.8
    
    # Lee Perry deep bass
    bass = (sin_wave(55.0, t) * 0.8 + sin_wave(110.0, t) * 0.2)
    tape_hiss = noise(t) * 0.02
    
    return (crash + s + bass + tape_hiss) * 0.75, (crash * 0.6 + s + bass + tape_hiss) * 0.75

# SOUL TRACKS GENERATORS
def gen_soul_hurrylove(t, dur):
    bpm = 98.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Driving Motown 8th note tambourine
    t_tam = (beat % 0.5) * (60.0 / bpm)
    tam = hihat(t_tam, closed=False) * 0.45
    
    # Motown 4-on-the-floor kick + snare on 2 and 4
    t_k = (beat % 1.0) * (60.0 / bpm)
    k = kick(t_k) * 0.6
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.65
    
    # James Jamerson syncopated bassline in Bb (Bb1 58.27, F2 87.31, D2 73.42)
    jam_notes = [58.27, 87.31, 73.42, 58.27]
    bfreq = jam_notes[int(beat * 2) % 4]
    bass = (sin_wave(bfreq, t) + sin_wave(bfreq * 2, t) * 0.4) * 0.7
    
    # Piano baritone chords
    p_env = math.exp(-(beat % 1.0) * (60.0 / bpm) * 8)
    piano = (sin_wave(233.08, t) + sin_wave(293.66, t) + sin_wave(349.23, t)) * p_env * 0.25
    
    return (k + s + tam + bass + piano) * 0.75, (k + s + tam * 0.8 + bass + piano * 0.9) * 0.75

def gen_soul_grapevine(t, dur):
    bpm = 118.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Wurlitzer electric piano iconic intro riff in Eb minor
    # Eb4 311.13, Gb4 369.99, Bb4 466.16, Ab4 415.30
    wurl_notes = [311.13, 369.99, 466.16, 415.30]
    w_idx = int(beat * 2) % 4
    w_env = math.exp(-((beat * 2) % 1.0) * (30.0 / bpm) * 12)
    wurl = (sin_wave(wurl_notes[w_idx], t) * 0.6 + sin_wave(wurl_notes[w_idx] * 2, t) * 0.2) * w_env * 0.4
    
    # Tambourine & Stomp
    t_stomp = (beat % 1.0) * (60.0 / bpm)
    stomp = kick(t_stomp) * 0.5 + hihat(t_stomp, closed=False) * 0.3
    
    # Strings pad in background
    strings = (sin_wave(622.25, t) + sin_wave(739.99, t)) * 0.15
    
    # Bass in Eb (Eb1 38.89Hz)
    bass = sin_wave(77.78, t) * 0.6
    
    return (wurl + stomp + strings + bass) * 0.75, (wurl * 0.8 + stomp + strings * 1.2 + bass) * 0.75

def gen_soul_superstition(t, dur):
    bpm = 100.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Clavinet D6 funk riff in Eb minor
    # Sharp percussive attack, rich in harmonics (pulse wave)
    clav_notes = [155.56, 185.00, 207.65, 233.08, 277.18]
    c_idx = int(beat * 4) % 5
    c_env = math.exp(-((beat * 4) % 1.0) * (15.0 / bpm) * 20)
    clav = (square_wave(clav_notes[c_idx], t) * 0.35 + saw_wave(clav_notes[c_idx], t) * 0.25) * c_env * 0.5
    
    # Funky drums: tight kick and snare
    t_k = ((beat) % 1.0) * (60.0 / bpm)
    k = kick(t_k) * 0.65
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.7
    
    # TONTO synth bass
    bass = sin_wave(77.78, t) * 0.7 + sin_wave(155.56, t) * 0.3
    
    # Horn stabs on upbeat
    t_horn = ((beat + 0.5) % 2.0) * (60.0 / bpm)
    horns = (saw_wave(466.16, t) + saw_wave(554.37, t)) * math.exp(-t_horn * 15) * 0.25 if t_horn < 0.2 else 0.0
    
    return (clav + k + s + bass + horns) * 0.75, (clav * 0.7 + k + s + bass + horns * 1.1) * 0.75

def gen_soul_dockofthebay(t, dur):
    bpm = 104.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Steve Cropper acoustic guitar strums (G major, B minor, C, B, Bb, A)
    g_env = math.exp(-((beat * 2) % 1.0) * (30.0 / bpm) * 10)
    guitar = (sin_wave(392.0, t) + sin_wave(493.88, t) + sin_wave(587.33, t)) * g_env * 0.3
    
    # Gentle kick and snare
    t_k = (bar % 2.0) * (60.0 / bpm)
    k = kick(t_k) * 0.5
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.45
    
    # Ocean waves and seagulls ambient sound
    ocean = noise(t) * (0.05 + 0.04 * sin_wave(0.2, t))
    seagull = sin_wave(2200 + 400 * sin_wave(3, t), t) * 0.05 if (int(t) % 6 == 3) else 0.0
    
    bass = sin_wave(98.0, t) * 0.6
    
    return (guitar + k + s + bass + ocean + seagull) * 0.75, (guitar * 0.8 + k + s + bass + ocean * 1.1 + seagull * 0.7) * 0.75

def gen_soul_mountain_orig(t, dur):
    bpm = 128.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Driving Motown pop soul: Kick & tambourine
    t_tam = (beat % 0.5) * (60.0 / bpm)
    tam = hihat(t_tam, closed=False) * 0.4
    t_k = (beat % 1.0) * (60.0 / bpm)
    k = kick(t_k) * 0.6
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.65
    
    # Glockenspiel bells (B5 987.77, D#6 1244.5, F#6 1479.98)
    glock = (sin_wave(987.77, t) + sin_wave(1244.5, t)) * math.exp(-((beat % 1.0) * (60.0 / bpm)) * 15) * 0.15
    
    # Lush string chords
    strings = (sin_wave(493.88, t) + sin_wave(587.33, t) + sin_wave(739.99, t)) * 0.2
    
    bass = sin_wave(123.47, t) * 0.65
    
    return (tam + k + s + glock + strings + bass) * 0.75, (tam * 0.7 + k + s + glock * 1.2 + strings * 0.9 + bass) * 0.75

def gen_soul_mountain_live(t, dur):
    bpm = 100.0
    # Dramatic slow orchestral intro (Diana Ross version)
    # Slow French Horn / Cello swells
    swell = (sin_wave(130.81, t) + sin_wave(164.81, t) + sin_wave(196.00, t)) * (0.3 + 0.2 * sin_wave(0.3, t))
    # High strings
    hi_str = (sin_wave(523.25, t) + sin_wave(659.25, t)) * 0.2
    # Timpani roll
    timp = sin_wave(65.41, t) * 0.3 * (0.5 + 0.5 * sin_wave(4, t))
    
    return (swell + hi_str + timp) * 0.75, (swell * 0.9 + hi_str * 1.1 + timp) * 0.75

def gen_soul_ifeelgood(t, dur):
    bpm = 144.0
    beat = (t * (bpm / 60.0))
    bar = beat % 4.0
    
    # Sharp brass horn blasts (D7 chord: D5, F#5, A5, C6)
    t_horn = (bar % 2.0) * (60.0 / bpm)
    horn_env = math.exp(-t_horn * 12) if t_horn < 0.25 else 0.0
    horns = (saw_wave(587.33, t) + saw_wave(739.99, t) + saw_wave(880.0, t)) * horn_env * 0.35
    
    # Fast funk guitar chop (16th note chank)
    t_chank = ((beat * 4) % 1.0) * (15.0 / bpm)
    chank = (noise(t) * 0.4 + sin_wave(600, t) * 0.3) * math.exp(-t_chank * 30) * 0.25
    
    # Tight punchy drums
    t_k = (bar % 1.0) * (60.0 / bpm)
    k = kick(t_k) * 0.7
    t_s = ((bar - 1.0) % 2.0) * (60.0 / bpm)
    s = snare(t_s) * 0.75
    
    bass = sin_wave(73.42, t) * 0.65
    
    return (horns + chank + k + s + bass) * 0.75, (horns * 0.8 + chank * 1.1 + k + s + bass) * 0.75

TRACKS = [
    # Reggae
    (20.0, gen_reggae_exodus, 'public/Music/C3_REGGAE/Q1_C3_Exodus.mp3'),
    (20.0, gen_reggae_superape, 'public/Music/C3_REGGAE/Q2_C3_SuperApe.mp3'),
    (20.0, gen_reggae_kingtubby, 'public/Music/C3_REGGAE/Q3_C3_KingTubby.mp3'),
    (20.0, gen_reggae_toots, 'public/Music/C3_REGGAE/Q4_C3_Toots.mp3'),
    (20.0, gen_reggae_jacobmiller, 'public/Music/C3_REGGAE/Q5_C3_JacobMiller_Vocal.mp3'),
    (20.0, gen_reggae_kingtubby_dub, 'public/Music/C3_REGGAE/Q5_C3_KingTubby_Dub.mp3'),
    (20.0, gen_reggae_blackboard, 'public/Music/C3_REGGAE/Q6_C3_BlackboardJungle.mp3'),
    # Soul
    (20.0, gen_soul_hurrylove, 'public/Music/C3_SOUL/Q1_C3_YouCantHurryLove.mp3'),
    (20.0, gen_soul_grapevine, 'public/Music/C3_SOUL/Q2_C3_Grapevine.mp3'),
    (20.0, gen_soul_superstition, 'public/Music/C3_SOUL/Q3_C3_Superstition.mp3'),
    (20.0, gen_soul_dockofthebay, 'public/Music/C3_SOUL/Q4_C3_DockOfTheBay.mp3'),
    (20.0, gen_soul_mountain_orig, 'public/Music/C3_SOUL/Q5_C3_Mountain_Orig.mp3'),
    (20.0, gen_soul_mountain_live, 'public/Music/C3_SOUL/Q5_C3_Mountain_Live.mp3'),
    (20.0, gen_soul_ifeelgood, 'public/Music/C3_SOUL/Q6_C3_IFeelGood.mp3'),
]

for dur, gen, mp3 in TRACKS:
    wav_tmp = mp3.replace('.mp3', '.tmp.wav')
    create_synth_track(dur, gen, wav_tmp, mp3)

print("All 14 audio assets successfully generated!")
