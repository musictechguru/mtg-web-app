import json
import shutil
import glob
import os

# Create the target directory safely
os.makedirs("public/images/case_studies/g_thang", exist_ok=True)

quotes = [
    {"author": "Hip Hop Historian", "text": "Dr. Dre's true talent wasn't just finding breaks; it was completely repurposing them. He slowed down Leon Haywood's 'I Want'a Do Something Freaky to You' to create a laid-back, menacing groove that defined Los Angeles."},
    {"author": "Session Player", "text": "Instead of just directly sampling off vinyl, Dre often hired studio musicians like Colin Wolfe and Scott Storch to replay the samples. This gave him total multi-track control over the individual elements."},
    {"author": "Beatmaker", "text": "The Akai MPC60 was the beating heart of 1990s Hip Hop. Its legendary 12-bit sound added grit, and its unique timing 'swing' gave drum loops a human, perfectly in-the-pocket feel that pure digital sequencing lacked."},
    {"author": "Audio Engineer", "text": "'The Chronic' was mixed specifically for the streets of LA. The Roland TR-808 sub-bass drops were engineered to push immense amounts of air through custom car stereo trunk systems."},
    {"author": "Synth Programmer", "text": "The Minimoog Model D is monophonic—meaning it can only play one note at a time. Using its 'glide' (portamento) function between notes is what created that iconic, sliding G-Funk 'worm' sound."},
    {"author": "Groove Specialist", "text": "G-Funk relies heavily on MPC 'swing', not rigid quantized grids. The hi-hats often lag slightly behind the beat, giving the groove a relaxed, hypnotic head-nodding feel."},
    {"author": "Talk Box Expert", "text": "The Talk Box isn't a synthetic effect—it's incredibly physical. Sound from a keyboard amplifier is blasted through a plastic tube into the musician's mouth, and they use their vocal tract to shape the sound into words."},
    {"author": "Vocal Producer", "text": "Vocal production in early 90s rap was entirely natural. There was no Auto-Tune to fix pitch or time; the cadence and rhythm had to come directly from the MC's natural performance."},
    {"author": "Mixing Engineer", "text": "Mixing for the 'car test' became an industry standard with this album. Dr. Dre ensured the sub-bass frequencies around 40-60Hz were violently loud but controlled enough not to blow out standard car speakers."},
    {"author": "Rap Producer", "text": "Rap vocals demand intimacy. A heavy reverb would push Snoop Dogg's voice to the back of the room; keeping it dry keeps his delivery right in your ear, upfront and confrontational."},
    {"author": "Sampling Pioneer", "text": "The crunchy, warm drum sounds were specifically because of the Akai S950 and MPC60's low sample rates. That technological 'limitation' gave golden-era hip-hop its signature heavy texture."},
    {"author": "Analog purist", "text": "Modern software wavetable synthesis didn't exist yet. The thick, analog warmth of G-Funk came from actual voltage running through the physical circuits of classic 1970s hardware synthesizers."},
    {"author": "Stereo Mixer", "text": "When you have two distinct vocalists trading bars, clever stereo panning helps separate them in the mix. It creates a subtle 'dialogue' in the stereo field that keeps the listener engaged."},
    {"author": "Electronic Artist", "text": "Heavy sidechain 'ducking' is a modern EDM trick. In G-Funk, the kick and bass hit simultaneously and hard, relying on careful frequency EQ to carve out space rather than aggressively pumping volumes."},
    {"author": "Mastering Engineer", "text": "You can turn this record all the way up and it never sounds harsh. That's because it was mixed with minimal master bus compression, leaving the deep transients and dynamic range wide open and breathing."},
    {"author": "Studio Technician", "text": "Despite sounding so modern, 'The Chronic' was recorded entirely on 2-inch analog tape using an SSL mixing console. The tape saturation smoothed out the high frequencies and glued the massive bass together."},
    {"author": "Cultural Critic", "text": "There's a reason East Coast rap sounded gritty and dark while West Coast sounded smooth and bright. The equipment choices, the sunny LA studio environment, and the musical influences all shaped the geography of the sound."},
    {"author": "Beat Architect", "text": "Hip Hop hi-hats aren't supposed to pierce your eardrums. Producers usually roll off the extreme high-end treble to keep the groove sounding warm, dark, and smooth beneath the rapping."},
    {"author": "Musicologist", "text": "G-Funk is the ultimate musical bridge. It took the live instrumentation and funk attitude of Parliament-Funkadelic and married it perfectly to the digital sampling precision of the hip-hop generation."},
    {"author": "Keyboardist", "text": "Remember: a Talk Box uses your literal mouth as an acoustic resonator chamber, while a vocoder analyzes your voice electronically. That unique, slippery vocal synth sound on 'G Thang' is pure Talk Box."}
]

# Image identifiers corresponding to the generated names
image_keys = [
    "vinyl_sample", "session_musicians", "mpc60", "808_sub", "minimoog_lead",
    "mpc_swing", "talk_box", "dry_vocals", "car_stereo", "mixing_desk",
    "akai_s950", "serum_computer", "vocal_panning", "ducking", "dynamics",
    "tape_machine", "west_coast_sound", "eq_hihat", "g_funk_blend", "talkbox_tube"
]

artifacts_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
image_paths = []

for i, key in enumerate(image_keys):
    q_num = i + 1
    files = glob.glob(f"{artifacts_dir}/g_thang_q{q_num}_{key}_*.png")
    if files:
        latest_file = sorted(files)[-1]
        dest_filename = f"g_thang_q{q_num}_{key}.png"
        dest_path = f"public/images/case_studies/g_thang/{dest_filename}"
        shutil.copy(latest_file, dest_path)
        image_paths.append(f"/images/case_studies/g_thang/{dest_filename}")
        print(f"Copied image {q_num}")
    else:
        # Should not happen
        image_paths.append("")
        print(f"Error: No image found for Q{q_num}")

# Inject into JSON
filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'G' Thang" in quiz.get('title', ''):
                for i, q in enumerate(quiz.get('questions', [])):
                    if i < 20:
                        q['expert_quote'] = quotes[i]
                        if image_paths[i]:
                            q['img'] = image_paths[i]

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Injected quotes and available images successfully for G Thang.")

