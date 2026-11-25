import campaignData from '../data/campaign_route.json';
import { evaluateCheckpoint } from '../utils/campaignCheckpoints';
import {
    computeC1DetailedMetrics,
    computeC2DetailedMetrics,
    computeC3DetailedMetrics,
    computeC4DetailedMetrics,
    computeSimpleStudentMetrics
} from './teacherComponentMetrics';

// Group campaign rounds into the 6 stage blocks used by Path to Legend
const CAMPAIGN_BLOCKS = (() => {
    const grouped = [];
    let currentBlock = [];
    (campaignData.rounds || []).forEach((r) => {
        currentBlock.push(r);
        if (r.type === 'exam' || r.title.includes('Exam') || r.title.includes('Roulette')) {
            grouped.push(currentBlock);
            currentBlock = [];
        }
    });
    if (currentBlock.length > 0) grouped.push(currentBlock);
    return grouped;
})();

const TOTAL_CAMPAIGN_NODES = (campaignData.rounds || []).reduce(
    (acc, r) => acc + (r.nodes?.length || 0),
    0
);

// Which Path to Legend round indices (0-based in campaignData.rounds) reinforce each Edexcel component
const COMPONENT_ROUND_MAP = {
    c1: [0, 1, 6, 7, 12, 13],       // Fundamentals & Recording, Microphones, Dynamics, EQ & Stereo, Acoustics, Equipment
    c2: [3, 4, 9, 10],              // Synthesis, Sampling, FX & Processors, Mastering
    c3: [0, 1, 2, 6, 7, 8, 12, 13, 14, 15], // Listening rounds + C3 Exam Stages + Final Mock + Past Paper Drills
    c4: [3, 4, 5, 6, 9, 10, 11, 14, 15]     // DAW practical rounds + C4 Exam Stages + Final Mock + Past Paper Drills
};

const getRoundStats = (roundIndices, completedNodes = [], history = []) => {
    const rounds = roundIndices
        .map((idx) => campaignData.rounds?.[idx])
        .filter(Boolean);

    const nodes = rounds.flatMap((r) => r.nodes || []);
    const completed = nodes.filter((n) => completedNodes.includes(n.id)).length;
    const total = nodes.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Match any quiz history scores against nodes in these rounds
    const lowScoringNodes = [];
    nodes.forEach((node) => {
        const titleLower = (node.title || '').toLowerCase();
        const match = history.find((h) => {
            const hLower = (h.quizTitle || '').toLowerCase();
            return hLower && titleLower && (hLower === titleLower || hLower.includes(titleLower) || titleLower.includes(hLower));
        });
        if (match && typeof match.score === 'number' && typeof match.total === 'number' && match.total > 0) {
            const pct = Math.round((match.score / match.total) * 100);
            if (pct < 70) {
                lowScoringNodes.push({ title: node.title, percent: pct });
            }
        }
    });

    return {
        roundsCount: rounds.length,
        completedNodes: completed,
        totalNodes: total,
        percent,
        lowScoringNodes,
        roundSummaries: rounds.map((r) => {
            const rNodes = r.nodes || [];
            const rDone = rNodes.filter((n) => completedNodes.includes(n.id)).length;
            return {
                title: r.title,
                done: rDone,
                total: rNodes.length,
                percent: rNodes.length > 0 ? Math.round((rDone / rNodes.length) * 100) : 0
            };
        })
    };
};

/**
 * Summarises a student's Path to Legend progress across all 6 checkpoints.
 */
export const buildPathToLegendSummary = (progress = {}) => {
    const completedNodes = Array.isArray(progress?.campaignCompleted) ? progress.campaignCompleted : [];
    const checkpoints = CAMPAIGN_BLOCKS.map((block, idx) => evaluateCheckpoint(block, idx, progress));

    const completedCount = completedNodes.length;
    const percent = TOTAL_CAMPAIGN_NODES > 0
        ? Math.min(100, Math.round((completedCount / TOTAL_CAMPAIGN_NODES) * 100))
        : 0;

    // Determine current active stage
    const firstIncomplete = checkpoints.find((cp) => !cp.isReached);
    const currentStageTitle = firstIncomplete
        ? firstIncomplete.title
        : 'Legend Summit: Campaign Complete';

    const weakCheckpoints = checkpoints.filter(
        (cp) => cp.isReached && cp.averageScore !== null && cp.averageScore < 70
    );

    return {
        completedCount,
        totalNodes: TOTAL_CAMPAIGN_NODES,
        percent,
        currentStageTitle,
        checkpoints,
        weakCheckpoints
    };
};

