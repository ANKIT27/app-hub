import React, { useState, useEffect } from 'react'
import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, updates: Partial<Task>) => void
}

export const TaskCard: React.FC<Props> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDue, setEditDue] = useState(task.due === 'No deadline' ? '' : task.due)
  const [editCategory, setEditCategory] = useState(task.category)

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

  return (
    <div className="task-card">
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title-input"
            autoFocus
          />
        ) : (
          <h3 className={task.completed ? 'done' : ''}>{task.title}</h3>
        )}
      </div>

      <div className="task-meta">
        {isEditing ? (
          <>
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>

              
            </select>

            <input
              type="date"
              value={editDue}
              onChange={(e) => setEditDue(e.target.value)}
            />
          </>
        ) : (
          <>
            <span>{task.category}</span>
            <span>Due: {task.due === 'No deadline' ? '—' : task.due}</span>
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleSave}>💾 Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>✎ Edit</button>
        )}
        <button onClick={() => onDelete(task.id)}>🗑 Delete</button>
      </div>
    </div>
  )
}
