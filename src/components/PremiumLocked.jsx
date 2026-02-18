import React from 'react';

const PremiumLocked = ({ onUnlock, itemTitle }) => {
    return (
        <div className="premium-locked-container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔒</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(to right, #ffd700, #ffa500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium Content</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px', lineHeight: '1.6' }}>
                The item <strong>"{itemTitle}"</strong> is available exclusively to premium members.
                Unlock full access to all quizzes, exams, and detailed analytics.
            </p>

            <button
                style={{
                    padding: '15px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    background: 'linear-gradient(to right, #ffd700, #ffa500)',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                onClick={() => alert("This checks out! Integration with Stripe/Payment Gateway would happen here.")}
            >
                Upgrade to Premium
            </button>

            <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
                Already a member? <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => window.location.reload()}>Refresh</span>
            </p>
        </div>
    );
};

export default PremiumLocked;
