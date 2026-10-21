import {
    OVERVIEW_SPECS as C2_OVERVIEW_SPECS,
    MARK_SCHEME_DETAILED as C2_MARK_SCHEME_DETAILED,
    WORKFLOW_PHASES as C2_WORKFLOW_PHASES,
    TECHNIQUES_BANK as C2_TECHNIQUES_BANK,
    MIXING_GUIDELINES as C2_MIXING_GUIDELINES,
    MASTER_CHECKLIST as C2_MASTER_CHECKLIST
} from './Component2Guide/component2Data.js';

import {
    C1_OVERVIEW_SPECS,
    C1_MARK_SCHEME_DETAILED,
    C1_TECHNIQUES_BANK,
    C1_WORKFLOW_PHASES,
    C1_MASTER_CHECKLIST
} from './TracksheetCreator/component1ChecklistData.js';

// Storage keys for teacher moderation checkboxes
export const TEACHER_C1_CHECKLIST_KEY = 'mtg_teacher_c1_moderation_checklist_v1';
export const TEACHER_C2_CHECKLIST_KEY = 'mtg_teacher_c2_moderation_checklist_v1';
export const TEACHER_C3_CHECKLIST_KEY = 'mtg_teacher_c3_moderation_checklist_v1';
export const TEACHER_C4_CHECKLIST_KEY = 'mtg_teacher_c4_moderation_checklist_v1';

export const C1_STORAGE_KEY = 'mtg_component1_guide_state_v1';
export const C2_STORAGE_KEY = 'mtg_component2_guide_state_v2';

