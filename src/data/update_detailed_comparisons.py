import json
import urllib.request
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

WIKI_CACHE = {}

def get_wiki_img(title):
    if title in WIKI_CACHE: return WIKI_CACHE[title]
    if title == "None": return None
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=500"
        req = urllib.request.Request(url, headers={"User-Agent": "MTG-Educational-App/1.0"})
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode())
        pages = data.get("query", {}).get("pages", {})
        for k, v in pages.items():
            if "thumbnail" in v:
                img = v["thumbnail"]["source"]
                WIKI_CACHE[title] = img
                return img
    except Exception as e:
        print(f"Err fetching {title}: {e}")
    
    WIKI_CACHE[title] = None
    return None

def artist_to_wiki(artist):
    mapping = {
        "Gloria Jones": "Gloria_Jones",
        "Soft Cell": "Soft_Cell",
        "Tracy Chapman": "Tracy_Chapman",
        "Jonas Blue": "Jonas_Blue",
        "Elvis": "Elvis_Presley",
        "Pet Shop Boys": "Pet_Shop_Boys",
        "Tears for Fears": "Tears_for_Fears",
        "Gary Jules": "Gary_Jules",
        "Robert Johnson": "Robert_Johnson",
        "Cream": "Cream_(band)",
        "Beatles": "The_Beatles",
        "Joe Cocker": "Joe_Cocker",
        "New Order": "New_Order",
        "Orgy": "Orgy_(band)"
    }
    return mapping.get(artist, "Music_technology")

