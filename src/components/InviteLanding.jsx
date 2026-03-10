import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import LoginScreen from './LoginScreen';

const InviteLanding = ({ teacherId, onComplete }) => {
    const { currentUser, redeemInvite } = useUser();
    const [status, setStatus] = useState('processing'); // processing, error, success
    const [message, setMessage] = useState('Verifying your invite link...');

    useEffect(() => {
        if (!currentUser) return; // Wait for login

        const processInvite = async () => {
            try {
                if (currentUser.role === 'teacher') {
                    setStatus('error');
                    setMessage('Teachers cannot redeem student invite links.');
                    return;
                }

                await redeemInvite(teacherId);
                setStatus('success');
                setMessage('Success! You are now linked to your classroom and have Premium access.');

                // Redirect after 3 seconds
                setTimeout(() => {
                    onComplete();
                }, 3000);
            } catch (err) {
                console.error(err);
                setStatus('error');
                setMessage(err.message || 'The invite link is invalid or expired.');
            }
        };

        processInvite();
    }, [currentUser, teacherId, redeemInvite, onComplete]);

    if (!currentUser) {
        // Show login screen but with a message Context
        return (
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
                    background: 'rgba(59, 130, 246, 0.9)', color: 'white', padding: '15px', textAlign: 'center',
                    fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}>
                    Please create an account or log in to accept your classroom invite.
                </div>
                <div style={{ paddingTop: '50px' }}>
                    <LoginScreen />
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            minHeight: '80vh', padding: '20px', textAlign: 'center', color: 'white'
        }}>
            <div style={{
                background: 'var(--bg-panel)', padding: '40px', borderRadius: '16px',
                border: `1px solid ${status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                maxWidth: '500px', width: '100%'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    {status === 'processing' && '⏳'}
                    {status === 'success' && '✅'}
                    {status === 'error' && '❌'}
                </div>
                <h2 style={{ marginBottom: '15px', color: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'white' }}>
                    {status === 'processing' ? 'Joining Classroom' : status === 'success' ? 'Welcome!' : 'Oops!'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
                    {message}
                </p>

                {status === 'error' && (
                    <button onClick={onComplete} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                        Go to Dashboard
                    </button>
                )}
            </div>
        </div>
    );
};

export default InviteLanding;
