import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

function App() {
  return (
   <Router>
      <ToastContainer/>
      <Navbar/>
      <div className="app-content">
        <Sidebar/>

        <Routes>
        <Route path='/add' element={<Add/>}/>
        <Route path='/list' element = {<List/>}/>
        <Route path='/orders' element = {<Orders/>}/>
      </Routes>
      </div>
   </Router>
  )
}

export default App