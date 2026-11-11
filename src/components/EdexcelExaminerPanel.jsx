import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import {
  EDEXCEL_RUBRIC_BANK,
  evaluateEdexcelEssay,
  generateSchoolQuoteSummary
} from '../utils/edexcelExaminerEngine';

const EdexcelExaminerPanel = ({
  mode = 'teacher',
  onBack,
  initialRubricId,
  campaignNodeId,
  students = [],
  selectedStudentId = 'teacher_live',
  onSelectStudent,
  onSaveEvaluationToGradebook,
  onBuySchoolLicense
}) => {
  const userContext = useUser();
  const completeCampaignNode = userContext?.completeCampaignNode;

  const [selectedRubricId, setSelectedRubricId] = useState(() => {
    if (initialRubricId && EDEXCEL_RUBRIC_BANK.some(r => r.id === initialRubricId)) {
      return initialRubricId;
    }
    return EDEXCEL_RUBRIC_BANK[0].id;
  });

  useEffect(() => {
    if (initialRubricId && EDEXCEL_RUBRIC_BANK.some(r => r.id === initialRubricId)) {
      setSelectedRubricId(initialRubricId);
    }
  }, [initialRubricId]);
  const activeRubric = useMemo(
    () => EDEXCEL_RUBRIC_BANK.find(r => r.id === selectedRubricId) || EDEXCEL_RUBRIC_BANK[0],
    [selectedRubricId]
  );

  // Always start with the clean, guided Sub-Headings + Bullet-Point template so it looks like a real exam answer sheet
  const [essayText, setEssayText] = useState(
    activeRubric.exemplars.student_template || '• '
  );
  const [showMarkingFeedback, setShowMarkingFeedback] = useState(false);
  const [showModelAnswers, setShowModelAnswers] = useState(false);
  const [showRevisionHelp, setShowRevisionHelp] = useState(false);
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [showInteractiveDeck, setShowInteractiveDeck] = useState(
    Boolean(!activeRubric.youtubeId1 && activeRubric.interactiveDecks?.length)
  );
  const [selectedModelBand, setSelectedModelBand] = useState('grade_A_star');
  const [savedNotice, setSavedNotice] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  // Teacher-only School Site License Drawer state
  const [showSchoolLicenseDrawer, setShowSchoolLicenseDrawer] = useState(false);
  const [schoolName, setSchoolName] = useState('Truro & Penwith College');
  const [headOfDept] = useState('Head of Music Technology');
  const [cohortSize, setCohortSize] = useState(24);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const feedbackRef = useRef(null);

  const evaluation = useMemo(
    () => evaluateEdexcelEssay(essayText, activeRubric),
    [essayText, activeRubric]
  );

  const schoolQuote = useMemo(
    () => generateSchoolQuoteSummary({ schoolName, headOfDept, cohortSize, essaysPerStudentPerYear: 12 }),
    [schoolName, headOfDept, cohortSize]
  );

  const handleSelectRubric = (rubricId) => {
    const next = EDEXCEL_RUBRIC_BANK.find(r => r.id === rubricId);
    setSelectedRubricId(rubricId);
    setShowMarkingFeedback(false);
    setShowModelAnswers(false);
    setShowRevisionHelp(false);
    setActiveDeckIdx(0);
    if (next) {
      setEssayText(next.exemplars.student_template || '• ');
      // Automatically show the embedded Music Tech Guru Interactive Deck on Q6 / C4 questions where it replaces the YouTube video
      setShowInteractiveDeck(Boolean(!next.youtubeId1 && next.interactiveDecks?.length));
    }
  };

  const handleMarkAnswer = () => {
    setShowMarkingFeedback(true);
    if (campaignNodeId && completeCampaignNode) {
      completeCampaignNode(campaignNodeId);
    }
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  };

  const handleLogToGradebook = () => {
    if (!onSaveEvaluationToGradebook) return;
    const summaryLine = `[${activeRubric.component} • ${activeRubric.title}] Score: ${evaluation.totalMarks}/${evaluation.maxMarks} (AO3: ${evaluation.ao3Marks}/${evaluation.ao3Max}, AO4: ${evaluation.ao4Marks}/${evaluation.ao4Max} • Level ${evaluation.levelBand} / Grade ${evaluation.grade}). ${evaluation.examinerFeedback} ${evaluation.nextBandTarget}`;
    onSaveEvaluationToGradebook({
      studentId: selectedStudentId,
      component: activeRubric.component === 'Component 3' ? 'c3' : 'c4',
      summaryLine,
      evaluation
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2800);
  };

  const handleCopyBursarQuote = () => {
    const poText = [
      `PEARSON EDEXCEL A-LEVEL MUSIC TECHNOLOGY (9MT0) — INSTITUTIONAL SITE LICENSE QUOTE`,
      `Reference: ${schoolQuote.referenceCode}`,
      `Institution: ${schoolQuote.schoolName} (${schoolQuote.headOfDept})`,
      `Package: Music Tech Guru Unlimited Department Site License (Components 1–4 + Automated AO3/AO4 Examiner)`,
      `Cohort Size: ${schoolQuote.cohortSize} candidates (£${schoolQuote.costPerStudentGbp} per candidate/yr)`,
      `Estimated Department Marking Time Saved: ~${schoolQuote.hoursSavedPerYear} hours/year`,
      `Annual Site License Fee: £${schoolQuote.annualLicenseGbp}.00 (No VAT • Supports School Purchase Order / BACS / Stripe)`
    ].join('\n');
    navigator.clipboard.writeText(poText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  const activeCandidate = students.find(s => s.student_id === selectedStudentId) || students[0];

  return (
    <section
      aria-label="Edexcel Exam Question Practice"
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        color: '#F8FAFC',
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      {/* Top Question Selector Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          background: '#111827',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '12px 16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {campaignNodeId ? '← Back to Path to Legend' : '← Back'}
            </button>
          )}
          {campaignNodeId && (
            <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
              🎯 CAMPAIGN ESSAY BOSS
            </span>
          )}
          <div style={{ flex: 1 }}>
            <label
              htmlFor="edexcel-question-select"
              style={{ display: 'block', fontSize: '0.72rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              Select Extended Writing Practice Question (15m &amp; 20m):
            </label>
            <select
              id="edexcel-question-select"
              aria-label="Select Essay Practice Question"
              value={selectedRubricId}
              onChange={e => handleSelectRubric(e.target.value)}
              style={{
                width: '100%',
                background: '#0B111E',
                color: '#F8FAFC',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {EDEXCEL_RUBRIC_BANK.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {mode !== 'student' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {students.length > 0 && (
              <select
                aria-label="Target Candidate"
                value={selectedStudentId}
                onChange={e => onSelectStudent && onSelectStudent(e.target.value)}
                style={{
                  background: '#0B111E',
                  color: '#F8FAFC',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                {students.map(s => (
                  <option key={s.student_id} value={s.student_id}>
                    Candidate: {s.full_name}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => setShowSchoolLicenseDrawer(prev => !prev)}
              style={{
                background: showSchoolLicenseDrawer ? '#F59E0B' : 'rgba(245, 158, 11, 0.14)',
                color: showSchoolLicenseDrawer ? '#0B111E' : '#FBBF24',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {showSchoolLicenseDrawer ? 'Hide School License' : '🏫 School License (£1,200/yr)'}
            </button>
          </div>
        )}
      </div>

      {/* Teacher-only School Site License Drawer */}
      {showSchoolLicenseDrawer && mode !== 'student' && (
        <div
          style={{
            background: '#111927',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '12px',
            padding: '18px',
            marginBottom: '18px'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#FBBF24' }}>
                Music Tech Guru Institutional — Department Site License (£1,200/yr)
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                Unlimited student and teacher seats across your Sixth Form or FE College department.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  value={schoolName}
                  onChange={e => setSchoolName(e.target.value)}
                  placeholder="School / College Name"
                  style={{ background: '#0B111E', border: '1px solid rgba(255,255,255,0.14)', color: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', fontSize: '0.82rem' }}
                />
                <input
                  type="number"
                  min="1"
                  max="250"
                  value={cohortSize}
                  onChange={e => setCohortSize(Number(e.target.value) || 1)}
                  style={{ background: '#0B111E', border: '1px solid rgba(255,255,255,0.14)', color: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', fontSize: '0.82rem' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopyBursarQuote}
                style={{ flex: 1, background: copiedQuote ? '#10B981' : 'rgba(56, 189, 248, 0.16)', color: copiedQuote ? '#0B111E' : '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '9px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {copiedQuote ? '✓ Copied PO Quote' : '📄 Copy Bursar PO Quote'}
              </button>
              {onBuySchoolLicense && (
                <button
                  type="button"
                  onClick={() => onBuySchoolLicense('price_1UD0U9LxDAAultYK3m7LkYHI', schoolQuote.cohortSize)}
                  style={{ background: '#F59E0B', color: '#0B111E', border: 'none', padding: '9px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Activate School License
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN EXAM PAPER SHEET */}
      <div
        style={{
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
        }}
      >
        {/* Official Exam Paper Header Strip */}
        <div
          style={{
            background: '#1E293B',
            borderBottom: '2px solid rgba(255, 255, 255, 0.12)',
            padding: '14px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#CBD5E1', letterSpacing: '0.02em' }}>
            {activeRubric.paperCode}
          </span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#F8FAFC',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            ({activeRubric.maxMarks} marks)
          </span>
        </div>

        {/* Exam Paper Body */}
        <div style={{ padding: '24px' }}>
          {/* Question Number + Prompt (Styled like the Printed Edexcel Paper) */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '22px' }}>
            <div
              style={{
                minWidth: '40px',
                height: '40px',
                background: '#F8FAFC',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '1.05rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {activeRubric.questionNumber}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#F8FAFC', lineHeight: 1.6, fontWeight: 500 }}>
                {activeRubric.examPromptLead || activeRubric.questionPrompt}
              </p>

              {activeRubric.examBullets && activeRubric.examBullets.length > 0 && (
                <div style={{ marginTop: '10px', paddingLeft: '6px' }}>
                  {activeRubric.component === 'Component 3' && (
                    <div style={{ fontSize: '0.94rem', color: '#E2E8F0', marginBottom: '6px' }}>
                      Your response may consider:
                    </div>
                  )}
                  <ul style={{ margin: 0, paddingLeft: '22px', color: '#E2E8F0', fontSize: '0.94rem', lineHeight: 1.65 }}>
                    {activeRubric.examBullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Reference Figures (Figure 1 & Figure 2 Visual Diagrams) */}
          {(activeRubric.image1 || activeRubric.image2) && (
            <div style={{ marginBottom: '20px' }}>
              {activeRubric.image2 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '14px'
                  }}
                >
                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '10px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#7DD3FC' }}>
                        📷 {activeRubric.imageTitle1 || 'Figure 1'}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                        🔍 Click to Zoom
                      </span>
                    </div>
                    <div
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#020617',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => setExpandedImage(activeRubric.image1)}
                      title="Click to view full-resolution image"
                    >
                      <img
                        src={activeRubric.image1}
                        alt={activeRubric.imageTitle1 || 'Figure 1'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    {activeRubric.imageCaption1 && (
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                        {activeRubric.imageCaption1}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      borderRadius: '10px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FDA4AF' }}>
                        📷 {activeRubric.imageTitle2 || 'Figure 2'}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#F43F5E', background: 'rgba(244, 63, 94, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                        🔍 Click to Zoom
                      </span>
                    </div>
                    <div
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#020617',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => setExpandedImage(activeRubric.image2)}
                      title="Click to view full-resolution image"
                    >
                      <img
                        src={activeRubric.image2}
                        alt={activeRubric.imageTitle2 || 'Figure 2'}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    {activeRubric.imageCaption2 && (
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                        {activeRubric.imageCaption2}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#0B111E',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '10px',
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#7DD3FC' }}>
                      📷 {activeRubric.imageTitle1 || 'Figure 1'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                      🔍 Click to Zoom
                    </span>
                  </div>
                  <div
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#020617',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      maxHeight: '260px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setExpandedImage(activeRubric.image1)}
                    title="Click to view full-resolution image"
                  >
                    <img
                      src={activeRubric.image1}
                      alt={activeRubric.imageTitle1 || 'Figure 1'}
                      style={{ width: '100%', height: 'auto', maxHeight: '260px', objectFit: 'contain' }}
                    />
                  </div>
                  {activeRubric.imageCaption1 && (
                    <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                      {activeRubric.imageCaption1}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Audio Reference Player(s) */}
          {activeRubric.audioSrc1 && (
            <div style={{ marginBottom: '20px' }}>
              {activeRubric.audioSrc2 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '14px'
                  }}
                >
                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '10px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7DD3FC', marginBottom: '8px' }}>
                      🎧 {activeRubric.audioTitle1 || 'Audio Reference A'}
                    </div>
                    <audio
                      controls
                      preload="metadata"
                      src={activeRubric.audioSrc1}
                      style={{ width: '100%', height: '38px' }}
                    />
                  </div>
                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      borderRadius: '10px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FDA4AF', marginBottom: '8px' }}>
                      🎧 {activeRubric.audioTitle2 || 'Audio Reference B'}
                    </div>
                    <audio
                      controls
                      preload="metadata"
                      src={activeRubric.audioSrc2}
                      style={{ width: '100%', height: '38px' }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#0B111E',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '10px',
                    padding: '12px 16px'
                  }}
                >
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#7DD3FC', marginBottom: '8px' }}>
                    🎧 {activeRubric.audioTitle1 || 'Audio Reference Track'}
                  </div>
                  <audio
                    controls
                    preload="metadata"
                    src={activeRubric.audioSrc1}
                    style={{ width: '100%', height: '38px' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Embedded YouTube Track Player(s) (Used for Q5 Track Comparisons or Video References) */}
          {(activeRubric.youtubeId1 || activeRubric.youtubeId2) && (
            <div style={{ marginBottom: '20px' }}>
              {activeRubric.youtubeId1 && activeRubric.youtubeId2 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px'
                  }}
                >
                  {/* Track A */}
                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(56, 189, 248, 0.14)',
                        padding: '8px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#7DD3FC',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{activeRubric.videoTitle1 || 'Track 5 (Version A)'}</span>
                      <a
                        href={`https://www.youtube.com/watch?v=${activeRubric.youtubeWatchId1 || activeRubric.youtubeId1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.72rem',
                          color: '#E0F2FE',
                          background: 'rgba(15, 23, 42, 0.75)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          border: '1px solid rgba(56, 189, 248, 0.4)'
                        }}
                      >
                        ▶ Watch on YouTube ↗
                      </a>
                    </div>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        src={`https://www.youtube.com/embed/${activeRubric.youtubeId1}`}
                        title={activeRubric.videoTitle1 || 'Track A'}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Track B */}
                  <div
                    style={{
                      background: '#0B111E',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(244, 63, 94, 0.14)',
                        padding: '8px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#FDA4AF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{activeRubric.videoTitle2 || 'Track 6 (Version B)'}</span>
                      <a
                        href={`https://www.youtube.com/watch?v=${activeRubric.youtubeId2}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.72rem',
                          color: '#FFE4E6',
                          background: 'rgba(15, 23, 42, 0.75)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          border: '1px solid rgba(244, 63, 94, 0.4)'
                        }}
                      >
                        ▶ Watch on YouTube ↗
                      </a>
                    </div>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        src={`https://www.youtube.com/embed/${activeRubric.youtubeId2}`}
                        title={activeRubric.videoTitle2 || 'Track B'}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#0B111E',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    maxWidth: '640px'
                  }}
                >
                  {(() => {
                    const vidId = activeRubric.youtubeId1 || activeRubric.youtubeId2;
                    const vidWatch = activeRubric.youtubeWatchId1 || vidId;
                    const vidTitle = activeRubric.videoTitle1 || activeRubric.videoTitle2 || 'Exam Audio Reference';
                    return (
                      <>
                        <div
                          style={{
                            background: 'rgba(56, 189, 248, 0.12)',
                            padding: '8px 14px',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            color: '#7DD3FC',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>{vidTitle}</span>
                          <a
                            href={`https://www.youtube.com/watch?v=${vidWatch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.72rem',
                              color: '#E0F2FE',
                              background: 'rgba(15, 23, 42, 0.75)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              border: '1px solid rgba(56, 189, 248, 0.4)'
                            }}
                          >
                            ▶ Watch on YouTube ↗
                          </a>
                        </div>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                            src={`https://www.youtube.com/embed/${vidId}`}
                            title={vidTitle}
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Embedded Music Tech Guru Interactive Curriculum Slide Deck (Default on Q6, Optional on Q5) */}
          {activeRubric.interactiveDecks && activeRubric.interactiveDecks.length > 0 && (
            <div
              style={{
                background: '#0B111E',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}
            >
              <div
                style={{
                  background: 'rgba(168, 85, 247, 0.14)',
                  padding: '10px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#E9D5FF' }}>
                    📊 Music Tech Guru Interactive Revision Deck:
                  </span>
                  {activeRubric.interactiveDecks.map((deck, idx) => (
                    <button
                      key={deck.url}
                      type="button"
                      onClick={() => {
                        setActiveDeckIdx(idx);
                        setShowInteractiveDeck(true);
                      }}
                      style={{
                        background: activeDeckIdx === idx && showInteractiveDeck ? '#A855F7' : 'rgba(15, 23, 42, 0.75)',
                        color: activeDeckIdx === idx && showInteractiveDeck ? '#0B111E' : '#E9D5FF',
                        border: '1px solid rgba(168, 85, 247, 0.45)',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {deck.title.replace('Interactive Deck: ', '')}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeRubric.interactiveDecks[activeDeckIdx]?.quizUrl && (
                    <a
                      href={activeRubric.interactiveDecks[activeDeckIdx].quizUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(16, 185, 129, 0.16)',
                        color: '#6EE7B7',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      🎯 Topic Quiz ↗
                    </a>
                  )}
                  <a
                    href={activeRubric.interactiveDecks[activeDeckIdx]?.url || activeRubric.interactiveDecks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(56, 189, 248, 0.16)',
                      color: '#7DD3FC',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ↗ Full Screen Deck
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowInteractiveDeck(prev => !prev)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#E2E8F0',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {showInteractiveDeck ? 'Hide Deck' : 'Show Interactive Deck'}
                  </button>
                </div>
              </div>

              {showInteractiveDeck && (
                <div style={{ width: '100%', height: '500px', borderTop: '1px solid rgba(168, 85, 247, 0.25)' }}>
                  <iframe
                    key={(activeRubric.interactiveDecks[activeDeckIdx] || activeRubric.interactiveDecks[0]).url}
                    src={(activeRubric.interactiveDecks[activeDeckIdx] || activeRubric.interactiveDecks[0]).url}
                    title={(activeRubric.interactiveDecks[activeDeckIdx] || activeRubric.interactiveDecks[0]).title}
                    style={{ width: '100%', height: '100%', border: 'none', background: '#080e1a' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Simple, Calm "How to Answer" Guidance Box + Optional Music Tech Guru Revision Help */}
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.07)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '0.88rem',
              color: '#E2E8F0',
              lineHeight: 1.55
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <strong style={{ color: '#38BDF8' }}>💡 How to answer this question:</strong> Use the sub-headings and bullet points (<code style={{ color: '#FBBF24' }}>•</code>) below. Write each bullet point as a <strong>full sentence</strong> stating <strong>what technique you hear</strong> and <strong>how it affects the sound or feel of the music</strong>.
              </div>
              {activeRubric.mtgRevisionGuide && (
                <button
                  type="button"
                  onClick={() => setShowRevisionHelp(prev => !prev)}
                  style={{
                    background: showRevisionHelp ? '#38BDF8' : 'rgba(56, 189, 248, 0.16)',
                    color: showRevisionHelp ? '#0B111E' : '#7DD3FC',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {showRevisionHelp ? 'Hide Revision Notes' : '📚 Music Tech Guru Revision Help'}
                </button>
              )}
            </div>

            {showRevisionHelp && activeRubric.mtgRevisionGuide && (
              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(56, 189, 248, 0.22)'
                }}
              >
                <div style={{ fontWeight: 700, color: '#7DD3FC', marginBottom: '6px', fontSize: '0.85rem' }}>
                  {activeRubric.mtgRevisionGuide.summary}
                </div>
                <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.55 }}>
                  {activeRubric.mtgRevisionGuide.keyPoints.map((pt, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{pt}</li>
                  ))}
                </ul>
                {activeRubric.mtgRevisionGuide.links && activeRubric.mtgRevisionGuide.links.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 700, marginBottom: '6px' }}>
                      Read More on Music Tech Guru:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {activeRubric.mtgRevisionGuide.links.map((lnk, idx) => (
                        <a
                          key={idx}
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'rgba(15, 23, 42, 0.85)',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            color: '#38BDF8',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                        >
                          {lnk.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clean Answer Sheet Toolbar + Lined Textarea */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#CBD5E1' }}>
                Your Exam Answer:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setEssayText(prev => (prev ? `${prev.replace(/\s*$/, '')}\n• ` : '• '))}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#F8FAFC',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + Add Bullet (•)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEssayText(activeRubric.exemplars.student_template || '• ');
                    setShowMarkingFeedback(false);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#94A3B8',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ↺ Reset Sub-Headings
                </button>
              </div>
            </div>

            <textarea
              aria-label="Candidate Essay Response"
              rows={14}
              value={essayText}
              onChange={e => setEssayText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  const target = e.target;
                  const cursor = target.selectionStart;
                  const before = essayText.slice(0, cursor);
                  const after = essayText.slice(target.selectionEnd);
                  const currentLine = before.split('\n').pop() || '';
                  if (/^\s*[•\-*]\s+\S+/.test(currentLine)) {
                    e.preventDefault();
                    const insert = '\n• ';
                    const nextVal = before + insert + after;
                    setEssayText(nextVal);
                    requestAnimationFrame(() => {
                      target.selectionStart = target.selectionEnd = cursor + insert.length;
                    });
                  }
                }
              }}
              placeholder="Write your full-sentence bullet points under each sub-heading..."
              style={{
                width: '100%',
                background: '#0B111E',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '10px',
                padding: '16px',
                fontSize: '0.96rem',
                lineHeight: 1.7,
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Exam Paper Footer: Total Marks & Action Buttons */}
          <div
            style={{
              marginTop: '18px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8' }}>
              (Total for Question {activeRubric.questionNumber} = {activeRubric.maxMarks} marks)
            </span>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowModelAnswers(prev => !prev)}
                style={{
                  background: showModelAnswers ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.07)',
                  color: showModelAnswers ? '#D8B4FE' : '#CBD5E1',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                {showModelAnswers ? 'Hide Model Answer' : '📖 View Model Bullet Answer'}
              </button>

              <button
                type="button"
                onClick={handleMarkAnswer}
                style={{
                  background: '#10B981',
                  color: '#0B111E',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                }}
              >
                ✓ Mark My Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE MODEL BULLET ANSWER CARD (When student clicks 'View Model Bullet Answer') */}
      {showModelAnswers && (
        <div
          style={{
            marginTop: '20px',
            background: '#111827',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            borderRadius: '14px',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#E9D5FF' }}>
              📖 Grade A* Model Bullet-Point Answers & Rubric
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedModelBand('grade_A_star')}
                style={{
                  background: selectedModelBand === 'grade_A_star' ? '#10B981' : 'rgba(255,255,255,0.07)',
                  color: selectedModelBand === 'grade_A_star' ? '#0B111E' : '#CBD5E1',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Level 5 Model Answer (A*)
              </button>
              <button
                type="button"
                onClick={() => setSelectedModelBand('grade_B')}
                style={{
                  background: selectedModelBand === 'grade_B' ? '#38BDF8' : 'rgba(255,255,255,0.07)',
                  color: selectedModelBand === 'grade_B' ? '#0B111E' : '#CBD5E1',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Level 3–4 Example (B/C)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEssayText(activeRubric.exemplars[selectedModelBand]);
                  setShowMarkingFeedback(true);
                }}
                style={{
                  background: 'rgba(168, 85, 247, 0.2)',
                  color: '#E9D5FF',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Load into Answer Box to Test
              </button>
            </div>
          </div>

          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              background: '#0B111E',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '16px',
              fontSize: '0.9rem',
              color: '#F1F5F9',
              lineHeight: 1.65
            }}
          >
            {activeRubric.exemplars[selectedModelBand]}
          </pre>
        </div>
      )}

      {/* CLEAN FEEDBACK CARD (Only appears AFTER clicking '✓ Mark My Answer') */}
      {showMarkingFeedback && (
        <div
          ref={feedbackRef}
          style={{
            marginTop: '20px',
            background: '#111827',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '14px',
            padding: '22px'
          }}
        >
          {/* Score Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              marginBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#F8FAFC' }}>
                Your Feedback &amp; Mark
              </h3>
              <span style={{ fontSize: '0.84rem', color: '#94A3B8' }}>
                Technical Knowledge (AO3): <strong>{evaluation.ao3Marks}/{evaluation.ao3Max}</strong> • Musical Evaluation (AO4): <strong>{evaluation.ao4Marks}/{evaluation.ao4Max}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  background: '#0B111E',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Mark</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>
                  {evaluation.totalMarks} / {evaluation.maxMarks}
                </div>
              </div>

              <div
                style={{
                  background: '#0B111E',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Band / Grade</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399' }}>
                  Level {evaluation.levelBand} ({evaluation.grade})
                </div>
              </div>
            </div>
          </div>

          {/* Examiner Summary & How to Improve */}
          <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 10px 0' }}>
              <strong style={{ color: '#38BDF8' }}>Summary: </strong>
              {evaluation.examinerFeedback}
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#FBBF24' }}>How to improve your score: </strong>
              {evaluation.nextBandTarget}
            </p>
          </div>

          {/* Two-Column Checklist: What You Got Right vs What to Add */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.07)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '10px',
                padding: '14px'
              }}
            >
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#34D399', marginBottom: '8px' }}>
                ✓ What You Covered Well ({evaluation.matchedAnchors?.length || 0})
              </div>
              {(!evaluation.matchedAnchors || evaluation.matchedAnchors.length === 0) ? (
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Write full-sentence bullet points under the sub-headings above and click <strong>✓ Mark My Answer</strong> again.
                </div>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#D1FAE5', lineHeight: 1.5 }}>
                  {evaluation.matchedAnchors.map((pt, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>

            {evaluation.missingAnchors && evaluation.missingAnchors.length > 0 && (
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.07)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '10px',
                  padding: '14px'
                }}
              >
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FBBF24', marginBottom: '8px' }}>
                  🎯 Points to Add for Extra Marks
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#FDE68A', lineHeight: 1.5 }}>
                  {evaluation.missingAnchors.slice(0, 4).map((pt, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}

            {evaluation.totalMarks >= evaluation.maxMarks && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '10px',
                  padding: '14px'
                }}
              >
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#34D399', marginBottom: '4px' }}>
                  🎉 Full Maximum Marks Achieved ({evaluation.totalMarks}/{evaluation.maxMarks})
                </div>
                <div style={{ fontSize: '0.8rem', color: '#A7F3D0', lineHeight: 1.5 }}>
                  Outstanding Grade A* response! Real Pearson Edexcel mark schemes contain a surplus of rewardable points with multiple valid pathways to 100%—you have achieved complete Level 5 mastery.
                </div>
              </div>
            )}
          </div>

          {onSaveEvaluationToGradebook && mode !== 'student' && (
            <button
              type="button"
              onClick={handleLogToGradebook}
              style={{
                marginTop: '16px',
                width: '100%',
                background: savedNotice ? '#10B981' : '#38BDF8',
                color: '#0B111E',
                border: 'none',
                padding: '11px 18px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {savedNotice
                ? `✓ Saved ${evaluation.totalMarks}/${evaluation.maxMarks} (${evaluation.grade}) to ${activeCandidate?.full_name || 'Candidate'}'s Gradebook`
                : `Save Score (${evaluation.totalMarks}/${evaluation.maxMarks}) to ${activeCandidate?.full_name || 'Candidate'}'s Gradebook`}
            </button>
          )}
        </div>
      )}

      {/* Lightbox Modal for Expanded Figure / Image */}
      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '90vh',
              background: '#0B111E',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
            }}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              ✕
            </button>
            <img
              src={expandedImage}
              alt="Expanded Audio Engineering Diagram"
              style={{
                maxWidth: '88vw',
                maxHeight: '82vh',
                display: 'block',
                borderRadius: '8px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EdexcelExaminerPanel;
