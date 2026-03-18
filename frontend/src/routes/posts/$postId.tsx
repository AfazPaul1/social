import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
import { postsApi, useFetchPostsByIdQuery } from '../../store/apis/postsApi'
import { selectLoggedInUserId } from '../../store/slices/authSlice'
import { store } from '../../store'
import {selectPostUserIdFromPosts} from '../../features/posts/selectors/selectors'
import { useSelector } from "react-redux";
 import { type RootState } from "../../store";
 import EditButton from '../../features/posts/components/EditButton'
// import ReactionPicker from '../../features/reactions/components/ReactionPicker.tsx';
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({params}) => {
    //const {postId} = Route.useParams() no need for this can access in parameters
    await store.dispatch(postsApi.endpoints.fetchPosts.initiate(undefined))
    store.dispatch(postsApi.endpoints.fetchPostsById.initiate(params.postId))
    return null
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  const { isFetching, isError } = useFetchPostsByIdQuery(postId, {
      selectFromResult: ({ isFetching, isError }) => ({
        isFetching, 
        isError
      })
  });
  const loggedInUser = useSelector(selectLoggedInUserId)
  const postUserId = useSelector((state:RootState) => selectPostUserIdFromPosts(state, postId))
  const isSameUser = loggedInUser === postUserId
  if(isFetching) return "loading.."
  if(isError) return "no such post"
  if(postUserId) {
    return (
            <PostItem postId={postId}>
        {isSameUser && <EditButton postId={postId}/>}
      </PostItem> 

    )
  }  
}
