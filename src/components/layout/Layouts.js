import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ onLogout, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(true); // Set initial state to true for sidebar

    return (
        <div className="flex flex-col h-screen">
            <Header onLogout={onLogout} setIsMenuOpen={setIsMenuOpen} />
            <div className="flex flex-1">
                <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} onSelect={onLogout} />
                <div className={`flex flex-col flex-1 transition-all duration-300 ${isMenuOpen ? 'ml-0' : 'ml-20'}`}>
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Layout;