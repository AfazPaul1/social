import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {login} from '../index'

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://192.168.1.5:3000',
        
    }),
    endpoints(builder) {
        return {
            login: builder.mutation({
                query: (user) => {
                    return {
                        url:'/login',
                        method:'POST',
                        body: user
                    }
                },
                async onQueryStarted(_user, {dispatch, queryFulfilled}) {
                    try{
                        const {data} = await queryFulfilled
                        dispatch(login(data.body))
                    } catch{
                        console.log("no login");
                    }
                }
            }),
            register: builder.mutation({
                query: (user) => {
                    return {
                        url:'/register',
                        method:"POST",
                        body:user
                    }
                }
            })
        }
    },
})

export const {useLoginMutation, useRegisterMutation} = authApi