/**
 * Builds a complete C1, C2, C3, C4 Progress & Problem Report for one student,
 * combining app activity (guides, quizzes, mastery) and Path to Legend progress.
 */
export const buildStudentProgressReport = (student, teacherTicks = {}) => {
    const progress = student?.progress || {};
    const history = Array.isArray(progress.history) ? progress.history : [];
    const mastery = progress.mastery && typeof progress.mastery === 'object' ? progress.mastery : {};
    const completedNodes = Array.isArray(progress.campaignCompleted) ? progress.campaignCompleted : [];

    const simple = computeSimpleStudentMetrics(student, teacherTicks);
    const c1 = computeC1DetailedMetrics(progress.component1Guide);
    const c2 = computeC2DetailedMetrics(progress.component2Guide);
    const c3 = computeC3DetailedMetrics(student);
    const c4 = computeC4DetailedMetrics(student);
    const pathToLegend = buildPathToLegendSummary(progress);

    const c1Path = getRoundStats(COMPONENT_ROUND_MAP.c1, completedNodes, history);
    const c2Path = getRoundStats(COMPONENT_ROUND_MAP.c2, completedNodes, history);
    const c3Path = getRoundStats(COMPONENT_ROUND_MAP.c3, completedNodes, history);
    const c4Path = getRoundStats(COMPONENT_ROUND_MAP.c4, completedNodes, history);

    const problems = [];

    const checkMasteryTopics = (topicKeys, component, label) => {
        const lowTopics = topicKeys.filter(
            (k) => typeof mastery[k] === 'number' && mastery[k] < 65
        );
        if (lowTopics.length > 0) {
            problems.push({
                id: `${component}_low_mastery`,
                component,
                severity: lowTopics.some((k) => mastery[k] < 50) ? 'critical' : 'warning',
                title: `Low ${label} app topic mastery (<65%)`,
                detail: `Topics needing review in the app: ${lowTopics.map((k) => `Topic ${k} (${mastery[k]}%)`).join(', ')}.`
            });
        }
    };

    const checkPathNodes = (pathStats, component, label) => {
        if (pathStats.lowScoringNodes.length > 0) {
            problems.push({
                id: `${component}_ptl_low`,
                component,
                severity: pathStats.lowScoringNodes.some((n) => n.percent < 50) ? 'critical' : 'warning',
                title: `Low scores on ${label} Path to Legend nodes`,
                detail: pathStats.lowScoringNodes.map((n) => `${n.title} (${n.percent}%)`).join(', ')
            });
        }
        if (pathToLegend.completedCount > 0 && pathStats.completedNodes === 0) {
            problems.push({
                id: `${component}_ptl_unstarted`,
                component,
                severity: 'info',
                title: `No ${label} Path to Legend nodes completed yet`,
                detail: `0/${pathStats.totalNodes} linked Path to Legend nodes completed.`
            });
        }
    };

    // --- Path to Legend & General App problems ---
    if (pathToLegend.completedCount === 0) {
        problems.push({
            id: 'ptl_not_started',
            component: 'ptl',
            severity: 'warning',
            title: 'Path to Legend not started',
            detail: 'Candidate has 0 completed nodes on the Path to Legend map.'
        });
    }
    if ((progress.quizzesCompleted || 0) === 0 && history.length === 0) {
        problems.push({
            id: 'app_no_quizzes',
            component: 'ptl',
            severity: 'critical',
            title: 'No app quizzes completed yet',
            detail: 'Candidate has not logged any quiz attempts in the app.'
        });
    }
    pathToLegend.weakCheckpoints.forEach((cp) => {
        problems.push({
            id: `ptl_weak_${cp.id}`,
            component: 'ptl',
            severity: cp.averageScore < 50 ? 'critical' : 'warning',
            title: `Low checkpoint average in ${cp.title}`,
            detail: `Averaging ${cp.averageScore}% across ${cp.stageFocus} on Path to Legend.`
        });
    });

    // --- Component 1 (App & Path to Legend) ---
    checkMasteryTopics(['1', '2', '9', '10'], 'c1', 'C1');
    checkPathNodes(c1Path, 'c1', 'C1');

    // --- Component 2 (App & Path to Legend) ---
    checkMasteryTopics(['3', '4', '7', '8'], 'c2', 'C2');
    checkPathNodes(c2Path, 'c2', 'C2');

    // --- Component 3 (App & Path to Legend) ---
    if (c3.started && c3.averagePercent < 70) {
        problems.push({
            id: 'c3_low_avg',
            component: 'c3',
            severity: c3.averagePercent < 50 ? 'critical' : 'warning',
            title: `C3 app listening average below target (${c3.averagePercent}%)`,
            detail: `Averaging ${c3.averagePercent}% across ${c3.mocksTaken} C3 paper(s) in the app.`
        });
    } else if (!c3.started && (progress.quizzesCompleted || 0) > 0) {
        problems.push({
            id: 'c3_app_not_started',
            component: 'c3',
            severity: 'info',
            title: 'No C3 listening papers completed in app',
            detail: 'Candidate has not yet completed a C3 listening mock in the app.'
        });
    }
    checkMasteryTopics(['1', '2', '5', '6'], 'c3', 'C3');
    checkPathNodes(c3Path, 'c3', 'C3');

    // --- Component 4 (App & Path to Legend) ---
    if (c4.started && c4.averagePercent < 70) {
        problems.push({
            id: 'c4_low_avg',
            component: 'c4',
            severity: c4.averagePercent < 50 ? 'critical' : 'warning',
            title: `C4 app quiz average below target (${c4.averagePercent}%)`,
            detail: `Averaging ${c4.averagePercent}% across ${c4.mocksTaken} C4 paper(s) in the app.`
        });
    } else if (!c4.started && (progress.quizzesCompleted || 0) > 0) {
        problems.push({
            id: 'c4_app_not_started',
            component: 'c4',
            severity: 'info',
            title: 'No C4 producing papers completed in app',
            detail: 'Candidate has not yet completed a C4 producing mock in the app.'
        });
    }
    checkMasteryTopics(['3', '4', '7', '8'], 'c4', 'C4');
    checkPathNodes(c4Path, 'c4', 'C4');

    const criticalCount = problems.filter((p) => p.severity === 'critical').length;
    const warningCount = problems.filter((p) => p.severity === 'warning').length;

    return {
        student,
        simple,
        pathToLegend,
        components: {
            c1: {
                marks: simple.c1Marks,
                totalMarks: 60,
                teacherPct: simple.c1Pct,
                appPct: c1.overallPercent,
                detailed: c1,
                path: c1Path,
                problems: problems.filter((p) => p.component === 'c1')
            },
            c2: {
                marks: simple.c2Marks,
                totalMarks: 60,
                teacherPct: simple.c2Pct,
                appPct: c2.overallPercent,
                detailed: c2,
                path: c2Path,
                problems: problems.filter((p) => p.component === 'c2')
            },
            c3: {
                marks: simple.c3Marks,
                totalMarks: 75,
                teacherPct: simple.c3Pct,
                appPct: c3.overallPercent,
                detailed: c3,
                path: c3Path,
                problems: problems.filter((p) => p.component === 'c3')
            },
            c4: {
                marks: simple.c4Marks,
                totalMarks: 75,
                teacherPct: simple.c4Pct,
                appPct: c4.overallPercent,
                detailed: c4,
                path: c4Path,
                problems: problems.filter((p) => p.component === 'c4')
            }
        },
        problems,
        criticalCount,
        warningCount
    };
};

