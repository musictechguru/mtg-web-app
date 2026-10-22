const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/course_data.json');
let content = fs.readFileSync(filePath, 'utf8');

// Replace formula giveaways
content = content.replace(
  '"51.84 MB (Formula: 48,000 × 24 × 2 × 180 ÷ 8 ÷ 1,000,000)"',
  '"51.84 MB"'
);

content = content.replace(
  '"375 ms (Formula: 60,000 ÷ 120 = 500 ms; 8th note = 250 ms; dotted 8th = 250 × 1.5 = 375 ms)"',
  '"375 ms"'
);

content = content.replace(
  '"3.4 meters (Formula: 340 m/s ÷ 100 Hz = 3.4 m)"',
  '"3.4 meters"'
);

content = content.replace(
  '"4.0 ms (Formula: 1 ÷ 250 = 0.004 s = 4.0 ms)"',
  '"4.0 ms"'
);

content = content.replace(
  '"18.1 kHz (Formula: |44.1 kHz - 26 kHz| = 18.1 kHz)"',
  '"18.1 kHz"'
);

content = content.replace(
  '"144 dB for 24-bit vs 96 dB for 16-bit (an extra 48 dB of dynamic range / lower noise floor)"',
  '"144 dB for 24-bit vs 96 dB for 16-bit"'
);

content = content.replace(
  '"4.0 seconds (pitch halves, so playback duration doubles)"',
  '"4.0 seconds"'
);

content = content.replace(
  '"500 Hz (Formula: f = 1 ÷ (2 × 0.001 s) = 500 Hz)"',
  '"500 Hz"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Successfully cleaned all formula giveaways from Practical Quiz 23 in course_data.json!');
