import React, { useEffect, useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  category: string
  due: string
  completed: boolean
}

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health']

const App: React.FC = () => {
   const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [due, setDue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [editId, setEditId] = useState<number | null>(null)

  const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : []
  })

useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])


  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    return task.completed
  })

  const resetForm = () => {
    setTitle('')
    setCategory(CATEGORIES[0])
    setDue('')
    setEditId(null)
  }

  const addOrUpdateTask = () => {
    if (!title.trim()) return

    if (editId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editId
            ? { ...task, title: title.trim(), category, due }
            : task
        )
      )
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: title.trim(),
        category,
        due: due || 'No deadline',
        completed: false,
      }
      setTasks((prev) => [newTask, ...prev])
    }

    resetForm()
  }

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (task: Task) => {
    setTitle(task.title)
    setCategory(task.category)
    setDue(task.due)
    setEditId(task.id)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo" >
          <img src="/icon.png" alt="to do image" title='to doooo' style={{width: '30%', height: 'auto'}}/>
          </div>
        <h1>{editId ? 'Edit Task' : 'Add New Task'}</h1>

        <div className="input-row" style={{ flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="What needs to be done today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addOrUpdateTask()}
          />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />

            <button onClick={addOrUpdateTask}>
              {editId ? 'Update Task' : 'Add Task'}
            </button>

            {editId && (
              <button onClick={resetForm} style={{ background: '#333' }}>
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="tabs">
          {(['all', 'active', 'completed'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={filter === t ? 'active' : ''}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="task-grid">
        {filteredTasks.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.5 }}>No tasks found</p>
        )}

        {filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <h3 className={task.completed ? 'done' : ''}>{task.title}</h3>
            </div>
            <div className="task-meta">
              <span>{task.category}</span>
              <span>
                Due: {task.due === 'No deadline' ? '—' : task.due}
              </span>
            </div>
            <div className="task-actions">
              <button onClick={() => editTask(task)}>✎</button>
              <button onClick={() => deleteTask(task.id)}>🗑</button>
            </div>
          </div>
        ))}
      </main>

      <footer className="footer">
        <div className="logo"><img src="/icon.png" alt="to do image" title='to doooo' style={{width: '3%', height: 'auto'}}/></div>
        <div>© 2025 Ankit Kumar All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Resources</a>
          <a href="#">Legal</a>
          <a href="#">Connect</a>
          <span>🐦</span>
          <span>🔗</span>
          <span>☕</span>
        </div>
      </footer>
    </div>
  )
}

export default App
