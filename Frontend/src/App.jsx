import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-gray-700'>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route 
        path='/admin'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />
      </Routes>

      {/* <Dashboard /> */}
    </div>
  )
}

export default App