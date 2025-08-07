import TaskListView from '../components/TaskListView'
import { useTasks } from '../hooks/useTasks'

const OverdueView = () => {
  const { tasks, updateTask, deleteTask } = useTasks()
  const today = new Date().toISOString().split('T')[0]

  const overdueTasks = tasks.filter(task => task.due && task.due < today && !task.completed)

  return (
    <TaskListView
      title="Overdue Tasks"
      tasks={overdueTasks}
      onToggle={(id) => updateTask(id, { completed: true })}
      onDelete={deleteTask}
      onEdit={updateTask}
    />
  )
}

export default OverdueView
