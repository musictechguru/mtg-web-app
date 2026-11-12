import React, { useState, useRef, useEffect } from 'react';

// Comprehensive Pearson Edexcel A-Level Music Technology (9MT0) Glossary
const GLOSSARY_TERMS = {
    // Microphones & Cables
    'proximity effect': {
        term: 'Proximity Effect',
        category: 'Microphones',
        def: 'An increase in low frequencies (bass boost) that occurs when a directional (cardioid/figure-8) microphone is moved very close to the sound source.'
    },
    'phantom power': {
        term: 'Phantom Power (+48V)',
        category: 'Hardware',
        def: 'A +48V direct current delivered through balanced XLR cables to power active condenser microphones and active DI boxes.'
    },
    '+48v': {
        term: 'Phantom Power (+48V)',
        category: 'Hardware',
        def: 'Standard +48V DC power sent down balanced XLR leads to power condenser microphone capsules and active DI electronics.'
    },
    'cardioid': {
        term: 'Cardioid Pattern',
        category: 'Microphones',
        def: 'A heart-shaped directional pickup pattern sensitive to sound from the front while rejecting sound from 180° directly behind.'
    },
    'figure-8': {
        term: 'Figure-8 (Bidirectional)',
        category: 'Microphones',
        def: 'A pickup pattern equally sensitive to the front and rear, but completely deaf to sounds arriving from the sides (90° and 270°).'
    },
    'omnidirectional': {
        term: 'Omnidirectional Pattern',
        category: 'Microphones',
        def: 'Captures sound equally from all directions (360°) with no proximity effect and minimal handling noise.'
    },
    'di box': {
        term: 'DI Box (Direct Injection)',
        category: 'Signal Flow',
        def: 'Converts high-impedance (high-Z) unbalanced instrument signals (guitars, keyboards) into low-impedance (low-Z) balanced mic signals.'
    },
    'balanced cable': {
        term: 'Balanced Cable',
        category: 'Signal Flow',
        def: 'Uses three conductors (hot, cold, ground) and polarity inversion to cancel out electromagnetic interference and cable hum.'
    },
    'transducer': {
        term: 'Acoustic Transducer',
        category: 'Acoustics',
        def: 'Any device that converts energy from one form to another (e.g. microphones convert acoustic sound waves into electrical voltages; speakers do the reverse).'
    },
    'comb filtering': {
        term: 'Comb Filtering',
        category: 'Acoustics',
        def: 'A phase-cancellation phenomenon where combining a direct sound with its delayed reflection causes a series of hollow, comb-shaped frequency notches.'
    },
    'phase cancellation': {
        term: 'Phase Cancellation',
        category: 'Acoustics',
        def: 'When two matching sound waves with opposing polarities (out of phase) cancel each other out, causing loss of volume or bass hollows.'
    },
    'polarity': {
        term: 'Polarity (Ø)',
        category: 'Signal Flow',
        def: 'The positive or negative orientation of an electrical audio signal; flipping polarity inverts the waveform 180°.'
    },

    // Dynamics
    'threshold': {
        term: 'Threshold',
        category: 'Dynamics',
        def: 'The decibel level that an audio signal must cross before a processor (compressor, limiter, gate) activates.'
    },
    'ratio': {
        term: 'Ratio',
        category: 'Dynamics',
        def: 'Determines the proportion of gain reduction applied to audio exceeding the threshold (e.g. 4:1 reduces every 4 dB excess down to 1 dB).'
    },
    'make-up gain': {
        term: 'Make-Up Gain',
        category: 'Dynamics',
        def: 'Gain applied at the output of a compressor to restore overall loudness lost during peak gain reduction.'
    },
    'makeup gain': {
        term: 'Make-Up Gain',
        category: 'Dynamics',
        def: 'Gain applied at the output of a compressor to restore overall loudness lost during peak gain reduction.'
    },
    'dynamic range': {
        term: 'Dynamic Range',
        category: 'Dynamics',
        def: 'The difference in decibels between the quietest noise floor and the loudest undistorted peak of an audio signal.'
    },
    'sidechain compression': {
        term: 'Sidechain Compression',
        category: 'Dynamics',
        def: 'Using the volume of an external audio track (such as a kick drum) to trigger compression on another track (such as bass or synths).'
    },
    'sidechain': {
        term: 'Sidechain',
        category: 'Dynamics',
        def: 'Routing an alternative control signal to the detector circuit of a dynamic processor (e.g. kick ducking bass).'
    },
    'parallel compression': {
        term: 'Parallel Compression (New York)',
        category: 'Dynamics',
        def: 'Blending an uncompressed signal with an aggressively compressed duplicate to preserve natural transients while boosting sustain and density.'
    },
    'noise gate': {
        term: 'Noise Gate',
        category: 'Dynamics',
        def: 'A dynamic processor that silences or attenuates audio that falls below a set threshold, silencing background bleed between hits.'
    },
    'transient': {
        term: 'Transient',
        category: 'Dynamics',
        def: 'The brief, high-energy attack burst at the very start of a sound (such as the initial strike of a drumstick or guitar pick).'
    },
    'transients': {
        term: 'Transients',
        category: 'Dynamics',
        def: 'The brief, high-energy attack bursts at the very start of a sound (such as drum strikes or acoustic strums).'
    },
    'de-esser': {
        term: 'De-Esser',
        category: 'Dynamics',
        def: 'A frequency-conscious compressor tuned to attenuate harsh sibilance ("s", "t", "ch" sounds) between 5 kHz and 8 kHz.'
    },
    'sibilance': {
        term: 'Sibilance',
        category: 'Vocal Production',
        def: 'Harsh high-frequency energy produced by human vocal consonants ("s", "sh", "z") usually concentrated between 5 kHz and 9 kHz.'
    },

    // EQ & Frequency
    'q factor': {
        term: 'Q Factor (Quality / Bandwidth)',
        category: 'Equalisation',
        def: 'The bandwidth ratio of a parametric filter; a higher Q produces a narrower, surgical cut/boost, while a lower Q produces a broader, musical curve.'
    },
    'frequency masking': {
        term: 'Frequency Masking',
        category: 'Psychoacoustics',
        def: 'When a louder sound obscures or conceals a quieter sound that shares the same frequency band at the same time.'
    },
    'high-pass filter': {
        term: 'High-Pass Filter (HPF / Low Cut)',
        category: 'Equalisation',
        def: 'Attenuates frequencies below a set cutoff point while allowing high frequencies above the cutoff to pass through unaffected.'
    },
    'low-pass filter': {
        term: 'Low-Pass Filter (LPF / High Cut)',
        category: 'Equalisation',
        def: 'Attenuates frequencies above a set cutoff point while allowing low frequencies below the cutoff to pass through.'
    },
    'fundamental frequency': {
        term: 'Fundamental Frequency',
        category: 'Acoustics',
        def: 'The lowest frequency of a periodic waveform; establishes the perceived musical pitch of the note.'
    },
    'harmonics': {
        term: 'Harmonics / Overtones',
        category: 'Acoustics',
        def: 'Integer multiples of the fundamental frequency (2nd, 3rd, 4th...) that define the unique timbre and tonal character of an instrument.'
    },
    'fletcher-munson': {
        term: 'Fletcher-Munson Curves',
        category: 'Psychoacoustics',
        def: 'Equal-loudness contours showing that human ears are far less sensitive to sub-bass and high treble at low listening volumes.'
    },

    // Synthesis
    'lfo': {
        term: 'LFO (Low-Frequency Oscillator)',
        category: 'Synthesis',
        def: 'An oscillator operating below audible frequencies (<20 Hz) used to rhythmically modulate parameters like pitch (vibrato), filter (wobble), or amp (tremolo).'
    },
    'vco': {
        term: 'VCO (Oscillator)',
        category: 'Synthesis',
        def: 'Voltage-Controlled Oscillator: generates the raw musical periodic waveform (sine, saw, square, pulse) in analogue synthesis.'
    },
    'vcf': {
        term: 'VCF (Filter)',
        category: 'Synthesis',
        def: 'Voltage-Controlled Filter: sculpts the harmonic spectrum by cutting or boosting selected frequencies via cutoff and resonance.'
    },
    'vca': {
        term: 'VCA (Amplifier)',
        category: 'Synthesis',
        def: 'Voltage-Controlled Amplifier: governs the output volume of the synthesizer, typically modulated over time by an ADSR envelope.'
    },
    'adsr': {
        term: 'ADSR Envelope',
        category: 'Synthesis',
        def: 'Attack, Decay, Sustain, Release: the four time/level stages that contour how a parameter (volume, filter, or pitch) changes over time.'
    },
    'subtractive synthesis': {
        term: 'Subtractive Synthesis',
        category: 'Synthesis',
        def: 'Creating sounds by starting with a harmonically rich waveform (saw or square) and carving away frequencies using audio filters.'
    },
    'monophonic': {
        term: 'Monophonic',
        category: 'Synthesis',
        def: 'Able to produce only one individual musical note at any single moment in time (common in early 1960s/70s modular synths).'
    },
    'polyphonic': {
        term: 'Polyphonic',
        category: 'Synthesis',
        def: 'Able to produce multiple simultaneous musical notes and chords simultaneously.'
    },

    // Digital Audio & DAW
    'nyquist limit': {
        term: 'Nyquist Limit',
        category: 'Digital Audio',
        def: 'Half the digital sampling rate; the absolute maximum frequency that can be accurately sampled without causing foldover aliasing.'
    },
    'nyquist theorem': {
        term: 'Nyquist-Shannon Theorem',
        category: 'Digital Audio',
        def: 'States that the digital sampling rate must be at least double the highest audio frequency to be recorded accurately.'
    },
    'aliasing': {
        term: 'Digital Aliasing',
        category: 'Digital Audio',
        def: 'Inharmonic distortion created when frequencies above the Nyquist limit fold back into the audible spectrum as false mirror frequencies.'
    },
    'sample rate': {
        term: 'Sample Rate',
        category: 'Digital Audio',
        def: 'The number of audio snapshots taken per second (e.g. 44.1 kHz = 44,100 samples/sec for CD; 48 kHz for film/video).'
    },
    'bit depth': {
        term: 'Bit Depth',
        category: 'Digital Audio',
        def: 'The number of bits used per sample; determines dynamic range and signal-to-quantisation-noise ratio (approx 6 dB per bit; 16-bit = 96 dB, 24-bit = 144 dB).'
    },
    'dither': {
        term: 'Dither Noise',
        category: 'Digital Audio',
        def: 'Low-level randomised noise added before reducing bit depth (e.g. 24-bit to 16-bit) to eliminate correlated quantisation distortion.'
    },
    'jitter': {
        term: 'Clock Jitter',
        category: 'Digital Audio',
        def: 'Minute timing fluctuations or drift in the master clock pulse during analogue-to-digital conversion, blurring high frequencies.'
    },
    'convolution reverb': {
        term: 'Convolution Reverb',
        category: 'Effects',
        def: 'Reverb that uses recorded Impulse Responses (IRs) of real acoustic spaces to mathematically recreate their exact reverberation characteristics.'
    },
    'impulse response': {
        term: 'Impulse Response (IR)',
        category: 'Effects',
        def: 'An acoustic audio recording of a physical room’s reaction to an impulse (starter pistol, sine sweep) used in convolution processors.'
    },
    'mid-side': {
        term: 'Mid-Side (M/S) Processing',
        category: 'Stereo',
        def: 'Splits stereo audio into Mid (centre mono sum, L+R) and Side (stereo difference, L-R) channels for independent EQ and compression.'
    }
};

