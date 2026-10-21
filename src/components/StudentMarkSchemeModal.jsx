import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare, Square, X, Award, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import PremiumLocked from './PremiumLocked';
import {
    C1_MARK_SCHEME_ITEMS,
    C2_MARK_SCHEME_ITEMS,
    getGradeFromPercentage
} from './teacherComponentMetrics';

const C1_LOCAL_KEY = 'mtg_component1_mark_scheme_ticks_v1';
const C2_LOCAL_KEY = 'mtg_component2_mark_scheme_ticks_v1';

export default function StudentMarkSchemeModal({
    isOpen,
    onClose,
    initialComponent = 'c1' // 'c1' | 'c2'
}) {
    const { userProgress, saveComponent1Progress, saveComponent2Progress, currentUser } = useUser() || {};
    const [activeComponent, setActiveComponent] = useState(initialComponent);
    const [copied, setCopied] = useState(false);

    // Sync active component when prop changes
    useEffect(() => {
        if (initialComponent) {
            setActiveComponent(initialComponent);
        }
    }, [initialComponent, isOpen]);

    // Local tick state for C1
    const [c1Ticks, setC1Ticks] = useState(() => {
        try {
            const saved = localStorage.getItem(C1_LOCAL_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Error loading C1 local ticks:', e);
        }
        return userProgress?.component1Guide?.markSchemeTicks || {};
    });

    // Local tick state for C2
    const [c2Ticks, setC2Ticks] = useState(() => {
        try {
            const saved = localStorage.getItem(C2_LOCAL_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Error loading C2 local ticks:', e);
        }
        return userProgress?.component2Guide?.markSchemeTicks || {};
    });

    // Synchronize if userProgress updates externally
    useEffect(() => {
        if (userProgress?.component1Guide?.markSchemeTicks) {
            setC1Ticks(prev => ({
                ...userProgress.component1Guide.markSchemeTicks,
                ...prev
            }));
        }
    }, [userProgress?.component1Guide?.markSchemeTicks]);

    useEffect(() => {
        if (userProgress?.component2Guide?.markSchemeTicks) {
            setC2Ticks(prev => ({
                ...userProgress.component2Guide.markSchemeTicks,
                ...prev
            }));
        }
    }, [userProgress?.component2Guide?.markSchemeTicks]);

    // Calculation for C1
    const c1EarnedMarks = useMemo(() => {
        return Object.values(c1Ticks).filter(Boolean).length * 4;
    }, [c1Ticks]);
    const c1Percentage = Math.min(100, Math.round((c1EarnedMarks / 60) * 100));
    const c1Grade = useMemo(() => getGradeFromPercentage(c1Percentage), [c1Percentage]);

    // Calculation for C2
    const c2EarnedMarks = useMemo(() => {
        return Object.values(c2Ticks).filter(Boolean).length * 4;
    }, [c2Ticks]);
    const c2Percentage = Math.min(100, Math.round((c2EarnedMarks / 60) * 100));
    const c2Grade = useMemo(() => getGradeFromPercentage(c2Percentage), [c2Percentage]);

    // Toggle tick for C1
    const handleToggleC1 = (itemId) => {
        setC1Ticks(prev => {
            const next = { ...prev, [itemId]: !prev[itemId] };
            try {
                localStorage.setItem(C1_LOCAL_KEY, JSON.stringify(next));
            } catch (e) {
                console.error('Error saving C1 local ticks:', e);
            }
            if (saveComponent1Progress) {
                const currentC1Guide = userProgress?.component1Guide || {};
                saveComponent1Progress({
                    ...currentC1Guide,
                    markSchemeTicks: next
                });
            }
            return next;
        });
    };

    // Toggle tick for C2
    const handleToggleC2 = (itemId) => {
        setC2Ticks(prev => {
            const next = { ...prev, [itemId]: !prev[itemId] };
            try {
                localStorage.setItem(C2_LOCAL_KEY, JSON.stringify(next));
            } catch (e) {
                console.error('Error saving C2 local ticks:', e);
            }
            if (saveComponent2Progress) {
                const currentC2Guide = userProgress?.component2Guide || {};
                saveComponent2Progress({
                    ...currentC2Guide,
                    markSchemeTicks: next
                });
            }
            return next;
        });
    };

    // Copy candidate summary
    const handleCopySummary = () => {
        const isC1 = activeComponent === 'c1';
        const title = isC1 ? 'Component 1: Recording (9MT0/01)' : 'Component 2: Technology-Based Composition (9MT0/02)';
        const marks = isC1 ? c1EarnedMarks : c2EarnedMarks;
        const pct = isC1 ? c1Percentage : c2Percentage;
        const gr = isC1 ? c1Grade.grade : c2Grade.grade;
        const items = isC1 ? C1_MARK_SCHEME_ITEMS : C2_MARK_SCHEME_ITEMS;
        const ticks = isC1 ? c1Ticks : c2Ticks;

        let text = `========================================\n`;
        text += `PEARSON EDEXCEL A-LEVEL MUSIC TECHNOLOGY\n`;
        text += `MARK SCHEME CHECKLIST: ${title}\n`;
        text += `Score: ${marks} / 60 Marks (${pct}%) • Grade ${gr}\n`;
        text += `========================================\n\n`;

        items.forEach((item, idx) => {
            const ticked = Boolean(ticks[item.id]);
            text += `[${ticked ? 'X' : ' '}] ${idx + 1}. ${item.label} [${item.pointsLabel}]\n`;
            text += `    Criteria: ${item.sub}\n\n`;
        });

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    if (!isOpen) return null;

    if (!currentUser?.is_premium) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(7, 11, 22, 0.88)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px'
            }}>
                <div style={{
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '850px',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                    padding: '30px 20px',
                    overflowY: 'auto'
                }}>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            color: '#cbd5e1',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        <X size={20} />
                    </button>
                    <PremiumLocked itemTitle={activeComponent === 'c1' ? 'Component 1: Mark Scheme Tick List' : 'Component 2: Mark Scheme Tick List'} />
                </div>
            </div>
        );
    }

    const currentItems = activeComponent === 'c1' ? C1_MARK_SCHEME_ITEMS : C2_MARK_SCHEME_ITEMS;
    const currentTicks = activeComponent === 'c1' ? c1Ticks : c2Ticks;
    const currentMarks = activeComponent === 'c1' ? c1EarnedMarks : c2EarnedMarks;
    const currentPct = activeComponent === 'c1' ? c1Percentage : c2Percentage;
    const currentGrade = activeComponent === 'c1' ? c1Grade : c2Grade;
    const onToggle = activeComponent === 'c1' ? handleToggleC1 : handleToggleC2;
    const componentThemeColor = activeComponent === 'c1' ? '#38bdf8' : '#f472b6';

    // Group items by category
    const categories = Array.from(new Set(currentItems.map(item => item.category)));

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 11, 22, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
        }}>
            <div style={{
                background: '#0f172a',
                border: `1px solid ${componentThemeColor}40`,
                borderRadius: '20px',
                width: '100%',
                maxWidth: '920px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: `0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${componentThemeColor}20`,
                overflow: 'hidden'
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                    background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.4rem' }}>{activeComponent === 'c1' ? '🎙️' : '🎹'}</span>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                                Coursework Mark Scheme Tick List
                            </h2>
                            <span style={{
                                background: `${componentThemeColor}20`,
                                color: componentThemeColor,
                                border: `1px solid ${componentThemeColor}50`,
                                padding: '3px 10px',
                                borderRadius: '999px',
                                fontSize: '0.78rem',
                                fontWeight: 800
                            }}>
                                60 Marks Total
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                            Official Pearson Edexcel mark scheme criteria. Each tick box awards marks toward your 60-mark coursework score.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#cbd5e1',
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Component Switcher Tabs */}
                <div style={{
                    padding: '12px 24px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => setActiveComponent('c1')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            border: activeComponent === 'c1' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: activeComponent === 'c1' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            color: activeComponent === 'c1' ? '#38bdf8' : '#94a3b8',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                        }}
                    >
                        <span>🎙️ Component 1: Recording</span>
                        <span style={{
                            background: activeComponent === 'c1' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                            color: activeComponent === 'c1' ? '#0f172a' : '#cbd5e1',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '0.74rem',
                            fontWeight: 800
                        }}>
                            {c1EarnedMarks}/60m ({c1Percentage}%)
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveComponent('c2')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            border: activeComponent === 'c2' ? '1px solid #f472b6' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: activeComponent === 'c2' ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            color: activeComponent === 'c2' ? '#f472b6' : '#94a3b8',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                        }}
                    >
                        <span>🎹 Component 2: Composition</span>
                        <span style={{
                            background: activeComponent === 'c2' ? '#f472b6' : 'rgba(255, 255, 255, 0.1)',
                            color: activeComponent === 'c2' ? '#0f172a' : '#cbd5e1',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '0.74rem',
                            fontWeight: 800
                        }}>
                            {c2EarnedMarks}/60m ({c2Percentage}%)
                        </span>
                    </button>
                </div>

                {/* Score & Predicted Grade Banner */}
                <div style={{
                    padding: '18px 24px',
                    background: 'rgba(30, 41, 59, 0.4)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>
                                Marks Earned
                            </div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: componentThemeColor, display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span>{currentMarks}</span>
                                <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 60 Marks</span>
                            </div>
                        </div>

                        <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.1)' }} />

                        <div>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>
                                Predicted Boundary
                            </div>
                            <span style={{
                                background: currentGrade.bg,
                                color: currentGrade.color,
                                border: `1px solid ${currentGrade.color}50`,
                                padding: '4px 12px',
                                borderRadius: '8px',
                                fontWeight: 900,
                                fontSize: '1.05rem',
                                display: 'inline-block'
                            }}>
                                Grade {currentGrade.grade} ({currentPct}%)
                            </span>
                        </div>
                    </div>

                    <div style={{ flex: '1', minWidth: '200px', maxWidth: '340px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>
                            <span>Progress to Full Marks</span>
                            <span>{currentPct}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${currentPct}%`,
                                height: '100%',
                                background: `linear-gradient(90deg, ${componentThemeColor} 0%, #10b981 100%)`,
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Checklists scroll area */}
                <div style={{
                    padding: '20px 24px',
                    overflowY: 'auto',
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {categories.map(category => {
                        const itemsInCategory = currentItems.filter(i => i.category === category);
                        const categoryDone = itemsInCategory.filter(i => currentTicks[i.id]).length;
                        const categoryMarks = categoryDone * 4;
                        const categoryTotalMarks = itemsInCategory.length * 4;

                        return (
                            <div key={category} style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.07)',
                                borderRadius: '14px',
                                padding: '16px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                    paddingBottom: '8px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                                }}>
                                    <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#e2e8f0' }}>
                                        {category}
                                    </h4>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        color: categoryMarks === categoryTotalMarks ? '#10b981' : '#94a3b8'
                                    }}>
                                        {categoryMarks} / {categoryTotalMarks} Marks
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '10px' }}>
                                    {itemsInCategory.map(item => {
                                        const checked = Boolean(currentTicks[item.id]);

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => onToggle(item.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    background: checked ? `${componentThemeColor}14` : 'rgba(255, 255, 255, 0.02)',
                                                    border: `1px solid ${checked ? componentThemeColor : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '22px',
                                                    height: '22px',
                                                    borderRadius: '6px',
                                                    background: checked ? componentThemeColor : 'rgba(255, 255, 255, 0.06)',
                                                    border: `1px solid ${checked ? componentThemeColor : 'rgba(255, 255, 255, 0.2)'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#0f172a',
                                                    fontWeight: 900,
                                                    fontSize: '0.8rem',
                                                    flexShrink: 0,
                                                    marginTop: '2px'
                                                }}>
                                                    {checked ? '✓' : ''}
                                                </div>

                                                <div style={{ flex: '1' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                                                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: checked ? '#fff' : '#cbd5e1' }}>
                                                            {item.label}
                                                        </div>
                                                        <span style={{
                                                            background: checked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                                            color: checked ? '#34d399' : '#94a3b8',
                                                            border: `1px solid ${checked ? '#10b98150' : 'rgba(255, 255, 255, 0.1)'}`,
                                                            padding: '2px 8px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 800,
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            +{item.marks} Marks
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                                                        {item.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Controls */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(15, 23, 42, 0.9)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        💡 All ticks automatically save to your revision profile & sync with your teacher.
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleCopySummary}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#fff',
                                padding: '9px 16px',
                                borderRadius: '10px',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
                            <span>{copied ? 'Copied Summary!' : 'Copy Mark Sheet'}</span>
                        </button>

                        <button
                            onClick={onClose}
                            style={{
                                background: componentThemeColor,
                                border: 'none',
                                color: '#0f172a',
                                padding: '9px 22px',
                                borderRadius: '10px',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
