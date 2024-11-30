import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
