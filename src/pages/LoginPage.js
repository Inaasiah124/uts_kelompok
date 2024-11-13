import React from 'react';

const LoginPage = ({ onLogin }) => {
    const handleLogin = () => {
        onLogin(); // Panggil fungsi onLogin yang diteruskan sebagai prop
    };

    return (
        <div>
            <h1>Halaman Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;