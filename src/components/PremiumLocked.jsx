import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { useUser } from '../contexts/UserContext';

const PremiumLocked = ({ itemTitle }) => {
    const { redeemPromoCode } = useUser();
    const [loadingPlan, setLoadingPlan] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState(null);
    const [redeeming, setRedeeming] = useState(false);

    const handleUpgrade = async (priceId, seats = 1, planType = 'classroom') => {
        try {
            setLoadingPlan(priceId);
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: { 
                    priceId: priceId, 
                    checkoutType: planType, 
                    quantity: 1, 
                    seats: seats 
                },
            });

            if (error) {
                console.error("Error creating checkout session:", error);
                alert("Could not initialize checkout. Please try again.");
                return;
            }

            if (data?.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred.");
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: '40px 20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>

                {/* Guru Image */}
                <div style={{
                    marginBottom: '30px',
                    borderRadius: '50%',
                    padding: '8px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
                }}>
                    <img
                        src={`${import.meta.env.BASE_URL}images/guru_logo.png`}
                        alt="MTG Guru"
                        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                    <div style={{ display: 'none', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', fontSize: '3rem' }}>🧙‍♂️</div>
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    Unlock Your Full Potential
                </h1>

                <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#94a3b8', maxWidth: '600px', lineHeight: '1.6' }}>
                    {itemTitle ? `The item "${itemTitle}" is reserved for Premium Members.` : "You've discovered premium content."} Upgrade now to master the Edexcel Music Technology A-Level with the Guru's complete toolkit.
                </p>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    width: '100%',
                    marginBottom: '40px',
                    textAlign: 'left'
                }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>📚</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#f8fafc' }}>Complete Exam Access</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>Unlock every Component 3 and Component 4 practice exam across all genres.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🎯</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#f8fafc' }}>Advanced Quizzes</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>Access stage 3 and 4 intensive practical quizzes like Synthesizer and Effects Chains.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>📈</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#f8fafc' }}>Detailed Analytics</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>Track your mastery progress comprehensively across every topic to guarantee top marks.</p>
                    </div>
                </div>

                {/* Upgrade Button Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    width: '100%',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    maxWidth: '900px'
                }}>
                    {/* Student Plan */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '30px',
                        borderRadius: '16px',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        flex: '1',
                        minWidth: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '10px' }}>Student Plan</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#e2e8f0' }}>
                                £12.99 <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal' }}>/ 3 Months</span>
                            </div>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loadingPlan ? 'not-allowed' : 'pointer',
                                opacity: loadingPlan ? 0.7 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onMouseOver={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.6)'; } }}
                            onMouseOut={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)'; } }}
                            onClick={() => handleUpgrade('price_1T9TUwLxDAAultYKsA9ZV4q1', 1, 'standard')}
                            disabled={loadingPlan !== null}
                        >
                            {loadingPlan === 'price_1T9TUwLxDAAultYKsA9ZV4q1' ? (
                                <>
                                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                    </svg>
                                    Preparing Checkout...
                                </>
                            ) : (
                                <>
                                    <span>Get Student Plan</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* 5 Student Pack */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '30px',
                        borderRadius: '16px',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        flex: '1',
                        minWidth: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '10px' }}>5 Student Pack</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#e2e8f0' }}>
                                £50 <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal' }}>/ Year</span>
                            </div>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loadingPlan ? 'not-allowed' : 'pointer',
                                opacity: loadingPlan ? 0.7 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onMouseOver={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)'; } }}
                            onMouseOut={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)'; } }}
                            onClick={() => handleUpgrade('price_1TBY9LLxDAAultYKd6OrgvvY', 5, 'classroom')}
                            disabled={loadingPlan !== null}
                        >
                            {loadingPlan === 'price_1TBY9LLxDAAultYKd6OrgvvY' ? (
                                <>
                                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                    </svg>
                                    Preparing Checkout...
                                </>
                            ) : (
                                <>
                                    <span>Get 5 Student Pack</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* 10 Student Plan */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '30px',
                        borderRadius: '16px',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        flex: '1',
                        minWidth: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '10px' }}>10 Student Pack</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#e2e8f0' }}>
                                £100 <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal' }}>/ Year</span>
                            </div>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loadingPlan ? 'not-allowed' : 'pointer',
                                opacity: loadingPlan ? 0.7 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onMouseOver={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)'; } }}
                            onMouseOut={(e) => { if (!loadingPlan) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)'; } }}
                            onClick={() => handleUpgrade('price_1T9TUvLxDAAultYKPmTvNQh5', 10, 'classroom')}
                            disabled={loadingPlan !== null}
                        >
                            {loadingPlan === 'price_1T9TUvLxDAAultYKPmTvNQh5' ? (
                                <>
                                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                    </svg>
                                    Preparing Checkout...
                                </>
                            ) : (
                                <>
                                    <span>Get 10 Student Pack</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>

                {/* Promo Code Section */}
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h4 style={{ color: '#cbd5e1', marginBottom: '15px' }}>Have a Promo Code?</h4>
                    <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="Enter Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            style={{
                                flex: 1, padding: '12px', borderRadius: '8px', 
                                border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', 
                                color: 'white', fontSize: '1rem', textTransform: 'uppercase'
                            }}
                        />
                        <button 
                            onClick={async () => {
                                if (!promoCode.trim()) return;
                                setRedeeming(true);
                                setPromoMessage(null);
                                try {
                                    await redeemPromoCode(promoCode.trim());
                                    setPromoMessage({ type: 'success', text: 'Premium Unlocked! Refreshing...' });
                                    setTimeout(() => window.location.reload(), 2000);
                                } catch (err) {
                                    setPromoMessage({ type: 'error', text: err.message || 'Invalid code' });
                                } finally {
                                    setRedeeming(false);
                                }
                            }}
                            disabled={redeeming || !promoCode.trim()}
                            style={{
                                padding: '0 20px', borderRadius: '8px', background: 'var(--accent-success)', 
                                color: 'white', border: 'none', fontWeight: 'bold', cursor: (redeeming || !promoCode.trim()) ? 'not-allowed' : 'pointer',
                                opacity: (redeeming || !promoCode.trim()) ? 0.5 : 1
                            }}
                        >
                            {redeeming ? 'Checking...' : 'Apply'}
                        </button>
                    </div>
                    {promoMessage && (
                        <div style={{ 
                            marginTop: '10px', fontSize: '0.9rem', 
                            color: promoMessage.type === 'error' ? 'var(--accent-error)' : 'var(--accent-success)' 
                        }}>
                            {promoMessage.text}
                        </div>
                    )}
                </div>
                
                <p style={{ marginTop: '30px', fontSize: '0.85rem', color: '#64748b' }}>
                    Secure payment powered by Stripe. Cancel anytime. <br />
                    Already a member? <span style={{ textDecoration: 'underline', color: '#94a3b8', cursor: 'pointer' }} onClick={() => window.location.reload()}>Refresh page</span>
                </p>
            </div>
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default PremiumLocked;
