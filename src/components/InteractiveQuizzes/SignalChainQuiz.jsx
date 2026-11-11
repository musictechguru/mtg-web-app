import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CheckCircle2, XCircle, ArrowDown, Maximize2, X } from 'lucide-react';

// --- Sortable Item Component ---
function SortableItem({ id, item, image, disabled, isCorrect, isIncorrect }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: '10px',
    };

    // Dynamic styling based on state
    let borderColor = 'rgba(255,255,255,0.12)';
    let bg = 'rgba(30, 41, 59, 0.7)';

    if (isCorrect) {
        borderColor = 'var(--accent-success, #22c55e)';
        bg = 'rgba(34, 197, 94, 0.15)';
    } else if (isIncorrect) {
        borderColor = 'var(--accent-error, #ef4444)';
        bg = 'rgba(239, 68, 68, 0.15)';
    }

    return (
        <div ref={setNodeRef} style={style} className="sortable-item-wrapper">
            <div
                className="sortable-item"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    cursor: disabled ? 'default' : 'grab',
                    touchAction: 'none',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    transition: 'border-color 0.2s, background-color 0.2s'
                }}
            >
                <div {...attributes} {...listeners} style={{ cursor: disabled ? 'default' : 'grab', opacity: 0.6, flexShrink: 0 }}>
                    <GripVertical size={20} />
                </div>
                {image && (
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <img 
                            src={image} 
                            alt="" 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                        />
                    </div>
                )}
                <span style={{ fontSize: '0.96rem', fontWeight: '500', color: '#f8fafc', flex: 1 }}>{item}</span>
            </div>
            {/* Visual connector line between items */}
            <div className="connector-line" style={{ display: 'flex', justifyContent: 'center', height: '12px', opacity: 0.35, color: '#38bdf8' }}>
                {!disabled && <ArrowDown size={14} />}
            </div>
        </div>
    );
}

// Helper to resolve icon thumbnail for each studio chain element
const resolveItemImage = (itemText, explicitMap = {}) => {
    if (explicitMap && explicitMap[itemText]) {
        return explicitMap[itemText];
    }
    const lower = (itemText || '').toLowerCase();
    if (lower.includes('mic') || lower.includes('capsule') || lower.includes('transducer')) return '/images/svg/microphone_preamp.svg';
    if (lower.includes('cable') || lower.includes('xlr') || lower.includes('lead') || lower.includes('usb')) return '/images/svg/balanced_cable.svg';
    if (lower.includes('preamp') || lower.includes('phantom') || lower.includes('+48v') || lower.includes('gain stage')) return '/images/svg/phantom_power.svg';
    if (lower.includes('converter') || lower.includes('adc') || lower.includes('interface')) return '/images/svg/audio_interface.svg';
    if (lower.includes('daw') || lower.includes('pcm') || lower.includes('track') || lower.includes('laptop')) return '/images/svg/transport_bar.svg';
    if (lower.includes('speaker') || lower.includes('monitor') || lower.includes('acoustic sound') || lower.includes('woofer') || lower.includes('bass')) return '/images/svg/bass_woofer.svg';
    if (lower.includes('oscillator') || lower.includes('vco') || lower.includes('wave')) return '/images/svg/frequency_spectrum_treble.svg';
    if (lower.includes('filter') || lower.includes('vcf') || lower.includes('cutoff')) return '/images/svg/high_pass_filter_sweep_riser.svg';
    if (lower.includes('amplifier') || lower.includes('vca')) return '/images/svg/serial_compression_sandwhich.svg';
    if (lower.includes('adsr') || lower.includes('envelope') || lower.includes('lfo')) return '/images/svg/adsr_envelope_phases.svg';
    if (lower.includes('compressor') || lower.includes('compression') || lower.includes('limiter')) return '/images/svg/dynamic_eq_threshold_action.svg';
    if (lower.includes('eq') || lower.includes('equaliz') || lower.includes('tonal')) return '/images/svg/eq_bell_curve_q_comparison.svg';
    if (lower.includes('reverb') || lower.includes('reflections') || lower.includes('rt60')) return '/images/svg/reverb_diffusion_density.svg';
    if (lower.includes('delay') || lower.includes('echo') || lower.includes('feedback')) return '/images/svg/delay_feedback_loop.svg';
    if (lower.includes('sample') || lower.includes('slice') || lower.includes('chop') || lower.includes('truncat')) return '/images/svg/vocal_chopping_sampling_technique.svg';
    if (lower.includes('bass trap') || lower.includes('modal') || lower.includes('corner')) return '/images/svg/acoustics_bass_trap_corner_placement.svg';
    if (lower.includes('diffus')) return '/images/svg/acoustics_diffuser_types_qrd_skyline.svg';
    if (lower.includes('absor') || lower.includes('mirror') || lower.includes('cloud')) return '/images/svg/monitor_wedge_null.svg';
    if (lower.includes('patchbay') || lower.includes('insert send') || lower.includes('insert return')) return '/images/svg/insert_flow.svg';
    if (lower.includes('dither') || lower.includes('16-bit')) return '/images/svg/dither_noise.svg';
    if (lower.includes('polar') || lower.includes('cardioid') || lower.includes('null') || lower.includes('angle')) return '/images/svg/polar_pattern_cardioid.svg';
    if (lower.includes('3:1') || lower.includes('distance')) return '/images/svg/3_to_1_rule_diagram.svg';
    if (lower.includes('guitar') || lower.includes('pedal') || lower.includes('amp')) return '/images/svg/amp_cone_axis.svg';
    return null;
};

