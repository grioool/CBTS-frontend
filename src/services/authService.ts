import axios from 'axios';

const BASE_URL = 'https://cbts-backend-854061077838.europe-central2.run.app'

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
}

export async function registerUser(data: RegistrationData) {
    const response = await axios.post(`${BASE_URL}/auth/registration`, data);
    return response.data;
}

export async function loginUser(data: LoginData): Promise<Token> {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    const response = await axios.post(`${BASE_URL}/auth/login`, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    return response.data;
}

export async function refreshToken(oldToken: string): Promise<Token> {
    const response = await axios.post(
        `${BASE_URL}/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${oldToken}`,
            },
        }
    );
    return response.data;
}
