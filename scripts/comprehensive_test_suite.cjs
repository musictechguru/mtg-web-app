const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  suites: []
};

function runSuite(name, fn) {
  const suite = { name, tests: [], passed: true };
  console.log(`\n======================================================`);
  console.log(`RUNNING SUITE: ${name}`);
  console.log(`======================================================`);
  
  function assert(condition, message, details = null) {
    if (condition) {
      suite.tests.push({ status: 'PASS', message });
      console.log(`  ✓ PASS: ${message}`);
      results.passed++;
    } else {
      suite.tests.push({ status: 'FAIL', message, details });
      console.error(`  ✗ FAIL: ${message}`);
      if (details) console.error(`    Details:`, details);
      suite.passed = false;
      results.failed++;
    }
  }

  function warn(message, details = null) {
    suite.tests.push({ status: 'WARN', message, details });
    console.warn(`  ⚠ WARN: ${message}`);
    if (details) console.warn(`    Details:`, details);
    results.warnings++;
  }

  try {
    fn(assert, warn);
  } catch (err) {
    suite.passed = false;
    suite.tests.push({ status: 'ERROR', message: `Suite threw unexpected error: ${err.message}`, stack: err.stack });
    console.error(`  ✗ CRITICAL ERROR in suite:`, err);
    results.failed++;
  }

  results.suites.push(suite);
}

// -------------------------------------------------------------
// SUITE 1: DICTIONARY QUIZZES VALIDATION
// -------------------------------------------------------------
runSuite('Suite 1: Dictionary Quizzes (Volumes 1-10)', (assert, warn) => {
  const dictPath = path.join(rootDir, 'src/data/dictionary_quizzes.json');
  assert(fs.existsSync(dictPath), 'dictionary_quizzes.json exists');
  
  const data = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  assert(Array.isArray(data.volumes) && data.volumes.length === 10, `Has 10 volumes (Found: ${data.volumes?.length})`);

  let totalQuestions = 0;
  let invalidQuestions = 0;
  let missingCorrectAnswers = 0;
  let emptyAnswers = 0;
  let brokenImageRefs = 0;
  let crudeStubsFound = 0;

  data.volumes.forEach((vol, vIdx) => {
    vol.parts.forEach((part, pIdx) => {
      part.topics.forEach((topic, tIdx) => {
        ['basic', 'intermediate'].forEach(lvl => {
          const questions = topic.levels[lvl] || [];
          totalQuestions += questions.length;

          questions.forEach((q, qIdx) => {
            const qIdentifier = `Vol ${vIdx+1} -> ${topic.title} -> ${lvl} -> Q${qIdx+1}`;
            
            // Check content
            const content = q.content || q.question || q.prompt;
            if (!content || typeof content !== 'string' || content.trim().length === 0) {
              invalidQuestions++;
              warn(`Empty question prompt in ${qIdentifier}`);
            }

            // Check answers
            if (!Array.isArray(q.answers) || q.answers.length < 2) {
              invalidQuestions++;
              warn(`Insufficient answers in ${qIdentifier} (count: ${q.answers?.length})`);
            } else {
              const hasCorrect = q.answers.some(a => a.is_true === 'yes' || a.is_true === true || a.isCorrect === true);
              if (!hasCorrect) {
                missingCorrectAnswers++;
                warn(`No correct answer marked in ${qIdentifier}`);
              }
              const hasEmptyAnswer = q.answers.some(a => !a.text || typeof a.text !== 'string' || a.text.trim().length === 0);
              if (hasEmptyAnswer) {
                emptyAnswers++;
                warn(`Empty answer option in ${qIdentifier}`);
              }
            }

            // Check images
            const imgPath = (q.explanation_image && q.explanation_image.src) || (typeof q.explanation_image === 'string' ? q.explanation_image : null) || q.img;
            if (imgPath && typeof imgPath === 'string') {
              const clean = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
              const diskPath = path.join(rootDir, 'public', clean);
              if (!fs.existsSync(diskPath)) {
                brokenImageRefs++;
                warn(`Missing image on disk: "${imgPath}" in ${qIdentifier}`);
              } else if (clean.endsWith('.svg')) {
                const svgContent = fs.readFileSync(diskPath, 'utf8');
                if (svgContent.includes('Technical Diagram Placeholder') || svgContent.includes('.Svg</text>')) {
                  crudeStubsFound++;
                  warn(`Crude SVG placeholder used: "${imgPath}" in ${qIdentifier}`);
                }
              }
            }
          });
        });
      });
    });
  });

  assert(totalQuestions >= 2400, `Total dictionary questions >= 2,400 (Found: ${totalQuestions})`);
  assert(missingCorrectAnswers === 0, `All questions have a marked correct answer (Missing: ${missingCorrectAnswers})`);
  assert(emptyAnswers === 0, `No empty answer text options found (Empty: ${emptyAnswers})`);
  assert(brokenImageRefs === 0, `All referenced images exist on disk (Broken: ${brokenImageRefs})`);
  assert(crudeStubsFound === 0, `Zero crude SVG text stubs referenced in quizzes (Found: ${crudeStubsFound})`);

  // Spot-check v5_t3 and v5_t11
  const v5 = data.volumes[4];
  const t3 = v5.parts[0].topics[2]; // v5_t3
  const t11 = v5.parts[0].topics[10]; // v5_t11

  assert(t3.levels.basic.length === 10, `v5_t3 Basic has exactly 10 questions (Found: ${t3.levels.basic.length})`);
  assert(t3.levels.intermediate.length === 10, `v5_t3 Intermediate has exactly 10 questions (Found: ${t3.levels.intermediate.length})`);
  assert(t11.levels.basic.length === 10, `v5_t11 Basic has exactly 10 questions (Found: ${t11.levels.basic.length})`);
  assert(t11.levels.intermediate.length === 10, `v5_t11 Intermediate has exactly 10 questions (Found: ${t11.levels.intermediate.length})`);
});

