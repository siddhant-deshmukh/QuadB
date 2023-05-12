import { useState } from 'react'
import NavBar from './components/NavBar'
import SummeryBar from './components/SummeryBar'
import Table from './components/Table'

function App() {
  const [count, setCount] = useState(0)
  const [isDark , setIsDark] = useState(true)
  
  return (
    <div className={`${(isDark)?'dark':''}`}>
      <div className='dark:bg-[#191d28] h-screen flex flex-col space-y-10'>
        <NavBar isDark={isDark} setIsDark={setIsDark}/>
        <SummeryBar />
        <Table />
      </div>
    </div>
  )
}

export default App
