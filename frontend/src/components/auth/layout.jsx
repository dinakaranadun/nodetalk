import React from 'react'
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