// --- Main Quiz Component ---
export default function SignalChainQuiz({ items = [], correctOrder = [], itemImages = {}, diagramImg = null, onResult, onExpandImage }) {
    // Local state for the list items
    const [listItems, setListItems] = useState(items);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);

    // Reset when inputs change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setListItems(items);
        setIsSubmitted(false);
        setIsCorrect(false);
    }, [items]);

    // Handle Escape key to close local modal
    useEffect(() => {
        if (!isLocalModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsLocalModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLocalModalOpen]);

    const handleExpandImage = () => {
        if (!diagramImg) return;
        if (onExpandImage) {
            onExpandImage({
                src: diagramImg,
                alt: 'Studio Signal Flow Reference Diagram'
            });
        } else {
            setIsLocalModalOpen(true);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // minimum drag distance before activating
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (isSubmitted) return;

        if (active.id !== over.id) {
            setListItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleCheck = () => {
        setIsSubmitted(true);
        // Compare arrays
        const isOrderCorrect = JSON.stringify(listItems) === JSON.stringify(correctOrder);
        setIsCorrect(isOrderCorrect);

        if (onResult) {
            onResult(isOrderCorrect);
        }
    };

    return (
        <div className="signal-chain-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            {diagramImg && (
                <div
                    onClick={handleExpandImage}
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleExpandImage();
                        }
                    }}
                    style={{
                        marginBottom: '20px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: isImageHovered ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.14)',
                        background: isImageHovered ? 'rgba(15, 23, 42, 0.85)' : 'rgba(0, 0, 0, 0.4)',
                        padding: '14px',
                        textAlign: 'center',
                        cursor: 'zoom-in',
                        position: 'relative',
                        boxShadow: isImageHovered ? '0 8px 24px rgba(56, 189, 248, 0.18)' : '0 4px 12px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    title="Click to enlarge diagram in high-resolution view"
                    aria-label="Enlarge Studio Signal Flow Reference Diagram"
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <div style={{
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: '#38bdf8',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <span>Studio Signal Flow Reference Diagram</span>
                        </div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: isImageHovered ? '#38bdf8' : '#94a3b8',
                            background: isImageHovered ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.06)',
                            border: isImageHovered ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                        }}>
                            <Maximize2 size={12} />
                            <span>Click to expand</span>
                        </div>
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                        <img
                            src={diagramImg}
                            alt="Reference Studio Flow"
                            style={{
                                maxHeight: '220px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                                transform: isImageHovered ? 'scale(1.02)' : 'scale(1)',
                                transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                                display: 'inline-block'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Standalone Fallback Modal (active if onExpandImage prop is not provided) */}
            {isLocalModalOpen && diagramImg && (
                <div
                    onClick={() => setIsLocalModalOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(5, 11, 20, 0.94)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        padding: '16px',
                        cursor: 'default'
                    }}
                >
                    <button
                        onClick={() => setIsLocalModalOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#fff',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 100000
                        }}
                        title="Close (Esc)"
                        aria-label="Close enlarged diagram"
                    >
                        <X size={22} />
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: 'min(94vw, 1100px)',
                            maxHeight: 'min(86vh, 800px)',
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '14px',
                            padding: '18px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.85)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Studio Signal Flow Reference Diagram
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Press Esc or click outside to close
                            </span>
                        </div>
                        <img
                            src={diagramImg}
                            alt="Reference Studio Flow"
                            style={{
                                maxWidth: '100%',
                                maxHeight: 'calc(min(86vh, 800px) - 60px)',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
            )}

            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Drag the items into the correct <strong>Signal Flow</strong> order (Top to Bottom).
            </p>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={listItems}
                    strategy={verticalListSortingStrategy}
                >
                    {listItems.map((item, index) => (
                        <SortableItem
                            key={item}
                            id={item}
                            item={item}
                            image={resolveItemImage(item, itemImages)}
                            disabled={isSubmitted}
                            isCorrect={isSubmitted && isCorrect}
                            isIncorrect={isSubmitted && !isCorrect && listItems[index] !== correctOrder[index]}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {!isSubmitted ? (
                <button
                    onClick={handleCheck}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Check Signal Chain
                </button>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isCorrect ? <CheckCircle2 color="#22c55e" /> : <XCircle color="#ef4444" />}
                    <span style={{ fontWeight: 'bold' }}>
                        {isCorrect ? "Perfect! The Audio Signal is flowing." : "Silence. The signal is broken."}
                    </span>
                </div>
            )}

            {isSubmitted && !isCorrect && (
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
                    <p><strong>Correct Order:</strong> {correctOrder.join(' → ')}</p>
                </div>
            )}
        </div>
    );
}
