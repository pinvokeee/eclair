import { useState } from 'react'
import './App.css'
import { SummaryTable } from './features/summaryTable/SummaryTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <SummaryTable></SummaryTable>
  )
}

export default App
