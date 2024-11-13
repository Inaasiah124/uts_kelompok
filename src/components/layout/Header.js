import React from "react";

function Header({ onLogout, setIsMenuOpen }) {
  return (
    <header className="bg-indigo-900 text-white flex items-center p-4">
      <h1 className="ml-4 text-xl">Aplikasi Universitas</h1>
      <button onClick={onLogout} className="ml-auto text-sm">
        Logout
      </button>
    </header>
  );
}

export default Header;
