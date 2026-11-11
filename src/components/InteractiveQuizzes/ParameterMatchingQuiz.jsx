import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { Maximize2, X } from 'lucide-react';

export default function ParameterMatchingQuiz({
    label,
    min = 20,
    max = 20000,
    step = 10,
    correctValue,
    tolerance = 100, // +/- tolerance
    imageSrc, // Spectrum or context image
    audioBeforeSrc, // "Before" state (Problem)
    audioAfterSrc, // "After" state (Fixed)
    onResult,
    onExpandImage,
    unit = 'Hz'
}) {
    // State
    const [values, setValues] = useState([min]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleExpandImage = () => {
        if (!imageSrc) return;
        if (onExpandImage) {
            onExpandImage({
                src: imageSrc,
                alt: label ? `${label} - Spectrum Analysis` : 'Spectrum Analysis Reference'
            });
        } else {
            setIsLocalModalOpen(true);
        }
    };

    useEffect(() => {
        if (!isLocalModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsLocalModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLocalModalOpen]);

    // Stop audio on question change or unmount
    useEffect(() => {
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(a => {
            if (!a.paused) {
                a.pause();
                a.currentTime = 0;
            }
        });
        return () => {
            allAudios.forEach(a => {
                if (!a.paused) {
                    a.pause();
                }
            });
        };
    }, [audioBeforeSrc, audioAfterSrc]);

    const handleAudioPlay = (e) => {
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(a => {
            if (a !== e.target && !a.paused) {
                a.pause();
            }
        });
    };

    // Check if the user's value is within tolerance
    const checkAnswer = () => {
        setIsSubmitted(true);
        const userValue = values[0];
        const diff = Math.abs(userValue - correctValue);
        const correct = diff <= tolerance;

        setIsCorrect(correct);
        if (onResult) {
            onResult(correct);
        }
    };

    return (
        <div className="parameter-matching-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Adjust the fader to match the target parameter.
            </p>

            {/* Visual Context */}
            {imageSrc && (
                <div
                    onClick={handleExpandImage}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleExpandImage();
                        }
                    }}
                    style={{
                        marginBottom: '20px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: isHovered ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.12)',
                        background: 'rgba(15, 23, 42, 0.7)',
                        padding: '12px',
                        cursor: 'zoom-in',
                        position: 'relative',
                        boxShadow: isHovered ? '0 8px 24px rgba(56, 189, 248, 0.18)' : '0 4px 12px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    title="Click to enlarge diagram in high-resolution view"
                    aria-label="Enlarge Spectrum Analysis Diagram"
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        paddingBottom: '6px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            {label ? `${label} Reference Diagram` : 'Spectrum Analysis Reference'}
                        </span>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: isHovered ? '#38bdf8' : '#94a3b8',
                            background: isHovered ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.06)',
                            border: isHovered ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                            padding: '3px 9px',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                        }}>
                            <Maximize2 size={12} />
                            <span>Click to expand</span>
                        </div>
                    </div>
                    <img
                        src={imageSrc}
                        alt="Spectrum Analysis"
                        style={{
                            width: '100%',
                            maxHeight: '260px',
                            objectFit: 'contain',
                            display: 'block',
                            transform: isHovered ? 'scale(1.015)' : 'scale(1)',
                            transition: 'transform 0.22s ease'
                        }}
                    />
                </div>
            )}

            {/* Standalone Fallback Modal */}
            {isLocalModalOpen && imageSrc && (
                <div
                    onClick={() => setIsLocalModalOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(5, 11, 20, 0.94)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        padding: '16px',
                        cursor: 'default'
                    }}
                >
                    <button
                        onClick={() => setIsLocalModalOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#fff',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 100000
                        }}
                        title="Close (Esc)"
                        aria-label="Close enlarged diagram"
                    >
                        <X size={22} />
                    </button>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: 'min(94vw, 1100px)',
                            maxHeight: 'min(86vh, 800px)',
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '14px',
                            padding: '18px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.85)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {label ? `${label} Reference Diagram` : 'Spectrum Analysis Reference'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Press Esc or click outside to close
                            </span>
                        </div>
                        <img
                            src={imageSrc}
                            alt="Spectrum Analysis"
                            style={{
                                maxWidth: '100%',
                                maxHeight: 'calc(min(86vh, 800px) - 60px)',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Audio Context */}
            {(audioBeforeSrc || audioAfterSrc) && (
                <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {audioBeforeSrc && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#fca5a5', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                1. Listen to the Problem (Before)
                            </p>
                            <audio controls onPlay={handleAudioPlay} src={audioBeforeSrc} style={{ width: '100%', height: '32px' }} />
                        </div>
                    )}

                    {audioAfterSrc && (
                        <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#86efac', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                2. Listen to the Goal (After)
                            </p>
                            <audio controls onPlay={handleAudioPlay} src={audioAfterSrc} style={{ width: '100%', height: '32px' }} />
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {label}: <span style={{ color: '#38bdf8' }}>{values[0]} {unit}</span>
                </div>

                {/* Slider Container */}
                <div style={{ width: '100%', padding: '0 10px 30px 10px' }}>
                    <Range
                        values={values}
                        step={step}
                        min={min}
                        max={max}
                        disabled={isSubmitted}
                        onChange={(values) => setValues(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: '36px',
                                    display: 'flex',
                                    width: '100%'
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: '8px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                            values,
                                            colors: ['#38bdf8', '#475569'],
                                            min,
                                            max
                                        }),
                                        alignSelf: 'center'
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => {
                            const { key, ...restProps } = props;
                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    style={{
                                        ...props.style,
                                        height: '24px',
                                        width: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFF',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0px 2px 6px #AAA'
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '10px',
                                            width: '5px', // Fader look
                                            backgroundColor: isDragged ? '#38bdf8' : '#CCC'
                                        }}
                                    />
                                </div>
                            )
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>{min}{unit}</span>
                        <span>{max}{unit}</span>
                    </div>
                </div>
            </div>

            {!isSubmitted ? (
                <button
                    onClick={checkAnswer}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Check Setting
                </button>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, color: isCorrect ? '#22c55e' : '#ef4444' }}>
                        {isCorrect ? "Spot on! Frequency Identified." : `Incorrect. The target was ${correctValue} ${unit}.`}
                    </p>
                </div>
            )}
        </div>
    );
}