# Detailed explanations for Quizzes 1-6
# Format: List of dicts, one for each of the 15 questions.
details = {
    # ---------------- COMPARISON 1: Tainted Love ----------------
    "Comparison 1": [
        {
            "expl": "✅ **Gloria Jones (1964)** is correct. Her original Northern Soul version was released on a 7-inch vinyl B-side in mono, the standard format of the time.\n❌ Soft Cell's (1981) version utilized 12-inch singles and stereo mixing.",
            "quote": "The 7-inch vinyl format limited bass frequencies, shaping the punchy mid-range of Northern Soul.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. Being a 1964 soul record, the band (drums, bass, brass, vocals) played together simultaneously in one tracking room.\n❌ Soft Cell's arrangement was entirely programmed via synthesis and sequenced, not performed live by a band.",
            "quote": "Live tracking in the 60s meant headphone bleed and natural room ambience were built into the sound.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Soft Cell** is correct. Early 80s Synth-Pop relied heavily on drum machines (like the Roland CR-78) where beats are 'quantized' strictly to an uncompromising electronic grid.\n❌ Gloria Jones features a live drummer where the tempo naturally pushes and pulls.",
            "quote": "Quantization removed the human swing, defining the cold, precise heartbeat of Synth-Pop.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Soft Cell** is correct. Their version removed acoustic instruments entirely, replacing them with programmed sequences and analog synthesis.\n❌ Gloria Jones used physical instruments like a live rhythm section and brass.",
            "quote": "The synthesizer ceased being a novelty and became the foundational rhythm and harmony section.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. Her 1964 vocal is raw and uncorrected, carrying pitch imperfections that translate as authentic emotion.\n❌ Pitch correction software didn't exist in 1964 or 1981, but Soft Cell relies heavily on rigid, monotone vocal styling rather than raw soulful belts.",
            "quote": "Before Auto-Tune, a singer's emotional delivery outweighed minor pitch inaccuracies.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Soft Cell** is correct. Their recording was extended for the 12-inch dance club market, featuring long instrumental synthesizer breakdowns.\n❌ The 1964 original was a succinct 2-minute track designed for radio play.",
            "quote": "The 12-inch single allowed songs to evolve across 8 minutes, creating a journey for the dancefloor.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Soft Cell** is correct. 1980s mixing styles utilized heavier compression to reduce dynamic range ('Brickwalling') to ensure the synth leads and drums sounded as loud as possible on FM radio.\n❌ The 60s track retained much more natural dynamic volume.",
            "quote": "Heavy compression turns a dynamic performance into a relentless wall of sound.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. Her B-side was mixed entirely in Mono, meaning there is no Left/Right separation; drums, vocals, and brass sit squarely in the centre channel.\n❌ The 1981 version utilizes wide stereo panning on the synths.",
            "quote": "Mono mixing required extreme frequency shelving (EQ) to prevent instruments from masking each other.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Soft Cell** is correct. Gated Reverb—an explosive, artificial reverb that cuts off abruptly—was heavily used on 80s electronic percussion like claps and snares.\n❌ The 1964 recording relies on the natural room sound of the studio.",
            "quote": "Gated Reverb creates the illusion of an enormous room without muddying the rhythm.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Soft Cell** is correct. Marc Almond's vocals prominently feature 'Slapback Delay'—a distinct, single quick echo that adds depth without burying the vocal in reverb.\n❌ Gloria Jones' vocal sits mostly dry and upfront.",
            "quote": "Slapback echo bridges the gap between the synthetic instruments and the human vocal.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Soft Cell** is correct. The iconic pulsing synthesizer sounds heavily utilize resonant Low-Pass filter sweeps to create a sense of movement in an otherwise static sequence.\n❌ The 1964 track uses acoustic instruments which cannot be electronically filtered in this manner.",
            "quote": "A filter sweep can make an unchanging sequenced pattern feel alive and evolving.",
            "correct_artist": "Soft Cell"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. 60s records were mixed for mid-range clarity, as AM radios and vinyl could not reliably reproduce sub-bass beneath 60Hz or ultra-highs above 12kHz.\n❌ Soft Cell's digital synthesizers created much broader frequency ranges.",
            "quote": "The 'warmth' of 60s soul comes from the lack of extreme treble and the saturation of the mid-range.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. The track retains the 'micro-dynamics'—the tiny, natural volume fluctuations of human musicians playing physical instruments.\n❌ Soft Cell's drum machines and synths strike at the exact same velocity every time.",
            "quote": "Micro-dynamics are the fingerprint of a live performance; machines provide consistency, but humans provide feel.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Gloria Jones** is correct. The massive energy of the 1964 original comes from the loud, punchy stabs of the acoustic brass section (saxophones and trumpets).\n❌ Soft Cell famously removed all acoustic instruments in their cover.",
            "quote": "A sharp brass section cut through a dense mono mix better than almost any other instrument.",
            "correct_artist": "Gloria Jones"
        },
        {
            "expl": "✅ **Soft Cell** is correct. They defined the early Synth-Pop framework: one vocalist paired with one instrumentalist completely surrounded by keyboards and sequencers.\n❌ The 1964 track was a traditional vocalist-with-backing-band arrangement.",
            "quote": "The Synth-Pop duo replaced the traditional 4-piece rock band, proving machines could carry a pop song.",
            "correct_artist": "Soft Cell"
        }
    ],

    # ---------------- COMPARISON 2: Fast Car ----------------
    "Comparison 2": [
        {
            "expl": "✅ **Tracy Chapman (1988)** is correct. Her debut was released during the transition era dominated by Cassettes and the rising popularity of the CD format.\n❌ Jonas Blue (2015) released primarily via digital streaming and downloads.",
            "quote": "The pristine clarity of the late-80s CD format perfectly showcased Chapman's intimate acoustic arrangements.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Jonas Blue (2015)** is correct. The Tropical House track was produced almost entirely 'In-The-Box', meaning all synthesis and sequencing was done within a Digital Audio Workstation (DAW).\n❌ Tracy Chapman's track was recorded in a traditional analog studio with acoustic instruments.",
            "quote": "In-the-box production allows a producer to compose and mix an entire hit record on a laptop.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The percussion in the 1988 record is played by a live drummer, giving the snare hits slight timing variations that feel human and loose.\n❌ The 2015 dance track utilizes heavily quantized digital drum samples on a rigid electronic grid.",
            "quote": "A live drummer breathes with the vocalist, speeding up slightly during emotional peaks.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. A staple of modern EDM is 'Vocal Chops', where the producer slices a vocal recording and plays it back melodically like a synthesizer.\n❌ Chapman's vocal is presented entirely unaltered and continuous.",
            "quote": "Vocal chopping turns the human voice into an electronic instrument, creating a catchy, wordless hook.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. Her vocal is raw, exposing the natural nuances and minor pitch variations of a folk performance.\n❌ The 2015 cover uses modern, seamless pitch correction software (like Auto-Tune or Melodyne) to snap the vocal perfectly to the grid.",
            "quote": "The emotional weight of a folk song often lies in the imperfect, fragile cracks of an unedited voice.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. The arrangement shifts the folk song into Tropical House, necessitating a massive instrumental 'Drop' following the chorus for the dancefloor.\n❌ The acoustic original relies on steady, rhythmic guitar picking without electronic drops.",
            "quote": "The 'Drop' is the modern electronic equivalent of the classic guitar solo.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The bass simply underpins the chord progression with static volume.\n❌ The 2015 track uses heavy 'Sidechain Pumping', where the bass volume explicitly ducks every time the kick drum hits.",
            "quote": "A steady bassline anchors a folk song, while a sidechained bass makes a dance track groove.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. Modern pop tracks often use digital stereo widening to push synth pads and effects to the extreme Left and Right channels, leaving the center for the kick and vocal.\n❌ The 1988 folk track is mixed mostly centered and 'in front' of the listener.",
            "quote": "Extreme stereo panning creates a 'cavernous' mix that immerses club audiences in sound.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The intimacy of her voice is achieved by using the natural resonance of the recording room, avoiding washed-out digital reverbs.\n❌ The Jonas Blue track relies heavily on long digital hall reverbs.",
            "quote": "Dry acoustic mixes force the listener to feel as though the singer is in exactly the same room.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. The rhythmic feel of the synthesizer plucks in the 2015 track comes from a tempo-synced, dotted-8th note delay that adds an off-beat groove.\n❌ Chapman's acoustic guitar is un-effected, finding its rhythm in her strumming pattern.",
            "quote": "Tempo-synced delay transforms a simple melody into a complex rhythmic pattern.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. EDM production relies on 'risers'—synthesized white noise sweeps and high-pass filtering (removing bass)—to build massive tension before releasing the bass on the drop.\n❌ Folk production relies on lyrical narrative rather than electronic automation for tension.",
            "quote": "The white noise sweep acts as a sonic curtain opening to reveal the massive chorus.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Jonas Blue** is correct. Modern digital mastering aggressively boosts sub-bass (20-60Hz) and high-end air (10kHz+) to sound incredible on large festival systems.\n❌ The 1988 track prioritizes the warm 500Hz-2kHz mid-range where the acoustic guitar and vocal sit.",
            "quote": "The 'Smiley Face' EQ curve (boosted bass and treble) is the hallmark of modern pop gloss.",
            "correct_artist": "Jonas Blue"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The dynamic range (the difference between the quietest whisper and loudest strum) is preserved, avoiding heavy limiting.\n❌ The 2015 cover is heavily limited (compressed) to ensure constant maximum loudness.",
            "quote": "Dynamic range allows a song to tell a story through sheer volume.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The arrangement is purposefully sparse, featuring almost exclusively a single steel-string acoustic guitar and her voice.\n❌ The Tropical House mix relies on synthesizers, drum machines, and vocal samples.",
            "quote": "A great song only needs a guitar and a voice to command a room.",
            "correct_artist": "Tracy Chapman"
        },
        {
            "expl": "✅ **Tracy Chapman** is correct. The song follows a linear lyrical narrative typical of traditional folk, uninterrupted by dance breaks.\n❌ The cover song structure revolves around instrumental dance breaks.",
            "quote": "Folk storytelling relies on the listener focusing on the verse lyrics, not just the chorus hook.",
            "correct_artist": "Tracy Chapman"
        }
    ],

    # ---------------- COMPARISON 3: Always On My Mind ----------------
    "Comparison 3": [
        {
            "expl": "✅ **Elvis Presley (1972)** is correct. His massive country-pop version was released on 7-inch vinyl.\n❌ The Pet Shop Boys (1987) famously charted taking advantage of the rising CD and 12-inch Dance markets.",
            "quote": "The crackle of 7-inch vinyl is eternally associated with the warmth of 1970s Nashville recordings.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. Typical of the 'Nashville Sound' of the 70s, session musicians played together in RCA Studio B to lock in the groove live.\n❌ The 1987 cover was painstakingly programmed note-by-note into a sequencer.",
            "quote": "Session players in the 70s tracked entirely live; if someone missed a note, everyone started over.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. Because it's a live recording, the rhythm section subtly slows down and speeds up (rubato) allowing Elvis space for his emotional phrasing.\n❌ The 80s track uses MIDI sequencers that strictly lock the tempo to the decimal point.",
            "quote": "A backing band breathes with the singer, expanding and contracting the tempo to match their emotion.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Pet Shop Boys (1987)** is correct. Their version is defined by the rigid, punchy 'Orchestra Hit'—an early digital sample popularized by samplers like the Fairlight CMI.\n❌ Elvis's recording uses a physical, acoustic orchestra.",
            "quote": "The Orchestra Hit sample became the iconic, aggressive sonic signature of 80s dance producers.",
            "correct_artist": "Pet Shop Boys"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. He uses natural, uncontrolled vibrato and huge dynamic volume shifts (belting the chorus and whispering the verse) to convey regret.\n❌ Neil Tennant of the Pet Shop Boys sings with a characteristically flat, compressed, detached delivery.",
            "quote": "Elvis didn't just sing the notes; he acted out the devastation of the lyrics with his volume dynamics.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Pet Shop Boys** is correct. They radically reimagined the slow, mournful country ballad into a pulsing 128-BPM Hi-NRG dancefloor track.\n❌ Elvis kept the track as a slow, traditional country lament.",
            "quote": "A great melody can survive any genre shift. Pet Shop Boys proved you can cry on the dancefloor.",
            "correct_artist": "Pet Shop Boys"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. The natural warmth and 'glue' of the 1972 mix comes from pushing the recording levels hot onto analog magnetic tape, creating pleasing harmonic saturation.\n❌ The 1987 track utilizes early digital processors that resulted in a sharper, colder sound.",
            "quote": "Analog tape physically compresses and saturates signals, adding a golden warmth digital audio struggled to replicate.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Pet Shop Boys** is correct. The mix frequently uses auto-panners to aggressively sweep the digital brass and sequenced arpeggios violently between the Left and Right speakers for a dizzying club effect.\n❌ 1970s country mixes kept traditional panning to maintain a realistic stage image.",
            "quote": "Auto-panning artificial instruments creates a frantic, synthetic energy perfect for the club.",
            "correct_artist": "Pet Shop Boys"
        },
        {
            "expl": "✅ **Pet Shop Boys** is correct. Huge, unnatural Gated and Non-Linear Digital Reverbs on the drum machine define the explosive, 80s drum sound.\n❌ Elvis' track uses natural studio rooms or smooth plate reverbs for the drums.",
            "quote": "The invention of digital reverb allowed producers to create impossible acoustic spaces.",
            "correct_artist": "Pet Shop Boys"
        },
        {
            "expl": "✅ **Pet Shop Boys** is correct. Distinct sixteenth-note digital delays are locked exactly to the tempo, turning simple synth plucks into complex, rolling rhythmic lines.\n❌ The 1972 track relies on live strumming for its rhythm.",
            "quote": "Tempo-locked delay effectively acts as a second rhythm player, intertwining perfectly with the synthesizers.",
            "correct_artist": "Pet Shop Boys"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. The RCA Studio B session utilized real string players and horn sections to provide the sweeping emotional swells behind the chorus.\n❌ The Pet Shop Boys replaced the real players with synthetic string and brass emulation keyboards like the Emulator II.",
            "quote": "While synthesizers are precise, twenty acoustic string players bowing together creates unmatched organic power.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. The 1970s mix is highly focused on the mid-range (where the vocal sits), with the extreme highs naturally rolled off by the analog tape medium.\n❌ The 80s track has the bright, hyped 10kHz+ treble characteristic of digital synthesis.",
            "quote": "A mid-focused mix feels warm and close, pulling the listener onto a cozy stage rather than a vast arena.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. The physical volume of the track swells alongside Elvis's powerhouse vocals on the chorus, leaving dynamic headroom intact.\n❌ The 80s dance track is heavily compressed limiting to ensure maximum constant volume for club DJs.",
            "quote": "Dynamic headroom allows a track to breathe; removing it ensures the track constantly yells.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Elvis Presley** is correct. His track features traditional, sweeping Gospel-style backing vocal harmonies, a staple of his Nashville output.\n❌ The Pet Shop Boys cover heavily relies on synthesized vocal pads instead of a live backing choir.",
            "quote": "Gospel harmony backing tracks provide the emotional gravity that holds up the lead singer's lament.",
            "correct_artist": "Elvis"
        },
        {
            "expl": "✅ **Pet Shop Boys** is correct. The use of heavy sequencing, analog synthesis, and relentless electronic drum beats firmly placed the cover in the Synth-Pop / Hi-NRG club movement.\n❌ The 1972 original is a definitive example of Country-Pop.",
            "quote": "By stripping away the acoustic guitars, the song transformed from a Country ballad into a defining record of 80s Synth-Pop.",
            "correct_artist": "Pet Shop Boys"
        }
    ],

    # ---------------- COMPARISON 4: Mad World ----------------
    "Comparison 4": [
        {
            "expl": "✅ **Gary Jules (2001)** is correct. His stark piano-and-vocal cover was popularized digitally and via the CD soundtrack for the film Donnie Darko.\n❌ Tears For Fears (1982) predated widespread CD distribution, famously dropping on 7-inch vinyl.",
            "quote": "The stark clarity of the digital medium exposed the raw emotion of Jules' minimalistic performance.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Gary Jules** is correct. The arrangement eschews massive studio gloss, intentionally sounding like a quiet, intimate, acoustic home demo recorded in the middle of the night.\n❌ Tears For Fears employed massive 80s studio production tricks including wide stereo chorus and synths.",
            "quote": "An intimate, 'lo-fi' aesthetic draws the listener in, making them feel like a confident rather than an audience member.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Tears For Fears (1982)** is correct. The original uses an early Roland CR-78 analogue drum machine, meaning the beat is absolutely rigid and quantized to the grid.\n❌ Gary Jules' version has no percussion track at all, heavily relying on the drifting, rubato timing of his piano playing.",
            "quote": "A rigid, unrelenting electronic beat creates an underlying sense of anxiety and detachment.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Tears For Fears** is correct. The defining characteristic of the 1982 original is its total reliance on layered analog synthesizers (Prophet-5) and programmed logic, completely removing acoustic guitars or traditional rock accompaniment.\n❌ Gary Jules uses just a traditional, physical acoustic piano.",
            "quote": "Synthesizers removed the human touch, creating a 'mad', artificial world within the speakers.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Gary Jules** is correct. Jules' fragile vocal delivery features no heavy modulation, chorus, or audible pitch correction, leaving slight imperfections that heighten the sadness.\n❌ Tears For Fears heavily utilized vocal layering, double-tracking, and slaps to thicken Curt Smith's voice.",
            "quote": "Leaving a vocal exposed and uncorrected forces the emotional weight entirely onto the singer's delivery.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Gary Jules** is correct. The 2001 cover strips away the bustling electronics and drum machines, relying entirely on a sparse, slow arrangement of Voice and Upright Piano (with a short Cello section).\n❌ Tears For Fears utilizes a dense, heavily layered electronic arrangement.",
            "quote": "Instrumental minimalism removes all distractions, funneling the listener's focus directly into the lyric.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Tears For Fears** is correct. 80s synth-pop mixing made extensive use of stereo chorus and wide panning to make the electronic instruments sound larger than life.\n❌ Gary Jules sits squarely in the mono center, feeling tight and uncomfortable.",
            "quote": "Wide stereo imaging makes the listener feel as though they are inside an expansive synthetic universe.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Gary Jules** is correct. To create a feeling of isolation, the piano and vocal are mixed very narrowly in the center of the stereo field, rather than being spread wide L/R.\n❌ Tears For Fears utilizes extreme stereo panning for their synths.",
            "quote": "A narrow, centered mix suffocates the listener, perfectly reflecting the claustrophobia of the lyrics.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Gary Jules** is correct. The vocal has almost no reverb, making it sound 'dry' as if Jules is whispering directly into the listener's ear.\n❌ Tears For Fears pushes the vocals back slightly into a bed of electronic delay.",
            "quote": "A dry vocal is highly confrontational; it strips away the singer's hiding place.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Tears For Fears** is correct. The 1982 mix softens the vocal by using a quick Slapback echo and stereo delays, helping the human voice sit inside a completely electronic track.\n❌ Gary Jules avoids artificial delays to maintain extreme intimacy.",
            "quote": "Delay effects blur the sharp transients of a vocal, blending it seamlessly into synthesized landscapes.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Gary Jules** is correct. The upright piano sounds muffled as if it's being played with the felt pedal down, which effectively acts as an aggressive acoustic Low-Pass filter, removing the bright, attacking highs.\n❌ Tears For Fears uses sharp, incredibly bright synthesizer waveforms (Sawtooths).",
            "quote": "Muffling the piano string dampens the attack, turning an energetic percussion instrument into a weeping sustain.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Tears For Fears** is correct. The 1982 recording heavily emphasizes the high-end treble frequencies (synthesizer buzz, hi-hats), a mixing hallmark of 80s pop designed to sound crisp on radios.\n❌ Gary Jules rolled off the highs to create a dark, murky mix.",
            "quote": "Hyped high frequencies create a 'crisp' digital energy, while muted highs create melancholic brooding.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Tears For Fears** is correct. Consistent with dance-adjacent synth-pop, the track is heavily limited/compressed to ensure the drum machine groove never drops in volume.\n❌ Gary Jules leaves the dynamic range completely open, allowing the piano notes to decay away into near silence.",
            "quote": "Compression locks in a dance groove, while dynamic range allows a song to whisper.",
            "correct_artist": "Tears for Fears"
        },
        {
            "expl": "✅ **Gary Jules** is correct. Instead of the synthesizer solo found in the 1982 original, the 2001 cover features an acoustic Cello playing a deeply emotional, mournful instrumental bridge.\n❌ Tears For Fears rely solely on analog keyboards for melodies.",
            "quote": "The rich, resonant bowing of a Cello inherently mimics the mournful cry of the human voice.",
            "correct_artist": "Gary Jules"
        },
        {
            "expl": "✅ **Gary Jules** is correct. By drastically slowing down the tempo, removing the energetic dance beat, and using felted acoustic instruments, the cover entirely recontextualizes the lyrics into a song of deep resignation.\n❌ The 1982 track masks its depressed lyrics behind a bouncy, upbeat dance rhythm.",
            "quote": "A tempo reduction completely re-frames the emotional context; what was once energetic anxiety becomes profound defeat.",
            "correct_artist": "Gary Jules"
        }
    ],

    # ---------------- COMPARISON 5: Crossroads ----------------
    "Comparison 5": [
        {
            "expl": "✅ **Robert Johnson (1936)** is correct. His original recording session was pressed directly onto thick, brittle 78 RPM shellac discs, before the invention of vinyl.\n❌ Cream (1968) issued their heavily produced rock record on 33⅓ RPM vinyl Long-Plays (LP) and cassettes.",
            "quote": "The hiss and crackle of a 78 RPM shellac record carries the ghost of the 1930s Delta.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Cream (1968)** is correct. Their legendary rock version was captured live on multitrack tape at the Winterland Ballroom, capturing the energy of an arena performance.\n❌ Robert Johnson tracked his song alone in a makeshift hotel-room studio in Texas.",
            "quote": "Multitrack tape allowed live venue recordings to be mixed in the studio with unprecedented power and clarity.",
            "correct_artist": "Cream"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. Since he was playing unaccompanied, Johnson's internal tempo is famously fluid, speeding up significantly during intense vocal phrases and slowing on guitar turnarounds.\n❌ Cream had a drummer (Ginger Baker) aggressively locking the band into a heavy, driving beat.",
            "quote": "Without a drummer, the tempo breathes and reacts directly to the emotion of the singer.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. The entire 1936 recording is a single, live take: one man, one acoustic guitar, and one take in front of a microphone. Zero automation or sequencing existed.\n❌ Modern production heavily utilizes automated levels and programmed backing tracks.",
            "quote": "A single live take is the ultimate performance wireway; there is nowhere to hide.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. He authentically hits the 'Blue Notes'—micro-tonal pitches that sit conceptually between major and minor keys, impossible to map perfectly to a modern quantized pitch-corrector.\n❌ Cream's vocalist stays closer to standard rock intonation.",
            "quote": "A true 'Blue Note' cannot be found on a piano key; it must be bent into existence.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Cream** is correct. They took the solitary, minute-long blues progression and expanded it into a massive, 4-minute volume-driven rock improvisation filled with extended solos.\n❌ Robert Johnson kept the song within a tight, standard structure.",
            "quote": "Cream took the Delta blues and plugged it straight into a wall of roaring amplifiers.",
            "correct_artist": "Cream"
        },
        {
            "expl": "✅ **Cream** is correct. The 1968 mix isn't just accompanying Eric Clapton's vocal; the bass (Jack Bruce) and drums are mixed equally loud, showcasing the interactive 'Power Trio' format.\n❌ The 1936 recording just highlights the voice supported quietly by guitar.",
            "quote": "In a Power Trio, every instrument is simultaneously competing for absolute dominance of the groove.",
            "correct_artist": "Cream"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. The 1936 recording was likely captured with a single ribbon microphone recording in Mono directly to a cutting lathe.\n❌ Cream's multitrack recording takes advantage of dramatic left/right Stereo panning for the drums and guitar.",
            "quote": "A single mono microphone captures not just the instrument, but the precise balance of the room it sits in.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. The makeshift Texas hotel room resulted in a distinct, quick acoustic slap-back—the sound of his voice physically bouncing off the hard plaster walls into the mic.\n❌ Cream employs larger, artificial reverbs or captures the colossal natural sound of the Winterland arena.",
            "quote": "Room slapback acts as an acoustic fingerprint, revealing the size and materials of the recording space.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. In 1936, artificial effects pedals, tape delays, or digital reverbs simply had not been invented. What you hear is purely the acoustic capture.\n❌ Cream extensively utilized vacuum-tube amplifier distortion and studio mixing tools.",
            "quote": "Before the invention of effects, guitar tone was purely a product of wood, wire, and fingers.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Cream** is correct. Eric Clapton famously achieved his dark, singing 'Woman Tone' by aggressively overdriving a Marshall tube amplifier while rolling the tone knob completely down on his Gibson guitar.\n❌ Robert Johnson played a clean, acoustic parlor guitar without amps.",
            "quote": "Rolling off the guitar tone while pushing the amp created an immensely thick, flute-like singing sustain.",
            "correct_artist": "Cream"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. Shellac recordings inherently lack extreme lows and highs (cutting off around 4kHz), contributing to the highly mid-focused, 'lo-fi' vintage sound characteristic of pre-tape masters.\n❌ Cream's multitrack tapes recorded massive sub-lows from the bass and high treble from the cymbals.",
            "quote": "The lack of high frequencies on shellac forces the listener to focus entirely on the mid-range vocal power.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Cream** is correct. The British Blues Rock scene was defined by sheer volume. Extreme interaction, feedback, and sustain are achieved by pushing stage amplifiers to their breaking limit.\n❌ Johnson's recording is quiet, governed only by how hard he could strike his un-amplified guitar.",
            "quote": "Volume ceased to be just a listening level; in rock, extreme volume became an instrument itself.",
            "correct_artist": "Cream"
        },
        {
            "expl": "✅ **Robert Johnson** is correct. The 1936 arrangement consists solely of Johnson accompanying himself with a slide on an acoustic guitar.\n❌ Cream completely reinvented the song to feature Electric Guitar, Electric Bass, and massive Drum kits.",
            "quote": "The mastery of solo blues lies in the illusion of making one guitar sound like a complete band.",
            "correct_artist": "Robert Johnson"
        },
        {
            "expl": "✅ **Cream** is correct. Their 1968 cover perfectly encapsulates the British Blues Explosion: turning stripped-back American roots music into heavy, psychedelic-tinged electric rock.\n❌ Robert Johnson's original is the definitive blueprint of Delta Blues.",
            "quote": "Cream amplified the ghostly mythology of the Delta Blues and broadcast it to stadiums.",
            "correct_artist": "Cream"
        }
    ],

    # ---------------- COMPARISON 6: With A Little Help From My Friends ----------------
    "Comparison 6": [
        {
            "expl": "✅ **The Beatles (1967)** is correct. The original track was recorded for their groundbreaking concept album 'Sgt. Pepper's Lonely Hearts Club Band', heavily utilizing the EMI Abbey Road 4-track tape machines.\n❌ Joe Cocker (1968) cut his version separately on a later solo album.",
            "quote": "The 4-track tape machine forced bands to make irreversible mix decisions known as 'bouncing down'.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **Joe Cocker (1968)** is correct. His cover drastically reinvented the polite pop track as a gritty, chaotic, and emotionally desperate Soul/Blues-Rock waltz.\n❌ The Beatles' version is immaculate, whimsical pop utilizing clean orchestration and steady percussion.",
            "quote": "Cocker stripped the whimsy from the Liverpool pop song and replaced it with desperate, heavy soul.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. He fundamentally altered the song's rhythmic structure, shifting from the Beatles' strict 4/4 common time into a swaying, heavy 6/8 compound time signature (a slow waltz).\n❌ The Beatles kept a steady, upbeat 4/4 pop march.",
            "quote": "Shifting to a 6/8 time signature gives the track a heavy, swaying triplet feel reminiscent of Gospel music.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. The rhythm section frequently speeds up and slows down drastically (massive rubato) to react to Cocker's frantic, emotional vocal breakdowns.\n❌ The Beatles' recording stays firmly locked to a consistent, unyielding tempo.",
            "quote": "Extreme rubato makes a studio recording feel dangerously alive and on the edge of collapse.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. He transposed the key downwards to fit his raspy baritone, allowing his vocal to break and strain emotionally at the very top of his register during the chorus.\n❌ The Beatles specifically wrote the song in a limited, comfortable range to accommodate Ringo Starr's limited singing ability.",
            "quote": "Transposing a song's key forces the singer into a physical struggle that the microphone inherently captures.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **The Beatles** is correct. In a textbook example of great pop songwriting, the 1967 original dives immediately into the catchy 'Billy Shears' chorus hook to grab the listener.\n❌ Joe Cocker's version opens with a drastically slow, agonizingly long instrumental guitar/organ intro.",
            "quote": "In pop music, the golden rule is 'Don't bore us, get to the chorus.'",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **The Beatles** is correct. Paul McCartney's bass guitar is famously mixed incredibly loud and forward, providing an articulate, melodic counterpoint instead of just playing root notes.\n❌ In the Cocker cover, the bass guitar sits conventionally beneath the guitars and organ.",
            "quote": "McCartney revolutionized the bass guitar by treating it as a lead melodic instrument, not just rhythmic support.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **The Beatles** is correct. Because of the limitations of early 4-track stereo mixing, instruments (like drums or backing vocals) were often panned 100% hard Left or hard Right, leaving awkward holes in the center.\n❌ The 1968 Cocker track uses more modern, blended stereo mixing.",
            "quote": "Hard-panning in the 60s meant the drums might entirely disappear if you took out one earphone.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **The Beatles** is correct. Ringo's lead vocal has very little reverb; it sits incredibly dry and forward in the mix, reinforcing the concept that a 'friend' is speaking directly to you.\n❌ Cocker's dramatic vocal utilizes far more studio reverb to sound massive.",
            "quote": "A dry vocal mix removes the 'safety net' of reverb, forcing the performance to stand completely on its own.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **The Beatles** is correct. Famed Abbey Road engineer Ken Townsend invented Artificial Double Tracking (ADT) specifically to instantly thicken Beatles vocals using tape delay, avoiding the need for the singer to sing the part twice.\n❌ Cocker's massive sound comes from raw distortion and screaming, rather than tape trickery.",
            "quote": "ADT provided the thickness of a choir without the singer having to perfectly match their own pitch a second time.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. A defining sound of the cover is the swirling, chorusing texture of a Hammond Organ pumped through a rapidly spinning Leslie Speaker cabinet.\n❌ The Beatles used a more straightforward piano and guitar accompaniment rhythmically.",
            "quote": "The spinning horn inside a Leslie Speaker physically throws the sound around the room, creating an unmistakable Doppler effect.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. The overall frequency profile of the 1968 cover is incredibly thick, warm, and mid-range heavy, dominated by the roaring organ and distorted guitars.\n❌ The Beatles mix is clean, polite, and heavily separated.",
            "quote": "A mid-heavy mix feels physically dense, aggressively pushing against the listener's eardrums.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **The Beatles** is correct. The original uses heavy tube compression (likely an Altec or Fairchild compressor) to ensure the volume of Ringo's voice and the band stays highly consistent from verse to chorus.\n❌ Cocker uses drastic volume dynamics—from near whispers to screaming crashes.",
            "quote": "Compression glues a pop mix together, ensuring the groove never lets up in volume.",
            "correct_artist": "Beatles"
        },
        {
            "expl": "✅ **Joe Cocker** is correct. Guitar legend Jimmy Page provided the searing, fuzz-drenched electric guitar solo, a hallmark of the heavier late-60s psychedelic blues-rock era.\n❌ The Beatles track features no notable lead guitar solo.",
            "quote": "The addition of heavy guitar distortion transformed polite pop tracks into aggressive rock anthems.",
            "correct_artist": "Joe Cocker"
        },
        {
            "expl": "✅ **The Beatles** is correct. The song was explicitly written in an easy, gentle baritone key for drummer Ringo Starr strictly to sing, suiting his 'ordinary guy' conceptual character of Billy Shears.\n❌ Joe Cocker pushes his unbelievable, gravelly range to the absolute physical breaking point.",
            "quote": "Writing a song for a non-singer forces the melody to be remarkably efficient and unforgettable.",
            "correct_artist": "Beatles"
        }
    ]
}

