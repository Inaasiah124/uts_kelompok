// src/components/session/SessionProvider.js
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (email, password) => {
        // Logic to handle login
        // Set user and token
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <SessionContext.Provider value={{ user, token, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);