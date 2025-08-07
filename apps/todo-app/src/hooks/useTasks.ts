import { useEffect, useState } from 'react'
import type { Task } from '.././types';


export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() }
    setTasks((prev) => [newTask, ...prev])
  }

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const getFilteredTasks = (filter: 'all' | 'active' | 'completed') => {
    return tasks.filter((task) => {
      if (filter === 'all') return true
      if (filter === 'active') return !task.completed
      return task.completed
    })
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getFilteredTasks,
  }
}
