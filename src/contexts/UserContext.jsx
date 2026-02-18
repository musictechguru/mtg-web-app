import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Current authenticated user (Firebase object)
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Local state for immediate UI updates, eventually synced with Firestore
    const [localProgress, setLocalProgress] = useState(() => {
        const saved = localStorage.getItem('mtg_local_progress');
        return saved ? JSON.parse(saved) : {};
    });

    // Listen to Firebase Auth state
    useEffect(() => {
        if (!auth) {
            // Mock Auth Initialization
            const savedUser = localStorage.getItem('mtg_mock_user');
            if (savedUser) {
                setCurrentUser(JSON.parse(savedUser));
            }
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user && db) {
                // Fetch user progress from Firestore
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Update local state with cloud data
                        setLocalProgress(prev => ({
                            ...prev,
                            [user.uid]: userData.progress || {
                                totalScore: 0,
                                quizzesCompleted: 0,
                                history: [],
                                mastery: {}
                            }
                        }));
                    } else {
                        // Create initial document for new user if it doesn't exist
                        // We might want to respect local storage if it has data for this user ID (rare case of offline creation)
                        // For now, start fresh or keep what's in local state if anything
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);
                }
            }

            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Persist local progress to LocalStorage (backup/offline)
    useEffect(() => {
        localStorage.setItem('mtg_local_progress', JSON.stringify(localProgress));
    }, [localProgress]);

    const signup = async (email, password, displayName) => {
        if (!auth) {
            // Mock Signup
            const mockUser = {
                uid: 'mock_' + Date.now(),
                email,
                displayName,
                emailVerified: false
            };
            setCurrentUser(mockUser);
            localStorage.setItem('mtg_mock_user', JSON.stringify(mockUser));

            // Init local progress
            setLocalProgress(prev => ({
                ...prev,
                [mockUser.uid]: {
                    totalScore: 0,
                    quizzesCompleted: 0,
                    history: [],
                    mastery: {}
                }
            }));
            return mockUser;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });

        // Initialize user in Firestore
        if (db) {
            try {
                const initialProgress = {
                    totalScore: 0,
                    quizzesCompleted: 0,
                    history: [],
                    mastery: {}
                };

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    displayName,
                    email,
                    createdAt: serverTimestamp(),
                    progress: initialProgress
                });

                setLocalProgress(prev => ({
                    ...prev,
                    [userCredential.user.uid]: initialProgress
                }));
            } catch (error) {
                console.error("Error creating user document:", error);
            }
        }

        return userCredential.user;
    };

    const login = (email, password) => {
        if (!auth) {
            // Mock Login (accepts anything)
            const mockUser = {
                uid: 'mock_user_123',
                email,
                displayName: 'Dev User',
                emailVerified: true
            };
            setCurrentUser(mockUser);
            localStorage.setItem('mtg_mock_user', JSON.stringify(mockUser));
            return Promise.resolve(mockUser);
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        if (!auth) {
            setCurrentUser(null);
            localStorage.removeItem('mtg_mock_user');
            return Promise.resolve();
        }
        return signOut(auth);
    };

    // Helper to get progress for specific user
    const getUserProgress = () => {
        if (!currentUser) return null;
        return localProgress[currentUser.uid] || {
            totalScore: 0,
            quizzesCompleted: 0,
            history: [],
            mastery: {}
        };
    };

    const saveQuizResult = async (quizTitle, score, total, grade) => {
        if (!currentUser) return;

        const userId = currentUser.uid;
        let updatedProfile = null;

        // 1. Update Local State (Optimistic UI)
        setLocalProgress(prev => {
            const userProfile = prev[userId] || {
                totalScore: 0,
                quizzesCompleted: 0,
                history: [],
                mastery: {}
            };

            const newHistory = [
                {
                    quizTitle,
                    score,
                    total,
                    grade,
                    date: new Date().toLocaleDateString()
                },
                ...(userProfile.history || [])
            ].slice(0, 10);

            let topicName = 'General';
            if (quizTitle && quizTitle.includes(':')) {
                topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();
            }

            const percentage = Math.round((score / total) * 100);

            updatedProfile = {
                ...userProfile,
                totalScore: (userProfile.totalScore || 0) + score,
                quizzesCompleted: (userProfile.quizzesCompleted || 0) + 1,
                history: newHistory,
                mastery: {
                    ...userProfile.mastery,
                    [topicName]: percentage
                }
            };

            return {
                ...prev,
                [userId]: updatedProfile
            };
        });

        // 2. Sync to Firestore
        if (db && updatedProfile) {
            try {
                const userDocRef = doc(db, "users", userId);
                await setDoc(userDocRef, {
                    progress: updatedProfile,
                    lastUpdated: serverTimestamp()
                }, { merge: true });
                console.log("Progress synced to Firestore");
            } catch (error) {
                console.error("Error syncing progress to Firestore:", error);
            }
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

        // Update Local
        setLocalProgress(prev => ({
            ...prev,
            [currentUser.uid]: emptyProgress
        }));

        // Update Firestore
        if (db) {
            try {
                const userDocRef = doc(db, "users", currentUser.uid);
                await setDoc(userDocRef, {
                    progress: emptyProgress,
                    lastUpdated: serverTimestamp()
                }, { merge: true });
            } catch (error) {
                console.error("Error clearing progress in Firestore:", error);
            }
        }
    };

    const value = {
        currentUser,
        userProgress: getUserProgress(),
        signup,
        login,
        logout,
        saveQuizResult,
        clearProgress,
        loading,
        isMock: !auth
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
};
