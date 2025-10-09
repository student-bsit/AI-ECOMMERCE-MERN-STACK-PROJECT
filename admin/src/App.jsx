import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import List from './pages/List'
import Orders from './pages/Orders'
import Add from './pages/Add'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const { adminData } = useContext(adminDataContext)

  return (
    <>
    <ToastContainer />
      {!adminData ? <Login /> : <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/lists' element={<List />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </>
      }

    </>
  )
}

export default App
