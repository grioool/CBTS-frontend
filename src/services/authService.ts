import axios from 'axios';

export interface RegistrationData {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface Token {
    access_token: string;
    token_type: string;
    is_admin: boolean;
}

export async function registerUser(data: RegistrationData) {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/registration`, data);
    return response.data;
}

export async function loginUser(data: LoginData): Promise<Token> {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    return response.data;
}

export async function refreshToken(oldToken: string): Promise<Token> {
    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${oldToken}`,
            },
        }
    );
    return response.data;
}

export async function requestPasswordReset(email: string) {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/password/forgot`, {
        email: email.trim(),
    });
    return response.data;
}

export async function resetPassword(token: string, newPassword: string) {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/password/reset`, {
        token,
        new_password: newPassword,
    });
    return response.data;
}
