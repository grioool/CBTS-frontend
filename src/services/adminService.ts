import axios from 'axios';

const BASE_URL = 'https://terraform-cbts-backend-854061077838.europe-central2.run.app'

export interface AdminAnalyticsResponse {
    total_summaries: number;
    total_users: number;
    is_admin: boolean;
}

export async function getAdminAnalytics(token: string): Promise<AdminAnalyticsResponse> {
    const response = await axios.get(`${BASE_URL}/admin/analytics`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
