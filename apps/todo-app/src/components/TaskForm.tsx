import React, { useEffect, useState } from 'react'
import type { Task } from '.././types';


type Props = {
  onSave: (task: Omit<Task, 'id'>) => void
  onCancel?: () => void
  editingTask?: Task | null
}


const CATEGORIES = ['Health', 'Personal', 'Shopping','Work' ,'Other']

export const TaskForm: React.FC<Props> = ({ onSave, onCancel, editingTask }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [due, setDue] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setCategory(editingTask.category)
      setDue(editingTask.due)
    } else {
      setTitle('')
      setCategory(CATEGORIES[0])
      setDue('')
    }
  }, [editingTask])

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave({ title: title.trim(), category, due: due || 'No deadline', completed: false })
    if (!editingTask) {
      setTitle('')
      setCategory(CATEGORIES[0])
      setDue('')
    }
  }

  return (
    <div className="input-row" style={{ flexDirection: 'column', gap: '1rem' }}>
      <input
        type="text"
        placeholder="What needs to be done today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>

        {editingTask && onCancel && (
          <button onClick={onCancel} style={{ background: '#333' }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
