import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getChatbotResponseApi = async (message) => {
    return await axios.post(`${BASE_URL}/chat`, { message });
};

export { getChatbotResponseApi };
