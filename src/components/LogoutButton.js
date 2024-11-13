import React from "react";

function LogoutButton({ onLogout }) {
    return (
        <button
            onClick={onLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            aria-label="Logout" // Accessibility improvement
        >
            Logout
        </button>
    );
}

export default LogoutButton;