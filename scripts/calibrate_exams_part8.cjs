const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function updateExam(filename, mutator) {
    const filePath = path.join(DATA_DIR, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    mutator(data);
    
    // Validate consistency
    let grandTotal = 0;
    data.sections.forEach(sec => {
        let secTotal = 0;
        sec.questions.forEach(q => {
            let qSum = 0;
            if (q.parts) {
                qSum = q.parts.reduce((acc, p) => acc + (p.marks || 0), 0);
            }
            q.totalMarks = qSum;
            secTotal += qSum;
        });
        sec.marks = secTotal;
        grandTotal += secTotal;
    });
    data.totalMarks = grandTotal;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`[UPDATED] ${filename}: totalMarks = ${data.totalMarks}`);
    data.sections.forEach(s => {
        console.log(`  Sec ${s.id} (${s.title}): ${s.marks} marks [${s.questions.map(q => q.id + ':' + q.totalMarks).join(', ')}]`);
    });
}

// 1. COMPONENT 3 FUNK
updateExam('component3_funk_exam.json', data => {
    // Section A -> 40 marks (q1: 10, q2: 10, q3: 10, q4: 10)
    const secA = data.sections.find(s => s.id === 'A');
    const q2 = secA.questions.find(q => q.id === 'q2');
    // q2 currently 13 (a_i: 1, a_ii: 3, b: 3, c: 2, d: 4) -> calibrate to 10
    q2.parts.find(p => p.id === 'a_ii').marks = 2;
    q2.parts.find(p => p.id === 'b').marks = 2;
    q2.parts.find(p => p.id === 'd').marks = 3;
    
    const q3 = secA.questions.find(q => q.id === 'q3');
    // q3 currently 9 (a: 1, b: 2, c: 1, d: 5) -> calibrate to 10
    q3.parts.find(p => p.id === 'c').marks = 2;
});

// 2. COMPONENT 3 HEAVY ROCK
updateExam('component3_heavyrock_exam.json', data => {
    const secA = data.sections.find(s => s.id === 'A');
    const q2 = secA.questions.find(q => q.id === 'q2');
    // q2 currently 16 (a_i: 2, a_ii: 3, b: 3, c: 4, d: 4) -> calibrate to 10
    q2.parts.find(p => p.id === 'a_ii').marks = 2;
    q2.parts.find(p => p.id === 'b').marks = 2;
    q2.parts.find(p => p.id === 'c').marks = 2;
    q2.parts.find(p => p.id === 'd').marks = 2;
    
    const q3 = secA.questions.find(q => q.id === 'q3');
    // q3 currently 14 (a: 1, b: 2, c: 6, d: 5) -> calibrate to 10
    q3.parts.find(p => p.id === 'c').marks = 4;
    q3.parts.find(p => p.id === 'd').marks = 3;
    
    const secB = data.sections.find(s => s.id === 'B');
    const q6 = secB.questions.find(q => q.id === 'q6');
    // q6 currently 25 (a: 5, b: 6, c: 4, d: 10) -> calibrate to 20
    q6.parts.find(p => p.id === 'a').marks = 4;
    q6.parts.find(p => p.id === 'd').marks = 6;
});

// 3. COMPONENT 3 REGGAE
updateExam('component3_reggae_exam.json', data => {
    const secA = data.sections.find(s => s.id === 'A');
    const q2 = secA.questions.find(q => q.id === 'q2');
    // q2 currently 13 (a_i: 1, a_ii: 3, b: 4, c: 2, d: 3) -> calibrate to 10
    q2.parts.find(p => p.id === 'a_ii').marks = 2;
    q2.parts.find(p => p.id === 'b').marks = 3;
    q2.parts.find(p => p.id === 'd').marks = 2;
});

// 4. COMPONENT 3 SOUL
updateExam('component3_soul_exam.json', data => {
    const secA = data.sections.find(s => s.id === 'A');
    const q2 = secA.questions.find(q => q.id === 'q2');
    // q2 currently 13 (a_i: 1, a_ii: 3, b: 4, c: 2, d: 3) -> calibrate to 10
    q2.parts.find(p => p.id === 'a_ii').marks = 2;
    q2.parts.find(p => p.id === 'b').marks = 3;
    q2.parts.find(p => p.id === 'd').marks = 2;
});

// 5. COMPONENT 3 SYNTHPOP
updateExam('component3_synthpop_exam.json', data => {
    const secA = data.sections.find(s => s.id === 'A');
    const q2 = secA.questions.find(q => q.id === 'q2');
    // q2 currently 15 (a_i: 1, a_ii: 4, b: 3, c: 4, d: 3) -> calibrate to 10
    q2.parts.find(p => p.id === 'a_ii').marks = 3;
    q2.parts.find(p => p.id === 'b').marks = 2;
    q2.parts.find(p => p.id === 'c').marks = 2;
    q2.parts.find(p => p.id === 'd').marks = 2;
    
    const q3 = secA.questions.find(q => q.id === 'q3');
    // q3 currently 9 (a: 1, b: 2, c: 1, d: 5) -> calibrate to 10
    q3.parts.find(p => p.id === 'd').marks = 6;
});

