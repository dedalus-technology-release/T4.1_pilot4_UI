import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout, verifyUser } from "../api/user";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  logUserIn: () => void;
  logUserOut: () => void;
}

interface AuthContextPropsType {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthContextPropsType) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await verifyUser();
      if (res.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const logUserOut = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {}
  };

  const logUserIn = () => {
    setIsAuthenticated(true);
    navigate("/tito-garzoni-house");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        logUserIn,
        logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
