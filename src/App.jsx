import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RequireAuth from "./components/Layout/RequireAuth";
import AuthRedirect from "./components/AuthLayout/AuthRedirect";
import Estimates from "./pages/Estimates";
import AddEditProject from "./components/Projects/AddEditProject";
import AddEditEstimate from "./components/Estimates/AddEditEstimate";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthRedirect />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/add" element={<AddEditProject />} />
          <Route path="projects/edit" element={<AddEditProject />} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="estimates/add" element={<AddEditEstimate />} />
          <Route path="estimates/edit" element={<AddEditEstimate />} />
        </Route>
      </Route>

      {/* Route for Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
