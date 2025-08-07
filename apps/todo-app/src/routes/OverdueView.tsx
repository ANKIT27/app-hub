import { useTasks } from '../hooks/useTasks'
import { TaskCard } from '../components/TaskCard'

export default function OverdueView() {
  const {
    tasks,
    updateTask,
    deleteTask,
  } = useTasks()

  const today = new Date().toISOString().split('T')[0]

  const overdueTasks = tasks.filter(
    (task) =>
      task.due !== 'No deadline' &&
      task.due < today &&
      !task.completed
  )

  return (
    <section>
      <h2>Overdue Tasks</h2>
      <main className="task-grid">
        {overdueTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={(id) =>
              updateTask(id, { completed: !task.completed })
            }
            onDelete={deleteTask}
            onEdit={(id, updates) => updateTask(id, updates)}
          />
        ))}
      </main>
    </section>
  )
}
