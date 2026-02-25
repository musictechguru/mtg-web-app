import React, { useRef, useEffect } from 'react';

const WelcomeVideoModal = ({ onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Attempt to play on mount
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented by browser:", error);
            });
        }
    }, []);

    return (
        <div style={styles.overlay}>
            <div style={styles.modalContainer}>
                <video
                    ref={videoRef}
                    style={styles.videoPlayer}
                    controls
                    autoPlay
                    onEnded={onClose}
                >
                    <source src="/MTGuru_vids/Music_Tech_Guru_Sonic Realm.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div style={styles.controls}>
                    <button onClick={onClose} style={styles.skipButton}>
                        Skip / Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999, // Ensure it sits above absolutely everything
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative'
    },
    videoPlayer: {
        width: '100%',
        display: 'block',
        aspectRatio: '16/9'
    },
    controls: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 10
    },
    skipButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        backdropFilter: 'blur(4px)',
        transition: 'background-color 0.2s'
    }
};

export default WelcomeVideoModal;
