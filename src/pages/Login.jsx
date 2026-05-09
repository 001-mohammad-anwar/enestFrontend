import React, { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { Mail, Lock } from "lucide-react";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../commonApi's/SummaryApi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // HANDLE SUBMIT
 const handleSubmit = async (e) => {
  e.preventDefault();

  const { email } = formData;

  if (!validateEmail(email)) {
    toast.error("Invalid email format");
    return;
  }

  try {

    const response = await Axios({
      ...SummaryApi.login,
      data: formData,
    });

    console.log(response);

    if (response.data.success) {

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success("Login successful!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    }

  } catch (error) {
      if(error.response?.status === 404 ){
        // toast.error("Please register first");
        navigate("/signup");
      }
    console.log(error);

    AxiosToastError(error);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      {/* CONTAINER */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-xl">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 text-white p-16">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back 👋</h1>

          <p className="mt-6 text-indigo-100 text-lg leading-8">
            Login to continue managing your projects, tasks, and productivity
            all in one place.
          </p>

          {/* FEATURE BOXES */}
          <div className="mt-12 space-y-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <h3 className="font-semibold text-lg">Smart Task Management</h3>

              <p className="text-indigo-100 mt-2 text-sm">
                Organize and track all your tasks efficiently.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <h3 className="font-semibold text-lg">Project Collaboration</h3>

              <p className="text-indigo-100 mt-2 text-sm">
                Manage projects with a clean and modern workflow.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          {/* HEADING */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Login Account</h2>

            <p className="text-gray-500 mt-3">
              Login to access your dashboard.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-gray-500 text-center mt-8">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
