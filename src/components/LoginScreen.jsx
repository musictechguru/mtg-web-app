import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import LegalModals from './LegalModals';
import courseData from '../data/course_data.json';
import { findPlan, rememberUpgradeIntent } from '../config/plans';
import { track } from '../utils/analytics';
import '../App.css';

// The admin bypass only exists in local development (npm run dev), never on the live site
const isDev = Boolean(import.meta.env.DEV);

const allItems = (courseData.sections || []).flatMap(sec => sec.items || []);
const mockItems = (courseData.sections || [])
    .filter(sec => /mock/i.test(sec.title || ''))
    .flatMap(sec => sec.items || []);
const freeCount = allItems.filter(item => !item.isPremium).length;
const freeMockCount = mockItems.filter(item => !item.isPremium).length;
const findItem = (id) => allItems.find(item => item.id === id) || null;

// Mirrors QuizPlayer: quizzes with randomise: false show every question, others serve up to 20
const questionCount = (item) => {
    const total = item?.questions?.length || 0;
    return item?.randomise === false ? total : Math.min(total, 20);
};

const assessment = findItem('diagnostic_initial');

// Free items shown as quick-start cards under the hero, in this order
const FEATURED_FREE = [
    { id: 'c3_funk', kicker: 'Component 3 mock exam', title: 'Funk listening paper' },
    { id: 'c4_edm', kicker: 'Component 4 mock exam', title: 'EDM production paper' },
    { id: 'quiz-topic-1_p1', kicker: 'Topic quiz', title: 'Fundamentals & Recording' },
    { id: 'comp_tainted_love', kicker: 'Comparison quiz', title: 'Tainted Love' },
    { id: 'case_heartbreak_hotel', kicker: 'Case study', title: 'Heartbreak Hotel' },
    { id: 'worksheet-ao3-ao4-q5', kicker: 'Essay workshop', title: 'Question 5 builder (15 marks)' }
]
    .map(card => ({ ...card, item: findItem(card.id) }))
    .filter(card => card.item && !card.item.isPremium);

const ROLES = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'parent', label: 'Parent' }
];

const EXAM_YEARS = [
    { value: '2027', label: 'Year 13 (exams in summer 2027)' },
    { value: '2028', label: 'Year 12 (exams in summer 2028)' },
    { value: 'other', label: 'Other or not sure' }
];

const studentPlan = findPlan('student');
const classPlanSmall = findPlan('class5');
const classPlanLarge = findPlan('class10');

// People who have logged in on this device before see the log-in tab first
const isReturningVisitor = () => {
    try {
        return localStorage.getItem('hasSeenWelcomeVideo') === 'true';
    } catch {
        return false;
    }
};

// One landing_view per page load, however often guests come back to this screen
let landingTracked = false;

const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
};

const labelStyle = { fontSize: '0.8rem', color: 'var(--text-secondary)' };

const linkButtonStyle = {
    background: 'none',
    border: 'none',
    padding: 0,
    color: 'var(--accent-blue)',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 'inherit'
};

const sectionStyle = {
    width: '100%',
    maxWidth: '900px',
    marginTop: '24px',
    boxSizing: 'border-box'
};

