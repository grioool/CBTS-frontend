import axios from 'axios';

const BASE_URL = 'http://localhost:5176'; // Replace with your FastAPI URL

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
