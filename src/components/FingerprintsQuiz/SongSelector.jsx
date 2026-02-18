import React from 'react';

const SongSelector = ({ songs, onSelect }) => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ marginBottom: '15px' }}>Production Fingerprints</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    Identify the sonic signature of iconic tracks across 6 decades.
                    Analyse capture, synthesis, dynamics, and effects to build your critical listening skills.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px'
            }}>
                {songs.map((song) => (
                    <div
                        key={song.id}
                        onClick={() => onSelect(song)}
                        className="song-card"
                        style={{
                            background: 'var(--bg-panel)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            position: 'relative'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Decorative Decade Banner */}
                        <div style={{
                            background: 'var(--accent-purple)',
                            color: '#fff',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{song.decade}</span>
                            <span>{song.year}</span>
                        </div>

                        <div style={{ padding: '25px' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{song.title}</h3>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
                                {song.artist}
                            </div>

                            <p style={{
                                fontSize: '0.9rem',
                                lineHeight: '1.5',
                                color: '#ccc',
                                marginBottom: '25px'
                            }}>
                                {song.description}
                            </p>

                            <button
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Start Analysis →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongSelector;
