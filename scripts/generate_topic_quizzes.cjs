const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, '../src/data/dictionary_quizzes.json');
const COURSE_FILE = path.join(__dirname, '../src/data/course_data.json');

// Calculate variance
function getAnswerLengthVariance(q) {
    const answers = q.answers || [];
    if (answers.length < 2) return 0;

    const lengths = answers.map(a => (a.text || "").length);
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;

    // Population variance
    const variance = lengths.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / lengths.length;
    return variance;
}

function processQuestions(questions) {
    return questions.map(q => {
        const hasImg = (q.explanation_image || q.img) ? 1 : 0;
        const hasQuote = q.expert_quote ? 1 : 0;
        const variance = getAnswerLengthVariance(q);
        return { hasImg, hasQuote, variance, q };
    }).sort((a, b) => {
        if (a.hasImg !== b.hasImg) return b.hasImg - a.hasImg;
        if (a.hasQuote !== b.hasQuote) return b.hasQuote - a.hasQuote;
        return a.variance - b.variance;
    }).map(item => item.q);
}

function convertToCourseQuestion(q, qIdx) {
    let explanationHtml = "";
    let imgSrc = "";
    let imgAlt = "Explanation Diagram";

    if (q.explanation_image && typeof q.explanation_image === 'object') {
        imgSrc = q.explanation_image.src || "";
        imgAlt = q.explanation_image.alt || imgAlt;
    } else if (typeof q.explanation_image === 'string' && q.explanation_image) {
        imgSrc = q.explanation_image;
    } else if (q.img) {
        imgSrc = q.img;
    }

    if (imgSrc) {
        explanationHtml += `<img src="${imgSrc}" alt="${imgAlt}" style="width:100%; border-radius:8px; margin-bottom:10px;" />`;
    }

    if (q.expert_explanation) {
        explanationHtml += `<p><strong>Expert Explanation:</strong> ${q.expert_explanation}</p>`;
    } else if (q.explanation) {
        explanationHtml += `<p>${q.explanation}</p>`;
    }

    const quote = q.expert_quote;
    if (quote && quote.text) {
        explanationHtml += `<blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"${quote.text}"<br/><strong>- ${quote.author || "Expert"}</strong></blockquote>`;
    }

    let title = q.title || "Question";
    if (title.includes(":")) title = title.split(":").pop().trim();

    const newQ = {
        title: `Q${qIdx + 1}: ${title}`,
        content: q.content || "",
        type: q.type || "multi_choice",
        answers: q.answers || [],
        explanation: explanationHtml
    };

    if (imgSrc) newQ.img = imgSrc;
    if (quote) newQ.expert_quote = quote;
    if (q.expert_explanation) newQ.expert_explanation = q.expert_explanation;

    return newQ;
}

function main() {
    console.log("Loading files...");
    const dictData = JSON.parse(fs.readFileSync(DICT_FILE, 'utf8'));
    const courseData = JSON.parse(fs.readFileSync(COURSE_FILE, 'utf8'));

    const newQuizzes = [];

    const volumes = (dictData.volumes || []).slice(0, 10);
    volumes.forEach((vol, i) => {
        let volTitle = vol.title || `Volume ${i + 1}`;
        volTitle = volTitle.replace("Volume ", "");
        const parts = volTitle.split(":");
        const name = parts.length > 1 ? parts[1].trim() : parts[0].trim();

        const topicTitle = `Topic ${i + 1}: ${name}`;

        let allBasic = [];
        let allIntermediate = [];

        (vol.parts || []).forEach(part => {
            (part.topics || []).forEach(t => {
                if (t.levels) {
                    allBasic = allBasic.concat(t.levels.basic || []);
                    allIntermediate = allIntermediate.concat(t.levels.intermediate || []);
                }
            });
        });

        const bestBasic = processQuestions(allBasic).slice(0, 10);
        const bestIntermediate = processQuestions(allIntermediate).slice(0, 10);

        const selectedQuestions = [...bestBasic, ...bestIntermediate];

        const formattedQuestions = selectedQuestions.map((q, idx) => convertToCourseQuestion(q, idx));

        // Use isPremium logic
        const isPremium = (i + 1) > 3;

        const newQuiz = {
            id: `quiz-topic-${i + 1}`,
            title: topicTitle,
            type: "lp_quiz",
            isPremium: isPremium,
            description: `Mastery quiz covering the fundamentals of ${name}.`,
            questions: formattedQuestions
        };

        newQuizzes.push(newQuiz);
    });

    // Inject into courseData
    let updated = false;
    courseData.sections.forEach(section => {
        if (section.title && section.title.includes("Stage 2")) {
            const existingIds = new Set(newQuizzes.map(q => q.id));
            const newItems = (section.items || []).filter(item => !existingIds.has(item.id));
            section.items = [...newQuizzes, ...newItems];
            updated = true;
        }
    });

    if (updated) {
        fs.writeFileSync(COURSE_FILE, JSON.stringify(courseData, null, 4), 'utf8');
        console.log(`Successfully generated ${newQuizzes.length} quizzes and updated course_data.json!`);
    } else {
        console.log("Could not find Stage 2 section in course_data.json.");
    }
}

main();