// -------------------------------------------------------------
// SUITE 2: CAMPAIGN ROUTE & PROGRESSION TRAVERSAL
// -------------------------------------------------------------
runSuite('Suite 2: Campaign Route & Progression Graph', (assert, warn) => {
  const routePath = path.join(rootDir, 'src/data/campaign_route.json');
  assert(fs.existsSync(routePath), 'campaign_route.json exists');

  const campaign = JSON.parse(fs.readFileSync(routePath, 'utf8'));
  const dictData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/dictionary_quizzes.json'), 'utf8'));
  const courseData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/course_data.json'), 'utf8'));

  assert(Array.isArray(campaign.rounds) && campaign.rounds.length >= 15, `Campaign has 16 stages (Found: ${campaign.rounds.length})`);

  let totalNodes = 0;
  let unresolvableNodes = 0;
  const nodeIds = new Set();
  let duplicateNodeIds = 0;

  campaign.rounds.forEach((round, rIdx) => {
    round.nodes.forEach((node, nIdx) => {
      totalNodes++;
      if (nodeIds.has(node.id)) {
        duplicateNodeIds++;
        warn(`Duplicate node ID: ${node.id}`);
      }
      nodeIds.add(node.id);

      // Verify node resolves to executable content
      let resolved = false;
      if (node.type === 'course') {
        courseData.sections.forEach(s => {
          s.items.forEach(item => {
            if (item.id === node.quizId || item.title === node.title) resolved = true;
          });
        });
      } else if (node.type === 'dictionary') {
        dictData.volumes.forEach(v => {
          v.parts.forEach(p => {
            p.topics.forEach(t => {
              if (t.id === node.topicId && t.levels[node.level]) resolved = true;
            });
          });
        });
      } else if (node.type === 'exam' || node.type === 'roulette') {
        resolved = true;
      }

      if (!resolved) {
        unresolvableNodes++;
        warn(`Node cannot be resolved: ${node.id} (${node.title}) in round "${round.title}"`);
      }
    });
  });

  assert(duplicateNodeIds === 0, `All node IDs are unique (Duplicates: ${duplicateNodeIds})`);
  assert(totalNodes === 72, `Total campaign nodes = 72 (Found: ${totalNodes})`);
  assert(unresolvableNodes === 0, `All campaign nodes resolve to valid playable quizzes/lessons (Unresolvable: ${unresolvableNodes})`);

  // Verify Round 5 specifically
  const round5 = campaign.rounds.find(r => r.title === 'Round 5: Dynamic Processing');
  assert(Boolean(round5), 'Round 5: Dynamic Processing found');
  const nC4_1 = round5?.nodes.find(n => n.id === 'node_c4_1');
  const nC4_2 = round5?.nodes.find(n => n.id === 'node_c4_2');
  const nC4_3 = round5?.nodes.find(n => n.id === 'node_c4_3');

  assert(nC4_1?.type === 'dictionary' && nC4_1?.topicId === 'v5_t11', 'node_c4_1 is Dictionary Quiz: Parallel Compression');
  assert(nC4_2?.type === 'dictionary' && nC4_2?.topicId === 'v5_t12', 'node_c4_2 is Dictionary Quiz: Advanced Dynamics');
  assert(Boolean(nC4_3), 'node_c4_3 exists in Round 5');

  // Verify Roulette Round node_69
  const rouletteRound = campaign.rounds.find(r => r.title.includes('Roulette'));
  const n69 = rouletteRound?.nodes.find(n => n.id === 'node_69');
  assert(Boolean(n69) && n69.type === 'roulette', 'node_69 is configured as Russian Roulette Mega Quiz');
});

// -------------------------------------------------------------
// SUITE 3: PRACTICAL QUIZZES & BATCH EXPANSIONS (1-24)
// -------------------------------------------------------------
runSuite('Suite 3: Practical Quizzes (Parts 2 & 3 Expansions)', (assert, warn) => {
  const coursePath = path.join(rootDir, 'src/data/course_data.json');
  const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

  const allItems = courseData.sections.flatMap(s => s.items);

  // Practical Quiz 20: Sample Chopping
  const pq20 = allItems.find(i => i.id === 'quiz-topic-39' || i.title.includes('Sample Editing, Truncation'));
  assert(Boolean(pq20), 'Practical Quiz 20 (Sample Chopping) registered');
  assert(pq20?.type === 'sample_chopping_quiz', 'Practical Quiz 20 type is "sample_chopping_quiz"');

  // Practical Quiz 21: Panning Quiz
  const pq21 = allItems.find(i => i.id === 'quiz-topic-40' || i.title.includes('Stereo Panning'));
  assert(Boolean(pq21), 'Practical Quiz 21 (Stereo Panning) registered');
  assert(Array.isArray(pq21?.questions) && pq21.questions.length === 10, `Practical Quiz 21 has 10 questions (Found: ${pq21?.questions?.length})`);

  // Practical Quiz 22: Signal Flow Labelling
  const pq22 = allItems.find(i => i.id === 'quiz-topic-41' || i.title.includes('Signal Flow Labelling'));
  assert(Boolean(pq22), 'Practical Quiz 22 (Signal Flow Labelling) registered');
  assert(Array.isArray(pq22?.questions) && pq22.questions.length === 10, `Practical Quiz 22 has 10 questions (Found: ${pq22?.questions?.length})`);

  // Practical Quiz 2: Signal Flow Challenge Expansion
  const pq2 = allItems.find(i => i.id === 'quiz-topic-21');
  assert(Array.isArray(pq2?.questions) && pq2.questions.length === 10, `Practical Quiz 2 expanded to 10 questions (Found: ${pq2?.questions?.length})`);

  // Practical Quiz 3: Subtractive Synthesis Flow Expansion
  const pq3 = allItems.find(i => i.id === 'quiz-topic-22');
  assert(Array.isArray(pq3?.questions) && pq3.questions.length === 10, `Practical Quiz 3 expanded to 10 questions (Found: ${pq3?.questions?.length})`);

  // Practical Quiz 23: Studio Maths & Audio Calculations
  const pq23 = allItems.find(i => i.id === 'quiz-topic-42' || i.title.includes('Studio Maths'));
  assert(Boolean(pq23), 'Practical Quiz 23 (Studio Maths) registered');
  assert(Array.isArray(pq23?.questions) && pq23.questions.length === 12, `Practical Quiz 23 has 12 calculation questions (Found: ${pq23?.questions?.length})`);

  // Practical Quiz 13: Staff Notation to Piano Roll
  const pq13 = allItems.find(i => i.id === 'quiz-topic-32');
  assert(Array.isArray(pq13?.questions) && pq13.questions.length >= 8, `Practical Quiz 13 expanded with staff notation (Count: ${pq13?.questions?.length})`);

  // Practical Quiz 24: Audio Fault Diagnosis & Restoration
  const pq24 = allItems.find(i => i.id === 'quiz-topic-43' || i.title.includes('Audio Fault Diagnosis'));
  assert(Boolean(pq24), 'Practical Quiz 24 (Audio Fault Diagnosis) registered');
  assert(Array.isArray(pq24?.questions) && pq24.questions.length === 12, `Practical Quiz 24 has 12 diagnostic questions (Found: ${pq24?.questions?.length})`);

  // Thin Quiz Expansions: PQ 5 (EQ), PQ 6 (Waveforms), PQ 11 (Binary & MIDI)
  const pq5 = allItems.find(i => i.id === 'quiz-topic-24');
  assert(Array.isArray(pq5?.questions) && pq5.questions.length === 12, `Practical Quiz 5 expanded to 12 questions (Found: ${pq5?.questions?.length})`);

  const pq6 = allItems.find(i => i.id === 'quiz-topic-25');
  assert(Array.isArray(pq6?.questions) && pq6.questions.length === 10, `Practical Quiz 6 expanded to 10 questions (Found: ${pq6?.questions?.length})`);

  const pq11 = allItems.find(i => i.id === 'quiz-topic-30');
  assert(Array.isArray(pq11?.questions) && pq11.questions.length === 10, `Practical Quiz 11 expanded to 10 questions (Found: ${pq11?.questions?.length})`);

  // Newly Expanded Quizzes: PQ1, PQ4, PQ19
  const pq1 = allItems.find(i => i.id === 'quiz-topic-11');
  assert(Array.isArray(pq1?.questions) && pq1.questions.length === 10, `Practical Quiz 1 expanded to 10 questions (Found: ${pq1?.questions?.length})`);

  const pq4 = allItems.find(i => i.id === 'quiz-topic-23');
  assert(Array.isArray(pq4?.questions) && pq4.questions.length === 10, `Practical Quiz 4 expanded to 10 questions (Found: ${pq4?.questions?.length})`);

  const pq19 = allItems.find(i => i.id === 'quiz-topic-38');
  assert(Array.isArray(pq19?.questions) && pq19.questions.length === 10, `Practical Quiz 19 expanded to 10 questions (Found: ${pq19?.questions?.length})`);

  // New High-Yield Practical Quizzes: PQ25 - PQ28
  const pq25 = allItems.find(i => i.id === 'quiz-topic-44');
  assert(Boolean(pq25), 'Practical Quiz 25 (Dynamic Processing) registered');
  assert(Array.isArray(pq25?.questions) && pq25.questions.length === 12, `Practical Quiz 25 has 12 questions (Found: ${pq25?.questions?.length})`);

  const pq26 = allItems.find(i => i.id === 'quiz-topic-45');
  assert(Boolean(pq26), 'Practical Quiz 26 (Frequency Spectrum & EQ Pocketing) registered');
  assert(Array.isArray(pq26?.questions) && pq26.questions.length === 12, `Practical Quiz 26 has 12 questions (Found: ${pq26?.questions?.length})`);

  const pq27 = allItems.find(i => i.id === 'quiz-topic-46');
  assert(Boolean(pq27), 'Practical Quiz 27 (Phase Alignment & Polarities) registered');
  assert(Array.isArray(pq27?.questions) && pq27.questions.length === 12, `Practical Quiz 27 has 12 questions (Found: ${pq27?.questions?.length})`);

  const pq28 = allItems.find(i => i.id === 'quiz-topic-47');
  assert(Boolean(pq28), 'Practical Quiz 28 (DAW Automation & MIDI CC) registered');
  assert(Array.isArray(pq28?.questions) && pq28.questions.length === 12, `Practical Quiz 28 has 12 questions (Found: ${pq28?.questions?.length})`);
});

