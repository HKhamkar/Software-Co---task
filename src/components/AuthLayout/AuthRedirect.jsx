import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return loggedInUser ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRedirect;
