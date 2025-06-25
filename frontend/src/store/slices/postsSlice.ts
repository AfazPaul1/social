// import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "@reduxjs/toolkit"
// import type { RootState } from "../index";
// import type { PayloadAction } from "@reduxjs/toolkit";
export interface Post {
    id: string,
    title:string,
    content:string
}

// const postsSlice = createSlice({
//     name: "posts",
//     initialState,
//     reducers: {
//       addPost: (state, action:PayloadAction<Post>) => { // since we typed our payload here if we dont pass in a payload of same shape itll show an error there
//         state.push(action.payload)
//       }
//     }
// })

// export const postsReducer = postsSlice.reducer
// export const {addPost} = postsSlice.actions
// //selectors
// const selectPostId = (_state: RootState, postId: string) => postId;

// const selectPosts = (state: RootState) => state.posts;

// export const makeSelectPostById = () => {
//   return createSelector(
//     [selectPosts, selectPostId],
//     (posts, id) => {
//       //console.log(`makeSelectPostById for ID ${id} is computing! (posts.find)`);
//       return posts.find(post => post.id === id);
//     }
//   );
// };

// export const selectPostIds = createSelector(selectPosts, (posts) => {
//     //console.log("selectPostIds is computing! (posts.map)")
//     return posts.map(post => post.id)})