/**
 * Aggregates reports across all students in a cohort and groups recurring problems.
 */
export const buildClassProgressReport = (students = [], teacherTicks = {}, componentFilter = 'all') => {
    const reports = students.map((s) => buildStudentProgressReport(s, teacherTicks));

    const issueBuckets = {};
    reports.forEach((rep) => {
        const relevantProblems = componentFilter === 'all'
            ? rep.problems
            : rep.problems.filter((p) => p.component === componentFilter || p.component === 'ptl');

        relevantProblems.forEach((prob) => {
            const key = prob.id.startsWith('ptl_weak_') ? 'ptl_weak_checkpoint' : prob.id;
            if (!issueBuckets[key]) {
                issueBuckets[key] = {
                    key,
                    component: prob.component,
                    severity: prob.severity,
                    title: prob.id.startsWith('ptl_weak_')
                        ? 'Low checkpoint score (<70%) on Path to Legend'
                        : prob.title,
                    students: []
                };
            }
            issueBuckets[key].students.push(rep.student.full_name);
        });
    });

    const severityRank = { critical: 0, warning: 1, info: 2 };
    const recurringIssues = Object.values(issueBuckets).sort((a, b) => {
        if (severityRank[a.severity] !== severityRank[b.severity]) {
            return severityRank[a.severity] - severityRank[b.severity];
        }
        return b.students.length - a.students.length;
    });

    const avgPathPct = reports.length > 0
        ? Math.round(reports.reduce((acc, r) => acc + r.pathToLegend.percent, 0) / reports.length)
        : 0;

    return {
        reports,
        recurringIssues,
        avgPathPct,
        totalCritical: reports.reduce((acc, r) => acc + r.criticalCount, 0),
        totalWarnings: reports.reduce((acc, r) => acc + r.warningCount, 0)
    };
};
