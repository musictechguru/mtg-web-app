import json
import re

json_file = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/course_data.json'

with open(json_file, 'r') as f:
    data = json.load(f)

quotes = [
    {"text": "The magic of the 1950s studio was the undeniable groove created when five musicians locked eyes and played as one.", "author": "Production Analysis"},
    {"text": "Prior to the synthesizer era, atmosphere was conjured purely through physical instruments and the air moving in the room.", "author": "Studio Secrets"},
    {"text": "Slapback echo didn't just add space; it became a rhythmic instrument in itself, defining the sound of early rock.", "author": "Tape Techniques"},
    {"text": "The fretless nature of the upright bass allowed players to 'slap' the strings, adding immediate percussive punch.", "author": "Groove Mechanics"},
    {"text": "In a mono mix, frequency balance is everything; every instrument must physically sit in its own pocket without the luxury of panning.", "author": "Mixing History"},
    {"text": "Dynamic control relied heavily on the singer's physical mic technique, naturally riding levels before the signal ever hit a tube.", "author": "Vocal Production"},
    {"text": "Leaving natural dynamics intact allows a recording to breathe, giving the loud moments true emotional impact.", "author": "Mastering Principles"},
    {"text": "The imperfections of a live take are exactly what makes these early records feel so incredibly alive.", "author": "Session Insights"},
    {"text": "A minimalist arrangement forces every note and every rest to carry the full weight of the emotional narrative.", "author": "Arrangement Fundamentals"},
    {"text": "Engineers relied on the fundamental tone of the instrument and the room, using EQ only as a gentle polish rather than a corrective tool.", "author": "Classic Engineering"},
    {"text": "The 12-bar blues is the skeleton key of rock and roll, providing a familiar framework for unbridled expression.", "author": "Musical Forms"},
    {"text": "Mono forces the engineer to create depth through volume and reverb, building a profound front-to-back soundstage.", "author": "Spatial Audio"},
    {"text": "An inch of microphone movement can change the tonal character of an instrument more drastically than any EQ on the console.", "author": "Acoustic Recording"},
    {"text": "Limitations breed creativity; without surgical EQ, engineers had to get the sound perfect at the source.", "author": "Analog Wisdom"},
    {"text": "Without the safety net of quantization, rhythmic feel relied entirely on the human heartbeat of the performer.", "author": "Rhythm Studies"},
    {"text": "A physical echo chamber wraps the sound in actual space, delivering reflections that algorithms still fight to emulate.", "author": "Reverb Dimensions"},
    {"text": "The absence of digital manipulation meant that every sound on the record actually happened in that room, in that moment.", "author": "Authenticity in Audio"},
    {"text": "Manual fader riding requires the engineer to 'play' the console like an instrument, anticipating the emotional swells of the song.", "author": "Mixing as Performance"},
    {"text": "The sparse arrangement and heavy reverb physically manifest the lyrical isolation, painting the emptiness with sound.", "author": "Word Painting"},
    {"text": "Before modern sidechain compression, the natural rhythmic interplay between the kick and the bass player was the only way to drive the groove.", "author": "Low End Theory"}
]

images = [
    "/images/case_studies/heartbreak_hotel/hh_q1_performance_1773077146973.png",
    "/images/case_studies/heartbreak_hotel/hh_q2_production_1773077168758.png",
    "/images/case_studies/heartbreak_hotel/hh_q3_vocal_effect_1773077191013.png",
    "/images/case_studies/heartbreak_hotel/hh_q4_bass_1773077209999.png",
    "/images/case_studies/heartbreak_hotel/hh_q5_stereo_field_1773077230422.png",
    "/images/case_studies/heartbreak_hotel/hh_q6_compression_1773077250702.png",
    "/images/case_studies/heartbreak_hotel/hh_q7_dynamics_1773077270171.png",
    "/images/case_studies/heartbreak_hotel/hh_q8_solo_1773077291241.png",
    "/images/case_studies/heartbreak_hotel/hh_q9_instrumentation_1773077310770.png",
    "/images/case_studies/heartbreak_hotel/hh_q10_filtering_1773077332738.png",
    "/images/case_studies/heartbreak_hotel/hh_q11_structure_1773077377065.png",
    "/images/case_studies/heartbreak_hotel/hh_q12_stereo_image_1773077396234.png",
    "/images/case_studies/heartbreak_hotel/hh_q13_eq_mic_placement_1773077416899.png",
    "/images/case_studies/heartbreak_hotel/hh_q14_eq_fixed_limits_1773077437882.png",
    "/images/case_studies/heartbreak_hotel/hh_q15_sequencing_1773077458518.png",
    "/images/case_studies/heartbreak_hotel/hh_q16_reverb_1773077480338.png",
    "/images/case_studies/heartbreak_hotel/hh_q17_sampling_authenticity_1773077505028.png",
    "/images/case_studies/heartbreak_hotel/hh_q18_automation_1773077523846.png",
    "/images/case_studies/heartbreak_hotel/hh_q19_atmosphere_1773077542955.png",
    "/images/case_studies/heartbreak_hotel/hh_q20_sidechain_1773077564778.png"
]


case_studies_stage = next((stage for stage in data['sections'] if stage['title'] == 'Stage 5: Case Studies'), None)

hh_quiz = next((quiz for quiz in case_studies_stage['items'] if quiz['title'] == "'Heartbreak Hotel' - Music Technology Analysis"), None)

if hh_quiz:
    for i, question in enumerate(hh_quiz['questions']):
        if i < len(images) and i < len(quotes):
            question['img'] = images[i]
            question['expert_quote'] = quotes[i]

with open(json_file, 'w') as f:
    json.dump(data, f, indent=4)
print("Updated Heartbreak Hotel successfully!")
