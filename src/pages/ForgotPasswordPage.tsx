import React, {useState} from "react";
import {requestPasswordReset} from "../services/authService";
import {validateEmail} from "../utils/validators";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState<string>();
    const [error, setError] = useState<string>();
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validateEmail(email);
        if (err) return setError(err);
        setError(undefined);
        setSubmitting(true);
        try {
            await requestPasswordReset(email);
            setMsg("If that email exists, a reset link has been sent.");
        } catch (e: any) {
            setError(e?.response?.data?.detail ?? "Failed to send reset link");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-xl font-bold mb-4">Reset your password</h1>
            <form onSubmit={submit} noValidate className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input id="email" type="email"
                       className={`block w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                       value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com"/>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                {msg && <p className="mt-2 text-sm text-green-600">{msg}</p>}
                <button type="submit" disabled={submitting}
                        className="mt-4 w-full py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                    {submitting ? "Sending…" : "Send reset link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
