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

export const selectAccessToken = (state:RootState) => state.auth.accessToken
