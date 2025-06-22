import { configureStore } from "@reduxjs/toolkit/react";
import { postsReducer } from "./slices/postsSlice";
import { postsApi } from "./apis/postsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
    reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(postsApi.middleware)
    }
})
setupListeners(store.dispatch)

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>