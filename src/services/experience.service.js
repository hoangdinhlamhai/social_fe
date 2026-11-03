import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/experiences';
const config = (accessToken) => ({ headers: { Authorization: `Bearer ${accessToken}` } });

export const getExperiencesApi = async (accessToken, email) => {
    const response = await axios.get(BASE_URL, { ...config(accessToken), params: { email } });
    return response.data;
};
export const createExperienceApi = async (data, accessToken) => {
    const response = await axios.post(BASE_URL, data, config(accessToken));
    return response.data;
};
export const updateExperienceApi = async (id, data, accessToken) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, data, config(accessToken));
    return response.data;
};
export const deleteExperienceApi = async (id, accessToken) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, config(accessToken));
    return response.data;
};
