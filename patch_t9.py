import json
import os

def fix_topic9():
    file_path = 'src/data/course_data.json'
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Helper function to find a quiz by ID
    def find_quiz(obj, target_id):
        if isinstance(obj, dict):
            if obj.get('id') == target_id:
                return obj
            for v in obj.values():
                res = find_quiz(v, target_id)
                if res: return res
        elif isinstance(obj, list):
            for item in obj:
                res = find_quiz(item, target_id)
                if res: return res
        return None

    t9 = find_quiz(data, 'quiz-topic-9_p1')
    if not t9:
        print("Topic 9 not found!")
        return

    # Fix Q2
    q2 = t9['questions'][1]
    q2['expert_explanation'] = "At 20 degrees Celsius, sound travels at roughly 343 meters per second (1125 feet per second). This speed changes depending on air temperature and humidity."
    q2['expert_quote']['text'] = "Knowing the precise speed of sound is essential for calculating delay times and understanding acoustic phase reflections in a room."
    q2['explanation'] = '<img src="/images/gen/t9_q2_speed_of_sound_hq_123.png" alt="Acoustics Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> At 20 degrees Celsius, sound travels at roughly 343 meters per second (1125 feet per second). This speed changes depending on air temperature and humidity.</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"Knowing the precise speed of sound is essential for calculating delay times and understanding acoustic phase reflections in a room."<br/><strong>- Physics Law</strong></blockquote>'

    # Fix Q3
    q3 = t9['questions'][2]
    q3['expert_explanation'] = "Hertz (Hz) specifically measures frequency, which corresponds to the musical pitch of a sound. One Hertz equals one complete wave cycle per second."
    q3['expert_quote']['text'] = "Frequency determines the fundamental pitch of a note. A standard A4 tuning fork vibrates exactly 440 times every second (440Hz)."
    q3['explanation'] = '<img src="/images/gen/t9_q3_hertz_frequency_hq_123.png" alt="Acoustics Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> Hertz (Hz) specifically measures frequency, which corresponds to the musical pitch of a sound. One Hertz equals one complete wave cycle per second.</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"Frequency determines the fundamental pitch of a note. A standard A4 tuning fork vibrates exactly 440 times every second (440Hz)."<br/><strong>- Audio Engineer</strong></blockquote>'
    
    # Fix Q4
    q4 = t9['questions'][3]
    q4['expert_explanation'] = "Decibels (dB) measure sound pressure levels (SPL) or volume. It is a logarithmic scale, meaning a small numerical increase represents a huge multiplication in actual acoustic energy."
    q4['expert_quote']['text'] = "A 10dB increase is generally perceived by human ears as a perceived doubling of volume. Protect your hearing."
    q4['explanation'] = '<img src="/images/gen/t9_q4_decibels_volume_hq_123.png" alt="Acoustics Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> Decibels (dB) measure sound pressure levels (SPL) or volume. It is a logarithmic scale, meaning a small numerical increase represents a huge multiplication in actual acoustic energy.</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"A 10dB increase is generally perceived by human ears as a perceived doubling of volume. Protect your hearing."<br/><strong>- Acoustic Science</strong></blockquote>'

    # Fix Q20
    q20 = t9['questions'][19]
    q20['answers'][3] = {
        "text": "To strictly couple the speakers tightly to the desk to maximize raw bass resonance transfer",
        "is_true": False
    }

    # Remove the .bak if successful write
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully patched Q2, Q3, Q4, and Q20.")

if __name__ == '__main__':
    fix_topic9()
