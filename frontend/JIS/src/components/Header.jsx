import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4 flex items-center justify-between">
      {/* App Name */}
      <div className="text-xl font-bold">Judiciary Info System</div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <FaUserCircle className="text-3xl" />
          <span className="hidden sm:inline-block">Profile</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
