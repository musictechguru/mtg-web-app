import json
import os

file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

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

if topic_stage:
    comp_2 = {
        "type": "lp_quiz",
        "title": "Comparison 2: Blue Monday",
        "youtube_id": "c1GxjzHm5us",
        "video_title_1": "New Order (1983)",
        "youtube_id_2": "MAt9QTmVc7Q",
        "video_title_2": "Orgy (1998)",
        "description": "Compare the 1983 Synth-Pop original by New Order with the 1998 Industrial/Nu-Metal cover by Orgy. Focus on instrumentation and genre shifts.",
        "questions": [
            {
                "title": "Production Differences: Blue Monday",
                "content": "Analyze the production differences between the two versions.",
                "type": "cloze",
                "text": "The original 1983 track relies heavily on the {0} for its iconic stuttering beat, while the 1998 cover replaces this with {1}. Similarly, the distinctive pulsing synth bass sequencer of the original is recreated using {2} in the cover. The New Order version features deadpan, {3} vocals typical of post-punk, whereas the Orgy singer employs a much more {4} and occasionally distorted delivery. The 1998 version sits firmly in the {5} genre, drastically altering the original's club-oriented {6} feel.",
                "options": [
                    ["Roland TR-808", "Oberheim DMX", "LinnDrum"],
                    ["live heavy acoustic drums", "orchestral percussion", "an Akai MPC sampler"],
                    ["a fretless bass", "heavily distorted electric guitars", "a Moog Model D"],
                    ["melismatic", "detached and emotionless", "aggressive"],
                    ["whispered", "aggressive / screaming", "falsetto"],
                    ["Industrial / Nu-Metal", "Grunge", "Britpop"],
                    ["Synth-Pop / Electro", "Disco", "House"]
                ],
                "answer": [
                    "Oberheim DMX",
                    "live heavy acoustic drums",
                    "heavily distorted electric guitars",
                    "detached and emotionless",
                    "aggressive / screaming",
                    "Industrial / Nu-Metal",
                    "Synth-Pop / Electro"
                ],
                "expert_explanation": "New Order's 1983 original 'Blue Monday' is a seminal Synth-Pop/Electro track. It was programmed using an Oberheim DMX drum machine line and a Moog Source for the sequenced bassline. Orgy's 1998 cover translates these early electronic elements into an Industrial/Nu-Metal style, trading drum machines for live hard-rock drumming and sequenced synth bass for heavily down-tuned and distorted electric guitars. The vocal delivery shifts from Bernard Sumner's classic post-punk stoicism to an emotive, aggressive style typical of 90s alternative rock."
            }
        ]
    }

    comp_3 = {
        "type": "lp_quiz",
        "title": "Comparison 3: Smooth Criminal",
        "youtube_id": "h_D3VFfhvs4",
        "video_title_1": "Michael Jackson (1987)",
        "youtube_id_2": "CDl9ZMfj6aE",
        "video_title_2": "Alien Ant Farm (2001)",
        "description": "Compare Michael Jackson's 1987 Pop original with Alien Ant Farm's 2001 Alternative Rock cover. Focus on the rhythmic structure and instrumentation.",
        "questions": [
            {
                "title": "Production Differences: Smooth Criminal",
                "content": "Complete the comparison between the two tracks.",
                "type": "cloze",
                "text": "Michael Jackson's original version features a very {0} and quantised groove, heavily reliant on early digital sequencers and drum machines like the {1} combined with live percussion. The Alien Ant Farm cover transforms this into a frantic {2} track with {3} playing the iconic staccato riff. While MJ's vocal performance is characterized by tight, rhythmic {4} and high-pitched yelps, the 2001 cover features a rougher, {5} rock vocal. Both versions maintain the extremely tight {6} of the main riff, though they achieve it through completely different instrumental means.",
                "options": [
                    ["loose / swung", "tight / rigid", "rubato"],
                    ["LinnDrum / Synclavier", "Roland TR-808", "Yamaha RX-11"],
                    ["Alternative Rock / Nu-Metal", "Jazz Fusion", "Reggae"],
                    ["distorted power chords (electric guitar)", "a brass section", "a grand piano"],
                    ["hiccups", "vibrato", "growls"],
                    ["full-throated", "whispering", "auto-tuned"],
                    ["syncopation", "legato", "polyrhythm"]
                ],
                "answer": [
                    "tight / rigid",
                    "LinnDrum / Synclavier",
                    "Alternative Rock / Nu-Metal",
                    "distorted power chords (electric guitar)",
                    "hiccups",
                    "full-throated",
                    "syncopation"
                ],
                "expert_explanation": "The original 'Smooth Criminal' relies on cutting-edge 1980s technology (including the Synclavier and various drum machines) for a rigid, punchy pop/R&B groove. Alien Ant Farm reimagined this in 2001 during the Nu-Metal/Pop-Punk explosion. They mapped the tight synthesized bass riff over to heavily distorted, palm-muted electric guitars, and replaced programmed percussion with highly energetic live drum patterns. The syncopation (emphasis on the off-beats) is perfectly preserved, proving that strong rhythmic motifs can transcend instrumentation."
            }
        ]
    }

    comp_4 = {
        "type": "lp_quiz",
        "title": "Comparison 4: Word Up!",
        "youtube_id": "MZjAantupsA",
        "video_title_1": "Cameo (1986)",
        "youtube_id_2": "1q-k-uN73Gk",
        "video_title_2": "Korn (2004)",
        "description": "Compare the 1986 Funk original by Cameo with the 2004 Nu-Metal cover by Korn. Focus on how rhythm and texture are reinterpreted.",
        "questions": [
            {
                "title": "Production Differences: Word Up!",
                "content": "Select the correct terms to describe the shift from 80s Funk to 00s Nu-Metal.",
                "type": "cloze",
                "text": "Cameo's 1986 hit is a quintessential 80s {0} track, dominated by a heavily compressed, synthetic {1} and a prominent snare drum with lots of {2}. Korn's 2004 cover strips away the funk instrumentation entirely, replacing the synth bass with their signature {3} played on {4}. The original's clean, rhythmic guitar scratching is substituted with thick walls of {5}. While Cameo's vocals are smooth and melodic, Jonathan Davis of Korn employs aggressive {6} consistent with the Nu-Metal style.",
                "options": [
                    ["Disco", "Synth-Funk", "Soul"],
                    ["slap bass guitar", "bass drop", "synth bass"],
                    ["gated reverb", "tape delay", "flanging"],
                    ["sub-bass frequencies", "slapping and popping", "tapping"],
                    ["7-string guitars / 5-string basses", "acoustic instruments", "Moog synthesizers"],
                    ["chorus effects", "high-gain distortion", "clean delays"],
                    ["growling and screaming", "falsetto harmonies", "spoken word"]
                ],
                "answer": [
                    "Synth-Funk",
                    "synth bass",
                    "gated reverb",
                    "slapping and popping",
                    "7-string guitars / 5-string basses",
                    "high-gain distortion",
                    "growling and screaming"
                ],
                "expert_explanation": "Cameo's 'Word Up!' embodies the 1980s transition from organic funk to synthesized R&B (Synth-Funk), notably featuring heavy use of drum machines (often with gates on the snare) and biting synth bass. Korn's cover translates this exact groove into Nu-Metal terminology. The 7-string guitars provide a massive wall of distortion, while bassist Fieldy replaces the synth bass with his distinctive percussive, low-end slap technique on a 5-string bass. The aggressive, growling vocal delivery finishes the genre transformation."
            }
        ]
    }
    
    # Check if they already exist
    existing_titles = [item.get('title') for item in topic_stage.get('items', [])]
    if comp_2['title'] not in existing_titles:
        topic_stage['items'].append(comp_2)
    if comp_3['title'] not in existing_titles:
        topic_stage['items'].append(comp_3)
    if comp_4['title'] not in existing_titles:
        topic_stage['items'].append(comp_4)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

    print("Success: Appended the 3 new comparison quizzes.")
else:
    print("Error: Could not find 'Stage 3: Practical Topic Quizzes'")
