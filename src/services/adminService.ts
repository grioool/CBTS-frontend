import axios from 'axios';


export interface AdminAnalyticsResponse {
    total_summaries: number;
    total_users: number;
    is_admin: boolean;
}

export async function getAdminAnalytics(token: string): Promise<AdminAnalyticsResponse> {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/analytics`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
