import React from 'react'
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from "./Components/AdminPanel"
import ShopCategroy from './Components/ShopCategroy'
import ContextProvider from './Context/ContextProvider'

function App() {
  return (
    <div>
      <Navbar/>
      <ContextProvider>
        <Routes>
        <Route path="/AdminPanel" element={<AdminPanel/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path='/shop/:category' element={<ShopCategroy/>}/>
      </Routes>
      </ContextProvider>
    </div>
  )
}

export default App
