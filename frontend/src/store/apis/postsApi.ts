import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
import { createEntityAdapter, createSelector, type EntityState } from "@reduxjs/toolkit";
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
    sortComparer: (a,b) => b.updatedAt.localeCompare(a.updatedAt)//its currently in ascending so reversed
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
const getPostsResult = postsApi.endpoints.fetchPosts.select()
//const getPostsByIdResult = postsApi.endpoints.fetchPostsById.select(postId) looks like have to create a selector which passes postId
const getPostsData = createSelector(getPostsResult, result => result.data ?? initalState)

export const {useAddPostsMutation, useEditPostMutation, useFetchPostsQuery, useFetchPostsByIdQuery} = postsApi
export const {selectAll: selectAllPosts, selectById: selectPostById} = postsAdaptor.getSelectors(getPostsData)
export const selectPostsFromAnywhere = createSelector(
    [   
        (state: RootState, postId:string) => selectPostById(state, postId),
        (state: RootState, postId:string) => postsApi.endpoints.fetchPostsById.select(postId)(state).data
    ],
    (postFromList, postFromQuery) => {
    if (postFromList) {
      console.log('Source: Normalized List Cache');
      return postFromList;
    }
    if (postFromQuery) {
      console.log('Source: Single Post Query Cache');
      return postFromQuery;
    }
  } 

)