quiz_7_clozes = [
    {
        "expl": "The 1983 original relies heavily on a programmed **drum machine** (an Oberheim DMX) for its relentlessly rigid, grid-locked 'four-on-the-floor' stuttering beat.",
        "quote": "Drum machines replaced the swinging groove of a human drummer with mechanical perfection.",
        "correct_artist": "New Order"
    },
    {
        "expl": "The 1998 Nu-Metal cover replaces the electronic rhythm with heavily processed **live acoustic drums**, tracked aggressively to emulate the power of digital machinery.",
        "quote": "Nu-Metal brought physical acoustic drum sets back onto the dance rock stage, albeit heavily gated and compressed.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "New Order's distinctive pulsing bassline was originally generated using a sequenced **analog synthesizer** (a Moog Source), defining the electro-dance genre.",
        "quote": "Analog synthesizers provided a low-end density and harmonic richness that bass guitars couldn't replicate in the club.",
        "correct_artist": "New Order"
    },
    {
        "expl": "Orgy recreates this exact sequencer pattern using heavily distorted, down-tuned **electric guitars**, swapping synth-pop mechanics for alternative metal aesthetics.",
        "quote": "High-gain electric guitars can mimic massive synth waveforms if the distortion saturation is extreme enough.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "The vocal delivery in the 1983 version is notoriously **detached and emotionless**, a hallmark of post-punk stoicism where the singer purposely sounds bored or numb.",
        "quote": "A detached vocal performance acts as a blank canvas, allowing the emotional synthesizers to carry the narrative.",
        "correct_artist": "New Order"
    },
    {
        "expl": "In contrast, the 1998 vocal performance is much more **emotive and dynamic**, aggressively building from quiet whispering into full-throated screams in the chorus.",
        "quote": "Late-90s metal aesthetics demanded extreme vocal dynamic range: from unsettling whispers to devastating screams.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "The original track was specifically arranged for the 12-inch **dance club environment**, featuring an extended 7-minute runtime packed with instrumental breakdowns.",
        "quote": "The 12-inch dance mix was an endurance test for sequencers, stretching pop hooks across massive instrumental builds.",
        "correct_artist": "New Order"
    },
    {
        "expl": "The cover version is structured entirely like a traditional **alternative rock song**, drastically condensing the runtime and relying on big verse-chorus dynamic shifts.",
        "quote": "Condensing a 7-minute dance odyssey into a 3-minute rock arrangement requires turning subtle builds into explosive drops.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "New Order utilized early CV/Gate **digital sequencing** technology to physically trigger the analog synthesizers perfectly in time with the drum machine.",
        "quote": "Early sequencing meant literally programming code to tell a synthesizer when to turn note voltages on and off.",
        "correct_artist": "New Order"
    },
    {
        "expl": "Orgy's late 90s production relies heavily on modern **digital audio workstation (DAW) editing** techniques (like Pro Tools) to chop and ensure the live instruments lock tightly to the grid.",
        "quote": "DAW editing allowed producers to take loose, live drum tracks and slice them to grid perfection.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "The 1983 mix is characterized by its wide, synthetic **stereo spatialization**, using early expensive digital delays to bounce synth lines wildly across the left/right spectrum.",
        "quote": "Wide stereo panning turned static synthesizer sequences into dizzying, immersive auditory movement.",
        "correct_artist": "New Order"
    },
    {
        "expl": "A distinctive choir pad sound in the original was produced using a wildly expensive early hardware **digital sampler** (the Emulator I), which replayed a short recording of a real choir.",
        "quote": "Early hardware samplers possessed meager memory, often forcing legendary producers to loop half-second clips of real instruments.",
        "correct_artist": "New Order"
    },
    {
        "expl": "The 1998 mix feels incredibly **dense and compressed**, utilizing brickwall limiters to create a 'wall of sound' where massive guitars entirely dominate the mid-range frequencies.",
        "quote": "Modern heavy rock mixing leaves zero open space; compression ensures every frequency is continuously blasting.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "The 1998 cover drops the 80s synthetic choir samples in favor of additional layers of squealing, **high-gain** guitar feedback and amplifier noise.",
        "quote": "Amplifier feedback isn't just a byproduct; it is a vital, screaming instrument in heavy rock production.",
        "correct_artist": "Orgy"
    },
    {
        "expl": "Ultimately, the 1983 track defined the 80s **Synth-Pop** movement, seamlessly fusing melancholy post-punk song structure with cold, unyielding dance floor technology.",
        "quote": "By abandoning traditional guitars entirely, Blue Monday proved electronic dance music could be both emotionally devastating and commercially dominant.",
        "correct_artist": "New Order"
    }
]

