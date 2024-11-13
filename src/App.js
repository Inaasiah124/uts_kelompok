// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import DashboardPage from './pages/Dashboardpage';
// import StudentPage from './pages/StudentPage';



// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <BrowserRouter>
//             <div className="App">
//                 <Routes>
//                     <Route
//                         path="/"
//                         element={isLoggedIn ? <Navigate to="/students" replace /> : <Login onLogin={handleLogin} />}
//                     />
//                     <Route path="/register" element={<Register />} />
//                     <Route
//                         path="/dashboard"
//                         element={isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
//                     />
//                     <Route
//                         path="/students"
//                         element={isLoggedIn ? <StudentPage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
//                     />
//                     <Route
//                         path="/login"
//                         element={isLoggedIn ? <Navigate to="/students" replace /> : <Login onLogin={handleLogin} />}
//                     />
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardPage from './pages/Dashboardpage';
import StudentPage from './pages/StudentPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* If logged in, redirect to /students, else show login */}
                    <Route
                        path="/"
                        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
                    />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Only allow access to dashboard and students if logged in */}
                    <Route
                        path="/dashboard"
                        element={isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/students"
                        element={isLoggedIn ? <StudentPage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
                    />

                    {/* Redirect logged-in users from login page */}
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
