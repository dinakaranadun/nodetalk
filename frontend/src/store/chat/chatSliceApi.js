import apiSlice from "../apiSlice";

const CHAT_URL = '/messages';

const chatSliceApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getContact:builder.query({
            query:() => ({
                url:`${CHAT_URL}/contacts`,
                method:'GET',
            }),
        }),
        getMyChannels:builder.query({
            query:() => ({
                url:`${CHAT_URL}/myChannels`,
                method:'GET',
            }),
        }),
        getDMChannel:builder.query({
            query:(id) => ({
                url:`${CHAT_URL}/${id}/channel`,
                method:'GET',
            }),
        }),
        sendMessage:builder.mutation({
            query:({receiverId,data}) => ({
                url:`${CHAT_URL}/${receiverId}/send`,
                method:'POST',
                body:data
            }),
        }),
    }),
})

export const {useGetContactQuery,useGetDMChannelQuery,useGetMyChannelsQuery,useSendMessageMutation} = chatSliceApi;