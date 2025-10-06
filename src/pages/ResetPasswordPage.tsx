import React, {useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {resetPassword} from "../services/authService";
import {validatePassword} from "../utils/validators";

const ResetPasswordPage: React.FC = () => {
    const [search] = useSearchParams();
    const token = search.get("token") || "";
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string>();
    const [msg, setMsg] = useState<string>();
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const pErr = validatePassword(password);
        if (pErr) return setError(pErr);
        if (confirm !== password) return setError("Passwords do not match");
        setError(undefined);
        setSubmitting(true);
        try {
            await resetPassword(token, password);
            setMsg("Password updated. You can now sign in.");
            setTimeout(() => navigate("/auth/login"), 1200);
        } catch (e: any) {
            setError(e?.response?.data?.detail ?? "Failed to reset password");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-xl font-bold mb-4">Set a new password</h1>
            <form onSubmit={submit} noValidate className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                    <label htmlFor="pwd" className="block text-sm font-bold text-gray-700 mb-2">New password</label>
                    <input id="pwd" type="password"
                           className={`block w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                           value={password} onChange={e => setPassword(e.target.value)}
                           placeholder="At least 8 chars incl. Aa1!"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="confirm" className="block text-sm font-bold text-gray-700 mb-2">Confirm
                        password</label>
                    <input id="confirm" type="password"
                           className={`block w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                           value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password"/>
                </div>
                {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
                {msg && <p className="mb-2 text-sm text-green-600">{msg}</p>}
                <button type="submit" disabled={submitting}
                        className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                    {submitting ? "Saving…" : "Reset password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
