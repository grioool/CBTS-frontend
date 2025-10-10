import React, {useState} from 'react';
import {loginUser} from '../services/authService';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const usernameRules = (v: string) => {
    const value = v.trim();
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 32) return 'Username must be at most 32 characters';
    if (!/^[A-Za-z0-9_]+$/.test(value)) return 'Only letters, numbers and underscores';
    return '';
};
const passwordRules = (v: string) => {
    if (v.length < 1) return 'Password must be filled';
    return '';
};

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const e: typeof errors = {};
        const uErr = usernameRules(username);
        const pErr = passwordRules(password);
        if (uErr) e.username = uErr;
        if (pErr) e.password = pErr;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            const first = errors.username || errors.password;
            if (first) toast.error(first);
            return;
        }
        try {
            setSubmitting(true);
            const tokenData = await loginUser({username: username.trim(), password});
            localStorage.setItem('access_token', tokenData.access_token);

            toast.success('Login successful! Redirecting...');

            if ((tokenData as any).is_admin) {
                localStorage.setItem('isAdmin', 'true');
                setTimeout(() => {
                    navigate('/admin/analytics');
                }, 1200);
            } else {
                localStorage.setItem('isAdmin', 'false');
                setTimeout(() => {
                    navigate('/history');
                }, 1200);
            }
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.response) {
                const statusCode = error.response.status;
                const errorMessage =
                    error.response.data?.message || 'Incorrect username or password';
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
            <h1 className="text-xl font-bold mb-4">Login</h1>
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

                <button type="submit" disabled={submitting} className="btn btn-primary w-full py-2 disabled:opacity-50">
                    {submitting ? 'Signing in…' : 'Login'}
                </button>

                <Link className="btn btn-primary w-full py-2 disabled:opacity-50" to={"/auth/forgot"}>
                    {"Forgot Password?"}
                </Link>
            </form>
        </div>
    );
};

export default LoginPage;
