import    PostItem  from "./PostItem"
import { useFetchPostsQuery } from "../store/apis/postsApi"
import type { Post } from "../store/slices/postsSlice"
import { useNavigate } from '@tanstack/react-router';
export default function PostList() {
    const navigate = useNavigate()
    const {data:posts} = useFetchPostsQuery(undefined)
    const postList = posts?.map(
        (post: Post) => 
        <div key={post.id} onClick={() => navigate({ to:'/posts/$postId', params: { postId: post.id }, state: { post } })}>           
        <PostItem  post={post} lineClamp="line-clamp-5"/>
        </div> 
        )
    return (
        <div className="">
            {postList}
        </div>
        
    )
}