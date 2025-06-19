import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit"
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
const selectPostId = (state, postId) => postId;

const selectPosts = state => state.posts;

export const makeSelectPostById = () => {
  return createSelector(
    [selectPosts, selectPostId],
    (posts, id) => {
      console.log(`makeSelectPostById for ID ${id} is computing! (posts.find)`);
      return posts.find(post => post.id === id);
    }
  );
};
