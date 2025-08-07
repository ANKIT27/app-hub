import React, { useState } from 'react'
import './App.css'
import { useTasks } from './hooks/useTasks'
import type { Task } from './types';

import { TaskCard } from './components/TaskCard'
import { TaskForm } from './components/TaskForm'

const App: React.FC = () => {
  const {  addTask, updateTask, deleteTask, getFilteredTasks } = useTasks()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleSave = (data: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data)
      setEditingTask(null)
    } else {
      addTask(data)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo"><img src="/icon.png" alt="to do image" title='to doooo' style={{width: '30%', height: 'auto'}}/></div>
        <h1>{editingTask ? 'Edit Task' : 'Add New Task'}</h1>

        <TaskForm
          onSave={handleSave}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

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
        {getFilteredTasks(filter).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={(id) => updateTask(id, { completed: !task.completed })}
            onDelete={deleteTask}
            onEdit={setEditingTask}
          />
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
