import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for sign up
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                if (!name.trim()) throw new Error("Name is required");
                await signup(email, password, name.trim());
            } else {
                await login(email, password);
            }
        } catch (err) {
            console.error(err);
            // Friendly error messages
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError(err.message || 'Failed to sign in');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <div style={{
                background: 'var(--bg-panel)',
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ marginBottom: '10px' }}>Music Tech Guru</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {isSignUp ? 'Create your free account' : 'Sign in to continue'}
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(255,50,50,0.2)',
                        color: '#ff6b6b',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {useUser().isMock && (
                    <div style={{
                        background: 'rgba(255, 179, 0, 0.2)',
                        color: '#ffb300',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        fontSize: '0.8rem',
                        border: '1px solid #ffb300'
                    }}>
                        <strong>Dev Mode Active:</strong> No Firebase keys found.<br />
                        Login with any email/password.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '12px' }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
                    </button>
                </form>

                <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent-blue)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isSignUp ? 'Log In' : 'Sign Up Free'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '90%',
    padding: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    marginBottom: '15px'
};

export default LoginScreen;
