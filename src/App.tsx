import "./App.scss";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AppNavbar from "./components/AppNavbar";
// import { Dashboard } from "./pages/TitoGarzoniBuildingPage";
import { MaddalenaBuildingPage } from "./pages/MaddalenaBuildingPage";
import { TitoGarzoniBuildingPage } from "./pages/TitoGarzoniBuildingPage";
import AlertContextProvider from "./context/AlertContext";
import useAlertToast from "./hooks/useAlertToast";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  // const navigate = useNavigate();
  const { notifyError } = useAlertToast();
  const queryClient = new QueryClient({
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
            <AlertContextProvider>
              <AppNavbar />
              <Routes>
                <Route path="/" element={<Navigate to="/login" />}></Route>
                {/* <Route path="/tito-garzoni-house" element={<TitoGarzoniBuildingPage />}></Route> */}
                <Route
                  path="/tito-garzoni-house"
                  element={
                    <ProtectedRoute>
                      <TitoGarzoniBuildingPage />
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="/maddalena-house"
                  element={
                    <ProtectedRoute>
                      <MaddalenaBuildingPage />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="*"
                  element={<Navigate to="/tito-garzoni-house" />}
                />
              </Routes>
            </AlertContextProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
