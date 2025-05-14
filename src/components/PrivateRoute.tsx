import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import CircularProgress from "./CircularProgress";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }
  // if (!isAuthenticated) return <Navigate to="/login" />;
  return isAuthenticated ? children : <Navigate to="/login" />;

  //   return children;
};

export default PrivateRoute;
