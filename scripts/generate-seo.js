import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const courseDataPath = path.join(rootDir, 'src/data/course_data.json');
const dictionaryDataPath = path.join(rootDir, 'src/data/dictionary_quizzes.json');
const publicDir = path.join(rootDir, 'public');
const indexHtmlPath = path.join(rootDir, 'index.html');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));
const dictionaryData = JSON.parse(fs.readFileSync(dictionaryDataPath, 'utf8'));

const baseUrl = 'https://app.musictechguru.com';
const today = new Date().toISOString().split('T')[0];

// 1. Generate robots.txt
const robotsTxt = `# robots.txt for Music Tech Guru Revision App
User-agent: *
Allow: /
Disallow: /api/
Disallow: /teacher-dashboard

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim() + '\n', 'utf8');
console.log('✓ robots.txt generated');

// 2. Build URL list for Sitemap
const urls = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
  { loc: 'https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/', priority: '0.95', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=quick_fire_daily5`, priority: '0.9', changefreq: 'daily' },
  { loc: `${baseUrl}/?quiz=dictionary_selector`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=tracksheet_creator`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=component1_guide`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=component2_guide`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=lp_fingerprints`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${baseUrl}/?quiz=timetable_builder`, priority: '0.7', changefreq: 'monthly' }
];

const addedIds = new Set([
  'dictionary_selector',
  'quick_fire_daily5',
  'lp_fingerprints',
  'timetable_builder',
  'tracksheet_creator',
  'component1_guide',
  'component2_guide'
]);

// 2a. Add all curriculum stages from course_data.json
(courseData.sections || []).forEach(section => {
  (section.items || []).forEach(item => {
    const id = item.id || item.title;
    if (id && !addedIds.has(id)) {
      addedIds.add(id);
      const isExam = section.title.includes('Mock Exam');
      const isDiagnostic = section.title.includes('Diagnostic');
      let priority = '0.8';
      if (isDiagnostic || isExam) priority = '0.9';

      urls.push({
        loc: `${baseUrl}/?quiz=${encodeURIComponent(id)}`,
        priority,
        changefreq: 'weekly'
      });
    }
  });
});

// 2b. Add all dictionary topics from dictionary_quizzes.json
let dictTopicCount = 0;
(dictionaryData.volumes || []).forEach(vol => {
  (vol.parts || []).forEach(part => {
    (part.topics || []).forEach(topic => {
      const topicId = topic.id;
      if (topicId && !addedIds.has(topicId)) {
        addedIds.add(topicId);
        dictTopicCount++;
        urls.push({
          loc: `${baseUrl}/?quiz=${encodeURIComponent(topicId)}`,
          priority: '0.75',
          changefreq: 'weekly'
        });
      }
    });
  });
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim() + '\n', 'utf8');
console.log(`✓ sitemap.xml generated with ${urls.length} URLs (including ${dictTopicCount} dictionary topics)`);

// 3. Generate Schema.org JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${baseUrl}/#organization`,
      "name": "Music Tech Guru",
      "url": "https://musictechguru.com",
      "logo": `${baseUrl}/vite.svg`,
      "description": "Specialist revision and teaching platform for Edexcel A-Level Music Technology."
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Music Tech Guru Revision App",
      "publisher": { "@id": `${baseUrl}/#organization` }
    },
    {
      "@type": "Course",
      "@id": `${baseUrl}/#course`,
      "name": "Edexcel A-Level Music Technology Revision Curriculum",
      "description": "Comprehensive revision course covering Edexcel A-Level Music Technology Component 3 (Listening and Analysing) and Component 4 (Producing and Analysing). Includes diagnostic assessments, topic mastery quizzes, interactive signal chain builders, practical producing modules, coursework guides, and full mock exams.",
      "provider": { "@id": `${baseUrl}/#organization` },
      "educationalCredentialAwarded": "Edexcel A-Level Music Technology",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT60H"
      },
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "A-Level Music Technology Students & Teachers"
      },
      "teaches": [
        "Component 1: Multi-track Recording (Guide & Track Sheet Creator)",
        "Component 2: Technology-Based Composition (Guide & Logbook)",
        "Component 3: Listening and Analysing (Historical Tech & Comparative Analysis)",
        "Component 4: Producing and Analysing (Practical DAW Editing, Mixing & Mastering)",
        "Acoustics & Studio Fundamentals",
        "Microphone Technology & Polar Patterns",
        "Analogue and Digital Synthesis",
        "Sampling and Sequencing",
        "Dynamic Processing (Compressors, Limiters, Expanders, Gates)",
        "Equalisation and Frequency Spectrum Analysis",
        "Time-Based Effects (Reverb, Delay, Modulation)",
        "Mastering and Loudness Standards",
        "Audio Editing and DAW Techniques"
      ]
    }
  ]
};

