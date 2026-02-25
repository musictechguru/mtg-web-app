import json
import os
import glob
import shutil

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Find generated images
images_dir = 'public/images/'
base_brain_dir = os.path.expanduser('~/.gemini/antigravity/brain/e734b6b9-b3d2-4d80-bbfd-1441b19b5f3e/')

slapback_files = glob.glob(base_brain_dir + 'hq_del_slapback_tape*.png')
bbd_files = glob.glob(base_brain_dir + 'hq_del_bbd_pedal*.png')
rack_files = glob.glob(base_brain_dir + 'hq_del_digital_rack*.png')
plugin_files = glob.glob(base_brain_dir + 'hq_del_software_plugin*.png')

# Copy to public folder if they exist
def get_and_copy(files):
    if files:
        f = files[0]
        name = os.path.basename(f)
        dest = os.path.join(images_dir, name)
        shutil.copy(f, dest)
        return "/images/" + name
    return None

slapback_img = get_and_copy(slapback_files)
bbd_img = get_and_copy(bbd_files)
rack_img = get_and_copy(rack_files)
plugin_img = get_and_copy(plugin_files)

exp_data = {
    "del_50": {
        "text": "The slapback sound revolutionized early rockabilly vocals.",
        "html": "<p><strong>Expert Explanation:</strong> In the 1950s, engineers routed audio into one tape machine, then fed the playback head's signal back into the mix. Because of the physical distance between the record and playback heads, a distinct, single 'slapback' echo occurred. This signature sound defined the vocals of Elvis Presley and the guitars of Scotty Moore.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"That quick echo gave vocals a larger-than-life presence on small radios.\"<br/><strong>- Rockabilly Producer</strong></blockquote>",
        "img": slapback_img
    },
    "del_60": {
        "text": "Dedicated tape echo units brought studio sound to the live stage.",
        "html": "<p><strong>Expert Explanation:</strong> The 1960s saw the creation of portable, dedicated tape echoes like the Watkins Copicat or Roland Space Echo. These units used continuous loops of magnetic tape running across multiple playback heads, allowing musicians to select different rhythmic combinations and adjust feedback for swirling, self-oscillating washes of sound.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The magic is in the imperfection; the wow and flutter of the tape loop.\"<br/><strong>- Dub Reggae Pioneer</strong></blockquote>",
        "img": "/images/watkins_copicat_delay.jpg" # Keep existing image
    },
    "del_70": {
        "text": "Analog bucket-brigade pedals made delay dark, warm, and highly portable.",
        "html": "<p><strong>Expert Explanation:</strong> In the 1970s, Bucket Brigade Device (BBD) chips arrived. These analog chips passed the audio signal along a chain of capacitors (like a bucket brigade passing water). Each 'pass' degraded the signal slightly, resulting in a distinctly warm, dark, and murky delay tone beloved by guitarists like The Edge.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It repeats, but it decays into this beautiful, lo-fi wash beneath your playing.\"<br/><strong>- 70s Guitar Hero</strong></blockquote>",
        "img": bbd_img
    },
    "del_80": {
        "text": "Digital rack delays offered pristine, mathematically perfect repeats.",
        "html": "<p><strong>Expert Explanation:</strong> The 1980s shifted to digital. High-end rack units like the TC 2290 converted the analog signal into binary data, stored it in RAM, and played it back with crystal clear, uncolored accuracy. This allowed for precise BPM matching, endless pristine repeats, and the glittering 'digital delay' sound of 80s pop.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Every repeat sounds exactly like the first note; absolute clarity.\"<br/><strong>- 80s Session Player</strong></blockquote>",
        "img": rack_img
    },
    "del_90": {
        "text": "Software delays put infinite routing and modeling capabilities inside the DAW.",
        "html": "<p><strong>Expert Explanation:</strong> AsDAWs took over in the 1990s and 2000s, delay moved 'in the box'. Software plugins not only offered unlimited digital delays but began modeling the charming imperfections of vintage tape and analog BBD circuits, giving producers every flavor of echo imaginable on a single screen without maintenance issues.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The only limit to the echo now is your CPU power.\"<br/><strong>- Modern Mix Engineer</strong></blockquote>",
        "img": plugin_img
    }
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        for q_item in q.get('items', []):
                            i_id = q_item.get('id')
                            if i_id in exp_data:
                                img_src = exp_data[i_id]['img']
                                
                                # Update image path if a new one was generated
                                if img_src:
                                    q_item['img'] = img_src
                                    img_tag = f'<img src="{img_src}" alt="{q_item["text"]}" style="max-width:200px; display:block; margin: 0 auto 15px auto; border-radius:8px;" />'
                                    q_item['explanation'] = img_tag + exp_data[i_id]['html']
                                else:
                                    q_item['explanation'] = exp_data[i_id]['html']
                                   
                                q_item['expert_quote'] = { "text": exp_data[i_id]['text'] }
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Q7 HQ images mapped and explanations added.")
