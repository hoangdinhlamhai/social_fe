import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

//axios.get(url, config)
const getFriendRequestByReceiverId = async (accessToken, receiverId, status) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/friend-requests/receiver/${status}`, {
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

const getFriendRequestBySenderId = async (accessToken, senderId, status) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/friend-requests/sender/${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                senderId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        throw error;
    }
};

//axios.post(url, data, config)
const acceptFriendRequest = async (accessToken, requestId) => {
    try {
        await axios.post(
            `${BASE_URL}/api/friend-requests/accept/${requestId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    } catch (error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
};

const declineFriendRequest = async (accessToken, requestId) => {
    try {
        await axios.post(
            `${BASE_URL}/api/friend-requests/decline/${requestId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    } catch (error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
};

export { getFriendRequestByReceiverId, acceptFriendRequest, declineFriendRequest, getFriendRequestBySenderId };
