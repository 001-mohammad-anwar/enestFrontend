import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";


// import ProjectDetails from "../pages/ProjectDetails";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashbord";
import Login from "../pages/Login";
import ProjectDetails from "../pages/ProjectDetails";
import Signup from "../pages/Signup";
import AllProjects from "../pages/AllProjects";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login/>} />

      <Route path="/signup" element={<Signup/>} />


      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
         </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <AllProjects/>
         </ProtectedRoute>
        }
      />




    {/* /projects/:id */}
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
         </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;