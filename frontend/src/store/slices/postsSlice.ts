import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../index";
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
        addPost: (state, action) => {
            state.push(action.payload)
        },
        incrementCounter: () => {
            console.log("incrementCounter called in postsSlice - no change to posts");
        },
        editPost: (state, action) => {
            const {id, changes} = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                Object.assign(existingPost, changes)
            }
        }
    }
})

export const postsReducer = postsSlice.reducer
export const {incrementCounter, addPost, editPost} = postsSlice.actions
//selectors
const selectPostId = (state: RootState, postId: string) => postId;

const selectPosts = (state: RootState) => state.posts;

export const makeSelectPostById = () => {
  return createSelector(
    [selectPosts, selectPostId],
    (posts, id) => {
      console.log(`makeSelectPostById for ID ${id} is computing! (posts.find)`);
      return posts.find(post => post.id === id);
    }
  );
};

export const selectPostIds = createSelector(selectPosts, (posts) => {
    console.log("selectPostIds is computing! (posts.map)")
    return posts.map(post => post.id)})