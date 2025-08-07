import { TaskCard } from './TaskCard'
import type { Task } from '.././types';

type Props = {
  tasks: Task[]
  title: string
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newTask: Partial<Task>) => void
}

export default function TaskListView({ tasks, title, onToggle, onDelete, onEdit }: Props) {
  return (
    <div className="task-list-view">
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  )
}