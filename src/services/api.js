import axios from 'axios';

const BASE_URL = 'https://cbts-backend-854061077838.europe-central2.run.app'

export const summarizeFile = (file, summaryType, summaryStyle) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('summaryType', summaryType);
  formData.append('summaryStyle', summaryStyle);

  return axios.post(`${BASE_URL}/summarize`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getSummary = () => {
  return axios.get(`${BASE_URL}/summary`);
};
