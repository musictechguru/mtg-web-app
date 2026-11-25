/**
 * Path to Legend Checkpoint evaluation & feedback engine.
 * Evaluates each campaign stage block against userProgress (completed nodes,
 * recent quiz history, and topic mastery) to deliver targeted encouragement
 * ("Congratulations!", "Well done!", "Push harder!", "Work harder!").
 */

export const CHECKPOINT_DEFINITIONS = [
  {
    id: 'checkpoint_1',
    title: 'Checkpoint 1: Studio Foundations Review',
    stageFocus: 'Recording Fundamentals, Signal Flow & Microphones',
    examLabel: 'Component 3 Exam Stage 1'
  },
  {
    id: 'checkpoint_2',
    title: 'Checkpoint 2: Synthesis & Sampling Review',
    stageFocus: 'Synthesis, Sampling & Production',
    examLabel: 'Component 4 Exam Stage 2'
  },
  {
    id: 'checkpoint_3',
    title: 'Checkpoint 3: Dynamics & Mix Stage Review',
    stageFocus: 'Dynamic Processing, EQ & Stereo Imaging',
    examLabel: 'Component 3 Exam Stage 3'
  },
  {
    id: 'checkpoint_4',
    title: 'Checkpoint 4: FX & Mastering Review',
    stageFocus: 'FX Processors & Mastering',
    examLabel: 'Component 4 Exam Stage 4'
  },
  {
    id: 'checkpoint_5',
    title: 'Checkpoint 5: Acoustics & Final Mock Review',
    stageFocus: 'Acoustics, Studio Equipment & Final Mock',
    examLabel: 'Final Mock Exam Stage'
  },
  {
    id: 'checkpoint_legend',
    title: 'Legend Summit: Campaign Complete',
    stageFocus: 'Past Paper Drills & Roulette Mega Quiz',
    examLabel: 'Path to Legend Finale'
  }
];

/**
 * Normalises a title string for fuzzy matching between campaign nodes and quiz history.
 */
