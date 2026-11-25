import React from 'react';

// Embeds one tool from the standalone Student Toolkit (public/student-toolkit.html).
// ?embed=1 hides the toolkit's own sidebar; the #hash picks the tool.
export default function StudioTrainerFrame({ tool, title, onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: 'calc(100dvh - 80px)', minHeight: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onBack}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>{title}</h1>
      </div>
      <iframe
        key={tool}
        title={title}
        src={`/student-toolkit.html?embed=1#${tool}`}
        allow="autoplay; fullscreen"
        style={{ flex: 1, width: '100%', border: 'none', borderRadius: '16px', background: '#0f172a' }}
      />
    </div>
  );
}
