import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getMeProfileApi = async ({ accessToken }) => {
    const response = await axios.get(`${BASE_URL}/api/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // thêm JWT vào header Authorization
        },
    });

    return response.data; //chỉ trả về dữ liệu người dùng
    // nếu trả về toàn bộ response, thì bỏ dòng này đi
};

const updateUserProfileApi = async (userId, data, accessToken) => {
    return await axios.patch(`${BASE_URL}/api/users/${userId}/profile`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // thêm JWT vào header Authorization
        },
    });
};

export { updateUserProfileApi, getMeProfileApi };
