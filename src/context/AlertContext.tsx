import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AlertContext = createContext({});

interface AlertContextProviderProps {
  children: React.ReactNode;
}

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  return (
    <AlertContext.Provider value={{}}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
