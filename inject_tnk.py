import json
import os

filepath = 'src/data/course_data.json'

with open(filepath, 'r') as f:
    data = json.load(f)

# Find Tomorrow Never Knows quiz inside sections
tnk_quiz = None
for section in data.get('sections', []):
    if section.get('title') == 'Stage 5: Case Studies':
        for quiz in section.get('items', []):
            if quiz.get('title') == "'Tomorrow Never Knows' - Music Technology Analysis":
                tnk_quiz = quiz
                break

if not tnk_quiz:
    print("Could not find Tomorrow Never Knows quiz")
    exit(1)

IMAGE_PREFIX = "/images/case_studies/tomorrow_never_knows/"

updates = [
    {"img": "tnk_q1_tape_loops.png", "quote": {"text": "Tape loops were the original samplers, physically capturing and repeating moments of time without digital memory.", "author": "Tape Experiments"}},
    {"img": "tnk_q2_instrumentation.png", "quote": {"text": "The studio itself became the primary instrument, surpassing the limitations of what musicians could physically play.", "author": "Studio as Instrument"}},
    {"img": "tnk_q3_vocal_processing.png", "quote": {"text": "Sending a vocal through a rotating speaker cabinet creates a profound sense of motion that plugins still struggle to match organically.", "author": "Vocal Engineering"}},
    {"img": "tnk_q4_percussion.png", "quote": {"text": "A relentless, acoustic drum groove, when heavily compressed, creates a hypnotic energy that a machine cannot entirely replicate.", "author": "Rhythmic Power"}},
    {"img": "tnk_q5_drum_processing.png", "quote": {"text": "Extreme compression transforms a drum kit from a collection of instruments into a single, breathing wall of sound.", "author": "Dynamics Control"}},
    {"img": "tnk_q6_sequencing.png", "quote": {"text": "True innovation in the analog era came from pushing the physical limits of the equipment, not writing lines of code.", "author": "Analog Ethos"}},
    {"img": "tnk_q7_sampling.png", "quote": {"text": "Every loop and reverse effect was a physical commitment, requiring a razor blade and an unwavering vision.", "author": "Editing History"}},
    {"img": "tnk_q8_filtering.png", "quote": {"text": "Limitations force creativity; engineers sculpted radical textures using nothing more than basic bass and treble shelving.", "author": "Frequency Design"}},
    {"img": "tnk_q9_reverse_effects.png", "quote": {"text": "Physically reversing the tape removes the sharp attack of an instrument, leaving only an eerie, swelling sustain.", "author": "Tape Manipulation"}},
    {"img": "tnk_q10_digital_processing.png", "quote": {"text": "The absence of digital precision meant that every effect was unique and impossible to reproduce exactly twice.", "author": "The Analog Era"}},
    {"img": "tnk_q11_harmony.png", "quote": {"text": "A continuous, droning harmony anchors the chaos, a fundamental technique borrowed from ancient Indian classical traditions.", "author": "Musical Synthesis"}},
    {"img": "tnk_q12_bass_texture.png", "quote": {"text": "The low end was not just an instrument, but a foundational drone upon which the entire sonic experiment was built.", "author": "Low End Theory"}},
    {"img": "tnk_q13_pitch_effects.png", "quote": {"text": "Varispeed recording fundamentally alters the timbre of an instrument, morphing guitars into bells and vocals into unearthly sounds.", "author": "Speed Control"}},
    {"img": "tnk_q14_sample_sources.png", "quote": {"text": "The most alien sounds are often just familiar human noises, pitched up, distorted, and played on an endless loop.", "author": "Sound Sourcing"}},
    {"img": "tnk_q15_sound_design.png", "quote": {"text": "This was the birth of modern sound design: treating recorded audio not as a song, but as raw clay to be molded.", "author": "Sonic Architecture"}},
    {"img": "tnk_q16_compression.png", "quote": {"text": "Before automated sidechaining, true rhythmic interaction between mix elements was achieved by 'playing' the console live.", "author": "Mix Engineering"}},
    {"img": "tnk_q17_stereo_field.png", "quote": {"text": "Active, chaotic panning transformed the stereo field into a disorienting, three-dimensional psychedelic experience.", "author": "Spatial Audio"}},
    {"img": "tnk_q18_recording_format.png", "quote": {"text": "With only four tracks available, complex arrangements required 'reduction mixes,' forcing permanent, irreversible production choices.", "author": "Multitrack Recording"}},
    {"img": "tnk_q19_eq.png", "quote": {"text": "Engineers pushed equipment far beyond its intended purpose, using extreme EQ to alienate sounds from their acoustic origins.", "author": "Extreme Processing"}},
    {"img": "tnk_q20_reverb.png", "quote": {"text": "Physical echo chambers provided an organic, haunting decay that digital algorithms spent decades trying to accurately model.", "author": "Acoustic Spaces"}}
]

for i, obj in enumerate(updates):
    tnk_quiz['questions'][i]['img'] = IMAGE_PREFIX + obj['img']
    tnk_quiz['questions'][i]['expert_quote'] = obj['quote']

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Successfully injected Tomorrow Never Knows images and quotes!")