# Write to JSON
course_data_path = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json"
with open(course_data_path, 'r') as f:
    data = json.load(f)

for section in data.get("sections", []):
    if "Comparison" in section.get("title", "") or "Stage 4" in section.get("title", ""):
        for item in section.get("items", []):
            title = item.get("title", "")
            comp_key = next((k for k in details.keys() if k in title), None)
            
            # For 1-6 (Multi Choice)
            if comp_key:
                for i, q in enumerate(item.get("questions", [])):
                    spec = details[comp_key][i]
                    # Update explanation
                    q["expert_explanation"] = spec["expl"]
                    # Update Quote
                    artist = spec["correct_artist"]
                    q["expert_quote"] = {
                        "text": spec["quote"],
                        "author": f"Production Note: {artist}"
                    }
                    # Update dynamic Wiki Image
                    wiki_term = artist_to_wiki(artist)
                    img_url = get_wiki_img(wiki_term)
                    if img_url:
                        q["img"] = img_url

            # For 7 (Cloze)
            if "Comparison 7" in title:
                for q in item.get("questions", []):
                    if q.get("type") == "cloze":
                        # We build a massively detailed HTML explanation combining all 15 blanks
                        html_expl = "<p>Here is a detailed breakdown of each blank in the sequence:</p><ul style='margin-left: 20px; text-align: left;'>"
                        for idx, cloze_detail in enumerate(quiz_7_clozes):
                            art = cloze_detail['correct_artist']
                            wiki_t = artist_to_wiki(art)
                            img = get_wiki_img(wiki_t)
                            img_str = f"<img src='{img}' style='height:40px; border-radius:4px; vertical-align:middle; margin-left:10px;'/>" if img else ""
                            html_expl += f"<li style='margin-bottom:15px'><strong>Blank {idx+1}:</strong> {cloze_detail['expl']}{img_str} <br/><i style='color:#a3e635'>\"{cloze_detail['quote']}\"</i></li>"
                        html_expl += "</ul>"
                        
                        q["expert_explanation"] = html_expl
                        # We fetch a generic image for the top
                        q["img"] = get_wiki_img("New_Order")
                        q["expert_quote"] = {
                            "text": "The magic of comparison lies not just in noticing the difference, but understanding the technology that drove the change.",
                            "author": "Production Analysis"
                        }

with open(course_data_path, 'w') as f:
    json.dump(data, f, indent=4)

print("Finished updating JSON with dynamic specific explanations, quotes, and wiki images.")