function normaliseTitle(str = '') {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Extracts topic numbers or keys from a node title (e.g. "Topic 1: ..." -> "1").
 */
function extractTopicKey(nodeTitle = '') {
  const match = nodeTitle.match(/Topic\s+(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Evaluates a single campaign block and returns its checkpoint state,
 * matched scores, average percentage, and tailored feedback tier.
 */
export function evaluateCheckpoint(blockRounds = [], blockIdx = 0, userProgress = {}) {
  const def = CHECKPOINT_DEFINITIONS[blockIdx] || {
    id: `checkpoint_${blockIdx + 1}`,
    title: `Checkpoint ${blockIdx + 1}: Stage Review`,
    stageFocus: `Stage ${blockIdx + 1}`,
    examLabel: 'Stage Assessment'
  };

  const completedNodes = Array.isArray(userProgress?.campaignCompleted)
    ? userProgress.campaignCompleted
    : [];
  const history = Array.isArray(userProgress?.history) ? userProgress.history : [];
  const mastery = userProgress?.mastery && typeof userProgress.mastery === 'object'
    ? userProgress.mastery
    : {};

  const blockNodes = blockRounds.flatMap(r => r.nodes || []);
  const totalCount = blockNodes.length;
  const completedCount = blockNodes.filter(n => completedNodes.includes(n.id)).length;
  const isReached = totalCount > 0 && completedCount === totalCount;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Match scores from history for nodes in this block
  const matchedScores = [];
  const seenTitles = new Set();

  for (const h of history) {
    if (!h || typeof h.score !== 'number' || typeof h.total !== 'number' || h.total <= 0) continue;
    const hNorm = normaliseTitle(h.quizTitle);
    const matchingNode = blockNodes.find(node => {
      const nNorm = normaliseTitle(node.title);
      return (
        hNorm === nNorm ||
        hNorm.startsWith(nNorm) ||
        nNorm.includes(hNorm) ||
        (h.quizTitle && node.title && h.quizTitle.includes(node.title))
      );
    });

    if (matchingNode && !seenTitles.has(h.quizTitle)) {
      seenTitles.add(h.quizTitle);
      matchedScores.push({
        title: h.quizTitle,
        score: h.score,
        total: h.total,
        percent: Math.round((h.score / h.total) * 100),
        grade: h.grade || null,
        nodeId: matchingNode.id
      });
    }
  }

  // Fallback: check topic mastery entries if history has rotated out
  if (matchedScores.length === 0) {
    for (const node of blockNodes) {
      const topicKey = extractTopicKey(node.title);
      if (topicKey && typeof mastery[topicKey] === 'number' && !seenTitles.has(node.title)) {
        seenTitles.add(node.title);
        matchedScores.push({
          title: node.title,
          score: null,
          total: null,
          percent: mastery[topicKey],
          grade: null,
          nodeId: node.id
        });
      }
    }
  }

  const averageScore = matchedScores.length > 0
    ? Math.round(matchedScores.reduce((sum, item) => sum + item.percent, 0) / matchedScores.length)
    : null;

  // Find lowest-scoring node in this block for targeted revision
  let weakestNodeId = blockNodes[0]?.id || null;
  if (matchedScores.length > 0) {
    const sorted = [...matchedScores].sort((a, b) => a.percent - b.percent);
    if (sorted[0]?.nodeId) weakestNodeId = sorted[0].nodeId;
  }

  const isLegendSummit = def.id === 'checkpoint_legend';

  let tier = 'locked';
  let badge = '🔒';
  let headline = 'Checkpoint Locked';
  let subheadline = `${completedCount} / ${totalCount} nodes completed`;
  let message = `Complete all ${totalCount} nodes in ${def.stageFocus} to unlock your stage review.`;
  let accent = '#64748b';
  let actionType = 'none';

  if (isReached) {
    if (averageScore === null) {
      tier = 'cleared_unscored';
      badge = '🎯';
      headline = isLegendSummit ? 'Congratulations! Legend Summit Reached' : 'Well Done! Stage Cleared';
      subheadline = 'Checkpoint Unlocked';
      message = isLegendSummit
        ? `Congratulations on completing the full Path to Legend! Take a timed quiz or mock exam to record your final benchmark score.`
        : `Well done on clearing ${def.stageFocus}! Take or retake a timed quiz in this stage to log a benchmark score here.`;
      accent = '#8b5cf6';
      actionType = isLegendSummit ? 'none' : 'next';
    } else if (averageScore >= 85) {
      tier = 'legendary';
      badge = '🏆';
      headline = isLegendSummit
        ? 'Congratulations, Music Tech Legend!'
        : 'Congratulations! Outstanding Mastery';
      subheadline = `A* / Distinction Pace (${averageScore}% avg)`;
      message = isLegendSummit
        ? `Congratulations! You have conquered the entire 10-Volume Campaign with ${averageScore}% accuracy. True Edexcel Music Technology Legend status!`
        : `Congratulations! Your command of ${def.stageFocus} is top-tier (${averageScore}%). Keep this precision going into the next stage!`;
      accent = '#10b981';
      actionType = isLegendSummit ? 'none' : 'next';
    } else if (averageScore >= 70) {
      tier = 'strong';
      badge = '🌟';
      headline = isLegendSummit
        ? 'Well Done! Campaign Mastered'
        : 'Well Done! Solid Studio Command';
      subheadline = `Merit / Grade B–A Pace (${averageScore}% avg)`;
      message = isLegendSummit
        ? `Well done on completing the Path to Legend with ${averageScore}%! Polish your weakest past-paper drills to lock in an A*.`
        : `Well done! You've built a strong foundation in ${def.stageFocus} (${averageScore}%). Sharpen a few finer details to hit 85%+.`;
      accent = '#3b82f6';
      actionType = isLegendSummit ? 'none' : 'next';
    } else if (averageScore >= 50) {
      tier = 'keep_pushing';
      badge = '⚡';
      headline = 'Good Effort — Push Harder!';
      subheadline = `Developing / Grade C–D Pace (${averageScore}% avg)`;
      message = `You cleared ${def.stageFocus}, well done for finishing — now push harder! At ${averageScore}%, there are gaps to close. Revisit any quizzes under 70% before moving on.`;
      accent = '#f59e0b';
      actionType = 'review';
    } else {
      tier = 'work_harder';
      badge = '🔥';
      headline = 'Work Harder! Tighten Your Mix';
      subheadline = `Needs Revision (${averageScore}% avg)`;
      message = `Work harder on ${def.stageFocus}! You completed the nodes, but ${averageScore}% is below exam standard. Re-run the practicals and study the examiner explanations before advancing.`;
      accent = '#ef4444';
      actionType = 'review';
    }
  }

  return {
    ...def,
    blockIdx,
    totalCount,
    completedCount,
    progressPct,
    isReached,
    averageScore,
    matchedScores,
    weakestNodeId,
    firstNodeId: blockNodes[0]?.id || null,
    tier,
    badge,
    headline,
    subheadline,
    message,
    accent,
    actionType
  };
}
