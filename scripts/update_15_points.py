import json
import os

file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find the Stage 3 Section
topic_stage = None
for stage in data.get('stages', []):
    if stage.get('title') == "Stage 3: Practical Topic Quizzes":
        topic_stage = stage
        break

if not topic_stage:
    for section in data.get('sections', []):
        if section.get('title') == "Stage 3: Practical Topic Quizzes":
            topic_stage = section
            break

blue_monday_q = {
    "title": "Production Differences: Blue Monday",
    "content": "Analyze the 15 key production differences between the two versions.",
    "type": "cloze",
    "text": [
        "1. The 1983 original relies heavily on a programmed {0} for its iconic stuttering beat.",
        "2. The 1998 cover replaces the electronic rhythm with heavily processed {1}.",
        "3. New Order's distinctive pulsing bassline was originally generated using an {2}.",
        "4. Orgy recreates this exact sequencer pattern using heavily distorted {3}.",
        "5. The vocal delivery in the 1983 version is notoriously {4}, typical of the post-punk era.",
        "6. In contrast, the 1998 vocal performance is much more {5}, building to aggressive screams.",
        "7. The original track was designed for the {6}, featuring an extended, repetitive arrangement.",
        "8. The cover version is structured more like a traditional {7}, with distinct verse-chorus dynamics.",
        "9. New Order utilized early {8} technology to trigger the synthesizers in time with the drums.",
        "10. Orgy's production relies on modern {9} techniques to ensure the live instruments lock tightly to the grid.",
        "11. The 1983 mix is characterized by its wide, synthetic {10}, using early digital delays and reverbs.",
        "12. A distinctive choir sound in the original was produced using an early hardware {11}.",
        "13. The 1998 mix feels incredibly {12}, with layers of close-miked guitars dominating the mid-range.",
        "14. The cover drops the synthetic choir in favor of additional layers of {13} guitar feedback and noise.",
        "15. Ultimately, the 1983 track defined {14}, while the 1998 version sits firmly in the Industrial Nu-Metal genre."
    ],
    "options": [
        ["drum machine", "acoustic drum kit", "tape loop"],
        ["live acoustic drums", "hardware sequencers", "orchestral percussion"],
        ["analog synthesizer", "electric fretless bass", "acoustic upright bass"],
        ["electric guitars", "digital keyboards", "brass instruments"],
        ["detached and emotionless", "aggressive and screaming", "highly melismatic"],
        ["emotive and dynamic", "whispered and quiet", "heavily auto-tuned"],
        ["dance club environment", "stadium rock concert", "acoustic folk venue"],
        ["alternative rock song", "classical symphony", "jazz standard"],
        ["digital sequencing", "physical tape splicing", "live orchestra conducting"],
        ["digital audio workstation editing", "analog tape bouncing", "acoustic treatment"],
        ["stereo spatialization", "mono compatibility", "natural room sound"],
        ["digital sampler", "vocoder pedal", "talkbox tube"],
        ["dense and compressed", "spacious and airy", "thin and lo-fi"],
        ["high-gain", "clean acoustic", "pristine digital"],
        ["Synth-Pop", "Grunge", "Britpop"]
    ],
    "answer": [
        "drum machine",
        "live acoustic drums",
        "analog synthesizer",
        "electric guitars",
        "detached and emotionless",
        "emotive and dynamic",
        "dance club environment",
        "alternative rock song",
        "digital sequencing",
        "digital audio workstation editing",
        "stereo spatialization",
        "digital sampler",
        "dense and compressed",
        "high-gain",
        "Synth-Pop"
    ],
    "expert_explanation": "New Order's 1983 original 'Blue Monday' is a seminal Synth-Pop/Electro track. It was programmed using a drum machine and a sequenced analog synthesizer bassline. Early samplers provided the iconic choir hits. Orgy's 1998 cover translates these early electronic elements into an Industrial/Nu-Metal style, trading drum machines for live hard-rock drumming and sequenced synth bass for heavily down-tuned and distorted electric guitars. The vocal delivery shifts from classic post-punk stoicism to an emotive, aggressive style typical of 90s alternative rock."
}

