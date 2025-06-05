import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/Layout";

import AlertContextProvider from "./context/AlertContext";
import AuthProvider from "./context/AuthProvider";

import AppRouter from "./routes/AppRouter"
;
import { queryClient } from "./api/queryClient";

import "./App.scss";

function App() {
  return (
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
  );
}

export default App;
