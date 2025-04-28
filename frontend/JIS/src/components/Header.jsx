import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router"; // Fixed import
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false); // Close menu when route changes
  }, [location]);

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
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4 flex items-center justify-between relative">
      {/* Left side: Hamburger + App name */}
      <div className="flex items-center space-x-3">
        {user && user.role === "registrar" && (
          <button
            className="block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        )}
        <Link to={user ? `/${user?.role}` : "/login"}>
          <div className="text-xl font-bold whitespace-nowrap">
            Judiciary Info System
          </div>
        </Link>
      </div>

      {/* Middle nav links */}
      {user && user.role === "registrar" && (
        <ul
          className={`${
            menuOpen
              ? "flex flex-col absolute top-12 left-0 right-0 bg-blue-600 text-center"
              : "hidden"
          } md:flex md:flex-row md:space-x-8 md:static md:mt-0 mt-4 font-bold text-lg`}
        >
          <Link to={`/${user?.role}`}>
            <li className="px-5 py-2 hover:bg-blue-500">Home</li>
          </Link>
          <Link to="/registrar/register-case">
            <li className="px-5 py-2 hover:bg-blue-500">Register New Case</li>
          </Link>
          <Link to="/registrar/running-case">
            <li className="px-5 py-2 hover:bg-blue-500">Running Cases</li>
          </Link>
          <Link to="/registrar/closed-case">
            <li className="px-5 py-2 hover:bg-blue-500">Closed Case</li>
          </Link>
        </ul>
      )}

      {/* Right side: profile icon */}
      {user && (
        <div ref={dropdownRef} className="flex items-center">
          <div className="hidden md:block px-2 mx-2 text-xl font-semibold">
            Welcome, {user?.name}
          </div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-3xl" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-4 mt-10 top-[1px] w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
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
