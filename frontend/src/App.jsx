import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
      </Routes>
  

  )
}

export default App
