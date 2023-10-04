import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStaff, useAuthManager, useAuthHr } from "./useAuth";
import StaffRoutes from "./StaffRoutes";
import ManagerRoutes from "./ManagerRoutes";
import StaffNoPermissionPage from "../pages/StaffNoPermissionPage";
import ManagerNoPermissionPage from "../pages/ManagerNoPermissionPage";
import HrRoutes from "./HrRoutes";
import HrNoPermissionPage from "../pages/HrNoPermissionPage";

function ProtectedRoutes() {
  if (useAuthStaff()) {
    return (
      <Routes>
        <Route path="/staff/*" element={<StaffRoutes />} />
        <Route path="*" element={<StaffNoPermissionPage />} />
        {/* Other staff-specific routes */}
      </Routes>
    );
  } else if (useAuthManager()) {
    return (
      <Routes>
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="*" element={<ManagerNoPermissionPage />} />
        {/* Other manager/director-specific routes */}
      </Routes>
    );
  } else if (useAuthHr()) {
    return (
        <Routes>
            <Route path="/hr/*" element={<HrRoutes />} />
            <Route path="*" element={<HrNoPermissionPage />} />
            {/* Other hr-specific routes */}
        </Routes>
    )
  }
  else{
    return <Navigate to="/noPermission" />;
  }
}

export default ProtectedRoutes;
