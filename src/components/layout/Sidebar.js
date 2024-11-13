import React, { useState } from "react";
import { FaTachometerAlt, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle actions, including logout and navigation
  const onSelect = (action) => {
    if (action === 'logout') {
      console.log("User logged out");
      localStorage.removeItem('token'); // Remove token from storage
      navigate('/login'); // Redirect to login page
    } else if (action === 'mahasiswa') {
      navigate('/students'); // Navigate to the Students page
    } else if (action === 'dashboard') {
      navigate('/dashboard'); // Navigate to the Dashboard page
    }
  };

  // Menu items
  const menuItems = [
    { icon: <FaTachometerAlt className="text-2xl" />, text: "Dashboard", action: () => onSelect('dashboard') }, // Navigate to Dashboard page
  
    { icon: <FaUser className="text-2xl" />, text: "Mahasiswa", action: () => onSelect('mahasiswa') }, // Navigate to Students page
    { icon: <FaSignOutAlt className="text-2xl" />, text: 'Logout', action: () => onSelect('logout') } // Logout action
  ];

  return (
    <div
      className={`bg-indigo-800 text-white h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}
    >
      {/* Burger Button */}
      <div className={`flex ${isOpen ? "justify-start p-4 mt-5" : "justify-center mt-5"} transition-all`}>
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Logo and Menu Text */}
      <div className={`flex flex-col items-center p-4`}>
        {isOpen && (
          <div className={`bg-white text-indigo-500 border border-indigo-500 rounded-lg p-2`}>
            <span className="text-lg font-bold">Elearning</span>
          </div>
        )}
        {isOpen && <span className="text-lg mt-3">Menu</span>}
      </div>

      {/* Menu Content */}
      <ul className={`flex flex-col flex-grow ${isOpen ? "items-start px-4" : "items-center justify-center"}`}>
        {menuItems.map(({ icon, text, action }, index) => (
          <li
            key={index}
            className="w-full hover:bg-indigo-400 transition-colors duration-200 rounded-md"
          >
            <button
              onClick={action}
              className="flex items-center p-4 w-full"
            >
              {icon}
              {isOpen && <span className="ml-4 text-sm">{text}</span>}
            </button>
          </li>
        ))}
      </ul>

      {/* Sidebar Bottom Padding */}
      <div className="p-4 flex-grow" />
    </div>
  );
}

export default Sidebar;
