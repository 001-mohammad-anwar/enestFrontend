import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashbord";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import AllProjects from "../pages/AllProjects";
import ProjectDetails from "../pages/ProjectDetails";

import AllTasks from "../pages/AllTasks";

const AppRoutes = () => {

  return (

    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* PROTECTED ROUTES */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ALL PROJECTS */}

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <AllProjects />
          </ProtectedRoute>
        }
      />

      {/* SINGLE PROJECT */}

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      {/* ALL TASKS */}

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AllTasks />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;