smooth_criminal_q = {
    "title": "Production Differences: Smooth Criminal",
    "content": "Complete the 15-point comparison between the two tracks.",
    "type": "cloze",
    "text": [
        "1. The 1987 original features an incredibly {0} and quantised rhythmic pop groove.",
        "2. Michael Jackson's production used state-of-the-art {1} to painstakingly program the rhythm section.",
        "3. Alien Ant Farm's 2001 cover transforms the pop arrangement into a frantic {2} anthem.",
        "4. The iconic, staccato baseline was originally played on a {3}.",
        "5. The rock cover translates this exact staccato riff to {4} played with palm-muting technique.",
        "6. Michael Jackson's trademark vocal style includes tight rhythmic {5} acting almost as percussion.",
        "7. The 2001 lead vocalist adopts a rougher, more {6} rock delivery, though mimicking the original rhythms.",
        "8. The 1987 track heavily relies on {7} to create its punchy, larger-than-life drum sound.",
        "9. The 2001 version uses an aggressive, close-miked {8} to drive the energy.",
        "10. Both versions maintain a strong emphasis on {9} to give the main riff its bouncy, pushing feel.",
        "11. The original pop mix is very {10}, with every synthetic element occupying a specific frequency space.",
        "12. The rock cover mix is much more {11}, characterized by a 'wall of sound' guitar approach.",
        "13. MJ's version features brief, highly produced {12} to transition between sections.",
        "14. AAF replaces these cinematic transitions with heavy {13} hits and guitar squeals.",
        "15. While the 1987 song is a highly polished {14} production, the cover brings raw, punk-inspired energy."
    ],
    "options": [
        ["tight and rigid", "loose and swung", "rubato and free"],
        ["digital samplers and sequencers", "analog tape loops", "live big bands"],
        ["alternative rock", "jazz fusion", "reggae"],
        ["digital synthesizer", "double bass", "tuba"],
        ["distorted electric guitars", "acoustic guitars", "clean electric guitars"],
        ["vocal hiccups and exclamations", "long operatic vibratos", "deep throat growls"],
        ["full-throated", "whispered", "pitch-corrected"],
        ["gated reverb on the snare", "natural acoustic room ambiance", "tape delay feedback"],
        ["live drum kit", "programmable drum machine", "orchestral percussion section"],
        ["syncopation", "legato phrasing", "polyrhythm"],
        ["clean and separated", "muddy and blended", "distorted and noisy"],
        ["mid-heavy and dense", "scooped and hollow", "thin and bright"],
        ["cinematic sound design effects", "improvised guitar solos", "extended drum solos"],
        ["cymbal crash", "synthesizer sweep", "brass stab"],
        ["Studio Pop", "Live Rock", "Lo-Fi Indie"]
    ],
    "answer": [
        "tight and rigid",
        "digital samplers and sequencers",
        "alternative rock",
        "digital synthesizer",
        "distorted electric guitars",
        "vocal hiccups and exclamations",
        "full-throated",
        "gated reverb on the snare",
        "live drum kit",
        "syncopation",
        "clean and separated",
        "mid-heavy and dense",
        "cinematic sound design effects",
        "cymbal crash",
        "Studio Pop"
    ],
    "expert_explanation": "The original 'Smooth Criminal' relies on cutting-edge 1980s technology (including digital samplers and drum machines) for a rigid, punchy pop/R&B groove. Alien Ant Farm reimagined this in 2001. They mapped the tight synthesized bass riff over to heavily distorted, palm-muted electric guitars, and replaced programmed percussion with highly energetic live drum patterns. The syncopation (emphasis on the off-beats) is perfectly preserved, proving that strong rhythmic motifs can transcend instrumentation."
}

