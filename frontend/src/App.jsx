import React from 'react'
import { Route, Routes } from 'react-router'
import  { Toaster } from 'react-hot-toast';
import Home from './pages/home'
import AuthLayout from './components/auth/layout'
import SignIn from './pages/auth/signIn'
import SignUp from './pages/auth/signUp'
import { useDispatch } from 'react-redux';
import { useCheckUserQuery } from './store/auth/authSliceApi';
import { useEffect } from 'react';
import { clearCredentials, setCredentials } from './store/auth/authSlice';
import ProtectedRoutes, { AuthRoutes } from './utils/protectedRoutes';
import Chats from './pages/chat/chats';

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useCheckUserQuery();

   useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCredentials(data.user));
    } else if (!isLoading && (isError || !data?.user)) {
      dispatch(clearCredentials());
    }
  }, [data, isLoading, isError, isSuccess, dispatch]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>

        {/* Auth routes - logged in users will be redirected away */}
        <Route element={<AuthRoutes />}>
          <Route path='/auth' element={<AuthLayout/>}>
            <Route path='signIn' element={<SignIn/>}/>
            <Route path='signUp' element={<SignUp/>}/>
          </Route>
        </Route>
        
        {/* Protected routes - only authenticated users can access */}
        <Route element={<ProtectedRoutes/>}>
          <Route path='/chats' element={<Chats/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
