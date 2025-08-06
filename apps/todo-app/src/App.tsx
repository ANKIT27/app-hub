import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/icon.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://app-hub-six.vercel.app/" target="_blank">
          <img src={appLogo} className="logo" alt="App logo" />
        </a>

      </div>
      <h1>ToDoPlus</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          TODO :)      
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
    </>
  )
}

export default App
