import React, {useState} from 'react';
import {loginUser} from '../services/authService';
import {useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const tokenData = await loginUser({username, password});
            localStorage.setItem('access_token', tokenData.access_token);

            if (tokenData.is_admin) {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/analytics');
            } else {
                localStorage.setItem('isAdmin', 'false');
                navigate('/history');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Username */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full py-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
