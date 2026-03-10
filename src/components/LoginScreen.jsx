import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../App.css'; 

const LoginScreen = () => {
    const { login, signup, resetPassword, resendVerification, loading } = useUser();
    
    // view can be 'login', 'signup', 'forgot'
    const [view, setView] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            if (view === 'login') {
                await login(email, password);
            } else if (view === 'signup') {
                await signup(email, password);
                setMessage("Success! Please check your email for the confirmation link.");
                setView('login');
                setPassword('');
            } else if (view === 'forgot') {
                await resetPassword(email);
                setMessage("If an account exists, a password reset email has been sent to you.");
                setView('login');
                setPassword('');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendVerification = async () => {
        if (!email) {
            setError('Please enter your email to resend verification.');
            return;
        }
        setError('');
        setMessage('');
        setIsSubmitting(true);
        try {
            await resendVerification(email);
            setMessage("Verification email resent. Please check your inbox.");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isUnverifiedError = error.toLowerCase().includes('email not confirmed');

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100dvh',
            height: '100vh',
            backgroundColor: 'var(--bg-dark)',
            color: 'var(--text-primary)',
            padding: '20px',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'var(--bg-panel)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '900px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Marketing Panel */}
                <div style={{
                    flex: '1 1 400px',
                    padding: '3rem 2.5rem',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <h1 style={{
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '2.5rem',
                        lineHeight: '1.2'
                    }}>Music Tech Guru<br/>Revision App</h1>
                    
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Your ultimate companion for mastering music technology. Ace your Edexcel exams with our premium tools and resources.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {[
                            { icon: '📝', text: 'Interactive Quizzes for Comp 3 & 4' },
                            { icon: '💡', text: 'Expert Explanations & Rationale' },
                            { icon: '🗣️', text: 'Famous Quotes & Real-World Examples' },
                            { icon: '🎯', text: 'Track Your Progress to Mastery' }
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ 
                                    background: 'rgba(255,255,255,0.05)', 
                                    borderRadius: '50%', 
                                    width: '40px', 
                                    height: '40px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}>{feature.icon}</div>
                                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login Form Panel */}
                <div style={{
                    flex: '1 1 350px',
                    padding: '3rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                        {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Reset Password'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        {view === 'login' ? 'Please log in to continue' : view === 'signup' ? 'Sign up to get started' : 'Enter your email to reset your password'}
                    </p>

                    {error && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--accent-error)',
                            color: 'var(--accent-error)',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <span>{error}</span>
                            {isUnverifiedError && (
                                <button 
                                    onClick={handleResendVerification}
                                    style={{
                                        alignSelf: 'flex-start',
                                        background: 'transparent',
                                        border: '1px solid var(--accent-error)',
                                        color: 'var(--accent-error)',
                                        padding: '5px 10px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Resend Verification Email
                                </button>
                            )}
                        </div>
                    )}

                    {message && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid var(--accent-success)',
                            color: 'var(--accent-success)',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        {view !== 'forgot' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Password</label>
                                    {view === 'login' && (
                                        <span 
                                            onClick={() => { setView('forgot'); setError(''); setMessage(''); }}
                                            style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', cursor: 'pointer' }}
                                        >
                                            Forgot password?
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                />
                            </div>
                        )}

                        <button type="submit" disabled={loading || isSubmitting} style={{
                            padding: '12px',
                            backgroundColor: (loading || isSubmitting) ? 'var(--bg-layer-2)' : 'var(--accent-blue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: (loading || isSubmitting) ? 'not-allowed' : 'pointer',
                            marginTop: '0.5rem',
                            transition: 'all 0.2s',
                            opacity: (loading || isSubmitting) ? 0.7 : 1,
                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                        }}>
                            {loading || isSubmitting ? 'Processing...' : view === 'login' ? 'Log In' : view === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        {view === 'login' ? "Don't have an account? " : view === 'signup' ? "Already have an account? " : "Remember your password? "}
                        <span
                            onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setError(''); setMessage(''); }}
                            style={{
                                color: 'var(--accent-blue)',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            {view === 'login' ? 'Sign Up' : 'Log In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
