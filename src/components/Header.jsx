// src/components/Header.jsx
import React from "react";
import ProntfyCoreLogo from "./ProntfyCoreLogo";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <ProntfyCoreLogo width={120} height={28} />
        </div>

        {/* Pesquisa (desktop apenas) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {/* Botão login desktop */}
          <button
            className="hidden md:block bg-cyan-500 text-white px-4 py-2 rounded-lg
                       hover:bg-cyan-600 transition"
          >
            Login
          </button>

          {/* Botão login mobile */}
          <button
            className="md:hidden bg-cyan-500 text-white px-3 py-2 rounded-lg text-sm"
          >
            Login
          </button>
        </div>
      </div>

      {/* Pesquisa MOBILE */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
    </header>
  );
};

export default Header;
