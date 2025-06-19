import { useAppSelector } from "../hooks/hooks"
import { PostItem } from "./PostItem"
import { createSelector } from "@reduxjs/toolkit"
export default function PostList() {
    //const select postIds = createSelector(state => state.posts, )
    const postIds = useAppSelector(state => state.posts.map(post => post.id)) 
    //to memoise selectors we use reselect


    const postList = postIds.map(postId => <PostItem key={postId} id={postId} />)
    return (
        <div>
            {postList}
        </div>
        
    )
}