import    PostItem  from "./PostItem"
import { useFetchPostsQuery } from "../store/apis/postsApi"
import type { Post } from "../store/slices/postsSlice"
import { useNavigate } from '@tanstack/react-router';
import { Skeleton } from "@mui/material";
//import React, { useEffect } from "react";
//let renderCount = 0
 function PostList() {
  //renderCount++
  //console.log(`🔁 PostList render #${renderCount}`)
    const navigate = useNavigate()
    const {data:posts, isFetching} = useFetchPostsQuery(undefined)
    let content;
    //console.log("useFetchPostsQuery", { posts, isFetching })
     if (isFetching) {
         //console.log("loading",isFetching,  performance.now());
         content = <SkeletonSus/>
    } else if(posts && posts.length) {
        //console.log("comprender", performance.now());
        content = posts?.map(
        (post: Post) => 
        <div key={post.id} onClick={() => navigate({ to:'/posts/$postId', params: { postId: post.id }, state: { post } })}>           
        <PostItem  post={post} postsPage/>
        </div> 
        )
    }
//     useEffect(() => {
//   console.log('🧹 PostList mounted')
//   return () => {
//     console.log('❌ PostList unmounted')
//   }
// }, [])
    return (
            //<Suspense fallback={<SkeletonSus />}>
                <>
                {content}
                </>
            //</Suspense> 
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