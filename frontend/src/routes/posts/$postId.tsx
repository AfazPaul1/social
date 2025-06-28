import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
import { useFetchPostsByIdQuery } from '../../store/apis/postsApi'
import { useRouterState } from '@tanstack/react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import type { Post } from '../../store/slices/postsSlice'
import { Button, CardActions,} from "@mui/material";
export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  const { location } = useRouterState();
   const preloadedPost = location.state?.post as Post | undefined;
   const { data, isFetching } = useFetchPostsByIdQuery( preloadedPost? skipToken : postId);
   //console.log("posts/$postId", performance.now( ));
   const postToDisplay = preloadedPost || data;
  return (
    <>
      {isFetching? "loading" : postToDisplay
      ? 
      <PostItem post = {postToDisplay}>
        <EditButton postId={postToDisplay.id}/>
      </PostItem> : "no such post"}
    </>
  )
}
import { useNavigate } from '@tanstack/react-router'
function EditButton({postId}: {postId:string}) {
  const navigate = useNavigate()
  return <CardActions>
            <Button  onClick={() => navigate({
              to:'/createPost/$postId',
              params: {postId},
              search:{mode:"edit"}
            })}>Edit</Button>
        </CardActions>
}
