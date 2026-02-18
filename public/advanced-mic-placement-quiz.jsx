import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Volume2, Mic, Target, Pause } from 'lucide-react';

export default function AdvancedMicPlacementQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [aiExplanation, setAiExplanation] = useState('');
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [micPosition, setMicPosition] = useState({ x: 150, y: 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSweetSpot, setShowSweetSpot] = useState(false);
    const audioContextRef = useRef(null);
    const containerRef = useRef(null);

    const questions = [
        {
            type: 'placement',
            scenario: 'bass-amp',
            question: 'Position the mic for a tight, punchy bass guitar sound',
            hint: 'Close to the speaker cone, slightly off-center to reduce boom',
            sweetSpot: { x: 210, y: 195, radius: 35 },
            explanation: 'For bass amps, place the mic 2-6 inches from the speaker cone, slightly off-center. Dead center captures more low-end boom, while off-center gives a tighter, more defined bass tone. Experiment with distance to control room sound.',
            instrument: {
                name: 'Bass Amp',
                speaker: { x: 200, y: 200 },
                center: { x: 200, y: 200 },
                edge: { x: 240, y: 200 }
            }
        },
        {
            type: 'placement',
            scenario: 'cello',
            question: 'Mic this cello for a warm, classical recording',
            hint: 'Position above and in front, pointing toward the f-holes',
            sweetSpot: { x: 200, y: 140, radius: 40 },
            explanation: 'For cello, position the mic 1-3 feet away, slightly above and pointing toward the f-holes or bridge. This captures the full body resonance while maintaining clarity. Too close sounds harsh, too far loses definition.',
            instrument: {
                name: 'Cello',
                fholes: { x: 200, y: 180 },
                bridge: { x: 200, y: 170 },
                body: { x: 200, y: 200 }
            }
        },
        {
            type: 'placement',
            scenario: 'drum-room',
            question: 'Place a room mic to capture natural drum ambience',
            hint: 'Several feet back from the kit, at ear height or higher',
            sweetSpot: { x: 200, y: 100, radius: 50 },
            explanation: 'Room mics should be placed 6-15 feet from the kit, at ear height or higher. This captures the natural room sound and ambience. The further away, the more room sound you get. Experiment with corners for more bass.',
            instrument: {
                name: 'Drum Kit (Room)',
                kit: { x: 200, y: 250 },
                snare: { x: 180, y: 260 },
                kick: { x: 200, y: 280 }
            }
        },
        {
            type: 'placement',
            scenario: 'trumpet',
            question: 'Position the mic for a bright, clear trumpet sound',
            hint: 'Point at the bell, slightly off-axis to avoid harshness',
            sweetSpot: { x: 220, y: 180, radius: 35 },
            explanation: 'For trumpet, aim the mic at the bell from 6-12 inches away, slightly off-axis. Direct on-axis can be too harsh and bright. Off-axis captures a smoother, more musical tone while still maintaining clarity.',
            instrument: {
                name: 'Trumpet',
                bell: { x: 200, y: 200 },
                valves: { x: 180, y: 180 },
                mouthpiece: { x: 160, y: 160 }
            }
        },
        {
            type: 'multiple-choice',
            question: 'What is the main difference between XY and ORTF stereo miking techniques?',
            hint: 'Think about the angle and spacing between the microphones',
            options: [
                'XY uses two mics at 90°, ORTF uses two mics at 110° with 17cm spacing',
                'XY is for drums only, ORTF is for orchestras only',
                'XY uses omnidirectional mics, ORTF uses cardioid mics',
                'There is no difference, they are the same technique'
            ],
            correct: 0,
            explanation: 'XY uses two cardioid mics at 90° with capsules touching (coincident). ORTF uses two cardioid mics at 110° with 17cm spacing (near-coincident). ORTF creates a wider stereo image with more spatial information.'
        },
        {
            type: 'placement',
            scenario: 'violin',
            question: 'Mic this violin for a solo classical recording',
            hint: 'Position above and slightly in front, pointing at the bridge area',
            sweetSpot: { x: 200, y: 130, radius: 38 },
            explanation: 'For solo violin, place the mic 1-2 feet away, slightly above and pointing toward the bridge or f-holes. This captures the full tonal range and bow articulation. Closer miking can sound scratchy, while too far loses intimacy.',
            instrument: {
                name: 'Violin',
                fholes: { x: 200, y: 170 },
                bridge: { x: 200, y: 165 },
                scroll: { x: 200, y: 120 }
            }
        },
        {
            type: 'placement',
            scenario: 'rhodes',
            question: 'Position a mic to capture the electric piano (Rhodes) sound',
            hint: 'Aim at the bell housing or use stereo pair over the tines',
            sweetSpot: { x: 200, y: 160, radius: 45 },
            explanation: 'For Rhodes, you can mic the bell housing (amp output) or place mics over the tines. Over the tines captures more mechanical sound and tine attack. The bell gives a more processed, classic Rhodes tone. Stereo pairs create width.',
            instrument: {
                name: 'Rhodes Piano',
                tines: { x: 200, y: 180 },
                bell: { x: 200, y: 220 },
                keys: { x: 200, y: 280 }
            }
        },
        {
            type: 'placement',
            scenario: 'tom',
            question: 'Mic this tom-tom for a full, resonant drum sound',
            hint: 'Position above the drum, angled toward the center of the head',
            sweetSpot: { x: 200, y: 160, radius: 32 },
            explanation: 'For toms, place the mic 2-4 inches above the rim, angled toward the center of the head. This captures the full body and resonance. Too close to the rim sounds thin, while pointing at the center captures more fundamental tone.',
            instrument: {
                name: 'Tom-Tom',
                center: { x: 200, y: 200 },
                rim: { x: 200, y: 180 },
                shell: { x: 200, y: 210 }
            }
        },
        {
            type: 'multiple-choice',
            question: 'What causes phase cancellation when using multiple microphones?',
            hint: 'Think about sound waves arriving at different times',
            options: [
                'Using different brands of microphones',
                'Sound waves arriving at mics at different times, causing interference',
                'Microphones being too expensive',
                'Recording in stereo instead of mono'
            ],
            correct: 1,
            explanation: 'Phase cancellation occurs when the same sound arrives at different microphones at slightly different times. When combined, the waveforms can cancel each other out, especially at certain frequencies. This is why the 3:1 rule (mic distance 3x the source distance) helps avoid phase issues.'
        },
        {
            type: 'placement',
            scenario: 'double-bass',
            question: 'Position the mic for a warm, woody upright bass sound',
            hint: 'Aim at the bridge or f-hole area, 6-12 inches away',
            sweetSpot: { x: 210, y: 170, radius: 40 },
            explanation: 'For upright bass, position the mic 6-12 inches from the bridge or f-holes. This captures the woody tone and string attack. Closer to the bridge gives more attack and definition, while closer to the f-holes captures more body and resonance.',
            instrument: {
                name: 'Double Bass',
                fhole: { x: 200, y: 180 },
                bridge: { x: 200, y: 160 },
                body: { x: 200, y: 220 }
            }
        }
    ];

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Calculate how close mic is to sweet spot
    const getDistanceFromSweetSpot = () => {
        const q = questions[currentQuestion];
        if (!q.sweetSpot) return 999;

        const dx = micPosition.x - q.sweetSpot.x;
        const dy = micPosition.y - q.sweetSpot.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Play sound that varies based on mic position
    const playPositionalSound = () => {
        const ctx = audioContextRef.current;
        if (!ctx || isPlaying) return;

        setIsPlaying(true);
        const q = questions[currentQuestion];
        const distance = getDistanceFromSweetSpot();
        const inSweetSpot = distance < (q.sweetSpot?.radius || 40);

        // Base frequencies for different instruments
        const baseFreqs = {
            'bass-amp': [60, 80, 100],
            'cello': [130, 196, 260],
            'drum-room': [100, 200, 400],
            'trumpet': [440, 880, 1320],
            'violin': [330, 495, 660],
            'rhodes': [220, 330, 440],
            'tom': [100, 150, 200],
            'double-bass': [80, 120, 160]
        };

        const freqs = baseFreqs[q.scenario] || [440];
        const now = ctx.currentTime;
        const duration = 1.5;

        // Create sound with filtering based on position
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.frequency.value = freq;
            osc.type = q.scenario.includes('drum') || q.scenario.includes('bass') ? 'sawtooth' : 'sine';

            // Filter and gain based on position
            if (inSweetSpot) {
                // Good position - full frequency, good level
                filter.type = 'lowpass';
                filter.frequency.value = 12000;
                gain.gain.setValueAtTime(0.15 / (i + 1), now);
            } else {
                // Bad position - filtered, quieter
                filter.type = 'lowpass';
                filter.frequency.value = Math.max(2000 - distance * 10, 500);
                gain.gain.setValueAtTime(0.08 / (i + 1), now);
            }

            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        });

        setTimeout(() => setIsPlaying(false), duration * 1000);
    };

    const handleMouseDown = (e) => {
        if (showFeedback) return;
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current || showFeedback) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Keep mic within bounds
        const boundedX = Math.max(30, Math.min(x, 370));
        const boundedY = Math.max(30, Math.min(y, 370));

        setMicPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    const checkPlacement = async () => {
        const q = questions[currentQuestion];
        const distance = getDistanceFromSweetSpot();
        const isCorrect = distance < q.sweetSpot.radius;

        setSelectedAnswer(distance);
        setShowFeedback(true);
        setShowSweetSpot(true);

        if (isCorrect) {
            setScore(score + 1);
        }

        await getAIExplanation(q, `${distance.toFixed(0)} pixels from sweet spot`, isCorrect);
    };

    const getAIExplanation = async (question, userAnswer, isCorrect) => {
        setLoadingExplanation(true);
        try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 1000,
                    messages: [
                        {
                            role: "user",
                            content: `You're a friendly audio engineer teaching advanced microphone techniques. A student just answered:

Question: ${question.question}
Hint: ${question.hint || 'None'}
Result: ${isCorrect ? 'Correct placement' : 'Incorrect placement'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates success or gently guides if incorrect
- Explains why this mic position matters
- Gives a practical recording tip
Keep it friendly!`
                        }
                    ]
                })
            });

            const data = await response.json();
            const explanation = data.content
                .map(item => item.type === "text" ? item.text : "")
                .join("\n");
            setAiExplanation(explanation);
        } catch (error) {
            console.error("AI explanation error:", error);
            setAiExplanation("Great effort! " + question.explanation);
        } finally {
            setLoadingExplanation(false);
        }
    };

    const handleAnswer = async (answer) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);

        const currentQ = questions[currentQuestion];
        const isCorrect = answer === currentQ.correct;

        if (isCorrect) {
            setScore(score + 1);
        }

        await getAIExplanation(currentQ, currentQ.options[answer], isCorrect);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setAiExplanation('');
            setShowSweetSpot(false);
            setMicPosition({ x: 150, y: 150 });
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setQuizComplete(false);
        setAiExplanation('');
        setShowIntro(true);
        setShowSweetSpot(false);
        setMicPosition({ x: 150, y: 150 });
    };

    const renderInstrument = (scenario, instrument) => {
        switch (scenario) {
            case 'bass-amp':
                return (
                    <g>
                        {/* Amp cabinet */}
                        <rect x="120" y="140" width="160" height="120" fill="#1a1a1a" stroke="#000" strokeWidth="3" rx="5" />
                        {/* Speaker cone */}
                        <circle cx="200" cy="200" r="55" fill="#333" stroke="#555" strokeWidth="2" />
                        <circle cx="200" cy="200" r="45" fill="#222" />
                        <circle cx="200" cy="200" r="25" fill="#444" />
                        {/* Dust cap */}
                        <circle cx="200" cy="200" r="12" fill="#555" />
                        {/* Control knobs */}
                        <circle cx="150" cy="155" r="4" fill="#666" />
                        <circle cx="170" cy="155" r="4" fill="#666" />
                        <circle cx="190" cy="155" r="4" fill="#666" />
                        <text x="240" y="205" fontSize="10" fill="#888">center</text>
                    </g>
                );

            case 'cello':
                return (
                    <g>
                        {/* Cello body */}
                        <ellipse cx="200" cy="200" rx="50" ry="90" fill="#8b4513" stroke="#654321" strokeWidth="3" />
                        <ellipse cx="200" cy="200" rx="40" ry="80" fill="#a0522d" />
                        {/* F-holes */}
                        <path d="M 185 170 Q 183 180, 185 190" stroke="#000" strokeWidth="2" fill="none" />
                        <path d="M 215 170 Q 217 180, 215 190" stroke="#000" strokeWidth="2" fill="none" />
                        {/* Bridge */}
                        <rect x="195" y="165" width="10" height="15" fill="#654321" rx="1" />
                        {/* Neck */}
                        <rect x="190" y="80" width="20" height="120" fill="#654321" rx="3" />
                        {/* Strings */}
                        {[0, 1, 2, 3].map(i => (
                            <line
                                key={i}
                                x1="200" y1="80"
                                x2="200" y2="290"
                                stroke="#c0c0c0"
                                strokeWidth="0.8"
                                transform={`translate(${(i - 1.5) * 3}, 0)`}
                            />
                        ))}
                        <text x="150" y="145" fontSize="10" fill="#666">mic here</text>
                    </g>
                );

            case 'drum-room':
                return (
                    <g>
                        {/* Drum kit (small, in distance) */}
                        {/* Kick */}
                        <ellipse cx="200" cy="280" rx="30" ry="25" fill="#333" stroke="#000" strokeWidth="2" />
                        {/* Snare */}
                        <ellipse cx="180" cy="260" rx="20" ry="18" fill="#e0e0e0" stroke="#666" strokeWidth="2" />
                        {/* Tom */}
                        <ellipse cx="220" cy="255" rx="18" ry="16" fill="#444" stroke="#333" strokeWidth="2" />
                        {/* Cymbal */}
                        <ellipse cx="240" cy="240" rx="25" ry="4" fill="#ffd700" stroke="#b8860b" strokeWidth="1" />
                        {/* Room reference */}
                        <rect x="50" y="300" width="300" height="2" fill="#999" opacity="0.3" />
                        <text x="120" y="110" fontSize="10" fill="#666">room mic position</text>
                        {/* Distance indicator */}
                        <line x1="200" y1="280" x2="200" y2="120" stroke="#999" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                    </g>
                );

            case 'trumpet':
                return (
                    <g>
                        {/* Bell */}
                        <ellipse cx="200" cy="200" rx="40" ry="35" fill="#ffd700" stroke="#b8860b" strokeWidth="2" />
                        <ellipse cx="200" cy="200" rx="30" ry="25" fill="#ffed4e" />
                        <circle cx="200" cy="200" r="15" fill="#222" />
                        {/* Tubing */}
                        <path d="M 160 200 Q 140 180, 140 160 Q 140 140, 160 130"
                            stroke="#ffd700" strokeWidth="8" fill="none" />
                        <path d="M 160 130 L 180 120" stroke="#ffd700" strokeWidth="6" />
                        {/* Valves */}
                        <rect x="170" y="170" width="8" height="20" fill="#b8860b" rx="2" />
                        <rect x="180" y="175" width="8" height="20" fill="#b8860b" rx="2" />
                        <rect x="190" y="170" width="8" height="20" fill="#b8860b" rx="2" />
                        {/* Mouthpiece */}
                        <circle cx="180" cy="115" r="5" fill="#c0c0c0" />
                        <text x="210" y="185" fontSize="10" fill="#666">off-axis</text>
                    </g>
                );

            case 'violin':
                return (
                    <g>
                        {/* Violin body */}
                        <ellipse cx="200" cy="170" rx="35" ry="50" fill="#8b4513" stroke="#654321" strokeWidth="2" />
                        <ellipse cx="200" cy="170" rx="28" ry="43" fill="#a0522d" />
                        {/* F-holes */}
                        <path d="M 188 160 Q 186 165, 188 170" stroke="#000" strokeWidth="1.5" fill="none" />
                        <path d="M 212 160 Q 214 165, 212 170" stroke="#000" strokeWidth="1.5" fill="none" />
                        {/* Bridge */}
                        <rect x="196" y="163" width="8" height="10" fill="#654321" rx="1" />
                        {/* Neck */}
                        <rect x="193" y="100" width="14" height="70" fill="#654321" rx="2" />
                        {/* Scroll */}
                        <circle cx="200" cy="95" r="8" fill="#654321" />
                        <path d="M 200 95 Q 195 90, 195 85" stroke="#654321" strokeWidth="3" fill="none" />
                        {/* Strings */}
                        {[0, 1, 2, 3].map(i => (
                            <line
                                key={i}
                                x1="200" y1="95"
                                x2="200" y2="220"
                                stroke="#c0c0c0"
                                strokeWidth="0.5"
                                transform={`translate(${(i - 1.5) * 2}, 0)`}
                            />
                        ))}
                        <text x="150" y="135" fontSize="10" fill="#666">above bridge</text>
                    </g>
                );

            case 'rhodes':
                return (
                    <g>
                        {/* Rhodes body (top view) */}
                        <rect x="100" y="150" width="200" height="120" fill="#222" stroke="#000" strokeWidth="3" rx="5" />
                        {/* Tines (visible through top) */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <line
                                key={i}
                                x1={120 + i * 20} y1="170"
                                x2={120 + i * 20} y2="210"
                                stroke="#c0c0c0"
                                strokeWidth="1.5"
                            />
                        ))}
                        {/* Pickups */}
                        <rect x="110" y="185" width="180" height="10" fill="#8b4513" rx="2" />
                        {/* Bell housing */}
                        <rect x="140" y="220" width="120" height="30" fill="#444" stroke="#666" strokeWidth="2" rx="3" />
                        <text x="110" y="165" fontSize="10" fill="#999">tines</text>
                        <text x="160" y="240" fontSize="10" fill="#ccc">bell</text>
                    </g>
                );

            case 'tom':
                return (
                    <g>
                        {/* Tom shell */}
                        <ellipse cx="200" cy="200" rx="55" ry="50" fill="#444" stroke="#333" strokeWidth="3" />
                        {/* Top head */}
                        <ellipse cx="200" cy="200" rx="50" ry="45" fill="#f5f5f5" stroke="#888" strokeWidth="2" />
                        {/* Rim */}
                        <ellipse cx="200" cy="180" rx="52" ry="47" fill="none" stroke="#333" strokeWidth="4" />
                        {/* Center reference */}
                        <circle cx="200" cy="200" r="3" fill="#ff6b6b" opacity="0.7" />
                        {/* Lugs */}
                        {[0, 1, 2, 3, 4, 5].map(i => {
                            const angle = (i * 60) * Math.PI / 180;
                            const x = 200 + Math.cos(angle) * 58;
                            const y = 200 + Math.sin(angle) * 52;
                            return <rect key={i} x={x - 3} y={y - 4} width="6" height="8" fill="#666" rx="1" />;
                        })}
                        <text x="210" y="175" fontSize="10" fill="#666">rim</text>
                    </g>
                );

            case 'double-bass':
                return (
                    <g>
                        {/* Bass body */}
                        <ellipse cx="200" cy="220" rx="45" ry="70" fill="#8b4513" stroke="#654321" strokeWidth="3" />
                        <ellipse cx="200" cy="220" rx="38" ry="63" fill="#a0522d" />
                        {/* F-holes */}
                        <path d="M 185 200 Q 183 210, 185 220" stroke="#000" strokeWidth="2" fill="none" />
                        <path d="M 215 200 Q 217 210, 215 220" stroke="#000" strokeWidth="2" fill="none" />
                        {/* Bridge */}
                        <rect x="194" y="195" width="12" height="20" fill="#654321" rx="2" />
                        {/* Neck */}
                        <rect x="192" y="80" width="16" height="140" fill="#654321" rx="3" />
                        {/* Strings */}
                        {[0, 1, 2, 3].map(i => (
                            <line
                                key={i}
                                x1="200" y1="80"
                                x2="200" y2="290"
                                stroke="#c0c0c0"
                                strokeWidth="1"
                                transform={`translate(${(i - 1.5) * 3.5}, 0)`}
                            />
                        ))}
                        {/* Scroll */}
                        <circle cx="200" cy="75" r="10" fill="#654321" />
                        <text x="150" y="175" fontSize="10" fill="#666">bridge/f-hole</text>
                    </g>
                );

            default:
                return null;
        }
    };

    const renderQuestion = () => {
        const q = questions[currentQuestion];

        if (q.type === 'placement') {
            const distance = getDistanceFromSweetSpot();
            const inSweetSpot = showFeedback && distance < q.sweetSpot.radius;
            const proximityFeedback =
                distance < 30 ? "🎯 Perfect!" :
                    distance < 60 ? "🎵 Very close!" :
                        distance < 100 ? "📍 Getting warmer..." :
                            "🔍 Keep looking...";

            return (
                <div className="space-y-6">
                    {/* Placement Area */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-slate-300">
                        <div
                            ref={containerRef}
                            className="relative bg-white rounded-lg shadow-inner border-2 border-slate-300 cursor-move"
                            style={{ width: 400, height: 400 }}
                            onMouseDown={handleMouseDown}
                        >
                            {/* SVG for instrument */}
                            <svg width="400" height="400" className="absolute inset-0 pointer-events-none">
                                {renderInstrument(q.scenario, q.instrument)}

                                {/* Sweet spot indicator (only show after checking) */}
                                {showSweetSpot && (
                                    <>
                                        <circle
                                            cx={q.sweetSpot.x}
                                            cy={q.sweetSpot.y}
                                            r={q.sweetSpot.radius}
                                            fill="rgba(34, 197, 94, 0.2)"
                                            stroke="#22c55e"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                        />
                                        <circle
                                            cx={q.sweetSpot.x}
                                            cy={q.sweetSpot.y}
                                            r="5"
                                            fill="#22c55e"
                                        />
                                        <text
                                            x={q.sweetSpot.x + 15}
                                            y={q.sweetSpot.y - 15}
                                            fontSize="12"
                                            fill="#22c55e"
                                            fontWeight="bold"
                                        >
                                            Sweet Spot
                                        </text>
                                    </>
                                )}
                            </svg>

                            {/* Draggable Microphone */}
                            <div
                                className={`absolute w-12 h-12 cursor-grab ${isDragging ? 'cursor-grabbing scale-110' : ''} transition-transform`}
                                style={{
                                    left: micPosition.x - 24,
                                    top: micPosition.y - 24,
                                }}
                            >
                                <div className="relative">
                                    {/* Mic icon */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${inSweetSpot ? 'bg-green-500' : 'bg-blue-500'
                                        } shadow-lg border-2 border-white`}>
                                        <Mic className="text-white" size={24} />
                                    </div>
                                    {/* Direction indicator */}
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                                        <div className={`w-1 h-6 ${inSweetSpot ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                        <div className={`w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent ${inSweetSpot ? 'border-t-green-500' : 'border-t-blue-500'
                                            }`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Position feedback */}
                        {!showFeedback && (
                            <div className="mt-4 text-center">
                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-blue-300">
                                    <Target size={16} className="text-blue-600" />
                                    <span className="text-sm font-semibold text-gray-700">{proximityFeedback}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={playPositionalSound}
                            disabled={isPlaying}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                        >
                            {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
                            {isPlaying ? 'Playing...' : 'Test Sound'}
                        </button>
                        {!showFeedback && (
                            <button
                                onClick={checkPlacement}
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                Check Placement
                            </button>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-sm text-blue-800">
                            🎤 <strong>Drag the microphone</strong> to position it. Click "Test Sound" to hear how it sounds from that position. Find the sweet spot!
                        </p>
                    </div>

                    {/* Feedback */}
                    {showFeedback && (
                        <div className={`p-4 rounded-lg border-2 ${inSweetSpot
                                ? 'bg-green-50 border-green-500'
                                : 'bg-orange-50 border-orange-500'
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                {inSweetSpot ? (
                                    <>
                                        <Check className="text-green-600" size={24} />
                                        <span className="font-bold text-green-800 text-lg">Perfect placement! 🎯</span>
                                    </>
                                ) : (
                                    <>
                                        <X className="text-orange-600" size={24} />
                                        <span className="font-bold text-orange-800 text-lg">Close, but not quite in the sweet spot!</span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-gray-700">{q.explanation}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (q.type === 'multiple-choice') {
            return (
                <div className="space-y-3">
                    {q.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === q.correct;
                        const showCorrect = showFeedback && isCorrect;
                        const showIncorrect = showFeedback && isSelected && !isCorrect;

                        return (
                            <button
                                key={index}
                                onClick={() => !showFeedback && handleAnswer(index)}
                                disabled={showFeedback}
                                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${showCorrect
                                        ? 'border-green-500 bg-green-50'
                                        : showIncorrect
                                            ? 'border-red-500 bg-red-50'
                                            : isSelected
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300 bg-white'
                                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showCorrect && <Check className="text-green-600" size={20} />}
                                    {showIncorrect && <X className="text-red-600" size={20} />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            );
        }
    };

    if (showIntro) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 flex items-center justify-center">
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🎙️</div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Advanced Mic Placement Quiz</h1>
                        <p className="text-xl text-gray-600">Master professional recording techniques for diverse instruments!</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                        <div className="flex items-start gap-3 mb-4">
                            <BookOpen className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Advanced mic techniques for bass, strings, and brass</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Room miking and ambient capture strategies</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Stereo miking techniques (XY vs ORTF)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Phase relationships and avoiding cancellation</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <Mic className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Advanced Recording Scenarios</h3>
                                <div className="space-y-3 text-gray-700 text-sm">
                                    <p>This quiz covers professional techniques used in top studios worldwide!</p>
                                    <p>🎯 <strong>Drag the mic</strong> to find optimal positions for each instrument</p>
                                    <p>🔊 <strong>Test the sound</strong> - hear how position affects tone quality</p>
                                    <p>📍 <strong>Master the sweet spots</strong> - learn where pros place their mics</p>
                                    <div className="bg-white p-3 rounded-lg border border-yellow-300">
                                        <p className="text-xs font-semibold mb-1">💡 Pro Tip:</p>
                                        <p className="text-xs">These techniques are used on Grammy-winning recordings. Small position changes create huge tonal differences!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">🎸 10 Questions</div>
                            <div>8 instruments + theory</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">🔊 Audio Feedback</div>
                            <div>Hear position changes</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
                            <div>Pro recording tips</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
                            <div>Learn at your pace</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowIntro(false)}
                        className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-medium text-lg flex items-center justify-center gap-2"
                    >
                        Start Advanced Quiz
                        <Play size={24} />
                    </button>
                </div>
            </div>
        );
    }

    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">
                            {percentage >= 70 ? '🎉' : percentage >= 50 ? '🎤' : '🎧'}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                        <div className="text-5xl font-bold text-purple-600 mb-4">
                            {score} / {questions.length}
                        </div>
                        <div className="text-xl text-gray-600 mb-6">
                            {percentage >= 70 ? 'Outstanding! You\'re a mic placement pro!' :
                                percentage >= 50 ? 'Good work! Keep practicing those techniques!' :
                                    'Keep learning! Review the explanations and try again!'}
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
                            <h3 className="font-bold text-gray-800 mb-3">Your Performance</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                                <div
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full transition-all duration-1000"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600">{percentage}% Correct</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={resetQuiz}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={20} />
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Advanced Mic Placement</h2>
                            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-purple-600">{score}</div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{q.question}</h3>
                        {q.hint && (
                            <div className="flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                                <Lightbulb size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-yellow-800">{q.hint}</p>
                            </div>
                        )}
                    </div>

                    {renderQuestion()}

                    {/* AI Explanation */}
                    {showFeedback && (
                        <div className="mt-6">
                            {loadingExplanation ? (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Sparkles className="animate-spin" size={20} />
                                    <span>Getting AI explanation...</span>
                                </div>
                            ) : aiExplanation && (
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <Sparkles className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">AI Audio Engineer Says:</h4>
                                            <p className="text-sm text-gray-700">{aiExplanation}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Next Button */}
                    {showFeedback && (
                        <button
                            onClick={nextQuestion}
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
