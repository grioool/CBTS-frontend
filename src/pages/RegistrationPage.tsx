import React, {useState} from 'react';
import {registerUser, RegistrationData} from '../services/authService';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: RegistrationData = {username, password, email};

        try {
            const response = await registerUser(data);
            toast.success('Registration successful! Redirecting...');
            console.log('Registration successful:', response);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage =
                    error.response.data?.message || 'Username or email already exists';
                toast.error(`Error ${statusCode}: ${errorMessage}`);
            } else {
                toast.error('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
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
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
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

                <button type="submit" className="btn btn-primary w-full py-2">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;
