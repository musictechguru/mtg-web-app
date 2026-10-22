import React, { useRef, useEffect, useCallback, memo } from 'react';

const WelcomeVideoModal = memo(({ onClose }) => {
    const videoRef = useRef(null);
    const hasClosedRef = useRef(false);

    const handleClose = useCallback(() => {
        if (hasClosedRef.current) return;
        hasClosedRef.current = true;
        if (videoRef.current) {
            videoRef.current.pause();
        }
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
                console.warn("Autoplay was prevented by browser:", error);
            });
        }
        return () => {
            // Stop and release video immediately on unmount (prevents StrictMode & fast-close double audio)
            if (video) {
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        };
    }, []);

    return (
        <div style={styles.overlay}>
            <div style={styles.modalContainer}>
                <video
                    ref={videoRef}
                    style={styles.videoPlayer}
                    src="/MTGuru_vids/Music_Tech_Guru_Sonic Realm.mp4"
                    controls
                    autoPlay
                    playsInline
                    onEnded={handleClose}
                >
                    Your browser does not support the video tag.
                </video>
                <div style={styles.controls}>
                    <button onClick={handleClose} style={styles.skipButton}>
                        Skip / Close
                    </button>
                </div>
            </div>
        </div>
    );
});

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
