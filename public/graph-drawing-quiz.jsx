import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Eraser, Undo } from 'lucide-react';

export default function GraphDrawingQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [drawnPath, setDrawnPath] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef(null);
    const [canvasContext, setCanvasContext] = useState(null);

    const questions = [
        {
            type: 'adsr-envelope',
            question: 'Draw an ADSR envelope with: Fast Attack, Medium Decay, 70% Sustain, Slow Release',
            hint: 'Start low, rise quickly (attack), drop to 70% (decay), hold flat (sustain), then drop slowly (release)',
            targetPoints: [
                { x: 0, y: 100 },    // Start
                { x: 15, y: 0 },     // Fast attack peak
                { x: 35, y: 30 },    // Decay to sustain (70%)
                { x: 70, y: 30 },    // Sustain hold
                { x: 100, y: 100 }   // Slow release to zero
            ],
            explanation: 'ADSR controls how a sound evolves over time. Attack = how fast it starts, Decay = drop to sustain level, Sustain = held level, Release = fade out after key release. This envelope creates a punchy sound with a long tail.'
        },
        {
            type: 'eq-curve',
            question: 'Draw an EQ curve that boosts 3kHz by +6dB',
            hint: 'Start flat, create a bell-shaped bump in the middle-right area',
            targetPoints: [
                { x: 0, y: 50 },
                { x: 40, y: 50 },
                { x: 60, y: 20 },  // Peak at 3kHz (+6dB)
                { x: 80, y: 50 },
                { x: 100, y: 50 }
            ],
            explanation: 'Boosting 3kHz adds presence and clarity to vocals and instruments. The bell curve affects frequencies around 3kHz, with the Q (width) determining how many neighboring frequencies are affected.'
        },
        {
            type: 'compression-curve',
            question: 'Draw a 4:1 compression ratio with threshold at -12dB',
            hint: 'Draw a straight line that bends at the threshold point, becoming gentler above it',
            targetPoints: [
                { x: 0, y: 100 },
                { x: 40, y: 60 },    // Threshold at -12dB
                { x: 60, y: 55 },    // 4:1 ratio (gentler slope)
                { x: 80, y: 50 },
                { x: 100, y: 45 }
            ],
            explanation: 'A 4:1 ratio means for every 4dB above the threshold, only 1dB comes out. This evens out loud peaks while keeping quiet parts untouched. The threshold at -12dB is common for vocals.'
        },
        {
            type: 'filter-response',
            question: 'Draw a low-pass filter with cutoff at 2kHz',
            hint: 'Start high/flat on the left, then drop steeply on the right side',
            targetPoints: [
                { x: 0, y: 20 },
                { x: 50, y: 20 },    // Flat passband
                { x: 60, y: 30 },    // Cutoff starts
                { x: 75, y: 60 },    // Steep rolloff
                { x: 100, y: 100 }   // High frequencies cut
            ],
            explanation: 'A low-pass filter lets low frequencies through and cuts high frequencies. The cutoff frequency (2kHz) is where the filter starts reducing volume. Great for removing harshness or simulating distance.'
        },
        {
            type: 'adsr-envelope',
            question: 'Draw a pad sound envelope: Slow Attack, No Decay, 100% Sustain, Medium Release',
            hint: 'Gradual rise to full volume, stay flat, then medium drop at the end',
            targetPoints: [
                { x: 0, y: 100 },
                { x: 30, y: 0 },     // Slow attack
                { x: 70, y: 0 },     // Full sustain
                { x: 100, y: 60 }    // Medium release
            ],
            explanation: 'Pad sounds use slow attacks to create a swelling effect. No decay and full sustain keep the sound at maximum volume while held. This creates lush, atmospheric textures perfect for backgrounds.'
        },
        {
            type: 'eq-curve',
            question: 'Draw a high-pass filter (cut bass below 100Hz)',
            hint: 'Start low on the left (cutting bass), rise steeply, then stay flat',
            targetPoints: [
                { x: 0, y: 100 },    // Bass cut
                { x: 15, y: 70 },    // Steep rise
                { x: 25, y: 50 },    // Cutoff at 100Hz
                { x: 50, y: 50 },
                { x: 100, y: 50 }    // Flat
            ],
            explanation: 'High-pass filters remove low-end rumble and mud. Cutting below 100Hz cleans up vocals and instruments, leaving room for bass and kick drum. Essential for mixing clarity!'
        }
    ];

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            setCanvasContext(ctx);
            drawGrid(ctx);
        }
    }, [currentQuestion, showFeedback]);

    const drawGrid = (ctx) => {
        if (!ctx) return;

        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 2;

        // X-axis (bottom)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        // Y-axis (left)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
    };

    const startDrawing = (e) => {
        if (showFeedback) return;
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDrawnPath([{ x, y }]);
    };

    const draw = (e) => {
        if (!isDrawing || showFeedback) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newPath = [...drawnPath, { x, y }];
        setDrawnPath(newPath);

        // Draw the path
        if (canvasContext && newPath.length > 1) {
            canvasContext.strokeStyle = '#8b5cf6';
            canvasContext.lineWidth = 3;
            canvasContext.lineCap = 'round';
            canvasContext.lineJoin = 'round';

            canvasContext.beginPath();
            canvasContext.moveTo(newPath[newPath.length - 2].x, newPath[newPath.length - 2].y);
            canvasContext.lineTo(x, y);
            canvasContext.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        setDrawnPath([]);
        drawGrid(canvasContext);
    };

    const checkAnswer = () => {
        const q = questions[currentQuestion];
        const canvas = canvasRef.current;

        // Normalize drawn path to percentage coordinates
        const normalizedDrawn = drawnPath.map(p => ({
            x: (p.x / canvas.width) * 100,
            y: (p.y / canvas.height) * 100
        }));

        // Simple validation: check if path roughly matches target shape
        // This is a simplified check - in production, you'd use more sophisticated comparison
        const isCorrect = validatePath(normalizedDrawn, q.targetPoints);

        if (isCorrect) {
            setScore(score + 1);
        }

        setShowFeedback(true);

        // Draw target path overlay
        drawTargetPath(q.targetPoints);
    };

    const validatePath = (drawn, target) => {
        if (drawn.length < 10) return false; // Too short

        // Check if path covers similar x-range
        const drawnMinX = Math.min(...drawn.map(p => p.x));
        const drawnMaxX = Math.max(...drawn.map(p => p.x));
        const coverage = drawnMaxX - drawnMinX;

        if (coverage < 60) return false; // Didn't draw across enough of the canvas

        // Sample points along the drawn path and compare to target
        const samples = 10;
        let matchCount = 0;

        for (let i = 0; i < samples; i++) {
            const targetX = (i / samples) * 100;
            const targetPoint = interpolateTarget(target, targetX);
            const drawnPoint = interpolateDrawn(drawn, targetX);

            if (drawnPoint && Math.abs(drawnPoint.y - targetPoint.y) < 20) {
                matchCount++;
            }
        }

        return matchCount >= 6; // At least 60% match
    };

    const interpolateTarget = (points, x) => {
        for (let i = 0; i < points.length - 1; i++) {
            if (x >= points[i].x && x <= points[i + 1].x) {
                const t = (x - points[i].x) / (points[i + 1].x - points[i].x);
                return {
                    x,
                    y: points[i].y + t * (points[i + 1].y - points[i].y)
                };
            }
        }
        return points[points.length - 1];
    };

    const interpolateDrawn = (drawn, targetX) => {
        const closest = drawn.reduce((prev, curr) => {
            return Math.abs(curr.x - targetX) < Math.abs(prev.x - targetX) ? curr : prev;
        }, drawn[0]);
        return closest;
    };

    const drawTargetPath = (targetPoints) => {
        if (!canvasContext) return;

        const canvas = canvasRef.current;
        canvasContext.strokeStyle = '#10b981';
        canvasContext.lineWidth = 2;
        canvasContext.setLineDash([5, 5]);

        canvasContext.beginPath();
        targetPoints.forEach((point, i) => {
            const x = (point.x / 100) * canvas.width;
            const y = (point.y / 100) * canvas.height;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }
        });
        canvasContext.stroke();
        canvasContext.setLineDash([]);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowFeedback(false);
            setDrawnPath([]);
            drawGrid(canvasContext);
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowFeedback(false);
        setQuizComplete(false);
        setShowIntro(true);
        setDrawnPath([]);
    };

    if (showIntro) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">📊</div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Graph Drawing Quiz</h1>
                        <p className="text-xl text-gray-600">Draw audio graphs to master ADSR, EQ, compression & filters!</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                        <div className="flex items-start gap-3 mb-4">
                            <BookOpen className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Draw ADSR envelopes for different sound types</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Shape EQ curves to boost or cut frequencies</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Understand compression ratios and thresholds</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Visualize filter frequency responses</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">How It Works</h3>
                                <div className="space-y-2 text-gray-700 text-sm">
                                    <p>🖱️ <strong>Draw with your mouse</strong> on the canvas to create the requested graph shape</p>
                                    <p>🎯 <strong>Match the target</strong> - your drawing will be compared to the correct answer</p>
                                    <p>✅ <strong>Get instant feedback</strong> - see the correct answer overlaid on your drawing</p>
                                    <p>🧹 <strong>Use Clear</strong> to start over if you make a mistake</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">🎨 {questions.length} Drawing Challenges</div>
                            <div>Hands-on practice</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-bold text-gray-800 mb-1">💡 Hints Included</div>
                            <div>Guidance for each graph</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowIntro(false)}
                        className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-lg flex items-center justify-center gap-2"
                    >
                        Start Drawing
                        <Play size={24} />
                    </button>
                </div>
            </div>
        );
    }

    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">
                            {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '🌟'}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
                        <div className="text-6xl font-bold text-purple-600 mb-2">{percentage}%</div>
                        <p className="text-xl text-gray-600 mb-8">
                            You scored {score} out of {questions.length}
                        </p>
                        <div className="space-y-3">
                            <div className={`p-4 rounded-lg ${percentage >= 70 ? 'bg-green-100 text-green-800' :
                                    percentage >= 50 ? 'bg-blue-100 text-blue-800' :
                                        'bg-purple-100 text-purple-800'
                                }`}>
                                <p className="font-semibold">
                                    {percentage >= 70 ? '🌟 Excellent! You have a great understanding of audio graphs!' :
                                        percentage >= 50 ? '👏 Good work! Keep practicing to improve your graph drawing skills.' :
                                            '💪 Great start! Drawing audio graphs takes practice. Review the explanations and try again!'}
                                </p>
                            </div>

                            <button
                                onClick={resetQuiz}
                                className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={20} />
                                {percentage < 100 ? 'Try Again' : 'Retake Quiz'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const q = questions[currentQuestion];
    const isCorrect = showFeedback && validatePath(
        drawnPath.map(p => ({
            x: (p.x / canvasRef.current?.width || 1) * 100,
            y: (p.y / canvasRef.current?.height || 1) * 100
        })),
        q.targetPoints
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">Graph Drawing Quiz</h1>
                        <p className="text-purple-100">Draw the audio graphs to demonstrate your understanding</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-100 h-2">
                        <div
                            className="bg-purple-600 h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Question Area */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-semibold text-gray-500">
                                Question {currentQuestion + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-semibold text-purple-600">
                                Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {q.question}
                            </h2>

                            {/* Hint */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                <div className="flex items-start gap-2">
                                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-800">Hint</p>
                                        <p className="text-sm text-yellow-700">{q.hint}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Drawing Canvas */}
                            <div className="bg-white border-4 border-gray-300 rounded-xl p-4 mb-4">
                                <canvas
                                    ref={canvasRef}
                                    width={600}
                                    height={300}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    className="w-full cursor-crosshair bg-gray-50 rounded-lg"
                                    style={{ touchAction: 'none' }}
                                />
                            </div>

                            {/* Drawing Controls */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={clearCanvas}
                                    disabled={showFeedback}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Eraser size={18} />
                                    Clear
                                </button>
                                <div className="flex-1" />
                                {!showFeedback && drawnPath.length > 10 && (
                                    <button
                                        onClick={checkAnswer}
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                    >
                                        Check Answer
                                    </button>
                                )}
                            </div>

                            {/* Feedback */}
                            {showFeedback && (
                                <div className={`p-4 rounded-lg border-2 mb-6 ${isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-orange-50 border-orange-500'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {isCorrect ? (
                                            <>
                                                <Check className="text-green-600" size={24} />
                                                <span className="font-bold text-green-800 text-lg">Great job! 🎨</span>
                                            </>
                                        ) : (
                                            <>
                                                <Lightbulb className="text-orange-600" size={24} />
                                                <span className="font-bold text-orange-800 text-lg">Good try! See the correct answer in green.</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700">{q.explanation}</p>
                                </div>
                            )}

                            {/* Next Button */}
                            {showFeedback && (
                                <button
                                    onClick={nextQuestion}
                                    className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center justify-center gap-2"
                                >
                                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                                    <Play size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
