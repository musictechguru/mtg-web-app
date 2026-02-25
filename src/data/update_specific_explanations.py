import json

# Detailed explanations for Quizzes 1-6
explanations = {
    # ---------------- COMPARISON 1: Tainted Love ----------------
    "Comparison 1": [
        "Gloria Jones' 1964 version of Tainted Love was a Northern Soul track recorded with a live rhythm section and brass, released as a B-side on a 7-inch vinyl in mono.",
        "The 1964 original has the hallmark of classic 60s soul: a full band playing together in the same room, capturing natural bleed and groove.",
        "Soft Cell’s 1981 version relies on early drum machines (like the Roland CR-78) where the beat is rigidly quantized to a grid, completely stripping away live musicians.",
        "The Synth-Pop era was defined by this approach: replacing human backing bands with programmed loops and synthesizers, changing the emotional context of the song.",
        "Gloria Jones’ vocal is raw, dynamic, and naturally pitched, characteristic of 60s R&B tracking before the invention of pitch correction.",
        "Soft Cell’s version features the extended 12-inch remix arrangement, stretching the track for dance club play with instrumental breaks.",
        "1980s pop tracks utilized heavier console compression to ensure the song popped on FM radio, resulting in a more controlled, consistently loud dynamic range.",
        "The 1964 version was mixed in mono, meaning all instruments (drums, bass, brass, vocals) are collapsed into the center channel rather than spread wide.",
        "A hallmark of 80s production is the use of Gated Reverb on snare and electronic percussion—an effect that bursts loudly but cuts off instantly.",
        "Soft Cell used Slapback Delay on Marc Almond’s vocal. This vintage effect creates depth and rhythm without washing the vocal out in a long reverb tail.",
        "The distinctive synths in the Soft Cell version utilize Low-Pass filter sweeps, manipulating harmonic content to create movement throughout the track.",
        "The original 60s mix is very mid-range focused. Tape and vinyl mediums of the era didn't natively reproduce the deep sub-bass or airy highs of modern music.",
        "The organic ebb and flow of volume (micro-dynamics) is preserved in the 1964 version because it relies on human players responding to each other.",
        "A driving acoustic brass section (saxophones and trumpets) gives the Gloria Jones version its punchy, Northern Soul energy.",
        "Soft Cell solidified the 'Synth-Pop' duo format: one person programming the synths/drum machines, and the other providing the lead vocal."
    ],
    # ---------------- COMPARISON 2: Fast Car ----------------
    "Comparison 2": [
        "Tracy Chapman's 'Fast Car' was released in 1988 during the peak era of CD and high-quality cassette releases.",
        "Jonas Blue's 2015 cover was produced 'In-The-Box', meaning all synthesis, sampling, and mixing happened entirely within a purely digital DAW environment.",
        "The original relies on a loose, human drum groove to back the emotional acoustic performance.",
        "Modern EDM/Pop extensively uses 'Vocal Chops'—pitching and rearranging tiny pieces of a vocal take to create a stuttering, synthesizer-like melodic hook.",
        "Chapman's vocal is raw, emotionally transparent, and entirely unprocessed by pitch correction software, reflecting the authenticity of the singer-songwriter genre.",
        "The Tropical House version restructures the folk song to include a definitive 'Drop'—the instrumental climax designed for dancefloors.",
        "In the original, the bass simply supports the chord progression without dramatic volume shifts.",
        "Jonas Blue utilizes modern stereo imaging techniques to spread huge synth pads and digital effects hard Left and Right, creating a cavernous mix.",
        "The 1988 track places Chapman in an intimate acoustic space, likely utilizing natural room ambiance or very subtle plate reverb to maintain closeness.",
        "The 2015 tracking uses a precise dotted-8th note delay on the synth plucks to create a rhythmic, galloping counter-melody behind the beat.",
        "EDM transitions rely heavily on synthesizer White Noise sweeps and automated High-Pass filters to build tension before releasing it at the drop.",
        "Modern digital mixing purposefully hypes the extremely high frequencies ('air') and deep sub-bass to sound massive on festival sound systems and earbuds alike.",
        "The original folk track builds tension organically through volume dynamics and performance intensity, rather than relying on volume automation.",
        "The acoustic guitar is the rhythmic and harmonic anchor of the original, serving as the sole bedrock for the vocal.",
        "The 1988 version follows a linear, narrative story structure common in folk music, unconcerned with reaching a catchy dance hook."
    ],
    # ---------------- COMPARISON 3: Always On My Mind ----------------
    "Comparison 3": [
        "Elvis Presley's 1972 recording was an analog release, primarily distributed on 7-inch vinyl singles.",
        "The 'Nashville Sound' was achieved by placing highly skilled session musicians in a single room to capture the magic of a live performance.",
        "The 1972 version features a rhythm section that breathes and slightly shifts tempo to accommodate the emotional phrasing of Elvis' vocal delivery.",
        "The defining sound of Pet Shop Boys' 1987 cover is an early digital 'Orchestra Hit' sample, extensively popularized by the Fairlight CMI.",
        "Elvis delivers a powerhouse vocal performance full of natural vibrato, grit, and significant dynamic range.",
        "Pet Shop Boys took a mournful country ballad and injected it with a driving 4-on-the-floor beat, transforming it into a high-energy dance track.",
        "The warmth of the original recording comes from analog hardware and the natural, harmonic saturation produced when recording hot to magnetic tape.",
        "The 80s cover creates a dizzying stereo field by auto-panning sequenced synth brass and arpeggios left and right.",
        "Large, unnatural 'Gated Reverbs' and booming digital chambers on the toms defined the drum sound of 1980s pop.",
        "The Pet Shop Boys rely on synchronized digital delays locked to the tempo to make the sixteenth-note synth lines groove intensely.",
        "The RCA Studio B recording features real, acoustic string and brass sections to provide sweeping emotional swells.",
        "The 1970s mix focuses intensely on the mid-range to flatter the vocal, naturally rolling off the extreme highs that later digital recordings emphasize.",
        "Elvis uses massive volume dynamics—whispering the verses and belting the choruses—to match the heartbreak of the lyric.",
        "The original includes sweeping, Gospel-influenced backing vocal harmonies, a staple of Elvis' 1970s repertoire.",
        "The Pet Shop Boys reinvented the standard to fit squarely into the 1980s Synth-Pop / Hi-NRG club movement."
    ],
    # ---------------- COMPARISON 4: Mad World ----------------
    "Comparison 4": [
        "Gary Jules' 2001 cover of Mad World was famously featured on the Donnie Darko soundtrack, distributed digitally and on CD.",
        "The 2001 recording sounds incredibly intimate—like a lo-fi demo recorded in a quiet living room, purposefully lacking major studio gloss.",
        "Tears For Fears' 1982 original relies on an early Roland CR-78 drum machine, meaning the beat is rigidly quantized and unfailing.",
        "The 1982 version is a triumph of early 80s production, relying entirely on analog synthesizers and programmed loops instead of traditional rock instruments.",
        "Gary Jules’ vocal is exceptionally dry and raw, lacking the heavy processing or modulation common in synth-pop, lending it a devastating vulnerability.",
        "The 2001 cover strips away the bustling synths, boiling the arrangement down to a single upright piano and voice.",
        "The Tears For Fears mix is lush and wide, utilizing panning and stereo chorus effects to make the synthesized layers sound massive.",
        "Jules’ version uses a very narrow, centered stereo image, making it feel isolating and lonely.",
        "The vocal in the cover has minimal reverb. This 'dry' mix places the singer uncomfortably close to the listener's ear.",
        "The 1982 vocal makes use of Slapback and Stereo delays, blurring the edges of the vocal to help it sit inside the synthetic soundscape.",
        "The acoustic piano in the 2001 cover has its high frequencies rolled off (Low-Passed), creating a muffled, 'felted', melancholic tone.",
        "80s Synth-pop mixes (like the original) are notably bright, with EQ curves emphasizing the treble to help the digital and analog synths cut through.",
        "Tears For Fears uses compression to maintain a very consistent dynamic level across the track, ensuring the dance groove never drops.",
        "The 2001 cover introduces a mournful, acoustic Cello solo, replacing the synthesizer leads of the original.",
        "By slowing down the tempo and stripping the instrumentation, Jules creates an atmosphere of profound resignation and sadness."
    ],
    # ---------------- COMPARISON 5: Crossroads ----------------
    "Comparison 5": [
        "Robert Johnson's 'Cross Road Blues' was recorded in 1936 and released on a brittle 78 RPM shellac record, the standard format of the era.",
        "Cream's 1968 'Crossroads' is a live multitrack recording taken from a massive concert at the Winterland Ballroom.",
        "Johnson's solo performance is highly fluid; he accelerates and decelerates the tempo at will, not bound to a drummer or a click track.",
        "The 1936 recording is raw and live, consisting solely of a man and his guitar—no overdubs, no studio trickery.",
        "True to authentic Delta Blues, Johnson's pitch bends and vocal notes constantly dance between major and minor (the 'blue notes').",
        "Cream took the solitary acoustic blues format and blew it up into a high-volume, improvisational Blues-Rock stadium anthem.",
        "The 1968 mix is designed to highlight the fierce, equal interplay of the 'Power Trio' (Guitar, Bass, Drums) rather than just accompanying a singer.",
        "Johnson was recorded in a makeshift hotel-room studio in San Antonio using a single microphone in mono.",
        "The 1936 track contains the natural acoustic slapback and room reflection of the physical space in which he sat.",
        "Given the technological limits of 1936, the original features no artificial delays or digital reverbs.",
        "Eric Clapton's solo features his legendary 'Woman Tone'—achieved by heavily overdriving a Marshall amp while rolling off the tone knob on his Gibson guitar.",
        "Shellac discs had severe frequency limitations. Anything below 200Hz or above 4kHz was lost, resulting in the characteristic 'lo-fi' vintage sound.",
        "Cream relies on extreme volume. The distortion and sustain come from the musicians pushing their amplifiers to the absolute breaking point.",
        "Johnson's arrangement consists of just an acoustic guitar heavily utilizing slide techniques to accompany his voice.",
        "Cream's version perfectly embodies the late 1960s British Blues Explosion—turning American roots music into heavy rock."
    ],
    # ---------------- COMPARISON 6: With A Little Help From My Friends ----------------
    "Comparison 6": [
        "The Beatles released the track on 'Sgt. Pepper's Lonely Hearts Club Band' in 1967, one of the most culturally significant concept albums in history.",
        "Joe Cocker's famous 1968 cover drastically reinvents the song as a gritty, chaotic, and emotional Soul/Blues-Rock live performance.",
        "Cocker completely changed the time signature, shifting the bouncy 4/4 pop song into a slow, heavy 6/8 waltz.",
        "The session musicians behind Cocker play with massive rubato—stretching and pulling the tempo to match his emotive vocal phrasing.",
        "Cocker transposed the song to a different key so he could strain and scream at the very top of his raspy vocal register.",
        "The Beatles' pop genius is evident in the arrangement; they dive immediately into the catchy chorus hook.",
        "Paul McCartney's melodic bassline is mixed unusually loud for the era, driving the harmony of the original 1967 track.",
        "Early stereo Beatles mixes feature extreme panning choices—putting drums entirely on one side and vocals on the other—due to early 4-track limitations.",
        "Ringo Starr's vocal is mixed relatively dry and sits uncomfortably close, making him sound like an ordinary guy asking for help.",
        "To thicken the lead vocal, The Beatles heavily utilized Artificial Double Tracking (ADT)—using tape delay to create a chorus-like doubling effect.",
        "Cocker's 1968 Blues-Rock arrangement relies heavily on a Hammond Organ played through a spinning Leslie Speaker for a swirling, gospel texture.",
        "The Cocker mix is incredibly thick, warm, and mid-range heavy, dominated by distorted guitars, organ, and prominent cymbals.",
        "The Beatles' original maintains a highly consistent, evenly compressed dynamic level from start to finish.",
        "Jimmy Page (of Led Zeppelin fame) plays the explosive, distortion-drenched lead guitar on Cocker's studio recording.",
        "Ringo's original vocal is polite, limited in range, and gentle, perfectly matching the conceptual 'Billy Shears' character."
    ]
}

