import React, { useState, useEffect } from 'react';
import './ProductionTechniqueQuiz.css';

const quizData = [
    {
        category: "Sidechain & Dynamics",
        scenario: "You have a massive trance synth chord progression, but it's overpowering the kick drum and making the mix muddy. You need the synth to rhythmically duck out of the way every time the kick hits.",
        options: [
            { text: "'Pumping' Sidechain Compression", correct: true },
            { text: "Multiband Expansion", correct: false },
            { text: "Parallel Compression", correct: false },
            { text: "Sidechain to Ghost Kick", correct: false }
        ],
        explanation: "Standard 'pumping' sidechain compression uses the kick drum to trigger a compressor on the synth, ducking its volume rhythmically to make space for the kick."
    },
    {
        category: "Sidechain & Dynamics",
        scenario: "You have a complex vocal layered over a dense bassline. You only want the sub-frequencies of the bassline to duck when the kick hits, leaving the mid-range of the bass unaffected.",
        options: [
            { text: "Standard Sidechain Compression", correct: false },
            { text: "Multiband Sidechain", correct: true },
            { text: "Limiting", correct: false },
            { text: "Sidechain to Ghost Kick", correct: false }
        ],
        explanation: "Multiband sidechain allows you to target specific frequency ranges (like the low-end) to duck, leaving other frequencies (like the mid-range texture) untouched for a cleaner mix."
    },
    {
        category: "Build-Up Techniques",
        scenario: "You want a dramatic build-up that creates tension before the drop. The synth chords start muffled and gradually become brighter and more aggressive as the drop approaches.",
        options: [
            { text: "Filter Automation (Low-pass opening)", correct: true },
            { text: "White noise riser sweeps", correct: false },
            { text: "Pitched snare/tom rolls", correct: false },
            { text: "Layered impact transition", correct: false }
        ],
        explanation: "Automating a low-pass filter's cutoff frequency from low to high over time is a classic way to build tension, slowly revealing the high frequencies before the climax."
    },
    {
        category: "Build-Up Techniques",
        scenario: "To add a rush of energy rushing into the drop, you need a rushing, airy sound that rises in pitch and intensity alongside the drum roll.",
        options: [
            { text: "Filter Automation", correct: false },
            { text: "White noise riser sweeps", correct: true },
            { text: "Layered impact transition", correct: false },
            { text: "Pitched snare/tom rolls", correct: false }
        ],
        explanation: "White noise sweeps or risers use filtered noise that sweeps upwards, creating a psychological rush of energy that perfectly complements rhythmic build-ups."
    },
    {
        category: "Lead Synth Sounds",
        scenario: "You are producing a Big Room House track and need a massive, wide, anthemic lead sound made by layering multiple detuned sawtooth waves.",
        options: [
            { text: "Pluck synthesis", correct: false },
            { text: "Screech/laser lead", correct: false },
            { text: "Supersaw lead stack", correct: true },
            { text: "Wobble bass modulation", correct: false }
        ],
        explanation: "The 'Supersaw' consists of multiple sawtooth waves detuned against each other, creating a naturally wide, chorus-like, and aggressive lead sound staple to Trance and Big Room."
    },
    {
        category: "Bass Design",
        scenario: "Your dubstep track needs a bass sound that rhythmic opens and closes, creating a 'wub-wub' rhythm syncing to the track tempo.",
        options: [
            { text: "Clean sub bass layering", correct: false },
            { text: "Mid-range harmonic distortion", correct: false },
            { text: "Wobble/LFO modulated bass filter", correct: true },
            { text: "Bass split processing", correct: false }
        ],
        explanation: "Linking an LFO (Low Frequency Oscillator) to the cutoff of a low-pass filter creates the classic 'wobble' bass effect, moving rhythmically based on the LFO rate."
    },
    {
        category: "Bass Design",
        scenario: "Your synth bass sounds muddy when you add chorus and distortion to it, because the sub frequencies are getting messy and losing mono compatibility.",
        options: [
            { text: "Wobble/LFO modulated bass filter", correct: false },
            { text: "Clean sub bass layering", correct: false },
            { text: "Bass split processing", correct: true },
            { text: "Reverb throw", correct: false }
        ],
        explanation: "Bass split processing involves separating the sub frequencies (kept clean & mono) from the mid frequencies (which can be widened, distorted, and chorused) for a powerful, defined bass."
    },
    {
        category: "Vocal Manipulation",
        scenario: "You want the lead vocal to suddenly echo massively on just the last word of the chorus, without the whole vocal phrase getting washed out in reverb.",
        options: [
            { text: "Formant-shifted vocal processing", correct: false },
            { text: "Chopped/sliced vocal edits", correct: false },
            { text: "Reverb/Delay throw", correct: true },
            { text: "Pitched-up sample hooks", correct: false }
        ],
        explanation: "A 'throw' is an automation technique where you quickly send only a specific word or phrase to an auxiliary delay or reverb track, creating an isolated echo tail."
    },
    {
        category: "Drum Processing",
        scenario: "Your 808 kick drum has plenty of deep sub, but it absolutely disappears on phone speakers. You need it to punch through the mix.",
        options: [
            { text: "Layered kick drum (sub + punch + click)", correct: true },
            { text: "Percussion bus compression glue", correct: false },
            { text: "Clap stacking with reverb", correct: false },
            { text: "Multiband sidechain", correct: false }
        ],
        explanation: "Layering involves combining a deep sub kick with a mid-range punch kick and a high-frequency 'click' top kick, ensuring the hit is heard across all speaker systems."
    },
    {
        category: "Transition Effects",
        scenario: "You are transitioning from the breakdown into the build-up. You need a fast, sucking sound that leads perfectly into the downbeat.",
        options: [
            { text: "Downlifter/riser one-shots", correct: false },
            { text: "Reverse cymbal/crash impact", correct: true },
            { text: "Beat-synced delay feedback", correct: false },
            { text: "Automated filter sweeps", correct: false }
        ],
        explanation: "Reversing a crash cymbal sample creates a natural crescendo of white noise that abruptly ends exactly on the downbeat, pulling the listener flawlessly into the next section."
    }
];

