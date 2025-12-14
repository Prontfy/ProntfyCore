// src/components/Sidebar.jsx
import React, { useState } from "react";
import ProntfyCoreLogo from "./ProntfyCoreLogo";
import { FiHome, FiUsers, FiSettings, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Usuários", icon: <FiUsers /> },
    { name: "Configurações", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* BOTÃO HAMBURGUER (MOBILE) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
      >
        <FiMenu size={22} />
      </button>

      {/* OVERLAY (MOBILE) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <ProntfyCoreLogo width={140} height={32} />
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
