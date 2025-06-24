import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
import { useFetchPostsByIdQuery } from '../../store/apis/postsApi'
import { useRouterState } from '@tanstack/react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import type { Post } from '../../store/slices/postsSlice'
export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  const { location } = useRouterState();
   const preloadedPost = location.state?.post as Post | undefined;
   const { data, isLoading } = useFetchPostsByIdQuery( preloadedPost? skipToken : postId);
   const postToDisplay = preloadedPost || data;
  return (
    <>
      {isLoading? "loading" : postToDisplay? <PostItem post = {postToDisplay}></PostItem> : "no such post"}
    </>
  )
}
