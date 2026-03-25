import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../config/supabase';
import LegalModals from './LegalModals';

const ProfileSettings = ({ onClose }) => {
    const { currentUser, logout, updateProfileName } = useUser();
    const [fullName, setFullName] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    
    // Legal Modals State
    const [legalType, setLegalType] = useState(null);

    useEffect(() => {
        // Fetch current profile name
        const fetchProfile = async () => {
            if (!currentUser) return;
            const { data } = await supabase.from('profiles').select('full_name').eq('id', currentUser.id).single();
            if (data?.full_name) {
                setFullName(data.full_name);
            }
        };
        fetchProfile();
    }, [currentUser]);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', currentUser.id);
            if (error) throw error;
            updateProfileName(fullName);
            setMessage('Profile updated successfully!');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setMessage('Error saving profile: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleManageSubscription = async () => {
        setSaving(true);
        setMessage('');
        try {
            const { data, error } = await supabase.functions.invoke('create-portal-session');
            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Could not generate portal link');
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', 
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="modal-content" style={{
                background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', 
                maxWidth: '400px', width: '90%', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h2 style={{ marginBottom: '20px', color: 'var(--accent-blue)' }}>Profile Settings</h2>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        style={{
                            width: '100%', padding: '12px', borderRadius: '8px',
                            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white', fontSize: '1rem'
                        }}
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                        This is the name your teacher will see on their dashboard.
                    </p>
                </div>

                {message && (
                    <div style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', 
                        background: message.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: message.includes('Error') ? '#ef4444' : '#10b981', fontSize: '0.9rem'
                    }}>
                        {message}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="btn-primary" 
                        style={{ flex: 1, padding: '12px' }}
                    >
                        {saving ? 'Saving...' : 'Save Name'}
                    </button>
                    <button 
                        onClick={onClose} 
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px' }}
                    >
                        Cancel
                    </button>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '25px 0' }} />

                {currentUser?.is_premium && !currentUser?.teacher_id && (
                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Subscription Management</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                            You have an active premium subscription. Use the portal below to update your payment method or cancel your subscription.
                        </p>
                        <button 
                            onClick={handleManageSubscription}
                            disabled={saving}
                            style={{ 
                                width: '100%', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', 
                                border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3b82f6', 
                                borderRadius: '8px', cursor: 'pointer', fontWeight: '600' 
                            }}
                        >
                            {saving ? 'Connecting...' : 'Manage Subscription'}
                        </button>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '25px 0' }} />
                    </div>
                )}
                
                <button 
                    onClick={handleLogout}
                    style={{ width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Log Out
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <span onClick={() => setLegalType('privacy')} style={{ cursor: 'pointer' }}>Privacy Policy</span>
                    <span onClick={() => setLegalType('terms')} style={{ cursor: 'pointer' }}>Terms of Service</span>
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

export default ProfileSettings;
