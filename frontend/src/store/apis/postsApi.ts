import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
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

const postsAdaptor = createEntityAdapter<Post>({
    sortComparer: (a,b) => a.updatedAt.localeCompare(b.updatedAt)
})
const initalState = postsAdaptor.getInitialState()

export const postsApi = createApi(
    {
        reducerPath: 'postsApi',
        baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_API_URL,
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
                    },
                    
                }),
                editPost: builder.mutation({
                    invalidatesTags: (_result, _error, {postId}) => [{type: "Post", id:postId}],
                    query:({title, content, postId}) => {
                        return {
                            url: `/posts/${postId}`,
                            method:'PATCH',
                            body: {title, content}
                        }
                    },
                    
                }),
                fetchPosts: builder.query<EntityState<Post, string>, void>({
                    providesTags:(results) => 
                        results
                        ? [
                            ...results.ids.map((id: string) => ({type: 'Post' as const, id}) )
                        ] 
                        : []
                    ,
                    query: () => {
                        return {
                            url:'/posts',
                            method:'GET'
                        }
                    },
                    transformResponse: (res:Post[]) => {
                        return postsAdaptor.setAll(initalState, res)
                    }
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
