import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const updateUserProfileApi = async (userId, data) => {
    return axios.patch(`${BASE_URL}/api/users/${userId}`, data);
};

export { updateUserProfileApi };
