import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from '../components/TaskCard'

const mockTask = {
  id: 1,
  title: 'Test task',
  category: 'Work',
  due: '2025-08-10',
  completed: false,
}

test('renders task title', () => {
  render(<TaskCard task={mockTask} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />)
  expect(screen.getByText('Test task')).toBeInTheDocument()
})
 