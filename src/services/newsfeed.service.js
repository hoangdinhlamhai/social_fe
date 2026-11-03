import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getNewsFeedApi = async (accessToken, lastId) => {
    const limit = 5;
    const url = lastId ? `/api/posts/newsfeed?lastId=${lastId}&limit=${limit}` : `/api/posts/newsfeed?limit=${limit}`;
    const response = await axios.get(`${BASE_URL}${url}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export { getNewsFeedApi };
