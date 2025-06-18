import { useAppSelector } from "../hooks/hooks"
import { PostItem } from "./PostItem"
export default function PostList() {
    const postIds = useAppSelector(state => state.posts.map(post => post.id)) 
    //this always return a new array cause of map causing unnecessary renders reading this now 
    // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
    //refers this mistake
    //suppose this was a complex one it would mean for every dispatched action it would be recalculated even though it hasnt actually changed
    //answer is memoization - if function called with same inputs return previous results


    const postList = postIds.map(postId => <PostItem key={postId} id={postId} />)
    return (
        <div>
            {postList}
        </div>
        
    )
}