import TaskListView from '../components/TaskListView'
import { useTasks } from '../hooks/useTasks'

const TodayView = () => {
  const { tasks, updateTask, deleteTask } = useTasks()
  const today = new Date().toISOString().split('T')[0]
  const todayTasks = tasks.filter(task => task.due === today)

  return (
    <TaskListView
      title="Today's Tasks"
      tasks={todayTasks}
      onToggle={(id) => updateTask(id, { completed: true })}
      onDelete={deleteTask}
      onEdit={updateTask}
    />
  )
}

export default TodayView