const ProductionTechniqueQuiz = ({ onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Shuffle options when a new question loads to prevent memorizing positions
    const [currentOptions, setCurrentOptions] = useState([]);

    useEffect(() => {
        if (currentQuestionIndex < quizData.length) {
            const options = [...quizData[currentQuestionIndex].options];
            // Fisher-Yates shuffle
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            setCurrentOptions(options);
            setSelectedOptionIndex(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex]);

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOptionIndex(index);
        setIsAnswered(true);

        if (currentOptions[index].correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
    };

    if (quizFinished) {
        const percentage = Math.round((score / quizData.length) * 100);
        let message = "";
        if (percentage === 100) message = "Perfect! You are a master producer.";
        else if (percentage >= 80) message = "Excellent! Your production knowledge is solid.";
        else if (percentage >= 60) message = "Good job. Keep practicing these techniques in your DAW.";
        else message = "Review these techniques and try again to sharpen your skills.";

        return (
            <div className="pt-quiz-container">
                <div className="pt-header">
                    <h1>Production Techniques Quiz</h1>
                    <button className="pt-exit-btn" onClick={onExit}>Exit Session</button>
                </div>
                <div className="pt-content" style={{ justifyContent: 'center' }}>
                    <div className="pt-completion-screen">
                        <h2>Session Complete</h2>
                        <div className="pt-completion-score">{score} / {quizData.length}</div>
                        <p className="pt-completion-message">{message}</p>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="pt-restart-btn" onClick={handleRestart}>Try Again</button>
                            <button className="pt-finish-btn" onClick={onExit}>Return to Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = quizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;

    return (
        <div className="pt-quiz-container">
            <div className="pt-header">
                <h1>Production Techniques Masterclass</h1>
                <button className="pt-exit-btn" onClick={onExit}>End Session</button>
            </div>

            <div className="pt-content">
                <div className="pt-progress-bar-container">
                    <div className="pt-progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="pt-category-badge">
                    {currentQ.category}
                </div>

                <div className="pt-scenario-card">
                    <div className="pt-scenario-title">Scenario Goal:</div>
                    <div className="pt-scenario-text">
                        "{currentQ.scenario}"
                    </div>

                    <div className="pt-options-grid">
                        {currentOptions.map((opt, index) => {
                            let btnClass = "pt-option-btn";
                            if (isAnswered) {
                                if (index === selectedOptionIndex) {
                                    btnClass += opt.correct ? " selected-correct" : " selected-wrong";
                                } else if (opt.correct) {
                                    btnClass += " reveal-correct";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    className={btnClass}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isAnswered}
                                >
                                    {opt.text}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <div className={`pt-feedback-panel ${currentOptions[selectedOptionIndex].correct ? 'correct' : 'wrong'}`}>
                            <div className="pt-feedback-title">
                                {currentOptions[selectedOptionIndex].correct ? 'Perfect Match' : 'Incorrect Technique'}
                            </div>
                            <div className="pt-feedback-text">
                                {currentQ.explanation}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="pt-next-btn" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < quizData.length - 1 ? 'Next Scenario \u2192' : 'View Results'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductionTechniqueQuiz;
