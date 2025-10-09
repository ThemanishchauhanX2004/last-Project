import React from 'react'
import Navbar from './Components/Navbar'
import Profile from './Components/Profile'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from "./Components/AdminPanel"
import ShopCategroy from './Components/ShopCategroy'
import ContextProvider from './Context/ContextProvider'
import Cart from './Components/Cart'

function App() {
  return (
    <div>
      <Navbar/>
      <ContextProvider>
        <Routes>
        <Route path="/AdminPanel" element={<AdminPanel/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path='/shop/:category' element={<ShopCategroy/>}/>
        <Route path='/Cart' element={<Cart/>}/>
      </Routes>
      </ContextProvider>
    </div>
  )
}

export default App
// Deepaksingh123456@
//  deepakb21200