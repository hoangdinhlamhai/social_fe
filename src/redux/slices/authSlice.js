import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    accountLogin: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.accountLogin = action.payload.accountLogin;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.accountLogin = null;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