// -------------------------------------------------------------
// SUITE 4: COMPONENT FILES, EXPORTS & VITE BUILD COMPATIBILITY
// -------------------------------------------------------------
runSuite('Suite 4: Components & UI Engines Architecture', (assert, warn) => {
  const componentPaths = [
    'src/components/CampaignMap.jsx',
    'src/components/QuizPlayer.jsx',
    'src/components/LessonViewer.jsx',
    'src/components/InteractiveQuizzes/SampleChoppingQuiz.jsx',
    'src/components/InteractiveQuizzes/PanningQuiz.jsx',
    'src/components/InteractiveQuizzes/SignalFlowLabelQuiz.jsx',
    'src/contexts/UserContext.jsx',
    'src/App.jsx'
  ];

  componentPaths.forEach(relPath => {
    const full = path.join(rootDir, relPath);
    assert(fs.existsSync(full), `${relPath} exists`);
    const content = fs.readFileSync(full, 'utf8');
    assert(content.length > 500, `${relPath} has substantial code content (${content.length} chars)`);
  });

  // Verify App.jsx routes for top-level interactive views and QuizPlayer/LessonViewer
  const appContent = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf8');
  assert(appContent.includes('SampleChoppingQuiz'), 'App.jsx imports & routes SampleChoppingQuiz');
  assert(appContent.includes('LessonViewer'), 'App.jsx renders LessonViewer');
  assert(appContent.includes('QuizPlayer'), 'App.jsx renders QuizPlayer');

  // Verify QuizPlayer renders sub-quiz interactive engines
  const quizPlayerContent = fs.readFileSync(path.join(rootDir, 'src/components/QuizPlayer.jsx'), 'utf8');
  assert(quizPlayerContent.includes('PanningQuiz'), 'QuizPlayer imports & renders PanningQuiz');
  assert(quizPlayerContent.includes('SignalFlowLabelQuiz'), 'QuizPlayer imports & renders SignalFlowLabelQuiz');

  // Verify Dev Mode in CampaignMap
  const campContent = fs.readFileSync(path.join(rootDir, 'src/components/CampaignMap.jsx'), 'utf8');
  assert(campContent.includes('devMode') && campContent.includes('toggleDevMode'), 'CampaignMap has devMode state and toggle');
  assert(campContent.includes('Shift + D'), 'CampaignMap has Shift+D shortcut support');
  assert(campContent.includes('unlockUpToRound5'), 'CampaignMap has Fast-Forward to Round 5 helper');
});

