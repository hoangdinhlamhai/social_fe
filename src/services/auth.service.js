import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const loginApi = async (email, password) => {
    const response = await axios.post(
        `${BASE_URL}/login`,
        {
            email,
            password,
        },
        {
            withCredentials: true, //backend có setCookie(refresh_token) nên frontend phải cho phép nhận cookie từ server:
        },
    );

    return response.data; // res là { accessToken, user } ở json mà api trả về có
};

const logoutApi = async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

    // Xoá token ở localStorage (nếu có)
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
};

//Viết code với async/await dễ đọc (thay vì .then().catch() rối rắm)
export { loginApi, logoutApi };
