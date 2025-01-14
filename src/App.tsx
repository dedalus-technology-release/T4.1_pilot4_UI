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
import { Dashboard } from "./pages/Dashboard";

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log("error", error);
      },
    }),
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
