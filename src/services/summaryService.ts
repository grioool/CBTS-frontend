import axios from 'axios';

export interface SummarizeResponse {
    summary: string;
    file_path: string;
}

export async function summarizeFile(
    file: File,
    length: string,
    style: string,
    token: string
): Promise<SummarizeResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${import.meta.env.VITE_BASE_URL}/summary/summarize?length=${encodeURIComponent(length)}&style=${encodeURIComponent(style)}`;

    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
