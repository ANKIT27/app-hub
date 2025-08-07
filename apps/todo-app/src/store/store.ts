import { create } from 'zustand'
import type { Task } from '.././types'

type Store = {
  filter: 'all' | 'active' | 'completed'
  setFilter: (filter: Store['filter']) => void
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
}

export const useStore = create<Store>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  editingTask: null,
  setEditingTask: (task) => set({ editingTask: task }),
}))
