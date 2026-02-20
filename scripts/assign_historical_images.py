import json

COURSE_DATA_PATH = 'src/data/course_data.json'

def get_image_for_text(text):
    text = text.lower()
    
    # Authentic Wikimedia Commons URLs (Using Special:FilePath for robust linking)
    img_ampex = "https://commons.wikimedia.org/wiki/Special:FilePath/Ampex_ATR-100.jpg?width=600"
    img_mellotron = "https://commons.wikimedia.org/wiki/Special:FilePath/Mellotron.jpg?width=600"
    img_fuzz = "https://commons.wikimedia.org/wiki/Special:FilePath/Fuzzfacewiki1.jpg?width=600"
    img_leslie = "https://commons.wikimedia.org/wiki/Special:FilePath/Leslie_Speaker.jpg?width=600"
    img_minimoog = "https://commons.wikimedia.org/wiki/Special:FilePath/Minimoog.JPG?width=600"
    img_vocoder = "https://commons.wikimedia.org/wiki/Special:FilePath/Kraftwerk_Vocoder_custom_made_in_early1970s.JPG?width=600"
    img_tr808 = "https://commons.wikimedia.org/wiki/Special:FilePath/TR-808_-_MIM,_Phoenix_(2019-08-30_14.59.26_by_Bryan_Pocius)_(cropped).jpg?width=600"
    img_tr909 = "https://commons.wikimedia.org/wiki/Special:FilePath/Roland_TR-909_(large).png?width=600"
    img_dx7 = "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_DX7_synthesizer_-_combined_image_with_diagonal_and_top_views.jpg?width=600"
    img_sp1200 = "https://commons.wikimedia.org/wiki/Special:FilePath/E-mu_SP-1200_(111607sp1200).jpg?width=600"
    img_fairlight = "https://commons.wikimedia.org/wiki/Special:FilePath/Fairlight_green_screen.jpg?width=600"
    img_tb303 = "https://commons.wikimedia.org/wiki/Special:FilePath/Roland_TB-303_Panel.jpg?width=600"
    img_technics = "https://commons.wikimedia.org/wiki/Special:FilePath/Technics_SL-1200MK2-2.jpg?width=600"
    img_dat = "https://commons.wikimedia.org/wiki/Special:FilePath/Digital_Audio_Tape_(logo).svg?width=600"
    img_korgm1 = "https://commons.wikimedia.org/wiki/Special:FilePath/Korg_M1.png?width=600"
    img_zip = "https://commons.wikimedia.org/wiki/Special:FilePath/Iomega_Zip_100_drive_with_a_disk.jpg?width=600"
    img_daw = "https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Francken_in_his_studio.jpg?width=600"
    img_vst = "https://commons.wikimedia.org/wiki/Special:FilePath/VST_Logo.png?width=600"
    img_loudness = "https://commons.wikimedia.org/wiki/Special:FilePath/ABBA_-_Super_Trouper_Title_Track_Remaster_Waveform_Comparisons_(Small_Version).png?width=600"
    img_compressor = "https://commons.wikimedia.org/wiki/Special:FilePath/Comp._rack_(Supernatural).jpg?width=600"
    img_pitch = "https://commons.wikimedia.org/wiki/Special:FilePath/Autotune.png?width=600"
    img_console = "https://commons.wikimedia.org/wiki/Special:FilePath/Solid_State_Logic_SL_4000_G_Series.jpg?width=600"
    
    # 1. 1960s
    if 'tape limit' in text or 'bounc' in text or 'edit' in text or 'splice' in text: return img_ampex
    if 'mellotron' in text or 'electro-mechanical keyboard' in text or 'tape strip' in text: return img_mellotron
    if 'fuzz' in text or 'germanium' in text or 'distortion' in text: return img_fuzz
    if 'rotary' in text or 'doppler' in text or 'leslie' in text: return img_leslie
    
    # 2. 1970s
    if 'vocoder' in text: return img_vocoder
    if 'polyphon' in text or 'subtractive' in text or 'minimoog' in text: return img_minimoog
    if 'console' in text or 'fader' in text or 'vca' in text or 'eq' in text: return img_console
    
    # 3. 1980s
    if 'analog drum' in text or 'swing' in text or 'sub-bass' in text or '808' in text: return img_tr808
    if 'hybrid' in text or 'metallic punch' in text or '909' in text: return img_tr909
    if 'fm synth' in text or 'dx7' in text: return img_dx7
    if '12-bit' in text or 'sp-1200' in text: return img_sp1200
    if 'light pen' in text or 'fairlight' in text: return img_fairlight
    if 'acid' in text or '303' in text or 'liquid sound' in text: return img_tb303
    if 'direct drive' in text or 'turntable' in text or 'scratch' in text or 'club mastering' in text: return img_technics
    
    # 4. 1990s
    if 'dat tape' in text or 'offline storage' in text or 'mixdown format' in text: return img_dat
    if 'korg m1' in text or 'rompler' in text: return img_korgm1
    if 'zip drive' in text or 'floppy' in text: return img_zip
    if 'time-stretching' in text or 'amen break' in text: return img_sp1200 # closest visual for sampling
    if 'tracker' in text or 'hexadecimal' in text: return img_fairlight # closest visual for old computer
    
    # 5. 2000s
    if 'in-the-box' in text or 'non-linear' in text or 'session view' in text: return img_daw
    if 'vst' in text or 'software' in text or 'soft-synth' in text: return img_vst
    if 'loudness war' in text or 'mp3' in text: return img_loudness
    if 'sidechain' in text or 'pump' in text or 'gate' in text: return img_compressor
    if 'pitch' in text or 'autotune' in text or 'cher' in text: return img_pitch
    if 'digital vinyl' in text: return img_technics
    
    return img_console # Generic fallback

def assign_images():
    with open(COURSE_DATA_PATH, 'r') as f:
        data = json.load(f)

    section_title = "Historical Music Tech Context"
    
    for section in data.get('sections', []):
        if section.get('title') == section_title:
            for quiz in section.get('items', []):
                for q in quiz.get('questions', []):
                    text_blob = q.get('content', '') + " " + q.get('expert_explanation', '') + " " + q.get('title', '')
                    img_path = get_image_for_text(text_blob)
                    # Use the correct key for QuizPlayer.jsx internet URLs
                    # We previously used 'expert_image', but we need 'explanation_image': {'src': ... }
                    q['explanation_image'] = {
                        "src": img_path,
                        "alt": f"{q.get('title', 'Historical Image')} Diagram"
                    }
                    if 'expert_image' in q:
                        del q['expert_image']
                    print(f"Assigned {img_path} to {q['title']}")
            break
            
    with open(COURSE_DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Successfully added external online images to {COURSE_DATA_PATH}")

if __name__ == "__main__":
    assign_images()
