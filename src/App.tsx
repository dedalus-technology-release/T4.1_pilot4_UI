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

import AppNavbar from "./components/AppNavbar";
// import { Dashboard } from "./pages/TitoGarzoniBuildingPage";
import { MaddalenaBuildingPage } from "./pages/MaddalenaBuildingPage";
import { TitoGarzoniBuildingPage } from "./pages/TitoGarzoniBuildingPage";
import AlertContextProvider from "./context/AlertContext";
import useAlertToast from "./hooks/useAlertToast";
import Login from "./pages/Login";

function App() {
  const { notifyError } = useAlertToast();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log("errorrrrrr", error);
        notifyError(error.message);
      },
    }),
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AlertContextProvider>
            <AppNavbar />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />}></Route>
              {/* <Route path="/tito-garzoni-house" element={<TitoGarzoniBuildingPage />}></Route> */}
              <Route
                path="/tito-garzoni-house"
                element={<TitoGarzoniBuildingPage />}
              ></Route>
              <Route
                path="/maddalena-house"
                element={<MaddalenaBuildingPage />}
              ></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </AlertContextProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
