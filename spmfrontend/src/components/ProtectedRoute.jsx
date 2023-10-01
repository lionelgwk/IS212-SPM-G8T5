import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
