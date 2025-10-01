import React from 'react'
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from "./Components/AdminPanel"

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/AdminPanel" element={<AdminPanel/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
