import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getFriendRequestByReceiverId = async (accessToken, receiverId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/friend-requests/receiver`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                receiverId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        throw error;
    }
};

export { getFriendRequestByReceiverId };
