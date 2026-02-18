import React, { useState } from 'react';

const LessonViewer = ({ lesson }) => {
    const [complete, setComplete] = useState(false);

    return (
        <div className="quiz-container">
            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                LESSON • {lesson.title}
            </div>

            <div className="question-card">
                <div className="question-text" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                    {lesson.title}
                </div>

                <div
                    className="lesson-content"
                    style={{ lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-primary)' }}
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                />

                <div className="controls" style={{ marginTop: '40px' }}>
                    <button
                        className="btn-primary"
                        style={{
                            background: complete ? 'var(--accent-success)' : 'var(--accent-blue)',
                            width: '100%'
                        }}
                        onClick={() => setComplete(!complete)}
                    >
                        {complete ? '✓ Completed' : 'Mark as Complete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonViewer;
