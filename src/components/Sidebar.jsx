// Sidebar.jsx
import React from "react";
import ProntfyCoreLogo from "./ProntfyCoreLogo";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Usuários", icon: <FiUsers /> },
    { name: "Configurações", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <ProntfyCoreLogo width={140} height={32} />
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
