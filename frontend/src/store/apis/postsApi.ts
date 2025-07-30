import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
//import {delay} from '../../utils/delay'
//gues i need to change this type everytime i change the api response
export interface Post {
    id: string,
    title:string,
    content:string,
    createdAt:string,
    updatedAt:string,
    userId:string,
    user:{
        name:string
    }
}
export const postsApi = createApi(
    {
        reducerPath: 'postsApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://192.168.1.5:3000',
            // fetchFn: async (...args) => {
            //     //console.log("api", performance.now());
            //      //await delay(2000)
            //      return fetch(...args)
            // },
            prepareHeaders: (headers, {getState}) => {
                const token = (getState() as RootState).auth.accessToken
                if(token) headers.set('authorization', token)
                return headers
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
                editPost: builder.mutation({
                    invalidatesTags: (_result, _error, {postId}) => [{type: "Post", id:postId}],
                    query:({title, content, postId}) => {
                        return {
                            url: `/posts/${postId}`,
                            method:'PATCH',
                            body: {title, content}
                        }

                    }
                }),
                fetchPosts: builder.query<Post[], undefined>({
                    // providesTags:(results) => 
                    //     results
                    //     ? [
                    //         ...results.map((post: Post) => ({type: 'Post' as const, id: post.id}) )
                    //     ] 
                    //     : []
                    // ,
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

export const {useAddPostsMutation, useEditPostMutation, useFetchPostsQuery, useFetchPostsByIdQuery} = postsApi
