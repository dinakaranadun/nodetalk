import apiSlice from "../apiSlice";

const AUTH_URL = '/auth';

const authSliceApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        checkUser:builder.query({
            query:() => ({
                url:`${AUTH_URL}/check-user`,
                method:'GET',
                credentials: 'include', 
            }),
        }),
        signIn:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/signIn`,
                method:'POST',
                body:data
            }),
        }),
        googleAuth:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/google/auth`,
                method:'POST',
                body:data
            }),
        }),
        signUp:builder.mutation({
            query:(data) => ({
                url:`${AUTH_URL}/signUp`,
                method:'POST',
                body:data
            }),
        }),
        signOut:builder.mutation({
            query:() => ({
                url:`${AUTH_URL}/signOut`,
                method:'POST',
            }),
        }),
    }),
})

export const {useCheckUserQuery,useSignInMutation,useGoogleAuthMutation,useSignUpMutation,useSignOutMutation} = authSliceApi;