// onAuthenticated runs after a successful log-in or sign-up; intent is { view, role, reason }
const LoginScreen = ({ onSelectPreview, onAuthenticated, intent = null }) => {
    const { login, signup, resetPassword, resendVerification, loading, adminBypass } = useUser();

    // view can be 'login', 'signup', 'forgot'
    const [view, setView] = useState(() => intent?.view || (isReturningVisitor() ? 'login' : 'signup'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(intent?.role || 'student');
    const [examYear, setExamYear] = useState('');
    const [marketingOptIn, setMarketingOptIn] = useState(false);
    // Why the visitor is creating an account: 'landing', 'upgrade' (picked a paid plan) or 'save'
    const [reason, setReason] = useState(intent?.reason || 'landing');

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSyllabus, setShowSyllabus] = useState(false);

    // Legal Modals State
    const [legalType, setLegalType] = useState(null);

    const formPanelRef = useRef(null);
    const emailInputRef = useRef(null);
    // Sent here from a paywall or results screen: bring the form into view once mounted
    const focusOnMountRef = useRef(Boolean(intent));

    const focusForm = () => {
        formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        emailInputRef.current?.focus({ preventScroll: true });
    };

    useEffect(() => {
        if (landingTracked) return;
        landingTracked = true;
        const params = new URLSearchParams(window.location.search);
        let from = null;
        try {
            const referrer = document.referrer ? new URL(document.referrer) : null;
            if (referrer && referrer.host !== window.location.host) from = referrer.hostname;
        } catch {
            // Unreadable referrer: leave it out
        }
        track('landing_view', {
            from,
            utm_source: params.get('utm_source'),
            utm_medium: params.get('utm_medium'),
            utm_campaign: params.get('utm_campaign')
        });
    }, []);

    useEffect(() => {
        if (!focusOnMountRef.current) return;
        formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        emailInputRef.current?.focus({ preventScroll: true });
    }, []);

    const switchView = (nextView) => {
        setView(nextView);
        setError('');
        setMessage('');
    };

    const startSignup = (nextRole) => {
        if (nextRole) setRole(nextRole);
        switchView('signup');
        focusForm();
    };

    const startUpgrade = (nextRole) => {
        rememberUpgradeIntent();
        setReason('upgrade');
        startSignup(nextRole);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            if (view === 'login') {
                await login(email, password);
                onAuthenticated?.();
            } else if (view === 'signup') {
                const details = {
                    signup_role: role,
                    exam_year: role === 'student' && examYear ? examYear : null,
                    marketing_opt_in: marketingOptIn,
                    marketing_opt_in_at: marketingOptIn ? new Date().toISOString() : null
                };
                const data = await signup(email, password, details);
                track('sign_up', { role, exam_year: details.exam_year, opt_in: marketingOptIn, reason });
                // With email confirmation off, the new session logs them straight in and the app moves on.
                if (data?.session) {
                    onAuthenticated?.();
                } else {
                    setMessage('Check your inbox for a link to confirm your email address, then log in here.');
                    setView('login');
                    setPassword('');
                }
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

    const tiers = [
        {
            key: 'free',
            name: 'Free account',
            price: '£0',
            period: '',
            points: [
                'The initial assessment',
                `${freeCount - 1 - freeMockCount} more quizzes and workshops`,
                `${freeMockCount} full mock exams`,
                'Your scores saved to your account'
            ],
            cta: 'Create free account',
            onClick: () => startSignup('student')
        },
        {
            key: 'pro',
            name: 'Pro',
            price: studentPlan.price,
            period: 'a year',
            highlight: true,
            points: [
                `All ${allItems.length - mockItems.length} quizzes, case studies and workshops`,
                `All ${mockItems.length} mock exams`,
                'Component 1 and 2 coursework guides and tick lists',
                'Track Sheet & Logbook creator',
                'Sonic Fingerprints production analysis'
            ],
            cta: 'Get Pro',
            onClick: () => startUpgrade('student')
        },
        {
            key: 'classroom',
            name: 'Classroom packs',
            price: classPlanSmall.price,
            period: `a year for ${classPlanSmall.seats} students`,
            points: [
                `${classPlanLarge.price} a year for ${classPlanLarge.seats} students`,
                'Pro for every student in the pack',
                'Teacher dashboard to track your class'
            ],
            cta: 'Get a classroom pack',
            onClick: () => startUpgrade('teacher')
        }
    ];

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
                    <span style={{
                        color: '#38bdf8',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem'
                    }}>
                        Edexcel A-level Music Technology
                    </span>
                    <h1 style={{
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                        lineHeight: '1.2'
                    }}>Music Tech Guru<br/>Revision App</h1>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
                        Find out where you stand for Components 3 and 4, then revise exactly what you need: interactive quizzes, mock exams with real audio, and coursework guides.
                    </p>

                    {assessment && (
                        <div style={{ marginBottom: '1.75rem' }}>
                            <button
                                type="button"
                                onClick={() => onSelectPreview?.(assessment)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    width: '100%',
                                    maxWidth: '340px',
                                    padding: '14px 22px',
                                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 18px rgba(37, 99, 235, 0.35)'
                                }}
                            >
                                Try the initial assessment <span aria-hidden="true">→</span>
                            </button>
                            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Free · {questionCount(assessment)} questions · no account needed
                            </p>
                        </div>
                    )}

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

                    <a
                        href="#free-practice"
                        style={{ marginTop: '1.25rem', color: '#38bdf8', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}
                    >
                        Or try {freeCount - 1} more free quizzes and mock exams ↓
                    </a>

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

                {/* Account Panel */}
                <div ref={formPanelRef} style={{
                    flex: '1 1 300px',
                    minWidth: 0,
                    maxWidth: '100%',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    scrollMarginTop: '16px'
                }}>
                    {view !== 'forgot' && (
                        <div role="group" aria-label="Account" style={{
                            display: 'flex',
                            gap: '4px',
                            background: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: '10px',
                            padding: '4px',
                            marginBottom: '1.25rem'
                        }}>
                            {[['signup', 'Create free account'], ['login', 'Log in']].map(([key, label]) => (
                                <button
                                    key={key}
                                    type="button"
                                    aria-pressed={view === key}
                                    onClick={() => switchView(key)}
                                    style={{
                                        flex: 1,
                                        padding: '10px 8px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        background: view === key ? 'var(--accent-blue)' : 'transparent',
                                        color: view === key ? '#fff' : 'var(--text-secondary)'
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                        {view === 'login' ? 'Welcome back' : view === 'signup' ? 'Create your free account' : 'Reset password'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {view === 'login' ? 'Log in to continue.' : view === 'signup' ? 'Save your scores and pick up where you left off on any device.' : 'Enter your email to reset your password.'}
                    </p>

                    {reason === 'upgrade' && view !== 'forgot' && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            color: '#bae6fd',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            lineHeight: 1.5
                        }}>
                            {view === 'login'
                                ? "Log in and you'll go straight back to the plans to finish checkout."
                                : "Create your free account first, then you'll go straight back to the plans to finish checkout."}
                        </div>
                    )}

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
                            <label htmlFor="auth-email" style={labelStyle}>Email</label>
                            <input
                                id="auth-email"
                                ref={emailInputRef}
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {view !== 'forgot' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label htmlFor="auth-password" style={labelStyle}>Password</label>
                                    {view === 'login' && (
                                        <button
                                            type="button"
                                            onClick={() => switchView('forgot')}
                                            style={{ ...linkButtonStyle, fontSize: '0.75rem', fontWeight: 'normal' }}
                                        >
                                            Forgot?
                                        </button>
                                    )}
                                </div>
                                <input
                                    id="auth-password"
                                    type="password"
                                    autoComplete={view === 'signup' ? 'new-password' : 'current-password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        )}

                        {view === 'signup' && (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span id="signup-role-label" style={labelStyle}>I am a</span>
                                    <div role="group" aria-labelledby="signup-role-label" style={{ display: 'flex', gap: '6px' }}>
                                        {ROLES.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                aria-pressed={role === option.value}
                                                onClick={() => setRole(option.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px 6px',
                                                    borderRadius: '8px',
                                                    border: role === option.value ? '1px solid var(--accent-blue)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                    background: role === option.value ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                                                    color: role === option.value ? '#fff' : 'var(--text-secondary)',
                                                    fontSize: '0.88rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {role === 'student' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label htmlFor="signup-exam-year" style={labelStyle}>Which year are you in? (optional)</label>
                                        <select
                                            id="signup-exam-year"
                                            value={examYear}
                                            onChange={(e) => setExamYear(e.target.value)}
                                            style={{ ...inputStyle, colorScheme: 'dark' }}
                                        >
                                            <option value="">Choose…</option>
                                            {EXAM_YEARS.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={marketingOptIn}
                                        onChange={(e) => setMarketingOptIn(e.target.checked)}
                                        style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0, accentColor: 'var(--accent-blue)' }}
                                    />
                                    <span>Email me revision tips, new resources and offers. This is optional, and you can unsubscribe at any time.</span>
                                </label>
                            </>
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
                            {loading || isSubmitting ? 'Please wait…' : view === 'login' ? 'Log in' : view === 'signup' ? 'Create free account' : 'Send reset link'}
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

                    {view === 'forgot' && (
                        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Remember your password?{' '}
                            <button type="button" onClick={() => switchView('login')} style={linkButtonStyle}>
                                Log in
                            </button>
                        </p>
                    )}

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

            {/* Free Practice: open any of these without an account */}
            <section id="free-practice" style={{ ...sectionStyle, scrollMarginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#f8fafc' }}>More free practice</h2>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No account needed</span>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                    gap: '12px'
                }}>
                    {FEATURED_FREE.map(card => (
                        <a
                            key={card.id}
                            href={`/?quiz=${encodeURIComponent(card.id)}`}
                            onClick={(e) => {
                                if (onSelectPreview) {
                                    e.preventDefault();
                                    onSelectPreview(card.item);
                                }
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                padding: '14px 16px',
                                background: 'var(--bg-panel)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#38bdf8' }}>
                                {card.kicker}
                            </span>
                            <strong style={{ fontSize: '0.98rem' }}>{card.title}</strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {questionCount(card.item) ? `${questionCount(card.item)} questions · Free` : 'Free'}
                            </span>
                        </a>
                    ))}
                </div>

                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                    <button
                        type="button"
                        onClick={() => setShowSyllabus(prev => !prev)}
                        aria-expanded={showSyllabus}
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
                        <span>{showSyllabus ? 'Hide the full course' : `See the full course: ${allItems.length} quizzes and mocks, ${freeCount} free`}</span>
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
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
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
            </section>

            {/* Free vs Pro */}
            <section aria-labelledby="pricing-heading" style={sectionStyle}>
                <h2 id="pricing-heading" style={{ fontSize: '1.3rem', margin: '0 0 4px', color: '#f8fafc' }}>
                    Free to start. {studentPlan.price} a year for everything.
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 14px' }}>
                    Secure payment by Stripe. Cancel any time.
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '12px'
                }}>
                    {tiers.map(tier => (
                        <div
                            key={tier.key}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '18px',
                                background: tier.highlight ? 'linear-gradient(160deg, rgba(59, 130, 246, 0.16) 0%, var(--bg-panel) 70%)' : 'var(--bg-panel)',
                                border: tier.highlight ? '1px solid rgba(59, 130, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <h3 style={{ margin: '0 0 6px', fontSize: '1rem', color: 'var(--text-secondary)' }}>{tier.name}</h3>
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc' }}>{tier.price}</span>
                                {tier.period && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}> {tier.period}</span>}
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                {tier.points.map(point => (
                                    <li key={point} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', lineHeight: 1.45, color: '#e2e8f0' }}>
                                        <span aria-hidden="true" style={{ color: 'var(--accent-success)', flexShrink: 0 }}>✓</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={tier.onClick}
                                style={{
                                    padding: '11px 14px',
                                    borderRadius: '10px',
                                    border: tier.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.18)',
                                    background: tier.highlight ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Student & Parent Testimonials & 1-on-1 Tutor Showcase */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                marginTop: '24px',
                marginBottom: '40px',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(17, 24, 39, 0.9) 100%)',
                border: '1px solid rgba(0, 193, 240, 0.35)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 193, 240, 0.1)',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
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
