import {selectPostByIdFromPosts, type ReactionType} from '../../../store/apis/postsApi'
import type { RootState } from '../../../store';

export const selectUserReactionFromPosts = (state: RootState, postId:string) =>  selectPostByIdFromPosts(state, postId)?.userReaction

export const selectReactionCountsFromPosts = (state: RootState, postId:string, reactionType:ReactionType) =>  {
    return selectPostByIdFromPosts(state, postId)?.reactionCounts[reactionType]
}