// -------------------------------------------------------------
// SUITE 5: EXTENDED WRITING WORKSHOPS & SONIC FINGERPRINTS (PART 4)
// -------------------------------------------------------------
runSuite('Suite 5: Essay Workshops & Sonic Fingerprints (Part 4)', (assert, warn) => {
  const coursePath = path.join(rootDir, 'src/data/course_data.json');
  const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
  const allItems = courseData.sections.flatMap(s => s.items);

  // Check Worksheet Activities registered
  const wQ5 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q5');
  assert(Boolean(wQ5), 'Worksheet Activity Q5 (worksheet-ao3-ao4-q5) registered in course_data.json');
  assert(wQ5?.type === 'lp_activity', 'Worksheet Activity Q5 is type "lp_activity"');
  assert(Array.isArray(wQ5?.tracks) && wQ5.tracks.length === 3, `Worksheet Q5 has 3 comparison tracks (Found: ${wQ5?.tracks?.length})`);
  assert(wQ5?.tracks.every(t => Array.isArray(t.questions) && t.questions.length === 5 && Boolean(t.exemplar)), 'All Q5 tracks have 5 questions and full mark scheme exemplars');

  const wQ6 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q6');
  assert(Boolean(wQ6), 'Worksheet Activity Q6 (worksheet-ao3-ao4-q6) registered in course_data.json');
  assert(wQ6?.type === 'lp_activity', 'Worksheet Activity Q6 is type "lp_activity"');
  assert(Array.isArray(wQ6?.tracks) && wQ6.tracks.length === 3, `Worksheet Q6 has 3 extended evaluation tracks (Found: ${wQ6?.tracks?.length})`);
  assert(wQ6?.tracks.every(t => Array.isArray(t.questions) && t.questions.length === 5 && Boolean(t.exemplar)), 'All Q6 tracks have 5 questions and full mark scheme exemplars');

  // Check WorksheetPlayer component & embedded video players
  const wsPlayerContent = fs.readFileSync(path.join(rootDir, 'src/components/WorksheetPlayer.jsx'), 'utf8');
  assert(wsPlayerContent.includes('useUser') && wsPlayerContent.includes('saveQuizResult'), 'WorksheetPlayer integrates useUser and calls saveQuizResult');
  assert(wsPlayerContent.includes('calculateMaxScore'), 'WorksheetPlayer calculates dynamic maxScore for grading');
  assert(wsPlayerContent.includes('iframe') && wsPlayerContent.includes('worksheet-video-grid'), 'WorksheetPlayer embeds responsive YouTube iframes in worksheet-video-grid');
  assert(wQ5?.tracks.every(t => Boolean(t.videoId) && Boolean(t.videoId2)), 'All Q5 comparison tracks have both Version A (videoId) and Version B (videoId2) YouTube IDs');
  assert(wQ6?.tracks.every(t => Boolean(t.videoId)), 'All Q6 evaluation tracks have embedded YouTube documentary video IDs');

  // Check Sonic Fingerprints Data
  const fpPath = path.join(rootDir, 'src/data/fingerprints_data.json');
  const fpData = JSON.parse(fs.readFileSync(fpPath, 'utf8'));
  assert(Array.isArray(fpData.songs) && fpData.songs.length >= 9, `Sonic Fingerprints has at least 9 songs (Found: ${fpData.songs?.length})`);

  const billieJean = fpData.songs.find(s => s.id === 'song_1980s_mj');
  assert(Boolean(billieJean) && billieJean.criteria.length === 6, `Billie Jean expanded to 6 full criteria (Found: ${billieJean?.criteria?.length})`);

  const dubSong = fpData.songs.find(s => s.id === 'song_1970s_reggae_dub');
  assert(Boolean(dubSong) && dubSong.criteria.length === 6, 'King Tubby Reggae Dub registered with 6 full criteria');

  const synthPop = fpData.songs.find(s => s.id === 'song_1980s_synthpop');
  assert(Boolean(synthPop) && synthPop.criteria.length === 6, 'New Order Blue Monday (1980s Synth-Pop) registered with 6 full criteria');

  const edmPop = fpData.songs.find(s => s.id === 'song_2010s_edm_pop');
  assert(Boolean(edmPop) && edmPop.criteria.length === 6, 'Chainsmokers Closer (2010s EDM/Pop) registered with 6 full criteria');

  // Verify all criteria across all songs have valid answers
  let invalidAnswers = 0;
  fpData.songs.forEach(s => {
    s.criteria.forEach(c => {
      if (!Array.isArray(c.answers) || c.answers.length < 5) invalidAnswers++;
      c.answers?.forEach(a => {
        if (!a.text || typeof a.isTrue !== 'boolean') invalidAnswers++;
      });
    });
  });
  assert(invalidAnswers === 0, `All Sonic Fingerprints criteria answers are structurally valid (Invalid: ${invalidAnswers})`);

  // Check FingerprintsQuizPlayer persistence
  const fpPlayerContent = fs.readFileSync(path.join(rootDir, 'src/components/FingerprintsQuiz/FingerprintsQuizPlayer.jsx'), 'utf8');
  assert(fpPlayerContent.includes('useUser') && fpPlayerContent.includes('saveQuizResult'), 'FingerprintsQuizPlayer integrates useUser and calls saveQuizResult');

  // Check App.jsx and Dashboard.jsx navigation surfacing
  const appContent = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf8');
  assert(appContent.includes("lp_fingerprints") && appContent.includes("Sonic Fingerprints"), 'App.jsx sidebar surfaces Sonic Fingerprints');

  const dashContent = fs.readFileSync(path.join(rootDir, 'src/components/Dashboard.jsx'), 'utf8');
  assert(dashContent.includes("lp_fingerprints") && dashContent.includes("Sonic Fingerprints: Production Analysis"), 'Dashboard.jsx surfaces Sonic Fingerprints laboratory banner');
});