// 4. Generate Pre-rendered Semantic HTML for Indexable Search Crawlers
let curriculumHtml = `
      <section class="seo-core-tools" style="margin-bottom: 28px;">
        <h2>Core Interactive Revision &amp; Coursework Tools</h2>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li><a href="/?quiz=quick_fire_daily5"><strong>Daily 5 Quick-Fire Drill</strong></a> - Rapid exam question practice targeted to current grade level</li>
          <li><a href="/?quiz=dictionary_selector"><strong>Audio Technology Dictionary &amp; Quiz Selector</strong></a> - 10 volumes covering 120+ specialized topics</li>
          <li><a href="/?quiz=tracksheet_creator"><strong>Component 1: Track Sheet &amp; Recall Sheet Creator</strong></a> - Interactive mixing desk recall &amp; logbook</li>
          <li><a href="/?quiz=component1_guide"><strong>Component 1: Recording Guide &amp; Tick List</strong></a> - Step-by-step studio tracking walkthrough</li>
          <li><a href="/?quiz=component2_guide"><strong>Component 2: Composition Guide &amp; Logbook</strong></a> - Specification rubric &amp; creative brief advisor</li>
          <li><a href="/?quiz=timetable_builder"><strong>16-Block Timetable &amp; Scheme of Work</strong></a> - Full curriculum planner for teachers and students</li>
          <li><a href="/?quiz=lp_fingerprints"><strong>Sonic Fingerprints Audio Lab</strong></a> - Interactive audio analysis drills</li>
        </ul>
      </section>

      <section class="seo-curriculum-overview">
        <h2>Curriculum Stages &amp; Interactive Revision Quizzes</h2>
        <p>Explore over 120 interactive revision modules designed for the Pearson Edexcel A-Level Music Technology specification:</p>
`;

(courseData.sections || []).forEach(section => {
  curriculumHtml += `        <div class="seo-stage-block" style="margin-bottom: 24px;">
          <h3>${section.title}</h3>
          <ul style="padding-left: 20px;">
`;
  (section.items || []).forEach(item => {
    const id = item.id || item.title;
    const title = item.title || item.id;
    curriculumHtml += `            <li><a href="/?quiz=${encodeURIComponent(id)}">${title}</a></li>\n`;
  });
  curriculumHtml += `          </ul>
        </div>
`;
});

// 4b. Add Dictionary Volumes and Topics to Semantic HTML
curriculumHtml += `      </section>

      <section class="seo-dictionary-overview" style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <h2>Audio Engineering Terminology Dictionary (120+ Topics)</h2>
        <p>Master technical definitions, signal flow principles, and production vocabulary across 10 specialized volumes:</p>
`;

(dictionaryData.volumes || []).forEach(vol => {
  curriculumHtml += `        <div class="seo-dict-volume-block" style="margin-bottom: 20px;">
          <h4>${vol.title}</h4>
          <ul style="padding-left: 20px; columns: 2; -webkit-columns: 2; -moz-columns: 2;">
`;
  (vol.parts || []).forEach(part => {
    (part.topics || []).forEach(topic => {
      curriculumHtml += `            <li><a href="/?quiz=${encodeURIComponent(topic.id)}">${topic.title}</a></li>\n`;
    });
  });
  curriculumHtml += `          </ul>
        </div>
`;
});

curriculumHtml += `      </section>

      <section class="seo-spec-faq" style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
        <h2>Edexcel A-Level Music Technology Revision FAQ</h2>
        <article style="margin-bottom: 16px;">
          <h3>What does Component 3: Listening and Analysing cover?</h3>
          <p>Component 3 tests students' listening and analytical skills across commercial music recording history from 1950 to the present day. Key topics include recording techniques, acoustic principles, microphone placement, effects, and synthesis.</p>
        </article>
        <article style="margin-bottom: 16px;">
          <h3>What does Component 4: Producing and Analysing cover?</h3>
          <p>Component 4 examines practical DAW skills, editing, mixing, signal flow, dynamic processing, corrective EQ, MIDI programming, and mastering considerations under exam conditions.</p>
        </article>
        <article style="margin-bottom: 16px;">
          <h3>What revision tools does Music Tech Guru provide?</h3>
          <p>Interactive signal-chain builders, parameter matching drills, frequency recognition exercises, Component 3 &amp; 4 full mock exams, a 3,300+ entry music technology dictionary, and teacher progress analytics.</p>
        </article>
      </section>
`;

const renderedFallback = `
    <!-- SEO_CONTENT_START -->
    <div id="seo-crawler-content" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1; line-height: 1.6;">
      <header style="margin-bottom: 24px;">
        <h1 style="color: #38bdf8; font-size: 2rem; margin-bottom: 8px;">Music Tech Guru | Edexcel A-Level Music Technology Revision</h1>
        <p style="font-size: 1.1rem; color: #94a3b8;">The definitive interactive revision platform for Pearson Edexcel A-Level Music Technology students and teachers. Covering Component 1 (Recording), Component 2 (Composition), Component 3 (Listening &amp; Analysing), and Component 4 (Producing &amp; Analysing).</p>
      </header>
${curriculumHtml}
    </div>
    <!-- SEO_CONTENT_END -->`;

// 5. Update index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Update canonical and structured data in <head>
const gscToken = process.env.VITE_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || '';
const gscMeta = gscToken ? `\n    <meta name="google-site-verification" content="${gscToken}" />` : '';

const jsonLdScript = `\n    <link rel="canonical" href="${baseUrl}/" />${gscMeta}\n    <script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n    </script>`;

if (indexHtml.includes('<script type="application/ld+json">')) {
  indexHtml = indexHtml.replace(/<link rel="canonical"[^>]*>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdScript.trim());
} else {
  indexHtml = indexHtml.replace('</head>', `${jsonLdScript}\n  </head>`);
}

// Update <div id="root"> content
if (indexHtml.includes('<!-- SEO_CONTENT_START -->')) {
  indexHtml = indexHtml.replace(/<!-- SEO_CONTENT_START -->[\s\S]*?<!-- SEO_CONTENT_END -->/, renderedFallback.trim());
} else {
  indexHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${renderedFallback}\n    </div>`);
}

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('✓ index.html updated with JSON-LD and pre-rendered semantic HTML');
