import { useAppSelector, useAppDispatch} from "../hooks/hooks"
import    PostItem  from "./PostItem"
import { Button } from "@mui/material" 
import { selectPostIds, incrementCounter, addPost} from "../store/slices/postsSlice" //memoized selector

export default function PostList() {
    console.log("postList");
    const dispatch = useAppDispatch()
    const postIds = useAppSelector(selectPostIds)
    const postList = postIds.map((postId:string) => <PostItem key={postId} id={postId} />)
    return (
        <div>
            <Button onClick={() => {
                const newPostId = String(postIds.length)
                dispatch(addPost({ id: newPostId,
            title: `New Post ${newPostId}`,
            content: `Content for new post ${newPostId}`}))
            }}>addpost</Button>
            <Button onClick={() => dispatch(incrementCounter())}>Increment</Button>
            {postList}
        </div>
        
    )
}