// -------------------------------------------------------------
// SUITE 6: STAGE 4 COMPARISON QUIZZES & PAST PAPERS (PART 5)
// -------------------------------------------------------------
runSuite('Suite 6: Stage 4 Comparison Quizzes & Past Papers (Part 5)', (assert, warn) => {
  const courseData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/course_data.json'), 'utf8'));
  const stage4 = courseData.sections.find(s => s.title && s.title.includes('Stage 4: Comparison'));

  assert(Boolean(stage4), 'Stage 4: Comparison Quizzes section exists in course_data.json');
  assert(Array.isArray(stage4?.items) && stage4.items.length === 15, `Stage 4 has exactly 15 comparison quizzes (Found: ${stage4?.items?.length})`);

  // Verify Comparisons 1-6 (Core Comparisons)
  for (let i = 1; i <= 6; i++) {
    const comp = stage4?.items[i - 1];
    assert(comp && comp.questions && comp.questions.length === 15, `Comparison ${i} (${comp?.id}) has 15 structured criteria questions`);
  }

  // Verify Comparisons 7, 8, 9 (Upgraded from 1 question to 16 questions)
  const comp7 = stage4?.items.find(i => i.id === 'comp_blue_monday');
  assert(Boolean(comp7) && comp7.questions.length === 16, `Comparison 7 (Blue Monday) upgraded to 16 questions (15 criteria MCQs + 1 cloze summary)`);

  const comp8 = stage4?.items.find(i => i.id === 'comp_smooth_criminal');
  assert(Boolean(comp8) && comp8.questions.length === 16, `Comparison 8 (Smooth Criminal) upgraded to 16 questions (15 criteria MCQs + 1 cloze summary)`);

  const comp9 = stage4?.items.find(i => i.id === 'comp_word_up');
  assert(Boolean(comp9) && comp9.questions.length === 16, `Comparison 9 (Word Up!) upgraded to 16 questions (15 criteria MCQs + 1 cloze summary)`);

  // Verify Comparisons 10-12 (Official 2022, 2023, 2024 Exam Papers)
  const comp10 = stage4?.items.find(i => i.id === 'comp_comfortably_numb');
  assert(Boolean(comp10) && comp10.questions.length === 16, `Comparison 10 (Comfortably Numb - 2022 Paper) registered with 16 questions`);

  const comp11 = stage4?.items.find(i => i.id === 'comp_jump');
  assert(Boolean(comp11) && comp11.questions.length === 16, `Comparison 11 (Jump - 2023 Paper) registered with 16 questions`);

  const comp12 = stage4?.items.find(i => i.id === 'comp_africa');
  assert(Boolean(comp12) && comp12.questions.length === 16, `Comparison 12 (Africa - 2024 Paper) registered with 16 questions`);

  // Verify Comparisons 13-15 (Predicted 2026, 2027, 2028 Papers)
  const comp13 = stage4?.items.find(i => i.id === 'comp_a_day_in_the_life');
  assert(Boolean(comp13) && comp13.questions.length === 16, `Comparison 13 (A Day in the Life - 2026 Prediction) registered with 16 questions`);

  const comp14 = stage4?.items.find(i => i.id === 'comp_superstition');
  assert(Boolean(comp14) && comp14.questions.length === 16, `Comparison 14 (Superstition - 2027 Prediction) registered with 16 questions`);

  const comp15 = stage4?.items.find(i => i.id === 'comp_running_up_that_hill');
  assert(Boolean(comp15) && comp15.questions.length === 16, `Comparison 15 (Running Up That Hill - 2028 Prediction) registered with 16 questions`);

  // Verify total question volume and structural validity across Stage 4
  let totalCompQuestions = 0;
  let brokenImages = 0;
  let missingCorrectAnswers = 0;
  let formulaGiveaways = 0;

  stage4.items.forEach(comp => {
    totalCompQuestions += comp.questions.length;
    comp.questions.forEach((q, qidx) => {
      // Check images
      const checkImg = (imgUrl) => {
        if (!imgUrl || imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return;
        const clean = imgUrl.split('?')[0].replace(/^\//, '');
        if (!fs.existsSync(path.join(rootDir, 'public', clean))) {
          brokenImages++;
        }
      };
      if (q.img) checkImg(q.img);
      if (q.explanation_image?.src) checkImg(q.explanation_image.src);

      // Check answers
      if (q.type === 'multi_choice') {
        const hasCorrect = q.answers?.some(a => a.is_true === 'yes' || a.is_true === true);
        if (!hasCorrect) missingCorrectAnswers++;

        q.answers?.forEach(a => {
          const txt = a.text || '';
          if (txt.toLowerCase().includes('formula:') || txt.toLowerCase().includes('(correct)')) {
            formulaGiveaways++;
          }
        });
      } else if (q.type === 'cloze') {
        if (!Array.isArray(q.answer) || !Array.isArray(q.options) || q.answer.length !== q.options.length) {
          missingCorrectAnswers++;
        }
      }
    });
  });

  assert(totalCompQuestions === 234, `Total Stage 4 questions = 234 (Found: ${totalCompQuestions})`);
  assert(brokenImages === 0, `All images referenced in Stage 4 exist on disk (Broken: ${brokenImages})`);
  assert(missingCorrectAnswers === 0, `All Stage 4 questions have valid answers (Missing: ${missingCorrectAnswers})`);
  assert(formulaGiveaways === 0, `Zero formula giveaways in Stage 4 options (Found: ${formulaGiveaways})`);

  // Verify generated SVGs exist
  const svgDir = path.join(rootDir, 'public/images/comparisons');
  const expectedSvgs = [
    'comfortably_numb_comparison.svg',
    'jump_comparison.svg',
    'africa_comparison.svg',
    'a_day_in_the_life_comparison.svg',
    'superstition_comparison.svg',
    'running_up_that_hill_comparison.svg'
  ];
  expectedSvgs.forEach(svg => {
    assert(fs.existsSync(path.join(svgDir, svg)), `Comparison SVG ${svg} exists on disk`);
  });
});

// -------------------------------------------------------------
// SUITE 7: Stage 5 (Case Studies) & Stage 6 (Historical Context) Expansion
// -------------------------------------------------------------
runSuite('Suite 7: Stage 5 (Case Studies) & Stage 6 (Historical Context) Expansion', (assert, warn) => {
  const courseData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/course_data.json'), 'utf8'));
  const campaignRoute = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/campaign_route.json'), 'utf8'));

  const stage5 = courseData.sections[5];
  const stage6 = courseData.sections[6];

  // Stage 6 Validations
  assert(Boolean(stage6) && stage6.title.includes('Stage 6'), 'Stage 6: Historical Music Tech section exists in course_data.json');
  assert(stage6.items?.length === 10, `Stage 6 has exactly 10 items (Found: ${stage6.items?.length})`);

  const h0 = stage6.items?.find(it => it.id === 'quiz-history-0');
  assert(Boolean(h0) && h0.questions.length === 10, 'quiz-history-0 (1950s Mono & Early Tape) registered with 10 questions');

  const h6 = stage6.items?.find(it => it.id === 'quiz-history-6');
  assert(Boolean(h6) && h6.questions.length === 10, 'quiz-history-6 (Motown, Soul & Dub) registered with 10 questions');

  const h7 = stage6.items?.find(it => it.id === 'quiz-history-7');
  assert(Boolean(h7) && h7.questions.length === 10, 'quiz-history-7 (2010s Modern ITB & Streaming) registered with 10 questions');

  const h8 = stage6.items?.find(it => it.id === 'quiz-history-8');
  assert(Boolean(h8) && h8.questions.length === 10, 'quiz-history-8 (Evolution of Synthesis & Samplers) registered with 10 questions');

  // Verify option length balance & position distribution on new historical quizzes
  let maxHistoryOptionDiff = 0;
  [h0, h6, h7, h8].forEach(quiz => {
    const posCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    quiz.questions.forEach(q => {
      const lengths = q.answers.map(a => a.text.length);
      const diff = Math.max(...lengths) - Math.min(...lengths);
      if (diff > maxHistoryOptionDiff) maxHistoryOptionDiff = diff;
      const cIdx = q.answers.findIndex(a => a.is_true === 'yes');
      posCounts[cIdx] = (posCounts[cIdx] || 0) + 1;
    });
    // Check balanced positions
    const hasZeroPos = Object.values(posCounts).some(c => c === 0);
    assert(!hasZeroPos, `${quiz.id} has distributed answers across all positions A, B, C, D`);
  });
  assert(maxHistoryOptionDiff <= 15, `Strict option length balance across new Stage 6 quizzes (Max diff: ${maxHistoryOptionDiff} chars)`);

  // Stage 5 Validations
  assert(Boolean(stage5) && stage5.title.includes('Stage 5'), 'Stage 5: Case Studies section exists in course_data.json');
  assert(stage5.items?.length === 9, `Stage 5 has exactly 9 case studies (Found: ${stage5.items?.length})`);

  const csSuperstition = stage5.items?.find(it => it.id === 'case_superstition');
  assert(Boolean(csSuperstition) && csSuperstition.questions.length === 20, 'case_superstition (Stevie Wonder 1972) registered with 20 questions');

  const csDub = stage5.items?.find(it => it.id === 'case_dub_reggae');
  assert(Boolean(csDub) && csDub.questions.length === 20, 'case_dub_reggae (King Tubby 1974) registered with 20 questions');

  const csBadGuy = stage5.items?.find(it => it.id === 'case_bad_guy');
  assert(Boolean(csBadGuy) && csBadGuy.questions.length === 20, 'case_bad_guy (Billie Eilish 2019) registered with 20 questions');

  // Verify 10 True / 10 False balance across all 3 new case studies
  [csSuperstition, csDub, csBadGuy].forEach(cs => {
    let trueCount = 0;
    let falseCount = 0;
    cs.questions.forEach(q => {
      const isTrue = q.answers.find(a => a.text === 'True' && (a.is_true === 'yes' || a.is_true === true));
      if (isTrue) trueCount++;
      else falseCount++;
    });
    assert(trueCount === 10 && falseCount === 10, `${cs.id} has calibrated 10 True / 10 False balance (Found: ${trueCount}T / ${falseCount}F)`);
    assert(Boolean(cs.youtube_id), `${cs.id} has embedded YouTube media ID (${cs.youtube_id})`);
  });

  // Verify images on disk across Stage 5 and Stage 6
  let stage56BrokenImages = 0;
  const checkImg = (imgUrl) => {
    if (!imgUrl || imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return;
    const clean = imgUrl.split('?')[0].replace(/^\//, '');
    if (!fs.existsSync(path.join(rootDir, 'public', clean))) {
      stage56BrokenImages++;
    }
  };

  [...stage5.items, ...stage6.items].forEach(item => {
    item.questions.forEach(q => {
      if (q.img) checkImg(q.img);
      if (q.explanation_image?.src) checkImg(q.explanation_image.src);
    });
  });
  assert(stage56BrokenImages === 0, `All images in Stage 5 and Stage 6 exist on disk (Broken: ${stage56BrokenImages})`);

  // Campaign Route De-Duplication Verification
  const campaignQuizIdCounts = {};
  campaignRoute.rounds.forEach(r => {
    r.nodes.forEach(n => {
      if (n.quizId && n.quizId !== 'none') {
        campaignQuizIdCounts[n.quizId] = (campaignQuizIdCounts[n.quizId] || 0) + 1;
      }
    });
  });

  let duplicateCampaignQuizzes = 0;
  Object.entries(campaignQuizIdCounts).forEach(([qid, count]) => {
    if (count > 1) duplicateCampaignQuizzes++;
  });
  assert(duplicateCampaignQuizzes === 0, `Campaign Map has zero duplicate quizIds across all rounds (Duplicates: ${duplicateCampaignQuizzes})`);

  // Verify node specific routings
  const allNodes = campaignRoute.rounds.flatMap(r => r.nodes);
  const n7 = allNodes.find(n => n.id === 'node_7');
  assert(n7?.quizId === 'quiz-history-0', `node_7 routed to quiz-history-0 (1950s Mono)`);

  const n50 = allNodes.find(n => n.id === 'node_50');
  assert(n50?.quizId === 'quiz-history-6', `node_50 routed to quiz-history-6 (Motown & Dub)`);

  const n55 = allNodes.find(n => n.id === 'node_55');
  assert(n55?.quizId === 'quiz-history-7', `node_55 routed to quiz-history-7 (2010s ITB & Streaming)`);

  const n61 = allNodes.find(n => n.id === 'node_61');
  assert(n61?.quizId === 'quiz-timeline-1', `node_61 routed to quiz-timeline-1 (Historical Timeline)`);

  const n67 = allNodes.find(n => n.id === 'node_67');
  assert(n67?.quizId === 'quiz-history-8', `node_67 routed to quiz-history-8 (Evolution of Synths & Samplers)`);
});

// -------------------------------------------------------------
// SUITE 8: Component 4 Learning Modules Rollout (All 10 Topics)
// -------------------------------------------------------------
runSuite('Suite 8: Component 4 Learning Modules Rollout (All 10 Topics)', (assert, warn) => {
  const courseData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/course_data.json'), 'utf8'));
  const campaignRoute = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/campaign_route.json'), 'utf8'));

  const stage9 = courseData.sections[9];
  assert(Boolean(stage9) && stage9.title.includes('Component 4'), 'Stage 9: Component 4 section exists in course_data.json');
  assert(stage9.items?.length === 30, `Stage 9 has exactly 30 items (Found: ${stage9.items?.length})`);

  const expectedTopics = [
    { prefix: 'c4_fundamentals', name: 'Fundamentals & Recording' },
    { prefix: 'c4_microphones', name: 'Microphones & Vocal Production' },
    { prefix: 'c4_synthesis', name: 'Synthesis Sound Design' },
    { prefix: 'c4_sampling', name: 'Sampling & MIDI' },
    { prefix: 'c4_sidechain', name: 'Dynamic Processing / Sidechain' },
    { prefix: 'c4_eq_stereo', name: 'EQ & Stereo Spatial Shaping' },
    { prefix: 'c4_fx_processors', name: 'FX & Processors' },
    { prefix: 'c4_mastering', name: 'Mastering & Loudness' },
    { prefix: 'c4_acoustics', name: 'Acoustics & Studio Environment' },
    { prefix: 'c4_equipment', name: 'Equipment & Signal Chains' }
  ];

  let totalC4Questions = 0;
  let maxOptionDiff = 0;
  let c4BrokenImages = 0;

  expectedTopics.forEach(top => {
    // Check Lesson
    const lesson = stage9.items.find(it => it.id === `${top.prefix}_lesson` && it.type === 'lesson');
    assert(Boolean(lesson) && lesson.content?.length > 100, `C4 Lesson ${top.name} exists with rich explanatory content`);

    // Check Task
    const task = stage9.items.find(it => it.id === `${top.prefix}_task` && it.type === 'lesson');
    assert(Boolean(task) && task.content?.includes('Marking Criteria') && task.content?.includes('Level 3'), `C4 Practical Task ${top.name} exists with Levels-Based Edexcel marking criteria`);

    // Check Quiz
    const quiz = stage9.items.find(it => it.id === `${top.prefix}_quiz` && it.type === 'lp_quiz');
    assert(Boolean(quiz) && quiz.questions?.length === 5, `C4 Knowledge Check Quiz ${top.name} registered with 5 questions`);

    if (quiz) {
      totalC4Questions += quiz.questions.length;
      const posCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };

      quiz.questions.forEach(q => {
        const lengths = q.answers.map(a => a.text.length);
        const diff = Math.max(...lengths) - Math.min(...lengths);
        if (diff > maxOptionDiff) maxOptionDiff = diff;
        const cIdx = q.answers.findIndex(a => a.is_true === 'yes');
        posCounts[cIdx] = (posCounts[cIdx] || 0) + 1;

        if (q.explanation_image?.src) {
          const clean = q.explanation_image.src.replace(/^\//, '');
          if (!fs.existsSync(path.join(rootDir, 'public', clean))) {
            c4BrokenImages++;
          }
        }
      });

      // Assert distributed positions
      const zeroPositions = Object.values(posCounts).filter(c => c === 0).length;
      assert(zeroPositions <= 1, `${top.prefix}_quiz has well-distributed answer positions (0: ${posCounts[0]}, 1: ${posCounts[1]}, 2: ${posCounts[2]}, 3: ${posCounts[3]})`);
    }
  });

  assert(totalC4Questions === 50, `Total Component 4 Knowledge Check questions = 50 (Found: ${totalC4Questions})`);
  assert(maxOptionDiff <= 15, `Strict option length balance across all C4 quizzes (Max diff: ${maxOptionDiff} chars)`);
  assert(c4BrokenImages === 0, `All images referenced in C4 quizzes exist on disk (Broken: ${c4BrokenImages})`);

  // Verify Campaign Map integration of c4_sidechain_quiz
  const round5 = campaignRoute.rounds.find(r => r.title?.includes('Dynamic Processing'));
  const nodeC4_3 = round5?.nodes?.find(n => n.id === 'node_c4_3');
  assert(nodeC4_3?.quizId === 'c4_sidechain_quiz', `Campaign Map node_c4_3 links cleanly to c4_sidechain_quiz`);
});

// -------------------------------------------------------------
// SUITE 9: MOCK EXAMS CALIBRATION, AUDIO ASSETS & 16-BLOCK TIMETABLE SYNC
// -------------------------------------------------------------
runSuite('Suite 9: Mock Exams Calibration, Audio Assets & 16-Block Timetable Sync', (assert, warn) => {
  // 1. Component 3 Exam Mark Calibrations
  const c3Exams = [
    { file: 'component3_funk_exam.json', name: 'Funk' },
    { file: 'component3_heavyrock_exam.json', name: 'Heavy Rock' },
    { file: 'component3_reggae_exam.json', name: 'Reggae' },
    { file: 'component3_soul_exam.json', name: 'Soul' },
    { file: 'component3_synthpop_exam.json', name: 'Synth-Pop' }
  ];

  c3Exams.forEach(e => {
    const p = path.join(rootDir, 'src/data', e.file);
    assert(fs.existsSync(p), `C3 Exam file exists: ${e.file}`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));

    assert(data.totalMarks === 75, `C3 ${e.name} totalMarks is exactly 75 (Found: ${data.totalMarks})`);

    const secA = data.sections?.find(s => s.id === 'A');
    const secB = data.sections?.find(s => s.id === 'B');
    assert(Boolean(secA) && Boolean(secB), `C3 ${e.name} has Section A and Section B`);

    const secASum = secA ? secA.questions.reduce((sum, q) => sum + (q.totalMarks || 0), 0) : 0;
    const secBSum = secB ? secB.questions.reduce((sum, q) => sum + (q.totalMarks || 0), 0) : 0;
    assert(secASum === 40, `C3 ${e.name} Section A = 40 marks (Found: ${secASum})`);
    assert(secBSum === 35, `C3 ${e.name} Section B = 35 marks (Found: ${secBSum})`);

    // Verify Q5 = 15, Q6 = 20
    const q5 = secB?.questions?.find(q => q.id === 'q5');
    const q6 = secB?.questions?.find(q => q.id === 'q6');
    assert(q5?.totalMarks === 15, `C3 ${e.name} Q5 = 15 marks (Found: ${q5?.totalMarks})`);
    assert(q6?.totalMarks === 20, `C3 ${e.name} Q6 = 20 marks (Found: ${q6?.totalMarks})`);

    // Verify all question parts sum to question totalMarks
    let partsMismatch = 0;
    data.sections.forEach(s => {
      s.questions.forEach(q => {
        const pSum = (q.parts || []).reduce((acc, p) => acc + (p.marks || 0), 0);
        if (pSum !== q.totalMarks) partsMismatch++;
      });
    });
    assert(partsMismatch === 0, `C3 ${e.name} all question totalMarks match sum of part marks (Mismatches: ${partsMismatch})`);
  });

  // 2. Component 4 Exam Mark Calibrations
  const c4Exams = [
    { file: 'component4_edm_exam.json', name: 'EDM' },
    { file: 'component4_spop_exam.json', name: 'Synth-Pop' },
    { file: 'component4_template_exam.json', name: 'Rock / Template' }
  ];

  c4Exams.forEach(e => {
    const p = path.join(rootDir, 'src/data', e.file);
    assert(fs.existsSync(p), `C4 Exam file exists: ${e.file}`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));

    assert(data.totalMarks === 105, `C4 ${e.name} totalMarks is exactly 105 standard (Found: ${data.totalMarks})`);

    let grandTotal = 0;
    let partsMismatch = 0;
    let secMismatch = 0;

    data.sections.forEach(s => {
      let secSum = 0;
      s.questions.forEach(q => {
        const pSum = (q.parts || []).reduce((acc, p) => acc + (p.marks || 0), 0);
        if (pSum !== q.totalMarks) partsMismatch++;
        secSum += (q.totalMarks || 0);
      });
      if (secSum !== s.marks) secMismatch++;
      grandTotal += secSum;
    });

    assert(grandTotal === 105, `C4 ${e.name} sum of all questions = 105 (Found: ${grandTotal})`);
    assert(partsMismatch === 0, `C4 ${e.name} all question totalMarks match sum of parts (Mismatches: ${partsMismatch})`);
    assert(secMismatch === 0, `C4 ${e.name} all section marks match sum of questions (Mismatches: ${secMismatch})`);

    const secC = data.sections.find(s => s.id === 'C');
    assert(secC?.marks === 30, `C4 ${e.name} Section C = 30 marks (Found: ${secC?.marks})`);
  });

  // 3. Audio Assets Verification
  const expectedAudioFiles = [
    // Reggae (7)
    'Music/C3_REGGAE/Q1_C3_Exodus.mp3',
    'Music/C3_REGGAE/Q2_C3_SuperApe.mp3',
    'Music/C3_REGGAE/Q3_C3_KingTubby.mp3',
    'Music/C3_REGGAE/Q4_C3_Toots.mp3',
    'Music/C3_REGGAE/Q5_C3_JacobMiller_Vocal.mp3',
    'Music/C3_REGGAE/Q5_C3_KingTubby_Dub.mp3',
    'Music/C3_REGGAE/Q6_C3_BlackboardJungle.mp3',
    // Soul (7)
    'Music/C3_SOUL/Q1_C3_YouCantHurryLove.mp3',
    'Music/C3_SOUL/Q2_C3_Grapevine.mp3',
    'Music/C3_SOUL/Q3_C3_Superstition.mp3',
    'Music/C3_SOUL/Q4_C3_DockOfTheBay.mp3',
    'Music/C3_SOUL/Q5_C3_Mountain_Orig.mp3',
    'Music/C3_SOUL/Q5_C3_Mountain_Live.mp3',
    'Music/C3_SOUL/Q6_C3_IFeelGood.mp3'
  ];

  let missingAudios = 0;
  expectedAudioFiles.forEach(rel => {
    const absPath = path.join(rootDir, 'public', rel);
    if (!fs.existsSync(absPath) || fs.statSync(absPath).size < 1000) {
      missingAudios++;
    }
  });
  assert(missingAudios === 0, `All 14 Reggae and Soul audio tracks exist on disk with valid data (Missing: ${missingAudios})`);

  // Verify all audio references in all 5 C3 exams exist
  let examAudioBroken = 0;
  c3Exams.forEach(e => {
    const data = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data', e.file), 'utf8'));
    data.sections?.forEach(s => {
      s.questions?.forEach(q => {
        if (q.track?.filename) {
          const f = path.join(rootDir, 'public', q.track.filename);
          if (!fs.existsSync(f)) examAudioBroken++;
        }
        if (q.track?.compareFilename) {
          const f = path.join(rootDir, 'public', q.track.compareFilename);
          if (!fs.existsSync(f)) examAudioBroken++;
        }
      });
    });
  });
  assert(examAudioBroken === 0, `Zero broken audio references across all 5 C3 mock exams (Broken: ${examAudioBroken})`);

  // 4. Timetable Cross-Links Verification
  const timetablePath = path.join(rootDir, 'src/components/TimetableBuilder/timetableData.js');
  assert(fs.existsSync(timetablePath), 'timetableData.js exists');

  const timetableContent = fs.readFileSync(timetablePath, 'utf8');
  assert(timetableContent.includes('block-16'), '16-block scheme of work contains block-16');

  // Verify Part 2 topic quizzes are linked
  ['quiz-topic-5_p2', 'quiz-topic-6_p2', 'quiz-topic-7_p2', 'quiz-topic-8_p2', 'quiz-topic-9_p2', 'quiz-topic-10_p2'].forEach(p2Id => {
    assert(timetableContent.includes(p2Id), `Timetable links Part 2 quiz: ${p2Id}`);
  });

  // Verify interactive practical quizzes PQ20-PQ24 are linked
  ['interactive-practical-20', 'interactive-practical-21', 'interactive-practical-22', 'interactive-practical-23', 'interactive-practical-24'].forEach(pqId => {
    assert(timetableContent.includes(pqId), `Timetable links Practical Quiz: ${pqId}`);
  });

  // Verify AO3/AO4 essay workshops are linked
  assert(timetableContent.includes('worksheet-ao3-ao4-q5'), 'Timetable links Q5 Essay Workshop');
  assert(timetableContent.includes('worksheet-ao3-ao4-q6'), 'Timetable links Q6 Essay Workshop');

  // Verify Case Studies are linked
  assert(timetableContent.includes('case-study-7') && timetableContent.includes('case-study-8') && timetableContent.includes('case-study-9'), 'Timetable links new Stage 5 Case Studies');

  // Verify Historical Tech is linked
  assert(timetableContent.includes('history-0') && timetableContent.includes('history-6') && timetableContent.includes('history-7') && timetableContent.includes('history-8'), 'Timetable links new Stage 6 Historical Quizzes');

  // Verify new Practical Quizzes PQ25-PQ28 are linked
  assert(timetableContent.includes('quiz-topic-44'), 'Timetable links PQ25 (Dynamics & Envelopes)');
  assert(timetableContent.includes('quiz-topic-45'), 'Timetable links PQ26 (EQ & Frequency Pocketing)');
  assert(timetableContent.includes('quiz-topic-46'), 'Timetable links PQ27 (Phase Alignment & Polarities)');
  assert(timetableContent.includes('quiz-topic-47'), 'Timetable links PQ28 (DAW Automation & MIDI CC)');
});

// -------------------------------------------------------------
// Suite 9: Homework Assignment Links & Daily 5 Spaced Repetition
// -------------------------------------------------------------
runSuite('Suite 9: Homework Assignment Links & Daily 5 Spaced Repetition', (assert, warn) => {
  // 1. Daily 5 Spaced Repetition Engine
  const qfPath = path.join(rootDir, 'src/components/QuickFireDaily5.jsx');
  assert(fs.existsSync(qfPath), 'QuickFireDaily5.jsx component exists');
  const qfContent = fs.readFileSync(qfPath, 'utf8');
  assert(qfContent.includes('selectDaily5Questions'), 'QuickFireDaily5 implements spaced repetition algorithm');
  assert(qfContent.includes('mtg_daily5_streak'), 'QuickFireDaily5 manages daily revision streak');
  assert(qfContent.includes('fourteenDaysMs'), 'QuickFireDaily5 tracks 14-day spaced repetition intervals');

  // 2. Assignment Modal Component
  const amPath = path.join(rootDir, 'src/components/AssignmentModal.jsx');
  assert(fs.existsSync(amPath), 'AssignmentModal.jsx component exists');
  const amContent = fs.readFileSync(amPath, 'utf8');
  assert(amContent.includes('mtg_teacher_assignments'), 'AssignmentModal saves assignments to teacher history');
  assert(amContent.includes('assignmentUrl'), 'AssignmentModal generates direct student assignment URL');
  assert(amContent.includes('classroomPostText'), 'AssignmentModal generates formatted Classroom/Teams post');

  // 3. Assignment Banner Component
  const abPath = path.join(rootDir, 'src/components/AssignmentBanner.jsx');
  assert(fs.existsSync(abPath), 'AssignmentBanner.jsx component exists');
  const abContent = fs.readFileSync(abPath, 'utf8');
  assert(abContent.includes('mtg_current_assignment'), 'AssignmentBanner manages student active homework');
  assert(abContent.includes('assignmentBlockId'), 'AssignmentBanner parses URL assignment parameters');

  // 4. Timetable Integration
  const tbPath = path.join(rootDir, 'src/components/TimetableBuilder/TimetableBuilder.jsx');
  const tbContent = fs.readFileSync(tbPath, 'utf8');
  assert(tbContent.includes('AssignmentModal'), 'TimetableBuilder imports AssignmentModal');
  assert(tbContent.includes('setAssigningBlockId'), 'TimetableBuilder wires assignment trigger state');

  // 5. Dashboard Integration
  const dashPath = path.join(rootDir, 'src/components/Dashboard.jsx');
  const dashContent = fs.readFileSync(dashPath, 'utf8');
  assert(dashContent.includes('AssignmentBanner'), 'Dashboard imports and renders AssignmentBanner');
  assert(dashContent.includes('quick_fire_daily5'), 'Dashboard features Daily 5 Quick-Fire Drill launcher');
  assert(dashContent.includes('dailyStreak'), 'Dashboard tracks and displays user daily streak');

  // 6. App.jsx Routing & Navigation
  const appPath = path.join(rootDir, 'src/App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(appContent.includes('QuickFireDaily5'), 'App.jsx imports QuickFireDaily5');
  assert(appContent.includes("activeItem.type === 'quick_fire_daily5'"), 'App.jsx routes quick_fire_daily5 view');
  assert(appContent.includes("quickfireParam === 'true'"), 'App.jsx handles quickfire / daily5 URL parameter');

  // 7. Teacher Dashboard Integration
  const tdPath = path.join(rootDir, 'src/components/TeacherDashboard.jsx');
  const tdContent = fs.readFileSync(tdPath, 'utf8');
  assert(tdContent.includes("viewMode === 'assignments'"), 'TeacherDashboard includes Homework & Assignments view');
  assert(tdContent.includes('AssignmentModal'), 'TeacherDashboard integrates AssignmentModal');
  assert(tdContent.includes('savedAssignments'), 'TeacherDashboard displays and manages saved assignment links');
});

// -------------------------------------------------------------
console.log(`\n======================================================`);
console.log(`TEST SUITE RESULTS SUMMARY`);
console.log(`======================================================`);
console.log(`Total Assertions Passed: ${results.passed}`);
console.log(`Total Failures:          ${results.failed}`);
console.log(`Total Warnings:          ${results.warnings}`);
console.log(`Overall Status:          ${results.failed === 0 ? '✓ ALL PASS' : '✗ FAILURES DETECTED'}`);
console.log(`======================================================\n`);

process.exit(results.failed === 0 ? 0 : 1);

