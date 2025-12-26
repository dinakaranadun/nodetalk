import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice";
import chatReducer from "./chat/chatSlice"
import apiSlice from './apiSlice';

const store = configureStore({
    reducer:{
        auth: authReducer, 
        chat: chatReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;