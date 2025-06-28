// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

// export default store;

//dùng redux-persist để lưu trữ trạng thái đăng nhập của người dùng không biến mất khi tải lại trang
// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

import storage from 'redux-persist/lib/storage'; // default: localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Chỉ persist reducer 'auth'
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Cần để tránh lỗi Redux với persist
        }),
});

export const persistor = persistStore(store);
