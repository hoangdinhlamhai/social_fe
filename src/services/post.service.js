import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getMeProfileApi = async ({ accessToken }) => {
    const response = await axios.get(`${BASE_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data; //chỉ trả về dữ liệu người dùng
    // nếu trả về toàn bộ response, thì bỏ dòng này đi
};

const createPostApi = async (data, accessToken) => {
    return axios.post(`${BASE_URL}/api/posts`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export { createPostApi, getMeProfileApi };
