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

//files gửi đúng dạng multipart/form-data, không truyền trực tiếp files (kiểu mảng) mà dùng FormData.
const uploadImageToCloudinary = async (files, accessToken) => {
    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file); // 'files' phải trùng @RequestParam("files")
    }

    return axios.post(`${BASE_URL}/api/images/post`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const getPostByEmailApi = async (accessToken, email) => {
    return await axios.get(`${BASE_URL}/api/posts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            email: email,
        },
    });
};

const createPostApi = async (data, accessToken) => {
    return axios.post(`${BASE_URL}/api/posts`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const updatePostApi = async (accessToken, postId, data) => {
    axios.patch(`${BASE_URL}/api/posts/${postId}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const deletePostApi = async (postId, accessToken) => {
    axios.delete(`${BASE_URL}/api/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export { createPostApi, getMeProfileApi, uploadImageToCloudinary, getPostByEmailApi, deletePostApi, updatePostApi };