// Edexcel standard grade boundary helper
export const getGradeFromPercentage = (percentage) => {
    if (percentage >= 90) return { grade: 'A*', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    if (percentage >= 80) return { grade: 'A', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
    if (percentage >= 70) return { grade: 'B', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    if (percentage >= 60) return { grade: 'C', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    if (percentage >= 50) return { grade: 'D', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' };
    if (percentage >= 40) return { grade: 'E', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
    return { grade: 'U', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.15)' };
};

// --------------------------------------------------------------------------
// 10-Point Teacher Moderation & Verification Items for Component 1 (9MT0/01)
// --------------------------------------------------------------------------
export const C1_TEACHER_MODERATION_ITEMS = [
    { id: 'c1_tm_1', phase: 'Pre-Production', text: 'Song Selection: Verified student prescribed song is from the official Pearson Edexcel cohort list.' },
    { id: 'c1_tm_2', phase: 'Pre-Production', text: 'Track Count Window: Confirmed session is planned strictly between 12 and 24 active audio/MIDI tracks.' },
    { id: 'c1_tm_3', phase: 'Tracking: Drums & Bass', text: '4+ Drum Microphones: Verified acoustic drum kit is tracked with at least 4 mics (Kick, Snare, Overheads L/R) with verified phase coherence.' },
    { id: 'c1_tm_4', phase: 'Tracking: Drums & Bass', text: 'Bass Capture: Audited clean Bass Guitar recording via DI box and/or miked amplifier cabinet with zero pre-A/D clipping.' },
    { id: 'c1_tm_5', phase: 'Tracking: Guitars & Vocals', text: 'Compulsory Stems: Verified clean capture of Acoustic Guitar (12th fret), Electric Guitar (cab/DI), Lead Vocal (pop shield), and BVs.' },
    { id: 'c1_tm_6', phase: 'Tracking: Additional Stems', text: '2+ Additional Instruments: Audited at least 2 additional instruments (e.g. Piano/Keys, Synth, Brass, Strings, Percussion).' },
    { id: 'c1_tm_7', phase: 'Editing & Hygiene', text: 'Audio Hygiene: Checked all regions are topped-and-tailed with crossfades; zero headphone bleed, hum, or plosives.' },
    { id: 'c1_tm_8', phase: 'Mixdown: EQ & Dynamics', text: 'Dynamic & Spectral Control: Verified high-pass filters on non-bass tracks, vocal compression, and kick/bass frequency pocketing.' },
    { id: 'c1_tm_9', phase: 'Mixdown: Stereo & Master', text: 'Stereo Field & Ceiling: Verified centered kick/snare/bass/vocals, consistent drum perspective, and -1.0 dBFS True Peak ceiling (-14 to -16 LUFS).' },
    { id: 'c1_tm_10', phase: 'Final Submission', text: 'Logbook & WAV Export: Checked 16-bit / 44.1kHz Stereo WAV (3:00–3:30 duration) and official Edexcel Logbook PDF with full mic specifications.' }
];

// --------------------------------------------------------------------------
// 10-Point Teacher Moderation & Verification Items for Component 2 (9MT0/02)
// --------------------------------------------------------------------------
export const C2_TEACHER_MODERATION_ITEMS = [
    { id: 'c2_tm_1', phase: 'Week 1: Brief & Stimulus', text: 'Guided all students to select Brief 2 (Text/Poem) or Brief 3 (Topic/Stimulus) rather than Brief 1 (Video).' },
    { id: 'c2_tm_2', phase: 'Week 1: Brief & Stimulus', text: 'Verified every student has imported a commercial Stimulus Track into Logic Pro X at -6dB with matched project tempo.' },
    { id: 'c2_tm_3', phase: 'Weeks 2–4: Core Composition', text: 'Checked that each student composition has at least 6 distinct parts (vocal, instrumental, sample-based) and clear section contrast.' },
    { id: 'c2_tm_4', phase: 'Weeks 2–4: Core Composition', text: 'Confirmed Brief 2 students have used the set text in a clearly recognisable form (sung, rapped, spoken, or intelligible slices).' },
    { id: 'c2_tm_5', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for bespoke AG1 Synthesis (oscillator detuning, filter sweeps, ADSR, LFO, FM, Glide, Wavetables).' },
    { id: 'c2_tm_6', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for AG2 Sampling (6+ samples, Quick Sampler slicing, Flex Time, Flex Pitch harmonies, looping, multi-zone).' },
    { id: 'c2_tm_7', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for AG3 Creative FX & Automation (reverb blooms, delay throws, modulation FX, vocoder, gated reverb).' },
    { id: 'c2_tm_8', phase: 'Week 7: AG4 Mix & Master', text: 'Reviewed student mixes for high-pass filtering (<80Hz on non-bass), track/bus compression, stereo balance, and Adaptive Limiter (-0.1dB ceiling).' },
    { id: 'c2_tm_9', phase: 'Week 8: Logbook & Credits', text: 'Verified every student Logbook contains specific technical parameters, bar numbers, screenshots, and full credits for ALL samples & performers.' },
    { id: 'c2_tm_10', phase: 'Week 8: Final Submission', text: 'Checked all exported audio bounces are 3:00 duration, 16-bit / 44.1kHz Stereo .WAV (Normalize: Off), named 9MT002_centrenumber_candidatenumber_name.wav.' }
];

// --------------------------------------------------------------------------
// 10-Point Teacher Moderation & Verification Items for Component 3 (9MT0/03)
// --------------------------------------------------------------------------
export const C3_TEACHER_MODERATION_ITEMS = [
    { id: 'c3_tm_1', phase: 'Area of Study: Rock', text: 'Rock & Pop Production: Verified student can identify guitar amp distortion, mic placements, classic rock drum acoustics, and tape compression.' },
    { id: 'c3_tm_2', phase: 'Area of Study: Soul & Funk', text: 'Soul & Funk Production: Verified understanding of tight horn section miking, tape saturation, spring/plate reverbs, and DI electric bass.' },
    { id: 'c3_tm_3', phase: 'Area of Study: Synth Pop', text: 'Synth Pop & 80s Tech: Verified recognition of early digital reverb (gated snare), FM/subtractive synths, and classic drum machines (Linn/808/909).' },
    { id: 'c3_tm_4', phase: 'Area of Study: Reggae & Dub', text: 'Reggae & Dub Tech: Verified student understands tape delay feedback, spring reverb splashes, high-pass filtering, and mixing board dropouts.' },
    { id: 'c3_tm_5', phase: 'Acoustics & Transducers', text: 'Microphone & Acoustic Theory: Verified student accurately identifies polar patterns (Omni, Cardioid, Fig-8), frequency response curves, and proximity effect.' },
    { id: 'c3_tm_6', phase: 'Dynamic & Spectral EQ', text: 'EQ & Dynamics Detection: Verified student distinguishes frequency cuts/boosts (HPF, shelf, parametric bell) and compressor settings (attack, release, ratio).' },
    { id: 'c3_tm_7', phase: 'Spatial Placement', text: 'Stereo Field & Imaging: Verified student identifies Haas effect, binaural cues, panning positions, and mono phase cancellation issues.' },
    { id: 'c3_tm_8', phase: 'Section A Listening', text: 'Section A Exam Practice: Verified student has completed timed Section A listening past papers across at least 2 distinct exam genres (Q1–Q4).' },
    { id: 'c3_tm_9', phase: 'Section B Extended Response', text: 'Section B Comparative Analysis: Verified student has completed the 8-mark comparative analysis question comparing production across two eras (Q5).' },
    { id: 'c3_tm_10', phase: 'Question 6 Diagnostic', text: '12-Mark Production Evolution: Verified student has practiced the holistic evaluation question on historic recording and production developments (Q6).' }
];

// --------------------------------------------------------------------------
// 10-Point Teacher Moderation & Verification Items for Component 4 (9MT0/04)
// --------------------------------------------------------------------------
export const C4_TEACHER_MODERATION_ITEMS = [
    { id: 'c4_tm_1', phase: 'DAW Exam Setup', text: 'Session Configuration: Verified student creates DAW session with correct project sample rate (44.1kHz / 24-bit) and matched project tempo.' },
    { id: 'c4_tm_2', phase: 'Task 1: Drum & MIDI', text: 'MIDI Editing & Quantisation: Verified student can edit MIDI drums, correct timing discrepancies, and align acoustic kick/snare transients.' },
    { id: 'c4_tm_3', phase: 'Task 2: Pitch Correction', text: 'Tuning Correction: Verified student has demonstrated transparent pitch correction using Flex Pitch / Melodyne on vocal and bass tracks.' },
    { id: 'c4_tm_4', phase: 'Task 3: Synth Programming', text: 'Synthesiser Sound Design: Verified student can programme filter cutoff automation, resonance, ADSR envelopes, and LFO modulation on soft synths.' },
    { id: 'c4_tm_5', phase: 'Task 4: Sidechaining', text: 'Sidechain Dynamic Processing: Verified student has correctly configured sidechain ducking (kick triggering bass/pad compressor threshold).' },
    { id: 'c4_tm_6', phase: 'Task 5: Creative Audio FX', text: 'Time-Based & Modulation FX: Verified student can execute tempo-synced delay throws, pitch shifting, and chorus/flanger modulation.' },
    { id: 'c4_tm_7', phase: 'Task 6: Mix & Headroom', text: 'Final Mix Balance: Verified clear stem balance, zero digital clipping, correct stereo imaging, and -0.1 dBFS ceiling limiter.' },
    { id: 'c4_tm_8', phase: 'Section B Knowledge', text: 'Production Knowledge Diagnostics: Verified student has practiced short-answer questions on hardware processors, signal chains, and digital audio fundamentals.' },
    { id: 'c4_tm_9', phase: 'Section C Technical Essay', text: '18-Mark Technical Essay: Verified student has practiced writing technical essays comparing vintage analogue vs modern in-the-box workflows.' },
    { id: 'c4_tm_10', phase: 'Audio Export Compliance', text: 'Pre-Submission Bounces: Verified student knows how to bounce individual audio stems and the complete stereo mix WAV adhering to Edexcel naming formats.' }
];

// --------------------------------------------------------------------------
// Helper: Compute Component 1 Detailed Metrics
// --------------------------------------------------------------------------
export const computeC1DetailedMetrics = (c1) => {
    const safeC1 = c1 || {};
    const checkedItems = safeC1.checkedItems || {};
    const completedTechniques = safeC1.completedTechniques || {};
    const techniqueNotes = safeC1.techniqueNotes || {};

    const msElementIds = C1_MARK_SCHEME_DETAILED.flatMap(m => m.elementsChecklist.map(e => e.id));
    const msDone = msElementIds.filter(id => checkedItems[id]).length;

    const workflowTasks = C1_WORKFLOW_PHASES.flatMap(p => p.tasks);
    const workflowDone = workflowTasks.filter(t => checkedItems[t.id]).length;
    const workflowTotal = workflowTasks.length;

    const techDone = C1_TECHNIQUES_BANK.filter(t => completedTechniques[t.id]).length;
    const techTotal = C1_TECHNIQUES_BANK.length;

    const drumsBassTechs = C1_TECHNIQUES_BANK.filter(t => t.category === 'drums_bass');
    const guitarsVocalsTechs = C1_TECHNIQUES_BANK.filter(t => t.category === 'guitars_vocals');
    const mixTechs = C1_TECHNIQUES_BANK.filter(t => t.category === 'mixing_mastering');

    const drumsBassDone = drumsBassTechs.filter(t => completedTechniques[t.id]).length;
    const guitarsVocalsDone = guitarsVocalsTechs.filter(t => completedTechniques[t.id]).length;
    const mixDone = mixTechs.filter(t => completedTechniques[t.id]).length;

    const masterIds = C1_MASTER_CHECKLIST.map(m => m.id);
    const masterDone = masterIds.filter(id => checkedItems[id]).length;
    const masterTotal = masterIds.length;

    const notesCount = Object.values(techniqueNotes).filter(v => v && v.trim()).length;
    const micLogCount = (safeC1.micLogRows || []).filter(r => r.stem || r.micModel).length;

    const totalItems = msElementIds.length + workflowTotal + techTotal + masterTotal;
    const totalDone = msDone + workflowDone + techDone + masterDone;
    const overallPercent = Math.min(100, Math.round((totalDone / (totalItems || 1)) * 100));

    const phaseMarkers = C1_WORKFLOW_PHASES.map((phase, idx) => {
        const total = phase.tasks.length;
        const done = phase.tasks.filter(t => checkedItems[t.id]).length;
        const percent = Math.round((done / (total || 1)) * 100);
        return {
            id: phase.id,
            shortLabel: `P${idx + 1}`,
            title: phase.title,
            color: phase.color,
            done,
            total,
            percent,
            complete: done === total && total > 0
        };
    });

    const hasAnyActivity = Boolean(
        totalDone > 0 ||
        notesCount > 0 ||
        safeC1.sessionInfo?.prescribedTrack ||
        safeC1.updatedAt
    );

    return {
        started: hasAnyActivity,
        prescribedTrack: safeC1.sessionInfo?.prescribedTrack || 'Not chosen yet',
        artist: safeC1.sessionInfo?.artist || '',
        daw: safeC1.sessionInfo?.daw || 'Logic Pro',
        overallPercent,
        totalDone,
        totalItems,
        msDone,
        msTotal: msElementIds.length,
        workflowDone,
        workflowTotal,
        phaseMarkers,
        techDone,
        techTotal,
        drumsBassDone,
        drumsBassTotal: drumsBassTechs.length,
        guitarsVocalsDone,
        guitarsVocalsTotal: guitarsVocalsTechs.length,
        mixDone,
        mixTotal: mixTechs.length,
        masterDone,
        masterTotal,
        notesCount,
        micLogCount,
        checkedItems,
        completedTechniques
    };
};

// --------------------------------------------------------------------------
// Helper: Compute Component 2 Detailed Metrics
// --------------------------------------------------------------------------
export const computeC2DetailedMetrics = (c2) => {
    const safeC2 = c2 || {};
    const checkedItems = safeC2.checkedItems || {};
    const completedTechniques = safeC2.completedTechniques || {};
    const techniqueNotes = safeC2.techniqueNotes || {};

    const synTechs = C2_TECHNIQUES_BANK.filter(t => t.category === 'synthesis');
    const smpTechs = C2_TECHNIQUES_BANK.filter(t => t.category === 'sampling');
    const fxTechs = C2_TECHNIQUES_BANK.filter(t => t.category === 'effects');

    const synDone = synTechs.filter(t => completedTechniques[t.id]).length;
    const smpDone = smpTechs.filter(t => completedTechniques[t.id]).length;
    const fxDone = fxTechs.filter(t => completedTechniques[t.id]).length;
    const techDone = synDone + smpDone + fxDone;

    const msElementIds = C2_MARK_SCHEME_DETAILED.flatMap(m => m.elementsChecklist.map(e => e.id));
    const msDone = msElementIds.filter(id => checkedItems[id]).length;

    const phaseMarkers = C2_WORKFLOW_PHASES.map((phase, idx) => {
        const total = phase.tasks.length;
        const done = phase.tasks.filter(t => checkedItems[t.id]).length;
        const percent = Math.round((done / (total || 1)) * 100);
        return {
            id: phase.id,
            shortLabel: `P${idx + 1}`,
            title: phase.title,
            color: phase.color,
            done,
            total,
            percent,
            complete: done === total && total > 0
        };
    });

    const workflowTotal = C2_WORKFLOW_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
    const workflowDone = phaseMarkers.reduce((acc, p) => acc + p.done, 0);

    const mixIds = C2_MIXING_GUIDELINES.flatMap(g => g.items.map(i => i.id));
    const mixDone = mixIds.filter(id => checkedItems[id]).length;
    const mixTotal = mixIds.length;

    const masterIds = C2_MASTER_CHECKLIST.map(m => m.id);
    const masterDone = masterIds.filter(id => checkedItems[id]).length;
    const masterTotal = masterIds.length;

    const notesCount = Object.values(techniqueNotes).filter(v => v && v.trim()).length;

    const totalItems = msElementIds.length + workflowTotal + C2_TECHNIQUES_BANK.length + mixTotal + masterTotal;
    const totalDone = msDone + workflowDone + techDone + mixDone + masterDone;
    const overallPercent = Math.min(100, Math.round((totalDone / (totalItems || 1)) * 100));

    const briefLabel = safeC2.selectedBrief === 'brief3'
        ? 'Brief 3 (Topic)'
        : safeC2.selectedBrief === 'brief1'
            ? 'Brief 1 (Video)'
            : 'Brief 2 (Text)';

    const stimulusText = safeC2.stimulusInfo?.trackTitle
        ? `${safeC2.stimulusInfo.trackTitle}${safeC2.stimulusInfo.artist ? ` (${safeC2.stimulusInfo.artist})` : ''}`
        : '-';

    const hasAnyActivity = Boolean(
        totalDone > 0 ||
        notesCount > 0 ||
        safeC2.stimulusInfo?.trackTitle ||
        safeC2.updatedAt
    );

    return {
        started: hasAnyActivity,
        briefLabel,
        stimulusText,
        overallPercent,
        totalDone,
        totalItems,
        techDone,
        synDone,
        smpDone,
        fxDone,
        synTechs: synTechs.map(t => ({ id: t.id, num: t.number, title: t.title, done: !!completedTechniques[t.id] })),
        smpTechs: smpTechs.map(t => ({ id: t.id, num: t.number, title: t.title, done: !!completedTechniques[t.id] })),
        fxTechs: fxTechs.map(t => ({ id: t.id, num: t.number, title: t.title, done: !!completedTechniques[t.id] })),
        phaseMarkers,
        workflowDone,
        workflowTotal,
        msDone,
        msTotal: msElementIds.length,
        msCriteriaMarkers: C2_MARK_SCHEME_DETAILED.map(m => {
            const cDone = m.elementsChecklist.filter(e => checkedItems[e.id]).length;
            const cTotal = m.elementsChecklist.length;
            return {
                code: m.code,
                title: m.title,
                color: m.color,
                done: cDone,
                total: cTotal,
                complete: cDone === cTotal && cTotal > 0,
                partial: cDone > 0 && cDone < cTotal
            };
        }),
        mixDone,
        mixTotal,
        masterDone,
        masterTotal,
        notesCount,
        checkedItems,
        completedTechniques
    };
};

// --------------------------------------------------------------------------
// Helper: Compute Component 3 Detailed Metrics (Listening and Analysing)
// --------------------------------------------------------------------------
export const computeC3DetailedMetrics = (student) => {
    const progress = student?.progress || {};
    const history = progress.history || [];
    const mastery = progress.mastery || {};

    const C3_GENRES = [
        { id: 'funk', name: 'Funk & Disco', regex: /funk|disco/i },
        { id: 'synthpop', name: 'Synth Pop', regex: /synth\s*pop/i },
        { id: 'rock', name: 'Heavy Rock', regex: /heavy\s*rock|rock/i },
        { id: 'soul', name: 'Soul & Motown', regex: /soul/i },
        { id: 'reggae', name: 'Reggae & Dub', regex: /reggae|dub/i }
    ];

    // Find C3 exams from history
    const c3ExamsTaken = history.filter(item => {
        const title = (item.quizTitle || '').toLowerCase();
        return title.includes('component 3') || title.includes('listening and analysing');
    });

    // Check which genres were completed
    const genreStatus = C3_GENRES.map(g => {
        const matched = c3ExamsTaken.find(ex => g.regex.test(ex.quizTitle || ''));
        const pct = matched ? Math.round(((matched.score || 0) / (matched.total || 1)) * 100) : null;
        return {
            ...g,
            completed: !!matched,
            score: matched ? matched.score : null,
            total: matched ? matched.total : null,
            percentage: pct,
            grade: matched?.grade || (pct !== null ? (pct >= 80 ? 'A' : pct >= 60 ? 'C' : 'U') : null)
        };
    });

    const completedGenreCount = genreStatus.filter(g => g.completed).length;

    // Calculate average score across C3 papers
    let totalScore = 0;
    let totalMax = 0;
    c3ExamsTaken.forEach(ex => {
        totalScore += Number(ex.score) || 0;
        totalMax += Number(ex.total) || 0;
    });

    const averagePercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

    // Evaluate diagnostic listening areas from mastery object
    // Topics: 1 (Sound/Acoustics), 2 (EQ/Filters), 4 (Dynamics), 5 (Effects/Reverb), 6 (Stereo/Panning)
    const acousticMastery = mastery['1'] || mastery['Acoustics'] || null;
    const eqMastery = mastery['2'] || mastery['EQ'] || null;
    const dynamicMastery = mastery['4'] || mastery['Dynamics'] || null;
    const fxMastery = mastery['5'] || mastery['Effects'] || null;
    const stereoMastery = mastery['6'] || mastery['Stereo'] || null;

    // Composite readiness percentage (50% genre exams + 50% core audio concept mastery)
    const genreScoreWeight = (completedGenreCount / 5) * 50;
    const quizScoreWeight = c3ExamsTaken.length > 0 ? (averagePercent * 0.5) : 0;
    const overallPercent = Math.min(100, Math.round(genreScoreWeight + quizScoreWeight));

    return {
        started: c3ExamsTaken.length > 0,
        mocksTaken: c3ExamsTaken.length,
        exams: c3ExamsTaken,
        genreStatus,
        completedGenreCount,
        totalGenres: C3_GENRES.length,
        averagePercent,
        overallPercent,
        diagnostics: {
            acoustics: acousticMastery,
            eq: eqMastery,
            dynamics: dynamicMastery,
            effects: fxMastery,
            stereo: stereoMastery
        }
    };
};

// --------------------------------------------------------------------------
// Helper: Compute Component 4 Detailed Metrics (Producing and Analysing)
// --------------------------------------------------------------------------
export const computeC4DetailedMetrics = (student) => {
    const progress = student?.progress || {};
    const history = progress.history || [];
    const campaignCompleted = progress.campaignCompleted || [];

    const C4_PAPERS = [
        { id: 'edm', name: 'EDM Production', regex: /edm/i },
        { id: 'synthpop', name: 'Synth Pop Production', regex: /synth\s*pop/i },
        { id: 'rock', name: 'Rock (2019 Style)', regex: /rock/i },
        { id: 'template', name: '2024 Template Exam', regex: /template/i }
    ];

    // Find C4 exams from history
    const c4ExamsTaken = history.filter(item => {
        const title = (item.quizTitle || '').toLowerCase();
        return title.includes('component 4') || title.includes('producing and analysing');
    });

    const paperStatus = C4_PAPERS.map(p => {
        const matched = c4ExamsTaken.find(ex => p.regex.test(ex.quizTitle || ''));
        const pct = matched ? Math.round(((matched.score || 0) / (matched.total || 1)) * 100) : null;
        return {
            ...p,
            completed: !!matched,
            score: matched ? matched.score : null,
            total: matched ? matched.total : null,
            percentage: pct,
            grade: matched?.grade || (pct !== null ? (pct >= 80 ? 'A' : pct >= 60 ? 'C' : 'U') : null)
        };
    });

    const completedPaperCount = paperStatus.filter(p => p.completed).length;

    let totalScore = 0;
    let totalMax = 0;
    c4ExamsTaken.forEach(ex => {
        totalScore += Number(ex.score) || 0;
        totalMax += Number(ex.total) || 0;
    });

    const averagePercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

    // Check practical competencies practiced via campaign or specific interactive tasks
    const hasMidiPractice = campaignCompleted.some(id => id.includes('midi') || id.includes('piano_roll')) || c4ExamsTaken.length > 0;
    const hasSignalFlow = campaignCompleted.some(id => id.includes('signal_flow')) || c4ExamsTaken.length > 0;
    const hasPitchCorrection = campaignCompleted.some(id => id.includes('pitch') || id.includes('tuning')) || c4ExamsTaken.length > 0;
    const hasSynthSoundDesign = campaignCompleted.some(id => id.includes('synth')) || c4ExamsTaken.length > 0;

    // Composite readiness: 60% exam papers + 40% practical interactive completion
    const paperWeight = (completedPaperCount / C4_PAPERS.length) * 60;
    const examAvgWeight = c4ExamsTaken.length > 0 ? (averagePercent * 0.4) : 0;
    const overallPercent = Math.min(100, Math.round(paperWeight + examAvgWeight));

    return {
        started: c4ExamsTaken.length > 0,
        mocksTaken: c4ExamsTaken.length,
        exams: c4ExamsTaken,
        paperStatus,
        completedPaperCount,
        totalPapers: C4_PAPERS.length,
        averagePercent,
        overallPercent,
        practicalCompetencies: {
            midiQuantisation: hasMidiPractice,
            signalFlow: hasSignalFlow,
            pitchCorrection: hasPitchCorrection,
            synthSoundDesign: hasSynthSoundDesign
        }
    };
};

// --------------------------------------------------------------------------
// Diagnostic Engine: Identify Student Strong Points & Weak Points
// --------------------------------------------------------------------------
export const analyzeStudentStrengthsAndWeaknesses = (student) => {
    const c1 = computeC1DetailedMetrics(student?.progress?.component1Guide);
    const c2 = computeC2DetailedMetrics(student?.progress?.component2Guide);
    const c3 = computeC3DetailedMetrics(student);
    const c4 = computeC4DetailedMetrics(student);

    const strengths = [];

    // Component 1 Highlights
    if (c1.started) {
        if (c1.drumsBassDone >= 3) {
            strengths.push({ component: 'C1', tag: 'Drums & Bass', text: `Drum & Bass capture verified (${c1.drumsBassDone}/${c1.drumsBassTotal} techniques locked)` });
        }
        if (c1.guitarsVocalsDone >= 3) {
            strengths.push({ component: 'C1', tag: 'Vocals & Guitars', text: `Acoustic/electric guitar & vocal tracking verified` });
        }
        if (c1.mixDone >= 3) {
            strengths.push({ component: 'C1', tag: 'Mix & Master', text: `Mixing techniques & True Peak Limiter set (-1.0 dBFS)` });
        }
        if (c1.masterDone >= 10) {
            strengths.push({ component: 'C1', tag: 'Master Checklist', text: `${c1.masterDone}/16 Pre-Submission checks completed` });
        }
    }

    // Component 2 Highlights
    if (c2.started) {
        if (c2.synDone >= 4) {
            strengths.push({ component: 'C2', tag: 'AG1 Synthesis', text: `Advanced Synthesis mastered (${c2.synDone}/8 synthesis techniques)` });
        }
        if (c2.smpDone >= 4) {
            strengths.push({ component: 'C2', tag: 'AG2 Sampling', text: `Creative sampling manipulation (${c2.smpDone}/8 samples custom mapped)` });
        }
        if (c2.fxDone >= 4) {
            strengths.push({ component: 'C2', tag: 'AG3 Creative FX', text: `Creative FX and dynamic automation verified (${c2.fxDone}/8)` });
        }
        if (c2.masterDone >= 10) {
            strengths.push({ component: 'C2', tag: 'Master Checklist', text: `${c2.masterDone}/17 C2 checks complete` });
        }
    }

    // Component 3 Highlights
    if (c3.started) {
        if (c3.averagePercent >= 70) {
            strengths.push({ component: 'C3', tag: 'Listening Exam', text: `Strong listening accuracy: ${c3.averagePercent}% average across mocks` });
        }
        if (c3.completedGenreCount >= 3) {
            strengths.push({ component: 'C3', tag: 'Genre Coverage', text: `Covered ${c3.completedGenreCount}/5 Edexcel exam genres` });
        }
    }

    // Component 4 Highlights
    if (c4.started) {
        if (c4.averagePercent >= 70) {
            strengths.push({ component: 'C4', tag: 'Practical DAW', text: `Excellent DAW practical score: ${c4.averagePercent}% average` });
        }
        if (c4.completedPaperCount >= 2) {
            strengths.push({ component: 'C4', tag: 'DAW Mocks', text: `Completed ${c4.completedPaperCount} practical DAW past papers` });
        }
    }

    // Fallback if empty
    if (strengths.length === 0) {
        strengths.push({ component: 'General', tag: 'Active', text: 'Candidate actively engaged in Music Technology study' });
    }

    return {
        strengths,
        weakPoints: [], // Weak points removed per teacher request
        c1,
        c2,
        c3,
        c4
    };
};

// --------------------------------------------------------------------------
// Official 60-Mark Checklists for Component 1 and Component 2
// Sourced directly from Pearson Edexcel 9MT0/01 and 9MT0/02 specifications.
// 15 items x 4 marks = 60 Marks each.
// --------------------------------------------------------------------------
export const C1_MARK_SCHEME_ITEMS = [
    {
        id: 'c1_ms_drums',
        code: 'AG1A',
        category: 'Capture (AG1 • 12 Marks)',
        label: 'Drum Kit Multi-Mic Tracking',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Min. 4 microphones (Kick, Snare, Overheads L/R or Glyn Johns). Phase aligned, zero pre-A/D clipping (-8 to -6 dBFS peak).',
        strength: 'C1: 4+ Drum Mics & Phase Aligned',
        weakness: 'C1: Drum multi-mic capture unverified'
    },
    {
        id: 'c1_ms_vox',
        code: 'AG1B',
        category: 'Capture (AG1 • 12 Marks)',
        label: 'Lead & Backing Vocals Capture',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Cardioid LDC, shockmount, pop shield (5-8cm), reflection filter, 15-20cm distance. Double-tracked BVs, zero click bleed.',
        strength: 'C1: Lead & Backing Vocals Captured',
        weakness: 'C1: Vocal capture / pop protection needed'
    },
    {
        id: 'c1_ms_inst',
        code: 'AG1C',
        category: 'Capture (AG1 • 12 Marks)',
        label: 'Guitars, Bass & MIDI Instruments',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Clean Bass DI/cab, Acoustic Guitar (12th fret SDC), Electric Guitar amp/DI + min. 2 Additional Instruments (Keys, Brass, Strings, MIDI).',
        strength: 'C1: Bass, Guitars & 2+ Additional Stems',
        weakness: 'C1: Need 2+ additional captured stems'
    },
    {
        id: 'c1_ms_eq_drm',
        code: 'AG2',
        category: 'Equalisation (AG2 • 12 Marks)',
        label: 'Drum Kit Equalisation',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Kick sub punch (60Hz) & click sculpted, Snare 300Hz boxiness notched, Overheads high-passed with clean cymbals.',
        strength: 'C1: Drum Kit EQ Sculpted',
        weakness: 'C1: Drum kit EQ / low-end mud needs work'
    },
    {
        id: 'c1_ms_eq_vox',
        code: 'AG2',
        category: 'Equalisation (AG2 • 12 Marks)',
        label: 'Vocals Equalisation & Presence',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: '80-100Hz HPF, 240Hz low-mid mud cut, 3.5kHz presence boost & 12kHz smooth air shelf.',
        strength: 'C1: Vocal Presence & Air EQ Balanced',
        weakness: 'C1: Vocal low-mid mud / sibilance EQ needed'
    },
    {
        id: 'c1_ms_eq_oth',
        code: 'AG2',
        category: 'Equalisation (AG2 • 12 Marks)',
        label: 'Other Parts & Mix Frequency Separation',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Complementary pocketing between Kick (60Hz) and Bass (180Hz); HPFs on non-bass tracks; guitars dipped at 3kHz for vocal clarity.',
        strength: 'C1: Kick/Bass Frequency Pocketing Clean',
        weakness: 'C1: Frequency masking between bass & guitars'
    },
    {
        id: 'c1_ms_dyn_drm',
        code: 'AG3',
        category: 'Dynamics (AG3 • 12 Marks)',
        label: 'Drum Dynamics & Parallel Compression',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Kick/Snare 15-30ms attack preserving transients; Tom noise gates; parallel NY compression or drum bus glue (2:1).',
        strength: 'C1: Punchy Drum Dynamics & Bus Glue',
        weakness: 'C1: Drum dynamics clamp transient punch'
    },
    {
        id: 'c1_ms_dyn_vox',
        code: 'AG3',
        category: 'Dynamics (AG3 • 12 Marks)',
        label: 'Vocal Dynamics & De-Essing',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Serial vocal compression (FET 4:1 fast peak control -> Opto 2:1 smooth leveling, 3-6dB GR) + De-Esser (6-8kHz) on harsh sibilance.',
        strength: 'C1: Serial Vocal Compression & De-Essing',
        weakness: 'C1: Vocal levels uneven / de-esser needed'
    },
    {
        id: 'c1_ms_dyn_oth',
        code: 'AG3',
        category: 'Dynamics (AG3 • 12 Marks)',
        label: 'Other Parts Dynamics & Master Bus Glue',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Bass leveled with optical compression (4:1); electric/acoustic guitars controlled; master bus VCA glue (2:1, 30ms attack, auto release).',
        strength: 'C1: Bass & Master Bus Glue Compressed',
        weakness: 'C1: Bass dynamic leveling unverified'
    },
    {
        id: 'c1_ms_fx_drm',
        code: 'AG4',
        category: 'Effects & Ambience (AG4 • 12 Marks)',
        label: 'Drum Ambience & Aux Reverb',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Shared Aux Drum Room or Snare Plate (0.6-0.9s) glueing individual close mics into a cohesive acoustic space.',
        strength: 'C1: Drum Room Ambience Cohesive',
        weakness: 'C1: Dry drum stems / need aux room reverb'
    },
    {
        id: 'c1_ms_fx_vox',
        code: 'AG4',
        category: 'Effects & Ambience (AG4 • 12 Marks)',
        label: 'Vocal Spatial FX (Plate & Delay)',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Aux Vocal Plate Reverb (25-35ms pre-delay) + tempo-synced delay throws (1/8D or slapback); post-reverb EQ (HPF 200Hz, LPF 8kHz).',
        strength: 'C1: Vocal Plate & Delay Throws Polished',
        weakness: 'C1: Vocal aux reverb / pre-delay missing'
    },
    {
        id: 'c1_ms_fx_oth',
        code: 'AG4',
        category: 'Effects & Ambience (AG4 • 12 Marks)',
        label: 'Other Parts Creative FX & Depth',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Guitar pedalboard/chorus/tremolo, B3 Leslie rotor speed switching, Rhodes stereo tremolo, natural acoustic depth.',
        strength: 'C1: Instrument Modulation & Amp FX Clean',
        weakness: 'C1: Instrument modulation / spatial depth needed'
    },
    {
        id: 'c1_ms_balance',
        code: 'AG5',
        category: 'Mix & Master (AG5–7 • 12 Marks)',
        label: 'Balance, Fader Rides & Duration (3:00–3:30)',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Lead vocal clearly intelligible above the band; fader automation across sections; compulsory stems meet duration; 3:00-3:30 total time.',
        strength: 'C1: Vocal Hierarchy & Automation Balanced',
        weakness: 'C1: Fader rides / 3:00-3:30 duration unverified'
    },
    {
        id: 'c1_ms_stereo',
        code: 'AG6',
        category: 'Mix & Master (AG5–7 • 12 Marks)',
        label: 'Stereo Field & Panorama',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Kick, Snare, Bass & Lead Vocal anchored dead-center; consistent drum perspective (Audience/Drummer); wide balanced L/R spread.',
        strength: 'C1: Center Anchor & Wide Stereo Soundstage',
        weakness: 'C1: Panning lopsided / kick or bass off-center'
    },
    {
        id: 'c1_ms_master',
        code: 'AG7',
        category: 'Mix & Master (AG5–7 • 12 Marks)',
        label: 'Noise Hygiene, Comping & Master Level',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Crossfades on all region edits; seamless vocal comping & transparent pitch correction; Adaptive Limiter at -1.0 dBFS True Peak (-14 to -16 LUFS); completed logbook.',
        strength: 'C1: Noise-Free Edits & -1.0 dBFS Master Limiter',
        weakness: 'C1: Edit clicks / limiter ceiling unchecked'
    }
];

export const C2_MARK_SCHEME_ITEMS = [
    {
        id: 'c2_ms_ag1_patch',
        code: 'AG1',
        category: 'Technical Control (AG1 • 8 Marks)',
        label: 'AG1: Synthesis — Patch Programming & Detune',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Bespoke synth patches (Subtractive, FM, Wavetable); custom wave selection & detuning cents (e.g. Reese bass / detuned saws).',
        strength: 'C2: Bespoke Synth Patch Programming Locked',
        weakness: 'C2: Unedited factory presets / custom synth needed'
    },
    {
        id: 'c2_ms_ag1_mod',
        code: 'AG1',
        category: 'Technical Control (AG1 • 8 Marks)',
        label: 'AG1: Synthesis — Filter Automation & Envelopes',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Filter cutoff automation sweeps, resonance, ADSR amplitude/filter envelope sculpting, LFO modulation, glide & pitch bend.',
        strength: 'C2: Synth Filter Sweeps & Envelopes Automated',
        weakness: 'C2: Synth filter automation / ADSR shaping needed'
    },
    {
        id: 'c2_ms_ag2_sources',
        code: 'AG2',
        category: 'Technical Control (AG2 • 8 Marks)',
        label: 'AG2: Sampling — Capture & 6+ Sourced Samples',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Minimum of 6 distinct audio samples sourced, recorded, or found-sound captured; all credited in official logbook.',
        strength: 'C2: 6+ Distinct Samples Sourced & Credited',
        weakness: 'C2: Fewer than 6 custom samples (needs 6+)'
    },
    {
        id: 'c2_ms_ag2_manip',
        code: 'AG2',
        category: 'Technical Control (AG2 • 8 Marks)',
        label: 'AG2: Sampling — Slicing, Time/Pitch Stretch',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Transient slicing in Quick Sampler, Flex Time stretching, Flex Pitch vocal/instrumental harmonies, sample reversing & micro-loops.',
        strength: 'C2: Quick Sampler Slicing & Flex Manipulation',
        weakness: 'C2: Sample manipulation / slicing needed'
    },
    {
        id: 'c2_ms_ag3_spatial',
        code: 'AG3',
        category: 'Technical Control (AG3 • 8 Marks)',
        label: 'AG3: Creative FX — Spatial Swells & Delay Throws',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Automated Reverb Bloom send swells into drops, rhythmic tempo-synced delay throws, and escalating feedback builds (40% -> 90%).',
        strength: 'C2: Reverb Bloom Swells & Delay Throws Automated',
        weakness: 'C2: Creative reverb/delay automation needed'
    },
    {
        id: 'c2_ms_ag3_mod',
        code: 'AG3',
        category: 'Technical Control (AG3 • 8 Marks)',
        label: 'AG3: Creative FX — Modulation, Filters & Vocoder',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Chorus/flanger modulation, bitcrusher distortion, EVOC 20 vocoder or sidechain FX, and master/bus AutoFilter sweeps.',
        strength: 'C2: Modulation FX & Filter Sweeps Verified',
        weakness: 'C2: Modulation FX / filter sweep automation needed'
    },
    {
        id: 'c2_ms_ag4_eq_edit',
        code: 'AG4',
        category: 'Technical Control (AG4 • 6 Marks)',
        label: 'AG4: Edit & Mix — Region Fades & Frequency EQ',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Top-and-tail fades on all regions (zero clicks); high-pass filtering (<80Hz) on non-bass tracks; subtractive EQ carving frequency pockets.',
        strength: 'C2: Clean Region Fades & High-Pass Filtering',
        weakness: 'C2: Region edit clicks / low-end filtering needed'
    },
    {
        id: 'c2_ms_ag4_dyn_master',
        code: 'AG4',
        category: 'Technical Control (AG4 • 6 Marks)',
        label: 'AG4: Dynamics, Stereo Field & Master Ceiling',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Track & bus glue compression; kick-to-bass sidechain ducking; balanced L/R stereo imaging; Adaptive Limiter set to -0.1 dBFS ceiling.',
        strength: 'C2: Sidechain Ducking & -0.1 dBFS Master Limiter',
        weakness: 'C2: Sidechain compression / limiter ceiling needed'
    },
    {
        id: 'c2_ms_ag5_brief',
        code: 'AG5',
        category: 'Musical Response (AG5 • 6 Marks)',
        label: 'AG5: Response to Brief — Stimulus & Concept',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Mandatory stimulus track or set text is clearly recognizable and central to the composition; sound design reflects brief imagery.',
        strength: 'C2: Clear Stimulus Integration & Concept',
        weakness: 'C2: Stimulus track / text not recognizable'
    },
    {
        id: 'c2_ms_ag5_timing',
        code: 'AG5',
        category: 'Musical Response (AG5 • 6 Marks)',
        label: 'AG5: Duration (3:00) & Section Contrast',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Composition finishes cleanly at exactly 3:00 minutes with natural decay tail; clear contrast between sections (builds, drops, breakdowns).',
        strength: 'C2: Exact 3:00 Duration & Dynamic Section Contrast',
        weakness: 'C2: Composition duration not 3:00 / sections static'
    },
    {
        id: 'c2_ms_ag6_style',
        code: 'AG6',
        category: 'Musical Response (AG6 • 6 Marks)',
        label: 'AG6: Style & Idiomatic Genre Production',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Drum patterns, synth timbres, and tempo authentically emulate chosen genre conventions and stimulus inspiration.',
        strength: 'C2: Authentic Genre Style & Production Conventions',
        weakness: 'C2: Genre styling inconsistent / drums generic'
    },
    {
        id: 'c2_ms_ag6_coherence',
        code: 'AG6',
        category: 'Musical Response (AG6 • 6 Marks)',
        label: 'AG6: Coherence, Transitions & Thematic Hooks',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Smooth transitions using risers, reverse sweeps, drum fills, and recurring melodic/vocal sample motifs that unify the track.',
        strength: 'C2: Thematic Motifs & Polished Transitions',
        weakness: 'C2: Transitions abrupt / lacks unifying motif'
    },
    {
        id: 'c2_ms_ag7_melody',
        code: 'AG7–11',
        category: 'Musicality (AG7–11 • 18 Marks)',
        label: 'AG7–11 Musicality: Melody & Lead Hook',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Catchy primary lead hook (vocal or synth), motif development across sections, expressive phrasing, and counter-melodies.',
        strength: 'C2: Catchy Lead Hook & Motif Development',
        weakness: 'C2: Lead melody repetitive / needs development'
    },
    {
        id: 'c2_ms_ag8_harmony',
        code: 'AG8',
        category: 'Musicality (AG7–11 • 18 Marks)',
        label: 'AG8: Musicality: Harmony & Tonal Contrast',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: 'Extended chords (min7, maj7, 9ths, sus), modal shifts, inversions, and harmonic contrast between verse and chorus/drop.',
        strength: 'C2: Extended Harmony & Sectional Chord Lift',
        weakness: 'C2: Basic root triads / lacks harmonic contrast'
    },
    {
        id: 'c2_ms_ag9_rhythm_texture',
        code: 'AG9–10',
        category: 'Musicality (AG7–11 • 18 Marks)',
        label: 'AG9–10 Musicality: Rhythm, Groove & 6+ Parts',
        marks: 4,
        pointsLabel: '4 Marks',
        sub: '6+ distinct parts weaving across low/mid/high registers; syncopated groove/swing (Q-Swing 54-62%); polyrhythms and halftime shifts.',
        strength: 'C2: 6+ Distinct Parts & Dynamic Syncopated Groove',
        weakness: 'C2: Fewer than 6 parts / rigid quantisation'
    }
];

// Compatibility aliases
export const SIMPLE_C1_CHECKLIST = C1_MARK_SCHEME_ITEMS;
export const SIMPLE_C2_CHECKLIST = C2_MARK_SCHEME_ITEMS;

export const SIMPLE_C3_CHECKLIST = [
    { id: 'c3_rock', label: 'Rock & Pop Production', sub: 'Guitar amp distortion, drum room acoustics & tape saturation', strength: 'Rock Production Analyzed', weakness: 'Rock & Pop production analysis needed' },
    { id: 'c3_soul', label: 'Soul & Funk Capture', sub: 'Horn section miking, DI bass slap, plate/spring reverbs', strength: 'Soul & Funk Techniques Mastered', weakness: 'Soul & Funk listening practice needed' },
    { id: 'c3_synth', label: 'Synth Pop & 80s Tech', sub: 'Gated snare reverb, early digital synths, drum machines', strength: 'Synth Pop & 80s Gear Mastered', weakness: 'Synth Pop listening questions pending' },
    { id: 'c3_reggae', label: 'Reggae & Dub Techniques', sub: 'Tape delay feedback, spring splashes, filter sweeps, mutes', strength: 'Reggae & Dub FX Understood', weakness: 'Reggae & Dub listening practice needed' },
    { id: 'c3_acoustics', label: 'Microphones & Acoustics', sub: 'Omni, Cardioid, Fig-8 polar patterns, proximity effect, RT60', strength: 'Transducer & Acoustic Theory Strong', weakness: 'Acoustic & microphone theory revision needed' },
    { id: 'c3_dynamics_eq', label: 'EQ & Dynamic Detection', sub: 'Frequency detection (HPF/shelves) & compressor parameters', strength: 'EQ & Compression Detection High', weakness: 'EQ / compressor detection score low' },
    { id: 'c3_section_a', label: 'Section A Timed Mock (Q1–Q4)', sub: 'Completed full timed listening exam paper', strength: 'Section A Listening Mock Completed', weakness: 'Section A listening past paper pending' },
    { id: 'c3_section_b', label: 'Section B Extended Essay (Q5/6)', sub: 'Practiced 8m comparative analysis & 12m evaluation', strength: 'Section B Extended Essays Practiced', weakness: 'Section B comparative essay unpracticed' }
];

export const SIMPLE_C4_CHECKLIST = [
    { id: 'c4_setup', label: 'DAW Session Configuration', sub: 'Logic/Cubase project set to 44.1kHz / 24-bit with tempo match', strength: 'DAW Session Config Locked', weakness: 'DAW project setup unverified' },
    { id: 'c4_drums', label: 'Task 1: MIDI & Drum Editing', sub: 'MIDI editing, quantisation correction & transient alignment', strength: 'Task 1 Drum Quantisation Locked', weakness: 'MIDI drum editing practice needed' },
    { id: 'c4_tuning', label: 'Task 2: Pitch & Flex Tuning', sub: 'Transparent vocal & bass tuning (Flex Pitch / Melodyne)', strength: 'Task 2 Pitch Correction Clean', weakness: 'Vocal/bass pitch correction pending' },
    { id: 'c4_synth', label: 'Task 3: Synth Sound Design', sub: 'Filter cutoff automation, resonance, ADSR envelope shaping', strength: 'Task 3 Synth Programming Strong', weakness: 'Synthesiser programming practice needed' },
    { id: 'c4_sidechain', label: 'Task 4: Sidechain Dynamic Ducking', sub: 'Kick triggering bass/pad compressor threshold ducking', strength: 'Task 4 Sidechain Ducking Verified', weakness: 'Sidechain routing needs practice' },
    { id: 'c4_fx_mix', label: 'Task 5 & 6: Mix & Headroom', sub: 'Time-based FX throws, stereo balance & -0.1 dBFS limiter', strength: 'Task 5 & 6 Mix Headroom Clean', weakness: 'Final mix headroom / limiter unchecked' },
    { id: 'c4_section_b', label: 'Section B Production Knowledge', sub: 'Hardware signal chains, preamps & digital audio theory', strength: 'Section B Diagnostic Knowledge High', weakness: 'Section B short answer practice needed' },
    { id: 'c4_section_c', label: 'Section C 18-Mark Essay', sub: 'Written technical essay comparing production workflows', strength: 'Section C Technical Essay Practiced', weakness: 'Section C 18-mark essay pending' }
];

// Real student cohort (Thor House & Mr Hansom cohort from database)
export const DEFAULT_SAMPLE_STUDENTS = [
    {
        student_id: '7126f10e-a799-4069-9d45-9756476f379b',
        full_name: 'Xin Fang',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - FUNK & DISCO', score: 26, total: 30, grade: 'A', date: '18/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - EDM', score: 48, total: 60, grade: 'B', date: '12/10/2026' }
            ],
            mastery: { '1': 85, '2': 80, '4': 75, '5': 90 },
            quizzesCompleted: 6,
            totalScore: 142,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Get Lucky', artist: 'Daft Punk' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'ed9e4eba-7b26-4d57-9354-4b7377eedfbc',
        full_name: 'Jesse',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - HEAVY ROCK', score: 28, total: 30, grade: 'A*', date: '19/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - Rock (2019 Style)', score: 54, total: 60, grade: 'A', date: '16/10/2026' }
            ],
            mastery: { '1': 92, '2': 88, '4': 85, '5': 80 },
            quizzesCompleted: 8,
            totalScore: 195,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Black Dog', artist: 'Led Zeppelin', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Strobe', artist: 'deadmau5' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '4a66c9a4-f17d-4895-a079-6b67cb2b3d8b',
        full_name: 'Teddie',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SYNTH POP', score: 24, total: 30, grade: 'B', date: '15/10/2026' }
            ],
            mastery: { '1': 70, '2': 75, '4': 65 },
            quizzesCompleted: 4,
            totalScore: 88,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Dreams', artist: 'Fleetwood Mac', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '4c00a591-4227-484a-954b-fbcc8010900c',
        full_name: 'Adam Althoukhi',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - FUNK & DISCO', score: 27, total: 30, grade: 'A', date: '17/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - EDM', score: 50, total: 60, grade: 'A', date: '14/10/2026' }
            ],
            mastery: { '1': 88, '2': 82, '4': 78, '5': 84 },
            quizzesCompleted: 7,
            totalScore: 165,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Get Lucky', artist: 'Daft Punk' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'b543ee7f-1af2-4960-ac16-26a7f55c17f2',
        full_name: 'Alvaro Viano',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SOUL & MOTOWN', score: 25, total: 30, grade: 'A', date: '18/10/2026' }
            ],
            mastery: { '1': 75, '2': 80, '4': 70 },
            quizzesCompleted: 5,
            totalScore: 110,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '615d3148-3423-4267-bf6f-d3bc065148b3',
        full_name: 'William Cook',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - HEAVY ROCK', score: 26, total: 30, grade: 'A', date: '19/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - Rock', score: 48, total: 60, grade: 'B', date: '15/10/2026' }
            ],
            mastery: { '1': 82, '2': 78, '4': 74 },
            quizzesCompleted: 6,
            totalScore: 135,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Black Dog', artist: 'Led Zeppelin', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Strobe', artist: 'deadmau5' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'd639cf41-46d5-4e78-a745-5d354c54ad92',
        full_name: 'Oliver Forde',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - REGGAE & DUB', score: 25, total: 30, grade: 'A', date: '16/10/2026' }
            ],
            mastery: { '1': 76, '2': 72, '4': 68 },
            quizzesCompleted: 4,
            totalScore: 95,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Dreams', artist: 'Fleetwood Mac', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'ea3343d1-0eba-4877-a426-85bcbfa22cec',
        full_name: 'Emma Marney',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SOUL & MOTOWN', score: 28, total: 30, grade: 'A*', date: '19/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - EDM', score: 55, total: 60, grade: 'A', date: '17/10/2026' }
            ],
            mastery: { '1': 90, '2': 86, '4': 82, '5': 88 },
            quizzesCompleted: 8,
            totalScore: 180,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Get Lucky', artist: 'Daft Punk' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '08f2251e-4d31-410c-a4c5-c7011089fddb',
        full_name: 'Avery Katesmark-Jones',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SYNTH POP', score: 22, total: 30, grade: 'C', date: '14/10/2026' }
            ],
            mastery: { '1': 65, '2': 68, '4': 60 },
            quizzesCompleted: 3,
            totalScore: 72,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Dreams', artist: 'Fleetwood Mac', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'd3b6b67c-e732-4a5d-a61f-a88f11da8c57',
        full_name: "Sydney O'Brien",
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - HEAVY ROCK', score: 27, total: 30, grade: 'A', date: '18/10/2026' },
                { quizTitle: 'Component 4: Producing and Analysing - Rock', score: 51, total: 60, grade: 'A', date: '16/10/2026' }
            ],
            mastery: { '1': 84, '2': 80, '4': 76 },
            quizzesCompleted: 6,
            totalScore: 150,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Black Dog', artist: 'Led Zeppelin', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Strobe', artist: 'deadmau5' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '87a797da-0eb2-45db-b483-4c5109e067f9',
        full_name: 'Naomi Kitashiba-Dias',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - FUNK & DISCO', score: 25, total: 30, grade: 'A', date: '17/10/2026' }
            ],
            mastery: { '1': 78, '2': 74, '4': 70 },
            quizzesCompleted: 5,
            totalScore: 115,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '534023cf-adbd-4502-abf9-4db64a5ee077',
        full_name: 'O. Downie',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SOUL & MOTOWN', score: 23, total: 30, grade: 'B', date: '15/10/2026' }
            ],
            mastery: { '1': 70, '2': 66, '4': 64 },
            quizzesCompleted: 4,
            totalScore: 85,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Dreams', artist: 'Fleetwood Mac', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Get Lucky', artist: 'Daft Punk' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: 'f3ddaaf8-983b-44b3-af6c-c8f1465ac69d',
        full_name: 'G. Beta',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - HEAVY ROCK', score: 26, total: 30, grade: 'A', date: '18/10/2026' }
            ],
            mastery: { '1': 79, '2': 75, '4': 72 },
            quizzesCompleted: 5,
            totalScore: 120,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Black Dog', artist: 'Led Zeppelin', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief2',
                stimulusInfo: { trackTitle: 'Blue Monday', artist: 'New Order' },
                markSchemeTicks: {}
            }
        }
    },
    {
        student_id: '44f7d03e-cdd2-4e06-a42e-ea3d453f6b7d',
        full_name: 'V. Kychma',
        progress: {
            history: [
                { quizTitle: 'Component 3: Listening and Analysing - SYNTH POP', score: 24, total: 30, grade: 'B', date: '16/10/2026' }
            ],
            mastery: { '1': 74, '2': 70, '4': 68 },
            quizzesCompleted: 4,
            totalScore: 92,
            component1Guide: {
                sessionInfo: { prescribedTrack: 'Superstition', artist: 'Stevie Wonder', daw: 'Logic Pro X' },
                markSchemeTicks: {}
            },
            component2Guide: {
                selectedBrief: 'brief3',
                stimulusInfo: { trackTitle: 'Get Lucky', artist: 'Daft Punk' },
                markSchemeTicks: {}
            }
        }
    }
];

