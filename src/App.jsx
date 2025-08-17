import { useState } from 'react'
import TopStories from './TopStories';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* ...existing code... */}
      <TopStories />
    </>
  )
}

export default App
