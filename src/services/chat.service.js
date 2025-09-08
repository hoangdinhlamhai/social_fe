import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const fetchConversationsApi = async (accessToken, roomId) => {
    const response = await axios.get(`${BASE_URL}/api/chat/get-msg-by-roomid/{roomId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export { fetchConversationsApi };
