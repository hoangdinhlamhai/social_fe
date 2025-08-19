import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const checkEmailExistsApi = async (email) => {
    const response = await axios.get(`${BASE_URL}/check-email`, {
        params: { email },
    });
    return response.data;
};

const sendOtpApi = async (email) => {
    const res = await axios.get(`${BASE_URL}/send-otp`, {
        params: { email },
    });
    return res.data;
};

const verifyOtpApi = async (email, otp) => {
    const res = await axios.get(`${BASE_URL}/verify-otp`, {
        params: { email, otp },
    });
    return res.data;
};

export { checkEmailExistsApi, sendOtpApi, verifyOtpApi };
