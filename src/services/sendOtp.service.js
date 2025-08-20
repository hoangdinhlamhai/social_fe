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

const changePasswordApi = async (email, newPassword) => {
    //tạo 1 đối tượng requestBody chứa mật khẩu mới đúng định dạng yêu cầu của API (application/json)
    //nếu truyền thẳng newPassword vào thì là kiểu text/plain
    const requestBody = {
        password: newPassword,
    };

    const res = await axios.post(`${BASE_URL}/change-password`, requestBody, {
        params: { email },
    });
    return res.data;
};

export { checkEmailExistsApi, sendOtpApi, verifyOtpApi, changePasswordApi };
