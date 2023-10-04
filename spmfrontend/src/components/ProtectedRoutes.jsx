import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStaff, useAuthManager } from "./useAuth";
import NoPermissionPage from "../pages/NoPermissionPage";
import StaffRoutes from "./StaffRoutes";
import ManagerRoutes from "./ManagerRoutes";

function ProtectedRoutes() {
  if (useAuthStaff()) {
    return (
      <Routes>
        <Route path="/staff/*" element={<StaffRoutes />} />
        <Route path="*" element={<NoPermissionPage/>} />
        {/* Other staff-specific routes */}
      </Routes>
    );
  } else if (useAuthManager()) {
    return (
      <Routes>
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="*" element={<NoPermissionPage/>} />
        {/* Other manager/director-specific routes */}
      </Routes>
    );
  } else {
    return <Navigate to="/noPermission" />;
  }
}

export default ProtectedRoutes;
