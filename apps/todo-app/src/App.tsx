// src/App.tsx
import React, { useEffect } from 'react'
import './App.css'
import { useTasks } from './hooks/useTasks'
import type { Task } from './types';
import { TaskCard } from './components/TaskCard'
import { TaskForm } from './components/TaskForm'
import { useStore } from './store/store'
import { Link } from 'react-router-dom'

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, reorderTasks, getFilteredTasks } = useTasks()
  const { filter, setFilter, editingTask, setEditingTask } = useStore()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  // when user clicks save on TaskForm
  const handleSave = (data: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data)
      setEditingTask(null)
    } else {
      addTask(data)
    }
  }

  // Get tasks filtered (preserves order from tasks state)
  const visibleTasks = getFilteredTasks(filter)

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return

    // Find indexes in the global tasks array
    const oldIndex = tasks.findIndex(t => t.id === active.id)
    const newIndex = tasks.findIndex(t => t.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderTasks(oldIndex, newIndex)
    }
  }

  // Ensure visibleTasks order is in sync — no local taskOrder state needed
  useEffect(() => {
    // optional side-effects when tasks or filter change
  }, [tasks, filter])

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="/icon.png" alt="to do image" title="to doooo" style={{ width: '30%', height: 'auto' }} />
        </div>

        <h1>{editingTask ? 'Edit Task' : 'Add New Task'}</h1>

        <TaskForm onSave={handleSave} editingTask={editingTask} onCancel={() => setEditingTask(null)} />

        <div className="tabs">
          {(['all', 'active', 'completed'] as const).map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={filter === t ? 'active' : ''}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="task-grid">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={visibleTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {visibleTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={(id) => updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed })}
                onDelete={deleteTask}
                onEdit={(id, updates) => updateTask(id, updates)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <nav className="nav-links">
            <Link to="/">All</Link>
            <Link to="/today">Today</Link>
            <Link to="/overdue">Overdue</Link>
          </nav>
        </div>

        <div className="logo">
          <img src="/icon.png" alt="to do image" title="to doooo" style={{ width: '3%', height: 'auto' }} />
        </div>

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
