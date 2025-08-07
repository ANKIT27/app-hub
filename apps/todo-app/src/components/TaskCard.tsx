import React from 'react'
import type { Task } from '.././types';


type Props = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, updates: Partial<Task>) => void

}

export const TaskCard: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <h3 className={task.completed ? 'done' : ''}>{task.title}</h3>
      </div>
      <div className="task-meta">
        <span>{task.category}</span>
        <span>Due: {task.due === 'No deadline' ? '—' : task.due}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => { const newTitle = prompt('Edit task title:', task.title)
        if (newTitle && newTitle !== task.title) {
          onEdit(task.id, { title: newTitle })}
       }}>✎</button>

        <button onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </div>
  )
}
