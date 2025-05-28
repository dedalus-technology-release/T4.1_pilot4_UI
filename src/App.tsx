import "./App.scss";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Layout from "./components/Layout";

import AlertContextProvider from "./context/AlertContext";
import AuthProvider from "./context/AuthProvider";

import useAlertToast from "./hooks/useAlertToast";

import AppRouter from "./routes/AppRouter";

function App() {
  const { notifyError } = useAlertToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,

      }
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        if (error.status === 401) {
          window.location.href = "/login";
        }

        notifyError(error.message);
      },
    }),
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Layout>
              <AlertContextProvider>
                <AppRouter />
              </AlertContextProvider>
            </Layout>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
