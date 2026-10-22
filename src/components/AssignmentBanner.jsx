import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, CheckCircle2, Clock, ArrowRight, Play, BookOpen, Sparkles, Check, X } from 'lucide-react';
import { TIMETABLE_BLOCKS } from './TimetableBuilder/timetableData';

const STUDENT_ASSIGNMENT_KEY = 'mtg_current_assignment';
const ASSIGNMENT_COMPLETIONS_KEY = 'mtg_assignment_completed_tasks';

export default function AssignmentBanner({ onLaunchTask, onDismiss }) {
  const [assignment, setAssignment] = useState(null);
  const [completedTaskIds, setCompletedTaskIds] = useState(() => {
    try {
      const raw = localStorage.getItem(ASSIGNMENT_COMPLETIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Check URL parameters or local storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const assignmentBlockId = params.get('assignment') || params.get('hw');
    const dueDate = params.get('due') || null;
    const tasksRaw = params.get('tasks') || null;

    if (assignmentBlockId) {
      const block = TIMETABLE_BLOCKS.find(b => b.id === assignmentBlockId);
      if (block) {
        let assignedTaskIds = [];
        if (tasksRaw) {
          try {
            assignedTaskIds = decodeURIComponent(tasksRaw).split(',').filter(Boolean);
          } catch {}
        }
        if (assignedTaskIds.length === 0) {
          assignedTaskIds = (block.resources?.inAppActivities || []).slice(0, 3).map(a => a.id);
        }

        const asgObj = {
          blockId: block.id,
          blockNumber: block.blockNumber,
          title: block.title,
          phase: block.phase,
          dueDate,
          taskIds: assignedTaskIds
        };
        setAssignment(asgObj);
        try {
          localStorage.setItem(STUDENT_ASSIGNMENT_KEY, JSON.stringify(asgObj));
        } catch {}
        return;
      }
    }

    // Fallback to localStorage
    try {
      const saved = localStorage.getItem(STUDENT_ASSIGNMENT_KEY);
      if (saved) {
        setAssignment(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const currentBlock = useMemo(() => {
    if (!assignment) return null;
    return TIMETABLE_BLOCKS.find(b => b.id === assignment.blockId) || null;
  }, [assignment]);

  if (!assignment || !currentBlock) return null;

  const assignedTasks = (currentBlock.resources?.inAppActivities || []).filter(a =>
    assignment.taskIds?.includes(a.id)
  );

  const completedCount = assignedTasks.filter(t => completedTaskIds.includes(t.id)).length;
  const totalCount = assignedTasks.length || 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleTaskCompleted = (taskId, e) => {
    if (e) e.stopPropagation();
    const updated = completedTaskIds.includes(taskId)
      ? completedTaskIds.filter(id => id !== taskId)
      : [...completedTaskIds, taskId];
    setCompletedTaskIds(updated);
    try {
      localStorage.setItem(ASSIGNMENT_COMPLETIONS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleDismiss = () => {
    try {
      localStorage.removeItem(STUDENT_ASSIGNMENT_KEY);
    } catch {}
    setAssignment(null);
    if (onDismiss) onDismiss();
  };

  const formattedDueDate = assignment.dueDate
    ? new Date(assignment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Upcoming Lesson';

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      borderRadius: '18px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Banner Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            📌 Assigned Weekly Homework
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
            {assignment.phase}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#f87171',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            <Calendar size={14} />
            <span>Due: {formattedDueDate}</span>
          </div>

          <button
            onClick={handleDismiss}
            title="Dismiss Assignment"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Title & Progress Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
          Block {currentBlock.blockNumber}: {currentBlock.title}
        </h3>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: progressPercent === 100 ? '#10b981' : '#38bdf8' }}>
          {completedCount} of {totalCount} Tasks Done ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '8px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: progressPercent === 100
            ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
            : 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
          borderRadius: '4px',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Tasks List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {assignedTasks.map((task) => {
          const isDone = completedTaskIds.includes(task.id);
          return (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <button
                  onClick={(e) => toggleTaskCompleted(task.id, e)}
                  title={isDone ? "Mark incomplete" : "Mark completed"}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    background: isDone ? '#10b981' : 'transparent',
                    border: `1.5px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.3)'}`,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {isDone && <Check size={14} strokeWidth={3} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: isDone ? '#94a3b8' : '#f1f5f9',
                    textDecoration: isDone ? 'line-through' : 'none'
                  }}>
                    {task.title}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onLaunchTask && onLaunchTask(task)}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                }}
              >
                <span>Launch</span>
                <Play size={10} fill="#fff" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
