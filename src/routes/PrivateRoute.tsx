import { ReactNode } from "react";
import { Navigate } from "react-router-dom";



import useAuth from "../hooks/useAuth";
import CircularProgress from "../components/CircularProgress";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;

};

export default PrivateRoute;
