import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffNavBar from "./StaffNavBar";
import StaffHomePage from "../pages/StaffHomePage";
import AppliedPage from "../pages/AppliedPage";
import NoPermissionPage from "../pages/ManagerNoPermissionPage";
import StaffProfilePage from "../pages/StaffProfilePage";
import StaffListingDetailsPage from "../pages/StaffListingDetailsPage";
import StaffApplicantsPage from "../pages/StaffApplicantsPage";

function StaffRoutes() {
  return (
    <Routes>
      {/* Nested under '/staff' */}
      <Route path="/" exact element={<StaffNavBar />}>
        <Route path="/" exact element={<StaffHomePage />} />
        <Route path="/applied" element={<AppliedPage />} />
        <Route path="/profile" element={<StaffProfilePage />} />
        <Route path="/details/:id" element={<StaffListingDetailsPage />} />
        <Route path="/details/:id/applicants" element={<StaffApplicantsPage />} />
        <Route path="*" element={<NoPermissionPage />} />
        {/* Add more staff-specific routes here */}
        {/* <Route path="/viewdetails" element={<ViewDetailsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default StaffRoutes;
