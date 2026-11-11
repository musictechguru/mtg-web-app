import assert from 'node:assert/strict';
import {
  EDEXCEL_RUBRIC_BANK,
  evaluateEdexcelEssay,
  generateSchoolQuoteSummary
} from '../src/utils/edexcelExaminerEngine.js';

console.log('Running TDD suite for Official Pearson Edexcel 9MT0 Examiner Engine (2019–2025 Papers & Student Exemplars)...');

assert.ok(Array.isArray(EDEXCEL_RUBRIC_BANK), 'EDEXCEL_RUBRIC_BANK must be an array');
assert.equal(EDEXCEL_RUBRIC_BANK.length, 9, 'Must include 9 official 9MT0 C3 & C4 extended response rubrics');

for (const rubric of EDEXCEL_RUBRIC_BANK) {
  assert.equal(
    rubric.ao3Max + rubric.ao4Max,
    rubric.maxMarks,
    `AO3 (${rubric.ao3Max}) + AO4 (${rubric.ao4Max}) must equal maxMarks (${rubric.maxMarks}) for ${rubric.id}`
  );
  const expectedAo3 = rubric.maxMarks === 8 ? 4 : 5;
  assert.equal(
    rubric.ao3Max,
    expectedAo3,
    `Official Edexcel 9MT0 ${rubric.id} (${rubric.maxMarks}m) must allocate ${expectedAo3} marks to AO3 (got ${rubric.ao3Max})`
  );

  // Test Level 5 / Grade A* student script
  const resL5 = evaluateEdexcelEssay(rubric.exemplars.grade_A_star, rubric);
  assert.equal(
    resL5.levelBand,
    5,
    `[${rubric.id}] Expected Level 5 for top student script, got Level ${resL5.levelBand} (${resL5.totalMarks}/${rubric.maxMarks})`
  );

  // Test Level 3–4 / Grade B-C student script
  const resMid = evaluateEdexcelEssay(rubric.exemplars.grade_B, rubric);
  assert.ok(
    resMid.levelBand === 3 || resMid.levelBand === 4,
    `[${rubric.id}] Expected Level 3 or 4 for mid-band student script, got Level ${resMid.levelBand} (${resMid.totalMarks}/${rubric.maxMarks})`
  );

  // Test Level 1–2 / Grade D-E student script
  const resLow = evaluateEdexcelEssay(rubric.exemplars.grade_D, rubric);
  assert.ok(
    resLow.levelBand === 1 || resLow.levelBand === 2,
    `[${rubric.id}] Expected Level 1 or 2 for basic student script, got Level ${resLow.levelBand} (${resLow.totalMarks}/${rubric.maxMarks})`
  );

  assert.ok(
    resL5.totalMarks > resMid.totalMarks && resMid.totalMarks > resLow.totalMarks,
    `[${rubric.id}] Strict score ordering Level 5 (${resL5.totalMarks}) > Level 3/4 (${resMid.totalMarks}) > Level 1/2 (${resLow.totalMarks})`
  );

  // Verify Chief Examiner bullet-point + sub-heading formatting across all exemplars
  const minL5Bullets = rubric.maxMarks === 8 ? 4 : 6;
  const minMidBullets = rubric.maxMarks === 8 ? 3 : 4;
  const minLowBullets = rubric.maxMarks === 8 ? 2 : 3;
  const minSubheadings = rubric.maxMarks === 8 ? 2 : 3;

  assert.ok(
    resL5.bulletCount >= minL5Bullets && resL5.subheadingCount >= minSubheadings,
    `[${rubric.id}] Expected Level 5 exemplar to use sub-headings (${resL5.subheadingCount}) and full-sentence bullet points (${resL5.bulletCount})`
  );
  assert.ok(
    resMid.bulletCount >= minMidBullets && resMid.subheadingCount >= 2,
    `[${rubric.id}] Expected Level 3/4 exemplar to use sub-headings (${resMid.subheadingCount}) and full-sentence bullet points (${resMid.bulletCount})`
  );
  assert.ok(
    resLow.bulletCount >= minLowBullets && resLow.subheadingCount >= 1,
    `[${rubric.id}] Expected Level 1/2 exemplar to use sub-headings (${resLow.subheadingCount}) and full-sentence bullet points (${resLow.bulletCount})`
  );

  // Verify blank student_template scores 0 marks before student types bullet points
  const resBlankTemplate = evaluateEdexcelEssay(rubric.exemplars.student_template, rubric);
  assert.equal(
    resBlankTemplate.totalMarks,
    0,
    `[${rubric.id}] Expected blank student_template to score 0 marks before student adds bullets, got ${resBlankTemplate.totalMarks}`
  );
  assert.ok(
    resBlankTemplate.subheadingCount >= minSubheadings,
    `[${rubric.id}] Expected blank student_template to include >=${minSubheadings} official sub-headings`
  );

  console.log(
    `  ✓ ${rubric.id} (${rubric.maxMarks}m • AO3:${rubric.ao3Max}/AO4:${rubric.ao4Max}): L5=${resL5.totalMarks}/${rubric.maxMarks} (Level ${resL5.levelBand} • ${resL5.bulletCount} bullets), Mid=${resMid.totalMarks}/${rubric.maxMarks} (Level ${resMid.levelBand} • ${resMid.bulletCount} bullets), Low=${resLow.totalMarks}/${rubric.maxMarks} (Level ${resLow.levelBand} • ${resLow.bulletCount} bullets)`
  );
}

// Verify Institutional School License Quote Generator (£1,200/yr)
const quote = generateSchoolQuoteSummary({
  schoolName: 'Truro & Penwith College',
  headOfDept: 'Head of Music Tech',
  cohortSize: 24,
  essaysPerStudentPerYear: 12
});
assert.equal(quote.annualLicenseGbp, 1200);
assert.equal(quote.costPerStudentGbp, 50);

console.log('✓ All Official Edexcel 9MT0 Examiner Engine tests PASSED.');
