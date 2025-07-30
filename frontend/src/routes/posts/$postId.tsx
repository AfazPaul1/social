import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
import { useFetchPostsByIdQuery } from '../../store/apis/postsApi'
import { useRouterState } from '@tanstack/react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import type { Post } from '../../store/apis/postsApi'
import { Button, CardActions,} from "@mui/material";
import { selectLoggedInUserId } from '../../store/slices/authSlice'
import { store } from '../../store'
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
  const isSameUser = selectLoggedInUserId(store.getState()) === postToDisplay?.userId
  return (
    <>
      {isFetching? "loading" : postToDisplay
      ? 
      <PostItem post = {postToDisplay}>
        {/* if lhs true return rhs */}
        {isSameUser && <EditButton postId={postToDisplay.id}/>}
      </PostItem> : "no such post"}
    </>
  )
}
import { useNavigate } from '@tanstack/react-router'
function EditButton({postId}: {postId:string}) {
  const navigate = useNavigate()
  return <CardActions>
            <Button  onClick={() => navigate({
              to:'/authenticatedRoute/editPost/$postId',
              params: {postId},
              search:{mode:"edit"}
            })}>Edit</Button>
        </CardActions>
}
