import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Mail, Lock, User } from "lucide-react";
import Axios from "../utils/Axios";
import SummaryApi from "../commonApi's/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;

    if (!validateEmail(email)) {
      setError("Invalidate email address");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.signUp,
        data: formData,
      });

      if (
        response.data.success ||
        response.status == 201 ||
        response.status == 200
      ) {
        toast.success("registration successful! please log in.");
        setFormData({ name: "", email: "", password: "" });
        navigate("/login")
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      {/* CONTAINER */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-xl">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 text-white p-16">
          <h1 className="text-5xl font-bold leading-tight">
            Manage Your Projects Easily 🚀
          </h1>

          <p className="mt-6 text-indigo-100 text-lg leading-8">
            Track projects, manage tasks, and boost productivity with your
            modern project management platform.
          </p>

          {/* FEATURE BOXES */}
          <div className="mt-12 space-y-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <h3 className="font-semibold text-lg">Organize Projects</h3>

              <p className="text-indigo-100 mt-2 text-sm">
                Keep all your work structured and easy to manage.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <h3 className="font-semibold text-lg">Track Tasks</h3>

              <p className="text-indigo-100 mt-2 text-sm">
                Monitor task progress from todo to completed.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          {/* HEADING */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>

            <p className="text-gray-500 mt-3">
              Signup to continue managing your projects.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

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

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-gray-500 text-center mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
