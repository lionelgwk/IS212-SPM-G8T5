import { useContext, useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import NoPermissionPage from "./pages/NoPermissionPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ProtectedRoutes />} />
            <Route path="/noPermission" element={<NoPermissionPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
