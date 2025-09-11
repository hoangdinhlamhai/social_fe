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
        //chuyển phần Request Body vào tham số thứ 2
        {
            userIdLogin: userLoginId,
            userId: userGuestId,
        },
        //chuyển phần config vào tham số thứ 3
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};

const getChatRoomApi = async (accessToken, roomId) => {
    const res = await axios.get(`${BASE_URL}/api/chat/get-chat-room`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: { roomId },
    });
    return res.data;
};

export { fetchConversationsApi, createChatRoomApi, getChatRoomApi };
