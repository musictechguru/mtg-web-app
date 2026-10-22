import React, { useState, useMemo } from 'react';
import { Share2, Copy, Check, Calendar, CheckSquare, Square, Link as LinkIcon, Sparkles, X, BookOpen, Send } from 'lucide-react';
import { TIMETABLE_BLOCKS } from './TimetableBuilder/timetableData';

const ASSIGNMENTS_STORAGE_KEY = 'mtg_teacher_assignments';

export default function AssignmentModal({ initialBlockId = 'block-1', onClose, onAssignCreated }) {
  const [selectedBlockId, setSelectedBlockId] = useState(initialBlockId);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Default due date to +7 days
  const defaultDueDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  }, []);

  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [customNote, setCustomNote] = useState('Please complete these tasks and aim for at least 75% on quizzes.');

  const currentBlock = useMemo(() => {
    return TIMETABLE_BLOCKS.find(b => b.id === selectedBlockId) || TIMETABLE_BLOCKS[0];
  }, [selectedBlockId]);

  // Selected tasks checklist
  const [selectedTaskIds, setSelectedTaskIds] = useState(() => {
    // Default select first 3 activities
    const acts = currentBlock.resources?.inAppActivities || [];
    return acts.slice(0, 3).map(a => a.id);
  });

  // When block changes, update default selected tasks
  const handleBlockChange = (newBlockId) => {
    setSelectedBlockId(newBlockId);
    const blk = TIMETABLE_BLOCKS.find(b => b.id === newBlockId);
    if (blk) {
      const acts = blk.resources?.inAppActivities || [];
      setSelectedTaskIds(acts.slice(0, 3).map(a => a.id));
    }
  };

  const toggleTask = (taskId) => {
    setSelectedTaskIds(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  // Generate Direct URL
  const assignmentUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mtg-revision.vercel.app';
    const tasksParam = encodeURIComponent(selectedTaskIds.join(','));
    return `${origin}/?assignment=${currentBlock.id}&due=${dueDate}&tasks=${tasksParam}`;
  }, [currentBlock, dueDate, selectedTaskIds]);

  // Formatted Classroom Post Text
  const classroomPostText = useMemo(() => {
    const selectedActs = (currentBlock.resources?.inAppActivities || []).filter(a => selectedTaskIds.includes(a.id));
    const taskList = selectedActs.map((a, i) => `${i + 1}. ${a.title}`).join('\n');
    const formattedDue = new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    return `🎵 Music Technology Homework: Block ${currentBlock.blockNumber} — ${currentBlock.title}
📅 Due Date: ${formattedDue}
📝 Phase: ${currentBlock.phase} (${currentBlock.weeksLabel})

🎯 Assigned Tasks:
${taskList || '• Complete block practical tasks and review facts.'}

💬 Teacher Note:
${customNote}

👉 Click here to launch your assignment directly in the MTG App:
${assignmentUrl}`;
  }, [currentBlock, dueDate, selectedTaskIds, customNote, assignmentUrl]);

  // Copy Direct Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(assignmentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    saveAssignmentToHistory();
  };

  // Copy Formatted Classroom Post
  const handleCopyPost = () => {
    navigator.clipboard.writeText(classroomPostText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
    saveAssignmentToHistory();
  };

  // Save Assignment to teacher history
  const saveAssignmentToHistory = () => {
    try {
      const existingRaw = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const newAssignment = {
        id: `asg_${Date.now()}`,
        blockId: currentBlock.id,
        blockNumber: currentBlock.blockNumber,
        title: currentBlock.title,
        dueDate,
        tasks: selectedTaskIds,
        createdAt: new Date().toISOString(),
        url: assignmentUrl
      };
      const updated = [newAssignment, ...existing.filter(a => a.blockId !== currentBlock.id)].slice(0, 20);
      localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(updated));
      if (onAssignCreated) onAssignCreated(newAssignment);
    } catch (e) {
      console.warn('Failed to save teacher assignment:', e);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
            }}>
              <Share2 size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                One-Click Weekly Homework Assigner
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                Generate direct links and formatted announcements for your class.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          {/* Block Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
              Select Scheme of Work Block
            </label>
            <select
              value={selectedBlockId}
              onChange={(e) => handleBlockChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {TIMETABLE_BLOCKS.map(b => (
                <option key={b.id} value={b.id}>
                  Block {b.blockNumber}: {b.title} ({b.phase})
                </option>
              ))}
            </select>
          </div>

          {/* Due Date & Teacher Note Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
                Due Date
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#1e293b',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
                Teacher Instructions
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Aim for 75%+ before our lesson"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: '#1e293b',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Task Selection Checklist */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase' }}>
              <span>Assign Activities from this Block</span>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{selectedTaskIds.length} Selected</span>
            </label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '220px',
              overflowY: 'auto',
              background: '#090d16',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              {(currentBlock.resources?.inAppActivities || []).map(act => {
                const isSelected = selectedTaskIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleTask(act.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isSelected ? 'rgba(56, 189, 248, 0.3)' : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ color: isSelected ? '#38bdf8' : '#64748b' }}>
                      {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: isSelected ? '#fff' : '#94a3b8', flex: 1, fontWeight: isSelected ? 600 : 400 }}>
                      {act.title}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#64748b'
                    }}>
                      {act.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generated Shareable Links Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            padding: '18px 20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
              <LinkIcon size={16} /> Direct Assignment URL
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#090d16',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}>
              <span style={{
                flex: 1,
                fontSize: '0.82rem',
                color: '#94a3b8',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {assignmentUrl}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <button
              onClick={handleCopyLink}
              style={{
                background: copiedLink ? '#10b981' : 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                color: '#fff',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedLink ? <Check size={18} /> : <Copy size={18} />}
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Direct Student Link'}</span>
            </button>

            <button
              onClick={handleCopyPost}
              style={{
                background: copiedText ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedText ? <Check size={18} /> : <Send size={18} />}
              <span>{copiedText ? 'Classroom Post Copied!' : 'Copy Classroom Post'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
