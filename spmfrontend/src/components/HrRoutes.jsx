import React from "react";
import { Route, Routes } from "react-router-dom";
import HrNavBar from "./HrNavBar";
import HrHomePage from "../pages/HrHomePage";
import CreateRolePage from "../pages/CreateRolePage";
import AppliedPage from "../pages/AppliedPage";
import HrProfilePage from "../pages/HrProfilePage";
import NoPermissionPage from "../pages/HrNoPermissionPage";
import HrListingDetailsPage from "../pages/HrListingDetailsPage";
import HrApplicantsPage from "../pages/HrApplicantsPage";

function HrRoutes() {
  return (
    <Routes>
      {/* Nested under '/hr' */}
      <Route path="/" exact element={<HrNavBar />}>
        <Route path="/" exact element={<HrHomePage />} />
        <Route path="/create" element={<CreateRolePage />} />
        <Route path="/applied" element={<AppliedPage />} />
        <Route path="/profile" element={<HrProfilePage />} />
        {/* <Route path="/applicants" element={<ApplicantsPage />} /> */}
        <Route path="/details/:id" element={<HrListingDetailsPage />} />
        <Route path="/details/:id/applicants" element={<HrApplicantsPage />} />

        <Route path="*" element={<NoPermissionPage />} />
        {/* Add more hr-specific routes here */}
      </Route>
    </Routes>
  );
}

export default HrRoutes;
