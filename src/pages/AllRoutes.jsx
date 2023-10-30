import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { SignUp } from './SignUp'
import { Login } from './Login'
import Protected from '../Components/Protected'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
          <Protected >
            <Dashboard />
          </Protected>
           
          
        }  ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
    </Routes>
  )
}
