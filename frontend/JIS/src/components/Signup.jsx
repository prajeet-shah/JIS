import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Update the path if different
import { BASE_URL } from "../utils/constants"; // Your API base URL

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "judge",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });

      const userData = res.data;
      dispatch(addUser(userData));

      // Navigate based on role
      const role = userData.role;
      if (role === "registrar") navigate("/registrar");
      else if (role === "judge") navigate("/judge");
      else if (role === "lawyer") navigate("/lawyer");
      else console.error("Unknown role");
    } catch (err) {
      console.error(
        "Signup failed:",
        err.response?.data?.message || err.message
      );
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="judge">Judge</option>
              <option value="lawyer">Lawyer</option>
              <option value="registrar">Registrar</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
          <p className="text-sm text-center mt-3 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              <u>Click here</u>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
