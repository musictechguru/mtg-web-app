import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import LegalModals from './LegalModals';
import courseData from '../data/course_data.json';
import '../App.css'; 

const isDev = Boolean(
    import.meta.env.DEV ||
    (typeof window !== 'undefined' && (
        window.location.search.includes('dev=true') ||
        localStorage.getItem('dev_mode') === 'true'
    ))
);

const LoginScreen = ({ onSelectPreview }) => {
    const { login, signup, resetPassword, resendVerification, loading, adminBypass } = useUser();
    
    // view can be 'login', 'signup', 'forgot'
    const [view, setView] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSyllabus, setShowSyllabus] = useState(false);
    
    // Legal Modals State
    const [legalType, setLegalType] = useState(null);

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
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '100dvh',
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: 'var(--bg-dark)',
            color: 'var(--text-primary)',
            padding: 'clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)',
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
            boxSizing: 'border-box',
            overflowX: 'hidden'
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
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                boxSizing: 'border-box'
            }}>
                {/* Marketing Panel */}
                <div style={{
                    flex: '1 1 300px',
                    minWidth: 0,
                    maxWidth: '100%',
                    padding: '2rem 1.5rem',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    boxSizing: 'border-box'
                }}>
                    <h1 style={{
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                        lineHeight: '1.2'
                    }}>Music Tech Guru<br/>Revision App</h1>
                    
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
                        Your ultimate companion for mastering music technology. Master your Edexcel exams with our premium tools and resources.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { icon: '📝', text: 'Interactive Quizzes for Comp 3 & 4' },
                            { icon: '💡', text: 'Expert Explanations & Rationale' },
                            { icon: '🗣️', text: 'Famous Quotes & Real-World Examples' },
                            { icon: '🎯', text: 'Track Your Progress to Mastery' }
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                    background: 'rgba(255,255,255,0.05)', 
                                    borderRadius: '50%', 
                                    width: '36px', 
                                    height: '36px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    flexShrink: 0
                                }}>{feature.icon}</div>
                                <span style={{ fontWeight: '500', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Quick Link to Tutor on WordPress */}
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <a 
                            href="https://www.musictechguru.com/homepage/music-tech-tutor/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'rgba(0, 193, 240, 0.1)',
                                border: '1px solid rgba(0, 193, 240, 0.35)',
                                borderRadius: '12px',
                                padding: '10px 14px',
                                color: '#38bdf8',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>🎓</span> 1-on-1 Music Tech Tutor
                            </span>
                            <span style={{ fontSize: '0.75rem', background: '#00C1F0', color: '#0b0f19', padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                                Free Consult &rarr;
                            </span>
                        </a>
                    </div>
                </div>

                {/* Login Form Panel */}
                <div style={{
                    flex: '1 1 300px',
                    minWidth: 0,
                    maxWidth: '100%',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                }}>
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                        {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Reset Password'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
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
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        {view !== 'forgot' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Password</label>
                                    {view === 'login' && (
                                        <span 
                                            onClick={() => { setView('forgot'); setError(''); setMessage(''); }}
                                            style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', cursor: 'pointer' }}
                                        >
                                            Forgot?
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
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
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
                    {isDev && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={adminBypass}
                                style={{
                                    background: 'transparent',
                                    border: '1px dashed var(--accent-warning)',
                                    color: 'var(--accent-warning)',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                ⚠️ Dev: Admin Login
                            </button>
                        </div>
                    )}



                    <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
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

                    <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                        By creating an account, you agree to our <br/>
                        <span 
                            onClick={() => setLegalType('terms')} 
                            style={{ color: 'var(--accent-blue)', cursor: 'pointer', textDecoration: 'underline' }}
                        >Terms</span> and <span
                             onClick={() => setLegalType('privacy')}
                             style={{ color: 'var(--accent-blue)', cursor: 'pointer', textDecoration: 'underline' }}
                        >Privacy Policy</span>.
                    </p>
                </div>
            </div>

            {/* Student & Parent Testimonials & 1-on-1 Tutor Showcase */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                marginTop: '24px',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(17, 24, 39, 0.9) 100%)',
                border: '1px solid rgba(0, 193, 240, 0.35)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 193, 240, 0.1)',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            background: 'rgba(0, 193, 240, 0.15)',
                            color: '#00C1F0',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                        }}>
                            🎓 1-on-1 Private Tuition Reviews
                        </span>
                        <span style={{ color: '#fbbf24', fontSize: '1rem', letterSpacing: '2px' }}>
                            ★★★★★
                        </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Verified Results from Real Students & Parents
                    </span>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '16px',
                    marginBottom: '18px'
                }}>
                    {/* Testimonial 1: Student Fast-Track */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <blockquote style={{
                            margin: '0 0 14px 0',
                            color: '#f1f5f9',
                            fontSize: '0.92rem',
                            lineHeight: '1.6',
                            fontStyle: 'italic',
                            borderLeft: '3px solid #00C1F0',
                            paddingLeft: '12px'
                        }}>
                            "This guy is the real deal. I started studying A level Music Technology in Year 13 and Thor helped me manage two years of work in one. We had weekly sessions where we would use his resources to revise the specification inside and out. When it came to the coursework, I really learnt to master my workflow and production techniques on Logic – there’s a reason they call him the Guru!"
                        </blockquote>
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                            <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Former A-Level Student</strong>
                            <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600 }}>Achieved Grade A (Compressed 2 Years into 1)</span>
                        </div>
                    </div>

                    {/* Testimonial 2: Parent D-to-A Grade */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <blockquote style={{
                            margin: '0 0 14px 0',
                            color: '#f1f5f9',
                            fontSize: '0.92rem',
                            lineHeight: '1.6',
                            fontStyle: 'italic',
                            borderLeft: '3px solid #10b981',
                            paddingLeft: '12px'
                        }}>
                            "We got in touch with Thor at the end of February for help as our son, who was in Y13, was averaging a D grade and had barely started his coursework components... resulting in an A grade. I have no doubt that without Thor’s tutorials, my son would not have been able to achieve his potential."
                        </blockquote>
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                            <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>Parent of Year 13 Student</strong>
                            <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>Grade D to Grade A in Just 2 Months</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                        🎧 1-on-1 Mentoring for Coursework (Comp 1 & 2) and Listening & Production Exam Prep (Comp 3 & 4)
                    </div>

                    <a
                        href="https://www.musictechguru.com/homepage/music-tech-tutor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'linear-gradient(135deg, #00C1F0 0%, #0284c7 100%)',
                            color: '#0b0f19',
                            textDecoration: 'none',
                            padding: '10px 20px',
                            borderRadius: '50px',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 15px rgba(0, 193, 240, 0.35)',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Book 1-on-1 Tutoring with Thor ↗
                    </a>
                </div>
            </div>

            {/* Explore Curriculum & Free Preview Quizzes Section */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                marginTop: '24px',
                marginBottom: '40px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <button
                        type="button"
                        onClick={() => setShowSyllabus(prev => !prev)}
                        style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            color: '#38bdf8',
                            padding: '12px 18px',
                            borderRadius: '12px',
                            fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <span>📚</span>
                        <span>{showSyllabus ? 'Hide Syllabus Overview' : 'Explore Course Syllabus & Free Preview Quizzes (120+ Modules)'}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{showSyllabus ? '▲' : '▼'}</span>
                    </button>
                </div>

                {showSyllabus && (
                    <div style={{
                        background: 'var(--bg-panel)',
                        borderRadius: '20px',
                        padding: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '8px' }}>
                                Edexcel A-Level Music Technology Revision Curriculum
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
                                Click any topic to test your knowledge in Guest Preview mode. Component 3 &amp; 4 revision covering 1950s–present day music production.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '16px',
                            maxHeight: '550px',
                            overflowY: 'auto',
                            paddingRight: '8px'
                        }}>
                            {(courseData.sections || []).map((sec, sIdx) => (
                                <div
                                    key={sIdx}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '12px',
                                        padding: '16px'
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '0.95rem',
                                        color: '#38bdf8',
                                        margin: '0 0 10px 0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{sec.title}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'normal' }}>
                                            {(sec.items || []).length}
                                        </span>
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {(sec.items || []).map((item, iIdx) => (
                                            <a
                                                key={iIdx}
                                                href={`/?quiz=${encodeURIComponent(item.id || item.title)}`}
                                                onClick={(e) => {
                                                    if (onSelectPreview) {
                                                        e.preventDefault();
                                                        onSelectPreview(item);
                                                    }
                                                }}
                                                style={{
                                                    color: item.isPremium ? '#94a3b8' : '#cbd5e1',
                                                    textDecoration: 'none',
                                                    fontSize: '0.85rem',
                                                    padding: '6px 8px',
                                                    borderRadius: '6px',
                                                    background: 'rgba(255, 255, 255, 0.02)',
                                                    transition: 'all 0.15s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '6px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
                                                    e.currentTarget.style.color = '#38bdf8';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                                    e.currentTarget.style.color = item.isPremium ? '#94a3b8' : '#cbd5e1';
                                                }}
                                            >
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                                                {item.isPremium && <span style={{ fontSize: '0.75rem', color: '#facc15', flexShrink: 0 }}>🔒 PRO</span>}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Legal Modals */}
            <LegalModals 
                isOpen={!!legalType} 
                type={legalType} 
                onClose={() => setLegalType(null)} 
            />
        </div>
    );
};

export default LoginScreen;