// Sort keys longest first so multi-word terms take precedence (e.g. 'proximity effect' before 'effect')
const SORTED_KEYS = Object.keys(GLOSSARY_TERMS).sort((a, b) => b.length - a.length);
const REGEX_PATTERN = new RegExp(
    '(\\b(?:' + SORTED_KEYS.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|') + ')\\b)',
    'gi'
);

export default function AnnotatedText({ text, className = '' }) {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
    const popoverRef = useRef(null);

    // Close on outside click or scroll
    useEffect(() => {
        const handleDismiss = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setActiveTooltip(null);
            }
        };

        if (activeTooltip) {
            window.addEventListener('click', handleDismiss);
            window.addEventListener('scroll', handleDismiss, true);
        }
        return () => {
            window.removeEventListener('click', handleDismiss);
            window.removeEventListener('scroll', handleDismiss, true);
        };
    }, [activeTooltip]);

    if (!text || typeof text !== 'string') {
        return <span>{text}</span>;
    }

    const parts = text.split(REGEX_PATTERN);

    const handleTermClick = (e, info) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setPopoverPos({
            top: rect.bottom + window.scrollY + 6,
            left: Math.max(12, Math.min(window.innerWidth - 300, rect.left + window.scrollX - 40))
        });
        setActiveTooltip(prev => prev?.term === info.term ? null : info);
    };

    return (
        <span className={`annotated-text-container ${className}`} style={{ position: 'relative' }}>
            {parts.map((part, i) => {
                const lower = part.toLowerCase();
                const info = GLOSSARY_TERMS[lower];

                if (info) {
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={(e) => handleTermClick(e, info)}
                            title={`Tap for Edexcel definition: ${info.term}`}
                            style={{
                                all: 'unset',
                                display: 'inline',
                                borderBottom: '2px dotted var(--accent-purple, #a855f7)',
                                color: 'inherit',
                                cursor: 'help',
                                fontWeight: 'inherit',
                                textDecoration: 'none',
                                borderRadius: '2px',
                                padding: '0 2px',
                                transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {part}
                        </button>
                    );
                }
                return <span key={i}>{part}</span>;
            })}

            {/* Interactive Floating Micro-Definition Card */}
            {activeTooltip && (
                <div
                    ref={popoverRef}
                    role="tooltip"
                    style={{
                        position: 'fixed',
                        top: Math.min(window.innerHeight - 150, popoverPos.top - window.scrollY),
                        left: popoverPos.left,
                        width: '280px',
                        maxWidth: 'calc(100vw - 24px)',
                        background: '#0f172a',
                        border: '1px solid #a855f7',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.3)',
                        zIndex: 9999,
                        color: '#f8fafc',
                        fontSize: '0.85rem',
                        lineHeight: 1.45,
                        textAlign: 'left',
                        animation: 'fadeInPopover 0.15s ease-out'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', color: '#c084fc', fontSize: '0.9rem' }}>
                            {activeTooltip.term}
                        </span>
                        <span style={{
                            fontSize: '0.68rem',
                            fontWeight: '600',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'rgba(168, 85, 247, 0.25)',
                            color: '#e9d5ff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {activeTooltip.category}
                        </span>
                    </div>
                    <div style={{ color: '#cbd5e1', marginBottom: '8px' }}>
                        {activeTooltip.def}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'right', fontStyle: 'italic' }}>
                        Tap anywhere to dismiss
                    </div>
                </div>
            )}
        </span>
    );
}
