import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectIsAuthenticated,selectUser } from "../store/auth/authSlice";

const ProtectedRoutes = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/signIn" replace />;
  }

  return <Outlet />;
};

const AuthRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);


  if (isAuthenticated && user) {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
};


export{AuthRoutes};
export default ProtectedRoutes;