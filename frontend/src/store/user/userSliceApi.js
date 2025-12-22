import apiSlice from "../apiSlice";


const USER_URL = '/user';

const userSliceApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getUser:builder.query({
            query:(userId) => ({
                url:`${USER_URL}/get-user/${userId}`,
                method:'GET',
            }),
        }),
    }),
})

export const {useGetUserQuery} = userSliceApi;