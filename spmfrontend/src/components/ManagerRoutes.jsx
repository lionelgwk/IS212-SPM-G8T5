import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerNavBar from "./ManagerNavBar";
import ManagerHomePage from "../pages/ManagerHomePage";
import CreateRolePage from "../pages/CreateRolePage";
import AppliedPage from "../pages/AppliedPage";
import ProfilePage from "../pages/ManagerProfilePage";
import NoPermissionPage from "../pages/ManagerNoPermissionPage";
import ManagerListingDetailsPage from "../pages/ManagerListingDetailsPage";
import ManagerApplicantsPage from "../pages/ManagerApplicantsPage";

function ManagerRoutes() {
  return (
    <Routes>
      {/* Nested under '/manager' */}
      <Route path="/" exact element={<ManagerNavBar />}>
        <Route path="/" exact element={<ManagerHomePage />} />
        <Route path="/create" element={<CreateRolePage />} />
        <Route path="/applied" element={<AppliedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details/:id" element={<ManagerListingDetailsPage />} />
        <Route path="/details/:id/applicants" element={<ManagerApplicantsPage />} />

        <Route path="*" element={<NoPermissionPage />} />
        {/* Add more manager/director-specific routes here */}
      </Route>
    </Routes>
  );
}

export default ManagerRoutes;
