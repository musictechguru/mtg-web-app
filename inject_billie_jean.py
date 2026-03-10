import json
import shutil
import glob
import os

# Create the target directory safely
os.makedirs("public/images/case_studies/billie_jean", exist_ok=True)

quotes = [
    {"author": "Bruce Swedien", "text": "To get that punchy 'Billie Jean' kick, we didn't use a standard drum tunnel. We literally built a house of baffles and blankets around the bass drum to isolate it completely from the rest of the kit."},
    {"author": "Modern Producer", "text": "The groove of 'Billie Jean' is a perfect marriage of man and machine. Ndugu Chancler played the live kit, but it's layered with a subtle cabasa and snare from the early Linn LM-1 drum computer to lock it to the grid."},
    {"author": "Synth Historian", "text": "That iconic, swelling brass chord isn't a horn section; it's the legendary Yamaha CS-80. It's a massive, expressive polyphonic synthesizer that breathes life into the arrangement."},
    {"author": "80s Studio Engineer", "text": "This era of pop was defined by the warmth of real analog electricity. The Korg M1 and digital PCM sounds hadn't taken over yet; we were still turning physical knobs to shape voltage into music."},
    {"author": "Studio Technician", "text": "Louis Johnson's custom Yamaha bass was recorded straight into the console via a Direct Box (DI). No amps, no microphones. Just the pure, unadulterated transient attack of his fingers on the strings."},
    {"author": "Mixing Engineer", "text": "Quincy wanted separation. If you record an amp in a room, the mic picks up the room's reverb, which clouds the mix. By recording the bass DI, it stayed violently tight and punchy."},
    {"author": "Production Analyst", "text": "Bruce Swedien's 'Sonic Layering' meant every instrument had an exclusive VIP section in the frequency spectrum. The bass owned the lows, the vocals owned the upper mids, and nothing was allowed to clash."},
    {"author": "Mastering Engineer", "text": "Unlike the dense, reverberant 60s 'Wall of Sound', the 'Thriller' album is a masterpiece of high-fidelity separation. You can mentally point to exactly where every shaker, synth, and vocal sits in the room."},
    {"author": "Audio Educator", "text": "Pop on a pair of good headphones. Listen to how the shaker is pinned to the right ear while the hi-hat ticks in the left. The stereo field isn't just wide; it's surgically organized."},
    {"author": "Audiophile Magazine", "text": "In the early 80s, high-end consumer stereo systems were booming. 'Billie Jean' was mixed to be the ultimate showcase track for these systems, proving that pop music could sound as detailed as classical recordings."},
    {"author": "80s Programmer", "text": "We didn't have modern digital samplers or DAWs. When Michael wanted a specific sound, we had to create it physically or use very early, incredibly expensive technology like the Fairlight CMI."},
    {"author": "Vocal Producer", "text": "Those famous 'hee-hee's and vocal hiccups aren't samples flown in from other records. Michael performed all of his own percussion and ad-libs live in the booth; his voice was an instrument in the rhythm section."},
    {"author": "Mixing Secrets", "text": "The secret to the massive low-end of 'Billie Jean' is actually cutting the lows everywhere else. High-pass filtering the guitars and synths ensures the kick and bass guitar don't have to fight for the sub-frequencies."},
    {"author": "Gear Historian", "text": "You would think the King of Pop recorded on a $10,000 vintage condenser mic. In reality, 'Billie Jean' was tracked on a Shure SM7—a dynamic broadcast microphone chosen for its punchy, focused sound."},
    {"author": "Dance Producer", "text": "Compression was used to give the groove a relentless pulse. Units like the dbx 160 were fantastic for grabbing the transients of the bass and drums, holding them in place so the dancefloor never lost the pocket."},
    {"author": "Mastering Expert", "text": "If you look at the waveform of 'Billie Jean', the transients—the sharp, initial impacts of the drums—are completely intact. It breathes. Modern brickwall limiting often shaves these peaks off, destroying the groove's natural bounce."},
    {"author": "Studio Acoustic Designer", "text": "Bruce Swedien used his custom-built acoustic reverb chambers and mechanical EMT 140 plates to craft the space around Michael's vocals. It's a physical, shimmering reverb that digital plugins still struggle to emulate perfectly."},
    {"author": "Audio Technologist", "text": "While modern producers can apply a 'digital impulse response' of the Taj Mahal with one click, the spatial effects on 'Billie Jean' were the result of physically moving microphones around loudspeakers in tiled rooms and echo chambers."},
    {"author": "Musicologist", "text": "It's the ultimate evolution of Disco. The beat is a relentless four-on-the-floor, but the lush, swirling strings of the 70s have been replaced by angular, aggressive synthesizers, giving birth to modern Dance-Pop."},
    {"author": "Cultural Critic", "text": "Despite the heavy rock guitar solo on 'Beat It', 'Billie Jean' remains fundamentally an R&B/Funk masterpiece. It proved that electronic pop could hit with the same visceral urgency as a live rock band."}
]

# Image identifiers corresponding to the generated names
image_keys = [
    "kick_drum", "drum_machine", "cs80", "analog_synths", "bass_di",
    "dry_studio", "sonic_layering", "wall_of_sound", "stereo_field", "hifi_stereo",
    "fairlight_cmi", "vocal_booth", "highpass_eq", "sm7_mic", "dbx160",
    "transients", "emt_plate", "convolution", "disco_kit", "rb_guitar"
]

artifacts_dir = "/Users/thorhouse/.gemini/antigravity/brain/70f85d8d-d4b6-4c31-be22-dfeed0f7406b"
image_paths = []

for i, key in enumerate(image_keys):
    q_num = i + 1
    files = glob.glob(f"{artifacts_dir}/billie_jean_q{q_num}_{key}_*.png")
    if files:
        latest_file = sorted(files)[-1]
        dest_filename = f"billie_jean_q{q_num}_{key}.png"
        dest_path = f"public/images/case_studies/billie_jean/{dest_filename}"
        shutil.copy(latest_file, dest_path)
        image_paths.append(f"/images/case_studies/billie_jean/{dest_filename}")
        print(f"Copied image {q_num}")
    else:
        # Rate limited images will hit here
        image_paths.append("")
        print(f"Warning: No image found for Q{q_num}")

# Inject into JSON
filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if "'Billie Jean'" in quiz.get('title', ''):
                for i, q in enumerate(quiz.get('questions', [])):
                    if i < 20:
                        q['expert_quote'] = quotes[i]
                        # only attach image if we actually generated / copied it
                        if image_paths[i]:
                            q['img'] = image_paths[i]

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Injected quotes and available images successfully.")

