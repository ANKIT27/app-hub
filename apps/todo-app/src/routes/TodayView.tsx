import { useTasks } from '../hooks/useTasks'
import { TaskCard } from '../components/TaskCard'

export default function TodayView() {
  const {
    tasks,
    updateTask,
    deleteTask,
  } = useTasks()

  const today = new Date().toISOString().split('T')[0]

  const todayTasks = tasks.filter(task => task.due === today)

  return (
    <section>
      <h2 className="task-grid">Today's Tasks</h2>
      <main className="task-grid">
        {todayTasks.map((task) => (
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
