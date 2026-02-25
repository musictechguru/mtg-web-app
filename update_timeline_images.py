import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# The image mappings
img_map = {
    "rec_50": "/images/1950's tape machine.png",
    "rec_60": "/images/Ampex tape machine.png",
    "rec_70": "/images/Studer tape machine.png",
    "rec_80": "/images/Studer tape machine.png",
    "rec_90": "/images/dat_tape_recorder.png",
    "rec_00": "/images/daw_interface.svg",
    
    "seq_60": "/images/moog_modular_960.jpg",
    "seq_70": "/images/roland_mc8.jpg",
    "seq_80": "/images/akai_mpc60.jpg",
    "seq_90": "/images/cubase_atari_st.jpg",
    "seq_00": "/images/ableton_live_interface.png",
    
    "dist_50": "/images/tube_preamp.png",
    "dist_60": "/images/Monster Fuzz pedal.png",
    "dist_70": "/images/marshall_stack.png",
    "dist_80": "/images/boss_sd1.png",
    "dist_90": "/images/line6_pod.png",
    
    "samp_60": "/images/mellotron_keyboard.png",
    "samp_70": "/images/fairlight_cmi_lightpen.jpg",
    "samp_80": "/images/sp1200_sampler.jpg",
    "samp_90": "/images/studio-gear-akai-s1000.jpg",
    "samp_00": "/images/kontakt_interface.png",
    
    "synth_60": "/images/buchla_100.jpg",
    "synth_70": "/images/minimoog_model_d.png",
    "synth_80": "/images/yamaha_dx7.png",
    "synth_90": "/images/nord_lead.png",
    "synth_00": "/images/massive_synth.png",
    
    "rev_50": "/images/echo_chamber_diagram.png",
    "rev_60": "/images/plate reverb.jpg",
    "rev_70": "/images/lexicon_224.png",
    "rev_80": "/images/lexicon_480l.png",
    "rev_90": "/images/bricasti_m7.png",
    "rev_00": "/images/altiverb_interface.png",
    
    "del_50": "/images/studer_j37.jpg",
    "del_60": "/images/watkins_copicat_delay.jpg",
    "del_70": "/images/memory_man_pedal.jpg",
    "del_80": "/images/tc_2290.jpg",
    "del_90": "/images/echoboy_plugin.png",
    
    "gui_50": "/images/fender_broadcaster.jpg",
    "gui_60": "/images/rickenbacker_360_12.jpg",
    "gui_70": "/images/gibson_les_paul.png",
    "gui_80": "/images/ibanez_jem.png",
    "gui_90": "/images/ibanez_universe_7_string.png"
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for question in item.get('questions', []):
                    if question.get('type') == 'timeline':
                        for q_item in question.get('items', []):
                            item_id = q_item.get('id')
                            if item_id in img_map:
                                q_item['img'] = img_map[item_id]
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Images added to Timeline Quiz in course_data.json successfully.")