// --------------------------------------------------------------------------
// Unified Progress Evaluator with 60-Mark Schemes
// --------------------------------------------------------------------------
export const computeSimpleStudentMetrics = (student, teacherSavedData = {}) => {
    const studentId = student?.student_id;
    const teacherData = teacherSavedData[studentId] || {};
    const tC1 = teacherData.c1 || {};
    const tC2 = teacherData.c2 || {};
    const tC3 = teacherData.c3 || {};
    const tC4 = teacherData.c4 || {};

    const progress = student?.progress || {};
    const c1State = progress.component1Guide || {};
    const c2State = progress.component2Guide || {};
    const history = progress.history || [];
    const mastery = progress.mastery || {};
    const campaignCompleted = progress.campaignCompleted || [];
    const quizzesCompleted = progress.quizzesCompleted || history.length || 0;

    // Detailed metrics computed from guides
    const c1Detailed = computeC1DetailedMetrics(c1State);
    const c2Detailed = computeC2DetailedMetrics(c2State);

    // --- COMPONENT 1 (Recording • 60 Marks) ---
    // Strict Coursework Tracking: Marks only awarded when explicitly ticked by student or moderated by teacher
    const studentC1Ticks = c1State.markSchemeTicks || {};
    const autoC1 = {};
    C1_MARK_SCHEME_ITEMS.forEach((item) => {
        autoC1[item.id] = Boolean(studentC1Ticks[item.id]);
    });

    // --- COMPONENT 2 (Composition • 60 Marks) ---
    // Strict Coursework Tracking: Marks only awarded when explicitly ticked by student or moderated by teacher
    const studentC2Ticks = c2State.markSchemeTicks || {};
    const autoC2 = {};
    C2_MARK_SCHEME_ITEMS.forEach((item) => {
        autoC2[item.id] = Boolean(studentC2Ticks[item.id]);
    });

    // --- AUTO-TRACKING COMPONENT 3 (Listening & Analysing • 75 Marks, 8 Milestones) ---
    const c3Exams = history.filter(h => (h.quizTitle || '').toLowerCase().includes('component 3') || (h.quizTitle || '').toLowerCase().includes('listening'));
    const autoC3 = {
        c3_rock: c3Exams.some(h => /rock/i.test(h.quizTitle)) || history.some(h => /rock/i.test(h.quizTitle)),
        c3_soul: c3Exams.some(h => /soul|funk/i.test(h.quizTitle)) || history.some(h => /soul|funk|disco/i.test(h.quizTitle)),
        c3_synth: c3Exams.some(h => /synth/i.test(h.quizTitle)) || history.some(h => /synth\s*pop|80s/i.test(h.quizTitle)),
        c3_reggae: c3Exams.some(h => /reggae|dub/i.test(h.quizTitle)) || history.some(h => /reggae|dub/i.test(h.quizTitle)),
        c3_acoustics: (mastery['Acoustics'] || mastery['1'] || 0) >= 50 || history.some(h => /acoustic|micro/i.test(h.quizTitle)),
        c3_dynamics_eq: (mastery['EQ'] || mastery['2'] || 0) >= 50 || (mastery['Dynamics'] || mastery['4'] || 0) >= 50 || history.some(h => /eq|compress/i.test(h.quizTitle)),
        c3_section_a: c3Exams.length >= 1 || quizzesCompleted >= 3,
        c3_section_b: c3Exams.some(h => (h.score / (h.total || 1)) >= 0.65) || (quizzesCompleted >= 5 && (progress.totalScore || 0) >= 80)
    };

    // --- AUTO-TRACKING COMPONENT 4 (Producing & Analysing DAW • 75 Marks, 8 Milestones) ---
    const c4Exams = history.filter(h => (h.quizTitle || '').toLowerCase().includes('component 4') || (h.quizTitle || '').toLowerCase().includes('producing') || (h.quizTitle || '').toLowerCase().includes('daw'));
    const autoC4 = {
        c4_setup: c4Exams.length >= 1 || campaignCompleted.length >= 2 || quizzesCompleted >= 2,
        c4_drums: c4Exams.length >= 1 || campaignCompleted.some(id => id.includes('midi') || id.includes('drum')) || history.some(h => /midi|drum/i.test(h.quizTitle)),
        c4_tuning: c4Exams.some(h => (h.score / (h.total || 1)) >= 0.5) || campaignCompleted.some(id => id.includes('pitch') || id.includes('tuning')) || history.some(h => /pitch|flex/i.test(h.quizTitle)),
        c4_synth: c4Exams.some(h => /synth|edm/i.test(h.quizTitle)) || history.some(h => /synth|edm/i.test(h.quizTitle)) || (mastery['Synthesis'] || 0) >= 50,
        c4_sidechain: c4Exams.some(h => /edm/i.test(h.quizTitle)) || history.some(h => /sidechain|edm/i.test(h.quizTitle)) || campaignCompleted.some(id => id.includes('sidechain')),
        c4_fx_mix: c4Exams.length >= 1 || history.some(h => /effects|mix|headroom/i.test(h.quizTitle)) || (mastery['Effects'] || 0) >= 50,
        c4_section_b: c4Exams.some(h => (h.score / (h.total || 1)) >= 0.6) || quizzesCompleted >= 4,
        c4_section_c: c4Exams.some(h => (h.score / (h.total || 1)) >= 0.75) || (quizzesCompleted >= 6 && (progress.totalScore || 0) >= 120)
    };

    // Final ticks (Teacher override has highest priority if explicitly boolean, else auto-detect)
    const c1Ticks = {};
    C1_MARK_SCHEME_ITEMS.forEach(item => {
        c1Ticks[item.id] = tC1[item.id] !== undefined ? Boolean(tC1[item.id]) : Boolean(autoC1[item.id]);
    });

    const c2Ticks = {};
    C2_MARK_SCHEME_ITEMS.forEach(item => {
        c2Ticks[item.id] = tC2[item.id] !== undefined ? Boolean(tC2[item.id]) : Boolean(autoC2[item.id]);
    });

    const c3Ticks = {};
    SIMPLE_C3_CHECKLIST.forEach(item => {
        c3Ticks[item.id] = tC3[item.id] !== undefined ? Boolean(tC3[item.id]) : Boolean(autoC3[item.id]);
    });

    const c4Ticks = {};
    SIMPLE_C4_CHECKLIST.forEach(item => {
        c4Ticks[item.id] = tC4[item.id] !== undefined ? Boolean(tC4[item.id]) : Boolean(autoC4[item.id]);
    });

    // Counts, marks & percentages
    const c1Count = Object.values(c1Ticks).filter(Boolean).length;
    const c1Marks = c1Count * 4;
    const c1Total = 60;
    const c1Pct = Math.min(100, Math.round((c1Marks / c1Total) * 100));

    const c2Count = Object.values(c2Ticks).filter(Boolean).length;
    const c2Marks = c2Count * 4;
    const c2Total = 60;
    const c2Pct = Math.min(100, Math.round((c2Marks / c2Total) * 100));

    const c3Count = Object.values(c3Ticks).filter(Boolean).length;
    const c3Total = 75;
    const c3Marks = Math.round((c3Count / SIMPLE_C3_CHECKLIST.length) * c3Total);
    const c3Pct = Math.round((c3Count / SIMPLE_C3_CHECKLIST.length) * 100);

    const c4Count = Object.values(c4Ticks).filter(Boolean).length;
    const c4Total = 75;
    const c4Marks = Math.round((c4Count / SIMPLE_C4_CHECKLIST.length) * c4Total);
    const c4Pct = Math.round((c4Count / SIMPLE_C4_CHECKLIST.length) * 100);

    // Official Edexcel A-Level weightings: C1 (20%) + C2 (20%) + C3 (25%) + C4 (35%)
    const overallPct = Math.min(100, Math.round((c1Pct * 0.20) + (c2Pct * 0.20) + (c3Pct * 0.25) + (c4Pct * 0.35)));

    // Highlight key verified strengths
    const strengths = [];
    if (c1Marks >= 32) strengths.push(`C1: Recording (${c1Marks}/60m)`);
    if (c2Marks >= 32) strengths.push(`C2: Composition (${c2Marks}/60m)`);
    if (c3Count >= 4) strengths.push(`C3: Listening (${c3Count}/8)`);
    if (c4Count >= 4) strengths.push(`C4: Producing (${c4Count}/8)`);

    return {
        c1Ticks, c1Count, c1Marks, c1Total, c1Pct,
        c2Ticks, c2Count, c2Marks, c2Total, c2Pct,
        c3Ticks, c3Count, c3Marks, c3Total, c3Pct,
        c4Ticks, c4Count, c4Marks, c4Total, c4Pct,
        overallPct,
        strengths,
        weaknesses: [], // Weak points completely removed per request
        teacherNotes: teacherData.teacherNotes || ''
    };
};
