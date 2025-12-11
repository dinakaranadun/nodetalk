import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/v1',
        credentials:'include'
    }),
    tagTypes:['User'],
    endpoints:(builder) => ({})
});

export default apiSlice;