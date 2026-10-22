import dictionaryData from '../data/dictionary_quizzes.json';

/**
 * Searches dictionary_quizzes.json for a matching topic or quiz level.
 * @param {string} idOrTitle - The topic ID (e.g. 'v1_t1'), level ID ('v1_t1_basic'), or title ('AUDIO FUNDAMENTALS')
 * @returns {object|null} - Formatted quiz item suitable for QuizPlayer, or null
 */
export const findDictionaryItem = (idOrTitle) => {
  if (!idOrTitle || typeof idOrTitle !== 'string') return null;
  const clean = idOrTitle.trim().toLowerCase();

  for (const vol of dictionaryData.volumes || []) {
    for (const part of vol.parts || []) {
      for (const topic of part.topics || []) {
        // Direct topic ID match (e.g. 'v1_t1')
        if (topic.id.toLowerCase() === clean) {
          const defaultLevel = Object.keys(topic.levels || {})[0] || 'basic';
          return {
            id: topic.id,
            type: 'lp_quiz',
            title: `${topic.title} (${defaultLevel.toUpperCase()})`,
            description: `Revise ${topic.title} for Edexcel A-Level Music Technology with terminology drills and explanations.`,
            questions: topic.levels[defaultLevel] || []
          };
        }

        // Direct topic title match (e.g. 'AUDIO FUNDAMENTALS')
        if (topic.title.toLowerCase() === clean) {
          const defaultLevel = Object.keys(topic.levels || {})[0] || 'basic';
          return {
            id: topic.id,
            type: 'lp_quiz',
            title: `${topic.title} (${defaultLevel.toUpperCase()})`,
            description: `Revise ${topic.title} for Edexcel A-Level Music Technology with terminology drills and explanations.`,
            questions: topic.levels[defaultLevel] || []
          };
        }

        // Specific level match (e.g. 'v1_t1_basic' or 'v1_t1_intermediate')
        for (const [level, questions] of Object.entries(topic.levels || {})) {
          const levelKey = `${topic.id}_${level}`.toLowerCase();
          if (levelKey === clean) {
            return {
              id: `${topic.id}_${level}`,
              type: 'lp_quiz',
              title: `${topic.title} (${level.toUpperCase()})`,
              description: `Revise ${topic.title} at ${level.toUpperCase()} level with exam-targeted questions.`,
              questions: questions || []
            };
          }
        }
      }
    }
  }

  return null;
};
