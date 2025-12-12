import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectIsAuthenticated, selectIsLoading, selectUser } from "../store/auth/authSlice";

const ProtectedRoutes = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/signIn" replace />;
  }

  return <Outlet />;
};

const AuthRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};


export{AuthRoutes};
export default ProtectedRoutes;