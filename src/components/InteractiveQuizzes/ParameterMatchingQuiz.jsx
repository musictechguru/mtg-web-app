import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';

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
    unit = 'Hz'
}) {
    // State
    const [values, setValues] = useState([min]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

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
                <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={imageSrc} alt="Spectrum Analysis" style={{ width: '100%', display: 'block' }} />
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
                            <audio controls src={audioBeforeSrc} style={{ width: '100%', height: '32px' }} />
                        </div>
                    )}

                    {audioAfterSrc && (
                        <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#86efac', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                2. Listen to the Goal (After)
                            </p>
                            <audio controls src={audioAfterSrc} style={{ width: '100%', height: '32px' }} />
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
