import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/home'
import AuthLayout from './components/auth/layout'
import SignIn from './pages/auth/signIn'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='signIn' element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App
