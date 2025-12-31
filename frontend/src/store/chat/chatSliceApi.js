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
            providesTags:['Chats']
        }),
        getDMChannel:builder.query({
            query:(id) => ({
                url:`${CHAT_URL}/${id}/channel`,
                method:'GET',
            }),
        }),
        sendMessage: builder.mutation({
            query: ({receiverId, data}) => {
                const isFormData = data instanceof FormData;
                
                return {
                url: `${CHAT_URL}/${receiverId}/send`,
                method: 'POST',
                body: data,
                ...(isFormData && { 
                    formData: true,
                    prepareHeaders: (headers) => {
                    headers.delete('content-type');
                    return headers;
                    }
                })
                };
            },
            invalidatesTags:['Chats']
            }),
            
    }),
})

export const {useGetContactQuery,useGetDMChannelQuery,useGetMyChannelsQuery,useSendMessageMutation} = chatSliceApi;