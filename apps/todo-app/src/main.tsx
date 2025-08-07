import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import TodayView from './routes/TodayView'
import OverdueView from './routes/OverdueView'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/today" element={<TodayView />} />
        <Route path="/overdue" element={<OverdueView />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  </React.StrictMode>
)
