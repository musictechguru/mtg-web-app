import React, { useState, useRef, useEffect } from 'react';
import { Eraser } from 'lucide-react';

const GraphDrawingQuiz = ({ question, targetPoints, hint, initValues, correctValues: correctValuesProp, onResult }) => {
    const [drawnPath, setDrawnPath] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const canvasRef = useRef(null);
    const [canvasContext, setCanvasContext] = useState(null);

    // State for sliders
    const [sliderValues, setSliderValues] = useState({});
    const [correctValues, setCorrectValues] = useState(null);

    // Initialize sliders and correct values based on question type
    useEffect(() => {
        if (initValues && correctValuesProp) {
            setSliderValues(initValues);
            setCorrectValues(correctValuesProp);
            return;
        }

        const type = getQuestionType();
        const text = question.toLowerCase();

        let init = {};
        let correct = {};

        if (type === 'adsr') {
            if (text.includes('fast attack')) {
                // target 15% attack, 20% decay, 70% sustain, 30% release. Using width * 0.33 scale
                init = { attack: 20, decay: 20, sustain: 50, release: 50 };
                correct = { attack: 45, decay: 60, sustain: 70, release: 90 };
            } else { // Pad
                init = { attack: 50, decay: 20, sustain: 50, release: 50 };
                correct = { attack: 90, decay: 0, sustain: 100, release: 90 };
            }
        } else if (type === 'eq') {
            init = { frequency: 1000, gain: 0 };
            correct = { frequency: 3000, gain: 6 };
        } else if (type === 'compression') {
            init = { threshold: 0, ratio: 1 };
            correct = { threshold: -12, ratio: 4 };
        } else if (type === 'filter') {
            if (text.includes('high')) {
                init = { cutoff: 20, slope: 12 };
                correct = { cutoff: 100, slope: 12 };
            } else {
                init = { cutoff: 20000, slope: 12 };
                correct = { cutoff: 2000, slope: 12 };
            }
        }

        setSliderValues(init);
        setCorrectValues(correct);
    }, [question, initValues, correctValuesProp]);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            setCanvasContext(ctx);
            drawGrid(ctx);
        }
    }, [question]); // Re-draw grid if question type changes

    const getQuestionType = () => {
        const text = (question || '').toLowerCase();
        if (text.includes('adsr') || text.includes('envelope')) return 'adsr';
        if (text.includes('eq')) return 'eq';
        if (text.includes('compression') || text.includes('limiter')) return 'compression';
        if (text.includes('filter')) return 'filter';
        return 'unknown';
    };

    const handleSliderChange = (param, value) => {
        const newValues = { ...sliderValues, [param]: parseFloat(value) };
        setSliderValues(newValues);
        updateGraphFromSliders(newValues);
    };

    const updateGraphFromSliders = (values) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const points = calculatePoints(values, canvas.width, canvas.height);
        setDrawnPath(points);
        drawPath(points);
    };

    const calculatePoints = (values, width, height) => {
        const type = getQuestionType();
        let points = [];

        if (type === 'adsr') {
            // Calculate ADSR points using max 33% of width for stages
            const attackTime = (values.attack / 100) * (width * 0.33);
            const decayTime = (values.decay / 100) * (width * 0.33);
            const sustainLevel = (values.sustain / 100) * height;
            const releaseTime = (values.release / 100) * (width * 0.33);

            // In ADSR, if sustain is 0, the decay drops to the bottom, then stays at bottom until note release
            const sustainStartX = Math.min(attackTime + decayTime, width);
            const sustainEndX = Math.max(sustainStartX, width - releaseTime);

            points = [
                { x: 0, y: height },
                { x: Math.min(attackTime, width), y: 0 },
                { x: sustainStartX, y: height - sustainLevel },
                { x: sustainEndX, y: height - sustainLevel },
                { x: width, y: height }
            ];
        } else if (type === 'eq') {
            const freqX = getLogX(values.frequency, 20, 20000, width);
            const questionText = (question || '').toLowerCase();
            const isHighShelf = questionText.includes('high shelf') || questionText.includes('high-shelf');
            const isLowShelf = questionText.includes('low shelf') || questionText.includes('low-shelf');

            for (let x = 0; x <= width; x += 5) {
                let gainFactor = 0;

                if (isHighShelf) {
                    // Sigmoid transition for high shelf
                    const dist = (x - freqX) / 30; // 30px transition width
                    gainFactor = 1 / (1 + Math.exp(-dist));
                } else if (isLowShelf) {
                    // Sigmoid transition for low shelf
                    const dist = (freqX - x) / 30;
                    gainFactor = 1 / (1 + Math.exp(-dist));
                } else {
                    // Calculate EQ bell curve
                    const dist = Math.abs(x - freqX);
                    gainFactor = Math.exp(-(dist * dist) / (2 * 1000)); // Simple bell shape width is fixed
                }

                // 24dB range max. 100% / 24 = 4.16% per dB
                const y = (height / 2) - (gainFactor * (values.gain / 24) * height);
                points.push({ x, y });
            }
        } else if (type === 'compression') {
            // Calculate Compression knee
            const normalizeDb = (db) => Math.max(0, Math.min(1, (db + 40) / 40));
            const threshX = normalizeDb(values.threshold) * width;
            const threshY = height - normalizeDb(values.threshold) * height; // 0db is top, -40 is bottom

            // Calculate end point based on ratio
            const inputRemaining = 0 - values.threshold;

            // Handle true limiters visually (e.g. ratio 10 or higher is basically flat)
            const activeRatio = values.ratio >= 10 ? 100 : values.ratio;
            const outputRise = inputRemaining / activeRatio;

            const endY = threshY - (outputRise / 40) * height;

            points = [
                { x: 0, y: height },
                { x: threshX, y: threshY },
                { x: width, y: endY }
            ];
        } else if (type === 'filter') {
            // Filter
            points = [];
            for (let x = 0; x <= width; x += 5) {
                const t = x / width;
                const freq = 20 * Math.pow(1000, t);
                let gain = 0;

                const isHighPass = question.toLowerCase().includes('high-pass') || question.toLowerCase().includes('high pass');

                if (isHighPass) {
                    if (freq < values.cutoff) {
                        const octaves = Math.log2(values.cutoff / freq);
                        gain = -Math.abs(values.slope) * octaves;
                    }
                } else {
                    if (freq > values.cutoff) {
                        const octaves = Math.log2(freq / values.cutoff);
                        gain = -Math.abs(values.slope) * octaves;
                    }
                }

                // Convert gain to Y pixels. Range +12 to -36dB (48dB range)
                const y = 75 - (gain / 48) * height;
                const clampedY = Math.min(Math.max(y, 0), height);
                points.push({ x, y: clampedY });
            }
        }
        return points;
    };

    const getLogX = (freq, minFreq, maxFreq, width) => {
        const minLog = Math.log10(minFreq);
        const maxLog = Math.log10(maxFreq);
        const freqLog = Math.log10(freq);
        return ((freqLog - minLog) / (maxLog - minLog)) * width;
    };

    const drawPath = (points) => {
        if (!canvasContext || points.length < 2) return;

        drawGrid(canvasContext); // Clear and redraw grid

        canvasContext.strokeStyle = '#8b5cf6';
        canvasContext.lineWidth = 3;
        canvasContext.lineCap = 'round';
        canvasContext.lineJoin = 'round';

        canvasContext.beginPath();
        canvasContext.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            canvasContext.lineTo(points[i].x, points[i].y);
        }
        canvasContext.stroke();
    };

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

        // Add axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';

        // Determine labels based on question type
        let xLabel = 'Time';
        let yLabel = 'Level';
        const type = getQuestionType();

        if (type === 'eq' || type === 'filter') {
            xLabel = 'Frequency';
            yLabel = 'Gain (dB)';
        } else if (type === 'compression') {
            xLabel = 'Input Level (dB)';
            yLabel = 'Output Level (dB)';
        } else if (type === 'adsr') {
            xLabel = 'Time';
            yLabel = 'Level';
        }

        // X-axis label (bottom center)
        ctx.fillText(xLabel, canvas.width / 2, canvas.height - 5);

        // Y-axis label (left side, rotated)
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(yLabel, 0, 0);
        ctx.restore();

        // Add tick marks and values
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#9ca3af';

        if (type === 'eq' || type === 'filter') {
            // Logarithmic frequency scale: 20Hz to 20kHz
            ctx.textAlign = 'center';

            // Key frequency points on logarithmic scale
            const freqPoints = [
                { freq: '20Hz', pos: 0 },
                { freq: '100Hz', pos: 0.15 },
                { freq: '1kHz', pos: 0.40 },
                { freq: '5kHz', pos: 0.65 },
                { freq: '10kHz', pos: 0.80 },
                { freq: '20kHz', pos: 1.0 }
            ];

            freqPoints.forEach(point => {
                const x = point.pos * canvas.width;
                ctx.fillText(point.freq, x, canvas.height - 5);

                // Draw small tick mark
                ctx.beginPath();
                ctx.moveTo(x, canvas.height - 15);
                ctx.lineTo(x, canvas.height - 10);
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Y-axis for dB (gain)
            ctx.textAlign = 'right';
            ctx.fillText('+12dB', 40, 15);
            ctx.fillText('0dB', 40, canvas.height / 2 + 4);
            ctx.fillText('-12dB', 40, canvas.height - 5);
        } else if (type === 'compression') {
            // Compression graph: Input/Output in dB
            ctx.textAlign = 'center';

            // X-axis (Input Level)
            ctx.fillText('-40dB', 15, canvas.height - 5);
            ctx.fillText('-30dB', canvas.width * 0.25, canvas.height - 5);
            ctx.fillText('-20dB', canvas.width * 0.5, canvas.height - 5);
            ctx.fillText('-10dB', canvas.width * 0.75, canvas.height - 5);
            ctx.fillText('0dB', canvas.width - 10, canvas.height - 5);

            // Y-axis (Output Level)
            ctx.textAlign = 'right';
            ctx.fillText('0dB', 40, 15);
            ctx.fillText('-10dB', 40, canvas.height * 0.25 + 4);
            ctx.fillText('-20dB', 40, canvas.height * 0.5 + 4);
            ctx.fillText('-30dB', 40, canvas.height * 0.75 + 4);
            ctx.fillText('-40dB', 40, canvas.height - 5);

        } else if (type === 'adsr') {
            // ADSR envelope: Time in milliseconds
            ctx.textAlign = 'center';

            // X-axis (Time)
            ctx.fillText('0ms', 10, canvas.height - 5);
            ctx.fillText('250ms', canvas.width / 4, canvas.height - 5);
            ctx.fillText('500ms', canvas.width / 2, canvas.height - 5);
            ctx.fillText('750ms', canvas.width * 0.75, canvas.height - 5);
            ctx.fillText('1000ms', canvas.width - 15, canvas.height - 5);

            // Y-axis (Amplitude)
            ctx.textAlign = 'right';
            ctx.fillText('100%', 40, 15);
            ctx.fillText('75%', 40, canvas.height / 4 + 4);
            ctx.fillText('50%', 40, canvas.height / 2 + 4);
            ctx.fillText('25%', 40, canvas.height * 0.75 + 4);
            ctx.fillText('0%', 40, canvas.height - 5);

        } else {
            // Fallback: Standard percentage scale
            ctx.textAlign = 'right';

            // Top (max)
            ctx.fillText('Max', 35, 15);

            // Middle
            ctx.fillText('50%', 35, canvas.height / 2 + 4);

            // Bottom (min)
            ctx.fillText('Min', 35, canvas.height - 5);

            // Add tick marks on X-axis
            ctx.textAlign = 'center';
            ctx.fillText('0%', 5, canvas.height - 5);
            ctx.fillText('50%', canvas.width / 2, canvas.height - 5);
            ctx.fillText('100%', canvas.width - 10, canvas.height - 5);
        }
    };

    const startDrawing = (e) => {
        if (submitted) return;
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDrawnPath([{ x, y }]);
    };

    const draw = (e) => {
        if (!isDrawing || submitted) return;

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

    const [isCorrect, setIsCorrect] = useState(false);

    const checkAnswer = () => {
        const canvas = canvasRef.current;

        // Determine if it is a slider-based answer or a drawn path answer
        let currentIsCorrect = false;

        if (correctValues && Object.keys(sliderValues).length > 0) {
            // Slider based evaluation with tolerance
            currentIsCorrect = true;
            for (const [key, targetVal] of Object.entries(correctValues)) {
                const userVal = sliderValues[key];

                // Define tolerance based on parameter type
                let tolerance = 0;
                if (key === 'frequency' || key === 'cutoff') {
                    // Logarithmic tolerance (e.g., within 20% of target)
                    tolerance = targetVal * 0.20;
                } else if (key === 'gain' || key === 'threshold') {
                    // +/- 2dB
                    tolerance = 2;
                } else if (key === 'ratio') {
                    // +/- 1.0 ratio
                    tolerance = 1.0;
                } else if (['attack', 'decay', 'sustain', 'release'].includes(key)) {
                    // +/- 10%
                    tolerance = 10;
                }

                if (Math.abs(userVal - targetVal) > tolerance) {
                    currentIsCorrect = false;
                    break;
                }
            }
        } else if (drawnPath.length > 0) {
            // Path-based evaluation
            const normalizedDrawn = drawnPath.map(p => ({
                x: (p.x / canvas.width) * 100,
                y: (p.y / canvas.height) * 100
            }));
            currentIsCorrect = validatePath(normalizedDrawn, targetPoints);
        }

        // Draw target path overlay
        let referencePath = targetPoints;
        if (correctValues) {
            const idealPoints = calculatePoints(correctValues, canvas.width, canvas.height);
            referencePath = idealPoints.map(p => ({
                x: (p.x / canvas.width) * 100,
                y: (p.y / canvas.height) * 100
            }));
        }

        setSubmitted(true);
        setIsCorrect(currentIsCorrect);
        onResult(currentIsCorrect);
        drawTargetPath(referencePath);
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

    const drawTargetPath = (referencePath) => {
        if (!canvasContext || !referencePath || referencePath.length < 2) return;

        const canvas = canvasRef.current;
        canvasContext.strokeStyle = '#22c55e'; // Green
        canvasContext.lineWidth = 3;
        canvasContext.setLineDash([5, 5]);

        canvasContext.beginPath();
        referencePath.forEach((point, i) => {
            // Points are normalized 0-100
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

    return (
        <div style={{ width: '100%' }}>
            {/* Hint */}
            {hint && !submitted && (
                <div style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                }}>
                    <strong style={{ color: '#fbbf24' }}>💡 Hint:</strong> {hint}
                </div>
            )}

            {/* Drawing Canvas */}
            <div style={{
                background: 'white',
                border: '4px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px'
            }}>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={300}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                        width: '100%',
                        cursor: submitted ? 'not-allowed' : 'crosshair',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        touchAction: 'none'
                    }}
                />
            </div>

            {/* Sliders Control Panel */}
            {
                !submitted && (
                    <div style={{
                        background: '#f3f4f6',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {Object.entries(sliderValues).map(([param, value]) => (
                            <div key={param} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600', color: '#4b5563' }}>
                                    <span style={{ textTransform: 'capitalize' }}>{param}</span>
                                    <span style={{ color: 'var(--accent-purple)' }}>
                                        {param === 'frequency' || param === 'cutoff' ? `${Math.round(value)} Hz` :
                                            param === 'gain' || param === 'threshold' ? `${Math.round(value)} dB` :
                                                param === 'ratio' ? (value >= 10 ? 'Inf:1' : `${value.toFixed(1)}:1`) :
                                                    param === 'slope' ? `${value} dB/oct` :
                                                        `${Math.round(value)}${param === 'attack' || param === 'decay' || param === 'release' ? '' : '%'}`}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={(param === 'frequency' || param === 'cutoff') ? Math.log10(20) : param === 'threshold' ? -40 : param === 'gain' ? -24 : param === 'ratio' ? 1 : param === 'slope' ? 12 : 0}
                                    max={(param === 'frequency' || param === 'cutoff') ? Math.log10(20000) : param === 'gain' ? 24 : param === 'threshold' ? 0 : param === 'ratio' ? 10 : param === 'slope' ? 24 : 100}
                                    step={(param === 'frequency' || param === 'cutoff') ? 0.01 : param === 'ratio' ? 0.1 : param === 'slope' ? 12 : 1}
                                    value={(param === 'frequency' || param === 'cutoff') ? Math.log10(value) : value}
                                    onChange={(e) => {
                                        let val = parseFloat(e.target.value);
                                        if (param === 'frequency' || param === 'cutoff') {
                                            val = Math.pow(10, val);
                                            // Auto-snap log values to logical rounded numbers
                                            if (val >= 1000) val = Math.round(val / 100) * 100;
                                            else if (val >= 100) val = Math.round(val / 10) * 10;
                                            else val = Math.round(val);
                                            // Make hitting correct targets very easy
                                            if (Math.abs(val - 3000) < 300) val = 3000;
                                            if (Math.abs(val - 2000) < 200) val = 2000;
                                        } else if (param === 'gain' || param === 'threshold' || param === 'attack' || param === 'decay' || param === 'sustain' || param === 'release' || param === 'slope') {
                                            val = Math.round(val);
                                        } else if (param === 'ratio') {
                                            val = Math.round(val * 10) / 10;
                                        } else {
                                            val = Math.round(val);
                                        }
                                        handleSliderChange(param, val);
                                    }}
                                    style={{
                                        width: '100%',
                                        accentColor: '#8b5cf6',
                                        height: '6px',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )
            }

            {/* Drawing Controls */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <button
                    onClick={clearCanvas}
                    disabled={submitted}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        background: 'rgba(156, 163, 175, 0.2)',
                        color: '#4b5563',
                        border: '2px solid rgba(156, 163, 175, 0.3)',
                        borderRadius: '8px',
                        cursor: submitted ? 'not-allowed' : 'pointer',
                        opacity: submitted ? 0.5 : 1,
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}
                >
                    <Eraser size={18} />
                    Clear
                </button>

                {!submitted && (drawnPath.length > 2 || Object.keys(sliderValues).length > 0) && (
                    <button
                        onClick={checkAnswer}
                        style={{
                            flex: 1,
                            padding: '10px 16px',
                            background: 'var(--accent-purple)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}
                    >
                        Check Answer
                    </button>
                )}
            </div>

            {/* Feedback */}
            {
                submitted && (
                    <div style={{
                        padding: '15px',
                        borderRadius: '8px',
                        border: `2px solid ${isCorrect ? 'var(--accent-success)' : 'var(--accent-warning)'}`,
                        background: isCorrect
                            ? 'rgba(34, 197, 94, 0.1)'
                            : 'rgba(251, 191, 36, 0.1)',
                        marginTop: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>
                                {isCorrect ? '✅' : '💡'}
                            </span>
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                color: isCorrect ? 'var(--accent-success)' : 'var(--accent-warning)'
                            }}>
                                {isCorrect ? 'Great job! 🎨' : 'Good try! See the correct answer in green.'}
                            </span>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default GraphDrawingQuiz;
