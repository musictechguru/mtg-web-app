import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProgress, setUserProgress] = useState({
        totalScore: 0,
        quizzesCompleted: 0,
        history: [],
        mastery: {}
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

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ?? null);
            if (session?.user) {
                fetchUserProgress(session.user.id);
            } else {
                setUserProgress({ totalScore: 0, quizzesCompleted: 0, history: [], mastery: {} });
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProgress = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('user_progress')
                .select('progress')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
                console.error("Error fetching progress:", error);
            }

            if (data?.progress) {
                setUserProgress(data.progress);
            }
        } catch (err) {
            console.error("Unexpected error fetching progress:", err);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
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

        const updatedProgress = {
            ...userProgress,
            totalScore: (userProgress.totalScore || 0) + score,
            quizzesCompleted: (userProgress.quizzesCompleted || 0) + 1,
            history: newHistory,
            mastery: {
                ...userProgress.mastery,
                [topicName]: percentage
            }
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
            mastery: {}
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

    const value = {
        currentUser,
        userProgress,
        signup,
        login,
        logout,
        saveQuizResult,
        clearProgress,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
