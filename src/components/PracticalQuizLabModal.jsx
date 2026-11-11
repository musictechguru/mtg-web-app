import React from 'react';

export const PRACTICAL_TEST_TOPICS = [
  {
    topicNum: 1,
    title: "Topic 1: Fundamentals & Recording",
    badges: ["🔌 Voltage Hierarchy Drag & Drop", "🔌 Acoustic-to-Digital Flow"],
    p1Id: "quiz-topic-1_p1",
    p2Id: "quiz-topic-1_p2",
    description: "Signal levels (Mic, Hi-Z, Line, Speaker) and studio recording signal chain."
  },
  {
    topicNum: 2,
    title: "Topic 2: Microphones",
    badges: ["🧭 Cardioid Null Rejection", "🔌 3:1 Distance Rule Setup"],
    p1Id: "quiz-topic-2_p1",
    p2Id: "quiz-topic-2_p2",
    description: "Polar patterns, 180° rear rejection, multi-micing comb filtering prevention."
  },
  {
    topicNum: 3,
    title: "Topic 3: Synthesis",
    badges: ["🔌 Subtractive Flow (VCO-VCF-VCA)", "🌊 Sine Wave ID", "🌊 Sawtooth Wave ID"],
    p1Id: "quiz-topic-3_p1",
    p2Id: "quiz-topic-3_p2",
    description: "Synthesizer signal routing, harmonic spectrum ear training, filter cutoff."
  },
  {
    topicNum: 4,
    title: "Topic 4: Sampling",
    badges: ["🔌 Zero-Crossing Truncation Workflow", "🎹 Root Note Transposition"],
    p1Id: "quiz-topic-4_p1",
    p2Id: "quiz-topic-4_p2",
    description: "Sample editing, pre-transient truncation, zero-crossing points, keyzones."
  },
  {
    topicNum: 5,
    title: "Topic 5: Dynamic Processing",
    badges: ["🎧 A/B Compression Audio Listening", "🔌 Sidechain / VCA Routing"],
    p1Id: "quiz-topic-5_p1",
    p2Id: "quiz-topic-5_p2",
    description: "Electric guitar dynamic clamping, threshold/ratio detector architecture."
  },
  {
    topicNum: 6,
    title: "Topic 6: EQ & Stereo",
    badges: ["🎚️ 5kHz Presence Rotary Slider", "🎧 Mix Mud A/B Listening"],
    p1Id: "quiz-topic-6_p1",
    p2Id: "quiz-topic-6_p2",
    description: "Interactive vocal presence frequency matching, 300Hz low-mid mud attenuation."
  },
  {
    topicNum: 7,
    title: "Topic 7: FX & Processors",
    badges: ["🎧 A/B Delay Ear Training", "🎧 A/B Reverb RT60 Ear Training"],
    p1Id: "quiz-topic-7_p1",
    p2Id: "quiz-topic-7_p2",
    description: "Time-based effects, discrete echo feedback vs diffuse reverberant decay."
  },
  {
    topicNum: 8,
    title: "Topic 8: Mastering",
    badges: ["🔌 5-Stage Mastering Signal Chain", "🔊 True Peak Brickwall Limiting"],
    p1Id: "quiz-topic-8_p1",
    p2Id: "quiz-topic-8_p2",
    description: "Linear phase EQ, multiband compression, stereo imaging, limiter, dither."
  },
  {
    topicNum: 9,
    title: "Topic 9: Acoustics",
    badges: ["🔌 Studio Room Acoustic Treatment Plan", "📐 Modal Control & Bass Traps"],
    p1Id: "quiz-topic-9_p1",
    p2Id: "quiz-topic-9_p2",
    description: "Corner bass trapping, first-reflection side panels, rear diffusion."
  },
  {
    topicNum: 10,
    title: "Topic 10: Equipment",
    badges: ["🔌 Studio Patchbay Insert Routing", "🎛️ Outboard Hardware Loop"],
    p1Id: "quiz-topic-10_p1",
    p2Id: "quiz-topic-10_p2",
    description: "Console channel insert sends, patchbay normalled routing, outboard VCA loops."
  }
];

const PracticalQuizLabModal = ({ isOpen, onClose, onLaunchQuiz }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 11, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0F172A',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 26px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)'
              }}
            >
              🧪
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px' }}>
                  TEST HARNESS
                </span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  10 Topics • 20 Upgraded Quizzes
                </span>
              </div>
              <h2 style={{ margin: '4px 0 0 0', color: '#fff', fontSize: '1.35rem', fontWeight: 800 }}>
                Practical Quiz Test Lab (Test 1-by-1)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#94a3b8',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.2s'
            }}
          >
            ✕
          </button>
        </div>

        {/* Subheader Instruction */}
        <div style={{ padding: '12px 26px', background: 'rgba(56, 189, 248, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.85rem', color: '#cbd5e1' }}>
          Select any topic below to test the converted practical question formats (<strong>Drag &amp; Drop Signal Chains</strong>, <strong>A/B Audio Ear Training</strong>, <strong>Frequency Sliders</strong>, and <strong>Waveform Listeners</strong>).
        </div>

        {/* Scrollable Topic List */}
        <div style={{ padding: '20px 26px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {PRACTICAL_TEST_TOPICS.map((topic) => (
            <div
              key={topic.topicNum}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'border-color 0.2s, background 0.2s'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>
                    {topic.title}
                  </h3>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '0.82rem' }}>
                  {topic.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {topic.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: '#7dd3fc',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLaunchQuiz(topic.p1Id);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                    transition: 'all 0.2s'
                  }}
                >
                  Test Part 1 ↗
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLaunchQuiz(topic.p2Id);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Test Part 2 ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 26px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.9)'
          }}
        >
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Tip: You can also launch any quiz directly from the sidebar under <strong>Stage 2: Topic Mastery Quizzes</strong>.
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            Close Lab
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticalQuizLabModal;
