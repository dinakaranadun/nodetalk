import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import  { Toaster } from 'react-hot-toast';
import Home from './pages/home'
import AuthLayout from './components/auth/layout'
import SignIn from './pages/auth/signIn'
import SignUp from './pages/auth/signUp'
import { useDispatch } from 'react-redux';
import { useCheckUserQuery } from './store/auth/authSliceApi';
import { useEffect } from 'react';
import { clearCredentials,  setCredentials } from './store/auth/authSlice';
import ProtectedRoutes, { AuthRoutes } from './utils/protectedRoutes';
import Chats from './pages/chat/chats';
import NotFound from './pages/notFound';

const App = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useCheckUserQuery();

  const isInitializing = isLoading && !data ;

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCredentials(data.user));
    } else if (isError) {
      dispatch(clearCredentials());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthRoutes />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/signIn" replace />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/chats" element={<Chats />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App