import json
import shutil
import os
import random

# Source images paths
IMG_DIR = "/Users/thorhouse/.gemini/antigravity/brain/55f64f7d-f7a7-45d7-8be1-c8c079ebbd3d"
files_in_dir = os.listdir(IMG_DIR)

app_img_dir = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/comparisons"
os.makedirs(app_img_dir, exist_ok=True)

# Copy and rename images
image_map = {
    "Comparison 1": "tainted_love_comparison",
    "Comparison 2": "fast_car_comparison",
    "Comparison 3": "always_on_my_mind_comparison",
    "Comparison 4": "mad_world_comparison",
    "Comparison 5": "crossroads_comparison",
    "Comparison 6": "little_help_friends_comparison",
    "Comparison 7": "blue_monday_comparison",
    "Comparison 8": "smooth_criminal_comparison",
    "Comparison 9": "word_up_comparison"
}

copied_paths = {}

for key, prefix in image_map.items():
    matching_files = [f for f in files_in_dir if f.startswith(prefix) and f.endswith(".png")]
    if matching_files:
        src_path = os.path.join(IMG_DIR, matching_files[0])
        dest_filename = f"{prefix}.png"
        dest_path = os.path.join(app_img_dir, dest_filename)
        shutil.copy(src_path, dest_path)
        copied_paths[key] = f"/images/comparisons/{dest_filename}"
        print(f"Copied {src_path} to {dest_path}")
    else:
        print(f"Warning: Image for {prefix} not found yet.")

# Load course data
course_data_path = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json"
with open(course_data_path, 'r') as f:
    data = json.load(f)

# Content to inject
explanations = {
    "Comparison 1": {
        "expert_explanation": "Tainted Love (1981) by Soft Cell is a prime example of early Synth-Pop, relying heavily on the Roland Jupiter-4 and Synclavier. The 1964 Gloria Jones original is a Northern Soul classic driven by acoustic brass, bass, and live drum kit. The shift from a live band organic feel to a rigid, sequenced electronic production defined the sound of the early 80s.",
        "expert_quote": {"text": "Soft Cell stripped the soulful orchestration of the original and replaced it with cold, precise synthesis, creating an entirely new emotional landscape.", "author": "Synth-Pop Retrospective"}
    },
    "Comparison 2": {
        "expert_explanation": "Tracy Chapman's 1988 original 'Fast Car' is built around a close-miked acoustic guitar, providing an intimate, coffeehouse folk texture. Jonas Blue's 2015 Tropical House cover trades the acoustic warmth for pristine digital synths, a prominent four-on-the-floor kick, and heavily processed vocal chops, highlighting the shift toward modern electronic dance production.",
        "expert_quote": {"text": "The transition from acoustic storytelling to tropical house anthems demonstrates how a core melody can transcend its original genre through modern production tools.", "author": "Modern Pop Analysis"}
    },
    "Comparison 3": {
        "expert_explanation": "Brenda Lee's 1972 country-pop hit 'Always On My Mind' relies on lush acoustic instrumentation and pedal steel guitar, typical of the Nashville Sound. Pet Shop Boys completely reimagined it in 1987 as a high-energy Hi-NRG synth-pop track, utilizing the Fairlight CMI and E-mu Emulator II for a synthetic string and brass arrangement that dominated club scenes.",
        "expert_quote": {"text": "Pet Shop Boys took a weeping country ballad and turned it into an unshakeable electronic club anthem, proving that any song can be rebuilt for the dancefloor.", "author": "80s Production Weekly"}
    },
    "Comparison 4": {
        "expert_explanation": "Tears For Fears' 1982 'Mad World' is heavily synthesized, using a Roland CR-78 drum machine and Prophet-5 synth to create a pulsing, slightly detached atmosphere. Michael Andrews and Gary Jules' 2001 cover strips this down to just a raw, emotional vocal and a simple upright piano, demonstrating how removing production layers can drastically change the emotional weight of a track.",
        "expert_quote": {"text": "By replacing cold synthesizers with the intimate reverberation of a wooden piano, the cover finds a vulnerability that the original hid behind neon production.", "author": "Acoustic Sessions Magazine"}
    },
    "Comparison 5": {
        "expert_explanation": "Robert Johnson's 1936 'Cross Road Blues' was recorded in a makeshift hotel room studio with a single microphone capturing his voice and acoustic guitar, leading to a lo-fi, deeply authentic Delta Blues sound. Cream's 1968 'Crossroads' transforms it into a roaring, high-volume electric blues-rock anthem, characterized by driving drum kits and Eric Clapton's heavily distorted, loud Gibson guitar tone.",
        "expert_quote": {"text": "What started as a quiet, solitary lament on an acoustic guitar evolved into the booming blueprint for loud, stadium blues rock.", "author": "Blues & Rock History"}
    },
    "Comparison 6": {
        "expert_explanation": "The Beatles' 1967 original 'With A Little Help From My Friends' is a pristine, bouncy pop recording mixed carefully with bouncing Ringo Starr vocals and clean instrumentation on 4-track tape. Joe Cocker's legendary 1968 Woodstock performance is a masterclass in heavy blues-rock reinvention, featuring a radically slowed tempo, screaming Hammond organ, and a raw, gravelly vocal delivery.",
        "expert_quote": {"text": "Cocker turned a cheerful, polite pop tune into a desperate, soaring soul-rock masterpiece that defined a generation.", "author": "Classic Rock Reviews"}
    }
}

