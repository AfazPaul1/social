import    PostItem  from "./PostItem"
import { useFetchPostsQuery } from "../store/apis/postsApi"
import type { Post } from "../store/apis/postsApi";
import { useNavigate } from '@tanstack/react-router';
import { Skeleton } from "@mui/material";
 function PostList() {
    const navigate = useNavigate()
    const {data:posts, isFetching} = useFetchPostsQuery(undefined)
    let content;
     if (isFetching) {
         content = <SkeletonSus/>
    } else if(posts && posts.length) {
        content = posts?.map(
        (post: Post) => 
        <div key={post.id} onClick={() => navigate({ to:'/posts/$postId', params: { postId: post.id }, state: { post } })}>           
        <PostItem  post={post} postsPage/>
        </div> 
        )
    }
    return (
                <>
                {content}
                </>
    )
}
export default PostList
export const SkeletonSus = () => {
     const placeholders = Array.from({ length: 5 })
    return (
        <div className="space-y-4 max-w-screen-sm mx-auto px-4 py-2"> 
      {placeholders.map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          className="w-full"
          height={172}
        />
      ))}
    </div>
    )
}