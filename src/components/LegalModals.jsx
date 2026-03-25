import React, { useState } from 'react';

const LegalModals = ({ isOpen, type, onClose }) => {
    if (!isOpen) return null;

    const content = {
        privacy: {
            title: 'Privacy Policy',
            sections: [
                {
                    heading: '1. Information We Collect',
                    text: 'We collect information you provide directly to us when you create an account, such as your full name and email address. We also collect "Performance Data" which includes your quiz scores, progress, completion history, and mastery levels to help you and your teachers track your educational journey.'
                },
                {
                    heading: '2. How We Use Information',
                    text: 'We use your information to provide, maintain, and improve our services, including personalizing your learning experience and providing progress reports to authorized teachers/educational institutions linked to your account.'
                },
                {
                    heading: '3. Data Sharing & Processors',
                    text: 'We do not sell your personal data. we use trusted third-party processors to help us provide our service:\n\n• Supabase: Used for secure authentication and database storage.\n• Stripe: Used for secure payment processing (if applicable).\n• Vercel: Used for hosting our web application.'
                },
                {
                    heading: '4. Security',
                    text: 'We take data security seriously. All data is encrypted in transit using SSL/TLS encryption. We implement industry-standard security measures to protect your information from unauthorized access.'
                },
                {
                    heading: '5. Your Rights & Data Retention',
                    text: 'You have the right to access, update, or delete your personal information. You can manage your profile name in the settings or request full account deletion. We retain your data for as long as your account is active.'
                },
                {
                    heading: '6. GDPR & UK GDPR Compliance',
                    text: 'Music Tech Guru is committed to GDPR compliance. We act as a Data Processor for educational institutions and follow strict data protection guidelines as required by UK law.'
                }
            ]
        },
        terms: {
            title: 'Terms of Service',
            sections: [
                {
                    heading: '1. Acceptance of Terms',
                    text: 'By accessing or using the Music Tech Guru app, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use the service.'
                },
                {
                    heading: '2. User Accounts',
                    text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.'
                },
                {
                    heading: '3. Educational Use',
                    text: 'This service is designed for educational purposes. Users are expected to use the platform in a respectful manner. Any attempt to abuse or disrupt the service may lead to account termination.'
                },
                {
                    heading: '4. Subscriptions & Licenses',
                    text: 'Access to premium features requires a valid individual or classroom subscription. Licenses are non-transferable unless expressly authorized by Music Tech Guru.'
                },
                {
                    heading: '5. Intellectual Property',
                    text: 'All content including quizzes, media, and text are the intellectual property of Music Tech Guru. You may not reproduce or distribute this content without permission.'
                },
                {
                    heading: '6. Limitation of Liability',
                    text: 'Music Tech Guru is provided "as is" without warranties of any kind. We are not liable for any indirect or consequential damages arising from your use of the service.'
                }
            ]
        }
    };

    const activeContent = content[type] || content.privacy;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)', zIndex: 10000, display: 'flex',
            justifyContent: 'center', alignItems: 'center', padding: '20px'
        }} onClick={onClose}>
            <div className="modal-content" style={{
                background: 'var(--bg-panel)', padding: '30px', borderRadius: '20px',
                maxWidth: '700px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', position: 'sticky', top: 0, background: 'var(--bg-panel)', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 style={{ margin: 0, color: 'var(--accent-blue)', fontSize: '1.8rem' }}>{activeContent.title}</h2>
                    <button onClick={onClose} style={{ 
                        background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', 
                        width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {activeContent.sections.map((section, idx) => (
                        <div key={idx} style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.1rem' }}>{section.heading}</h3>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{section.text}</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <button onClick={onClose} className="btn-primary" style={{ padding: '12px 40px' }}>
                        I Understand
                    </button>
                </div>
                
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '20px', opacity: 0.6 }}>
                    Music Tech Guru • Educational Compliance 2026
                </p>
            </div>
        </div>
    );
};

export default LegalModals;