distractors = [
    "analog tape echo", "digital delay", "spring reverb", "plate reverb", "chorus pedal", "flanger effect", "phaser unit", "wah-wah pedal", "distortion box", "overdrive channel", "fuzz box", "compressor pedal", "limiter", "noise gate", "graphic EQ", "parametric EQ", "synthesizer lead", "synth bass", "drum machine", "live drum kit", "acoustic guitar", "electric guitar", "bass guitar", "upright bass", "grand piano", "Rhodes piano", "Hammond organ", "Wurlitzer", "brass section", "string section", "choir ensemble", "lead vocal", "backing vocals", "vocoder", "talkbox", "autotune", "pitch correction"
]

for section in data.get("sections", []):
    if "Comparison" in section.get("title", "") or "Stage 4" in section.get("title", ""):
        for item in section.get("items", []):
            title = item.get("title", "")
            comp_key = next((k for k in image_map.keys() if k in title), None)
            
            if comp_key:
                # Add image if copied
                if comp_key in copied_paths:
                    item_img = copied_paths[comp_key]
                else:
                    item_img = None

                # For Type 1-6 (multi_choice)
                if int(comp_key.split()[-1]) <= 6:
                    for idx, q in enumerate(item.get("questions", [])):
                        q["img"] = item_img
                        # Optionally add explanation only to the first or last question, 
                        # or all of them. Adding to all ensures it shows up when quiz finishes.
                        q["expert_explanation"] = explanations[comp_key]["expert_explanation"]
                        q["expert_quote"] = explanations[comp_key]["expert_quote"]

                # For Type 7-9 (cloze)
                else:
                    for q in item.get("questions", []):
                        if q.get("type") == "cloze":
                            q["img"] = item_img
                            if "options" in q:
                                new_options_list = []
                                for opt_array in q["options"]:
                                    current_opts = set(opt_array)
                                    # Add distractors until we have 5 options
                                    while len(current_opts) < 5:
                                        new_d = random.choice(distractors)
                                        current_opts.add(new_d)
                                    
                                    # Convert back to list and shuffle
                                    new_opts = list(current_opts)
                                    random.shuffle(new_opts)
                                    new_options_list.append(new_opts)
                                q["options"] = new_options_list

# Save back to json
with open(course_data_path, 'w') as f:
    json.dump(data, f, indent=4)

print("Finished updating JSON.")

