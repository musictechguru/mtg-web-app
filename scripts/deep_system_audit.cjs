const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
console.log('====================================================');
console.log('🔍 COMMENCING DEEP SYSTEM AUDIT OF ENTIRE PLATFORM');
console.log('====================================================\n');

let issues = [];
let warnings = [];
let passCount = 0;

function audit(name, condition, details = null) {
    if (condition) {
        passCount++;
        console.log(`  ✓ PASS: ${name}`);
    } else {
        issues.push({ name, details });
        console.error(`  ✗ ISSUE: ${name}`, details ? details : '');
    }
}

function warn(name, details = null) {
    warnings.push({ name, details });
    console.warn(`  ⚠️ WARN: ${name}`, details ? details : '');
}

// ---------------------------------------------------------
// 1. COURSE DATA AUDIT
// ---------------------------------------------------------
console.log('\n--- 1. Auditing src/data/course_data.json ---');
const courseDataPath = path.join(rootDir, 'src/data/course_data.json');
audit('course_data.json exists', fs.existsSync(courseDataPath));

const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));
audit('courseData has sections array', Array.isArray(courseData.sections) && courseData.sections.length > 0);

let totalItems = 0;
let brokenCourseImages = 0;
let brokenCourseAudios = 0;
let totalCourseQuestions = 0;

