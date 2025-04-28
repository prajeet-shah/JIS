import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ Detect route changes
  const dropdownRef = useRef(null);

  const user = useSelector((store) => store.user);

  // 🔄 Reset dropdown when route changes (e.g., login/signup)
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // 📦 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4 flex items-center justify-between">
      {/* App Name */}
      <div className="flex">
        <Link to={user ? `/${user?.role}` : "/login"}>
          <div className="text-xl font-bold">Judiciary Info System</div>
        </Link>
        {user && user.role === "registrar" ? (
          <ul className="mx-32 px-9 font-bold text-lg flex">
            <Link to={`/${user?.role}`}>
              <li className="mx-5 px-5">Home</li>
            </Link>
            <Link to="/registrar/register-case">
              <li className="mx-5 px-5">Register New Case</li>
            </Link>
            <Link to="/registrar/running-case">
              <li className="mx-5 px-5">View Running cases</li>
            </Link>
            <Link to="/registrar/closed-case">
              <li>View Closed Case</li>
            </Link>
          </ul>
        ) : null}
      </div>

      {/* Profile Dropdown */}
      {user && (
        <div ref={dropdownRef} className="relative flex items-center">
          <div className="px-2 mx-2 text-xl font-semibold">
            Welcome, {user?.name}
          </div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-3xl" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-10 top-[1px] w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
