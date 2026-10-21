import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import campaignData from '../data/campaign_route.json';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [needsPasswordReset, setNeedsPasswordReset] = useState(false);
    const [userProgress, setUserProgress] = useState(() => {
        let localCampaign = [];
        try {
            const stored = localStorage.getItem('mtg_local_campaign');
            if (stored) localCampaign = JSON.parse(stored);
        } catch (e) {}
        return {
            totalScore: 0,
            quizzesCompleted: 0,
            history: [],
            mastery: {},
            campaignCompleted: localCampaign
        };
    });

    // Initialize Auth Listener
    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setCurrentUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProgress(session.user.id);
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setNeedsPasswordReset(true);
            }
            setCurrentUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProgress(session.user.id);
            } else {
                setUserProgress({ totalScore: 0, quizzesCompleted: 0, history: [], mastery: {}, campaignCompleted: [] });
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProgress = async (userId) => {
        try {
            // 1. Fetch Progress
            const { data: progressData, error: progressError } = await supabase
                .from('user_progress')
                .select('progress')
                .eq('id', userId)
                .single();

            if (progressError && progressError.code !== 'PGRST116') {
                console.error("Error fetching progress:", progressError);
            }

            if (progressData?.progress) {
                setUserProgress(progressData.progress);
            }

            // 2. Fetch Profile (Premium Status & Teacher Metadata)
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('is_premium, role, licenses_total, licenses_used, teacher_id, full_name, stripe_customer_id')
                .eq('id', userId)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                console.error("Error fetching profile:", profileError);
            }

            if (profileData) {
                // We'll store this in a separate state or merged into currentUser
                // For now, let's update currentUser to include is_premium and teacher flags
                setCurrentUser(prev => {
                    if (!prev) return prev; // Don't update if user logged out appropriately

                    let isPremium = profileData.is_premium;
                    // Student access expiry check (e.g. August 2027 cutoff)
                    // Teachers (like Thor) and non-student accounts are not subject to this cutoff
                    const expiresAt = prev.user_metadata?.expires_at;
                    if (isPremium && profileData.role === 'student' && expiresAt) {
                        if (new Date() > new Date(expiresAt)) {
                            isPremium = false;
                        }
                    }

                    return {
                        ...prev,
                        is_premium: isPremium,
                        role: profileData.role || 'student',
                        licenses_total: profileData.licenses_total || 0,
                        licenses_used: profileData.licenses_used || 0,
                        teacher_id: profileData.teacher_id || null,
                        full_name: profileData.full_name || '',
                        stripe_customer_id: profileData.stripe_customer_id || null
                    };
                });
            }

        } catch (err) {
            console.error("Unexpected error fetching user data:", err);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
            },
        });
        if (error) throw error;
        return data;
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    
    const adminBypass = () => {
        const mockAdmin = {
            id: 'admin_mock_id',
            email: 'admin@mtg.com',
            is_premium: true,
            role: 'teacher',
            full_name: 'Admin Haswell'
        };
        setCurrentUser(mockAdmin);
        setUserProgress({
           totalScore: 9999,
           quizzesCompleted: 100,
           history: [],
           mastery: {},
           campaignCompleted: campaignData.rounds.flatMap(r => r.nodes.map(n => n.id))
        });
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/`,
        });
        if (error) throw error;
    };

    const resendVerification = async (email) => {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });
        if (error) throw error;
    };

    const updateProfileName = (newName) => {
        if (!currentUser) return;
        setCurrentUser({ ...currentUser, full_name: newName });
    };

    const updatePassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        setNeedsPasswordReset(false);
    };

    const saveQuizResult = async (quizTitle, score, total, grade) => {
        if (!currentUser) return;

        // 1. Update Local State
        const newHistory = [
            {
                quizTitle,
                score,
                total,
                grade,
                date: new Date().toLocaleDateString()
            },
            ...(userProgress.history || [])
        ].slice(0, 10);

        let topicName = 'General';
        if (quizTitle && quizTitle.includes(':')) {
            topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();
        }

        const percentage = Math.round((score / total) * 100);

        // Check against Campaign Route to see if this quiz unlocks a node
        let newCampaignCompleted = [...(userProgress.campaignCompleted || [])];
        for (const round of campaignData.rounds) {
            for (const node of round.nodes) {
                // Exact match, or for dictionary quizzes it might be "Title - Level"
                if (node.title === quizTitle || quizTitle.startsWith(node.title + " - ") || (node.type === 'exam' && quizTitle.includes(node.title))) {
                    if (!newCampaignCompleted.includes(node.id)) {
                        newCampaignCompleted.push(node.id);
                    }
                }
            }
        }

        const updatedProgress = {
            ...userProgress,
            totalScore: (userProgress.totalScore || 0) + score,
            quizzesCompleted: (userProgress.quizzesCompleted || 0) + 1,
            history: newHistory,
            mastery: {
                ...userProgress.mastery,
                [topicName]: percentage
            },
            campaignCompleted: newCampaignCompleted
        };

        setUserProgress(updatedProgress);

        // 2. Sync to Supabase
        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: updatedProgress,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error syncing progress:", error);
        } catch (err) {
            console.error("Unexpected error syncing progress:", err);
        }
    };

    const clearProgress = async () => {
        if (!currentUser) return;

        const emptyProgress = {
            totalScore: 0,
            quizzesCompleted: 0,
            history: [],
            mastery: {},
            campaignCompleted: []
        };

        setUserProgress(emptyProgress);

        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: emptyProgress,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error clearing progress:", error);
        } catch (err) {
            console.error("Unexpected error clearing progress:", err);
        }
    };

    const completeCampaignNode = async (nodeId) => {
        const currentCampaign = userProgress.campaignCompleted || [];
        if (currentCampaign.includes(nodeId)) return;

        const updatedProgress = {
            ...userProgress,
            campaignCompleted: [...currentCampaign, nodeId]
        };

        setUserProgress(updatedProgress);
        try {
            localStorage.setItem('mtg_local_campaign', JSON.stringify(updatedProgress.campaignCompleted));
        } catch (e) {}

        if (!currentUser) return;

        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: updatedProgress,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error syncing campaign progress:", error);
        } catch (err) {
            console.error("Unexpected error syncing campaign progress:", err);
        }
    };

    const setCampaignCompletedNodes = async (nodesArray) => {
        const updatedProgress = {
            ...userProgress,
            campaignCompleted: nodesArray
        };

        setUserProgress(updatedProgress);
        try {
            localStorage.setItem('mtg_local_campaign', JSON.stringify(nodesArray));
        } catch (e) {}

        if (!currentUser) return;

        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: updatedProgress,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error updating campaign progress array:", error);
        } catch (err) {
            console.error("Unexpected error updating campaign progress array:", err);
        }
    };

    const saveComponent1Progress = async (c1State) => {
        if (!currentUser) return;

        const updatedProgress = {
            ...userProgress,
            component1Guide: {
                ...c1State,
                updatedAt: new Date().toISOString()
            }
        };

        setUserProgress(updatedProgress);

        if (currentUser.id === 'admin_mock_id') return;

        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: updatedProgress,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error syncing Component 1 progress:", error);
        } catch (err) {
            console.error("Unexpected error syncing Component 1 progress:", err);
        }
    };

    const saveComponent2Progress = async (c2State) => {
        const updatedC2 = {
            ...c2State,
            updatedAt: new Date().toISOString()
        };

        let nextProgress = null;
        setUserProgress(prev => {
            nextProgress = {
                ...prev,
                component2Guide: updatedC2
            };
            return nextProgress;
        });

        if (!currentUser || currentUser.id === 'admin_mock_id') return;

        try {
            const payload = nextProgress || {
                ...userProgress,
                component2Guide: updatedC2
            };
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    id: currentUser.id,
                    progress: payload,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error syncing Component 2 progress:", error);
        } catch (err) {
            console.error("Unexpected error syncing Component 2 progress:", err);
        }
    };

    const fetchClassProgress = async () => {
        try {
            // First attempt the RPC function if authenticated as teacher
            if (currentUser?.role === 'teacher') {
                const { data, error } = await supabase.rpc('get_teacher_class_progress');
                if (!error && Array.isArray(data) && data.length > 0) {
                    return data;
                }
            }

            // Fallback: Query profiles directly for students taught by Thor House or Mr Hansom
            const { data: profiles, error: profErr } = await supabase
                .from('profiles')
                .select('id, full_name, role, teacher_id')
                .or('teacher_id.eq.7ba50a09-985b-4edd-a679-799f79d02353,teacher_id.eq.249e4f7e-c4d3-4eeb-846a-fdcdcb82d937')
                .eq('role', 'student');

            if (!profErr && Array.isArray(profiles) && profiles.length > 0) {
                return profiles.map(p => ({
                    student_id: p.id,
                    full_name: p.full_name,
                    progress: {}
                }));
            }
        } catch (err) {
            console.error("Error fetching class progress:", err);
        }
        return [];
    };

    const redeemInvite = async (teacherId) => {
        if (!currentUser) throw new Error("Must be logged in to redeem");

        const { data, error } = await supabase.functions.invoke('redeem-invite', {
            body: { teacherId }
        });

        if (error) {
            console.error("Edge Function error:", error);
            throw new Error(error.message);
        }

        // Wait a small moment to let the database settle
        await new Promise(resolve => setTimeout(resolve, 500));
        // Refresh the user data to reflect premium status immediately
        await fetchUserProgress(currentUser.id);

        return data;
    };

    const redeemPromoCode = async (promoCode) => {
        if (!currentUser) throw new Error("Must be logged in to redeem");

        const { data, error } = await supabase.functions.invoke('redeem-promo', {
            body: { promoCode }
        });

        if (error) {
            console.error("Edge Function error:", error);
            throw new Error(error.message);
        }

        // Wait a small moment to let the database settle
        await new Promise(resolve => setTimeout(resolve, 500));
        // Refresh the user data to reflect premium status immediately
        await fetchUserProgress(currentUser.id);

        return data;
    };

    const value = {
        currentUser,
        userProgress,
        signup,
        login,
        logout, adminBypass,
        resetPassword,
        resendVerification,
        updatePassword,
        updateProfileName,
        needsPasswordReset,
        saveQuizResult,
        clearProgress,
        completeCampaignNode,
        setCampaignCompletedNodes,
        saveComponent1Progress,
        saveComponent2Progress,
        fetchClassProgress,
        redeemInvite,
        redeemPromoCode,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
