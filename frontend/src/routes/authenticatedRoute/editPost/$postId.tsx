import { createFileRoute } from '@tanstack/react-router'
import CreatePostForm from '../../../features/posts/components/CreatePostForm'
import {z} from "zod"
import { store } from '../../../store'
import { postsApi } from '../../../store/apis/postsApi'
const searchSchema = z.object({
    mode:z.enum(["create", "edit"]).optional()
})
export const Route = createFileRoute('/authenticatedRoute/editPost/$postId')({
  loader: ({params: {postId}}) => {
    store.dispatch(postsApi.endpoints.fetchPostsById.initiate(postId))
    return null
  }, 
  validateSearch: searchSchema,
  component: function RouteComponent() {
    const {postId} = Route.useParams()
    const {mode} = Route.useSearch()
    return <CreatePostForm postId={postId} mode={mode} />
  }
})
