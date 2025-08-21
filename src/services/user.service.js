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

// const getUserProfileApi = async (accessToken, email) => {
//     const response = await axios.get(
//         `${BASE_URL}/api/user-by-email`, //tham số thứ 1: url
//         {
//             params: { email },
//         }, //tham số thứ 2: config chứa params
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         }, //tham số thứ 3: config chứa headers (sẽ không được nhận vì get chỉ nhận 2 tham số)
//     );
//     return response.data;
// };

const getUserProfileApi = async (accessToken, email) => {
    const response = await axios.get(`${BASE_URL}/api/user-by-email`, {
        params: { email },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

const updateUserProfileApi = async (userId, data, accessToken) => {
    return await axios.patch(`${BASE_URL}/api/users/${userId}/profile`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const getAllUsersApi = async (accessToken) => {
    const response = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};

export { updateUserProfileApi, getMeProfileApi, getAllUsersApi, getUserProfileApi };