# Advanced Explanation for Quiz 7, detailing the blanks
cloze_7_explanation = "The 1983 original 'Blue Monday' relies on a programmed (1) Drum Machine for its rigid beat, whereas Orgy replaces it with (2) Live Acoustic Drums. New Order's bassline was built using an (3) Analog Synthesizer, while the 1998 cover uses heavily down-tuned (4) Electric Guitars. Bernard Sumner's vocals are infamously (5) Detached and Emotionless in true post-punk fashion, heavily contrasting Jay Gordon's (6) Emotive and Dynamic rock delivery. New Order mixed for a (7) Dance Club Environment with long instrumental breaks; Orgy abridged it into an (8) Alternative Rock Song. The original used (9) Digital Sequencing triggered by drums, while the modern version used (10) Digital Audio Workstation (DAW) Editing to snap guitars to a grid. The 1983 track boasts wide (11) Stereo Spatialization, and uses an early (12) Digital Sampler for the choir pad. The aggressive 1998 mix is (13) Dense and Compressed, relying on (14) High-Gain amps, effectively shifting the song from (15) Synth-Pop to Nu-Metal."

course_data_path = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json"
with open(course_data_path, 'r') as f:
    data = json.load(f)

for section in data.get("sections", []):
    if "Comparison" in section.get("title", "") or "Stage 4" in section.get("title", ""):
        for item in section.get("items", []):
            title = item.get("title", "")
            comp_key = next((k for k in explanations.keys() if k in title), None)
            
            if comp_key:
                # Type 1-6 (Multi-Choice)
                if int(comp_key.split()[1]) <= 6:
                    for i, q in enumerate(item.get("questions", [])):
                        q["expert_explanation"] = explanations[comp_key][i]
                        # Retain the quote from previous step, but update explanation
            
            if "Comparison 7" in title:
                for q in item.get("questions", []):
                    if q.get("type") == "cloze":
                        q["expert_explanation"] = cloze_7_explanation
                        # Since cloze questions display the explanation at the END, 
                        # this paragraph successfully explains all blanks correctly.

with open(course_data_path, 'w') as f:
    json.dump(data, f, indent=4)

print("Finished updating JSON with specific explanations for Quizzes 1-7.")
