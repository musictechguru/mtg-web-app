import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';

export default function MidiPracticalQuiz({
    controlType = 'pitch_bend', // 'pitch_bend', 'velocity', 'cc'
    min = 0,
    max = 24,
    step = 1,
    targetValue = 12,
    unit = 'ST',
    onResult
}) {
    // State
    const [values, setValues] = useState([min]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Initial value setup
    useEffect(() => {
        setValues([min]);
        setIsSubmitted(false);
        setIsCorrect(false);
    }, [controlType, targetValue, min, max]);

    const checkAnswer = () => {
        setIsSubmitted(true);
        const userValue = values[0];
        const correct = userValue === targetValue;

        setIsCorrect(correct);
        if (onResult) {
            onResult(correct);
        }
    };

    // Styling based on controlType
    const trackColor = controlType === 'velocity' ? '#ef4444' : controlType === 'pitch_bend' ? '#8b5cf6' : '#38bdf8';
    const labelText = controlType === 'velocity' ? `Velocity` : controlType === 'pitch_bend' ? `Pitch Bend Range` : `CC Value`;

    return (
        <div className="midi-practical-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Adjust the fader to set the correct {labelText.toLowerCase()}.
            </p>

            {/* Visual Context */}
            <div style={{
                marginBottom: '20px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'var(--bg-primary)',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px'
            }}>
                <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: trackColor,
                    fontFamily: 'monospace'
                }}>
                    {values[0]} {unit}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {labelText}
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
                                            colors: [trackColor, '#475569'],
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
                                            backgroundColor: isDragged ? trackColor : '#CCC'
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
                    Submit Answer
                </button>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, color: isCorrect ? '#22c55e' : '#ef4444' }}>
                        {isCorrect ? "Spot on! That's correct." : `Incorrect. The target was ${targetValue} ${unit}.`}
                    </p>
                </div>
            )}
        </div>
    );
}
