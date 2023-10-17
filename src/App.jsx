
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'

function App() {

  return (
    <>
      <div className='border-2 border-emerald-300'>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
