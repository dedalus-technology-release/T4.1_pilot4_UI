import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { TitoGarzoniBuildingPage } from "../pages/TitoGarzoniBuildingPage";
import { MaddalenaBuildingPage } from "../pages/MaddalenaBuildingPage";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route
          path="/tito-garzoni-house"
          element={
            <PrivateRoute>
              <TitoGarzoniBuildingPage />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/maddalena-house"
          element={
            <PrivateRoute>
              <MaddalenaBuildingPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/tito-garzoni-house" />} />
      </Routes>
  );
};

export default AppRouter;
