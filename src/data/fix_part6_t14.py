
import json

updates = {
    "v1_p6_t14_b_1": [
        { "text": "Managing signal levels at every point in the audio chain to maximize quality and minimize noise/distortion", "is_true": "yes" },
        { "text": "Setting up the physical stage layout for a live band performance, including microphone placement and monitors", "is_true": "no" },
        { "text": "Maximizing the volume of every single track to ensure the loudest possible final mixdown", "is_true": "no" },
        { "text": "Adjusting the equalization of the bass frequencies to ensure a heavy low-end response", "is_true": "no" }
    ],
    "v1_p6_t14_b_2": [
        { "text": "Digital Clipping (Distortion) that cannot be fixed later", "is_true": "yes" },
        { "text": "The computer CPU overloads causing the software to crash instantly", "is_true": "no" },
        { "text": "The audio signal becomes clearer and more present in the mix", "is_true": "no" },
        { "text": "Nothing happens immediately, but the file size increases significantly", "is_true": "no" }
    ],
    "v1_p6_t14_b_3": [
        { "text": "The signal competes with the Noise Floor (hiss), resulting in a noisy recording when turned up later", "is_true": "yes" },
        { "text": "The signal becomes clearer because there is less distortion interfering with the waveform", "is_true": "no" },
        { "text": "The recording loses low-frequency content (bass) due to lack of energy driving the converter", "is_true": "no" },
        { "text": "Nothing negative happens; modern digital recording has infinite resolution so low levels are fine", "is_true": "no" }
    ],
    "v1_p6_t14_b_4": [
        { "text": "The output level should equal the input level, so bypassing the plugin doesn't result in a volume jump", "is_true": "yes" },
        { "text": "The output level should be significantly louder to ensure the effect is noticeable in the mix", "is_true": "no" },
        { "text": "The plugin should have no effect on the sound character, only changing the volume transparency", "is_true": "no" },
        { "text": "To add harmonic saturation and distortion to the signal without changing the dynamic range", "is_true": "no" }
    ],
    "v1_p6_t14_b_5": [
        { "text": "Yellow meters (approx -18dBFS to -12dBFS average)", "is_true": "yes" },
        { "text": "Red meters (0dBFS) to maximize the resolution of the converter bits", "is_true": "no" },
        { "text": "Blue meters (-60dBFS) to ensure zero chance of clipping relative to the noise floor", "is_true": "no" },
        { "text": "Maximum volume possible without hearing audible distortion in the headphones", "is_true": "no" }
    ],
    "v1_p6_t14_b_6": [
        { "text": "Turn down all the individual channel faders", "is_true": "yes" },
        { "text": "Turn down the Master Fader until the red light stops flashing", "is_true": "no" },
        { "text": "Insert a Limiter plugin on the Master Bus to catch the peaks", "is_true": "no" },
        { "text": "Turn up the monitor speakers so you can hear the mix better at lower levels", "is_true": "no" }
    ],
    "v1_p6_t14_b_7": [
        { "text": "They are designed to react to a specific 'Sweet Spot' (usually -18dBFS). Driving them too hot causes unwanted muddy distortion", "is_true": "yes" },
        { "text": "Digital plugins are linear, so input level does not change the sound character, only the volume", "is_true": "no" },
        { "text": "Louder input levels always result in a higher quality sound because the plugin processes more bits", "is_true": "no" },
        { "text": "Driving them too hard can cause the plugin software to crash or stop working entirely", "is_true": "no" }
    ],
    "v1_p6_t14_b_8": [
        { "text": "To see the actual signal level on the track, regardless of where the fader is set", "is_true": "yes" },
        { "text": "To see the final volume level that is being sent to the Master Bus after mixing", "is_true": "no" },
        { "text": "It consumes less CPU power than Post-Fader metering because it bypasses the fader math", "is_true": "no" },
        { "text": "It provides a more aesthetically pleasing visualization of the waveform energy", "is_true": "no" }
    ],
    "v1_p6_t14_b_9": [
        { "text": "The gap (in dB) between your average signal level and the point where clipping occurs", "is_true": "yes" },
        { "text": "The physical acoustic space remaining in the recording room above the microphones", "is_true": "no" },
        { "text": "The level of background noise (hiss) present at the bottom of the dynamic range", "is_true": "no" },
        { "text": "The maximum volume the speakers can produce before blowing out", "is_true": "no" }
    ],
    "v1_p6_t14_b_10": [
        { "text": "Input Gain / Trim knob (Top of channel)", "is_true": "yes" },
        { "text": "Output Fader (Bottom of channel) which controls monitor level", "is_true": "no" },
        { "text": "Pan knob which positions the signal in the stereo field", "is_true": "no" },
        { "text": "Aux Send knob which routes signal to effects like reverb", "is_true": "no" }
    ],
    "v1_p6_t14_i_1": [
        { "text": "-18dBFS (sometimes -20dBFS)", "is_true": "yes" },
        { "text": "0dBFS (Full Scale meaning max volume)", "is_true": "no" },
        { "text": "-6dBFS (Half amplitude)", "is_true": "no" },
        { "text": "-60dBFS (Noise floor)", "is_true": "no" }
    ],
    "v1_p6_t14_i_2": [
        { "text": "80dB", "is_true": "yes" },
        { "text": "120dB (Total system range)", "is_true": "no" },
        { "text": "-80dB (The noise floor level)", "is_true": "no" },
        { "text": "20dB (The signal level)", "is_true": "no" }
    ],
    "v1_p6_t14_i_3": [
        { "text": "To level out a performance BEFORE it hits the compressor plugin (Pre-FX gain staging)", "is_true": "yes" },
        { "text": "To create a fade out at the end of the song for a smooth ending", "is_true": "no" },
        { "text": "At the very end of the mix process to make final volume adjustments typically", "is_true": "no" },
        { "text": "Never, you should always use fader automation for all volume changes", "is_true": "no" }
    ],
    "v1_p6_t14_i_4": [
        { "text": "To calibrate meters and ensure all plugins/outboard gear are operating at Unity Gain", "is_true": "yes" },
        { "text": "To test the subwoofer frequency response in the listening environment", "is_true": "no" },
        { "text": "To tune guitars and other instruments to a specific reference pitch", "is_true": "no" },
        { "text": "Because it sounds pleasant and helps with concentration during mixing", "is_true": "no" }
    ],
    "v1_p6_t14_i_5": [
        { "text": "Yes, by using Clip Gain to turn it down, assuming the clipping didn't happen at the mic/preamp stage", "is_true": "yes" },
        { "text": "No, once a digital file has clipped 0dBFS, the data is lost forever regardless of bit depth", "is_true": "no" },
        { "text": "Yes, but only by using a specialized Restoration EQ to reconstruct the waveform", "is_true": "no" },
        { "text": "No, 32-bit float actually makes clipping distortion harsher and harder to fix", "is_true": "no" }
    ],
    "v1_p6_t14_i_6": [
        { "text": "By starting the mix with faders low (e.g. Kick/Snare at -10dB), leaving room for other instruments", "is_true": "yes" },
        { "text": "By placing a Limiter on the Master Bus immediately before starting the mix", "is_true": "no" },
        { "text": "By turning the monitor speakers down very quiet so you don't perceive the loudness", "is_true": "no" },
        { "text": "By strictly limiting the arrangement to only 4 simultaneous tracks", "is_true": "no" }
    ],
    "v1_p6_t14_i_7": [
        { "text": "Cutting frequencies reclaims headroom, whereas boosting eats headroom and risks clipping", "is_true": "yes" },
        { "text": "Boosting frequencies adds digital noise to the signal path, degrading quality", "is_true": "no" },
        { "text": "Cutting sounds more musical because it changes the phase relationship less", "is_true": "no" },
        { "text": "There is no difference; additive and subtractive EQ are mathematically identical", "is_true": "no" }
    ],
    "v1_p6_t14_i_8": [
        { "text": "To restore the volume lost due to compression (gain reduction) back to the original input level", "is_true": "yes" },
        { "text": "To make the signal significantly louder than it was before compression", "is_true": "no" },
        { "text": "To add harmonic distortion and saturation to the compressed signal", "is_true": "no" },
        { "text": "To increase the compression ratio applied to the signal peaks", "is_true": "no" }
    ],
    "v1_p6_t14_i_9": [
        { "text": "To keep the Fader free for overall balancing, while the Trim handles specific section level changes", "is_true": "yes" },
        { "text": "Because Trim plugins have a higher internal bit-depth resolution than channel faders", "is_true": "no" },
        { "text": "Moving faders during playback causes significant latency issues in the DAW", "is_true": "no" },
        { "text": "Writing automation to a Trim plugin is strictly faster to draw with a mouse", "is_true": "no" }
    ],
    "v1_p6_t14_i_10": [
        { "text": "Summing increases level. 10 channels playing at -6dB will sum to well over 0dB", "is_true": "yes" },
        { "text": "The Master Fader has a built-in gain boost that cannot be bypassed", "is_true": "no" },
        { "text": "Plugins on the individual channels add hidden gain even when set to neutral", "is_true": "no" },
        { "text": "It is a software bug present in most DAWs concerning bus routing", "is_true": "no" }
    ],
    "v1_p6_t14_a_1": [
        { "text": "The difference (gap) between the Peak level and the RMS (Average) level of a signal", "is_true": "yes" },
        { "text": "The visual shape of the waveform as it appears on an oscilloscope", "is_true": "no" },
        { "text": "A measure of the harmonic saturation added by tube equipment", "is_true": "no" },
        { "text": "The overall perceived loudness of the track measured in LUFS", "is_true": "no" }
    ],
    "v1_p6_t14_a_2": [
        { "text": "Dither must be the very last process before export. The Fader changes bit-depth, so dither must happen AFTER the fader", "is_true": "yes" },
        { "text": "Placing it post-fader adds a specific analog warmth that pre-fader dither lacks", "is_true": "no" },
        { "text": "It acts as a final safety limiter to prevent the fader from causing clipping", "is_true": "no" },
        { "text": "It doesn't matter; dither works effectively regardless of where it is in the chain", "is_true": "no" }
    ],
    "v1_p6_t14_a_3": [
        { "text": "To account for 'Intersample Peaks' that occur when the digital signal is converted back to analog waveforms", "is_true": "yes" },
        { "text": "Streaming services reject any file that peaks higher than -1.0dBTP automatically", "is_true": "no" },
        { "text": "It saves disk space by reducing the complexity of the waveform data", "is_true": "no" },
        { "text": "It ensures the file is compatible with older 16-bit CD players", "is_true": "no" }
    ],
    "v1_p6_t14_a_4": [
        { "text": "It creates a vastly lower noise floor (-144dB vs -96dB), allowing for safer, lower recording levels without hiss risk", "is_true": "yes" },
        { "text": "It offers significantly more headroom above 0dB before clipping occurs", "is_true": "no" },
        { "text": "It naturally makes the recording sound louder and more compressed", "is_true": "no" },
        { "text": "It captures higher frequencies (treble) beyond the human hearing range", "is_true": "no" }
    ],
    "v1_p6_t14_a_5": [
        { "text": "Crucially. Higher input drive pushes the plugin past its threshold, creating more grit. Lower input cleans it up", "is_true": "yes" },
        { "text": "Input level only changes the output volume, not the texture of the saturation", "is_true": "no" },
        { "text": "Higher input levels cause the plugin to shift the pitch of the audio signal", "is_true": "no" },
        { "text": "It has no effect; saturation is a fixed process independent of input level", "is_true": "no" }
    ],
    "v1_p6_t14_a_6": [
        { "text": "The Fletcher-Munson effect: we perceive more bass and treble at higher volumes, making it sound fuller", "is_true": "yes" },
        { "text": "Turning it up allows us to hear micro-details that were previously inaudible", "is_true": "no" },
        { "text": "Louder playback triggers the natural compression of the human ear drum", "is_true": "no" },
        { "text": "It doesn't sound better; it is a psychological bias called the 'Loudness War'", "is_true": "no" }
    ],
    "v1_p6_t14_a_7": [
        { "text": "Because streaming services (Spotify/Apple) turn down loud tracks to approx -14 LUFS anyway", "is_true": "yes" },
        { "text": "It is the legal standard required for copyright registration of music", "is_true": "no" },
        { "text": "It matches the older CD standard allowing for easier physical distribution", "is_true": "no" },
        { "text": "It reduces the file size significantly for faster streaming buffering", "is_true": "no" }
    ],
    "v1_p6_t14_a_8": [
        { "text": "Around -80dBu to -90dBu", "is_true": "yes" },
        { "text": "-144dBu (Digital Silence)", "is_true": "no" },
        { "text": "-20dBu (Line Level)", "is_true": "no" },
        { "text": "0dBu (Unity)", "is_true": "no" }
    ],
    "v1_p6_t14_a_9": [
        { "text": "Only at the D/A Converter (Output) or when saving to a fixed-point file (24/16-bit)", "is_true": "yes" },
        { "text": "Immediately when the meter hits +0dBFS inside the DAW mixer", "is_true": "no" },
        { "text": "At +6dBFS, which is the hard ceiling for floating point math", "is_true": "no" },
        { "text": "Never, under any circumstances, even when exported to WAV", "is_true": "no" }
    ],
    "v1_p6_t14_a_10": [
        { "text": "Analog gear reacts to the continuous heat/energy (RMS) rather than split-second transients", "is_true": "yes" },
        { "text": "Peak metering is notoriously inaccurate in digital plugins", "is_true": "no" },
        { "text": "RMS levels are always louder than Peak levels so they are safer", "is_true": "no" },
        { "text": "It isn't; Peak level is the only metric that matters for distortion", "is_true": "no" }
    ],
    "v1_p6_t14_m_1": [
        { "text": "If using a 0dB Pan Law, panning center boosts level by +3dB, potentially clipping a bus that was safe when panned", "is_true": "yes" },
        { "text": "Panning center cuts the level by -3dB to compensate for the summing", "is_true": "no" },
        { "text": "It introduces low-level noise when panning due to the potentiometer quantization", "is_true": "no" },
        { "text": "It causes phase cancellation when signals are panned hard Left or Right", "is_true": "no" }
    ],
    "v1_p6_t14_m_2": [
        { "text": "It shifts the quantization noise energy into ultra-high frequencies (above 15kHz) where the human ear is less sensitive", "is_true": "yes" },
        { "text": "It completely removes the quantization noise from the signal path", "is_true": "no" },
        { "text": "It boosts the bass frequencies to mask the hiss in the high end", "is_true": "no" },
        { "text": "It applies compression to the noise floor to keep it steady", "is_true": "no" }
    ],
    "v1_p6_t14_m_3": [
        { "text": "Because noise introduced at stage 1 is amplified by stage 2, 3, and 4. Noise introduced at stage 4 is not amplified further", "is_true": "yes" },
        { "text": "Because the first stage is usually analog and therefore inherently noisier", "is_true": "no" },
        { "text": "Because the last stage is digital and has a perfectly black background", "is_true": "no" },
        { "text": "It is not critical; all stages contribute equally to the noise floor", "is_true": "no" }
    ],
    "v1_p6_t14_m_4": [
        { "text": "Over 1000 dB (Essentially infinite for audio purposes)", "is_true": "yes" },
        { "text": "144 dB (Same as 24-bit fixed point)", "is_true": "no" },
        { "text": "96 dB (CD Quality)", "is_true": "no" },
        { "text": "24 dB (The dynamic range of tape)", "is_true": "no" }
    ],
    "v1_p6_t14_m_5": [
        { "text": "High gain generates upper harmonics. If these exceed Nyquist, they fold back. Keeping gain moderate reduces harmonic generation range", "is_true": "yes" },
        { "text": "Lower gain increases the sample rate of the plugin automatically", "is_true": "no" },
        { "text": "Gain adjustments actively filter out upper harmonics before they occur", "is_true": "no" },
        { "text": "By adding low-frequency content to mask the aliasing artifacts", "is_true": "no" }
    ],
    "v1_p6_t14_m_6": [
        { "text": "1.228 Volts RMS", "is_true": "yes" },
        { "text": "0.775 Volts RMS (The standard for 0dBu)", "is_true": "no" },
        { "text": "1.0 Volts RMS (The standard for 0dBV)", "is_true": "no" },
        { "text": "4.0 Volts RMS (A direct translation of the dB value)", "is_true": "no" }
    ],
    "v1_p6_t14_m_7": [
        { "text": "It is truncated to zero (Digital Black) or toggles randomly, creating square-wave 'Quantization Distortion'", "is_true": "yes" },
        { "text": "It fades out smoothly into the analog noise floor of the system", "is_true": "no" },
        { "text": "It becomes an analog signal as it passes below the digital threshold", "is_true": "no" },
        { "text": "The bass frequencies increase due to the loss of high-frequency definition", "is_true": "no" }
    ],
    "v1_p6_t14_m_8": [
        { "text": "It shifts the waveform off-center, reducing the available headroom on one side (e.g. clips at +2dB positive but has room on negative)", "is_true": "yes" },
        { "text": "It adds a constant low-level broadband noise to the signal", "is_true": "no" },
        { "text": "It significantly lowers the overall volume of the track", "is_true": "no" },
        { "text": "It adds a noticeable reverb tail to the end of sounds", "is_true": "no" }
    ],
    "v1_p6_t14_m_9": [
        { "text": "To saturate the channel transformers for color, while keeping the final output at a safe A/D conversion level", "is_true": "yes" },
        { "text": "To fix inherent noise issues in the summing bus circuitry", "is_true": "no" },
        { "text": "To clear the digital buffers in the audio interface attached to the output", "is_true": "no" },
        { "text": "To save electrical power by running the output stage cooler", "is_true": "no" }
    ],
    "v1_p6_t14_m_10": [
        { "text": "3 seconds (sliding window)", "is_true": "yes" },
        { "text": "400ms (Momentary)", "is_true": "no" },
        { "text": "Infinite (Integrated over the whole song)", "is_true": "no" },
        { "text": "Instant (Sample Peak)", "is_true": "no" }
    ]
}

import json
filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(filepath, 'r') as f:
    data = json.load(f)

# Update Logic
for vol in data['volumes']:
    if vol['id'] == 'vol1':
        for part in vol['parts']:
            if part['id'] == 'p6':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                print(f"Updated {q['id']}")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
