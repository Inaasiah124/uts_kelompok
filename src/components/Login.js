import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(''); // Add state for notification message
    const navigate = useNavigate(); // Initialize the navigate hook for redirection

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            setNotification('Login berhasil!'); // Set success notification
            setTimeout(() => setNotification(''), 5000); // Hide notification after 5 seconds
            onLogin();
            navigate('/dashboard'); // Redirect to the dashboard page upon successful login
        } catch (error) {
            setMsg(error.response ? error.response.data.message : 'Terjadi kesalahan saat login');
        } finally {
            setLoading(false);
        }
    };

    const bubbleStyle = (size, top, left) => ({
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(30, 144, 255, 0.3)',
        top,
        left,
    });

    const bubbles = [
        { size: '150px', top: '10%', left: '10%' },
        { size: '120px', top: '50%', left: '5%' },
        { size: '100px', top: '20%', right: '15%' },
        { size: '90px', top: '75%', right: '20%' },
        { size: '110px', top: '30%', left: '40%' },
        { size: '140px', top: '15%', left: '25%' },
    ];

    return (
        <section
            className="hero is-fullheight is-fullwidth"
            style={{
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {bubbles.map((bubble, index) => (
                <div
                    key={index}
                    style={bubbleStyle(bubble.size, bubble.top, bubble.left || bubble.right)}
                ></div>
            ))}

            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form className="box relative z-10" onSubmit={handleAuth}>
                                {msg && <p className="has-text-danger">{msg}</p>}
                                {loading && (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}

                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="email"
                                            className="input"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <span className="icon is-left">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="input"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="icon is-left">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <span
                                            className="button is-text is-small"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer', marginTop: '8px' }}
                                        >
                                            {showPassword ? 'Hide' : 'Show password'}
                                        </span>
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <button type="submit" className="button is-primary is-fullwidth" style={{ backgroundColor: 'blue', color: 'white' }}>
                                        Login
                                    </button>
                                </div>

                                <div className="has-text-centered mt-4">
                                    <p>Belum punya akun?</p>
                                    <a href="/register" className="button is-link is-outlined is-fullwidth mt-2">
                                        Daftar di sini
                                    </a>
                                </div>
                            </form>

                            {notification && (
                                <div className="alert alert-success mt-4" role="alert">
                                    <strong>Success!</strong> {notification}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
