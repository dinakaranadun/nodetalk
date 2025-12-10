import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/home'
import AuthLayout from './components/auth/layout'
import SignIn from './pages/auth/signIn'
import SignUp from './pages/auth/signUp'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='signIn' element={<SignIn/>}/>
        <Route path='signUp' element={<SignUp/>}/>
      </Route>
    </Routes>
  )
}

export default App
