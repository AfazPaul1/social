import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi(
    {
        reducerPath: 'postsApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3000',
        }),
        endpoints: (builder) => {
            return {
                addPosts: builder.mutation({
                    query:(post) => {
                        return {
                            url: '/posts',
                            method:'POST',
                            body: post
                        }
                    }
                }),
            }
        }
    }
)

export const {useAddPostsMutation} = postsApi
