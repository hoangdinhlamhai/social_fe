import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getAllCountriesApi = ({ accessToken }) => {
    return axios.get(`${BASE_URL}/api/countries`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const getCitiesByCountryApi = ({ countryId, accessToken }) => {
    return axios.get(`${BASE_URL}/api/cities/by-country/${countryId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export { getAllCountriesApi, getCitiesByCountryApi };
