import { useState } from 'react'
import DiscordTextGenerator from './Components/ColoredText';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <DiscordTextGenerator/>
  )
}

export default App
