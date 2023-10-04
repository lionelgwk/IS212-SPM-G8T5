import { useContext, useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AppliedPage from "./pages/AppliedPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import CreateRolePage from "./pages/CreateRolePage";
import NoPermissionPage from "./pages/NoPermissionPage";
import StaffNavBar from "./components/StaffNavBar";
import ManagerNavBar from "./components/ManagerNavBar";
import ManagerHomePage from "./pages/ManagerHomePage";
import StaffHomePage from "./pages/StaffHomePage";
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
