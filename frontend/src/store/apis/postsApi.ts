import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {delay} from '../../utils/delay'
export const postsApi = createApi(
    {
        reducerPath: 'postsApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://192.168.1.11:3000',
            fetchFn: async (...args) => {
                await delay(2000)
                return fetch(...args)
            }
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
