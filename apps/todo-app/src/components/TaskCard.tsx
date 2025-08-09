// src/components/TaskCard.tsx
import React, { useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, updates: Partial<Task>) => void
}

export const TaskCard: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDue, setEditDue] = useState(task.due === 'No deadline' ? '' : task.due)
  const [editCategory, setEditCategory] = useState(task.category)

  // dnd-kit sortable hook
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  useEffect(() => {
    if (isEditing) {
      setEditTitle(task.title)
      setEditDue(task.due === 'No deadline' ? '' : task.due)
      setEditCategory(task.category)
    }
  }, [isEditing, task])

  const handleSave = () => {
    const updates: Partial<Task> = {
      title: editTitle.trim() || task.title,
      due: editDue.trim() || 'No deadline',
      category: editCategory,
    }
    onEdit(task.id, updates)
    setIsEditing(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };


  return (
    <div ref={setNodeRef} style={style} className="task-card">
      {/* small drag handle — users click & hold here to drag */}
      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        style={{ cursor: 'grab', padding: '0 8px 0 0', display: 'inline-flex', alignItems: 'center' }}
      >
        ⠿
      </div>

      <div className="task-content" style={{ flex: 1 }}>
        <div className="task-header" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}

              className="edit-title-input"
              autoFocus
              style={{ flex: 1 }}
            />
          ) : (
            <h3 className={task.completed ? 'done' : ''} style={{ margin: 0 }}>{task.title}</h3>
          )}
        </div>

        <div className="task-meta" style={{ marginTop: 8 }}>
          {isEditing ? (
            <>
              <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} onKeyDown={handleKeyDown} style={{ marginRight: 8 }}>
                <option value="Health">Health</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              <input type="date" value={editDue} onChange={(e) => setEditDue(e.target.value)} onKeyDown={handleKeyDown} />
            </>
          ) : (
            <>
              <div style={{ color: '#aaa', fontSize: 13 }}>{task.category}</div>
              <div style={{ color: '#aaa', fontSize: 13 }}>Due: {task.due === 'No deadline' ? '—' : task.due}</div>
            </>
          )}
        </div>

        <div className="task-actions" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          {isEditing ? (
            <>
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => { setIsEditing(false); /* discarded edits*/ }}>✖ Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>✎ Edit</button>
          )}

          <button onClick={() => onDelete(task.id)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  )
}
