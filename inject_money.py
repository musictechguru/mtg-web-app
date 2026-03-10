import json
import shutil
import glob
import os

images = [
    "money_q1_splicing", "money_q2_tangled_tape", "money_q3_vcs3", "money_q4_minimoog",
    "money_q5_pbass", "money_q6_bass_hands", "money_q7_vu_meter", "money_q8_emi_console",
    "money_q9_stereo_cash", "money_q10_quadraphonic", "money_q11_stratocaster", 
    "money_q12_sheet_music", "money_q13_binson_echorec", "money_q14_delay_dial",
    "money_q15_foley_mic", "money_q16_ceramic_bowl", "money_q17_fairchild",
    "money_q18_tape_saturation", "money_q19_eq_knob", "money_q20_ns10_monitors"
]

quotes = [
    {"text": "The iconic cash register rhythm wasn't played; it was meticulously constructed, inch by inch, using a ruler and a razor blade.", "author": "Tape Splicing Basics"},
    {"text": "Before the Akai MPC, 'sampling' meant holding your breath while making irreversible physical cuts to master tape.", "author": "Analogue Editing"},
    {"text": "The VCS3 didn't just add a futuristic sheen; its unpredictable analog circuitry gave the track a living, breathing alien texture.", "author": "Synth History"},
    {"text": "Unlike the precise digital synthesizers of the 80s, the analog oscillators used on 'Dark Side' drifted and swelled with organic warmth.", "author": "Analogue Synthesis"},
    {"text": "That iconic 7/4 riff relies entirely on the heavy, fundamental 'thump' of a precision bass locking perfectly with the kick drum.", "author": "Bass Production"},
    {"text": "Despite the futuristic textures surrounding it, the heart of 'Money' is a grounded, blues-rooted performance on a four-string electric bass.", "author": "Rhythm Sections"},
    {"text": "The emotional impact of a 1970s audiophile pressing comes from allowing quiet moments to breathe, rather than crushing every transient against a limiter.", "author": "Mastering Dynamics"},
    {"text": "True heaviness comes from dynamic contrast. If the verses were compressed to be as loud as the guitar solo, the climax would lose all its power.", "author": "Dynamic Contrast"},
    {"text": "Alan Parsons used the stereo field not just for clarity, but as a kinetic playground, violently throwing the cash register loops between channels.", "author": "Stereo Panning"},
    {"text": "The album was conceived from the ground up for Quadraphonic surround sound, making the stereo panning incredibly deep and immersive.", "author": "Surround Formats"},
    {"text": "The brilliance of the arrangement is geometric; breaking from the claustrophobic 7/4 meter into a wide-open 4/4 groove lets the guitar solo truly fly.", "author": "Arrangement Theory"},
    {"text": "A hit pop song in an odd meter is nearly impossible, but the bassline's driving, repetitive groove makes the unnatural 7/4 time feel deeply infectious.", "author": "Meter and Rhythm"},
    {"text": "The haunting, rhythmic delays weren't from tape—they were powered by a spinning magnetic drum that degraded the echoes with a beautiful dark warmth.", "author": "Echo Devices"},
    {"text": "Echo tempo couldn't be typed into a screen; it was physically tuned by ear, slowing down a mechanical motor until it synced with the drummer.", "author": "Time-Based Effects"},
    {"text": "'Money' brought Musique Concrète to the mainstream: elevating everyday noise—coins, paper, cash registers—into lead rhythmic instruments.", "author": "Sonic Experimentation"},
    {"text": "The metallic clatter and tearing paper possess a complex acoustic chaos that synthesis and digital sampling still struggle to authentically recreate.", "author": "Foley Recording"},
    {"text": "Glueing the track together required heavy compression on individual elements, while leaving the stereo mix bus entirely untouched to preserve the massive transients.", "author": "Bus Processing"},
    {"text": "When pushed hard, analog tape doesn't cleanly 'brickwall' clip; it saturates the signal, softening harsh transients into warm, musical harmonic distortion.", "author": "Tape Saturation"},
    {"text": "The clarity of the mix relies on ruthless subtractive EQ: carving the low frequencies out of the guitars and keyboards so the bass can dominate.", "author": "Subtractive EQ"},
    {"text": "The engineering goal was ultimate fidelity. The mixes were polished to deliver deep sub-bass and sparkling highs that tested the limits of 1970s vinyl.", "author": "High Fidelity"}
]

os.makedirs("public/images/case_studies/money", exist_ok=True)

# Copy files and format map
image_paths = []
source_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b/"
for img_base in images:
    found = glob.glob(os.path.join(source_dir, f"{img_base}*.png"))
    if found:
        latest = sorted(found)[-1]
        dest = f"public/images/case_studies/money/{img_base}.png"
        shutil.copy(latest, dest)
        image_paths.append(f"/images/case_studies/money/{img_base}.png")
        print(f"Copied {os.path.basename(latest)} to {dest}")
    else:
        print(f"WARNING: No generated image found for {img_base}")
        image_paths.append("")


filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

money_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Money'" in quiz.get('title', ''):
                money_quiz = quiz
                break

if money_quiz:
    qs = money_quiz.get('questions', [])
    for i in range(min(len(qs), 20)):
        if image_paths[i]:
            qs[i]['img'] = image_paths[i]
        qs[i]['expert_quote'] = quotes[i]
        print(f"Updated Q{i+1} in Money.")
        
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
else:
    print("Could not find Money quiz in JSON")
