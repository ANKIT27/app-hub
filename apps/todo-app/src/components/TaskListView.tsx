import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { TaskCard } from './TaskCard'
import { useState } from 'react'
import type { Task } from '../types'

type Props = {
  title: string
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, updates: Partial<Task>) => void
}

export const TaskListView: React.FC<Props> = ({
  title,
  tasks,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [orderedTasks, setOrderedTasks] = useState(tasks)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = orderedTasks.findIndex(t => t.id === active.id)
      const newIndex = orderedTasks.findIndex(t => t.id === over.id)
      const newOrder = arrayMove(orderedTasks, oldIndex, newIndex)
      setOrderedTasks(newOrder)
      // Optional: persist order to localStorage or backend
    }
  }

  return (
    <section className="task-section">
      <h2>{title}</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <main className="task-grid">
            {orderedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </main>
        </SortableContext>
      </DndContext>
    </section>
  )
}
