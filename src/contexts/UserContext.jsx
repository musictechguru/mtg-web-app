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
    const [userProgress, setUserProgress] = useState({
        totalScore: 0,
        quizzesCompleted: 0,
        history: [],
        mastery: {},
        campaignCompleted: []
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
                .select('is_premium, role, licenses_total, licenses_used, teacher_id, full_name')
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
                    return {
                        ...prev,
                        is_premium: profileData.is_premium,
                        role: profileData.role || 'student',
                        licenses_total: profileData.licenses_total || 0,
                        licenses_used: profileData.licenses_used || 0,
                        teacher_id: profileData.teacher_id || null,
                        full_name: profileData.full_name || ''
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
        if (!currentUser) return;

        const currentCampaign = userProgress.campaignCompleted || [];
        if (currentCampaign.includes(nodeId)) return;

        const updatedProgress = {
            ...userProgress,
            campaignCompleted: [...currentCampaign, nodeId]
        };

        setUserProgress(updatedProgress);

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

    const fetchClassProgress = async () => {
        if (!currentUser || currentUser.role !== 'teacher') return [];

        try {
            const { data, error } = await supabase.rpc('get_teacher_class_progress');
            if (error) throw error;
            return data;
        } catch (err) {
            console.error("Error fetching class progress:", err);
            return [];
        }
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
        logout,
        resetPassword,
        resendVerification,
        updatePassword,
        updateProfileName,
        needsPasswordReset,
        saveQuizResult,
        clearProgress,
        completeCampaignNode,
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