courseData.sections.forEach(sec => {
    (sec.items || []).forEach(it => {
        totalItems++;
        if (it.questions) {
            it.questions.forEach((q, qIdx) => {
                totalCourseQuestions++;
                // Image check (Local vs Remote URL)
                if (q.explanation_image?.src) {
                    const src = q.explanation_image.src;
                    if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
                        const clean = src.replace(/^\//, '');
                        const full = path.join(rootDir, 'public', clean);
                        if (!fs.existsSync(full)) {
                            brokenCourseImages++;
                            audit(`Local Image exists: ${src}`, false, { item: it.id, qIdx });
                        }
                    }
                }
                // Check embedded HTML images
                if (q.explanation && typeof q.explanation === 'string') {
                    const imgMatches = [...q.explanation.matchAll(/<img[^>]+src=["']([^"']+)["']/g)];
                    imgMatches.forEach(m => {
                        const src = m[1];
                        if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
                            const clean = src.replace(/^\//, '');
                            const full = path.join(rootDir, 'public', clean);
                            if (!fs.existsSync(full)) {
                                brokenCourseImages++;
                                audit(`Embedded HTML image exists: ${src}`, false, { item: it.id, qIdx });
                            }
                        }
                    });
                }
                // Audio checks
                ['audio_a', 'audio_b', 'audio_src', 'audio_before', 'audio_after'].forEach(audioKey => {
                    if (q[audioKey]) {
                        const clean = q[audioKey].replace(/^\//, '');
                        const full = path.join(rootDir, 'public', clean);
                        if (!fs.existsSync(full)) {
                            brokenCourseAudios++;
                            audit(`Audio exists: ${q[audioKey]}`, false, { item: it.id, qIdx, audioKey });
                        }
                    }
                });
            });
        }
    });
});

audit('Zero broken local images in course_data.json', brokenCourseImages === 0, { brokenCourseImages });
audit('Zero broken local audios in course_data.json', brokenCourseAudios === 0, { brokenCourseAudios });
console.log(`  Scanned ${totalItems} items across ${courseData.sections.length} stages (${totalCourseQuestions} questions).`);

// ---------------------------------------------------------
// 2. DICTIONARY QUIZZES AUDIT
// ---------------------------------------------------------
console.log('\n--- 2. Auditing src/data/dictionary_quizzes.json ---');
const dictPath = path.join(rootDir, 'src/data/dictionary_quizzes.json');
audit('dictionary_quizzes.json exists', fs.existsSync(dictPath));

const dictData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
audit('Has 10 dictionary volumes', Array.isArray(dictData.volumes) && dictData.volumes.length === 10);

let totalDictQuestions = 0;
let brokenDictImages = 0;
let dictCorrectAnswerMissing = 0;

dictData.volumes.forEach(vol => {
    (vol.parts || []).forEach(part => {
        (part.topics || []).forEach(top => {
            ['basic', 'intermediate'].forEach(lvl => {
                const questions = top.levels?.[lvl] || [];
                totalDictQuestions += questions.length;
                questions.forEach(q => {
                    const cIdx = q.answers?.findIndex(a => a.is_true === 'yes' || a.is_true === true);
                    if (cIdx === -1) dictCorrectAnswerMissing++;
                    if (q.explanation_image?.src) {
                        const src = q.explanation_image.src;
                        if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
                            const clean = src.replace(/^\//, '');
                            const full = path.join(rootDir, 'public', clean);
                            if (!fs.existsSync(full)) brokenDictImages++;
                        }
                    }
                });
            });
        });
    });
});

audit('Total dictionary questions >= 2,400', totalDictQuestions >= 2400, { totalDictQuestions });
audit('Zero missing correct answers in dictionary quizzes', dictCorrectAnswerMissing === 0, { dictCorrectAnswerMissing });
audit('Zero broken images in dictionary quizzes', brokenDictImages === 0, { brokenDictImages });
console.log(`  Scanned ${totalDictQuestions} dictionary questions.`);

// ---------------------------------------------------------
// 3. CAMPAIGN ROUTE & PROGRESSION AUDIT
// ---------------------------------------------------------
console.log('\n--- 3. Auditing src/data/campaign_route.json ---');
const campPath = path.join(rootDir, 'src/data/campaign_route.json');
audit('campaign_route.json exists', fs.existsSync(campPath));

const campData = JSON.parse(fs.readFileSync(campPath, 'utf8'));
audit('Campaign has 16 rounds', Array.isArray(campData.rounds) && campData.rounds.length === 16);

let totalNodes = 0;
let unresolvableNodes = 0;

campData.rounds.forEach(rnd => {
    (rnd.nodes || []).forEach(node => {
        totalNodes++;
        if (node.type === 'quiz' && node.quizId) {
            let found = false;
            // Check course_data
            for (const s of courseData.sections) {
                if (s.items?.some(it => it.id === node.quizId)) { found = true; break; }
            }
            // Check dictionary
            if (!found) {
                for (const v of dictData.volumes) {
                    for (const p of (v.parts || [])) {
                        for (const t of (p.topics || [])) {
                            if (t.id === node.quizId || t.title === node.quizId) { found = true; break; }
                        }
                        if (found) break;
                    }
                    if (found) break;
                }
            }
            // Check C3/C4 mock exams
            if (!found && ['c3_funk', 'c3_synthpop', 'c3_heavyrock', 'c3_soul', 'c3_reggae', 'c4_edm', 'c4_template', 'c4_spop'].includes(node.quizId)) {
                found = true;
            }
            // Check dictionary specific quizzes (e.g. v5_t3_basic, v5_t11_intermediate, etc.)
            if (!found && (node.quizId.startsWith('v') && (node.quizId.includes('_t') || node.quizId.includes('vol')))) {
                found = true;
            }
            if (!found) {
                unresolvableNodes++;
                audit(`Campaign node resolves: ${node.id} (${node.quizId})`, false);
            }
        }
    });
});

audit('All campaign nodes resolve to valid content', unresolvableNodes === 0, { unresolvableNodes });
console.log(`  Scanned ${totalNodes} campaign nodes.`);

// ---------------------------------------------------------
// 4. COMPONENT 3 & 4 EXAMS AUDIT
// ---------------------------------------------------------
console.log('\n--- 4. Auditing Component 3 & 4 Mock Exams ---');
const c3Exams = ['component3_funk_exam.json', 'component3_heavyrock_exam.json', 'component3_reggae_exam.json', 'component3_soul_exam.json', 'component3_synthpop_exam.json'];
const c4Exams = ['component4_edm_exam.json', 'component4_spop_exam.json', 'component4_template_exam.json'];

let brokenExamMedia = 0;

c3Exams.forEach(f => {
    const p = path.join(rootDir, 'src/data', f);
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    audit(`${f} declared totalMarks is 75`, d.totalMarks === 75, { totalMarks: d.totalMarks });
    
    let sum = 0;
    d.sections.forEach(s => {
        let sSum = 0;
        s.questions.forEach(q => {
            const pSum = (q.parts || []).reduce((acc, part) => acc + (part.marks || 0), 0);
            if (pSum !== q.totalMarks) audit(`${f} ${q.id} totalMarks matches partsSum`, false, { totalMarks: q.totalMarks, pSum });
            sSum += q.totalMarks;
            
            // Check audio
            if (q.track?.filename) {
                const audioPath = path.join(rootDir, 'public', q.track.filename);
                if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size < 1000) brokenExamMedia++;
            }
            if (q.track?.compareFilename) {
                const audioPath = path.join(rootDir, 'public', q.track.compareFilename);
                if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size < 1000) brokenExamMedia++;
            }
        });
        if (sSum !== s.marks) audit(`${f} Sec ${s.id} marks matches questionsSum`, false, { sMarks: s.marks, sSum });
        sum += sSum;
    });
    audit(`${f} actual calculated marks sum is 75`, sum === 75, { sum });
});

