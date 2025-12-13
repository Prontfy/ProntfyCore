// Header.jsx
import React from "react";
import ProntfyCoreLogo from "./ProntfyCoreLogo";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <ProntfyCoreLogo width={140} height={32} />
      </div>

      {/* Barra de pesquisa */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Botão de login */}
      <div>
        <button className="bg-cyan-500 text-white px-4 py-1 rounded-md hover:bg-cyan-600 transition">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
