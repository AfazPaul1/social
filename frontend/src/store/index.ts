import { configureStore } from "@reduxjs/toolkit/react";
import { postsReducer } from "./slices/postsSlice";
export const store = configureStore({
    reducer: {
    posts: postsReducer    
    }
})


export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>