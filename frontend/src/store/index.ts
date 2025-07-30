import { configureStore } from "@reduxjs/toolkit/react";
//import { postsReducer } from "./slices/postsSlice";
import { postsApi } from "./apis/postsApi";
import { authApi } from "./apis/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./slices/authSlice";
export const store = configureStore({
    reducer: {
    //posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(postsApi.middleware)
            .concat(authApi.middleware)
    }
})
setupListeners(store.dispatch)
export const {login} = authSlice.actions
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>