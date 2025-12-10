import React from 'react'
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div
      className="
        min-h-screen flex justify-center items-center 
        bg-gradient-to-br from-blue-500 to-purple-700
      "
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
