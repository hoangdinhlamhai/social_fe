import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getAiSuggestionsForUser = async (userId, accessToken) => {
    const response = await axios.get(`${BASE_URL}/api/recommendations/custom-ai-suggested`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            userId: userId,
        },
    });
    return response;
};

export { getAiSuggestionsForUser };
