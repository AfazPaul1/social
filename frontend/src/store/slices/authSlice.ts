import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store"

interface auth {
    user: {
        email:string,
        id:string,
        name:string
    },
    accessToken: string
}
const initialState:auth = {
    user: {
        email:"",
        id:"",
        name:""
    },
    accessToken:""
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (_state, action:PayloadAction<auth>) => {   
            return action.payload
        }
    }
})

//i need this selectAccesstoken inside authenticated routes for checking whether there is any logged in user if its null then we redirect to login
export const selectAccessToken = (state:RootState) => state.auth.accessToken
export const selectLoggedInUserId = (state:RootState) => state.auth.user.id
