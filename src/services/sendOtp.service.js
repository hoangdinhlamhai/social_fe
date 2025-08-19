import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const checkEmailExistsApi = async (email) => {
    const response = await axios.get(`${BASE_URL}/check-email`, {
        params: { email },
    });
    return response.data;
};

const sendOtpApi = async (email) => {
    const res = await axios.get(`${BASE_URL}/check-email`, {
        params: { email },
    });
    return res.data;
};

export { checkEmailExistsApi, sendOtpApi };
