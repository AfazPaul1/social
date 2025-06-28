import { createFileRoute } from '@tanstack/react-router'
import CreatePostForm from '../../features/posts/components/CreatePostForm'
import {z} from "zod"
import { store } from '../../store'
import { postsApi } from '../../store/apis/postsApi'
const searchSchema = z.object({
    mode:z.enum(["create", "edit"]).optional()
})
export const Route = createFileRoute('/createPost/$postId')({
  loader: ({params: {postId}}) => {
    store.dispatch(postsApi.endpoints.fetchPostsById.initiate(postId))
    //i need to initiate with postId but i only destructure it in the component so i cant use a route loader?
    //https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters
    //loader gets path params as a parameter
    //had a doubt regarding how im gonna do the loading logic now 
    //realised i cant really remove the useFetch from createpostform i need it there for loading
    //i cant really never remove it right? i also need it for data
    return null
  }, 
  validateSearch: searchSchema,
  component: function RouteComponent() {
    const {postId} = Route.useParams()
    const {mode} = Route.useSearch()
    return <CreatePostForm postId={postId} mode={mode} />
  }
})
