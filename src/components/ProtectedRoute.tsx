import { ReactNode } from "react";

import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <CircularProgress/>;
  }
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
