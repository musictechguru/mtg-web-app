import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../config/supabase';

const ProfileSettings = ({ onClose }) => {
    const { currentUser, logout } = useUser();
    const [fullName, setFullName] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

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
                
                <button 
                    onClick={handleLogout}
                    style={{ width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
