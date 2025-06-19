import { createSlice } from "@reduxjs/toolkit";
interface Post {
    id: string,
    title:string,
    content:string
}
const initialState: Post[] = [
    {
        id: '0',
        title: 'First Post!',
        content: 'Hello'
    },
    {
        id: '1',
        title: 'second Post!',
        content: 'Hello'
    }
]
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    }

})

export const postsReducer = postsSlice.reducer