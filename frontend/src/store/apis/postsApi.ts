import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {delay} from '../../utils/delay'
import type { Post } from "../slices/postsSlice";
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
        tagTypes: ["Post"],
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
                fetchPosts: builder.query<Post[], undefined>({
                    providesTags:(results) => 
                        results
                        ? [
                            ...results.map((post: Post) => ({type: 'Post' as const, id: post.id}) )
                        ] 
                        : []
                    ,
                    query: () => {
                        return {
                            url:'/posts',
                            method:'GET'
                        }
                    },
                }),
                fetchPostsById: builder.query<Post, string>({
                    providesTags:(result) => 
                        result
                        ? [{type: 'Post' as const, id: result.id}]
                        : []
                    ,
                    query: (postId) => {
                        return {
                            url: `/posts/${postId}`,
                            method: 'GET'
                        }
                    }
                })
            }
        }
    }
)

export const {useAddPostsMutation, useFetchPostsQuery, useFetchPostsByIdQuery} = postsApi