word_up_q = {
    "title": "Production Differences: Word Up!",
    "content": "Select the correct terms to describe the 15 major shifts from 80s Funk to 00s Nu-Metal.",
    "type": "cloze",
    "text": [
        "1. Cameo's 1986 hit is a quintessential example of the 80s {0} genre.",
        "2. Korn's 2004 cover completely reinterprets the groove within the {1} style.",
        "3. The original track is driven by a squelchy, highly resonant {2}.",
        "4. Korn replaces this electronic bassline with their signature {3} played on a 5-string electric bass.",
        "5. Cameo's rhythm section features a rigid, programmed {4} providing the backbeat.",
        "6. The rock cover features a heavy, live drum kit with heavily triggered and {5} samples.",
        "7. In the 1986 version, harmonic rhythm is provided by clean, funk-style {6}.",
        "8. The 2004 version substitutes these clean rhythms with a massive wall of down-tuned {7}.",
        "9. The original vocal performance is smooth, melodic, and highly {8}.",
        "10. Korn's vocalist employs aggressive {9}, typical of heavy metal, drastically altering the mood.",
        "11. Cameo utilized early digital {10} to give the snare drum its unnatural, chopped-off decay.",
        "12. The metal mix uses a drier, more {11} drum sound to emphasize aggression and transient impact.",
        "13. The 1986 production has a very {12} low-end, sitting clearly above the sub-frequencies.",
        "14. The 2004 cover features immense {13} energy from the down-tuned guitars and heavy bass.",
        "15. Ultimately, the original represents the peak of synthetic R&B, while the cover exemplifies heavy rock's reliance on {14}."
    ],
    "options": [
        ["Synth-Funk", "Disco", "Soul"],
        ["Nu-Metal", "Grunge", "Emo"],
        ["analog synthesizer bass", "acoustic upright bass", "distorted electric guitar"],
        ["percussive slap technique", "walking jazz lines", "bowed sustained notes"],
        ["drum machine", "live acoustic drum kit", "orchestral snare"],
        ["compressed", "flanged", "modulated"],
        ["guitar scratching", "power chords", "string sweeps"],
        ["high-gain electric guitars", "clean acoustic guitars", "brass sections"],
        ["rhythmic", "screamed", "whispered"],
        ["growling and screaming", "falsetto harmonies", "spoken word poetry"],
        ["gated reverb", "plate reverb", "spring reverb"],
        ["in-your-face and upfront", "distant and ambient", "washed-out and reverby"],
        ["focused and tight", "booming and muddy", "entirely absent"],
        ["sub-bass", "high-treble", "upper-midrange"],
        ["extreme distortion", "clean amplification", "acoustic instrumentation"]
    ],
    "answer": [
        "Synth-Funk",
        "Nu-Metal",
        "analog synthesizer bass",
        "percussive slap technique",
        "drum machine",
        "compressed",
        "guitar scratching",
        "high-gain electric guitars",
        "rhythmic",
        "growling and screaming",
        "gated reverb",
        "in-your-face and upfront",
        "focused and tight",
        "sub-bass",
        "extreme distortion"
    ],
    "expert_explanation": "Cameo's 'Word Up!' embodies the 1980s transition from organic funk to synthesized R&B (Synth-Funk), notably featuring heavy use of drum machines (often with gates on the snare) and biting synth bass. Korn's cover translates this exact groove into Nu-Metal terminology. The 7-string guitars provide a massive wall of distortion, while bassist Fieldy replaces the synth bass with his distinctive percussive, low-end slap technique on a 5-string bass. The aggressive, growling vocal delivery finishes the genre transformation."
}

if topic_stage:
    for item in topic_stage.get('items', []):
        if item.get('title') == "Comparison 2: Blue Monday":
            item['questions'] = [blue_monday_q]
        elif item.get('title') == "Comparison 3: Smooth Criminal":
            item['questions'] = [smooth_criminal_q]
        elif item.get('title') == "Comparison 4: Word Up!":
            item['questions'] = [word_up_q]

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated the 3 comparison quizzes to the new 15-point format.")
else:
    print("Error: Could not find 'Stage 3: Practical Topic Quizzes'")
