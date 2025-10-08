import React, {useState} from 'react';
import {registerUser, RegistrationData} from '../services/authService';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const usernameRules = (v: string) => {
    const value = v.trim();
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 32) return 'Username must be at most 32 characters';
    if (!/^[A-Za-z0-9_]+$/.test(value)) return 'Only letters, numbers and underscores';
    return '';
};
const emailRules = (v: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email';
    return '';
};
const passwordRules = (v: string) => {
    if (v.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(v)) return 'Add an uppercase letter';
    if (!/[a-z]/.test(v)) return 'Add a lowercase letter';
    if (!/[0-9]/.test(v)) return 'Add a number';
    return '';
};

const RegistrationPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirm?: string
    }>({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const e: typeof errors = {};
        const uErr = usernameRules(username);
        const emErr = emailRules(email);
        const pErr = passwordRules(password);
        if (uErr) e.username = uErr;
        if (emErr) e.email = emErr;
        if (pErr) e.password = pErr;
        if (confirm !== password) e.confirm = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            const first = errors.username || errors.email || errors.password || errors.confirm;
            if (first) toast.error(first);
            return;
        }

        const data: RegistrationData = {username: username.trim(), password, email: email.trim()};
        try {
            setSubmitting(true);
            await registerUser(data);
            toast.success('Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 1200);
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
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Username */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        className={`form-control block w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                            errors.username ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={validate}
                        placeholder="Enter your username"
                        required
                        aria-invalid={!!errors.username}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control block w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validate}
                        placeholder="Enter your email"
                        required
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`form-control block w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validate}
                        placeholder="Enter your password"
                        required
                        aria-invalid={!!errors.password}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
                        Confirm password:
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        className={`form-control block w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                            errors.confirm ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        onBlur={validate}
                        placeholder="Re-enter your password"
                        required
                        aria-invalid={!!errors.confirm}
                    />
                    {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary w-full py-2 disabled:opacity-50">
                    {submitting ? 'Creating account…' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;
