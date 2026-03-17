import {selectPostByIdFromPosts} from '../../../store/apis/postsApi'
import type { RootState } from '../../../store';
export const selectPostContentFromPosts = (state: RootState, postId:string) => selectPostByIdFromPosts(state, postId)?.content

export const selectPostTitleFromPosts = (state: RootState, postId: string) =>
  selectPostByIdFromPosts(state, postId)?.title

export const selectPostCreatedAtFromPosts = (state: RootState, postId: string) =>
  selectPostByIdFromPosts(state, postId)?.createdAt

export const selectPostUserNameFromPosts = (state: RootState, postId: string) =>
  selectPostByIdFromPosts(state, postId)?.userName
