import axios from 'axios';

const BASE_URL = 'https://cbts-backend-854061077838.europe-central2.run.app'

export interface Summary {
    id: number;
    filename: string;
}

export async function getUserHistory(token: string): Promise<Summary[]> {
    const response = await axios.get(`${BASE_URL}/user/history`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}

export async function getSummaryContent(summaryId: number, token: string): Promise<{ summary: string }> {
    const response = await axios.get(`${BASE_URL}/summary/${summaryId}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}

export async function downloadSummaryFile(summaryId: number, token: string): Promise<void> {
    const response = await axios.get(`${BASE_URL}/summary/${summaryId}/download`, {
        headers: {Authorization: `Bearer ${token}`},
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `summary_${summaryId}.txt`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
