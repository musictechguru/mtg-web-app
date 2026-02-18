import React from 'react';

const GuruTracker = ({ progress = 0, levelTitle = "Apprentice" }) => {
    // Reveal Technique:
    // 1. Background: Grey version of logo (Always visible 100%)
    // 2. Foreground: Colored version of logo (Clipped height based on progress)

    // Ensure progress is clamped 0-100
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="guru-tracker" style={{ textAlign: 'center', padding: '10px' }}>
            <div
                className="guru-container"
                style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto',
                    position: 'relative'
                }}
            >
                {/* 1. Background (Empty/Grey) */}
                <img
                    src={`${import.meta.env.BASE_URL}images/guru_logo.png`}
                    alt="Guru Outline"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%) opacity(0.3)',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />

                {/* 2. Foreground (Filling Up) */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: `${clampedProgress}%`,
                    overflow: 'hidden',
                    transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    {/* We need the image to remain "fixed" relative to the container, 
                        even though the wrapper is clipping it.
                        So we position it 'bottom: 0' inside and give it full container height. 
                    */}
                    <img
                        src={`${import.meta.env.BASE_URL}images/guru_logo.png`}
                        alt="Guru Filled"
                        style={{
                            width: '120px', // Must match container width
                            height: '120px', // Must match container height
                            objectFit: 'contain',
                            position: 'absolute',
                            bottom: 0, // Anchor to bottom so it fills up
                            left: 0,
                            // Optional: Add a glow or filter to the filled part
                            filter: 'drop-shadow(0 0 2px var(--accent-blue))'
                        }}
                    />
                </div>
            </div>

            {/* Status Display */}
            <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '0.8em', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
                    Rank
                </div>
                <div style={{
                    fontWeight: 'bold',
                    color: clampedProgress >= 100 ? 'var(--accent-success)' : 'var(--accent-blue)',
                    textShadow: clampedProgress >= 100 ? '0 0 10px var(--accent-success)' : 'none',
                    fontSize: '1.1em'
                }}>
                    {levelTitle}
                </div>
                <div style={{ fontSize: '0.75em', color: '#666', marginTop: '2px' }}>
                    {Math.round(clampedProgress)}% Charged
                </div>
            </div>
        </div>
    );
};

export default GuruTracker;
