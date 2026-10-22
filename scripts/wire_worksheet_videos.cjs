/**
 * wire_worksheet_videos.cjs
 * Updates worksheet-ao3-ao4-q5 and worksheet-ao3-ao4-q6 in course_data.json:
 * - Injects videoId & videoId2 (and videoTitle1 & videoTitle2) for all 3 Q5 comparison pairs
 * - Injects videoId & videoTitle1 for all 3 Q6 evaluation tracks
 */

const fs = require('fs');
const path = require('path');

const courseDataPath = path.resolve('src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

const allItems = courseData.sections.flatMap(s => s.items || []);

const q5 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q5');
if (q5 && Array.isArray(q5.tracks)) {
  // Track 1: Comfortably Numb
  q5.tracks[0].videoId = '_FrOQC-zEog';
  q5.tracks[0].videoTitle1 = 'Version A: Pink Floyd (1979)';
  q5.tracks[0].videoId2 = 'KUJzlnab1xo';
  q5.tracks[0].videoTitle2 = 'Version B: Scissor Sisters (2004)';

  // Track 2: Word Up!
  q5.tracks[1].videoId = 'MZjAantupsA';
  q5.tracks[1].videoTitle1 = 'Version A: Cameo (1986)';
  q5.tracks[1].videoId2 = '-M7vOnlcLbo';
  q5.tracks[1].videoTitle2 = 'Version B: Korn (2004)';

  // Track 3: Smooth Criminal
  q5.tracks[2].videoId = 'h_D3VFfhvs4';
  q5.tracks[2].videoTitle1 = 'Version A: Michael Jackson (1987)';
  q5.tracks[2].videoId2 = 'CDl9ZMfj6aE';
  q5.tracks[2].videoTitle2 = 'Version B: Alien Ant Farm (2001)';

  console.log('Updated Q5 worksheet tracks with both Version A and Version B YouTube IDs.');
}

const q6 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q6');
if (q6 && Array.isArray(q6.tracks)) {
  // Track 1: Vocal Production Evolution
  q6.tracks[0].videoId = 'sLEXOcO_PUQ';
  q6.tracks[0].videoTitle1 = 'History of Vocal Production & Pitch Correction (Auto-Tune / Melodyne)';

  // Track 2: Drum Production Evolution
  q6.tracks[1].videoId = 'AFw8dYilH74';
  q6.tracks[1].videoTitle1 = 'Evolution of Drum Production: From Live Acoustic Kits to Sample Replacement & Beat Detective';

  // Track 3: The DAW Revolution
  q6.tracks[2].videoId = 'qaU8jk4anIo';
  q6.tracks[2].videoTitle1 = 'The DAW Revolution: Digital Audio Workstations & Modern In-The-Box Production';

  console.log('Updated Q6 worksheet tracks with YouTube documentary IDs.');
}

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2));
console.log('course_data.json updated successfully.');
