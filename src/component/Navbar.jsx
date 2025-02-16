import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center h-16"> 
        {/* Centering the buttons */}
        <div className="flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/paste" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Paste
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;