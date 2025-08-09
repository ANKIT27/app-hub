// src/hooks/useTasks.ts
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import type { Task } from '../types'
import toast from 'react-hot-toast'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {    
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {    
      localStorage.setItem('tasks', JSON.stringify(tasks))
     }, [tasks])

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: Date.now() }
    setTasks(prev => [newTask, ...prev])

    toast.success('Task added')}

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) => prev.map(task => (task.id === id ? { ...task, ...updates } : task))) 
    toast.success('Task updated')  }

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id))
    toast('Task deleted', { icon: '🗑' })
  }

  // reorder by indices in the tasks array
  const reorderTasks = (oldIndex: number, newIndex: number) => {
    setTasks(prev => {
      // guard
      if (oldIndex < 0 || newIndex < 0 || oldIndex >= prev.length || newIndex >= prev.length) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const getFilteredTasks = (filter: 'all' | 'active' | 'completed') => {
    if (filter === 'all') return tasks
    if (filter === 'active') return tasks.filter(t => !t.completed)
    return tasks.filter(t => t.completed)
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    getFilteredTasks,
  }
}
