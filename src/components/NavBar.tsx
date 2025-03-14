import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkLoginStatus = () => {
        const token = localStorage.getItem('access_token');
        const adminFlag = localStorage.getItem('isAdmin') === 'true';
        setIsLoggedIn(!!token);
        setIsAdmin(adminFlag);
    };

    useEffect(() => {
        checkLoginStatus();
        const intervalId = setInterval(checkLoginStatus, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-7">
            <ul className="flex space-x-7 items-center">
                <li>
                    <Link to="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/summary" className="text-white hover:text-gray-300">
                                Summary
                            </Link>
                        </li>
                        <li>
                            <Link to="/history" className="text-white hover:text-gray-300">
                                User History
                            </Link>
                        </li>
                        <li>
                            <Link to="/subscription" className="text-white hover:text-gray-300">
                                Subscribe
                            </Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link to="/admin/analytics" className="text-white hover:text-gray-300">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300 focus:outline-none"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/registration" className="text-white hover:text-gray-300">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
