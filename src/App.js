import React from "react";
// import Login from "./module/login";
import { Routes, Route } from "react-router-dom";
import CreateNewPass from "./pages/auth/create_new_pass";
import ForPass from "./pages/auth/for_pass";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Cart from "./pages/cart";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/detail";
import ProtectRoutes from "./routes/protectRoutes";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<ForPass />} />
        <Route path="/reset-password/:id/:token" element={<CreateNewPass />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoutes>
              <Dashboard />
            </ProtectRoutes>
          }
        />
        <Route
          path="/dashboard/detail/:uuid"
          element={
            <ProtectRoutes>
              <Detail />
            </ProtectRoutes>
          }
        />
        <Route
          path="/keranjang"
          element={
            <ProtectRoutes>
              <Cart />
            </ProtectRoutes>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

//JSX harus dibungkus dalam satu element parent

export default App;