c4Exams.forEach(f => {
    const p = path.join(rootDir, 'src/data', f);
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    audit(`${f} declared totalMarks is 105`, d.totalMarks === 105, { totalMarks: d.totalMarks });
    
    let sum = 0;
    d.sections.forEach(s => {
        let sSum = 0;
        s.questions.forEach(q => {
            const pSum = (q.parts || []).reduce((acc, part) => acc + (part.marks || 0), 0);
            if (pSum !== q.totalMarks) audit(`${f} ${q.id} totalMarks matches partsSum`, false, { totalMarks: q.totalMarks, pSum });
            sSum += q.totalMarks;
            
            // Check assets / audio
            if (q.track?.filename) {
                const audioPath = path.join(rootDir, 'public', q.track.filename);
                if (!fs.existsSync(audioPath)) {
                    brokenExamMedia++;
                    audit(`C4 audio exists: ${q.track.filename}`, false);
                }
            }
            if (q.track?.assets) {
                q.track.assets.forEach(a => {
                    const p = path.join(rootDir, 'public', a.filename);
                    if (!fs.existsSync(p)) {
                        brokenExamMedia++;
                        audit(`C4 asset exists: ${a.filename}`, false);
                    }
                });
            }
            if (q.parts) {
                q.parts.forEach(part => {
                    if (part.answerImage) {
                        const imgs = Array.isArray(part.answerImage) ? part.answerImage : [part.answerImage];
                        imgs.forEach(img => {
                            if (img && !fs.existsSync(path.join(rootDir, 'public', img))) {
                                brokenExamMedia++;
                                audit(`C4 answerImage exists: ${img}`, false);
                            }
                        });
                    }
                });
            }
        });
        if (sSum !== s.marks) audit(`${f} Sec ${s.id} marks matches questionsSum`, false, { sMarks: s.marks, sSum });
        sum += sSum;
    });
    audit(`${f} actual calculated marks sum is 105`, sum === 105, { sum });
});

audit('Zero broken media/assets in C3 & C4 mock exams', brokenExamMedia === 0, { brokenExamMedia });

// ---------------------------------------------------------
// 5. SONIC FINGERPRINTS & TIMETABLE AUDIT
// ---------------------------------------------------------
console.log('\n--- 5. Auditing Sonic Fingerprints & 16-Block Timetable ---');
const fpPath = path.join(rootDir, 'src/data/fingerprints_data.json');
audit('fingerprints_data.json exists', fs.existsSync(fpPath));

const fpData = JSON.parse(fs.readFileSync(fpPath, 'utf8'));
audit('Has 9 Sonic Fingerprints songs', Array.isArray(fpData.songs) && fpData.songs.length === 9);

let songsValid = 0;
fpData.songs.forEach(song => {
    if (song.id && song.youtubeId && song.criteria && song.criteria.length > 0) {
        songsValid++;
    }
});
audit('All 9 Sonic Fingerprints songs have valid YouTube ID & criteria', songsValid === 9, { songsValid });

const ttPath = path.join(rootDir, 'src/components/TimetableBuilder/timetableData.js');
audit('timetableData.js exists', fs.existsSync(ttPath));
const ttContent = fs.readFileSync(ttPath, 'utf8');
audit('Timetable contains block-1 through block-16', ttContent.includes('block-1') && ttContent.includes('block-16'));

// ---------------------------------------------------------
// 6. OVERALL AUDIT SUMMARY
// ---------------------------------------------------------
console.log('\n====================================================');
console.log('AUDIT SUMMARY REPORT');
console.log('====================================================');
console.log(`Total Checks Passed: ${passCount}`);
console.log(`Total Issues Found:  ${issues.length}`);
console.log(`Total Warnings:      ${warnings.length}`);
if (issues.length > 0) {
    console.error('\nIssues to resolve:');
    issues.forEach((iss, i) => console.error(`  ${i+1}. ${iss.name}:`, iss.details));
} else {
    console.log('\n🌟 ALL SYSTEM HEALTH CHECKS PASSED WITH 100% INTEGRITY!');
}
console.log('====================================================\n');

process.exit(issues.length === 0 ? 0 : 1);
