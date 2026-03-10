import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
import { postsApi, useFetchPostsByIdQuery } from '../../store/apis/postsApi'
import { Button, CardActions,} from "@mui/material";
import { selectLoggedInUserId } from '../../store/slices/authSlice'
import { store } from '../../store'
import type { Post } from "../../store/apis/postsApi";
import { selectPostsFromAnywhere } from "../../store/apis/postsApi";
 import { useSelector } from "react-redux";
 import { type RootState } from "../../store";
 import ReactionPicker from '../../features/reactions/components/ReactionPicker.tsx';
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({params}) => {
    //const {postId} = Route.useParams() no need for this can access in parameters
    store.dispatch(postsApi.endpoints.fetchPostsById.initiate(params.postId))
    return null
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  const { isFetching } = useFetchPostsByIdQuery( postId);
  const post:Post = useSelector((state: RootState) => selectPostsFromAnywhere(state, postId))!
  //console.log("posts/$postId", performance.now( ));
  const isSameUser = selectLoggedInUserId(store.getState()) === post?.userId
  return (
    <>
      {isFetching && !post? "loading" : post
      ? 
      <PostItem postId={post.id}>
        {/* if lhs true return rhs */}
        <ReactionPicker reactionCounts = {post.reactionCounts}></ReactionPicker>
        {isSameUser && <EditButton postId={post.id}/>}
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
