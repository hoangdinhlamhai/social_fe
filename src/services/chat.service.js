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

const createChatRoomApi = async (accessToken, userLoginId, userGuestId) => {
    const res = await axios.post(
        `${BASE_URL}/api/chat/create-room`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
        {
            userIdLogin: userLoginId,
            userId: userGuestId,
        },
    );
    return res.data;
};

export { fetchConversationsApi, createChatRoomApi };