// 6. COMPONENT 4 EDM
updateExam('component4_edm_exam.json', data => {
    // Section A: 53 marks, Section B: 22 marks, Section C: 30 marks -> 105 marks
    const secB = data.sections.find(s => s.id === 'B');
    const q1 = secB.questions.find(q => q.id === 'q1');
    q1.parts.find(p => p.id === 'a').marks = 4;
    
    const q3 = secB.questions.find(q => q.id === 'q3');
    q3.parts.find(p => p.id === 'a').marks = 2;
    
    const q5 = secB.questions.find(q => q.id === 'q5');
    q5.parts.find(p => p.id === 'a').marks = 2;
    
    const q6 = secB.questions.find(q => q.id === 'q6');
    q6.parts.find(p => p.id === 'a').marks = 2;
});

// 7. COMPONENT 4 SPOP
updateExam('component4_spop_exam.json', data => {
    // Section A: 50 marks, Section B: 25 marks, Section C: 30 marks -> 105 marks
    const secA = data.sections.find(s => s.id === 'A');
    secA.questions.find(q => q.id === 'q1_drums').parts.find(p => p.id === 'p1_drums').marks = 4;
    secA.questions.find(q => q.id === 'q2_bass').parts.find(p => p.id === 'p2_bass').marks = 6;
    secA.questions.find(q => q.id === 'q3_inst1').parts.find(p => p.id === 'p3_arp').marks = 7;
    secA.questions.find(q => q.id === 'q4_pizz').parts.find(p => p.id === 'p4_pizz').marks = 7;
    secA.questions.find(q => q.id === 'q5_vocal').parts.find(p => p.id === 'p5_vox').marks = 7;
    secA.questions.find(q => q.id === 'q6_vocoder').parts.find(p => p.id === 'p6_vocoder').marks = 5;
    secA.questions.find(q => q.id === 'q8_mix').parts.find(p => p.id === 'p8_balance').marks = 3;
    
    const secB = data.sections.find(s => s.id === 'B');
    secB.questions.find(q => q.id === 'q1').parts.find(p => p.id === 'a').marks = 4;
    secB.questions.find(q => q.id === 'q2').parts.find(p => p.id === 'a').marks = 5;
    secB.questions.find(q => q.id === 'q3').parts.find(p => p.id === 'a').marks = 2;
    secB.questions.find(q => q.id === 'q5').parts.find(p => p.id === 'a').marks = 2;
    secB.questions.find(q => q.id === 'q5').parts.find(p => p.id === 'b').marks = 2;
    secB.questions.find(q => q.id === 'q6').parts.find(p => p.id === 'a').marks = 2;
});

// 8. COMPONENT 4 TEMPLATE (ROCK)
updateExam('component4_template_exam.json', data => {
    // Section A: 50 marks, Section B: 25 marks, Section C: 30 marks -> 105 marks
    const secA = data.sections.find(s => s.id === 'A');
    secA.questions.find(q => q.id === 'q1_drums').parts.find(p => p.id === 'p1_editing').marks = 5;
    secA.questions.find(q => q.id === 'q1_drums').parts.find(p => p.id === 'p1_reverb').marks = 3;
    secA.questions.find(q => q.id === 'q2_bass').parts.find(p => p.id === 'p2_amp').marks = 7;
    secA.questions.find(q => q.id === 'q3_inst1').parts.find(p => p.id === 'p3_effect').marks = 8;
    secA.questions.find(q => q.id === 'q4_inst2').parts.find(p => p.id === 'p4_fx').marks = 6;
    secA.questions.find(q => q.id === 'q5_vocals').parts.find(p => p.id === 'p5_eq').marks = 15;
    secA.questions.find(q => q.id === 'q6_mix').parts.find(p => p.id === 'p6_balance').marks = 6;
    
    const secB = data.sections.find(s => s.id === 'B');
    secB.questions.find(q => q.id === 'q1').parts.find(p => p.id === 'a').marks = 4;
    secB.questions.find(q => q.id === 'q3').parts.find(p => p.id === 'a').marks = 2;
    secB.questions.find(q => q.id === 'q5').parts.find(p => p.id === 'a').marks = 2;
    secB.questions.find(q => q.id === 'q5').parts.find(p => p.id === 'b').marks = 2;
    secB.questions.find(q => q.id === 'q6').parts.find(p => p.id === 'a').marks = 2;
});

console.log('\nAll 8 Mock Exams successfully calibrated and aligned!');
