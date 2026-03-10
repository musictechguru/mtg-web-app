import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const UpdatePasswordModal = () => {
    const { updatePassword } = useUser();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            await updatePassword(password);
            setMessage("Password updated successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', 
            justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="modal-content" style={{
                background: 'var(--bg-panel)', padding: '40px', borderRadius: '16px', 
                maxWidth: '400px', width: '90%', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{ marginBottom: '10px', color: 'var(--text-primary)', textAlign: 'center' }}>Update Password</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', textAlign: 'center', fontSize: '0.9rem' }}>
                    Please enter a new password for your account.
                </p>
                
                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--accent-error)',
                        color: 'var(--accent-error)',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>{error}</div>
                )}

                {message ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid var(--accent-success)',
                            color: 'var(--accent-success)',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '0.9rem'
                        }}>{message}</div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            You can now continue to your dashboard.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', boxSizing: 'border-box', outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', boxSizing: 'border-box', outline: 'none'
                                }}
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            style={{ 
                                width: '100%', padding: '12px', marginTop: '10px',
                                background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '8px',
                                fontWeight: '600', fontSize: '1rem',
                                opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdatePasswordModal;
