import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffNavBar from "./StaffNavBar";
import StaffHomePage from "../pages/StaffHomePage";
import CreateRolePage from "../pages/CreateRolePage";
import AppliedPage from "../pages/AppliedPage";
import ProfilePage from "../pages/ProfilePage";
import ApplicantsPage from "../pages/ApplicantsPage";
import NoPermissionPage from "../pages/NoPermissionPage";

function StaffRoutes() {
  return (
    <Routes>
      {/* Nested under '/staff' */}
      <Route path="/" element={<StaffNavBar />}>
        <Route path="/" element={<StaffHomePage />} />
        <Route path="/create" element={<CreateRolePage />} />
        <Route path="/applied" element={<AppliedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/applicants" element={<ApplicantsPage />} />
        <Route path="*" element={<NoPermissionPage/>} />
        {/* Add more staff-specific routes here */}
      </Route>
    </Routes>
  );
}

export default StaffRoutes;
