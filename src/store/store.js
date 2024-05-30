import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import refreshSlice from './refreshSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        ref: refreshSlice,
    }
});


export default store;